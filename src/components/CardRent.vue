<template>
    <v-container >
        <v-row>
            <v-card color="white" rounded="xl">
                <v-row>
                    <v-col>
                        <v-list-item three-line>
                            <v-list-item-content>
                                <div class="mb-3">
                                    <v-btn fab color="white" elevation="0" to="/rent">
                                        <v-icon color="black">mdi-book-account</v-icon>
                                    </v-btn>
                                </div>
                                <v-list-item-subtitle class="font-weight-bold black--text"> Quantidade de Aluguéis
                                </v-list-item-subtitle>
                                <v-list-item-title class="headline mb-1 black--text">
                                    {{ quantRent}}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
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