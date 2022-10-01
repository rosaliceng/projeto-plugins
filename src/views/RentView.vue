<template>

  <div id="app">
    <v-app id="inspire">
      <v-main class="pink accent-1">
        <v-container>
          <v-row>
            <v-col>
              <v-sheet rounded="xl">
                <v-data-table class="rounded-xl elevation-1" :headers="headers" :search="search" :items="rents">
                  <template v-slot:top>
                    <v-toolbar class="rounded-xl rounded-b-0" flat>
                      <v-toolbar-title>Aluguéis</v-toolbar-title>
                      <v-divider class="mx-4" inset vertical></v-divider>

                      <v-dialog v-model="dialog" max-width="500px">
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
                              <v-select v-model="editedItem.userId" :items=users item-text="name" item-value="id"
                                label="Nome"></v-select>

                              <v-select v-model="editedItem.bookId" :items=books item-text="name" item-value="id"
                                label="Livro"></v-select>

                              <v-menu v-if="!edit" ref="menu" v-model="menu" :close-on-content-click="false"
                                :return-value.sync="editedItem.rentDate" transition="scale-transition" offset-y
                                min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field v-model="editedItem.rentDate" append-icon="mdi-calendar" readonly
                                    v-bind="attrs" v-on="on" :rules="[(v) => !!v || 'Data é obrigatório']"
                                    label="Data do aluguel">
                                  </v-text-field>
                                </template>
                                <v-date-picker v-model="editedItem.rentDate" no-title scrollable :max="nowDate" locale="pt-br">
                                  <v-spacer></v-spacer>

                                  <v-btn text color="primary" @click="menu = false"> Cancelar </v-btn>

                                  <v-btn text color="primary" @click="$refs.menu.save(editedItem.rentDate)">
                                    OK
                                  </v-btn>
                                </v-date-picker>
                              </v-menu>
                              <v-menu v-if="!edit" ref="menu2" v-model="menu2" :close-on-content-click="false"
                                :return-value.sync="editedItem.forecastDate" transition="scale-transition" offset-y
                                min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field v-model="editedItem.forecastDate" append-icon="mdi-calendar" readonly
                                    v-bind="attrs" v-on="on" :rules="[(v) => !!v || 'Previsão é obrigatório']"
                                    label="Previsão de devolução">
                                  </v-text-field>
                                </template>
                                <v-date-picker v-model="editedItem.forecastDate" no-title scrollable :max="nowDate" locale="pt-br">
                                  <v-spacer></v-spacer>

                                  <v-btn text color="primary" @click="menu2 = false"> Cancelar </v-btn>

                                  <v-btn text color="primary" @click="$refs.menu2.save(editedItem.forecastDate)">
                                    OK
                                  </v-btn>
                                </v-date-picker>
                              </v-menu>

                            </v-container>
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn rounded color="primary" text @click="close">
                              Cancelar
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="save">
                              Salvar
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

import RentDataService from "../services/RentDataService"
import UserDataService from "../services/UserDataService"
import BookDataService from "../services/BookDataService"
import moment from "moment";

export default ({

  data: () => ({
    dialog: false,
    dialogDelete: false,
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
    nowDate: new Date().toISOString().slice(0, 10),
    menu: false,
    menu2: false,

    headers: [
      {
        text: 'Id',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      { text: 'Livro alugado', value: 'book.name' },
      { text: 'Usuário', value: 'user.name' },
      { text: 'Data do aluguel', value: 'rentDate' },
      { text: 'Previsão de devolução', value: 'forecastDate' },
      { text: 'Data de devolução', value: 'devolutionDate' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    rents: [],
    users: [],
    books: [],
    dateFormataded: [],
    search: '',
    editedIndex: -1,
    editedItem: {
      userId: '',
      bookId: '',
      rentDate: '',
      rorecastDate: '',
      devolutionDate: '',

    },
    defaultItem: {
      userId: '',
      bookId: '',
      rentDate: '',
      forecastDate: '',
      devolutionDate: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Novo aluguel' : 'Editar aluguel'
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
      this.rent = [
        {
          book: '',
          name: '',
          rentDate: '',
          forecastDate: '',
          devolutionDate: '',

        },
      ]
    },
    async listRent() {
      await RentDataService.getAll()
        .then((response) => {
          this.rents = response.data;
          this.rents.forEach(r => {
            this.dateFormataded = moment(r.rentDate).format('YYYY-MM-DD')
            return (r.rentDate = this.dateFormataded)
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async listUser() {
      await UserDataService.getAll()
        .then((response) => {
          this.users = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async listBook() {
      await BookDataService.getAll()
        .then((response) => {
          this.books = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editItem(item) {
      this.editedIndex = item.id
      this.editedItem = { ...item }
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = item.id
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.deleteRent()
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
        this.atualizationRent()
      } else {
        this.createRent()
      }
      this.close()
    },

    async createRent() {
      await RentDataService.create(this.editedItem).then(() => this.listRent())
        .catch((e) => {
          console.log(e)
        })
    },

    async atualizationRent() {
      await RentDataService.update(this.editedIndex, this.editedItem).then(() => this.listRent())
        .catch((e) => {
          console.log(e)
        })
    },

    async deleteRent() {
      await RentDataService.delete(this.editedIndex).then(() => this.listRent())
        .catch((e) => {
          console.log(e)
        })
    }
  },

  mounted() {
    this.listRent();
    this.listUser();
    this.listBook();
  }
})
</script>

<style>

</style>
