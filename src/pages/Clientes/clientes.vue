<template>
 <f7-page name="Clientes">
    <f7-navbar :sliding="false">
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Clientes</f7-nav-title>
       <f7-nav-right>
      <f7-link class="searchbar-enable" data-searchbar=".searchbar-demo" icon-ios="f7:search" icon-aurora="f7:search" icon-md="material:search"></f7-link>
    </f7-nav-right>
       <!-- <f7-subnavbar :inner="false">
        
      <f7-searchbar
        search-container=".search-list"
        search-in=".item-subtitle"
        :disable-button="!$theme.aurora"
         placeholder="Buscar por cedula..."
      ></f7-searchbar>
     
    </f7-subnavbar> -->
      <f7-searchbar
      expandable
      class="searchbar-demo"
      search-container=".search-list"
      search-in=".item-subtitle"
      :disable-button="!$theme.aurora"
      placeholder="Buscar por cedula..."
    ></f7-searchbar>
      <!-- <f7-nav-title-large>Clientes</f7-nav-title-large> -->
    </f7-navbar>
    <!-- <f7-navbar title="Clientes" back-link="Atras">
      
    </f7-navbar> -->
       <!-- <f7-nav-right>
       
      </f7-nav-right> -->
    <f7-block>
      <!-- <pre>{{$store.getters.getContador}}</pre> -->
      <!-- <pre>{{$store.getters.getClientes}}</pre> -->
      <!-- <pre>{{$store.getters.getContadorClientes}}</pre> -->
      
  <f7-row>
   
    <f7-col>
        <!-- {{[0]}} -->
      <f7-button fill large small href="/cliente_nuevo/" color="green">NUEVO CLIENTE</f7-button>
    </f7-col>
     <f7-col>
      
        <f7-button  sortable-toggle=".sortable" fill large small color="blue" @click="txt_ordenar=!txt_ordenar" :text="txt_ordenar?'LISTO':'ORDENAR'"></f7-button>
    </f7-col>
    
  </f7-row>
</f7-block>

<div v-if="clientes!=null || clientes.length!=0">
  <f7-list class="searchbar-not-found">
    <f7-list-item title="Cliente no encontrado."></f7-list-item>
  </f7-list>
        <f7-list class="search-list searchbar-found" sortable @sortable:sort="onSort">
          <!-- :link="`/cliente_detalles/${cliente.id}/`" -->
        <f7-list-item media-list footer="Click para más informacion"  :subtitle="`Cedula: ${cliente.data.usuario.identificacion}`"  v-for="(cliente,index,key) in clientes"  :id=cliente.id :key=cliente.id  :text="cliente.data.usuario.direccion1==''?cliente.data.usuario.direccion2:cliente.data.usuario.direccion1" :title="`${cliente.data.usuario.nombre} ${cliente.data.usuario.apellido}`"  :link="`/cliente_detalles/${cliente.id}/`" :badge="cliente.nuevo?'nuevo':''" :badge-color="cliente.nuevo?'green':''"> <f7-link  style="font-size:14px" external  :href="`tel:${cliente.data.usuario.telefono}`"><f7-icon material="settings_phone"></f7-icon>{{cliente.data.usuario.telefono}}</f7-link></f7-list-item>
        </f7-list>
      </div>
      <div v-else>
       <f7-block>
         No hay clientes
       </f7-block> 
      
</div>

 </f7-page>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            clientes:[],
            isLoadUsers:false,
            txt_ordenar:false
        }
    },
    methods: {
      onSort(data) {
        // Sort data
        console.log(data);
      }
    },
    watch: {
    UploadClientes(newValue,oldvalue){
      this.clientes=this.$store.getters.getClientes;
    }
  },
    beforeCreate() {
    
    },
    beforeMount(){
      this.clientes=this.$store.getters.getClientes;
      console.log(this.clientes);
    }
}
</script>