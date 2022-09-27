<template>

  <div id="app">

    <v-app id="inspire">
      <v-main class="pink accent-1">
        <v-container>
          <v-row>
            <v-col>
              <v-sheet rounded="xl">
                <v-data-table class="rounded-xl elevation-7" :headers="headers" :search="search" :items="publishers">
                  <template v-slot:top>
                    <v-toolbar class="rounded-xl rounded-b-0" flat>
                      <v-toolbar-title>Editoras</v-toolbar-title>
                      <v-divider class="mx-4" inset vertical></v-divider>
                      <v-dialog persistent v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn rounded color="black" dark v-bind="attrs" v-on="on">
                            Nova
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
                              <v-col>
                                <v-text-field
                                 v-model="editedItem.name"
                                 :rules="[rules.required, rules.maxEditora, rules.min]"
                                 :counter="80" 
                                 label="Nome">
                                </v-text-field>
                              </v-col>
                              <v-col>
                                <v-text-field 
                                v-model="editedItem.city" 
                                :rules="[rules.required, rules.max, rules.min]"
                                :counter="80"
                                label="Cidade">
                              </v-text-field>
                              </v-col>
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
                          <v-card-title class="text-h7"><v-icon>mdi-alertcircle</v-icon>Você tem certeza que deseja deletar?</v-card-title>
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


import PublisherDataService from "../services/PublisherDataService"

export default ({

  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Id',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      { text: 'Nome', value: 'name' },
      { text: 'Cidade', value: 'city' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    
    publishers: [],
    search: '',
    rules: {
                required: (value) => !!value || 'Este campo é obrigatório.',
                max: (value) => value.length <= 80 || 'Máximo de 80 caracteres.',
                maxEditora: (value) => value.length <= 80 || 'Máximo de 80 caracteres.',
                min: (value) => value.length >= 3 || 'Mínimo de 3 caracteres.'
            },
    editedIndex: -1,
    editedItem: {
      name: '',
      city: '',
      

    },
    defaultItem: {
      name: '',
      city: '',
      

    },

  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nova editora' : 'Editar editora'
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
      this.publisher = [
        {
          name: '',
          city: '',

        },
      ]
    },

    async listPublisher() {
      await PublisherDataService.getAll()
        .then((response) => {
          this.publishers = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    editItem(item) {
      this.editedIndex = item.id
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = item.id
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.deletePublisher()
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

    save() {
      if (this.editedIndex > -1) {
        this.atualizationPublisher()
      } else {
        this.createPublisher()
      }
      this.close()
    },

    async createUser(){
    await PublisherDataService.create(this.editedItem).then(() => this.listPublisher())
    .catch((e) => {
      console.log(e)
    })
  },

  async atualizationPublisher(){
    await PublisherDataService.update(this.editedIndex, this.editedItem).then(() => this.listPublisher())
    .catch((e) => {
      console.log(e)
    })
  },

  async deletePublisher(){
    await PublisherDataService.delete(this.editedIndex).then(() => this.listPublisher())
    .catch((e) => {
      console.log(e)
    })
  }
  },
 
mounted() {
    this.listPublisher();
  }
})
</script>
  
<style>

</style>
