import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    clientes:[],
    contador:0
  },
  mutations: {
   addNewClientes (state, clientenuevo) {
      // mutate state
      //console.log(clientenuevo);
      state.contador= state.contador+1;
      state.clientes.unshift(clientenuevo)
    }
  },
  getters: {
    getClientes:state=>{
      return state.clientes
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
