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
      
        <f7-button  sortable-toggle=".sortable" fill large small color="blue" @click="onCambiarMensajeOrdenar">{{mensaje_ordenar}}</f7-button>
    </f7-col>
    
  </f7-row>
</f7-block>

<div v-if="clientes.length!=0">
  <f7-list class="searchbar-not-found">
    <f7-list-item title="Cliente no encontrado."></f7-list-item>
  </f7-list>
        <f7-block>
        <f7-list class="search-list searchbar-found" sortable @sortable:sort="onSort">
          <!-- :link="`/cliente_detalles/${cliente.id}/`" -->
        <f7-list-item media-list footer="Click para más informacion"  :subtitle="`Cedula: ${cliente.data.usuario.identificacion}`"  v-for="(cliente,index,key) in getClientesLista"  :id=cliente.id :key=cliente.id  :text="cliente.data.usuario.direccion1==''?cliente.data.usuario.direccion2:cliente.data.usuario.direccion1" :title="`${cliente.data.usuario.nombre} ${cliente.data.usuario.apellido}`"  :link="`/cliente_detalles/${cliente.id}/`" :badge="cliente.nuevo?'nuevo':''" :badge-color="cliente.nuevo?'green':''"> <f7-link v-if="cliente.data.usuario.telefono" style="font-size:14px" external  :href="`tel:${cliente.data.usuario.telefono}`"><f7-icon material="settings_phone"></f7-icon>{{cliente.data.usuario.telefono}}</f7-link></f7-list-item>
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
 </f7-page>
</template>

<script>
import { WhatsApp } from 'vue-socialmedia-share';
import ClientesCobradoresService from '../Services/ClientesService.js';

// usage in local component


export default {
  components: {
    WhatsApp
  },
    data() {
        return {
            clientes:[],
            clientes_lista_ordenada:[],
            isLoadUsers:false,
            numero_clientes:0,
            txt_ordenar:false,
            mensaje_ordenar:'ORDENAR',
            posiciones_lista_ordenada:[],
            clientesservices:null
        }
    },
    methods: {
      onCambiarMensajeOrdenar(){
         this.txt_ordenar=!this.txt_ordenar
        
       if(this.txt_ordenar){
        
        this.mensaje_ordenar='LISTO';
             
      }else{
        console.log('2');
      
        this.mensaje_ordenar='ORDENAR';
      }
      },
      onSort(data) {
         let ui_cobrador=localStorage.getItem("uid");
          this.$f7.dialog.preloader('Guardando lista...');
        let distancia=data.to-data.from;
        
         if(distancia==1){
               // https://us-central1-manifest-life-279516.cloudfunctions.net/actualizarPosicionClienteLista?doc=zEAF3BMDDj9IXGwYOBXO&subdoc=Js46FGqf1w9yvPhjKeJ9
        this.clientesservices.actualizarPosicionCliente(ui_cobrador,this.clientes[data.to].id,{posicion_inicial:Number(data.from)}).then(()=>{     
           this.clientesservices.actualizarPosicionCliente(ui_cobrador,this.clientes[data.from].id,{posicion_inicial:Number(data.to)}).then(()=>{
                this.$f7.dialog.close();
           })
        });
         }else{
               // https://us-central1-manifest-life-279516.cloudfunctions.net/actualizarPosicionClienteLista?doc=zEAF3BMDDj9IXGwYOBXO&subdoc=Js46FGqf1w9yvPhjKeJ9
        this.clientesservices.actualizarPosicionCliente(ui_cobrador,this.clientes[data.to].id,{posicion_inicial:Number(data.from)}).then(()=>{     
           this.clientesservices.actualizarPosicionCliente(ui_cobrador,this.clientes[data.from].id,{posicion_inicial:Number(data.to)-1}).then(()=>{
                this.$f7.dialog.close();
           })
        });
         }
          
      
        

        //  Promise.all([updateposicion1, updateposicion2]).then(()=> {
            
        //  });

  
        // Sort data   
        let elemento1=this.clientes[data.to];
        let elemento2=this.clientes[data.from];

        let data_elements={
          elm:{
            id:data.el.id,
            el1:elemento2,
            el2:elemento1
          },
          data:data
        }
      
        this.$store.commit('SetPosicionListaClientes',data_elements);
              
    
      },
      getPosicionElemento(id_clientepass){
          return this.clientes.findIndex(x=>x.id==id_clientepass);
          // return this.clientes[1];
      },
      getElementoLista(id_clientepass){
          return this.clientes.filter(x=>x.id==id_clientepass);
          // return this.clientes[1];
      },
      getBuscarPosicionElementoInferior(posicion_find){
          return this.clientes.filter(x=>x.data.posicion==posicion_find);
          // return this.clientes[1];
      },
       getBuscarPosicionElementoSuperior(posicion_find){
          return this.clientes.filter(x=>x.data.posicion==posicion_find);
          // return this.clientes[1];
      }
    },
    watch: {
    UploadClientes(newValue,oldvalue){
      console.log(newValue);
      console.log(oldvalue);
      this.clientes=this.$store.getters.getClientes;
    }
  },
  created() {
    this.clientesservices =new ClientesCobradoresService();
  },
  computed: {
    getClientesLista(){
       return this.$store.getters.getOrdenarClientes
    }
   
  },
    beforeCreate() {
     
    },
    beforeMount(){
      // this.clientes=this.$store.getters.getClientes;
      //this.clientes_lista_ordenada=this.$store.getters.getOrdenarClientes
      this.clientes=this.$store.getters.getOrdenarClientes;
      this.numero_clientes=this.clientes.length;
         if(this.numero_clientes==1){
      this.isLoadUsers=true;
      }
      else{
      this.isLoadUsers=false;
      }
      
     
    }
}
</script>