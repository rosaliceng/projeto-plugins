<template>
    <v-container >
        <v-row>
            <v-card  color="white" rounded="xl">
                <v-row>
                    <v-col>
                        <v-list-item three-line>
                            <v-list-item-content>
                                <div class="mb-4">
                                    <v-btn fab color="white" elevation="0" to="/publisher">
                                        <v-icon color="black">mdi-bookshelf</v-icon>
                                    </v-btn>
                                </div>
                                <v-list-item-subtitle class="font-weight-bold black--text"> Quantidade de Editoras
                                </v-list-item-subtitle>
                                <v-list-item-title class="headline mb-1 black--text">
                                    {{ quantPublisher }}
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
import PublisherDataService from '@/services/PublisherDataService';
export default {
    data: () => ({
        publishers: [],
        quantPublisher: []
    }),
    methods: {
        listar() {
            PublisherDataService.getAll().then((resposta) => {
                this.publishers = resposta.data;
                this.quantPublisher = this.publishers.length;
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