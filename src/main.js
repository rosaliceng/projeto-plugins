import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import router from './router'
import VueSweetAlert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import VueApexCharts from 'apexcharts'

Vue.use(VueSweetAlert2);

Vue.config.productionTip = false
 
//  Vue.use(VueApexCharts)

//   Vue.component('apexchart',VueApexCharts)
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
