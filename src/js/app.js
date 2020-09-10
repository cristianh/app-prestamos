// Import Vue
import Vue from 'vue';

import axios from 'axios';

import firebase from 'firebase'

import store from "./store/index";

import Message from 'primevue/message';

import { WhatsApp } from 'vue-socialmedia-share';
import SimpleVueValidation from 'simple-vue-validator';

import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyB56SdrfZ3OE7m6VPWcTqsGVPxbJC1ifTY',
        libraries: 'places', // This is required if you use the Autocomplete plugin
        // OR: libraries: 'places,drawing'
        // OR: libraries: 'places,drawing,visualization'
        // (as you require)

        //// If you want to set the version, you can do so:
        // v: '3.26',
    },
});



Vue.use(SimpleVueValidation);





Vue.use(WhatsApp)


import 'primevue/resources/themes/saga-blue/theme.css'; //theme
//import 'primevue/resources/primevue.min.css';    
import 'primevue/resources/primevue.min.css' //core css
import 'primeicons/primeicons.css'

const firebaseConfig = {
    apiKey: "AIzaSyB56SdrfZ3OE7m6VPWcTqsGVPxbJC1ifTY",
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
var dbrealtime = firebase.database();



// Import Framework7
import Framework7 from 'framework7/framework7-lite.esm.bundle.js';

// Import Framework7-Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import Framework7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.less';

Vue.use({ axios });
Vue.use({ firebase });
Vue.use({ db });
Vue.use({ dbrealtime });
Vue.use(require('vue-moment'));
Vue.component('Message', Message);

import VueCurrencyInput from 'vue-currency-input'


Vue.use(VueCurrencyInput)


import VueCurrencyFilter from 'vue-currency-filter'
Vue.use(VueCurrencyFilter, {
        symbol: '$', // El símbolo, por ejemplo €
        thousandsSeparator: '.', // Separador de miles
        fractionCount: 0, // ¿Cuántos decimales mostrar?
        fractionSeparator: '.', // Separador de decimales
        symbolPosition: 'front', // Posición del símbolo. Puede ser al inicio ('front') o al final ('') es decir, si queremos que sea al final, en lugar de front ponemos una cadena vacía ''
        symbolSpacing: true // Indica si debe poner un espacio entre el símbolo y la cantidad
    })
    //Use the window object to make it available globally.
window.axios = axios;
window.firebase = firebase;
window.db = db;

axios.defaults.baseURL = 'https://us-central1-manifest-life-279516.cloudfunctions.net/';
// axios.defaults.baseURL = 'http://localhost:4001/manifest-life-279516/us-central1/';
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Content-Type'] = '"Access-Control-Allow-Origin", "*"';
axios.defaults.headers.get['Content-Type'] = '"Access-Control-Allow-Origin", "*"';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// axios.defaults.headers.post['Content-Type'] = 'application/json';

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