<template>
    <v-container class="mt-5">
        <v-row>
            <v-card class="pa-1" color="white" elevation="13" rounded="xl">
                <v-row>
                    <v-col cols="12" sm="8">
                        <v-list-item three-line>
                            <v-list-item-content>
                                <div class="mb-4">
                                    <v-btn fab color="white" elevation="0" to="/rent">
                                        <v-icon color="black">mdi-book-account</v-icon>
                                    </v-btn>
                                </div>
                                <v-list-item-subtitle class="font-weight-bold black--text">Número de aluguéis
                                </v-list-item-subtitle>
                                <v-list-item-title class="headline mb-1 black--text">
                                    {{ quantRent}}
                                </v-list-item-title>
                              
                            </v-list-item-content>
                        </v-list-item>
                    </v-col>
                    <v-col cols="11" sm="2">
                        <v-avatar size="10" class="ml-n10 mt-4" tile>
                            <!-- <v-img src="@/assets/img/publisher-outline.png"></v-img> -->
                        </v-avatar>  
                    </v-col>
                </v-row>
            </v-card>
        </v-row>
    </v-container>
</template>
<script>
import RentDataService from '../services/RentDataService';
export default {
    data: () => ({
        rents: [],
        quantRent: []
    }),
    methods: {
        listar() {
            RentDataService.getAll().then((resposta) => {
                this.rents = resposta.data;
                this.quantRent = this.rents.length;
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