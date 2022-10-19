import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import router from './router'
import VueSweetAlert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import ApexCharts from 'apexcharts'



// const Toast = Swal.mixin({
//   toast: true,
//   position: 'top-end',
//   showConfirmButton: false,
//   timer: 3000,
//   timerProgressBar: true,
// });

// window.Toast = Toast;

Vue.use(VueSweetAlert2);

Vue.config.productionTip = false
 
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
