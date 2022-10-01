<template>

  <div id="app">

    <v-app id="inspire">
      <v-main class="pink accent-1">
        <v-container>
          <v-row>
            <v-col>
              <v-sheet rounded="xl">
                <v-data-table class="rounded-xl elevation-7" :headers="headers" :search="search" :items="books"
                  :items-per-page="5" :footer-props="{
                    itemsPerPageOptions: [5, 10, 25, 50],
                    itemsPerPageText: 'Linhas por página',
                  }" :loading="loading" loading-text="Carregando dados... Aguarde!"
                  no-results-text="Nenhum livro encontrado">
                  <template v-slot:top>
                    <v-toolbar class="rounded-xl rounded-b-0" flat>
                      <v-toolbar-title>Livros</v-toolbar-title>
                      <v-divider class="mx-4" inset vertical></v-divider>

                      <v-dialog persistent v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn rounded color="black" dark v-bind="attrs" v-on="on">
                            Novo
                            <v-icon right>
                              mdi-plus
                            </v-icon>
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-title>
                            <span class="text-h5">{{ formTitle }}</span>
                          </v-card-title>

                          <v-card-text>
                            <v-container>

                              <v-text-field v-model="editedItem.name" :rules="[rules.required, rules.max, rules.min]"
                                :counter="80" label="Nome">
                              </v-text-field>


                              <v-text-field v-model="editedItem.author" :rules="[rules.required, rules.max, rules.min]"
                                :counter="80" label="Autor">
                              </v-text-field>


                              <v-select v-model="editedItem.publisherId" :items="publishers" item-text="name"
                                item-value="id" :rules="[rules.required]" label="Editora">
                              </v-select>


                              <v-text-field v-model="editedItem.quantity" type="number"
                                :rules="[rules.required, rules.minNumber]" label="Quantidade">
                              </v-text-field>

                              <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                :return-value.sync="editedItem.launch" transition="scale-transition" offset-y min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field v-model="editedItem.launch" readonly v-bind="attrs" v-on="on"
                                    :rules="[(v) => !!v || 'Lançamento é obrigatório']" append-icon="mdi-calendar"
                                    label="Lançamento">
                                  </v-text-field>
                                </template>
                                <v-date-picker v-model="editedItem.launch" no-title scrollable :max="nowDate" locale="pt-br">

                                  <v-btn text color="red" @click="menu = false"> Cancel </v-btn>

                                  <v-btn text color="blue" @click="$refs.menu.save(editedItem.launch)"> OK </v-btn>
                                </v-date-picker>
                              </v-menu>
                            </v-container>
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn rounded color="primary" text @click="close">
                              Cancel
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="save">
                              Save
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                      <v-spacer></v-spacer>
                      <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
                      </v-text-field>
                      <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                          <v-card-title class="text-h7">
                            <v-icon>mdi-alertcircle</v-icon>Você tem certeza que deseja deletar?
                          </v-card-title>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" text @click="closeDelete">Cancelar</v-btn>
                            <v-btn color="blue darken-1" text @click="deleteItemConfirm">Sim,quero</v-btn>
                            <v-spacer></v-spacer>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-toolbar>
                  </template>
                  <template v-slot:[`item.quantity`]="{ item }">
                    <v-chip class="elevation-3" :color="getColor(item.quantity)" dark>
                      {{ item.quantity }}
                    </v-chip>
                  </template>
                  <template v-slot:[`item.actions`]="{ item }">

                    <v-icon size="20" class="mr-5" color="blue" @click="editItem(item)">
                      mdi-pencil
                    </v-icon>
                    <v-icon size="20" color="red" @click="deleteItem(item)">
                      mdi-delete
                    </v-icon>
                  </template>

                </v-data-table>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
<script>
import BookDataService from "../services/BookDataService";
import PublisherDataService from "../services/PublisherDataService";
import moment from "moment";


export default ({

  data: () => ({
    dialog: false,
    dialogDelete: false,
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
    menu: false,
    nowDate: new Date().toISOString().slice(0, 10),
    loading: (true, '#EC407A'),
    headers: [
      {
        text: 'Id',
        align: 'start',
        value: 'id',
      },
      { text: 'Nome', value: 'name', },
      { text: 'Autor', value: 'author', },
      { text: 'Editora', value: 'publisher.name', },
      { text: 'Data de lançamento', value: 'launch', },
      { text: 'Quantidade', value: 'quantity', },
      { text: 'Ações', align: 'center', value: 'actions', sortable: false }
    ],
    books: [],
    publishers: [],
    dateFormated: [],
    search: '',
    editedIndex: -1,
    editedItem: {
      name: '',
      author: '',
      publisherId: '',
      publisher: '',
      launch: '',
      quantity: '',
    },
    defaultItem: {
      name: '',
      author: '',
      publisherId: '',
      publisher: '',
      launch: '',
      quantity: '',
    },
    rules: {
      required: (value) => !!value || 'Este campo é obrigatório.',
      max: (value) => value.length <= 80 || 'Máximo de 80 caracteres.',
      maxAutor: (value) => value.length <= 80 || 'Máximo de 80 caracteres.',
      min: (value) => value.length >= 3 || 'Mínimo de 3 caracteres.',
      minNumber: (value) => value >= 1 || 'No mínimo 1 é necessário.'
    },
  }),



  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Novo livro' : 'Editar livro'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.book = [
        {
          name: '',
          city: '',

        },
      ]
    },
    getColor(quantity) {
      if (quantity < 10) return 'red'
      else if (quantity < 50) return 'orange'
      else return 'green'
    },
    async listBook() {
      await BookDataService.getAll()
        .then((response) => {
          this.books = response.data;
          this.books.forEach(b => {
            this.dateFormated = moment(b.launch).format('YYYY-MM-DD')

            return (b.launch = this.dateFormated)
          });
          this.loading = false  
        
        })

    },

    async listPublisher() {
      await PublisherDataService.getAll()
        .then((response) => {
          this.publishers = response.data;

        })
        .catch((e) => {
          console.log(e);
        });
    },

    editItem(item) {
      this.editedIndex = item.id
      // this.editedItem = Object.assign({}, item)
      this.editedItem = { ...item }
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = item.id
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.deleteBook()
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save(data) {
      if (this.editedIndex > -1) {
        this.atualizationBook()
      } else {
        this.createBook()
      }
      this.close()
    },

    async createBook() {
      await BookDataService.create(this.editedItem).then(() => this.listBook())
        .catch((e) => {
          console.log(e)
        })
    },

    async atualizationBook() {
      await BookDataService.update(this.editedIndex, this.editedItem).then(() => this.listBook())
        .catch((e) => {
          console.log(e)
        })
    },

    async deleteBook() {
      await BookDataService.delete(this.editedIndex).then(() => this.listBook())
        .catch((e) => {
          console.log(e)
        })
    }
  },

  mounted() {
    this.listBook();
    this.listPublisher();
  }
})
</script>
  
<style>

</style>