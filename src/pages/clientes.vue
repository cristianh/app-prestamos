<template>
 <f7-page name="Clientes">
    <f7-navbar large :sliding="false">
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Clientes</f7-nav-title>
      <f7-nav-title-large>Clientes</f7-nav-title-large>
    </f7-navbar>
    <!-- <f7-navbar title="Clientes" back-link="Atras">
      
    </f7-navbar> -->
       <!-- <f7-nav-right>
       
      </f7-nav-right> -->
    <f7-block>

  <f7-row>
    
    <f7-col>
        
      <f7-button fill large small href="/cliente_nuevo/" color="green">NUEVO CLIENTE</f7-button>
    </f7-col>
    
  </f7-row>
</f7-block>
<div v-if="isLoadUsers">
        <f7-list sortable @sortable:sort="onSort">
        <f7-list-item  v-for="(cliente,index,key) in clientes"  :id=cliente.id :key=cliente.id :title="key" link="#">{{cliente.data.Nombre}}</f7-list-item>
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
      
        <f7-button  sortable-toggle=".sortable" fill large small color="green">ORDENAR</f7-button>
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
            isLoadUsers:false
        }
    },
    methods: {
      onSort(data) {
        // Sort data
        console.log(data);
      }
    },
    beforeCreate(){
    axios.get('https://us-central1-manifest-life-279516.cloudfunctions.net/Cobradores?doc=7ZPZBoPtG9q0Zn1GF84a&sub=Clientes')
    .then( (response) =>  {
        this.clientes=response.data;
        console.log("datossss...",response);
        this.isLoadUsers= true;
    }).catch(error => {
        console.log(error);
    }); 
}
}
</script>