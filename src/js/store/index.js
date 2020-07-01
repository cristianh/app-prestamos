import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    clientes:[],
    zonas:[],
    contador:0
  },
  mutations: {
   addNewClientes (state, clientenuevo) {
      // mutate state
      //console.log(clientenuevo);
      state.contador= state.contador+1;
      state.clientes.unshift(clientenuevo)
    },
    addNewZona (state, zonanueva) {
      // mutate state
      //console.log(clientenuevo);
      
      state.zonas.unshift(zonanueva)
    },
    getSetNuevoClientes (state,posicion){
      state.clientes[posicion].nuevo=false
    }
  },
  getters: {
    getClientes:state=>{
      return state.clientes
    },
     getZonas:state=>{
      return state.zonas
    },
    getContador:state=>{
      return state.contador
    },
    getContadorClientes:state=>{
      return state.clientes.length
    }
  },
  actions: {},
  modules: {}
});
