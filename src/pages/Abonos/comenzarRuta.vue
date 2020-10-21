<template>
<f7-page name="Abono">
  <f7-navbar   :sliding="false">
     <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
        <f7-nav-title sliding>Ruta</f7-nav-title>
      </f7-nav-left>
    <f7-nav-right>
      <!-- <f7-link class="searchbar-enable" data-searchbar=".searchbar-ruta" icon-ios="f7:search" icon-aurora="f7:search" icon-md="material:search"></f7-link> -->
    </f7-nav-right>
    <!-- <f7-searchbar
      expandable
      class="searchbar-ruta"
      search-container=".search-list-ruta"
      search-in=".item-subtitle"
      :disable-button="!$theme.aurora"
      placeholder="Buscar por cedula..."
    ></f7-searchbar> -->
     <!-- <f7-nav-title sliding>Abonos</f7-nav-title>
      <f7-nav-title-large>Abonos</f7-nav-title-large> -->
  </f7-navbar>

  <f7-list class="searchbar-not-found">
    <f7-list-item title="Cliente no encontrado."></f7-list-item>
    <f7-row>
        
    <f7-col>
        <!-- {{[0]}} -->
        <!-- {{jornada_cobrador}} -->
      
      <f7-button fill large small href="/cliente_nuevo/" color="green">NUEVO CLIENTE</f7-button>
    </f7-col>
    </f7-row>
  </f7-list>
     <div v-if="estado_lista_prestamos_clientes"> 
         <f7-block  inset>
            <f7-row>
            <f7-col lg="12" md="12">
                <f7-button fill  :disabled="btn_comenzar_ruta" @click="onVerificarDiaListaCobros">Comenzar<f7-icon material="swap_vert" size="21px"></f7-icon></f7-button>
            </f7-col>
            </f7-row>
            </f7-block>
             
               <div v-if="mostrar_resultado_final"> 
                 <f7-block-title>Informe final de ruta:</f7-block-title>
                 <f7-card>
                   
          <f7-card-content>
           <!-- Final:{{getBalanceFinal}}
           Realizados hoy p:{{getPrestamosRealiozadoshoy}}
           Total cobros:{{getTotalCobros}} -->
        
          Cobros pagos: {{informacion_final_ruta.Cobros_pagos}}<br>
          Cobros no pagos: {{informacion_final_ruta.Cobros_nopagos}}<br>
          <!-- Cobros pendientes: {{getCatidadCobrosPendientes}}<br> -->
          Balance final de la zona: {{Number(informacion_final_ruta.Balance_inicial_de_la_zona)+Number(informacion_final_ruta.Total_dinero_recogido)|currency}}<br>
          Total Prestado: {{getPrestamosRealiozadoshoy|currency}}<br>
          <!-- Balance final de la zona: {{Number(getTotalCobros)+Number(getBalanceInicial)|currency}}<br> -->
          Total dinero recogido: {{informacion_final_ruta.Total_dinero_recogido|currency}} 
          <f7-row v-if="ruta_terminada">
          <f7-col md="12">
              <f7-list >
                <f7-list-input
              outline
              floating-label
              label="Dinero recogido hoy"
              type="text"
              :value=jornada_cobrador.balance_final_manual
              placeholder="Por favor ingrese el dinero recogido hoy."
              required
              validate
              pattern="[0-9.]*"
              error-message="Solo numeros"
             
               v-currency="{
          locale: 'de-DE',
          currency: null,
          valueAsInteger: true,
          distractionFree: false,
          precision:0,
          autoDecimalMode: true,
          valueRange: { min: 0 },
          allowNegative: false
        }"
              @input="jornada_cobrador.balance_final_manual=$event.target.value"
            ></f7-list-input>
            <f7-button large :disabled="btn_ruta_terminada" @click="onConfirmarJornada" >CONFIRMAR</f7-button>
                </f7-list>
                
          </f7-col>
          
        </f7-row>
          
           </f7-card-content>
         </f7-card>
         </div>
             
     </div>
      <div v-else>
          <!-- {{getTodosClientesPrestamo}} -->
       <!-- {{clientes}} -->
       <!-- {{}} -->
          <div v-if="getClientesCobrosHoy.length>=1">
            <!-- <f7-block inset>
              <f7-row>
        <f7-col>
                    <f7-button  sortable-toggle=".sortable"  fill  color="blue" @click="cambiarEstadoLista" :text="txt_ordenar?'GUARDAR':'ORDENAR'"></f7-button>
                </f7-col>
         </f7-row>
         </f7-block> -->
          <f7-block>
        <f7-row>
        <f7-col>
            <f7-button  fill color="red" large small @click="onCerrarRuta">Terminar Ruta <f7-icon material="cancel" size="21px"></f7-icon></f7-button>
        </f7-col>
         <f7-col>
      
          <f7-button  sortable-toggle=".sortable" fill large small color="blue"  @click="onCambiarMensajeOrdenar">{{mensaje_ordenar}}<f7-icon size="21px" :material="icono_boton_lsita"></f7-icon></f7-button>
         </f7-col>
    
         </f7-row>
        </f7-block>
         <f7-block>
       <!-- {{posiciones_lista_ordenada}} -->
          
         <f7-block-title >Clientes</f7-block-title>
       <!-- :link="`/cliente_detalles/${cliente.id}/`" -->
     
        <f7-list  sortable @sortable:sort="onSort"   class="search-list-ruta searchbar-found">
            
<!-- :after="`${cliente.data.prestamos.length==0 || cliente.data.prestamos==undefined? 'NA':Number(cliente.data.prestamos[0].dias_con_mora)>=1?'Mora: '+Number(cliente.data.prestamos[0].dias_con_mora)+' dia':'Mora: '+Number(cliente.data.prestamos[0].dias_con_mora)+' dias'}`"  -->
<!-- {'pendiente':cliente.data.prestamos[0].estado_pago_ruta==3,'normal':cliente.data.prestamos[0].estado_pago_ruta==0,'pago':cliente.data.prestamos[0].estado_pago_ruta==1,'no-pago':cliente.data.prestamos[0].estado_pago_ruta==2 -->
<!-- :subtitle="`Cedula: ${cliente.data.usuario.identificacion}`"  -->
<!-- :subtitle="`Cedula: ${cliente.data.id}`"   -->
        <f7-list-item  
        media-list
        swipeout
        :disabled="cliente.data.estado_pago_prestamo.nopago==true || cliente.data.estado_pago_prestamo.pago==true"
        v-for="(cliente,index,key) in getTodosClientesPrestamo"
       
        :badge="`${cliente.data.prestamos.length==0 || cliente.data.prestamos==undefined? 'NA':Number(cliente.data.prestamos[0].dias_con_mora)>=1?'Mora: '+Number(cliente.data.prestamos[0].dias_con_mora)+' dia':'Mora: '+Number(cliente.data.prestamos[0].dias_con_mora)+' dias'}`"
        :badge-color="`${cliente.data.prestamos.length==0 || cliente.data.prestamos==undefined? 'NA':Number(cliente.data.prestamos[0].dias_con_mora)>=1?'red':''}`"
        :class="{'pago':cliente.data.estado_pago_prestamo.pago==true,'no-pago':cliente.data.estado_pago_prestamo.nopago==true,'pendiente':cliente.data.estado_pago_prestamo.pendiente==true}"
        :subtitle="`Cedula: ${cliente.data.usuario.identificacion}`"   
        :id=cliente.data.id
        :key=key
        :title="`${cliente.data.usuario.nombre} ${cliente.data.usuario.apellido}`" 
        :footer="onMensajeCouta(cliente.data.estado_pago_prestamo,calculoTotalPagoHoy[index])"  
        @click="onClickClientePaginaDetalles(cliente.data.id,calculoTotalPagoHoy[index])"
        >
        <!-- <f7-swipeout-actions right> -->
        <!-- <f7-swipeout-button close overswipe color="green" @click="onReply(cliente,cliente.data.usuario.nombre+cliente.data.usuario.apellido)">Seleccionar</f7-swipeout-button> -->
        <!-- <f7-swipeout-button close color="blue" >Pendiente</f7-swipeout-button> -->
        <!-- <f7-swipeout-button confirm-text="Desea eliminar este cliente de la lista!" confirm-title="Seguro!" color="red" delete>Eliminar</f7-swipeout-button> -->
        <!-- </f7-swipeout-actions> -->
        <!-- {{typeOfData(getEstadoPrestamo)}} -->
        <!-- {{cliente.data.prestamos[0].estado_pago_prestamo.pendiente}} -->
        <!-- {{lista_cobros_realizados[index].estado}} -->
         <!-- {{cliente.data.activo }}
         {{cliente.data.prestamos[0].estado_pago_prestamo.pago}}
         {{cliente.data.prestamos[0].estado_pago_prestamo.nopago}}
         {{cliente.data.prestamos[0].estado_pago_prestamo.pendiente}} -->
        <!-- {{cliente.data.estado_pago_prestamo}} -->
        <!-- {{calculoTotalPagoHoy[index]}} -->
        </f7-list-item>
        </f7-list>
        </f7-block>
      </div>
            <!-- <div v-else>
       <f7-block  inset>
         <f7-card>
          <f7-card-content>
        No hay clientes con prestamo para hoy
          </f7-card-content>
         </f7-card>

</f7-block>
</div> -->
</div>

    <f7-sheet class="mensaje_final-sheet" :opened="sheetOpened" @sheet:closed="sheetOpened = false">
      <f7-toolbar>
        <div class="left" style="margin-left:12px">Informe final de ruta</div>
        <div class="right">
          <f7-link sheet-close>Cerrar</f7-link>
        </div>
      </f7-toolbar>
      <!-- Scrollable sheet content -->
      <f7-page-content>
   
        
       
        
        

        
      </f7-page-content>
    </f7-sheet>
 <f7-toolbar top >
                <f7-list style="width: 100%;" >
        
        <f7-list-input
        wrap
        type="text"
        placeholder="Buscar por nombre..."
        clear-button
        pattern="[A-za-z]*"
        @input="busqueda=$event.target.value"
      
      ></f7-list-input>
 </f7-list>
  </f7-toolbar>
</f7-page>
</template>



<script>
import AbonoService from '../Services/AbonoServices.js';
import CobradorService from '../Services/CobradoresServices.js';
import ClientesService from '../Services/ClientesService.js';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ciudadesData from '@/pages/Ciudades/Ciudades.js'


export default {
  components:{
    DataTable,
    Column
  },
  data() {
    return {
      lista_prestamos:[],
      lista_cobros_realizados:[],
      busqueda:'',
    // estado_peniente:false,
    btn_comenzar_ruta:false,
    btn_ruta_terminada:true,
    ruta_terminada:false,
    mostrar_resultado_final:false,
    sheetOpened: false,
    posiciones_lista_ordenada:[],
    estado_lista_prestamos_clientes:true,
    color_bedge:'',
    jornada_cobrador:{
      balance_final_manual:0
    },
    listaClientesGuardar:[],
    icono_boton_lsita:'swap_vert',
    mensaje_ordenar:'ORDENAR',
    clientes_lista_ordenada:[], 
      numero_clientes:0,
      corbradorService:null,
      clientesService:null,
      balance_zona:'',
      clientes:[],
      cliente_seleccionado:'',
      txt_ordenar:false,
      isLoadUsers:false,
      isComienzoRuta:false,
      informacion_final_ruta:{
                    Cobros_pagos: 0,
                    Cobros_nopagos: 0,
                    Balance_inicial_de_la_zona:0,
                    Total_prestado: 0,
                    Total_dinero_recogido:0
      },
      informacion_pago:{
        valor:0,
        // fecha:this.$moment(new Date).format("DD/MM/YYYY"), 
        fecha:new Date().toISOString().slice(0,10), 
        cliente:'',
        estado_abono:true
      },
      contador_dias_pago:0
      
    }
  },
  created() {
     this.corbradorService= new CobradorService();
     this.clientesService= new ClientesService();
  //     if(Boolean(localStorage.getItem("listagenerada"))==true || localStorage.getItem("listagenerada")=='true' ){
  //       this.onComenzarFornada()
  //   // //  alert("true",localStorage.getItem("listagenerada"))
      
  //   //   // this.onComenzarFornada()
  //   //   this.$store.commit('setEstadoListaCobrosRealizados')
  //  }
  },
  watch: {
    // UploadClientes(newCliente,oldCliente){
    //   this.clientes=this.$store.getters.getClientes;
    // },
    // isComienzoRuta(newCliente,oldCliente){
    //    this.isComienzoRuta=this.$store.getters.getEstadoRuta
    // }
  },
  beforeMount(){
    
    this.$store.watch(() => this.$store.getters.getEstadoPrestamoRuta, EstadosCobrosGuardados => { 
        // console.log('watched: ', EstadosCobrosGuardados) 
        this.lista_cobros_realizados=EstadosCobrosGuardados
    })
    
      
    
    this.balance_zona=localStorage.getItem("saldo_zona");
   
    this.clientes=this.$store.getters.getClientes
    
    this.jornada_cobrador=this.$store.getters.getJornadaCobrador;
    // this.isComienzoRuta=this.$store.getters.getEstadoRuta;
    // alert("inicio ruta",this.isComienzoRuta)
   
    if(Boolean(localStorage.getItem("listagenerada"))==true || localStorage.getItem("listagenerada")=='true' ){
       
    // this.onComenzarFornada()
   
    let estados=JSON.parse(localStorage.getItem('ListaEstadosCobro'))
        for (const key in estados) {
          if (estados.hasOwnProperty(key)) {
            const element = estados[key];
            if(element.estado==1 || element.estado==2){
              // element.estado==1
              // setAumentaContadorClientesListaPrestamos
              // console.log("..............")
              this.$store.commit('setQuitar_cobros_pendientesJornada',element.id);

            }

            
          }
        }

        //  this.$store.state.clientes_cobros=this.$store.getters.getOrdenarClientes
        // this.onComenzarFornada()
      //      let clientes_ordenados=this.$store.getters.getOrdenarClientes
      // console.log(clientes_ordenados)

      // for (const key in clientes_ordenados) {
      //   if (clientes_ordenados.hasOwnProperty(key)) {
      //     const element = clientes_ordenados[key];
      //     console.log(element)
      //   }
      // }
      this.isComienzoRuta=true;
    this.estado_lista_prestamos_clientes=false;
     
    }
    
         if(Boolean(localStorage.getItem("mostrar_resultado_final"))==true || localStorage.getItem("mostrar_resultado_final")=='true' ){
     
      // this.mostrar_resultado_final=localStorage.getItem("mostrar_resultado_final")
          this.estado_lista_prestamos_clientes=true
          //  alert(localStorage.getItem("jornada_confirmada"))
          if(Boolean(localStorage.getItem("jornada_confirmada"))==true || localStorage.getItem("jornada_confirmada")=='true' ){
          this.ruta_terminada=false
          this.btn_ruta_terminada=false
          }else{
            this.ruta_terminada=true
          this.btn_ruta_terminada=false
          }
         
          
          this.mostrar_resultado_final=Boolean(localStorage.getItem("mostrar_resultado_final")) 
       if(Boolean(localStorage.getItem("Informe_final_ruta"))){
          this.informacion_final_ruta=JSON.parse(localStorage.getItem("Informe_final_ruta"))
       }
         
          // this.$store.commit('setEstadoRuta',false);
         
          // this.btn_ruta_terminada=false
          // this.ruta_terminada=true
          // this.btn_comenzar_ruta=true
          // this.isComienzoRuta=false;
    }
         
     
    
  },
  beforeCreate(){
  //  if(Boolean(localStorage.getItem("listagenerada"))==true || localStorage.getItem("listagenerada")=='true' ){
  //       this.onComenzarFornada()
  //   // //  alert("true",localStorage.getItem("listagenerada"))
      
  //   //   // this.onComenzarFornada()
  //   //   this.$store.commit('setEstadoListaCobrosRealizados')
  //  }
  
  },
  computed: {
     getClientesCobrosHoy(){
       return this.$store.getters.getClientesCobros
     },
     getEstadoPrestamo(){
       let estados=this.$store.getters.getEstadoPrestamoRuta;
        let temporarlistaclientesprestamos=this.$store.getters.getClientesListaPrestamo
      // console.log("temporarlistaclientesprestamos",temporarlistaclientesprestamos);
      if(this.busqueda==""){
       return this.$store.getters.getEstadoPrestamoRuta
      }else{
       let cliente_find=temporarlistaclientesprestamos.findIndex(cliente => {
        let nombreCompleto= cliente.data.usuario.nombre+' '+cliente.data.usuario.apellido
         return nombreCompleto.toLowerCase().includes(this.busqueda.toLowerCase()) 
      //  return 
       }); 
      
       return this.$store.getters.getEstadoPrestamoRuta[cliente_find].estado
     
      }
     
      
      
    },
    getPrestamosRealiozadoshoy(){
      if(localStorage.getItem("total_prestado")){
        return Number(localStorage.getItem("total_prestado"))
      }else{
        return 0
      }
      
    },
    getTotalCobros(){
     return localStorage.getItem("total_cobros")
      // return this.$store.getters.getCobrosTotalCobrado  
    },
    getCantidadCobrosNoRealizados(){
     return this.$store.getters.getCobrosNoEfectivos   
    },
    getCatidadCobrosPendientes(){
     return this.$store.getters.getCobrosPendientes   
    },
    getCantidadCobrosEfectivos(){
      return this.$store.getters.getCobrosEfectivos
    },
    getBalanceFinal(){
      return this.$store.getters.getBalanceFinalZona
    },
    getBalanceInicial(){
      return localStorage.getItem("saldo_inicial_zona")
    },
    getSaldoBalaceZona(){
        this.balance_zona=localStorage.getItem("saldo_zona");
    },
    getTodosClientesPrestamo(){


      let temporarlistaclientesprestamos=this.$store.getters.getClientesCobros.sort((a, b) => {
                    if (a.data.posicion > b.data.posicion) {
                        return 1;
                    }
                    if (a.data.posicion < b.data.posicion) {
                        return -1;
                    }
                    // a must be equal to b
                    return 0;
      });
      // console.log("temporarlistaclientesprestamos",temporarlistaclientesprestamos);
      if(this.busqueda==""){
        return this.$store.getters.getClientesCobros.sort((a, b) => {
                    if (a.data.posicion > b.data.posicion) {
                        return 1;
                    }
                    if (a.data.posicion < b.data.posicion) {
                        return -1;
                    }
                    // a must be equal to b
                    return 0;
      });
      }else{
         return temporarlistaclientesprestamos.filter(cliente => {
        let nombreCompleto= cliente.data.usuario.nombre+' '+cliente.data.usuario.apellido
         return nombreCompleto.toLowerCase().includes(this.busqueda.toLowerCase()) 
      //  return 
       }); 
      }
    
    },
    getEstadosPrestamos(){
      return this.$store.getters.getEstadoPrestamoRuta
    },
     estadoPrestamodia(){
       
     },
    
     diasValoraPago(){
      let valor_apagar=[];
      for (const key in this.clientes) {
        if (this.clientes.hasOwnProperty(key)) {
          const element = this.clientes[key];
          if(element.data.prestamos.length>0){
          element.data.prestamos.forEach(elementP => {
             valor_apagar.push(elementP.total_apagar);
          });
          }
         
         
        }
      }
      return valor_apagar;
    },
     clientesConPrestamo(){
       let element=this.clientes.filter(x =>x.data.prestamos.length>0 && x.data.prestamos[0].estado_prestamo!=true);
       if(element){
         this.numero_clientes=Number(this.numero_clientes)+1; 
       }
        
       return element;
    },
     calculoTotalPagoHoy(){
      //  console.log(this.$store.getters.getSaldoApagarHoy);
      return this.$store.getters.getSaldoApagarHoy;
       
    }
  },
  methods:{
    onMensajeCouta(estado,pago_hoy){
    
      return estado.pago==true?'Pago':
      estado.nopago==true?'No pago':
      // console.log(Number(pago_hoy).toString().length)
      Number(pago_hoy).toString().length==4?'Saldo a pagar: $ '+Number(pago_hoy).toString().substring(0,1).concat('.')+Number(pago_hoy).toString().substring(1,Number(pago_hoy).toString().length): 'Saldo a pagar: '+ Number(pago_hoy).toLocaleString('es-CO',{style: 'currency',currency: 'COP',minimumSignificantDigits:1}) 
      // `${calculoTotalPagoHoy[index]!=undefined ? calculoTotalPagoHoy[index]==0?'Pago':calculoTotalPagoHoy[index]>0?'Saldo a pagar: '+Number(calculoTotalPagoHoy[index]).toLocaleString('es-CO',{style: 'currency',currency: 'COP',minimumSignificantDigits:1}):'Saldo a pagar: '+Number((calculoTotalPagoHoy[index]*(-1))).toLocaleString('es-CO',{style: 'currency',currency: 'COP',minimumSignificantDigits:1}):'NA'}`
    },
     onCambiarMensajeOrdenar(){
        //  this.txt_ordenar=!this.txt_ordenar
      

         switch (this.mensaje_ordenar) {
           case 'GUARDAR':
              if(this.clientes_lista_ordenada.length!=0){
              this.$f7.dialog.preloader('Guardando lista...');
              let ui_cobrador=localStorage.getItem("uid");
              let idadmin=localStorage.getItem("iad");
              let id_empresa=localStorage.getItem("empresa");
              // console.log(this.clientes_lista_ordenada);
              // this.$store.commit('setPosicionListaCliente',data_elements);
              this.$store.commit('setActulizarPosicionesLista',this.clientes_lista_ordenada);

              //  this.$store.state.clientes_cobros=this.clientes_lista_ordenada_cobros
              //  this.$store.commit('setActulizarListaClientesCobros',this.clientes_lista_ordenada_cobros);

              //  this.$f7.dialog.close();
              this.clientesService.actualizarPosicionCliente(idadmin,id_empresa,ui_cobrador,ui_cobrador,this.clientes_lista_ordenada).then((rest)=>{     
              // console.log(rest)
              this.$f7.dialog.close();
              // this.$store.state.clientes=[]
              // this.$store.state.clientes=this.clientes_lista_ordenada_clientes
              // this.onActualizarListaPrestamos()
              this.$f7.dialog.alert(rest.data.mensaje,'Atencion!');
              this.mensaje_ordenar='ORDENAR';
              this.icono_boton_lsita='swap_vert'
              });
            }
             
             break;

             case 'ORDENAR':
                this.mensaje_ordenar='CANCELAR';
        this.icono_boton_lsita='swap_vert'
             
             break;
            case 'CANCELAR':
                this.mensaje_ordenar='ORDENAR';
        this.icono_boton_lsita='swap_vert'
             
             break;
         
           default:
             break;
         }
        
    

    },
    typeOfData(data){
      return typeof(data)
    },
    onValidatedInput(isValid){
      this.btn_ruta_terminada=!isValid
    },
    onClickClientePaginaDetalles(clienteId,saldoAPagar){
      //  console.log(this.contadorClientesSeleccionados);
      this.$f7router.navigate('/abonos_detalle/'+clienteId+'/'+saldoAPagar);
    },
    cambiarEstadoLista(){
     
    },
    onSort(data) {
        this.mensaje_ordenar='GUARDAR';
        this.icono_boton_lsita='save'
     
            //  let lista_posiciones=this.$store.getters.getPosicionesListaClientes
       
       
         
          

let inicio = data.from;
let fin = data.to;
//  console.table(data);
this.clientes_lista_ordenada = this.$store.getters.getPosicionesListaClientes

let element;


if (fin < inicio) {
  let temporal = this.clientes_lista_ordenada.splice(inicio, 1);

  // console.log("temporal", temporal);

  // console.log("aca mayor  inicio");
  for (inicio; inicio < this.clientes_lista_ordenada.length - 1; inicio++) {
    this.clientes_lista_ordenada[inicio] = this.clientes_lista_ordenada[inicio];
  }
  this.clientes_lista_ordenada.splice(fin, 0, temporal[0]);
  // console.table(this.clientes_lista_ordenada);
} else if (fin > inicio) {
  // console.log("aca mayor  fin");

  let temporal = this.clientes_lista_ordenada.splice(inicio, 1);
  //  console.log("antes", this.clientes_lista_ordenada);
  // console.log("temporal", temporal);

  for (inicio; inicio > this.clientes_lista_ordenada.length; inicio--) {
    this.clientes_lista_ordenada[inicio] = this.clientes_lista_ordenada[inicio];
    // document.getElementById("app").innerHTML = element;
    // console.log(element);
    // console.log(numeros);
  }
  this.clientes_lista_ordenada.splice(fin, 0, temporal[0]);
  //  console.log("despues", this.clientes_lista_ordenada);
  // console.table(this.clientes_lista_ordenada);
} else {

}




// console.log(this.clientes_lista_ordenada_clientes);
        // Sort data   
        let elemento1=this.clientes[data.to];
        let elemento2=this.clientes[data.from];
        
         let data_elements={
          data:{
            el1:elemento2,
            el2:elemento1
          }
        }

        let data_elements_cliente={
          elm:{
            id:data.el.id,
            el1:elemento2,
            el2:elemento1
          },
          data:data
        }
        

           const self = this;
        self.$f7.dialog.preloader('Actualizando lista...');
        setTimeout(() => {
          self.$f7.dialog.close();
          // this.$store.commit('setPosicionListaCliente',data_elements);
        //  this.$store.commit('SetPosicionListaClientes',data);
        }, 1800);

   
      
    },
    onConfirmarJornada(){
      
      localStorage.setItem("jornada_confirmada",Boolean(true));
      console.log("verificamos",Number(this.jornada_cobrador.balance_final_manual.split('.').join(''))==Number(this.$store.getters.getCobrosTotalCobrado));
      if(this.jornada_cobrador.balance_final_manual==""){
        this.$f7.dialog.alert('Debe ingresar el saldo recogido!','Atencion');
      }
      else if(Number(this.jornada_cobrador.balance_final_manual.split('.').join(''))==Number(this.$store.getters.getCobrosTotalCobrado)){
      
      let guardando= this.$f7.dialog.preloader('Guardando...');
      let ui_cobrador=localStorage.getItem("uid");
      let id_admin=localStorage.getItem("iad");
      let id_jornadacobrador=localStorage.getItem("idjornadacobrador");
      let id_empresa=localStorage.getItem("empresa");
      this.jornada_cobrador.balance_final=localStorage.getItem("saldo_zona");
      this.jornada_cobrador.total_prestado=localStorage.getItem("total_prestado");
      this.btn_ruta_terminada=true

    
     
      this.corbradorService.actualizarJornadaCobrador(id_admin,id_empresa,ui_cobrador,id_jornadacobrador,this.jornada_cobrador).then(response =>{
                this.$f7.dialog.close();
              this.$f7.dialog.alert('Jornada cerrada correctamente!','Correcto',()=>{
                setTimeout(()=>{
                  this.ruta_terminada=false
                  this.btn_comenzar_ruta=false
                  this.isComienzoRuta=true
                  this.jornada_cobrador.balance_final_manual=0
                  this.mostrar_resultado_final=Boolean(localStorage.getItem("mostrar_resultado_final")) 
                  localStorage.removeItem("listagenerada")
                  localStorage.removeItem("listaClientesCobros") 
                  localStorage.removeItem("ListaEstadosCobro") 
                  // localStorage.removeItem("ListaEstadosCobro")
                  localStorage.removeItem('cobro_pendiente')
                  localStorage.removeItem('cobros_efectivos')
                  localStorage.removeItem('cobros_nofectivos')
                  localStorage.removeItem('total_cobros_realizados')
                  localStorage.removeItem('total_cobros')
                  localStorage.removeItem('total_prestado')
                  localStorage.removeItem("saldo_inicial_zona")
                  localStorage.removeItem("cobros_pendientesArray")
                  // localStorage.removeItem("fecha_lista_generada")  
                  // localStorage.removeItem("mostrar_resultado_final") 
                  localStorage.removeItem("lista_clientes_cobrados") 
                  
                   
                  this.$store.state.estados_prestamos_ruta=[]
                  this.$store.state.cobros_pendientes=[]
                  // this.$f7.sheet.close('.mensaje_final-sheet');
                  this.$f7.dialog.close();
                  // guardando.close();
                },1200)
              });
             }).catch(error =>{
                console.log(error);
             })
      }else{
        this.$f7.dialog.alert('Los valores no corresponden, por favor verifique','Atencion!');
      }
   

    },
    onCerrarRuta(){
        
     
       
       const app = this.$f7;
        // app.dialog.alert(id);
        // console.log(this.$store.getters.getCobrosPendientes);
         this.informacion_final_ruta={
                    Cobros_pagos:  Number(localStorage.getItem("cobros_efectivos")),
                    Cobros_nopagos: Number(localStorage.getItem("cobros_nofectivos")),
                    Balance_inicial_de_la_zona:localStorage.getItem("saldo_inicial_zona"),
                    Total_prestado: localStorage.getItem("total_prestado")==null?0:localStorage.getItem("total_prestado"),
                    Total_dinero_recogido:localStorage.getItem('total_cobros')
          }
        //   this.clientesService.guardarListaGenerada(id_admin,id_empresa,ui_cobrador,this.informacion_final_ruta).then((res)=>{
        //   alert(res.data)
        // })
        let numero_de_clientes_cobros=this.$store.getters.getContadorClientesCobros;
        let numero_de_clientes_cobros_realizados=this.$store.getters.getContadorListaClientesCobros;
        // console.log(numero_de_clientes_cobros);
        // console.log(numero_de_clientes_cobros_realizados);
        if(this.$store.getters.getCobrosPendientes>0){
          app.dialog.confirm('Hay cobros pendientes','Atencion');
         
        }
        
        else if(numero_de_clientes_cobros_realizados!=0){
            app.dialog.confirm('Aun quedan cobros por realizar','Atencion!');
        }
        else{
           app.dialog.confirm('Seguro desea terminar la ruta!','Terminar ruta', () => {
        
        axios.get('http://worldtimeapi.org/api/timezone/America/Bogota').then((res)=>{
          this.$store.commit('sethoraFinalJornada',this.$moment(res.datetime).format("hh:mm:ss"));
          this.$store.commit('setfechaFinalJornada',this.$moment(res.datetime).format("MM-DD-YYYY"));
        });
          
          this.$store.commit('setEstadoRuta',false);
          
          this.estado_lista_prestamos_clientes=true
         
          this.mostrar_resultado_final=true 
          this.btn_ruta_terminada=false
          this.ruta_terminada=true
          this.btn_comenzar_ruta=true
          localStorage.setItem("Informe_final_ruta",JSON.stringify(this.informacion_final_ruta))
          localStorage.setItem("mostrar_resultado_final",Boolean(true));
          
         
          
         
          
         
          
          // this.$f7.sheet.open('.mensaje_final-sheet');
        
        });

          
        }

    },
    onVerificarDiaListaCobros(){
      // alert(this.onVerificarDiaNuevo())
      if(this.$store.getters.getClientesCobros.length==0){
        this.$f7.dialog.alert('No hay clientes para cobrar hoy','Atencion!');
      } else if(this.onVerificarListaYaGenergada()){
        this.$f7.dialog.alert('Ya ha generado una lista hoy regrese mañana he intentelo nuevamente','Atencion!');
        
      }else if(this.onVerificarDiaNuevo()){
                  this.ruta_terminada=false
                  this.btn_comenzar_ruta=false
                  this.isComienzoRuta=true
                  this.jornada_cobrador.balance_final_manual=0
                  this.mostrar_resultado_final=false
                  localStorage.removeItem("listagenerada")
                  localStorage.removeItem("fecha_lista_generada")
                  localStorage.removeItem("Informe_final_ruta")
                  localStorage.removeItem("estado_lista_prestamos_clientes")
                  localStorage.removeItem("mostrar_resultado_final")
                  localStorage.removeItem("jornada_confirmada")
                  localStorage.removeItem("cobros_hoy")
                  localStorage.removeItem("nocobros_hoy")
                  localStorage.removeItem("ListaEstadosCobro")
                  this.$store.commit('setEstadoCobrosLista',JSON.parse(localStorage.getItem('ListaEstadosCobro')))
                  this.$store.commit('setfechInicialJornada',this.$moment(new Date).format("MM-DD-YYYY"));
                  this.$store.commit('sethoraInicialJornada',this.$moment(new Date).format("hh:mm:ss"));
                   this.$store.state.clientes_cobros=[]
                  localStorage.removeItem("ListaEstadosCobro")
                  localStorage.removeItem('ListaEstadosCobro')
                  this.$store.state.estados_prestamos_ruta=[]
                  // this.onRecargarInfoListaCobros()
                    let id_empresa=localStorage.getItem("empresa");
                  this.$f7.dialog.preloader('Creando lista...');
                  
                  let ui_cobrador=localStorage.getItem("uid");
                  let id_admin=localStorage.getItem("iad");
                  this.corbradorService.guardarJornadaCobrador(id_admin,id_empresa,ui_cobrador,this.jornada_cobrador).then(response =>{
                          console.log("................response",response);
                            this.isComienzoRuta=true;
                            this.estado_lista_prestamos_clientes=false;
                            localStorage.removeItem("estado_lista_prestamos_clientes") 
                            this.btn_comenzar_ruta=true;
                          localStorage.setItem("idjornadacobrador",response.data.id);
                          this.$store.commit('setEstadoRuta',true);
                          this.$f7.dialog.close();
                          
                      }).catch(error =>{
                          console.log(error);
                  })   
                  this.onComenzarFornada()                            
      }else if(this.$store.getters.getClientesCobros.length>=1){
            localStorage.setItem('lista_clientes_cobrados', this.$store.getters.getClientesCobros.length)
          // this.$store.commit('setEstadoCobrosLista',JSON.parse(localStorage.getItem('ListaEstadosCobro')))
          
       
         this.$store.commit('setfechInicialJornada',this.$moment(new Date).format("MM-DD-YYYY"));
        this.$store.commit('sethoraInicialJornada',this.$moment(new Date).format("hh:mm:ss"));
        // this.onGenerarListaJornadaPago()
          this.$store.commit('setEstadoCobrosLista',JSON.parse(localStorage.getItem('ListaEstadosCobro')))
          console.log("a validar clientes cobros")
           this.onGenerarListaJornadaPago()
          // this.$f7.dialog.alert('this.ruta_terminada-this.btn_comenzar_ruta-this.isComienzoRuta','Atencion!',()=>{
          //             this.$f7.dialog.close()
          //             this.$f7.dialog.alert(this.ruta_terminada+'-'+this.btn_comenzar_ruta+'-'+this.isComienzoRuta,'Atencion!');
          //         });
      
      }else{
          
          this.onGenerarListaJornadaPago()
          console.log("entra al else")
          // this.$f7.dialog.alert('No hay clientes para cobrar hoy','Atencion!');
      }
      
        
    },
    onVerificarDiaNuevo(){
      if(localStorage.getItem("fecha_lista_generada")){
         let fecha_lista = this.$moment(localStorage.getItem("fecha_lista_generada")).format('YYYY-MM-DD');
         let fecha_hoy = this.$moment(new Date()).format('YYYY-MM-DD');
          if(fecha_hoy>fecha_lista){
                return true
          }else{
            return false
          }
                                        
        }
    },
    onVerificarListaYaGenergada(){
      let fechaactual=this.$moment(new Date)
      let fechageneradalista
       if(localStorage.getItem("fecha_lista_generada")){
        
        fechageneradalista=this.$moment(localStorage.getItem("fecha_lista_generada"))
        if(fechaactual.diff(fechageneradalista,'days')==0){
           return true
         }else{
          return false
         }
        }else{
          return false
        }
        // alert(fechaactual.diff(fechageneradalista,'days') )// 1)
         
      

    },
    onGenerarListaJornadaPago(){
       
   
          
                  //Modifique aca.
      
        // localStorage.setItem("listaClientesPrestamos",JSON.stringify(this.$store.getters.getClientesListaPrestamo));
        // this.clientes=JSON.parse(localStorage.getItem("listaClientesPrestamos"))
        // this.clientes=this.$store.getters.getClientesListaPrestamo
        
        let id_empresa=localStorage.getItem("empresa");
        this.$f7.dialog.preloader('Creando lista...');
        
         let ui_cobrador=localStorage.getItem("uid");
         let id_admin=localStorage.getItem("iad");
        this.corbradorService.guardarJornadaCobrador(id_admin,id_empresa,ui_cobrador,this.jornada_cobrador).then(response =>{
                //  console.log("................response",response);
                  this.isComienzoRuta=true;
                  this.estado_lista_prestamos_clientes=false;
                  localStorage.removeItem("estado_lista_prestamos_clientes") 
                  this.btn_comenzar_ruta=true;
                 localStorage.setItem("idjornadacobrador",response.data.id);
                 this.$store.commit('setEstadoRuta',true);
                 this.$f7.dialog.close();
                 localStorage.setItem("listagenerada",true);
                localStorage.setItem("fecha_lista_generada",this.$moment(new Date().toISOString().slice(0,10)))
                this.$store.state.contadorClientesSeleccionados= this.$store.state.clientes_cobros.length
             }).catch(error =>{
                console.log(error);
         })
        
        
         

        
        
    },
    onComenzarFornada(){
      
      // this.$store.state.contadorClientesSeleccionados= 
      
      
      this.onGenerarListaEstados()
      this.$store.commit('setEstadosInicialesRutaClientesPrestamo')
      if(Boolean(localStorage.getItem("listagenerada"))==false || localStorage.getItem("listagenerada")=='false' ){
                                    // if(this.$store.getters.getListaDBguardad){
                                    //     estadoListaCobro.push({estado:0,id:element.data.id,posicion:element.data.posicion})
                                    //     localStorage.setItem('ListaEstadosCobro',JSON.stringify(estadoListaCobro))
                                    // }
                               

                                }else{
                                    
                                    //  this.$store.commit('setEstadoCobrosLista',JSON.parse(localStorage.getItem('ListaEstadosCobro')))
                                     if(localStorage.getItem('cobros_pendientesArray')){
                                            this.$store.state.cobros_pendientes=[]
                                            let cobros_pendientes=JSON.parse(localStorage.getItem('cobros_pendientesArray'))
                                            cobros_pendientes.forEach(element => {
                                                 this.$store.state.cobros_pendientes.unshift(element)
                                            });
                                         
                                            localStorage.setItem('cobro_pendiente', this.$store.state.cobros_pendientes.length)
                                             this.$store.state.jornada_cobrador.numero_cobros_pendientes=this.$store.state.cobros_pendientes.length
                                         
                                             
                                     }
                                     if(localStorage.getItem('total_prestado')){
                                        this.$store.state.jornada_cobrador.total_prestado=Number(localStorage.getItem('total_prestado'))
                                     }
                                    //  total_prestado
                                     
                                     if(localStorage.getItem('cobros_efectivos')){
                                        this.$store.state.jornada_cobrador.catidad_cobrosefectivos=Number(localStorage.getItem('cobros_efectivos'))
                                     }
                                    
                                     if(localStorage.getItem('cobros_nofectivos')){
                                        this.$store.state.jornada_cobrador.catidad_cobrosenofectivos=Number(localStorage.getItem('cobros_nofectivos'))
                                     }

                                     if(localStorage.getItem('total_cobros')){
                                         this.$store.state.jornada_cobrador.total_cobros_realizados=Number(localStorage.getItem('total_cobros'))
                                     }
                                    
                                     if(localStorage.getItem('lista_clientes_cobrados')){
                                       this.$store.state.contadorClientesSeleccionados=Number(localStorage.getItem('lista_clientes_cobrados'))
                                          
                                     }

                                     if(localStorage.getItem('cobros_hoy')){
                                       this.$store.state.cobros_hoy=JSON.parse(localStorage.getItem('cobros_hoy'))   
                                     }

                                    //  if(localStorage.getItem('nocobros_hoy')){
                                    //    this.$store.state.nocobros_hoy=JSON.parse(localStorage.getItem('nocobros_hoy'))   
                                    //  }
                                    

                                     

                                      
                                    // localStorage.removeItem('cobros_nofectivos')
                                    
                                }
                
  
         

    },
   onGenerarListaEstados(){
            
            let lista_cobros_ordenada=this.$store.getters.getOrdenarClientes
            
            // console.log(lista_cobros_ordenada);
            let estadoListaCobro=[]

            // estado_pago_prestamo.pago==true
            // this.$store.estados_prestamos_ruta=[]
                for (const key in lista_cobros_ordenada) {
                    if (lista_cobros_ordenada[key].data.hasOwnProperty('prestamos')) {
                        const element = lista_cobros_ordenada[key];
                       
                        if(Boolean(localStorage.getItem("listagenerada"))==false || localStorage.getItem("listagenerada")=='false' ){
                        // if(this.$store.getters.getListaDBguardad){ 
                           let fecha_prestamo = this.$moment(element.data.prestamos[0].fecha).format('YYYY-MM-DD');
                            let fecha_anterior_hoy = this.$moment(new Date()).format('YYYY-MM-DD');

                        //    console.log("fecha_prestamo",fecha_prestamo) 
                        //    console.log("fecha_anterior_hoy",fecha_anterior_hoy) 
                                    
                                    

                            if(fecha_anterior_hoy>fecha_prestamo){
                                // console.log("Fechas diferentes si") 
                                if(element.data.prestamos.length >= 1){
                                    // console.log("Prestamos mayor o igual a uno si") 
                                    if(element.data.prestamos[0].estado_prestamo == "false"){     
                        estadoListaCobro.push({estado:0,id:element.data.id,posicion:element.data.posicion})
                        localStorage.setItem('ListaEstadosCobro',JSON.stringify(estadoListaCobro))
                        // }}
                                    }
                                }
                            }
                }                          }
                            
            }
             this.$store.commit('setEstadoCobrosLista',JSON.parse(localStorage.getItem('ListaEstadosCobro')))
             this.onActualizarEstadosLista()
        },
        onActualizarEstadosLista(){
        let lista_cobros_ordenada=this.$store.getters.getClientes
        
        // let lista_cobros_ordenada=listaCobros
        this.$store.state.posiciones_lista=[]
                                if(localStorage.getItem('ListaEstadosCobro')){
                                    let estados=JSON.parse(localStorage.getItem('ListaEstadosCobro'))
                                    for (const key in lista_cobros_ordenada) {
                                        if (lista_cobros_ordenada[key].data.hasOwnProperty('prestamos')) {
                                            const element = lista_cobros_ordenada[key];
                                              let elemento_lista=estados.filter(x=>x.id===element.data.id)
                                    // let posicion_lista=lista_cobros_ordenada.findIndex(x=>x.data.id===elemento_lista[0].id)
                                                    // console.log(elemento_lista[0].estado);
                                                    // console.log(posicion_lista);
                                                    if(elemento_lista.length>=1){
                                                            // console.log(elemento_lista[0].estado);
                                                switch (elemento_lista[0].estado) {
                                                    case 1:
                                                element.data.estado_pago_prestamo.pago=true
                                                element.data.estado_pago_prestamo.nopago=false
                                                element.data.estado_pago_prestamo.pendiente=false
                                                        break;
                                                    case 2:
                                                           element.data.estado_pago_prestamo.pago=false
                                                 element.data.estado_pago_prestamo.nopago=true
                                                 element.data.estado_pago_prestamo.pendiente=false
                                                        break;
                                                    case 3:
                                                    element.data.estado_pago_prestamo.pago=false
                                                 element.data.estado_pago_prestamo.nopago=false
                                                 element.data.estado_pago_prestamo.pendiente=true
                                                        break;
                                                
                                                    default:
                                                        break;
                                                }
                                                   }
                                                
                        
                       
                            let fecha_prestamo = this.$moment(element.data.prestamos[0].fecha).format('YYYY-MM-DD');
                            let fecha_anterior_hoy = this.$moment(new Date()).format('YYYY-MM-DD');

                           
                        //    alert(fecha_prestamo<fecha_anterior_hoy && element.data.prestamos.length >= 1 && element.data.prestamos[0].estado_prestamo == "false")
                                //  if (element.data.prestamos.length > 0 && element.data.prestamos[0].estado_prestamo == false) {
                                    
                                    // element.data.prestamos.length >= 1 && element.data.prestamos[0].estado_prestamo == "false")
                            if(fecha_prestamo<fecha_anterior_hoy && element.data.prestamos.length >= 1 && element.data.prestamos[0].estado_prestamo == "false") {
                                // console.log("onGenerarListaEstados");
                                if(this.listaClientesGuardar.length==1){
                    let elementosLista=Object.values(this.listaClientesGuardar[0]);
                    let posicionlista=elementosLista.findIndex(x=>x.idCliente==element.data.id)
                    let posicionelementolista=elementosLista.find(x=>x.idCliente==element.data.id)
                    if(posicionlista>-1){
                    element.data.posicion=Number(posicionlista)+1
                    // this.$store.commit('addNewClientes',element)

                    let posicion_cliente_lista={
                        idCliente:posicionelementolista.idCliente,
                         posicion:Number(posicionlista)+1
                    }
                    // element.data.posicion=resp.data.lista_clientes[0][key].posicion
                    // this.$store.state.posiciones_lista=resp.data.lista_clientes
                    // console.log(resp.data.lista_clientes);
                    this.$store.commit('setlistaDbGuardada');
                    this.$store.commit('addPosicionListaCliente',posicion_cliente_lista)
                    
                    this.$store.state.clientes_cobros.unshift(element);
                    console.log('agrego un nuevo cliente en cobros')
                        
                    }

                    }else{
                        
                        let posicion_cliente_lista={
                        idCliente:element.data.id,
                        posicion:Number(key)+1
                    }
                    //this.clientes.push(element);
                    element.data.posicion=Number(key)+1
                    
                    this.$store.commit('addPosicionListaCliente',posicion_cliente_lista)
                    // this.$store.commit('addNewClientes',element)
                    this.$store.state.clientes_cobros.unshift(element);
                    console.log('agrego un nuevo cliente en cobros')
                    }
                                 
                                
                              
                               
                                 
                               
                                // this.$store.state.clientes_cobros.push(element);
                            // }else{
                            //     this.$store.state.clientes_cobros.unshift(element);
                            // }
                                // alert(localStorage.getItem("listagenerada"))
                               
                            }
                    // }
                    

                                    
                                            
                                        }
                                    }
                                     }else{
                                         for (const key in lista_cobros_ordenada) {
                                            if (lista_cobros_ordenada[key].data.hasOwnProperty('prestamos')) {
                                            const element = lista_cobros_ordenada[key];
                       
                            let fecha_prestamo = this.$moment(element.data.prestamos[0].fecha).format('YYYY-MM-DD');
                            let fecha_anterior_hoy = this.$moment(new Date()).format('YYYY-MM-DD');

                           
                        //    alert(fecha_prestamo<fecha_anterior_hoy && element.data.prestamos.length >= 1 && element.data.prestamos[0].estado_prestamo == "false")
                                //  if (element.data.prestamos.length > 0 && element.data.prestamos[0].estado_prestamo == false) {
                                    
                                    // element.data.prestamos.length >= 1 && element.data.prestamos[0].estado_prestamo == "false")
                            if(fecha_prestamo<fecha_anterior_hoy && element.data.prestamos.length >= 1 && element.data.prestamos[0].estado_prestamo == "false") {
                                // console.log("onGenerarListaEstados");
                                 this.$store.state.clientes_cobros.unshift(element);
                                 console.log('agrego un nuevo cliente en cobros')
                                
                              
                               
                                 
                               
                                // this.$store.state.clientes_cobros.push(element);
                            // }else{
                            //     this.$store.state.clientes_cobros.unshift(element);
                            // }
                                // alert(localStorage.getItem("listagenerada"))
                               
                            }
                    // }
                    }
                                         }
                                     }

                 
                    localStorage.setItem('lista_clientes_cobrados',Number(this.$store.state.clientes_cobros.length))
                    localStorage.setItem("listagenerada",true);
                        localStorage.setItem("fecha_lista_generada",this.$moment(new Date().toISOString().slice(0,10))) 
                                // this.$store.commit('setActualizarEstadosListaCobros',lista_cobros_ordenada)
        },
}
}
</script>

<style lang="less">
.pago{
  border-left: 5px solid green
}

.no-pago{
   border-left: 5px solid red
}

.pendiente{
   border-left: 5px solid blue
}
.normal{
  border:0px
}

table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  text-align: left;
  padding: 8px;
}

tr:nth-child(even){background-color: #f2f2f2}

th {
  background-color: #4CAF50;
  color: white;
}

@media screen and (max-width: 600px) {
  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }
  
  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  
  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: .625em;
  }
  
  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: .8em;
    text-align: right;
  }
  
  table td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }
  
  table td:last-child {
    border-bottom: 0;
  }
}
</style>