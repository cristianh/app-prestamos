import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    saldo_pago_dia:[],
    jornada_cobrador:{
        hora_inicial:'', 
        fecha_inicial:'',
        fecha_final:'',
        hora_final:'',
        balance_final_manual:'',
        balance_final:'',
        catidad_cobrosefectivos:0,
        catidad_cobrosenofectivos:0,
        numero_cobros_pendientes:0,
        total_cobros_realizados:0
    },
    clientes:[],
    clientes_lista_ordenada:[],
    clientes_cobros:[],
    clientes_prestamos:[],
    temporal1:'',
    temporal2:'',
    cobros_pendientes:[],
    zonas:[],
    tasaseinteres:[],
    contador:0,
    estado_ruta:false,
    cobrador_ordena_lista:false,
    balance_zona:0
    
  },
  mutations: {
    setfechInicialJornada(state,fecha_inicial_jornada){
      state.jornada_cobrador.fecha_inicial=fecha_inicial_jornada;
    },
    sethoraInicialJornada(state,hora_inicial_jornada){
      state.jornada_cobrador.hora_inicial=hora_inicial_jornada;
    },
    setfechaFinalJornada(state,fecha_final_jornada){
      state.jornada_cobrador.fecha_final=fecha_final_jornada;
    },
    sethoraFinalJornada(state,hora_final_jornada){
      state.jornada_cobrador.hora_final=hora_final_jornada;
    },
    setbalance_finalManualJornada(state,nuevo_valance){
      state.jornada_cobrador.balance_final_manual=nuevo_valance;
    },
    setbalance_finalJornada(state,nuevo_valance){
      state.jornada_cobrador.balance_final=nuevo_valance;
    },
    setCatidad_cobrosefectivosJornada(state){
      state.jornada_cobrador.catidad_cobrosefectivos++;
    },
    setCatidad_cobrosenofectivosJornada(state){
      state.jornada_cobrador.catidad_cobrosenofectivos++;
    },
    setNumero_cobros_pendientesJornada(state){
      state.jornada_cobrador.numero_cobros_pendientes++;
    },
    setTotalCobros(state,numeroCobros){
      state.jornada_cobrador.total_cobros_realizados=numeroCobros;
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
    addClientesCobros (state, clientenuevocobro) {
      // mutate state
      //console.log(clientenuevo);
      state.clientes_cobros.unshift(clientenuevocobro)
    },
    addClientesPrestamosList (state, clientenuevoprestamolist) {
      // mutate state
      //console.log(clientenuevo);
      state.clientes_cobros.unshift(clientenuevoprestamolist)
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
    
      state.clientes.splice(data_posicion.data.from,1,data_posicion.elm.el1);
      state.clientes.splice(data_posicion.data.to,1,data_posicion.elm.el2);
    
    },

    SetEliminarPosicionListaClientes (state,data_posicion){
      state.clientes.splice(data_posicion.data.from,1);
    },
    setEstadoListaOrdenada(state,newstado){
      state.cobrador_ordena_lista=newstado;
    },
    setBalanceZona(state,nuevoBalance){
      state.balance_zona=nuevoBalance;
    },
    setEstadoRuta(state,newEstado){
      state.estado_ruta=newEstado;
    },
    setEstadoPrestamoRuta(state,data){
       let posicion=state.clientes_prestamos.findIndex(x=>x.id==data.id);
     
      state.clientes_prestamos[posicion].data.prestamos[0].estado_pago_ruta=data.estadopagoruta;
    },
    setEstadoDiasMora(state,data){
       let posicion=state.clientes_prestamos.findIndex(x=>x.id==data.id);
      state.clientes_prestamos[posicion].data.prestamos[0].dias_con_mora=data.dias_mora;
    },
    cobroClientePendiente(state,clientePendiente){
        state.cobros_pendientes.unshift(clientePendiente)
    },
    eliminarClientePrestamoDiario(state,Idcliente){
      let posicion=state.clientes_prestamos.findIndex(x=>x.id==Idcliente);
      state.clientes_prestamos.splice(posicion,1);
    },
    setEstadoTotalAPagar(state,data){
      let posicion=state.clientes_prestamos.findIndex(x=>x.id==data.Idcliente);
      state.saldo_pago_dia[posicion]=data.pagototalhoy;
    }

    
  },
  getters: {
    getSaldoApagarHoy:state=>{
       let valor_prestamo=0;
       let taza_seleccionada_interes=0;
       let plazo_dias=0;
       let total_apagar=0;
       let pago=0;

       state.clientes_prestamos.forEach(elementP => {
       valor_prestamo=elementP.data.prestamos[0].valor;
          taza_seleccionada_interes;
          switch(elementP.data.prestamos[0].plan_seleccionado){
            case "10":
              taza_seleccionada_interes=0.10
            break
             case "15":
              taza_seleccionada_interes=0.15
            break
             case "20":
              taza_seleccionada_interes=0.20
            break
          }
           if(elementP.data.prestamos[0].dias_con_mora>=1){
              plazo_dias= Number(elementP.data.prestamos[0].dias_plazo)+1;
            }else{
               plazo_dias= elementP.data.prestamos[0].dias_plazo;
            }
         
          
          total_apagar=(Number(valor_prestamo)*taza_seleccionada_interes)+Number(valor_prestamo);
          console.log(total_apagar);
          
          if(Number(plazo_dias)<=0){
            pago=0;
          }else{
            
          }
         
          pago=Math.round(Number(total_apagar)/Number(plazo_dias));
          if(elementP.data.prestamos[0].saldo_pendiente>0){
            pago=Number(elementP.data.prestamos[0].saldo_pendiente)+Number(pago);
          }
          state.saldo_pago_dia.push(pago);
          
       });
       return state.saldo_pago_dia;
    },
    getCobrosTotalCobrado:state=>{
       return state.jornada_cobrador.total_cobros_realizados;
    },
    getCobrosPendientes:state=>{
       return state.jornada_cobrador.numero_cobros_pendientes;
    },
    getCobrosEfectivos:state=>{
       return state.jornada_cobrador.catidad_cobrosefectivos;
    },
    getCobrosNoEfectivos:state=>{
       return state.jornada_cobrador.catidad_cobrosenofectivos;
    },
    getClientesPrestamo:state=>{
       let element_count=state.clientes.filter(x => x.data.prestamos.length>0 && x.data.prestamos[0].estado_prestamo!=true);
       return element_count.length;
    },
    getEstadoPrestamoRuta:state=>{
      state.clientes_prestamos.forEach(element => {
             return element.data;
      });
   
    },
    getClientesListaPrestamo:state=>{
            return state.clientes_prestamos.sort(function (a, b) {
          if (a.data.posicion < b.data.posicion) {
            return 1;
          }
          if (a.data.posicion > b.data.posicion) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
    },
    getJornadaCobrador:state=>{
      return state.jornada_cobrador
    },
    getClientesCobros:state=>{
      return state.clientes_cobros
    },
    getBalance:state=>{
      return state.balance_zona
    },
    getClientes:state=>{
      return state.clientes
    },
     getContadorClientes:state=>{
      return state.clientes.length
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
});
    }
  },
  actions: {},
  modules: {}
});
