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
</f7-block>
       <f7-block>
    <f7-card>
      <f7-card-header>
  <f7-block-title>
    {{mensajeSaldo}}
  </f7-block-title>
  </f7-card-header>
  <f7-card-content>
    <f7-list>
      
       <f7-list-item   v-for="(prestamos,index,keycod) in clientes_info.prestamos" :id="index" :key="keycod">
        <div v-if="clientes_info.prestamos.dias_plazo!=''">
        <f7-block-title>Prestamo</f7-block-title>
        <f7-block>
         <h5>
         Dias de mora: {{prestamos.dias_con_mora}}<br>
         Dias de plazo: {{prestamos.dias_plazo}}<br>
         Fecha del prestamo: {{prestamos.fecha}}<br>
         Valor del prestamo: {{prestamos.valor}}<br>
         Total a pagar: {{prestamos.total_apagar}}<br>
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
    {{mensajeSaldo}}
  </f7-card-header>
  <f7-card-content>
  <f7-row>
      <f7-col md="12"> 
        <f7-list inset>
        <f7-list-input
        label="Pago:"
        type="number"
        :value="informacion_pago.valor"
        min=0
        autofocus
        placeholder="0"
        clear-button
        @input.capture="informacion_pago.valor_pago=$event.target.value"
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
          :value="informacion_pago.fecha"
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
    <f7-link>{{balance_zona}}</f7-link>
    
  </f7-card-footer>
</f7-card>
        <div class="display-flex padding justify-content-space-between align-items-center">
          <div style="font-size: 18px"><b>Total:</b></div>
          <div style="font-size: 22px"><b><span>{{informacion_pago.valor_pago==0?0:informacion_pago.valor_pago|currency}}</span></b></div>
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
    <f7-popover class="popover-menu" :closeOnEscape="false" :closeByOutsideClick="false" :closeByBackdropClick="false" >
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

  export default {
   data() {
       return {
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
            mensajeSaldo: `Saldo a pagar: ${this.$f7route.params.saldo_apagar}`,
            abonoService:null,
            clientesService:null,
            informacion_pago:{
            valor:'',
            valor_pago:0,
                // fecha:this.$moment(new Date).format("DD/MM/YYYY"), 
                fecha:new Date().toISOString().slice(0,10), 
                cliente:'',
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
  onCobroPendiente(){
      // this.$store.commit('cobroClientePendiente',this.clientes_info);
    //  this.$store.commit('setNumero_cobros_pendientesJornada');
     
      let data={
            id: this.id,
            estadopagoruta:2
          };
          this.$store.commit('setEstadoPrestamoRuta',data);
          //  this.$f7.dialog.alert('Marcado como pendiente','Correcto');
           this.$f7router.back();
    // this.onCambiarEstadoRuta();
   
  },
    onOpenPopverCobroNoPago(){
        // let popoeveBotonNoPago=this.$f7.popover.open('.popover-menu','.boton-no-pago');
        // popoeveBotonNoPago.closeByBackdropClick=false;
        // popoeveBotonNoPago.closeByOutsideClick=false;
        // popoeveBotonNoPago.on('close', function (popover) {
        //   console.log('Popover close');
        // });
    },
    onCobroNoPago(){
      
      if(this.radioNoPagoSeleccionado=="Otro" && this.inputNoPagoSeleccionado!=""){
        this.$f7.dialog.preloader('Guardando informacion...');
          this.$f7.popover.close('.popover-menu');
        let elemento = this.clientes_info;
        this.$store.commit('setCatidad_cobrosenofectivosJornada');
        
        elemento.prestamos[0].dias_con_mora=Number(elemento.prestamos[0].dias_con_mora)+1
        // console.log(elemento.prestamos[0].dias_con_mora);
        let ui_cobrador=localStorage.getItem("uid");
        elemento.prestamos[0].total_apagar=Number(elemento.prestamos[0].total_apagar)+Number(this.saldo_a_pagar);
          let dataTotalAPagarHoy={
            Idcliente: this.id,
            pagototalhoy:Number(this.saldo_a_pagar)+Number(this.saldo_a_pagar)
          };
          this.$store.commit('setEstadoTotalAPagar',dataTotalAPagarHoy);
        
        this.clientesService.actualizarClienteCobrador(ui_cobrador,this.id,elemento).then( (response) =>  {
              // this.informacion_pago.valor_pago=0;
          let data={
            id: this.id,
            estadopagoruta:2
          };
          this.$store.commit('setEstadoPrestamoRuta',data);
          let data_mora={
            id: this.id,
            dias_mora:elemento.prestamos[0].dias_con_mora
          };
          this.$store.commit('setEstadoDiasMora',data_mora);
            let data_pendiente={
            id: this.id,
            pagopendiente:false
          };
      this.$store.commit('setEstadoPrestamoPendiente',data_pendiente);
          let informacionNoPago={
           fecha_hora:this.$moment(new Date()).format("DDDD-MM-YYYY hh:mm:ss"), 
           razonnopago:this.inputNoPagoSeleccionado!=''?this.inputNoPagoSeleccionado:this.radioNoPagoSeleccionado
        }
        this.clientesService.guardarObservacionNoPago(ui_cobrador,this.id,informacionNoPago).then( (response) =>  {
           this.$store.commit('setQuitar_cobros_pendientesJornada');
            this.$f7.dialog.close();
            this.$f7router.back();
        });
              
          });
      }
      else if(this.radioNoPagoSeleccionado!=""){
        this.$f7.dialog.preloader('Guardando informacion...');
          this.$f7.popover.close('.popover-menu');
        let elemento = this.clientes_info;
        this.$store.commit('setCatidad_cobrosenofectivosJornada');
        
        elemento.prestamos[0].dias_con_mora=Number(elemento.prestamos[0].dias_con_mora)+1
        // console.log(elemento.prestamos[0].dias_con_mora);
        let ui_cobrador=localStorage.getItem("uid");
        elemento.prestamos[0].total_apagar=Number(elemento.prestamos[0].total_apagar)+Number(this.saldo_a_pagar);
          let dataTotalAPagarHoy={
            Idcliente: this.id,
            pagototalhoy:Number(this.saldo_a_pagar)+Number(this.saldo_a_pagar)
          };
          this.$store.commit('setEstadoTotalAPagar',dataTotalAPagarHoy);
        
        this.clientesService.actualizarClienteCobrador(ui_cobrador,this.id,elemento).then( (response) =>  {
              // this.informacion_pago.valor_pago=0;
          let data={
            id: this.id,
            estadopagoruta:2
          };
          this.$store.commit('setEstadoPrestamoRuta',data);
          let data_mora={
            id: this.id,
            dias_mora:elemento.prestamos[0].dias_con_mora
          };
          this.$store.commit('setEstadoDiasMora',data_mora);
            let data_pendiente={
            id: this.id,
            pagopendiente:false
          };
          this.$store.commit('setEstadoPrestamoPendiente',data_pendiente);
          let informacionNoPago={
           fecha_hora:this.$moment(new Date()).format("DDDD-MM-YYYY hh:mm:ss"), 
           razonnopago:this.inputNoPagoSeleccionado!=''?this.inputNoPagoSeleccionado:this.radioNoPagoSeleccionado
        }
        this.clientesService.guardarObservacionNoPago(ui_cobrador,this.id,informacionNoPago).then( (response) =>  {
           this.$store.commit('setQuitar_cobros_pendientesJornada');
            this.$f7.dialog.close();
            this.$f7router.back();
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
       let empresa= localStorage.getItem("empresa");

       // Get a new write batch
var batch = db.batch();

// Update the population of 'SF'
var sfRef = db.collection("empresas").doc(empresa).collection('Zonas').doc(zona);
batch.update(sfRef, {"balance": this.balance_zona});



// Commit the batch
batch.commit().then(function () {
    // ...
   
});
    },
    onConfirmarPago(){
      const app = this.$f7;
      let ui_cobrador=localStorage.getItem("uid");
      let elemento = this.clientes_info;

      //Verificamos que el valor ingresado a pagar no sea mayor al valor del prestamo realizado
      if(Number(this.informacion_pago.valor_pago>Number(elemento.prestamos[0].valor))){
          this.$f7.dialog.alert('El valor a pagar es mayor al total del prestamo,revise por favor.','Atencion!');
          this.informacion_pago.valor_pago=0;
      }else{
          
          this.$f7.dialog.preloader('Guardando pago...');
          elemento.cobros.push(this.informacion_pago);
          this.informacion_pago.cliente=this.id;
          this.abonoService.guardarAbonosCobros(ui_cobrador,this.id,this.informacion_pago).then( (response) =>  {
          let saldo_actual=  localStorage.getItem("saldo_zona");
          let saldo_valor=   this.informacion_pago.valor_pago;
          this.$store.commit('setEstadoRuta',false);
          // this.jornada_cobrador.catidad_cobrosefectivos=Number(this.jornada_cobrador.catidad_cobrosefectivos)+1;

          

          this.$store.commit('setCatidad_cobrosefectivosJornada');
         
          let numero_de_clientes_prestamo=this.$store.getters.getClientesPrestamo;
    
          let descuentosaldozona=Number(saldo_actual)+Number(saldo_valor);
          let total_cobrado=Number( this.$store.getters.getCobrosTotalCobrado)+Number(this.informacion_pago.valor_pago);
          this.mensajeSaldo=`Nuevo saldo ${this.saldo_a_pagar-this.informacion_pago.valor_pago}`;
          this.$store.commit('setTotalCobros',total_cobrado);
          
          localStorage.setItem("saldo_zona", descuentosaldozona);
          localStorage.setItem("cobros_efectivos", this.$store.getters.getCobrosEfectivos);
          localStorage.setItem("total_cobros",  this.$store.getters.getCobrosTotalCobrado);
          this.balance_zona= localStorage.getItem("saldo_zona");
          this.$store.commit('setBalanceZona',Number(descuentosaldozona));
          this.$store.commit('setbalance_finalJornada',Number(descuentosaldozona));
          
         
        //Actualizamos el valor del prestamo a pagar.
        console.log(Number(this.informacion_pago.valor_pago));
        console.log(Number(this.saldo_a_pagar));
         if(Number(this.informacion_pago.valor_pago)===Number(this.saldo_a_pagar)){
            

          //  elemento.prestamos[0].saldo_pendiente=0;
         
          elemento.prestamos[0].saldo_pendiente=Number(this.saldo_a_pagar)-Number(this.informacion_pago.valor_pago);
          elemento.prestamos[0].total_apagar=Number(elemento.prestamos[0].total_apagar)-Number(this.informacion_pago.valor_pago);
          // elemento.prestamos[0].dias_plazo=Number(elemento.prestamos[0].dias_plazo)-1;
          
          if(elemento.prestamos[0].dias_con_mora!=0){
            
            elemento.prestamos[0].dias_con_mora=Number(elemento.prestamos[0].dias_con_mora)-1;
            
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
          this.$store.commit('setEstadoPrestamoRuta',data_ruta_bien);
          let data_mora={
            id: this.id,
            dias_mora:elemento.prestamos[0].dias_con_mora
          };
          this.$store.commit('setEstadoDiasMora',data_mora);
           let data_pendiente={
            id: this.id,
            pagopendiente:false
          };
      this.$store.commit('setEstadoPrestamoPendiente',data_pendiente);
       this.$store.commit('setQuitar_cobros_pendientesJornada');
        this.clientesService.actualizarClienteCobrador(ui_cobrador,this.id,elemento).then( (response) =>  {
              this.informacion_pago.valor_pago=0;  
                this.$f7.sheet.close();
          this.$f7.dialog.close();
          this.updateValor();    
          });
         }
         else {
          
          elemento.prestamos[0].saldo_pendiente=Number(this.saldo_a_pagar)-Number(this.informacion_pago.valor_pago);
          // console.log(elemento.prestamos[0].saldo_pendiente);
          elemento.prestamos[0].total_apagar=Number(elemento.prestamos[0].total_apagar)-Number(this.informacion_pago.valor_pago);
           if(elemento.prestamos[0].dias_con_mora>=0){
            
            elemento.prestamos[0].dias_con_mora=Number(elemento.prestamos[0].dias_con_mora)+1;
            
          }
          // elemento.prestamos[0].dias_con_mora=Number(elemento.prestamos[0].dias_con_mora)+1;
          
         
       

          //Verificamos si el saldo esta en 0.

           this.cliente_seleccionado='';    
           if(elemento.prestamos[0].valor==0 || elemento.prestamos[0].total_apagar<=0){
           elemento.prestamos=[];
           elemento.cobros=[];
           //Provisional mientras decide que hacer con el pago.
          //  this.clientesService.eliminarPrestamoPago(ui_cobrador,this.id,this.informacion_pago).then( (response) =>  {
          //     this.informacion_pago.valor_pago=0;
          // });
           } 

        
          
         
          if(Number(this.saldo_a_pagar)-Number(this.informacion_pago.valor_pago)<=0){
            //Pendiente de comprobacion
             //this.$store.commit('eliminarClientePrestamoDiario',this.id);
           }
           // elemento.prestamos[0].dias_plazo=Number(elemento.prestamos[0].dias_plazo)+1;
            let data_estado={
            id: this.id,
            estadopagoruta:1
          };
          this.$store.commit('setEstadoPrestamoRuta',data_estado);
            let data_mora={
            id: this.id,
            dias_mora:elemento.prestamos[0].dias_con_mora
          };
          this.$store.commit('setEstadoDiasMora',data_mora);
         }
          let dataTotalAPagarHoy={
            Idcliente: this.id,
            pagototalhoy:elemento.prestamos[0].saldo_pendiente
          };
          this.$store.commit('setEstadoTotalAPagar',dataTotalAPagarHoy);
           let data_pendiente={
            id: this.id,
            pagopendiente:false
          };
      this.$store.commit('setEstadoPrestamoPendiente',data_pendiente);
         this.$store.commit('setQuitar_cobros_pendientesJornada');
           
          this.clientesService.actualizarClienteCobrador(ui_cobrador,this.id,elemento).then( (response) =>  {
              this.informacion_pago.valor_pago=0;    
                this.$f7.sheet.close();
          this.$f7.dialog.close();
          this.updateValor();  
          });
        
        });
      }
         
  }
  },
  beforeMount(){
      this.balance_zona=localStorage.getItem("saldo_zona");
      this.abonoService= new AbonoService();
      this.clientesService=new ClientesService();
  },
    beforeCreate(){
     let posicion=this.$store.getters.getClientes.findIndex(x => {x.hasOwnProperty('nuevo')? x.nuevo === true:x});
     if(posicion>0){
       this.$store.commit('getSetNuevoClientes',posicion);
     }
     
     
          let ui_cobrador=localStorage.getItem("uid"); 
          axios.get(`https://us-central1-manifest-life-279516.cloudfunctions.net/CobradoresClientesBuscar?doc=${ui_cobrador}&sub=Clientes&subdoc=${this.$f7route.params.id}`)
          .then( (response) =>  {
              this.clientes_info=response.data;
              // console.log("datossss...",response);
              this.isLoadUsers= true;
          }).catch(error => {
              console.log(error);
          }); 
  }
  };
</script>