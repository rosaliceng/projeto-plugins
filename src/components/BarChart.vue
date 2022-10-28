<template>
  <v-card class="pa-3" color="white" rounded="xl">
    <apexcharts width="100%" type="bar" :options="chartOptions" :series="series"></apexcharts>
  </v-card>
</template>
<script>

import BookDataService from '@/services/BookDataService'
import VueApexCharts from "vue-apexcharts"


export default {
  name: "BarChart",
  components: {
     apexcharts: VueApexCharts,
    BookDataService,
  },
  data: function () {
    return {
      chartOptions: {
       books:[], 
        chart: {
          id: "basic-bar",
          
          toolbar: {
            show: false,
          },
          animations: {
            speed: 200,
          },

        },
        title: {
          display: true,
          text: 'Top 3 Livros Mais Alugados'
        },

        dataLabels: {
          style: {
            colors: ['Black'],

          }
        },
       
        plotOptions: {
          bar: {
            distributed: true
          },
        },
        xaxis: {
          type: "category",
          categories: ["Quantidade Total Alugado"],
          axisBorder: {
            show: true,
            color: "Black",
            height: 1,
            width: "100%",
            offsetX: 0,
            offsetY: 0,
          },
        }
      },
      
      stroke: {
          show: true,
          width: 50,
           colors: ["black"],
          // colors: ["#008FFB", "#004D40", "#F9C80E"],
        },

      series: [
        {
          name: "",
          data: [0, 0, 0]
        }
      ]
    };
  },
  mounted(){
    this.updateChart();
  },

  methods: {
    updateTheme(e) {
      this.chartOptions = {
        theme: {
          palette: 'black'
        }
      };
    },
    updateChart() {
    
      var books = [ { "name": "O pequeno príncipe", "totalRented": 12 }, { "name": "Code Clean", "totalRented": 10},{ "name": "Estação Carandiru", "totalRented": 7}];
      this.chartSet = books;
      this.series = [
        {
          name: this.chartSet[0].name,
          data: [this.chartSet[0].totalRented],
        },
        {
          name: this.chartSet[1].name,
          data: [this.chartSet[1].totalRented],
        },
        {
          name: this.chartSet[2].name,
          data: [this.chartSet[2].totalRented],
        },
      ];

    }
  }
}


</script>