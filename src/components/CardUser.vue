<template>
    <v-container>
        <v-row>
            <v-card  color="white"  rounded="xl">
                <v-row>
                    <v-col>
                        <v-list-item three-line>
                            <v-list-item-content>
                                <div class="mb-4">
                                    <v-btn fab color="white" elevation="0" to="/user">
                                        <v-icon color="black">mdi-account</v-icon>
                                    </v-btn>
                                </div>
                                <v-list-item-subtitle class="font-weight-bold black--text"> Quantidade de Usuários
                                </v-list-item-subtitle>
                                <v-list-item-title class="headline mb-1 black--text">
                                    {{ quantUser }}
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
import UserDataService from '@/services/UserDataService';
export default {
    data: () => ({
        users: [],
        quantUser: []
    }),
    methods: {
        listar() {
            UserDataService.getAll().then((resposta) => {
                this.users = resposta.data;
                this.quantUser = this.users.length;
            });
        }
    },
    mounted() {
        this.listar();
    },
}
</script>
<style scoped>
    @media (max-width: 700px) {
        .img__avatar{
            display: none;
        }
    }
</style>