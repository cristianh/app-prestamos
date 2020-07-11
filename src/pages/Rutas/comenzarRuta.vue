<template>
<f7-page name="Abono">
  <f7-navbar   :sliding="false">
     <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
    <f7-nav-right>
      <f7-link class="searchbar-enable" data-searchbar=".searchbar-abono" icon-ios="f7:search" icon-aurora="f7:search" icon-md="material:search"></f7-link>
    </f7-nav-right>
    <f7-searchbar
      expandable
      class="searchbar-abono"
      search-container=".search-list-abono"
      search-in=".item-subtitle"
      :disable-button="!$theme.aurora"
      placeholder="Buscar por cedula..."
    ></f7-searchbar>
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
     <div v-if="!this.isComienzoRuta" > 
         <f7-block  inset>
            <f7-row>
            <f7-col lg="12" md="12">
                <f7-button fill  @click="onGenerarListaJornadaPago">Comenzar<f7-icon material="swap_vert"></f7-icon></f7-button>
            </f7-col>
            </f7-row>
            

            </f7-block>
     </div>
      <div v-else>
                 <div v-if="clientes.length!=0 ">
            <f7-block inset>
              <f7-row>
              <f7-col>
        <f7-button fill sheet-open=".demo-sheet-swipe-to-step"  :disabled="cliente_seleccionado?false:true" @click="pago('Cobro')">Cobro <f7-icon material="local_atm"></f7-icon></f7-button>
        </f7-col>
        <f7-col>
                    <f7-button  sortable-toggle=".sortable" fill  color="blue" @click="txt_ordenar=!txt_ordenar" :text="txt_ordenar?'LISTO':'ORDENAR'"></f7-button>
                </f7-col>
         </f7-row>
         </f7-block>
         <f7-block>
         <f7-block-title >Clientes</f7-block-title>
       <!-- :link="`/cliente_detalles/${cliente.id}/`" -->
        <f7-list sortable media-list class="search-list-abono searchbar-found">
        <f7-list-item swipeout :disabled="!cliente.data.activo" :footer="`${diasValoraPago[index]!=undefined? 'Saldo por pagar: '+diasValoraPago[index]:'NA'}`"  v-for="(cliente,index,key) in clientesConPrestamo" :after="`${cliente.data.prestamos.length==0 || cliente.data.prestamos==undefined? 'NA':Number(planDiasPrestamo[index])>=1?'Mora: '+Number(planDiasPrestamo[index])+' dias':'Mora: '+Number(planDiasPrestamo[index])+' dia'}`" :subtitle="`Cedula: ${cliente.data.usuario.identificacion}`"   :id=cliente.id :key=cliente.id :title="`${cliente.data.usuario.nombre}-${cliente.data.usuario.apellido}`" >
        
        <f7-swipeout-actions right>
        <f7-swipeout-button close overswipe color="green" @click="onReply(cliente,cliente.data.usuario.nombre+cliente.data.usuario.apellido)">Seleccionar</f7-swipeout-button>
        <!-- <f7-swipeout-button color="blue" @click="onCobroPendiente(cliente.data.usuario)">Pago</f7-swipeout-button> -->
        <f7-swipeout-button  close color="red" @click="onCobroPendiente(cliente.data.usuario)">Pendiente</f7-swipeout-button>
        </f7-swipeout-actions>
        
        </f7-list-item>
        </f7-list>
        </f7-block>
        <f7-block>
        <f7-row>
        <f7-col>
            <f7-button  fill color="red" @click="onCerrarRuta">Terminar Ruta <f7-icon material="cancel"></f7-icon></f7-button>
        </f7-col>
         </f7-row>
        </f7-block>
      </div>
            <div v-else>
       <f7-block  inset>
 "No hay clientes"

</f7-block>
</div>
</div>



<!-- Swipe to step demo sheet -->
    <f7-sheet
      class="demo-sheet-swipe-to-step"
      style="height:auto; --f7-sheet-bg-color: #fff;"
      swipe-to-close
      swipe-to-step
      backdrop
    >
      <!-- Initial swipe step sheet content -->
      <div class="sheet-modal-swipe-step">
<f7-card>
      <!-- <f7-card-header>
         <f7-list  inset>
                <f7-list-item align="right" title="Saldo zona" :after="balance_zona"><f7-icon ios="f7:local_atm" aurora="f7:local_atm" md="material:local_atm"></f7-icon>
                </f7-list-item>
              </f7-list>
      </f7-card-header> -->
  <f7-card-content>
  <f7-row>
      <f7-col md="12"> 
        <f7-list inset>
            <f7-list-input
        label="Pago:"
        type="number"
        :value="informacion_pago.valor"
        min=0
        placeholder="0"
        clear-button
        @input.capture="informacion_pago.valor=$event.target.value"
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
          <div style="font-size: 22px"><b><span>{{informacion_pago.valor==0?0:informacion_pago.valor|currency}}</span></b></div>
        </div>
        <div class="padding-horizontal padding-bottom">
          <f7-button large fill @click="onConfirmarPago" >CONFIRMAR</f7-button>
          <!-- <div class="margin-top text-align-center">Swipe up for more details</div> -->
        </div>
      </div>
      <!-- Rest of the sheet content that will opened with swipe -->
      <f7-block-title medium class="margin-top">Detalles:</f7-block-title>
   
      <f7-list no-hairlines>
        <f7-list-item title="Item 1">
          <b slot="after" class="text-color-black">$200</b>
        </f7-list-item>
        <f7-list-item title="Item 2">
          <b slot="after" class="text-color-black">$180</b>
        </f7-list-item>
        <f7-list-item title="Delivery">
          <b slot="after" class="text-color-black">$120</b>
        </f7-list-item>
      </f7-list> 
    </f7-sheet>

    <f7-sheet class="mensaje_final-sheet" :opened="sheetOpened" @sheet:closed="sheetOpened = false">
      <f7-toolbar>
        <div class="left" style="margin-left:12px">Informe final de ruta</div>
        <div class="right">
          <f7-link sheet-close>Cerrar</f7-link>
        </div>
      </f7-toolbar>
      <!-- Scrollable sheet content -->
      <f7-page-content>
        <f7-block inside>
          Cobros realizados hoy: {{jornada_cobrador.catidad_cobrosefectivos}}<br>
          Total dinero recogido: ${{jornada_cobrador.total_cobros}}
          </f7-block>
        <f7-block-title>Dinero del dia:</f7-block-title>
        <f7-list >
          <f7-list-input
        outline
        floating-label
        label="Dinero fisico"
        type="text"
        placeholder="Por favor ingrese el saldo."
        required
        validate
        pattern="[0-9]*"
        error-message="Solo numeros"
      ></f7-list-input>
           </f7-list>
        
      </f7-page-content>
    </f7-sheet>

</f7-page>
</template>



<script>
import AbonoService from '../Services/AbonoServices.js';
import CobradorService from '../Services/CobradoresServices.js';
import ClientesService from '../Services/ClientesService.js';

export default {
  data() {
    return {
    sheetOpened: false,
    jornada_cobrador:{
        hora_inicial:this.$moment(new Date).format("hh:mm:ss"), 
        fecha_inicial:new Date().toISOString().slice(0,10),
        fecha_final:'',
        hora_final:'',
        balance_final_manual:'',
        balance_final:'',
        catidad_cobrosefectivos:0,
        catidad_cobrosenofectivos:0,
        total_cobros:0
    },
      numero_clientes:0,
      planseleccionado:'',
      tazaseleccionada:'',
      tazasdeinteres:[],
      abonoService:null,
      corbradorService:null,
      clientesService:null,
      balance_zona:'',
      clientes:[],
      cliente_seleccionado:'',
      effect:'blink',
      tipo_seleccionado:'',
      txt_ordenar:false,
      isLoadUsers:false,
      isComienzoRuta:false,
      informacion_pago:{
        valor:0,
        // fecha:this.$moment(new Date).format("DD/MM/YYYY"), 
        fecha:new Date().toISOString().slice(0,10), 
        cliente:'',
        estado_abono:true
      },
      nuevo_saldo_prestamo:0,
      contador_dias_pago:0
      
    }
  },
  watch: {
    UploadClientes(newCliente,oldCliente){
      this.clientes=this.$store.getters.getClientes;
    },
    UploadstadoRuta(newCliente,oldCliente){
       this.isComienzoRuta=this.$store.getters.getEstadoRuta
    }
  },
  beforeMount(){
    this.balance_zona=localStorage.getItem("saldo_zona");
    this.clientes=this.$store.getters.getClientes;
    this.numero_clientes=this.clientes.length;
      if(this.numero_clientes==1){
      this.isLoadUsers=true;
      }
      else{
      this.isLoadUsers=false;
      }
    this.abonoService= new AbonoService();
    this.corbradorService= new CobradorService();
    this.clientesService=new ClientesService();
    this.tazasdeinteres=this.$store.getters.getTazaseInteres;
    this.isComienzoRuta=this.$store.getters.getEstadoRuta
    
  },
  beforeCreate(){
 
  
  },
  computed: {
    diasMoraClients(){
      let dias=[];
      for (const key in this.clientes) {
        if (this.clientes.hasOwnProperty(key)) {
          const element = this.clientes[key];
         if(element.data.prestamos.length>0){
          element.data.prestamos.forEach(elementP => {
             dias.push(this.$moment(new Date()).diff(elementP.fecha,'days'));
          });
         }
      
        }
      }
      return dias;
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
     planPrestamo(){
      let plan=[];
      for (const key in this.clientes) {
        if (this.clientes.hasOwnProperty(key)) {
          const element = this.clientes[key];
          if(element.data.prestamos.length>0){
          element.data.prestamos.forEach(elementP => {
             plan.push(elementP.plan_seleccionado);
          });
          }
         
          
        }
      }
      return plan;
    },
      planDiasPrestamo(){
      let plan=[];
      let estado_cobros=false;
      let fecha_actual=0;
      
      for (const key in this.clientes) {
        if (this.clientes.hasOwnProperty(key)) {
          const element = this.clientes[key];
          if(element.data.prestamos.length>0){
              element.data.prestamos.forEach(elementP => {
                  // plan.push();
                  this.contador_dias_pago= elementP.dias_plazo;
            });
          
          if(element.data.cobros.length>0){
           
            element.data.cobros.forEach(elementC => {
                  // plan.push();
                    if(elementC.estado_abono==true){
                        this.contador_dias_pago--;
                        if(this.$moment(new Date()).subtract(1, "days").diff(elementC.fecha,'days')==1){
                          this.contador_dias_pago++
                        }
                    }
            });
           
           
             
          }
          plan.push(this.contador_dias_pago);
          }
          
        }
       
      }
      return plan;
    },
     clientesConPrestamo(){
       return this.clientes.filter(x =>x.data.prestamos.length>0);
    },
     calculoTotalPagoHoy(){
       let pagos_dia=[];
       let valor_prestamo=0;
       let taza_seleccionada_interes=0;
       let plazo_dias=0;
       let total_apagar=0;
       let pago=0;

       for (const key in this.clientes) {
        if (this.clientes.hasOwnProperty(key)) {
          const element = this.clientes[key];
          if(element.data.prestamos.length>0){
          element.data.prestamos.forEach(elementP => {
          valor_prestamo=elementP.valor;
          taza_seleccionada_interes;
          switch(elementP.plan_seleccionado){
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
          plazo_dias= this.contador_dias_pago;
          
          total_apagar=(Number(valor_prestamo)*taza_seleccionada_interes)+Number(valor_prestamo);
          
          if(Number(plazo_dias)<=0){
            pago=0;
          }else{
            pago=Math.round(Number(total_apagar)/Number(plazo_dias));
          }
          
          
          console.log(pago);
            });
            pagos_dia.push(pago);
          }
          
        
          
        }
       
      }
      return pagos_dia;
    }
  },
  methods:{
      clientesEstadoPago(id_cliente){
        
    },
    onCerrarRuta(){
       const app = this.$f7;
        // app.dialog.alert(id);
        app.dialog.confirm('Seguro desea terminar la ruta!','Terminar ruta', () => {
          this.jornada_cobrador.fecha_final=new Date().toISOString().slice(0,10);
        this.jornada_cobrador.hora_final=this.$moment(new Date).format("hh:mm:ss");
        let ui_cobrador=localStorage.getItem("uid");
        let id_jornadacobrador=localStorage.getItem("idjornadacobrador");
        this.corbradorService.actualizarJornadaCobrador(ui_cobrador,id_jornadacobrador,this.jornada_cobrador).then(response =>{
                 this.$store.commit('setEstadoRuta',false);
                 this.isComienzoRuta=false;
                 this.$f7.sheet.open('.mensaje_final-sheet');
             }).catch(error =>{
                console.log(error);
             })
        });
        
    },
    onGenerarListaJornadaPago(){
         let ui_cobrador=localStorage.getItem("uid");
             this.corbradorService.guardarJornadaCobrador(ui_cobrador,this.jornada_cobrador).then(response =>{
                 console.log(response);
                 this.isComienzoRuta=true;
                 localStorage.setItem("idjornadacobrador",response.data.id);
                 this.$store.commit('setEstadoRuta',true);
             }).catch(error =>{
                console.log(error);
             })
    },
    roundTo(value, places){
     var power = Math.pow(10, places);
     return Math.round(value * power) / power;
    },
    onSelectPlan($event){
      this.planseleccionado=$event.target.value.split("-")[0];
      this.tazaseleccionada=$event.target.value.split("-")[1];
        console.log(this.tazaseleccionada);
    },
    updateValor(){
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
    console.log("Balance Actualizado");
});
    },
    updateNuevoSaldoCliente(){
     
    },
    onCobroPendiente(usuario){
      this.$store.commit('cobroPendiente',usuario);
      console.log("Pendiente"+usuario);
    },
    onReply(cliente,nombrecompleto) {
        const app = this.$f7;
        // app.dialog.alert(id);
        app.dialog.confirm(nombrecompleto,'Confirmar usuario', () => {
          this.cliente_seleccionado=cliente.id;
          app.dialog.alert(nombrecompleto,'Confirmado!');
          // document.getElementById(id).set
          let elemento = this.clientes.findIndex(x=>x.id==cliente.id);
          this.clientes[elemento].data.activo=false;
        });
      },
    pago(tipo_pago){
      this.tipo_seleccionado=tipo_pago;
    },
    onConfirmarPago(){

      const self = this;
        self.$f7.dialog.preloader('Guardando pago...');
      let ui_cobrador=localStorage.getItem("uid");
      if(this.cliente_seleccionado==='' || this.cliente_seleccionado==null){
         const app = this.$f7;
         app.dialog.alert('Debe seleccionar un Cliente!');
      }
      else{
        const app = this.$f7;
        this.informacion_pago.cliente=this.cliente_seleccionado;
        let elemento = this.clientes.findIndex(x=>x.id==this.cliente_seleccionado);
        if(this.tipo_seleccionado=="Cobro"){
          this.clientes[elemento].data.cobros.push(this.informacion_pago);
          this.abonoService.guardarAbonosCobros(ui_cobrador,this.informacion_pago.cliente,this.informacion_pago).then( (response) =>  {
          let saldo_actual=  localStorage.getItem("saldo_zona");
          let saldo_valor=   this.informacion_pago.valor;
          this.jornada_cobrador.catidad_cobrosefectivos=Number(this.jornada_cobrador.catidad_cobrosefectivos)+1;
          let descuentosaldozona=Number(saldo_actual)+Number(saldo_valor);
          this.jornada_cobrador.total_cobros=Number(this.jornada_cobrador.total_cobros)+Number(this.informacion_pago.valor);

          //Actualizamos el valor del prestamo.
          this.nuevo_saldo_prestamo= Number(this.clientes[elemento].data.prestamos[0].valor)-Number(this.informacion_pago.valor);
         
          localStorage.setItem("saldo_zona", descuentosaldozona);
          localStorage.setItem("cobros_efectivos", this.jornada_cobrador.catidad_cobrosefectivos);
          localStorage.setItem("total_cobros",  this.jornada_cobrador.total_cobros);
          this.balance_zona= localStorage.getItem("saldo_zona");

          //
      
          this.clientes[elemento].data.prestamos[0].total_apagar=Number(this.clientes[elemento].data.prestamos[0].total_apagar)-Number(this.informacion_pago.valor);
          // this.clientes[elemento].data.prestamos[0].dias_plazo=Number(this.clientes[elemento].data.prestamos[0].dias_plazo)-1;
          
          //
         
          // this.updateNuevoSaldoCliente();
          console.log(this.clientes[elemento].data);
         
          this.clientesService.guardarActualizarClienteCobrador(ui_cobrador,this.informacion_pago.cliente,this.clientes[elemento].data).then( (response) =>  {
              console.log("actualizado"+response);
              this.informacion_pago.valor=0;
          });
          
          this.cliente_seleccionado='';
          self.$f7.dialog.close();
          this.$f7router.back();
          this.$f7.sheet.close();
          this.updateValor();
          
          // let mensaje="Informacion del dia /n"+"Saldo de la zona: \n"+localStorage.getItem("saldo_zona")+"Total dinero en cobros:\n"+localStorage.getItem("total_cobros")+"Cobros realizados:\n"+localStorage.getItem("cobros_efectivos");;
          // app.dialog.prompt(mensaje, function (name) {
          //   app.dialog.confirm('Are you sure that your name is ' + name + '?', function () {
          //     app.dialog.alert('Ok, your name is ' + name);
          //   });
          // });
          // this.onEliminarClienteCobrado(this.cliente_seleccionado);
       });
        }
      }
    }
  }
}
</script>