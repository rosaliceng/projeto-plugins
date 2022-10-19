<template>
    <v-card style="border: 4px solid white"  max-width="400" min-heigh="200" class="mx-auto" rounded="xl">
        <v-img src=../assets/girlReadding2.jpg width="400" height="250" >
        </v-img>
        <v-card-title class="headline black--text">Último livro alugado</v-card-title>
            <v-card-text>
                <li>
                    <span class="black--text" v-if="this.lastBookRented.length > 0"> {{ this.lastBookRented }}</span>
                    <span v-else>---</span>
                </li>
            </v-card-text>
    </v-card>    
</template>

<script>


import RentDataService from '@/services/RentDataService';

export default {
    data: () => ({
        rents: [],
        lastRent: [],
        lastBookRented: []
    }),
    methods: {
        list() {
            RentDataService.getAll().then((resposta) => {
                console.log('Rents', resposta.data);
                this.rents = resposta.data;
                this.lastRent = this.rents[this.rents.length - 1];
                this.lastBookRented = this.lastRent.book.name;
            });
        }
    },
    mounted() {
        this.list();
    },
}
</script>

