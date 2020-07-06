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
        <!-- {{[0]}} -->
      <f7-button fill large small href="/ruta_nueva/" color="green">NUEVA RUTA</f7-button>
    </f7-col>
    <f7-col>
       <f7-button  sortable-toggle=".sortable" fill large small color="blue" @click="txt_ordenar=!txt_ordenar" :text="txt_ordenar?'LISTO':'ORDENAR'"></f7-button>
    </f7-col>  
  </f7-row>
</f7-block>

 <f7-list class="searchbar-not-found">
    <f7-list-item title="Ruta no encontrada."></f7-list-item>
  </f7-list>
<div v-if="clientes" class="search-list searchbar-found">
        <f7-list  sortable @sortable:sort="onSort">
        <f7-list-item v-for="(ruta,index,key) in rutas"  :id=ruta.id :key=key :title="ruta.data.nombre"  :link="`/ruta_clientes/${ruta.id}/${ruta.data.nombre}`" > 
      <!-- <select name="rutas" multiple>
        <option   @change="usuariosseleccionados" v-for="(cliente,index,key) in clientes" :id=cliente.id :key=key  :value="cliente.id" :link="`/cliente_detalles/${cliente.id}/`" >{{cliente.data.usuario.nombre}}</option>
      </select> -->
    </f7-list-item>

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
<!-- <f7-list>
  <f7-list-item title="Car" smart-select :smart-select-params="{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'Search car'}">
    <select name="car" multiple>
      <optgroup label="Japanese">
        <option value="honda" selected>Honda</option>
        <option value="lexus">Lexus</option>
        <option value="mazda">Mazda</option>
        <option value="nissan">Nissan</option>
        <option value="toyota">Toyota</option>
      </optgroup>
      <optgroup label="German">
        <option value="audi" selected>Audi</option>
        <option value="bmw">BMW</option>
        <option value="mercedes">Mercedes</option>
        <option value="vw">Volkswagen</option>
        <option value="volvo">Volvo</option>
      </optgroup>
      <optgroup label="American">
        <option value="cadillac">Cadillac</option>
        <option value="chrysler">Chrysler</option>
        <option value="dodge">Dodge</option>
        <option value="ford" selected>Ford</option>
      </optgroup>
    </select>
  </f7-list-item>
</f7-list> -->
 </f7-page>
</template>

<script>

import axios from 'axios';
export default {
    data() {
        return {
            rutas:[],
            isLoadRutas:false,
            clientes:[],
            txt_ordenar:false
        }
    },
     watch: {
    UploadZonas(newValue,oldvalue){
      this.rutas=this.$store.getters.getZonas;
    }
  },
    methods: {
      onSort(data) {
        // Sort data
        console.log(data);
      },
      seletectClientes(){
      
        console.log(smartSelectOptions);
      },
      usuariosseleccionados(){
        window.alert('cerro');
        // let element=$event.target.options;
        
        // for (let index = 0; index < element.length; index++) {
        //   const element = element[index];
        //   console.log(element);
        // }
       
        //this.usuarios_seleccionados.push(event.target.value);
      }
    },
      beforeCreate(){
        
        // var smartSelect = app.smartSelect.get('.smart-select-items');
        // console.log(smartSelect.get(""));
},
 beforeMount(){
      this.clientes=this.$store.getters.getClientes;
      this.rutas=this.$store.getters.getZonas;
    }
}
</script>

