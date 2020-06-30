<template>
<f7-page name="Setting">
  <f7-navbar   :sliding="false">
     <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
    <f7-nav-right>
      <f7-link class="searchbar-enable" data-searchbar=".searchbar-demo" icon-ios="f7:search" icon-aurora="f7:search" icon-md="material:search"></f7-link>
    </f7-nav-right>
    <f7-searchbar
      expandable
      class="searchbar-demo"
      search-container=".search-list"
      search-in=".item-subtitle"
      :disable-button="!$theme.aurora"
      placeholder="Buscar Cliente..."
    ></f7-searchbar>
     <!-- <f7-nav-title sliding>Abonos</f7-nav-title>
      <f7-nav-title-large>Abonos</f7-nav-title-large> -->
  </f7-navbar>

<f7-block  inset>
<f7-row>
  <f7-col>
    <f7-button fill sheet-open=".demo-sheet-swipe-to-step" @click="pago('Prestamo')">Prestamo <f7-icon material="swap_vert"></f7-icon></f7-button>
  </f7-col>
  <f7-col>
    <f7-button fill sheet-open=".demo-sheet-swipe-to-step" @click="pago('Cobro')">Cobro <f7-icon material="local_atm"></f7-icon></f7-button>
  </f7-col>
</f7-row>
</f7-block>
<f7-block-title >Clientes</f7-block-title>
<f7-card>
  <f7-card-content :padding="false">
  <f7-list class="searchbar-not-found">
    <f7-list-item title="Cliente no encontrado."></f7-list-item>
  </f7-list>
     <div > 
       <!-- :link="`/cliente_detalles/${cliente.id}/`" -->
        <f7-list media-list  v-if="clientes" class="search-list searchbar-found">
        <f7-list-item swipeout :subtitle="`Cedula: ${cliente.data.usuario.identificacion}`" v-for="(cliente,index,key) in clientes"  :id=cliente.id :key=cliente.id :title="`${cliente.data.usuario.nombre}-${cliente.data.usuario.apellido}`" >
        <f7-swipeout-actions left>
        <f7-swipeout-button overswipe color="green" @click="reply(cliente.id,cliente.data.usuario.nombre+cliente.data.usuario.apellido)">Seleccionar</f7-swipeout-button>
        </f7-swipeout-actions>
        </f7-list-item>
        </f7-list>
        <f7-list v-else class="search-list searchbar-found">
         <f7-list-item  :class="`skeleton-text skeleton-effect-${effect}`" media-item :subtitle="`Cedula: ${cliente.data.usuario.identificacion}`" v-for="(cliente,index,key) in clientes"  :id=cliente.id :key=cliente.id :title="`${cliente.data.usuario.nombre}-${cliente.data.usuario.apellido}`"  ></f7-list-item>
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
        <div class="display-flex padding justify-content-space-between align-items-center">
          <div style="font-size: 18px"><b>Total:</b></div>
          <div style="font-size: 22px"><b>$<span>{{formpago.valor==0?0:formpago.valor}}</span></b></div>
        </div>
        <div class="padding-horizontal padding-bottom">
          <f7-button large fill @click="confirmarPago" >CONFIRMAR</f7-button>
          <!-- <div class="margin-top text-align-center">Swipe up for more details</div> -->
        </div>
      </div>
      <!-- Rest of the sheet content that will opened with swipe -->
      <f7-block-title medium class="margin-top">Your order:</f7-block-title>
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
export default {
  data() {
    return {
      balance_zona:'',
      clientes:[],
      cliente_seleccionado:'',
      effect:'blink',
      tipo_seleccionado:'',
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
    console.log(this.clientes);
  },
  beforeCreate(){
      
    //  let ui_cobrador=localStorage.getItem("uid"); 
    //  this.clientes=[];
    //  this.clientes= this.$store.state.clientes;
    // let cl = this.$store.state.clientes;
     
    //      for (const key in cl) {
    //       if (cl.hasOwnProperty(key)) {
    //         const element = cl[key];
    //         console.log(element);
    //         this.clientes.push(element);
           
    //         ///this.clientes_nombres.push(element.data.usuario.nombre);
            
    //       }
    //     }
    //this.isLoadUsers= true;
    
    // const self = this;
    // self.$f7.dialog.preloader("Cargando informacion...");
    // axios.get(`https://us-central1-manifest-life-279516.cloudfunctions.net/Cobradores?doc=${ui_cobrador}&sub=Clientes`)
    // .then( response =>  {
        
    //     this.clientes=[];
    //     for (const key in response.data) {
    //       if (response.data.hasOwnProperty(key)) {
    //         const element = response.data[key];
    //         this.clientes.push(element);
           
    //         this.clientes_nombres.push(element.data.usuario.nombre);
            
    //       }
    //     }
    //    self.$f7.dialog.close();
    //     
    // }).catch(error => {
    //     console.log(error);
    // }); 
  
  },
  methods:{
    reply(id,nombrecompleto) {
        const app = this.$f7;
        // app.dialog.alert(id);
        app.dialog.confirm(nombrecompleto,'Confirmar usuario', () => {
          this.cliente_seleccionado=id;
          console.log(this.cliente_seleccionado);
          app.dialog.alert('Confirmado'+nombrecompleto+'!');
        });
      },
    pago(tipo_pago){
      this.tipo_seleccionado=tipo_pago;
      console.log(tipo_pago);
    },
    confirmarPago(){
      let ui_cobrador=localStorage.getItem("uid");
      if(this.cliente_seleccionado==='' || this.cliente_seleccionado==null){
         const app = this.$f7;
         app.dialog.alert('Debe seleccionar un Cliente!');
      }
      else{
        this.formpago.cliente=this.cliente_seleccionado;
        if(this.tipo_seleccionado=="Cobro"){
             axios.post(`https://us-central1-manifest-life-279516.cloudfunctions.net/CobradoresGuardarCobros?doc=${ui_cobrador}&sub=Cobros&subid=${this.formpago.cliente}`,this.formpago)
    .then( (response) =>  {
          console.log(response);
       });
        }
        else{
          axios.post(`https://us-central1-manifest-life-279516.cloudfunctions.net/CobradoresGuardarPrestamos?doc=${ui_cobrador}&sub=Prestamos&subid=${this.formpago.cliente}`,this.formpago)
    .then( (response) =>  {
          console.log(response);
       });
        }
       
      }
    }
  }
}
</script>