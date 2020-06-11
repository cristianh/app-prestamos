import { firebase } from "@firebase/app";
import "@firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyA8t8KjQDFQhJ62OHZoaKc7eJ3QrvEYFXA",
  authDomain: "manifest-life-279516.firebaseapp.com",
  databaseURL: "https://manifest-life-279516.firebaseio.com",
  projectId: "manifest-life-279516",
  storageBucket: "manifest-life-279516.appspot.com",
  messagingSenderId: "39426034417",
  appId: "1:39426034417:web:a4d70a676d4c70e3b43750",
  measurementId: "G-056LKDB696"
});

export const db = firebaseApp.firestore();