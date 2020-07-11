import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    clientes:[],
    clientes_lista_ordenada:[],
    temporal1:'',
    temporal2:'',
    cobros_pendientes:[],
    zonas:[],
    tasaseinteres:[],
    contador:0,
    estado_ruta:false,
    cobrador_ordena_lista:false
    
  },
  mutations: {
    contadorCobrosEfectivos(state, tazas){

    },
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
    SetPosicionListaClientes (state,data_posicion){
      // state.clientes.splice(data_posicion.data.to,0,data_posicion.elm.el2);
      state.clientes.splice(data_posicion.data.from,0,data_posicion.elm.el1);
    },

    SetEliminarPosicionListaClientes (state,data_posicion){
      state.clientes.splice(data_posicion.data.to,1);
      // state.clientes.splice(data_posicion.data.from,1);

      
    
        // let elemento1=state.clientes[data_posicion.from];
        // let elemento2=state.clientes[data_posicion.to];

        

        // state.clientes[data_posicion.from]=elemento1;
        // state.clientes[data_posicion.to]=elemento2;

       
        // state.clientes.splice(data_posicion.from,1);
        // state.clientes.splice(data_posicion.from,1,elemento2);
        // state.clientes.splice(data_posicion.to,1);
        // state.clientes.splice(data_posicion.to,1,elemento1);

        //  state.clientes=[];

  


        

        // state.clientes.splice(data_posicion.to,1);

        //  state.clientes.splice(data_posicion.from,1,elemento2);
        // state.clientes.splice(data_posicion.to,1,elemento1);
        
        // state.clientes.splice(data_posicion.from,0,elemento2);
        // state.clientes.splice(data_posicion.to,0,elemento1);
        // state.clientes.splice(,0,elemento1);

        
       
        
        // state.clientes.slice(data_posicion.to,data_posicion.from);

        
    },
    setEstadoListaOrdenada(state,newstado){
      state.cobrador_ordena_lista=newstado;
    },
    setEstadoRuta(state,newEstado){
      state.estado_ruta=newEstado;
    },
    cobroPendiente(state,clientePendiente){
        state.cobros_pendientes.unshift(clientePendiente)
    }
  },
  getters: {
    getClientes:state=>{
      return state.clientes
    },
    getClientes_lista_Ordenada:state=>{
      return state.clientes_lista_ordenada
    },
    getEstado_Lista_ordenada:state=>{
      return state.cobrador_ordena_lista
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
    },
    getEstadoRuta:state=>{
      return state.estado_ruta
    },
    getOrdenarClientes:state=>{
      return state.clientes.sort(function (a, b) {
  if (a.data.posicion > b.data.posicion) {
    return 1;
  }
  if (a.data.posicion < b.data.posicion) {
    return -1;
  }
  // a must be equal to b
  return 0;
})
    }
  },
  actions: {},
  modules: {}
});
