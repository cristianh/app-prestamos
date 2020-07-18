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
<f7-block  inset>
<f7-row>
  <!-- <f7-col>
    <f7-button fill  :disabled="cliente_seleccionado?false:true" @click="pago('Prestamo')">Prestamo <f7-icon material="swap_vert"></f7-icon></f7-button>
  </f7-col> -->
  <!-- <f7-col>
      
        <f7-button  sortable-toggle=".sortable_abono" fill  color="blue" @click="txt_ordenar=!txt_ordenar" :text="txt_ordenar?'LISTO':'ORDENAR'"></f7-button>
    </f7-col> -->
    <f7-col>
      
        <f7-button fill  color="blue" @click="onActualizarLista">Actualizar Lista</f7-button>
    </f7-col>
</f7-row>
</f7-block>
<f7-block-title >Clientes</f7-block-title>
  <f7-list class="searchbar-not-found">
    <f7-list-item title="Cliente no encontrado."></f7-list-item>
    <f7-row>
   
    <f7-col>
        <!-- {{[0]}} -->
      <f7-button fill large small href="/cliente_nuevo/" color="green">NUEVO CLIENTE</f7-button>
    </f7-col>
    </f7-row>
  </f7-list>
     <div v-if="clientes.length!=0" > 
       <!-- :link="`/cliente_detalles/${cliente.id}/`" -->
       <!-- :footer="`${valorPrestamoCliente[index]!=undefined? 'Valor prestamo '+valorPrestamoCliente[index]:'NA'}`" -->

<!-- :after="`${cliente.data.prestamos.length==0 || cliente.data.prestamos==undefined? 'NA':diasMoraClients[index]>=1?'Dias de mora: '+diasMoraClients[index]+' dias':'Dias de mora: '+diasMoraClients[index]+' dia'}`" -->

<f7-block>
       <f7-list  media-list class="search-list-abono searchbar-found sortable_abono"> 
        <f7-list-item swipeout  :footer="`${cliente.data.prestamos.length>0?'Valor del prestamo: '+cliente.data.prestamos[0].valor:'NA'}`" v-for="(cliente,index,key) in getAllUsuario"  :subtitle="`Cedula: ${cliente.data.usuario.identificacion}`"   :id=cliente.id :key=cliente.id :title="`${cliente.data.usuario.nombre}-${cliente.data.usuario.apellido}`" >
        <f7-swipeout-actions right>
        <f7-swipeout-button close color="blue" @click="onSeleccionarCliente(cliente.id,cliente.data.usuario.nombre+cliente.data.usuario.apellido)">Prestamo</f7-swipeout-button>
        <f7-swipeout-button close color="red" @click="onCobroPendiente(cliente.data.usuario)">Pendiente</f7-swipeout-button>
        </f7-swipeout-actions>
        </f7-list-item>
        </f7-list>
</f7-block>
      </div>
      <div v-else>
       <f7-block inset>
         <f7-card
         title=" No hay clientes">
           
         </f7-card>
        
       </f7-block> 
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
        :value="info_prestamo.valor"
        min=0
        placeholder="0"
        clear-button
        @input.capture="info_prestamo.valor=$event.target.value"
        ></f7-list-input>
            <f7-list-input
    label="Plan"
    type="select"
    defaultValue="15/15"
    placeholder="Seleccione..."
    @change="onSelectPlan"
    error-message="Por favor seleccione un plan."
    required
    validate
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
          :value="info_prestamo.fecha"
           @input="info_prestamo.fecha=$event.target.value"
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
          <div style="font-size: 22px"><b><span>{{info_prestamo.valor==0?0:info_prestamo.valor|currency}}</span></b></div>
        </div>
        <div class="padding-horizontal padding-bottom">
          <f7-button large fill @click="onConfirmarPago" >CONFIRMAR</f7-button>
          <!-- <div class="margin-top text-align-center">Swipe up for more details</div> -->
        </div>
      </div>
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
      total_prestado:0,
      numero_clientes:0,
      planseleccionado:'',
      tazaseleccionada:'',
      tazasdeinteres:[],
      abonoService:null,
      balance_zona:'',
      clientes:[],
      clientes_lista_ordendad:[],
      cliente_seleccionado:'',
      effect:'blink',
      tipo_seleccionado:'',
      txt_ordenar:false,
      isLoadUsers:true,
      info_prestamo:{
        valor:0,
        // fecha:this.$moment(new Date).format("DD/MM/YYYY"), 
        fecha:new Date().toISOString().slice(0,10), 
        cliente:'',
        total_apagar:0,
        plan_seleccionado:'',
        dias_plazo:'',
        dias_con_mora:0,
        estado_prestamo:false,
        saldo_pendiente:0,
        saldo_pago_dia:0
      }
      
    }
  },
  watch: {
    UploadClientes(newCliente,oldCliente){
      console.log(newCliente,oldCliente);
      this.clientes=newCliente;
    }
  },
  mounted() {
    // this.$store.watch(() => this.$store.getters.getClientes, cli => {
    //   console.log('watched: ', cli)
    //   this.clientes=cli;
    // })
  },
  beforeUpdate(){
    
    
  },
  beforeMount(){
    this.balance_zona=localStorage.getItem("saldo_zona");
    this.abonoService= new AbonoService();
    this.tazasdeinteres=this.$store.getters.getTazaseInteres;
    this.clientes=this.$store.getters.getClientes;
     this.numero_clientes=this.clientes.length;
      if(this.numero_clientes==1){
      this.isLoadUsers=true;
      }
      else{
      this.isLoadUsers=false;
      }    
    
  },
  beforeCreate(){
   
    
     
  
  },
  computed: {
    getAllUsuario(){
       return this.$store.getters.getClientes;
    }
  },
  methods:{
    onActualizarLista(){
      this.clientes=this.$store.getters.getClientes;
    },
    roundTo(value, places){
     var power = Math.pow(10, places);
     return Math.round(value * power) / power;
    },
    onSelectPlan($event){
      this.planseleccionado=$event.target.value.split("-")[0];
      this.tazaseleccionada=$event.target.value.split("-")[1];
    },
    updateBalanceValor(){
      
       let zona= localStorage.getItem("zona");
       let empresa= localStorage.getItem("empresa");

       // Get a new write batch
var batch = db.batch();

// Update the population of 'SF'
var sfRef = db.collection("empresas").doc(empresa).collection('Zonas').doc(zona);
batch.update(sfRef, {"balance": this.balance_zona});



// Commit the batch
batch.commit().then( ()=> {
    // ...
   
    
    //  this.info_prestamo.valor=0;
});
       
       

    },
    onCobroPendiente(usuario){
      this.$store.commit('cobroPendiente',usuario);
      console.log("Pendiente"+usuario);
    },
    onSeleccionarCliente(id,nombrecompleto) {
        const app = this.$f7;
        this.cliente_seleccionado=id;
        // app.dialog.alert(id);
        app.dialog.confirm('Confirmar usuario',nombrecompleto, () => {
          
           let elemento = this.clientes.findIndex(x=>x.id==id);
          // console.log(this.cliente_seleccionado);
           if(this.clientes[elemento].data.prestamos.length>0){
  // && this.clientes[elemento].data.prestamos.estado_prestamo!=true
            app.dialog.alert('No se puede realizar el prestamo, el cliente tiene un saldo por pagar.',nombrecompleto);
          }else{
          app.dialog.alert(nombrecompleto,'Confirmado!',()=>{
            this.$f7.sheet.open('.demo-sheet-swipe-to-step');
          });
          
          }
        });
      },
    pago(tipo_pago){
      this.tipo_seleccionado=tipo_pago;
    },
    onConfirmarPago(){

      if(this.cliente_seleccionado==='' || this.cliente_seleccionado==null){
         
         app.dialog.alert('Debe seleccionar un Cliente!');
      }
      else{
      
         //  valor preswtamo  "x"
          //  interes  i
          // plazo p
          // total a pagar = x*i+x

          // total a pagar / p 
          // 2 valor
          // fecha_hora
          // fecha_inicio
          let saldo_actual_zona=  localStorage.getItem("saldo_zona");
          if(Number(this.info_prestamo.valor)>saldo_actual_zona || saldo_actual_zona==0){
             const app = this.$f7;
        // app.dialog.alert(id);
        app.dialog.confirm('No se puede realizar el pretamo porque el saldo de la zona es inferio a la cantidad a prestar, revise el valor','Error...', () => {
          this.info_prestamo.valor=0;
        });
      }else{

            const self = this;
          const app = this.$f7;
          let ui_cobrador=localStorage.getItem("uid");
          self.$f7.dialog.preloader('Guardando pago...');
          this.info_prestamo.cliente=this.cliente_seleccionado;
       
      
          let valor_prestamo=this.info_prestamo.valor;
          let taza_seleccionada_interes= this.tazaseleccionada;
          let plazo_dias= this.planseleccionado;
          let total_apagar=Number(valor_prestamo)*Number(taza_seleccionada_interes)+Number(valor_prestamo);
          console.log( this.info_prestamo);
          let pago=Number(total_apagar)/Number(plazo_dias)
          console.log(pago);
          this.info_prestamo.total_apagar=total_apagar;
          console.log( this.info_prestamo);
          this.info_prestamo.plan_seleccionado=this.planseleccionado;
          this.info_prestamo.dias_plazo=Number(this.planseleccionado);

          this.abonoService.guardarAbonosPrestamos(ui_cobrador,this.info_prestamo.cliente,this.info_prestamo).then( (response) =>  {
          let saldo_actual=  localStorage.getItem("saldo_zona");
          let saldo_valor=   this.info_prestamo.valor;
          let descuentosaldozona=Number(saldo_actual)-Number(saldo_valor);
          localStorage.setItem("saldo_zona", descuentosaldozona);
          this.balance_zona= localStorage.getItem("saldo_zona");
          this.$store.commit('setBalanceZona',Number(descuentosaldozona));
          this.total_prestado=Number(this.total_prestado)+Number(this.info_prestamo.valor)
          localStorage.setItem("total_prestado",this.total_prestado);
          let elemento = this.clientes.findIndex(x=>x.id==this.cliente_seleccionado);
          this.clientes[elemento].data.prestamos.push(this.info_prestamo);
          
          this.updateBalanceValor();
          //  this.info_prestamo.valor=0;
          // this.cliente_seleccionado='';
          self.$f7.dialog.close();
          this.$f7.sheet.close();
          this.info_prestamo.plan_seleccionado='';
          this.$f7router.back();
          
       });
      }

      }
    }
  },
  destroyed() {
    console.log('distroy');
  },
}
</script>