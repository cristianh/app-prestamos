import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import firebase from 'firebase'
import axios from 'axios';
import PickList from 'primevue/picklist';

Vue.component('Dialog', PickList);

const firebaseConfig = {
  apiKey: "AIzaSyA8t8KjQDFQhJ62OHZoaKc7eJ3QrvEYFXA",
  authDomain: "manifest-life-279516.firebaseapp.com",
  databaseURL: "https://manifest-life-279516.firebaseio.com",
  projectId: "manifest-life-279516",
  storageBucket: "manifest-life-279516.appspot.com",
  messagingSenderId: "39426034417",
  appId: "1:39426034417:web:a4d70a676d4c70e3b43750",
  measurementId: "G-056LKDB696"
};

firebase.initializeApp(firebaseConfig);

Vue.use({axios});
Vue.use({firebase});

//Use the window object to make it available globally.
window.axios = axios;
window.firebase = firebase

Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)

new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})
