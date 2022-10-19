<<template>
    <v-card style="border: 4px solid white"  max-width="400" heigh="100" class="mx-auto" rounded="xl">
        <v-img src="../assets/bookImagination.jpg" width="400"  height="105">
        </v-img>
        <v-card-title class="headline black--text" icon color="yellow">Livros mais alugados</v-card-title>
        <div class="white">
                <v-col>
                    <v-card-text v-if="this.firstBook.maxRented > 0">
                        <li>
                            <span>{{ this.firstBook.name }}</span>
                        </li>
                    </v-card-text>
                    <v-card-text v-if="this.secundBook.maxRented > 0">
                            <li>
                            <span>{{ this.secundBook.name }}</span>
                            </li>
                    </v-card-text>
                    <v-card-text v-if="this.tercBook.maxRented > 0">
                        <li>
                            <span>{{ this.tercBook.name }}</span>
                        </li>
                    </v-card-text>
                </v-col>
            </div>
    </v-card>    
</template>
<script>
import BookDataService from '@/services/BookDataService';

export default {
    data: () => ({
        books: [],
        firstBook: [],
        secundBook: [],
        tercBook: []
       
    }),
    methods: {
        listar() {
            BookDataService.getMaxRented().then((resposta) => {
                this.books = resposta.data;
                if (this.books[0] != null) {
                    this.firstBook = this.books[0];
                } else {
                    this.firstBook = '...'
                }
                if (this.books[1] != null) {
                    this.secundBook = this.books[1];
                } else {
                    this.secundBook = '...'
                }
                if (this.books[2] != null) {
                    this.tercBook = this.books[2];
                } else {
                    this.tercBook = '...'
                }
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
