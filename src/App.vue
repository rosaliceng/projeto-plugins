<template>
<main>
  <v-app>
    <v-app-bar app color="white">

      <v-app-bar-nav-icon @click="drawer = true" class="d-flex d-sm-none mr-n3"></v-app-bar-nav-icon>


      <v-toolbar-title>
        <v-img src=./assets/LogoLibro.png max-height="50" max-width="250">
        </v-img>
        
      </v-toolbar-title>

      <v-toolbar-items v-model="tab" align-with-title class="d-none d-sm-flex">
    
        <template>
          <v-tabs color="black"  centered>
            <div class="mt-3 mr-2">
              <v-tab class="ma-2" to="/">
                <v-icon>
                  mdi-home
                </v-icon>
                Início
              </v-tab>
            </div>
            <div class="mt-3 mr-2">
              <v-tab class="ma-2" to="/user">
                <v-icon left>
                  mdi-account-plus
                </v-icon>
                Usuários
              </v-tab>
            </div>
            <div class="mt-3 mr-2">
              <v-tab class="ma-2" to="/publisher">
                <v-icon left>
                  mdi-bookshelf
                </v-icon>
                Editoras
              </v-tab>
            </div>
            <div class="mt-3 mr-2">
              <v-tab class="ma-2" to="/book">
                <v-icon left>
                  mdi-book-plus
                </v-icon>
                Livros
              </v-tab>
            </div>
            <div class="mt-3 mr-2">
              <v-tab class="ma-2" to="/rent">
                <v-icon left>
                  mdi-book-account
                </v-icon>
                Aluguéis
              </v-tab>
            </div>
          </v-tabs>
        </template>
        <v-spacer></v-spacer>
      </v-toolbar-items>
    </v-app-bar>


    <v-navigation-drawer v-model="drawer" temporary app>
      <v-list-item-content class="my-2 pa-3">
        <v-list-item-title class="text-h6">
          <strong>Menu</strong>
        </v-list-item-title>
        <v-list-item-subtitle>
          Seja bem-vindo a Libro!
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-divider class="my-3"></v-divider>

      <v-list nav dense>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.link" link>
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{item.text}}</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-divider class="my-5"></v-divider>

    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
  </main>
</template>

<script>

export default {
  data() {
    return {
      drawer: false,
      tab: null,
      items: [
        {
          icon: 'mdi-home',
          text: 'Home',
          link: '/',
        },
        {
          icon: 'mdi-account',
          text: 'Usuário',
          link: '/user',
        },
        {
          icon: 'mdi-book',
          text: 'Livro',
          link: '/book',
        },
        {
          icon: 'mdi-bookshelf',
          text: 'Editora',
          link: '/publisher',
        },
        {
          icon: 'mdi-book-account',
          text: 'Aluguel',
          link: '/rent',
        },
      ],
    }
  }
}
</script>
        