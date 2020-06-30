<template>
 <f7-page name="Rutas">
    <f7-navbar :sliding="false">
      <f7-subnavbar :inner="false">
      <f7-searchbar
        search-container=".search-list"
        search-in=".item-title"
        :disable-button="!$theme.aurora"
         placeholder="Buscar..."
      ></f7-searchbar>
    </f7-subnavbar>
      <f7-nav-left>
     
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
       <f7-nav-title sliding>Rutas</f7-nav-title>
      <!-- <f7-nav-title-large>Rutas</f7-nav-title-large> -->
    </f7-navbar>
    <!-- <f7-navbar title="Clientes" back-link="Atras">
      
    </f7-navbar> -->
       <!-- <f7-nav-right>
       
      </f7-nav-right> -->
    <f7-block>

  <f7-row>
    
    <f7-col>
        
       <f7-button  sortable-toggle=".sortable" fill large small color="green">NUEVA RUTA</f7-button>
    </f7-col>
    
  </f7-row>
</f7-block>
<div v-if="isLoadRutas">
        <f7-list sortable @sortable:sort="onSort">
        <f7-list-item  v-for="(ruta,index,key) in rutas"  :id=ruta.id :key=ruta.id :title="key" link="#">{{ruta.data.Nombre}}</f7-list-item>
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
 </f7-page>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            rutas:[],
            isLoadRutas:false
        }
    },
    methods: {
      onSort(data) {
        // Sort data
        console.log(data);
      }
    },
      beforeCreate(){
    // axios.get('https://us-central1-manifest-life-279516.cloudfunctions.net/Cobradores?doc=7ZPZBoPtG9q0Zn1GF84a&sub=Rutas')
    // .then( (response) =>  {
    //     this.rutas=response.data;
    //     console.log(response);
    //     this.isLoadRutas= true;
    // }).catch(error => {
    //     console.log(error);
    // }); 
}
}
</script>