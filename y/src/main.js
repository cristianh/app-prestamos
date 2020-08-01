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
import Button from 'primevue/button';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';







import 'primevue/resources/themes/saga-blue/theme.css'; //theme
//import 'primevue/resources/primevue.min.css';    
import 'primevue/resources/primevue.min.css' //core css
import 'primeicons/primeicons.css' //core css

Vue.component('PickList', PickList);
Vue.component('Toast', Toast);
Vue.component('Button', Button);
Vue.use(require('vue-moment'));



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

axios.defaults.baseURL = 'https://us-central1-manifest-life-279516.cloudfunctions.net/';
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.headers.post['Content-Type'] = '"Access-Control-Allow-Origin", "*"';
// axios.defaults.headers.post['Accept'] = 'application/json';




Vue.use({ axios });
Vue.use({ firebase });
Vue.use(ToastService);
Vue.use({ db });

//Use the window object to make it available globally.
window.axios = axios;
window.firebase = firebase;
window.db = db;

Vue.config.performance = false
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