<template>
    <v-container class="mt-5">
        <v-row>
            <v-card style="border: 4px solid white" class="pa-1" color="white" elevation="13" rounded="xl">
                <v-row>
                    <v-col cols="12" sm="8">
                        <v-list-item three-line>
                            <v-list-item-content>
                                <div class="mb-4">
                                    <v-btn fab color="white" elevation="0" to="/book">
                                        <v-icon color="black">mdi-book</v-icon>
                                    </v-btn>
                                </div>
                                <v-list-item-subtitle class="font-weight-bold black--text"> Número de livros      
                                </v-list-item-subtitle>
                                <v-list-item-title class="headline mb-1 black--text">
                                    {{ quantBook }}
                                </v-list-item-title>
                                
                            </v-list-item-content>
                        </v-list-item>
                    </v-col>
                    <v-col cols="8" sm="1">
                        
                    </v-col>
                </v-row>
            </v-card>
        </v-row>
    </v-container>
</template>
<script>
import BookDataService from '@/services/BookDataService';
export default {
    data: () => ({
        books: [],
        quantBook: []
    }),
    methods: {
        listar() {
            BookDataService.getAll().then((resposta) => {
                this.books = resposta.data;
                this.quantBook = this.books.length;
            });
        }
    },
    mounted() {
        this.listar();
    },
}
</script>
<style scoped>
</style>