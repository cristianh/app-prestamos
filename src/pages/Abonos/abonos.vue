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
{{tazasdeinteres}}
<f7-block  inset>
<f7-row>
  <f7-col>
    <f7-button fill sheet-open=".demo-sheet-swipe-to-step" :disabled="cliente_seleccionado?false:true" @click="pago('Prestamo')">Prestamo <f7-icon material="swap_vert"></f7-icon></f7-button>
  </f7-col>
  <f7-col>
    <f7-button fill sheet-open=".demo-sheet-swipe-to-step"  :disabled="cliente_seleccionado?false:true" @click="pago('Cobro')">Cobro <f7-icon material="local_atm"></f7-icon></f7-button>
  </f7-col>
  <f7-col>
      
        <f7-button  sortable-toggle=".sortable" fill  color="blue" @click="txt_ordenar=!txt_ordenar" :text="txt_ordenar?'LISTO':'ORDENAR'"></f7-button>
    </f7-col>
</f7-row>
</f7-block>
<f7-block-title >Clientes</f7-block-title>
<f7-card>
  <f7-card-content :padding="false">
  <f7-list class="searchbar-not-found">
    <f7-list-item title="Cliente no encontrado."></f7-list-item>
    <f7-row>
   
    <f7-col>
        <!-- {{[0]}} -->
      <f7-button fill large small href="/cliente_nuevo/" color="green">NUEVO CLIENTE</f7-button>
    </f7-col>
    </f7-row>
  </f7-list>
     <div > 
       <!-- :link="`/cliente_detalles/${cliente.id}/`" -->
        <f7-list sortable media-list  v-if="clientes" class="search-list-abono searchbar-found">
        <f7-list-item swipeout :footer="`${diasValorPagoClients[index]!=undefined? 'Valor prestamo '+diasValorPagoClients[index]:'NA'}`"  v-for="(cliente,index,key) in clientes" :after="`${cliente.data.prestamos.length==0 || cliente.data.prestamos==undefined? 'NA':diasMoraClients[index]>=1?'Dias de mora: '+diasMoraClients[index]+' dias':'Dias de mora: '+diasMoraClients[index]+' dia'}`" :subtitle="`Cedula: ${cliente.data.usuario.identificacion}`"   :id=cliente.id :key=cliente.id :title="`${cliente.data.usuario.nombre}-${cliente.data.usuario.apellido}`" >
        <f7-swipeout-actions right>
        <f7-swipeout-button overswipe color="green" @click="onReply(cliente.id,cliente.data.usuario.nombre+cliente.data.usuario.apellido)">Seleccionar</f7-swipeout-button>
        <f7-swipeout-button color="red" @click="onCobroPendiente(cliente.data.usuario)">Pendiente</f7-swipeout-button>
        </f7-swipeout-actions>
        </f7-list-item>
        </f7-list>
        <f7-list v-else class="search-list searchbar-found">
         <f7-list-item  :class="`skeleton-text skeleton-effect-${effect}`" media-item :subtitle="`Cedula: ${cliente.data.usuario.identificacion}`" v-for="(cliente,index,key) in clientes"  :id=cliente.id :key=cliente.id :title="`${cliente.data.usuario.nombre}-${cliente.data.usuario.apellido}`"  > </f7-list-item>
        </f7-list>
      </div>
  </f7-card-content>

</f7-card>

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
        :value="formpago.valor"
        min=0
        placeholder="0"
        clear-button
        @input.capture="formpago.valor=$event.target.value"
        ></f7-list-input>
            <f7-list-input
    label="Plan"
    type="select"
    defaultValue="15/15"
    placeholder="Please choose..."
    @change="onSelectPlan"
  >
   <option value="0">Seleccione</option>
  <option  v-for="(planes,index,key) in tazasdeinteres"  :key=key :value="`${planes.data.plazo}-${planes.data.interes}`">{{planes.data.nombre}}</option>
       </f7-list-input>
        </f7-list>
          <f7-list inset>
          <f7-list-input
          label="Fecha"
          type="date"
          clear-button
          :value="formpago.fecha"
           @input="formpago.fecha=$event.target.value"
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
{{planseleccionado}}
        <div class="display-flex padding justify-content-space-between align-items-center">
          <div style="font-size: 18px"><b>Total:</b></div>
          <div style="font-size: 22px"><b><span>{{formpago.valor==0?0:formpago.valor|currency}}</span></b></div>
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

    




      <!-- FAB Backdrop -->
  <!-- <f7-fab-backdrop slot="fixed"></f7-fab-backdrop> -->

  <!-- FAB Right Bottom -->
  <!-- <f7-fab position="right-bottom" slot="fixed">
    <f7-icon ios="f7:plus" aurora="f7:plus" md="material:add"></f7-icon>
    <f7-icon ios="f7:xmark" aurora="f7:xmark" md="material:close"></f7-icon>
    <f7-fab-buttons position="top">
      <f7-fab-button label="Prestamo"></f7-fab-button>
      <f7-fab-button label="Cobro"></f7-fab-button>
    </f7-fab-buttons>
  </f7-fab> -->

</f7-page>
</template>



<script>
import AbonoService from '../Services/AbonoServices.js';
export default {
  data() {
    return {
      planseleccionado:'',
      tazaseleccionada:'',
      tazasdeinteres:[],
      abonoService:null,
      balance_zona:'',
      clientes:[],
      cliente_seleccionado:'',
      effect:'blink',
      tipo_seleccionado:'',
      txt_ordenar:false,
      formpago:{
        valor:0,
        // fecha:this.$moment(new Date).format("DD/MM/YYYY"), 
        fecha:new Date().toISOString().slice(0,10), 
        cliente:''
      }
      
    }
  },
  watch: {
    UploadClientes(newCliente,oldCliente){
      this.clientes=this.$store.getters.getClientes;
    }
  },
  beforeMount(){
    this.balance_zona=localStorage.getItem("saldo_zona");
    this.clientes=this.$store.getters.getClientes;
    this.abonoService= new AbonoService();
    this.tazasdeinteres=this.$store.getters.getTazaseInteres;
    
  },
  beforeCreate(){
 
  
  },
  computed: {
    diasMoraClients(){
      let dias=[];
      for (const key in this.clientes) {
        if (this.clientes.hasOwnProperty(key)) {
          const element = this.clientes[key];
         
          
          element.data.prestamos.forEach(elementP => {
             dias.push(this.$moment(new Date()).diff(elementP.fecha,'days'));
          });
         
          console.log();
          //return element;
        }
      }
      return dias;
    },
    diasValorPagoClients(){
      let valor=[];
      for (const key in this.clientes) {
        if (this.clientes.hasOwnProperty(key)) {
          const element = this.clientes[key];
         
          
          element.data.prestamos.forEach(elementP => {
             valor.push(elementP.valor);
          });
         
          console.log();
          //return element;
        }
      }
      return valor;
    }
  },
  methods:{
    onSelectPlan($event){
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
    console.log("Document successfully updated!");
});
       
       
//       db.collection("empresas").doc(empresa).collection('Zonas').doc(zona).update({
//     balance:  
// })
// .then(function() {
//     
// })
// .catch(function(error) {
//     // The document probably doesn't exist.
//     console.error("Error updating document: ", error);
// });
    },
    onCobroPendiente(usuario){
      this.$store.commit('cobroPendiente',usuario);
      console.log("Pendiente"+usuario);
    },
    onReply(id,nombrecompleto) {
        const app = this.$f7;
        // app.dialog.alert(id);
        app.dialog.confirm(nombrecompleto,'Confirmar usuario', () => {
          this.cliente_seleccionado=id;
          // console.log(this.cliente_seleccionado);
          app.dialog.alert(nombrecompleto,'Confirmado!');
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
        this.formpago.cliente=this.cliente_seleccionado;
        if(this.tipo_seleccionado=="Cobro"){
          
          this.abonoService.guardarAbonosCobros(ui_cobrador,this.formpago.cliente,this.formpago).then( (response) =>  {
          let saldo_actual=  localStorage.getItem("saldo_zona");
          let saldo_valor=   this.formpago.valor;
          let descuentosaldozona=Number(saldo_actual)+Number(saldo_valor);
          localStorage.setItem("saldo_zona", descuentosaldozona);
          this.balance_zona= localStorage.getItem("saldo_zona");
          this.updateValor();
          this.formpago.valor=0
          this.cliente_seleccionado='';
          self.$f7.dialog.close();
        this.$f7router.back()
       });
        }
        else{
          let calculo_pagos=0;

          if(this.planseleccionado=="15"){
          calculo_pagos=((this.tazaseleccionada/100)*this.formpago.valor)/(1-Math.round(Math.pow((1+this.tazaseleccionada/100),-this.planseleccionado),6));
          }else{
          calculo_pagos=((this.tazaseleccionada/100)*this.formpago.valor)/(1-Math.round(Math.pow((1+this.tazaseleccionada/100),-this.planseleccionado),6));
          }
          let rd=(1-(1+this.tazaseleccionada/100));
          let multi=this.tazaseleccionada/100;
          let sd=Math.pow(rd,-this.planseleccionado);
          let ope=multi/sd;
          let end=multi*this.formpago.valor/sd
          // console.log(calculo_pagos);
          console.log(rd);
          console.log(Math.round(this.tazaseleccionada/100,3));
          console.log(Math.round(ope));
           this.abonoService.guardarAbonosCobros(ui_cobrador,this.formpago.cliente,this.formpago).then( (response) =>  {
          let saldo_actual=  localStorage.getItem("saldo_zona");
          let saldo_valor=   this.formpago.valor;
          let descuentosaldozona=Number(saldo_actual)-Number(saldo_valor);
          localStorage.setItem("saldo_zona", descuentosaldozona);
          this.balance_zona= localStorage.getItem("saldo_zona");
          this.updateValor();
           this.formpago.valor=0;
           this.cliente_seleccionado='';
           self.$f7.dialog.close();
        this.$f7router.back()
       });
        }
       
      }
    }
  }
}
</script>