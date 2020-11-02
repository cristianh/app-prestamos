<template>
  <f7-page name="ClientesDetalles">
    <f7-navbar title="Usuario" back-link="Back"></f7-navbar>
<f7-block>
  <f7-row>
    <f7-col>
      <f7-button fill sheet-open=".demo-sheet-swipe-to-step-abono" color="green">PAGO</f7-button>
    </f7-col>
    
    <f7-col>
      <f7-button fill  popover-open=".popover-menu" class="boton-no-pago"  color="red">No PAGO</f7-button>
    </f7-col>
  </f7-row>
  <br>
     <f7-row>
    <f7-col>
      <f7-button fill  @click="onCobroListaPendiente" color="blue">PENDIENTE</f7-button>
    </f7-col>
     </f7-row>
 
</f7-block>
       <f7-block>
    <f7-card>
      <f7-card-header>
  <f7-block-title>
    <div v-if="mensajeSaldo<0">
    Saldo a pagar: {{(mensajeSaldo*(-1))|currency}}
    </div>
    <div v-else>
      Saldo a pagar: {{mensajeSaldo|currency}}
    </div>
  </f7-block-title>
  </f7-card-header>
  <f7-card-content>
    <f7-list>
      
       <f7-list-item   v-for="(prestamos,index,keycod) in clientes_info.prestamos" :id="index" :key="keycod">
        <div v-if="clientes_info.prestamos.dias_plazo!=''">
        <f7-block-title>Prestamo</f7-block-title>
        <f7-block>
         <h5>
         <!-- Saldo pendiente: {{prestamos.saldo_pendiente>0?prestamos.saldo_pendiente:(prestamos.saldo_pendiente*(-1))|currency}}<br> -->
         Dias de mora: {{prestamos.dias_con_mora}}<br>
         Dias de plazo: {{prestamos.dias_plazo}}<br>
          <div v-if="prestamos.saldo_pendiente>0">
         Saldo pendiente:{{prestamos.saldo_pendiente|currency}}<br>
         </div>
         <div v-else>
            Saldo a favor:  {{(prestamos.saldo_pendiente*(-1))|currency}}<br>
        </div>
         <!-- Saldo a favor: {{prestamos.saldo_pago_dia|currency}}<br> -->
         Fecha del prestamo: {{prestamos.fecha}}<br>
         Valor del prestamo: {{prestamos.valor|currency}}<br>
         Pendiente a pagar: {{prestamos.total_apagar|currency}}<br>
         Valor total prestamo: {{prestamos.valor_total_prestamo|currency}}<br>
         Plan seleccionado: {{prestamos.plan_seleccionado}}</h5>
         </f7-block>
         <f7-block-title>Usuario</f7-block-title>
         <div v-if="clientes_info.usuario">
           <f7-block>
         <h5>Nombre Completo: {{clientes_info.usuario.nombre}} {{clientes_info.usuario.apellido}}<br>
      Cedula:{{clientes_info.usuario.identificacion}}<br>
      Telefono:{{clientes_info.usuario.telefono}}</h5>
      </f7-block>
    </div>
    <div v-else>
      <f7-card>
  <f7-card-content>
    Cargando informacion
  </f7-card-content>
  </f7-card>
  </div>
        </div>
        <div v-else>
     No tiene prestamos
    </div>      
      </f7-list-item>
      </f7-list>
  </f7-card-content>
  </f7-card>
      
    </f7-block>


<f7-block>
  <!-- <f7-row>
    <f7-col>
      <f7-button fill color="blue">PENDIENTE</f7-button>
    </f7-col>
  </f7-row> -->
</f7-block>
<!-- Swipe to step demo sheet -->
    <f7-sheet
      class="demo-sheet-swipe-to-step-abono"
      style="height:auto; --f7-sheet-bg-color: #fff;"
      swipe-to-close
      swipe-to-step
      backdrop
    >
      <!-- Initial swipe step sheet content -->
      <div class="sheet-modal-swipe-step">
  <f7-card>
  <f7-card-header>
    <div v-if="mensajeSaldo<0">
    Saldo a pagar: {{(mensajeSaldo*(-1))|currency}}
    </div>
    <div v-else>
      Saldo a pagar: {{mensajeSaldo|currency}}
    </div>
  </f7-card-header>
  <f7-card-content>
    
  <f7-row>
      <f7-col md="12"> 
        <f7-list inset>
        <f7-list-input
        label="Pago:"
        type="text"
        :value.sync="valor_sin_puntos"
        min=0
        autofocus
        placeholder="0"
        clear-button
        @input.capture="valor_sin_puntos=$event.target.value"
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
        ></f7-list-input>
        
            <!-- <f7-list-input
    label="Plan"
    type="select"
    defaultValue="15/15"
    placeholder="Please choose..."
    @change="onSelectPlan"
  >
   <option value="0">Seleccione</option>
  <option  v-for="(planes,index,key) in tazasdeinteres"  :key=key :value="`${planes.data.plazo}-${planes.data.interes}`">{{planes.data.nombre}}</option>
       </f7-list-input> -->
        </f7-list>
          <f7-list inset>
          <f7-list-input
          label="Fecha"
          type="date"
          clear-button
          :value="fecha_input"
           @input="informacion_pago.fecha=$event.target.value"
           disabled
      >
    </f7-list-input>
 </f7-list>
      </f7-col>
  </f7-row>
  </f7-card-content>
   <f7-card-footer>
       
    <f7-link>Saldo de la zona</f7-link>
    <f7-link>{{balance_zona|currency}}</f7-link>
    
  </f7-card-footer>
</f7-card>
        <div class="display-flex padding justify-content-space-between align-items-center">
          <div style="font-size: 18px"><b>Total:</b></div>
          <div style="font-size: 22px"><b><span>$ {{this.valor_sin_puntos==0?0:this.valor_sin_puntos}}</span></b></div>
        </div>
        <div class="padding-horizontal padding-bottom">
          <f7-button large fill @click="onConfirmarPago" >CONFIRMAR</f7-button>
          <!-- <div class="margin-top text-align-center">Swipe up for more details</div> -->
        </div>
      </div>
      <!-- Rest of the sheet content that will opened with swipe -->
      <!-- <f7-block-title medium class="margin-top">Detalles:</f7-block-title> -->
<!--    
      <f7-list no-hairlines>
        <f7-list-item title="Dias de plazo:">
          
          <b slot="after" class="text-color-black">{{detalles_prestamo.dias_plazo}}</b>
        </f7-list-item>
        <f7-list-item title="Fecha del prestamo:">
          <b slot="after" class="text-color-black">{{detalles_prestamo.fecha}}</b>
        </f7-list-item>
        <f7-list-item title="Valor del prestamo:">
          <b slot="after" class="text-color-black">{{detalles_prestamo.valor}}</b>
        </f7-list-item>
        <f7-list-item title="Total a pagar:">
          <b slot="after" class="text-color-black">{{detalles_prestamo.total_apagar}}</b>
        </f7-list-item>
        <f7-list-item title="Plan seleccionado:">
          <b slot="after" class="text-color-black">{{detalles_prestamo.plan_seleccionado}}</b>
        </f7-list-item>
      </f7-list>  -->
    </f7-sheet>
    <f7-popover class="popover-menu" :closeOnEscape="false" :closeByOutsideClick="true" :closeByBackdropClick="false" >
      <f7-block-header><span style="margin-left:25%">Motivo del no pago</span><f7-button fill @click="onCobroNoPago" color="orange">Confirmar</f7-button></f7-block-header>
   <f7-list>
  <f7-list-item  v-for="(opcion,index,key) in opcionesRadioNoPago" :key="key"
    radio
    radio-icon="start"
    :value="opcion.title"
    :title="opcion.title"
    :name="opcion.name"
    @change="radioNoPagoSeleccionado = $event.target.value"
  ></f7-list-item>
 
</f7-list>


<f7-list  v-if="radioNoPagoSeleccionado=='Otro'" inset>
        <f7-list-input
        label="Otra razon:"
        type="text"
        value=""
        placeholder="Razon no pago"
        clear-button
        @input.capture="inputNoPagoSeleccionado=$event.target.value"
        ></f7-list-input>
</f7-list>
  </f7-popover>
  <!-- <f7-block>
  <f7-row>
    <f7-col>
  <f7-button fill  @click="onCobroPendiente()"  color="blue">Pendiente</f7-button>
    </f7-col>
  </f7-row>
  </f7-block> -->

  </f7-page>
</template>
<script>
import AbonoService from '../Services/AbonoServices.js';
import ClientesService from '../Services/ClientesService.js';
import CobradorService from '../Services/CobradoresServices.js';

  export default {
   data() {
       return {
            datastorage:{},
            ui_cobrador:'',
            idempresa:'',
            lista_cobros_clientes:[],
            idad:'',
            id :this.$f7route.params.id,
            saldo_a_pagar:this.$f7route.params.saldo_apagar,
            clientes_info:[],
            opcionesRadioNoPago:[{name:'radio1',title:'No estaba'},{name:'radio1',title:'No tenia dinero'},{name:'radio1',title:'Otro'}],
            radioNoPagoSeleccionado:'',
            inputNoPagoSeleccionado:'',
            motivo_no_pago:[],
            detalles_prestamo:{
            dias_plazo:0,
            dias_mora:0,
            fecha:'',
            valor:'',
            total_apagar:'',
            plan_seleccionado:''
            },
            valor_sin_puntos:0,
            mensajeSaldo: `${this.$f7route.params.saldo_apagar}`,
            abonoService:null,
            clientesService:null,
            cobradoresService:null,
            fecha_input:new Date().toISOString().slice(0,10),
            informacion_pago:{
            valor:'',
            valor_pago:0,
            fecha:this.$moment(new Date).format("MM-DD-YYYY"), 
            // fecha:new Date().toISOString().slice(0,10),
            hora:this.$moment(new Date()).format("hh:mm:ss"),  
            estado_abono:true
            }
       }
   },
   filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
  },
  methods: {
  onPendiente(){
    let data={
            id: this.id,
            estadopagoruta:3
          };
      this.$store.commit('setEstadoPendiente',data);
      
      this.$f7router.back();
  },
  onCobroListaPendiente(){
      // alert('pendiente');
      let posicion = this.$store.state.cobros_pendientes.findIndex(x => x == this.id);
      
      if(posicion==-1){
         this.$store.commit('cobroClientePendiente',this.id);
       this.$f7.dialog.alert('Marcado como pendiente','Correcto');
       let estados=JSON.parse(localStorage.getItem('ListaEstadosCobro'))
      //  let posicion = this.$store.getters.getClientesCobros.findIndex(x => x.data.id == this.id);
       let posicion = estados.findIndex(x => x.id == this.id);
       estados[posicion].estado=3
       localStorage.setItem('ListaEstadosCobro',JSON.stringify(estados))
       this.$f7router.back();
        // this.$store.commit('setDisminuyeContadorClientesListaPrestamos');
      // state.clientes_cobros.splice(posicion, 1);
     
      // elemento.estado_pago_prestamo.pendiente=true
      // elemento.estado_pago_prestamo.nopago=false
      // elemento.estado_pago_prestamo.pago=false
  
      // let ui_cobrador=localStorage.getItem("uid");
      // let idempresa=localStorage.getItem("empresa");
      // let idad=localStorage.getItem("iad");
     
        
        // this.clientesService.actualizarClienteCobrador(idad,idempresa,ui_cobrador,cliente.data.id,elemento).then( (response) =>  {
            
        // });
     
    // this.onCambiarEstadoRuta();
   this.onPendiente()
      }else{
        this.$f7.dialog.alert('Este cliente ya esta marcado como pendiente','Atencion!');
      }
     
  },
    onOpenPopverCobroNoPago(){
        // let popoeveBotonNoPago=this.$f7.popover.open('.popover-menu','.boton-no-pago');
        // popoeveBotonNoPago.closeByBackdropClick=false;
        // popoeveBotonNoPago.closeByOutsideClick=false;
        // popoeveBotonNoPago.on('close', function (popover) {
        
        // });
    },
    onCobroNoPago(){
      
      if(this.radioNoPagoSeleccionado=="Otro" && this.inputNoPagoSeleccionado!=""){
        this.$f7.dialog.preloader('Guardando informacion...');
          this.$f7.popover.close('.popover-menu');
        let elemento = this.clientes_info;
         let estados=JSON.parse(localStorage.getItem('ListaEstadosCobro'))
      //  let posicion = this.$store.getters.getClientesCobros.findIndex(x => x.data.id == this.id);
      let posicion = estados.findIndex(x => x.id == this.id);
     
       estados[posicion].estado= 2
       localStorage.setItem('ListaEstadosCobro',JSON.stringify(estados))
        // elemento.estado_pago_prestamo.nopago=true
        //  elemento.estado_pago_prestamo.pago=false
        //  elemento.estado_pago_prestamo.pendiente=false
       
        this.$store.commit('setCatidad_cobrosenofectivosJornada');
        // 
        if(elemento.prestamos[0].saldo_pendiente==0){
          elemento.prestamos[0].saldo_pendiente=Number(this.saldo_a_pagar)+Number(this.informacion_pago.valor_pago);
        }else{
          elemento.prestamos[0].saldo_pendiente=Number(elemento.prestamos[0].saldo_pendiente)+Number(this.saldo_a_pagar)+Number(this.informacion_pago.valor_pago);
        }
        
        elemento.prestamos[0].dias_con_mora=Number(elemento.prestamos[0].dias_con_mora)+1;
        // elemento.prestamos[0].dias_con_mora=Number(elemento.prestamos[0].dias_con_mora)+1
        // console.log(elemento.prestamos[0].dias_con_mora);
        // let ui_cobrador=localStorage.getItem("uid");
       
        // elemento.prestamos[0].total_apagar=Number(elemento.prestamos[0].total_apagar)+Number(this.saldo_a_pagar);
          let dataTotalAPagarHoy={
            Idcliente: this.id,
            pagototalhoy:Number(this.saldo_a_pagar)+Number(this.saldo_a_pagar)
          };
          this.$store.commit('setEstadoTotalAPagar',dataTotalAPagarHoy);
        
        this.clientesService.actualizarClienteCobrador(this.idad,this.idempresa,this.ui_cobrador,this.id,elemento).then( (response) =>  {
              // this.informacion_pago.valor_pago=0;
          let data={
            id: this.id,
            estadopagoruta:2
          };
          this.$store.commit('setEstadoPrestamoRutaNoPago',data);
          let data_mora={
            id: this.id,
            dias_mora:elemento.prestamos[0].dias_con_mora
          };
          this.$store.commit('setEstadoDiasMora',data_mora);
        //     let data_pendiente={
        //     id: this.id,
        //     pagopendiente:false
        //   };
        // this.$store.commit('setEstadoPrestamoPendiente',data_pendiente);
        
          //  fecha:new Date().toISOString().slice(0,10),
          
          let informacionNoPago={
           cliente_nombre:elemento.usuario.nombre,
           cliente_apellido:elemento.usuario.apellido,
           cliente_cedula:elemento.usuario.identificacion,
           cliente_id:this.id,
           fecha:this.$moment(new Date()).format("MM-DD-YYYY"),
           hora:this.$moment(new Date()).format("hh:mm:ss"), 
           razonnopago:this.inputNoPagoSeleccionado!=''?this.inputNoPagoSeleccionado:this.radioNoPagoSeleccionado
        }

        
        
        this.$store.commit('setQuitar_cobros_pendientesJornada',this.id);
        this.$store.commit('setDisminuyeContadorClientesListaPrestamos');
        this.clientesService.guardarObservacionNoPago(this.idad,this.idempresa,this.ui_cobrador,this.id,informacionNoPago).then( (response) =>  {
           
           this.$store.commit('setEstadoPrestamoEstadoRuta',this.id);
            this.$f7.dialog.close();
            let dataNoPago={
               cliente_nombre:elemento.usuario.nombre,
           cliente_apellido:elemento.usuario.apellido,
           cliente_cedula:elemento.usuario.identificacion,
           cliente_id:this.id,
           fecha:this.$moment(new Date()).format("MM-DD-YYYY"),
           hora:this.$moment(new Date()).format("hh:mm:ss"),
           valor: Number(this.informacion_pago.valor_pago)
            }

            this.$store.commit('setCobrosHoy',dataNoPago)
           
            this.$f7router.back();
        });
              
          }).catch((error)=>{
            this.$f7.dialog.close()
            if(this.$store.getters.getModoDebugger){
                  this.$store.commit('setErrorServices',error)
                  this.$f7.dialog.alert('Ha ocurrido un error, por favor verifique el menu debug','Atencion!')
                   console.log(error);
          }
          });
      }
      else if(this.radioNoPagoSeleccionado!=""){
        this.$f7.dialog.preloader('Guardando informacion...');
          this.$f7.popover.close('.popover-menu');
        let elemento = this.clientes_info;
         let estados=JSON.parse(localStorage.getItem('ListaEstadosCobro'))
      //  let posicion = this.$store.getters.getClientesCobros.findIndex(x => x.data.id == this.id);
       let posicion = estados.findIndex(x => x.id == this.id);
      //  console.log(posicion);
       estados[posicion].estado= 2
       localStorage.setItem('ListaEstadosCobro',JSON.stringify(estados))
        
        // let idempresa=localStorage.getItem("empresa");
        this.$store.commit('setCatidad_cobrosenofectivosJornada');
        if(elemento.prestamos[0].saldo_pendiente==0){
          elemento.prestamos[0].saldo_pendiente=Number(this.saldo_a_pagar)+Number(this.informacion_pago.valor_pago);
        }else{
          elemento.prestamos[0].saldo_pendiente=Number(elemento.prestamos[0].saldo_pendiente)+Number(this.saldo_a_pagar)+Number(this.informacion_pago.valor_pago);
        }
        

        elemento.prestamos[0].dias_con_mora=Number(elemento.prestamos[0].dias_con_mora)+1;
        
        // elemento.prestamos[0].dias_con_mora=Number(elemento.prestamos[0].dias_con_mora)+1
        
        // let ui_cobrador=localStorage.getItem("uid");
        // elemento.prestamos[0].total_apagar=Number(elemento.prestamos[0].total_apagar)+Number(this.saldo_a_pagar);
          let dataTotalAPagarHoy={
            Idcliente: this.id,
            pagototalhoy:Number(this.saldo_a_pagar)+Number(this.saldo_a_pagar)
          };
          this.$store.commit('setEstadoTotalAPagar',dataTotalAPagarHoy);
        
        this.clientesService.actualizarClienteCobrador(this.idad,this.idempresa,this.ui_cobrador,this.id,elemento).then( (response) =>  {
              // this.informacion_pago.valor_pago=0;
          let data={
            id: this.id,
            estadopagoruta:2
          };
          this.$store.commit('setEstadoPrestamoRutaNoPago',data);
          let data_mora={
            id: this.id,
            dias_mora:elemento.prestamos[0].dias_con_mora
          };
          this.$store.commit('setEstadoDiasMora',data_mora);
          //   let data_pendiente={
          //   id: this.id,
          //   pagopendiente:false
          // };
          // this.$store.commit('setEstadoPrestamoPendiente',data_pendiente);
          let informacionNoPago={
           cliente_nombre:elemento.usuario.nombre,
           cliente_apellido:elemento.usuario.apellido,
           cliente_cedula:elemento.usuario.identificacion,
           cliente_id:this.id,
           fecha:this.$moment(new Date()).format("MM-DD-YYYY"),
           hora:this.$moment(new Date()).format("hh:mm:ss"), 
           razonnopago:this.inputNoPagoSeleccionado!=''?this.inputNoPagoSeleccionado:this.radioNoPagoSeleccionado
        }
              this.$store.commit('setQuitar_cobros_pendientesJornada',this.id);
              this.$store.commit('setDisminuyeContadorClientesListaPrestamos');
        this.clientesService.guardarObservacionNoPago(this.idad,this.idempresa,this.ui_cobrador,this.id,informacionNoPago).then( (response) =>  {
     
           this.$store.commit('setEstadoPrestamoEstadoRuta',this.id);
            this.$f7.dialog.close();
              let dataNoPago={
               cliente_nombre:elemento.usuario.nombre,
           cliente_apellido:elemento.usuario.apellido,
           cliente_cedula:elemento.usuario.identificacion,
           cliente_id:this.id,
           fecha:this.$moment(new Date()).format("MM-DD-YYYY"),
           hora:this.$moment(new Date()).format("hh:mm:ss"),
           valor_pago: Number(this.informacion_pago.valor_pago)
            }

            this.$store.commit('setCobrosHoy',dataNoPago)
            this.$f7router.back();
        }).catch((error)=>{
          this.$f7.dialog.close()
            if(this.$store.getters.getModoDebugger){
                  this.$store.commit('setErrorServices',error)
                  this.$f7.dialog.alert('Ha ocurrido un error, por favor verifique el menu debug','Atencion!')
                   console.log(error);
          }
        });
              
          });
        }else{
         this.$f7.dialog.alert('Por favor seleccione el motivo de no pago.','Atencion!');
          // this.$f7.popover.open('.popover-menu');
      }
    },
       updateValor(){
          this.$f7router.back();
       let zona= localStorage.getItem("zona");
       let empresa= this.datastorage.empresa

       // Get a new write batch
var batch = db.batch();

// Update the population of 'SF'
var sfRef = db.collection("usuarios").doc(this.idad).collection("empresas").doc(empresa).collection('Zonas').doc(zona);
batch.update(sfRef, {"balance": this.balance_zona});



// Commit the batch
batch.commit().then(function () {
    // ...
   
});
    },
    onVerificarPrestamopago(elemento){
      // let ui_cobrador=localStorage.getItem("uid");
      // let idempresa=localStorage.getItem("empresa");
         //Verificacmos si el prestamo esta pago verificando el total a pagar.
                  if(elemento.prestamos[0].total_apagar==0 || elemento.prestamos[0].total_apagar<=0){
                        let posicion=this.$store.getters.getClientesListaPrestamo.findIndex(x => x.data.prestamos[0].cliente==elemento.prestamos[0].cliente);
                      this.$f7.sheet.close();
                      this.$f7.dialog.close();
                      this.$f7.dialog.alert('El prestamo ha sido cancelado.','Atencion');
                       this.$store.commit('SetEliminarClientesPrestamos',posicion);
                         this.$store.commit('setDisminuyeContadorClientesListaPrestamos');
                             elemento.prestamos[0].estado_prestamo=true
                    this.$store.commit('setQuitar_cobros_pendientesJornada',this.id);
                    this.informacion_pago.valor_pago=0;  
                        this.valor_sin_puntos=0;  
                       this.onEliminarClienteLista(elemento)

                    }
    },
    onActualizarFinalClienteCobro(){
        //  alert('lista actualizda')
                        // alert('elimina')
                
                    //  let posicion=.findIndex(x => {x.prestamos[0].cliente==elemento.prestamos[0].cliente});
                    
                    let posicion=this.$store.getters.getClientesListaPrestamo.findIndex(x => x.data.prestamos[0].cliente==elemento.prestamos[0].cliente);
                    // console.log(posicion);
                    
                        this.$store.commit('SetEliminarClientesPrestamos',posicion);
               
                    
                   
                   
                    this.$store.commit('setQuitar_cobros_pendientesJornada',this.id);
                    this.clientesService.actualizarClienteCobrador(this.idad,this.idempresa,this.ui_cobrador,this.id,elemento).then( (response) =>  {
                      
                        this.informacion_pago.valor_pago=0;  
                        this.valor_sin_puntos=0;  
                        this.$f7.sheet.close();
                        this.$f7.dialog.close();
                        
                        this.$store.commit('setDisminuyeContadorClientesListaPrestamos');

                      this.onEliminarClienteLista(elemento)
                      }).catch((error)=>{
                        if(this.$store.getters.getModoDebugger){
                                this.$store.commit('setErrorServices',error)
                                this.$f7.dialog.alert('Ha ocurrido un error, por favor verifique el menu debug','Atencion!')
                                console.log(error);
                        }
                      });
                            
                        // this.$f7router.back();
    },
    onEliminarClienteLista(elemento){
      //  let ui_cobrador=localStorage.getItem("uid");
      let idempresa=this.datastorage.empresa
       this.clientesService.eliminarPrestamoPago(this.idad,this.idempresa,this.ui_cobrador,this.id,elemento).then( (response) =>  {
                          // alert('elimina')
          // this.$store.state.estados_prestamos_ruta=[]
          this.$store.commit('eliminarClientePrestamoDiario',this.id);
          
          this.$f7router.back();
        }).catch((error)=>{
          this.$f7.dialog.close()
          if(this.$store.getters.getModoDebugger){
                  this.$store.commit('setErrorServices',error)
                  this.$f7.dialog.alert('Ha ocurrido un error, por favor verifique el menu debug','Atencion!')
                   console.log(error);
          }
        });
    },
    onConfirmarPago(){
      const app = this.$f7;
      // let ui_cobrador=localStorage.getItem("uid");
      // let idempresa=localStorage.getItem("empresa");

      let elemento = this.clientes_info;
      let estados=JSON.parse(localStorage.getItem('ListaEstadosCobro'))
      //  let posicion = this.$store.getters.getClientesCobros.findIndex(x => x.data.id == this.id);
       let posicion = estados.findIndex(x => x.id == this.id);
      //  console.log(posicion);
       estados[posicion].estado= 1
       localStorage.setItem('ListaEstadosCobro',JSON.stringify(estados))
    

      if(Number(this.valor_sin_puntos.split('.').join(''))>Number(elemento.prestamos[0].valor)){
          this.$f7.dialog.alert('El pago a realizar es mayor al valor del prestamo, revise por favor e intente nuevamente.','Atencion!');
          // this.valor_sin_puntos=0;
          // this.informacion_pago.valor_pago=0
      }else{
          
          this.$f7.dialog.preloader('Guardando pago...');
          // if(elemento.hasOwnProperty('cobros')){
          //    elemento.cobros.push(this.informacion_pago);
          // }else{
          //    elemento.cobros=new Array(this.informacion_pago);
          // }
          //Guardamos los cobros de realizados.
          this.informacion_pago.valor_pago=Number(this.valor_sin_puntos.split('.').join(''));
          this.informacion_pago.cliente_nombre=elemento.usuario.nombre
          this.informacion_pago.cliente_apellido=elemento.usuario.apellido
          this.informacion_pago.cliente_cedula=elemento.usuario.identificacion
          this.informacion_pago.cliente_id=this.id
          



           let id_empresa=localStorage.getItem("empresa");
          this.abonoService.guardarAbonosCobros(this.idad,id_empresa,this.ui_cobrador,this.id,this.informacion_pago).then( (response) =>  {
          let saldo_actual=  localStorage.getItem("saldo_zona");
          // this.informacion_pago.valor_pago=this.informacion_pago.valor_pago.replace('.', "");
          let saldo_valor=    this.informacion_pago.valor_pago;
          //   this.informacion_pago.cliente={
          //   nombre:elemento.usuario.nombre,
          //   apellido:elemento.usuario.apellido,
          //   cedula:elemento.usuario.identificacion,
          //   id:this.id,
          //   id_cobro:response.id
          // }
          this.informacion_pago.cliente_nombre=elemento.usuario.nombre
          this.informacion_pago.cliente_apellido=elemento.usuario.apellido
          this.informacion_pago.cliente_cedula=elemento.usuario.identificacion
          this.informacion_pago.cliente_id=this.id
          
          //guardamos el cobro realizado.
          // this.informacion_pago.cliente=this.id;
          this.$store.commit('setCobrosHoy',this.informacion_pago)
          this.$store.commit('setEstadoRuta',false);
          // this.jornada_cobrador.catidad_cobrosefectivos=Number(this.jornada_cobrador.catidad_cobrosefectivos)+1;

          

          this.$store.commit('setCatidad_cobrosefectivosJornada');
         
          
          //Actualizamos el saldo de la zona.
          let descuentosaldozona=Number(saldo_actual)+Number(saldo_valor);
          let total_cobrado=Number( this.$store.getters.getCobrosTotalCobrado)+Number(this.informacion_pago.valor_pago);
          this.mensajeSaldo=`Saldo ${this.saldo_a_pagar- this.informacion_pago.valor_pago}`;
          this.$store.commit('setTotalCobros',total_cobrado);
          
          localStorage.setItem("saldo_zona", descuentosaldozona);
          localStorage.setItem("cobros_efectivos", this.$store.getters.getCobrosEfectivos);
          localStorage.setItem("total_cobros",  this.$store.getters.getCobrosTotalCobrado);
          this.balance_zona= localStorage.getItem("saldo_zona");
          this.$store.commit('setBalanceZona',Number(descuentosaldozona));
          this.$store.commit('setbalance_finalJornada',Number(descuentosaldozona));
          
         
          //Si el saldo es igual entre el valor pago y el valor a pagar.
         if(Number(this.informacion_pago.valor_pago)===Number(this.saldo_a_pagar)){
          // let saldo_final=
        
          elemento.prestamos[0].total_apagar=Number(elemento.prestamos[0].total_apagar)-Number(this.informacion_pago.valor_pago)
          if(elemento.prestamos[0].total_apagar==0 || elemento.prestamos[0].total_apagar<=0){
                     elemento.prestamos[0].total_apagar=0
          }
          
                  //Estamos en  la funcion donde el pago es igual al pago realizado
                     // Si el pago es igual al al valor a pagar pero no se a pagado el total prestamo 
                    if(Number(elemento.prestamos[0].dias_con_mora)!=0){
                        
                      elemento.prestamos[0].dias_con_mora=Number(elemento.prestamos[0].dias_con_mora)-1;
                    }
                    // elemento.prestamos[0].saldo_pendiente=Number(this.saldo_a_pagar)-Number(this.informacion_pago.valor_pago);
                    if(Number(elemento.prestamos[0].saldo_pendiente)!=0){
                      if(Number(elemento.prestamos[0].saldo_pendiente)>=Number(this.saldo_a_pagar)){
                        elemento.prestamos[0].saldo_pendiente= Number(elemento.prestamos[0].saldo_pendiente)-Number(this.saldo_a_pagar);
                      }else{
                        elemento.prestamos[0].saldo_pendiente=Number(this.saldo_a_pagar)-Number(this.informacion_pago.valor_pago);
                      }
                        
                      //  elemento.prestamos[0].dias_con_mora=Number(elemento.prestamos[0].dias_con_mora)-1;
                    }

                    
                    
                   

                    let dataTotalAPagarHoy={
                      Idcliente: this.id,
                      pagototalhoy:elemento.prestamos[0].saldo_pendiente
                    };
                    this.$store.commit('setEstadoTotalAPagar',dataTotalAPagarHoy);

                    let data_ruta_bien={
                      id: this.id,
                      estadopagoruta:1
                    };
                    this.$store.commit('setEstadoPrestamoRutaPago',data_ruta_bien);
                    let data_mora={
                      id: this.id,
                      dias_mora:elemento.prestamos[0].dias_con_mora
                    };
                    this.$store.commit('setEstadoDiasMora',data_mora);
                //      let data_pendiente={
                //       id: this.id,
                //       pagopendiente:3
                //     };
                  
                // this.$store.commit('setEstadoPrestamoPendiente',data_pendiente);
                this.$store.commit('setQuitar_cobros_pendientesJornada',this.id);
                this.$store.commit('setEstadoPrestamoEstadoRuta',elemento.prestamos[0].cliente);
                  
                  

                      this.clientesService.actualizarClienteCobrador(this.idad,this.idempresa,this.ui_cobrador,this.id,elemento).then( (response) =>  {
                        // this.informacion_pago.valor_pago=0;  
                        //  this.valor_sin_puntos=0;  
                          this.$f7.sheet.close();
                    this.$f7.dialog.close();
                    this.$store.commit('setDisminuyeContadorClientesListaPrestamos');
                    this.updateValor();    
                    });

                    this.onVerificarPrestamopago(elemento)
      
         }
        else if(Number(this.informacion_pago.valor_pago)>Number(this.saldo_a_pagar)){
                
          // elemento.prestamos[0].dias_con_mora=Number(elemento.prestamos[0].dias_con_mora)+1;
           elemento.prestamos[0].total_apagar=Number(elemento.prestamos[0].total_apagar)-Number(this.informacion_pago.valor_pago)
          //  alert(elemento.prestamos[0].total_apagar);
          if(elemento.prestamos[0].total_apagar==0 || elemento.prestamos[0].total_apagar<=0){
                     elemento.prestamos[0].total_apagar=0
          }
          //Verificamos si el saldo esta en 0.
          if(Number(elemento.prestamos[0].dias_con_mora)!=0){
                        
                      elemento.prestamos[0].dias_con_mora=Number(elemento.prestamos[0].dias_con_mora)-1;
          }
          if(elemento.prestamos[0].saldo_pendiente!=0){
            elemento.prestamos[0].saldo_pendiente=Number(elemento.prestamos[0].saldo_pendiente)-Number(this.saldo_a_pagar)-Number(this.informacion_pago.valor_pago)
          }else{
            elemento.prestamos[0].saldo_pendiente=Number(this.saldo_a_pagar)-Number(this.informacion_pago.valor_pago)
          }
          
          

          this.cliente_seleccionado='';    
        
         
            let data_estado={
            id: this.id,
            estadopagoruta:1
          };
          
          this.$store.commit('setEstadoPrestamoRutaPago',data_estado);
            let data_mora={
            id: this.id,
            dias_mora:elemento.prestamos[0].dias_con_mora
          };
          this.$store.commit('setEstadoDiasMora',data_mora);
         
          let dataTotalAPagarHoy={
            Idcliente: this.id,
            pagototalhoy:elemento.prestamos[0].saldo_pendiente
          };
          this.$store.commit('setEstadoTotalAPagar',dataTotalAPagarHoy);
      //      let data_pendiente={
      //       id: this.id,
      //       pagopendiente:3
      //     };
      // this.$store.commit('setEstadoPrestamoPendiente',data_pendiente);
         this.$store.commit('setQuitar_cobros_pendientesJornada',this.id);
         this.$store.commit('setEstadoPrestamoEstadoRuta',elemento.prestamos[0].cliente);
        //  alert(elemento.prestamos[0].total_apagar);
       
            this.clientesService.actualizarClienteCobrador(this.idad,this.idempresa,this.ui_cobrador,this.id,elemento).then( (response) =>  {
              // this.informacion_pago.valor_pago=0; 
              this.valor_sin_puntos=0;   
                this.$f7.sheet.close();
          this.$f7.dialog.close();
          this.$store.commit('setDisminuyeContadorClientesListaPrestamos');
          this.updateValor();  
          });
           this.onVerificarPrestamopago(elemento)
          }else{
             elemento.prestamos[0].total_apagar=Number(elemento.prestamos[0].total_apagar)-Number(this.informacion_pago.valor_pago)
          if(elemento.prestamos[0].total_apagar==0 || elemento.prestamos[0].total_apagar<=0){
                     elemento.prestamos[0].total_apagar=0
          }
              
            elemento.prestamos[0].saldo_pendiente=Number(this.saldo_a_pagar)-Number(this.informacion_pago.valor_pago);

            // if(Number(elemento.prestamos[0].saldo_pendiente)!=0){
            //           if(Number(elemento.prestamos[0].saldo_pendiente)>=Number(this.saldo_a_pagar)){
            //             elemento.prestamos[0].saldo_pendiente= Number(elemento.prestamos[0].saldo_pendiente)-Number(this.saldo_a_pagar);
            //           }else{
            //             elemento.prestamos[0].saldo_pendiente=Number(this.saldo_a_pagar)-Number(this.informacion_pago.valor_pago);
            //           }
                        
            //           //  elemento.prestamos[0].dias_con_mora=Number(elemento.prestamos[0].dias_con_mora)-1;
            // }

         
          
           if(elemento.prestamos[0].dias_con_mora>=0){
            
            elemento.prestamos[0].dias_con_mora=Number(elemento.prestamos[0].dias_con_mora)+1;
            
          }

          //Verificamos si el saldo esta en 0.

           this.cliente_seleccionado='';    
        
           // elemento.prestamos[0].dias_plazo=Number(elemento.prestamos[0].dias_plazo)+1;
            let data_estado={
            id: this.id,
            estadopagoruta:1
          };
          
          this.$store.commit('setEstadoPrestamoRutaPago',data_estado);
            let data_mora={
            id: this.id,
            dias_mora:elemento.prestamos[0].dias_con_mora
          };
          this.$store.commit('setEstadoDiasMora',data_mora);
         
          let dataTotalAPagarHoy={
            Idcliente: this.id,
            pagototalhoy:elemento.prestamos[0].saldo_pendiente
          };
          this.$store.commit('setEstadoTotalAPagar',dataTotalAPagarHoy);
      //      let data_pendiente={
      //       id: this.id,
      //       pagopendiente:3
      //     };
      // this.$store.commit('setEstadoPrestamoPendiente',data_pendiente);
         this.$store.commit('setQuitar_cobros_pendientesJornada',this.id);
         this.$store.commit('setEstadoPrestamoEstadoRuta',elemento.prestamos[0].cliente);
        //  alert(elemento.prestamos[0].total_apagar);
        
            this.clientesService.actualizarClienteCobrador(this.idad,this.idempresa,this.ui_cobrador,this.id,elemento).then( (response) =>  {
              // this.informacion_pago.valor_pago=0; 
              this.valor_sin_puntos=0;   
                this.$f7.sheet.close();
          this.$f7.dialog.close();
          this.$store.commit('setDisminuyeContadorClientesListaPrestamos');
          this.updateValor();  
          });
          this.onVerificarPrestamopago(elemento)
          }
          
          
        
        }).catch((error)=>{
          this.$f7.dialog.close()
          if(this.$store.getters.getModoDebugger){
                  this.$store.commit('setErrorServices',error)
                  this.$f7.dialog.alert('Ha ocurrido un error, por favor verifique el menu debug','Atencion!')
                   console.log(error);
          }
        });
      }
         
  }
  },
  // watch: {
  //   ui_cobrador(newUid) {
  //     localStorage.uid = newUid;
  //   },
  //   idempresa(newEmpresa){
  //     localStorage.idempresa = newEmpresa;
  //   }

  // },
  mounted() {
    // if(localStorage.uid){
    //   alert('actualiza uid')
    //   this.ui_cobrador=localStorage.getItem("uid");
    // }
    // if(localStorage.empresa){
    //   this.idempresa=localStorage.getItem("empresa");
    // }
    
  },
  beforeMount(){
    let localstoragedata=localStorage.getItem('datainfologin')
      if(localstoragedata==null){
          this.$store.watch(() => this.$store.getters.getDatasStorage, datainfo => { 
        console.log("datastores",this.$store.getters.getDatasStorage)
        // console.log('watched: ', EstadosCobrosGuardados) 
       this.datastorage=datainfo
      //  console.log("datastores",this.data_store)
    //    this.idad=this.datastorage.iad
       
      })
      }else{
      
      this.datastorage=JSON.parse(localstoragedata)
      console.log("datastores",this.datastorage)
    //    this.idad=this.datastorage.iad
      }
   
    this.$f7.dialog.preloader("Cargando informacion...");
    this.balance_zona=localStorage.getItem("saldo_zona");
    this.ui_cobrador=this.datastorage.uid
    this.idempresa=this.datastorage.empresa
    
      this.abonoService= new AbonoService();
      this.clientesService=new ClientesService();
      this.cobradoresService= new CobradorService();
      // this.idad=localStorage.getItem("iad");
      this.idad=this.datastorage.iad
      //  let ui_cobrador=localStorage.getItem("uid");
          this.cobradoresService.getCobradoresClientesBuscar(this.idad,this.idempresa,this.ui_cobrador,this.$f7route.params.id).then( (response) =>  {
              this.clientes_info=response.data;
               this.$f7.dialog.close()
              this.isLoadUsers= true;
          }).catch(error => {
            this.$f7.dialog.close()
              if(this.$store.getters.getModoDebugger){
                  this.$store.commit('setErrorServices',error)
                  this.$f7.dialog.alert('Ha ocurrido un error, por favor verifique el menu debug','Atencion!')
                   console.log(error);
          }
          });
  },
    beforeCreate(){
    // this.ui_cobrador=localStorage.getItem("uid");
    // let data_store=this.$store.getters.getDatasStorage
    // console.log("datastores",data_store)
  
     let posicion=this.$store.getters.getClientes.findIndex(x => {x.hasOwnProperty('nuevo')? x.nuevo === true:x});
     if(posicion>0){
       this.$store.commit('getSetNuevoClientes',posicion);
     }
     
     
         
    }
  }
</script>   