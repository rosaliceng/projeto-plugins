<template>
    <v-app>
     <v-main class="pink accent-2">
            <v-container>
                <v-row> 
                    <v-col cols="3">
                        <CardUser></CardUser>
                    </v-col>
                    <v-col cols="3">
                        <CardPublisher></CardPublisher>
                    </v-col>
                    <v-col cols="3">
                        <CardBook></CardBook>
                    </v-col>
                    <v-col cols="3">
                        <CardRent></CardRent>
                    </v-col>
                    <v-col cols="6">
                        <CardComponent></CardComponent>
                    </v-col>
                    <v-col cols="6">
                        <BooksList></BooksList>
                    </v-col>
                   
                </v-row>
            </v-container>
            </v-main>
     </v-app>
</template>

<script> 

import CardComponent from '@/components/CardComponent.vue';
import BooksList from '../components/BooksList.vue';
import CardPublisher from '../components/CardPublisher.vue';
import CardUser from '../components/CardUser.vue';
import CardBook from '../components/CardBook.vue';
import CardRent from '../components/CardRent.vue';
  export default {
    components: { CardComponent, BooksList, CardPublisher, CardUser, CardBook, CardBook, CardRent}
    }
</script>
<style>
 

</style>
