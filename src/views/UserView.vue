<template>

  <div id="app">

    <v-app id="inspire">
      <v-main class="pink accent-2">
        <v-container>
          <v-row>
            <v-col>
              <v-sheet rounded="xl">
                <v-data-table class="rounded-xl elevation-7" :headers="headers" :search="search" :items="users"
                :items-per-page="5" :footer-props="{
                    itemsPerPageOptions: [5, 10, 25, 50],
                    itemsPerPageText: 'Linhas por página',
                  }"
                  no-results-text="Nenhum usuário encontrado">
                  <template v-slot:top>
                    <v-toolbar class="rounded-xl rounded-b-0" flat>
                      <v-toolbar-title>Usuários</v-toolbar-title>
                      <v-divider class="mx-4" inset vertical></v-divider>
                      <v-dialog persistent v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn 
                          rounded
                           color="black" 
                           dark 
                           v-bind="attrs" v-on="on">
                            Novo
                            <v-icon right>
                              mdi-plus
                            </v-icon>
                          </v-btn>

                        </template>
                        <v-card>
                          <v-form lazy-validation  ref="form" v-model="valid">
                            <v-card-title>

                              <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                              <v-container>
                                <v-text-field v-model="editedItem.name" label="Nome" color="blue"
                                  :rules="[rules.required, rules.min_counter, rules.counter]" counter="80"
                                  maxlength="80" ></v-text-field>

                                <v-text-field v-model="editedItem.city" label="Cidade" color="blue"
                                  :rules="[rules.required, rules.min_counter, rules.counter]" counter="80"
                                  maxlength="80"></v-text-field>

                                <v-text-field v-model="editedItem.address" label="Endereço" color="blue"
                                  :rules="[rules.required, rules.min_counter, rules.counter]" counter="80"
                                  maxlength="80" ></v-text-field>

                                <v-text-field v-model="editedItem.email" label="Email" color="blue"
                                  :rules="[rules.required, rules.email]">
                                </v-text-field>
                              </v-container>
                            </v-card-text>

                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="red darken-1" text @click="close">
                                Cancel
                              </v-btn>
                              <v-btn color="blue darken-1" text @click="save">
                                Save
                              </v-btn>
                            </v-card-actions>
                          </v-form>
                        </v-card>
                      </v-dialog>
                      <v-spacer></v-spacer>
                      <v-text-field v-model="search" append-icon="mdi-magnify" label="Pesquisar" color="black"
                      single-line hide-details>
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
import UserDataService from "../services/UserDataService";

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
      { text: 'Endereço', value: 'address' },
      { text: 'Email', value: 'email' },
      { text: 'Ações', value: 'actions', sortable: false },
    ],
    users: [],
    search: '',
    editedIndex: -1,
    editedItem: {
      name: '',
      city: '',
      address: '',
      email: '',
    },
    defaultItem: {
      name: '',
      city: '',
      address: '',
      email: '',
    },
    rules: {
      required: value => !!value || 'Campo obrigatorio!',
      counter: value => value.length <= 35 || 'Max 35 caracteres.',
      min_counter: value => value.length >= 3 || 'Min 3 caracteres.',
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'E-mail inválido!'
      },
    },
  
    valid: false,

  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Novo usuário' : 'Editar usuário'
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
      this.user = [
        {
          name: '',
          city: '',
          address: '',
          email: '',

        },
      ]
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

    editItem(item) {
      this.editedIndex = item.id
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    usuarioLimpar() {
            this.user = {
                id: '',
                name: '',
                city: '',
                address: '',
                email: ''
            };
        },

    deleteItem(item) {
      this.editedIndex = item.id
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.deleteUser()
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
      this.$refs.form.resetValidation()
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          this.atualizationUser()
        } else {
          this.createUser()
        }
        this.close()
      }
    },

    async createUser() {
      await UserDataService.create(this.editedItem).then(() => this.listUser()).then(() => this.showAlertSuccessPost()).then(() => this.close())
        .catch((e) => {
          this.showAlertErrorPost()
          console.log(e)
        })
    },

    async atualizationUser() {
      await UserDataService.update(this.editedIndex, this.editedItem).then(() => this.listUser()).then(() => this.showAlertSuccessUpdate()).then(() => this.close())
        .catch((e) => {
          this.showAlertErrorUpdate()
          console.log(e)
        })
    },

    async deleteUser() {
      await UserDataService.delete(this.editedIndex).then(() => this.listUser()).then(() => this.showAlertSuccessDelete())
        .catch((e) => {
          this.showAlertErrorDelete()
          console.log(e)
        })
      },
      showAlertSuccessPost() {
      this.$swal("", "Usuário cadastrado com sucesso!", "success");
    },
    
    showAlertSuccessDelete() {
      this.$swal("", "Usuário deletado com sucesso!", "success");
    },
    showAlertSuccessUpdate() {
      this.$swal("", "Usuário atualizado com sucesso!", "success");
    },

      showAlertErrorPost() {
      this.$swal("Não foi possível cadastrar", "Já existe um usuário com esse email!", "error");
    }, 
    showAlertErrorDelete() {
      this.$swal("Atenção", "Esse usuário tem um ou mais aluguéis.", "error");
    },
    showAlertErrorUpdate () {
      this.$swal("Não foi possível atualizar", "Já existe um usuário com esse email!", "error");
    }
  },
  

  mounted() {
    this.listUser();
  }
})
</script>
  
<style>

</style>