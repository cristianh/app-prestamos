// Import Vue
import Vue from 'vue';

import axios from 'axios';

import firebase from 'firebase'

import store from "./store/index";

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

var db = firebase.firestore();



// Import Framework7
import Framework7 from 'framework7/framework7-lite.esm.bundle.js';

// Import Framework7-Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import Framework7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.less';

Vue.use({axios});
Vue.use({firebase});
Vue.use({db});
Vue.use(require('vue-moment'));

//Use the window object to make it available globally.
window.axios = axios;
window.firebase = firebase;
window.db = db;

// Import App Component
import App from '../components/app.vue';


// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);

// Init App
new Vue({
  el: '#app',
  store,
  render: (h) => h(App),

  // Register App Component
  components: {
    app: App
  },
});