import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    clientes:[],
    cobros_pendientes:[],
    zonas:[],
    tasaseinteres:[],
    contador:0
  },
  mutations: {
    addTasaseInteres(state, tazas){
      state.tasaseinteres.unshift(tazas)
    },
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
    },
    cobroPendiente(state,clientePendiente){
        state.cobros_pendientes.unshift(clientePendiente)
    }
  },
  getters: {
    getClientes:state=>{
      return state.clientes
    },
    getClientesAbonos:state=>{
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
    },
    getTazaseInteres:state=>{
      return state.tasaseinteres
    }
  },
  actions: {},
  modules: {}
});
