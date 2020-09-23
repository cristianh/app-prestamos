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
                <f7-button fill  :disabled="btn_comenzar_ruta" @click="onVerificarDiaListaCobros">Comenzar<f7-icon material="swap_vert"></f7-icon></f7-button>
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
            <f7-button  fill color="red" @click="onCerrarRuta">Terminar Ruta <f7-icon material="cancel"></f7-icon></f7-button>
        </f7-col>
         </f7-row>
        </f7-block>
         <f7-block>
       <!-- {{posiciones_lista_ordenada}} -->
          
         <f7-block-title >Clientes</f7-block-title>
       <!-- :link="`/cliente_detalles/${cliente.id}/`" -->
     
        <f7-list  class="search-list-ruta searchbar-found">
            
<!-- :after="`${cliente.data.prestamos.length==0 || cliente.data.prestamos==undefined? 'NA':Number(cliente.data.prestamos[0].dias_con_mora)>=1?'Mora: '+Number(cliente.data.prestamos[0].dias_con_mora)+' dia':'Mora: '+Number(cliente.data.prestamos[0].dias_con_mora)+' dias'}`"  -->
<!-- {'pendiente':cliente.data.prestamos[0].estado_pago_ruta==3,'normal':cliente.data.prestamos[0].estado_pago_ruta==0,'pago':cliente.data.prestamos[0].estado_pago_ruta==1,'no-pago':cliente.data.prestamos[0].estado_pago_ruta==2 -->

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
        :title="`${cliente.data.usuario.nombre}-${cliente.data.usuario.apellido}`" 
        :footer="`${calculoTotalPagoHoy[index]!=undefined ? calculoTotalPagoHoy[index]==0?'Pago':calculoTotalPagoHoy[index]>0?'Saldo a pagar: '+Number(calculoTotalPagoHoy[index]).toLocaleString('es-CO',{style: 'currency',currency: 'COP',minimumSignificantDigits:1}):'Saldo a pagar: '+Number((calculoTotalPagoHoy[index]*(-1))).toLocaleString('es-CO',{style: 'currency',currency: 'COP',minimumSignificantDigits:1}):'NA'}`"  
        @click="onClickClientePaginaDetalles(cliente.data.id,calculoTotalPagoHoy[index])"
        >
        <f7-swipeout-actions right>
        <!-- <f7-swipeout-button close overswipe color="green" @click="onReply(cliente,cliente.data.usuario.nombre+cliente.data.usuario.apellido)">Seleccionar</f7-swipeout-button> -->
        <!-- <f7-swipeout-button close color="blue" >Pendiente</f7-swipeout-button> -->
        <f7-swipeout-button confirm-text="Desea eliminar este cliente de la lista!" confirm-title="Seguro!" color="red" delete>Eliminar</f7-swipeout-button>
        </f7-swipeout-actions>
        <!-- {{typeOfData(getEstadoPrestamo)}} -->
        <!-- {{cliente.data.prestamos[0].estado_pago_prestamo.pendiente}} -->
        <!-- {{lista_cobros_realizados[index].estado}} -->
         <!-- {{cliente.data.activo }}
         {{cliente.data.prestamos[0].estado_pago_prestamo.pago}}
         {{cliente.data.prestamos[0].estado_pago_prestamo.nopago}}
         {{cliente.data.prestamos[0].estado_pago_prestamo.pendiente}} -->
        <!-- {{Number(cliente.data.prestamos[0].dias_con_mora)}} -->
        </f7-list-item>
        </f7-list>
        </f7-block>
      </div>
            <div v-else>
       <f7-block  inset>
         <f7-card>
          <f7-card-content>
        No hay clientes con prestamo para hoy
          </f7-card-content>
         </f7-card>

</f7-block>
</div>
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
        type="number"
        placeholder="Buscar por cedula..."
        clear-button
        
        validate
        maxlength=10
        minlength=7
        pattern="[0-9]"
        error-message="Solo numeros"
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
              this.$store.commit('setQuitar_cobros_pendientesJornada',element.id);

            }

            
          }
        }
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
       
  //   //  alert("true",localStorage.getItem("listagenerada"))
      
  //     // this.onComenzarFornada()
  //     this.$store.commit('setEstadoListaCobrosRealizados')
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
        return cliente.data.usuario.identificacion.toLowerCase().includes(this.busqueda.toLowerCase())
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
        return this.$store.getters.getClientesListaPrestamo
      }else{
         return temporarlistaclientesprestamos.filter(cliente => {
        return cliente.data.usuario.identificacion.toLowerCase().includes(this.busqueda.toLowerCase())
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
    typeOfData(data){
      return typeof(data)
    },
    onValidatedInput(isValid){
      this.btn_ruta_terminada=!isValid
    },
    onClickClientePaginaDetalles(clienteId,saldoAPagar){
       console.log(this.contadorClientesSeleccionados);
      this.$f7router.navigate('/abonos_detalle/'+clienteId+'/'+saldoAPagar);
    },
    cambiarEstadoLista(){
     
    },
    onSort(data) {
      
      // let data_posicion={
      //   cliente_id:data.el.id,
      //   from:data.from,
      //   to:data.to
      // }
      // let data_values= Object.values(data_posicion);
      //  console.log(data_values);

      //  data_values.forEach(element => {
        
      //  });
      // console.log(this.posiciones_lista_ordenada.filter(x=>x.cliente_id==data.el.id).length);
      // if(this.posiciones_lista_ordenada.filter(x=>x.cliente_id==data.el.id).length>0){
      //   let element= this.posiciones_lista_ordenada.filterIndex(x=>x.cliente_id==data.el.id);
      //   this.posiciones_lista_ordenada[element].to=data.to;
      // }else{
      //   this.posiciones_lista_ordenada.push(data_posicion);
      // }
      
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
        // if(localStorage.getItem("fecha_lista_generada")){
        //  let fecha_lista = this.$moment(localStorage.getItem("fecha_lista_generada")).format('YYYY-MM-DD');
        //  let fecha_hoy = this.$moment(new Date()).format('YYYY-MM-DD');
        // //  alert(fecha_hoy>fecha_lista)
        
                                        
                                       
        
                                       
                                    
        //                                 if(fecha_hoy>fecha_lista){
        //                                         localStorage.removeItem("fecha_lista_generada")
        //                                         localStorage.removeItem("Informe_final_ruta")
        //                                         localStorage.removeItem("estado_lista_prestamos_clientes")
        //                                         localStorage.removeItem("mostrar_resultado_final")
        //                                         localStorage.removeItem("jornada_confirmada")
        //                                         localStorage.removeItem("cobros_hoy")
        //                                         localStorage.removeItem("ListaEstadosCobro")
                                              
        //                                 }
                                        
        // }
        
                
      if(this.onVerificarListaYaGenergada()){
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
                  localStorage.removeItem("ListaEstadosCobro")
                  this.$store.commit('setEstadoCobrosLista',JSON.parse(localStorage.getItem('ListaEstadosCobro')))
                  this.$store.commit('setfechInicialJornada',this.$moment(new Date).format("MM-DD-YYYY"));
                  this.$store.commit('sethoraInicialJornada',this.$moment(new Date).format("hh:mm:ss"));
                  this.onRecargarInfoListaCobros()                                  
      }else{
         // alert(this.$store.getters.getClientesCobros.length)
         if(this.$store.getters.getClientesCobros.length>=1){
            localStorage.setItem('lista_clientes_cobrados', this.$store.getters.getClientesCobros.length)
          // this.$store.commit('setEstadoCobrosLista',JSON.parse(localStorage.getItem('ListaEstadosCobro')))
          // this.onGenerarListaJornadaPago()
          this.$store.commit('setEstadoCobrosLista',JSON.parse(localStorage.getItem('ListaEstadosCobro')))
        this.onGenerarListaJornadaPago()
         this.$store.commit('setfechInicialJornada',this.$moment(new Date).format("MM-DD-YYYY"));
        this.$store.commit('sethoraInicialJornada',this.$moment(new Date).format("hh:mm:ss"));
          this.$f7.dialog.alert('this.ruta_terminada-this.btn_comenzar_ruta-this.isComienzoRuta','Atencion!',()=>{
                      this.$f7.dialog.close()
                      this.$f7.dialog.alert(this.ruta_terminada+'-'+this.btn_comenzar_ruta+'-'+this.isComienzoRuta,'Atencion!');
                  });
      
      }else{
         this.$f7.dialog.alert('No hay clientes para cobrar hoy','Atencion!');
      }
      }
        
    },
    onRecargarInfoListaCobros(){
            this.$store.state.clientes_cobros=[]
            localStorage.removeItem("ListaEstadosCobro")
            localStorage.removeItem('ListaEstadosCobro')
            this.$store.state.estados_prestamos_ruta=[]
            let clientes_cobrador = this.$store.getters.getClientes;
              let estadoListaCobro=[]
                for (const key in clientes_cobrador) {
                if (clientes_cobrador.hasOwnProperty(key)) {
                    const element = clientes_cobrador[key];
                    
                    //this.clientes.push(element);
                    // this.$store.state.clientes.unshift(element);
                    // alert(element.data.hasOwnProperty('prestamos'))
                    if(element.data.hasOwnProperty('prestamos')){
                       
                            let fecha_prestamo = this.$moment(element.data.prestamos[0].fecha).format('YYYY-MM-DD');
                            let fecha_anterior_hoy = this.$moment(new Date()).format('YYYY-MM-DD');

                           
                        //    alert(fecha_prestamo<fecha_anterior_hoy && element.data.prestamos.length >= 1 && element.data.prestamos[0].estado_prestamo == "false")
                                //  if (element.data.prestamos.length > 0 && element.data.prestamos[0].estado_prestamo == false) {
                            if(fecha_prestamo<fecha_anterior_hoy && element.data.prestamos.length >= 1 && element.data.prestamos[0].estado_prestamo == "false") {
                                
                                 this.onActualizarEstadosLista(element)
                                 
                               
                                // this.$store.state.clientes_cobros.push(element);
                            // }else{
                            //     this.$store.state.clientes_cobros.unshift(element);
                            // }
                                // alert(localStorage.getItem("listagenerada"))
                                if(Boolean(localStorage.getItem("listagenerada"))==false || localStorage.getItem("listagenerada")=='false' ||Boolean(localStorage.getItem("listagenerada"))==null  ){
                                    
                                  estadoListaCobro.unshift({estado:0,id:element.data.id,posicion:element.data.posicion})
                                  localStorage.setItem('ListaEstadosCobro',JSON.stringify(estadoListaCobro))

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
                                    

                                     

                                      
                                    // localStorage.removeItem('cobros_nofectivos')
                                    
                                }
                            }
                    // }
                    }
                    
                }
            }
    
          
          this.$store.commit('setEstadoCobrosLista',JSON.parse(localStorage.getItem('ListaEstadosCobro')))
          this.onGenerarListaJornadaPago()
    },
    onActualizarEstadosLista(elemento_lista_cobros){
        // let lista_cobros_ordenada=this.$store.getters.getOrdenarListaClientesCobros
        
        // let lista_cobros_ordenada=listaCobros
                                if(localStorage.getItem('ListaEstadosCobro')){
                                    let estados=JSON.parse(localStorage.getItem('ListaEstadosCobro'))
                                     let elemento_lista=estados.filter(x=>x.id===elemento_lista_cobros.data.id)
                                    // let posicion_lista=lista_cobros_ordenada.findIndex(x=>x.data.id===elemento_lista[0].id)
                                                    // console.log(elemento_lista[0].estado);
                                                    // console.log(posicion_lista);
                                                    if(elemento_lista.length>=1){
                                                            console.log(elemento_lista[0].estado);
                                                                    switch (elemento_lista[0].estado) {
                                                    case 1:
                                                elemento_lista_cobros.data.estado_pago_prestamo.pago=true
                                                 elemento_lista_cobros.data.estado_pago_prestamo.nopago=false
                                                elemento_lista_cobros.data.estado_pago_prestamo.pendiente=false
                                                        break;
                                                    case 2:
                                                            elemento_lista_cobros.data.estado_pago_prestamo.pago=false
                                                 elemento_lista_cobros.data.estado_pago_prestamo.nopago=true
                                                 elemento_lista_cobros.data.estado_pago_prestamo.pendiente=false
                                                        break;
                                                    case 3:
                                                    elemento_lista_cobros.data.estado_pago_prestamo.pago=false
                                                 elemento_lista_cobros.data.estado_pago_prestamo.nopago=false
                                                 elemento_lista_cobros.data.estado_pago_prestamo.pendiente=true
                                                        break;
                                                
                                                    default:
                                                        break;
                                                }
                                                   }
                                                
                                                    // console.log(elemento_lista_cobros);

                                    this.$store.state.clientes_cobros.unshift(elemento_lista_cobros);

                                    

                                     }else{
                                        this.$store.state.clientes_cobros.unshift(elemento_lista_cobros);
                                     }

                 
                                
                                // this.$store.commit('setActualizarEstadosListaCobros',lista_cobros_ordenada)
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
       if(localStorage.getItem("fecha_lista_generada")){
        let fechaactual=this.$moment(new Date)
        let fechageneradalista=this.$moment(localStorage.getItem("fecha_lista_generada"))
        // alert(fechaactual.diff(fechageneradalista,'days') )// 1)
         if(fechaactual.diff(fechageneradalista,'days')==0){
           return true
         }else{
          return false
         }
      }

    },
    onGenerarListaJornadaPago(){
       
   
          
                  //Modifique aca.
        
        localStorage.setItem("listagenerada",true);
        localStorage.setItem("fecha_lista_generada",this.$moment(new Date().toISOString().slice(0,10)))
        this.$store.state.contadorClientesSeleccionados= this.$store.state.clientes_cobros.length
        // localStorage.setItem("listaClientesPrestamos",JSON.stringify(this.$store.getters.getClientesListaPrestamo));
        // this.clientes=JSON.parse(localStorage.getItem("listaClientesPrestamos"))
        // this.clientes=this.$store.getters.getClientesListaPrestamo
        
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
        // this.onComenzarFornada()
        
         

        
        
    },
    onComenzarFornada(){
        

    }
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