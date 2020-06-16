<template>
 <f7-page name="catalog">
    <f7-navbar title="Clientes" back-link="Atras">
         <!-- <f7-nav-right>
       
      </f7-nav-right> -->
    </f7-navbar>
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
       <f7-row>
    
    <f7-col>
    </f7-col> 
        <f7-col sm>
            <f7-preloader></f7-preloader>
    </f7-col> 
        <f7-col>
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
    axios.get('https://us-central1-manifest-life-279516.cloudfunctions.net/Clientes?doc=todos')
    .then( (response) =>  {
        this.clientes=response.data;
        console.log(response);
        this.isLoadUsers= true;
    }).catch(error => {
        console.log(error);
    }); 
}
}
</script>