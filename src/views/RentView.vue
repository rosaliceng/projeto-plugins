<template>

  <div id="app">
    <v-app id="inspire">
      <v-main class="pink accent-2">
        <v-container>
          <v-row>
            <v-col>
              <v-sheet rounded="xl">
                <v-data-table class="rounded-xl elevation-1" :headers="headers" :search="search" :items="rents"
                  :items-per-page="5" :footer-props="{
                    itemsPerPageOptions: [5, 10, 25, 50],
                    itemsPerPageText: 'Linhas por página',
                  }" no-results-text="Nenhum aluguel encontrado">
                  <template v-slot:top>
                    <v-toolbar class="rounded-xl rounded-b-0" flat>
                      <v-toolbar-title>Aluguéis</v-toolbar-title>
                      <v-divider class="mx-4" inset vertical></v-divider>
                      <v-dialog v-model="dialog" persistent max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn rounded color="black" dark v-bind="attrs" v-on="on">
                            Novo
                            <v-icon right>
                              mdi-plus
                            </v-icon>
                          </v-btn>
                        </template>
                        <v-card>
                          <v-form ref="form" v-model="valid">
                            <v-card-title>
                              <span class="text-h5">Novo aluguel</span>
                            </v-card-title>

                            <v-card-text>
                              <v-container>
                                <v-select v-model="editedItem.userId" :items=users item-text="name" item-value="id"
                                  :rules="[(v) => !!v || 'Nome é obrigatório']" label="Nome"></v-select>

                                <v-select v-model="editedItem.bookId" :items=books item-text="name" item-value="id"
                                  :rules="[(v) => !!v || 'Livro é obrigatório']" label="Livro"></v-select>

                                <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                  :return-value.sync="date" transition="scale-transition" offset-y min-width="auto">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="editedItem.rentDate" append-icon="mdi-calendar" readonly
                                      v-bind="attrs" v-on="on" :rules="[(v) => !!v || 'Data é obrigatório']"
                                      label="Data do aluguel">
                                    </v-text-field>
                                  </template>
                                  <v-date-picker v-model="editedItem.rentDate" no-title scrollable :max="nowDate"
                                    :min="nowDate" locale="pt-br">
                                    <v-spacer></v-spacer>

                                    <v-btn text color="primary" @click="menu = false"> Cancelar </v-btn>

                                    <v-btn text color="primary" @click="$refs.menu.save(editedItem.rentDate)">
                                      OK
                                    </v-btn>
                                  </v-date-picker>
                                </v-menu>

                                <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false"
                                  :return-value.sync="date" transition="scale-transition" offset-y min-width="auto">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="editedItem.forecastDate" append-icon="mdi-calendar" readonly
                                      v-bind="attrs" v-on="on" :rules="[(v) => !!v || 'Previsão é obrigatório']"
                                      label="Previsão de devolução">
                                    </v-text-field>
                                  </template>
                                  <v-date-picker v-model="editedItem.forecastDate" no-title scrollable :min="nowDate"
                                    locale="pt-br">
                                    <v-spacer></v-spacer>

                                    <v-btn text color="red" @click="menu2 = false"> Cancelar </v-btn>

                                    <v-btn text color="blue" @click="$refs.menu2.save(editedItem.forecastDate)">
                                      OK
                                    </v-btn>
                                  </v-date-picker>
                                </v-menu>
                              </v-container>
                            </v-card-text>

                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn rounded color="red" text @click="close">
                                Cancelar
                              </v-btn>
                              <v-btn color="blue darken-1" text @click="save">
                                Salvar
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
                      <v-dialog v-model="dialog2" max-width="370px" persistent content-class="round">
                        <v-card>
                          <v-card-title class="headline">
                            <v-spacer></v-spacer> <span class="mt-2 mb-4">Dar baixa no livro</span>
                            <v-spacer></v-spacer>
                          </v-card-title>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" class="mb-2" text @click="close">
                              Cancelar
                            </v-btn>
                            <v-btn color="blue darken-1" class="mb-2" text @click="save">
                              Ok
                            </v-btn>
                            <v-spacer></v-spacer>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-toolbar>
                  </template>

                  <template v-slot:[`item.statusRents`]="{ item }">
                  <v-chip class="elevation-3" :color="getColor(item)" dark>
                    {{ item.statusRents }}
                  </v-chip>
                </template>


                  <template v-slot:[`item.actions`]="{ item }">
                    <v-tooltip top color="red" v-if="item.devolutionDate !== 'Sem data'">
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon  size="20" color="red" v-bind="attrs" v-on="on" @click="deleteItem(item)">
                          mdi-delete
                        </v-icon>
                      </template>
                      <span>Excluir</span>
                    </v-tooltip>
                    <v-tooltip top color="green" v-else>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon v size="20" class="mr-5" color="green accent-3" v-bind="attrs" v-on="on"
                          @click="atualizationRent(item)">
                          mdi-check-bold
                        </v-icon>
                      </template>
                      <span>Devolver</span>
                    </v-tooltip>
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
    dialog2: false,
    dialogDelete: false,
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
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
      { text: 'Status', value: 'statusRents', sortable: false },
      { text: 'Ações', value: 'actions', sortable: false },
    ],
    search: '',
    rents: [],
    users: [],
    books: [],
    editedIndex: -1,
    editedItem: {
      userId: '',
      bookId: '',
      rentDate: '',
      forecastDate: '',
    },
    editedItem2: {
      forecastDate: '',
    },

    defaultItem: {
      userId: '',
      bookId: '',
      rentDate: '',
      forecastDate: '',

    },
    valid: false,
  }),


  filters: {
  FormatDate(date) {
  return moment(date).format('DD/MM/YYYY');
    }
     },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    dialog2() {
      this.$refs.form.resetValidation();
    }
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
          this.rents.forEach((item) => {
             item.rentDate = this.listDate(item.rentDate);
             item.forecastDate = this.listDate(item.forecastDate)
              

            if (item.devolutionDate == null) {
            return item.devolutionDate = "Sem data"
            }
            item.devolutionDate = this.listDate(item.devolutionDate)
        });
        
      })
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

     listDate(date) {
      return moment(date).format("DD/MM/yyyy");
    },
    parseDateISO(date) {
     const [dd, mm, yyyy] = date.split("/");
      return `${yyyy}-${mm}-${dd}`;
     },
    
     getColor(item) {
      if (item.statusRents === 'No prazo') return 'green'
      else if (item.statusRents === 'Com atraso') return 'red'
      else if (item.statusRents === 'Pendente') return 'orange'
    },
    newItem(item) {
      this.editedIndex = item.id
      this.editedItem = Object.assign({}, item)
      this.editedItem.rentDate = this.editDate(this.editedItem.rentDate)
      this.editedItem.forecastDate = this.editDate(this.editedItem.forecastDate)
      this.dialog = true
    },


    editItem(item) {
      this.editedIndex = item.id
      this.editedItem = Object.assign({}, item)
    
      this.dialog2 = true
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
      this.$refs.form.resetValidation()
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedItem2 = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save(data) {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          this.atualizationRent()
        } else {
          this.createRent()
        }
        this.close()
      }
    },


    async createRent() {
      await RentDataService.create(this.editedItem).then(() => this.listRent()).then(() => this.showAlertSuccessPost()).then(() => this.close())
        .catch((e) => {
          this.showAlertErrorPost1()
          console.log(e)
        });
    },


    async atualizationRent(rent) {
      this.$swal({
        title: 'Você quer dar baixa no livro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Salvar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          rent.rentDate = this.parseDateISO(rent.rentDate);
          rent.forecastDate = this.parseDateISO(rent.forecastDate);
          rent.devolutionDate = this.date;
          RentDataService.update(rent).then(() => {
            this.$swal("Livro Devolvido com Sucesso!", "", "success");
            this.listRent();
          })
        } else {
          this.$swal("Livro não Devolvido", "", "info");
          this.listRent();
        }
      });
    
      await RentDataService.update(this.editedIndex, this.editedItem).then(() => this.listRent())
        .catch((e) => {

          console.log(e)
        })
    },

    async deleteRent() {
      this.$swal({
        position: 'top-center',
        icon: 'success',
        title: 'Aluguel deletado!',
        showConfirmButton: false,
        timer: 1500
      })
      await RentDataService.delete(this.editedIndex).then(() => this.listRent())
        .catch((e) => {
          console.log(e)
        })
    },
    showAlertSuccessPost() {
      this.$swal("", "Aluguel cadastrado com sucesso!", "success");
    },
    showAlertErrorPost1() {
      this.$swal("Atenção", "O livro está indisponivel!", "error");
    },

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
