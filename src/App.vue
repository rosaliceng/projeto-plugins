<template>
  <v-app>
    <v-app-bar
      app
      color="white"
    >
      <v-toolbar-title>
        <v-img src=./assets/Libr__1_-removebg-preview.png
        max-height="100"
        max-width="100">
        </v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <template>
        <div class="text-center">
  <v-tabs color="black">
    <v-tab
      class="ma-2" 
      to="/"
      >
    <v-icon>
        mdi-home
      </v-icon>
      Início
    </v-tab>

    <v-tab
      class="ma-2"
      to="/user"
    >
    <v-icon left>
        mdi-account-plus
      </v-icon>
      Usuários
    </v-tab>

    <v-tab
      class="ma-2"
      to="/publisher"
    >
    <v-icon left>
        mdi-bookshelf
      </v-icon>
      Editoras
    </v-tab>

    <v-tab
      class="ma-2"
      to="/book"
    >
    <v-icon left>
        mdi-book-plus
      </v-icon>
      Livros
    </v-tab>
    
    <v-tab
      class="ma-2"
      to="/rent"
    >
    <v-icon left>
        mdi-book-account
      </v-icon>
      Aluguéis
    </v-tab>
  </v-tabs> 
  </div>
</template>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
        