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
        <f7-list-item swipeout  
        :footer="`${cliente.data.prestamos.length>0?'Valor del prestamo: '+cliente.data.prestamos[0].valor:'NA'}`" 
        v-for="(cliente,index,key) in getAllUsuario"  :subtitle="`Cedula: ${cliente.data.usuario.identificacion}`"   :id=cliente.id :key=cliente.id :title="`${cliente.data.usuario.nombre}-${cliente.data.usuario.apellido}`" >
        <f7-swipeout-actions right>
        <f7-swipeout-button close color="blue" @click="onSeleccionarCliente(cliente.id,cliente.data.usuario.nombre+cliente.data.usuario.apellido)">Prestamo</f7-swipeout-button>
        <!-- <f7-swipeout-button close color="red" @click="onCobroPendiente(cliente.data.usuario)">Pendiente</f7-swipeout-button> -->
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
        estado_pendiente_prestamo_ruta:false,
        saldo_pendiente:0,
        saldo_pago_dia:0
      }
      
    }
  },
  beforeUpdate(){
    
    
  },
  beforeMount(){
     
    
  },
  beforeCreate(){
   
    
     
  
  },
  computed: {
    getAllUsuario(){
       return this.$store.getters.getClientes;
    }
  },
  methods:{
   
  },
  destroyed() {
    console.log('distroy');
  },
}
</script>