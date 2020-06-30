<template>
 <f7-page name="Clientes">
    <f7-navbar :sliding="false">
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Clientes</f7-nav-title>
       <f7-subnavbar :inner="false">
      <f7-searchbar
        search-container=".search-list"
        search-in=".item-title"
        :disable-button="!$theme.aurora"
         placeholder="Buscar..."
      ></f7-searchbar>
    </f7-subnavbar>
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
    
  </f7-row>
</f7-block>

<div v-if="clientes">
        <f7-list sortable @sortable:sort="onSort">
        <f7-list-item  v-for="(cliente,index,key) in clientes"  :id=cliente.id :key=cliente.id :title="key"  :link="`/cliente_detalles/${cliente.id}/`">{{cliente.data.usuario.nombre}}</f7-list-item>
        </f7-list>
      </div>
      <div v-else>
       <f7-row no-gap>
    
    <f7-col width="10">
    </f7-col> 
        <f7-col width="10">
            <f7-preloader></f7-preloader>
    </f7-col> 
        <f7-col width="10">
    </f7-col> 
       </f7-row>  
      
</div>
  <f7-block>
 <f7-row>
    
    <f7-col>
      
        <f7-button  sortable-toggle=".sortable" fill large small color="blue" @click="txt_ordenar=!txt_ordenar" :text="txt_ordenar?'LISTO':'ORDENAR'"></f7-button>
    </f7-col>
  
  </f7-row>
    </f7-block>
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