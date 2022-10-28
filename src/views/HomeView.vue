<template>
    <v-app>
        <v-main class="pink accent-2">
            <v-container>
                <v-row>
                    <v-col>
                        <CardUser></CardUser>
                    </v-col>
                    <v-col>
                        <CardPublisher></CardPublisher>
                    </v-col>
                    <v-col>
                        <CardBook></CardBook>
                    </v-col>
                    <v-col>
                        <CardRent></CardRent>
                    </v-col> 
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6">
                        <BarChart></BarChart>
                    </v-col>
                    <v-col cols="15" sm="6" >
                        <CardComponent></CardComponent>
                    </v-col>
                    
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>

import CardComponent from '@/components/CardComponent.vue';
import CardPublisher from '../components/CardPublisher.vue';
import CardUser from '../components/CardUser.vue';
import CardBook from '../components/CardBook.vue';
import CardRent from '../components/CardRent.vue';
import BarChart from "../components/BarChart.vue";

export default {
    components: { CardComponent, CardPublisher, CardUser, CardBook, CardBook, CardRent, BarChart }

}

</script>
<style>

</style>
