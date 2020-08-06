<template>
  <f7-page name="ClientesDetalles">
    <f7-navbar title="Usuario" back-link="Back"></f7-navbar>
    <f7-block-title>Usuario id: {{id}}</f7-block-title>
    <f7-card>
    </f7-card>
  
    <f7-block strong>
      <f7-block-title >Usuario</f7-block-title>
      <f7-list>
      <f7-list-item v-for="(usuario,index,keyus) of clientes_info.usuario" :id="index" :key="keyus">
        <span>{{index | capitalize}}:</span>{{usuario}}
      </f7-list-item>
      </f7-list>
    </f7-block>
    <f7-block strong >
       <f7-block-title >Negocio</f7-block-title>
       <f7-list>
      <f7-list-item  v-for="(negocio,index,keyne) in clientes_info.negocio" :id="index" :key="keyne">
        <span>{{index | capitalize}}:</span>{{negocio}}
      </f7-list-item>
      </f7-list>
    </f7-block>
    <f7-block strong>
      <f7-block-title>Codeudor</f7-block-title>
      <f7-list>
       <f7-list-item   v-for="(codeudor,index,keycod) in clientes_info.codeudor" :id="index" :key="keycod">
         <span>{{index | capitalize}}:</span>{{codeudor}}
      </f7-list-item>
      </f7-list>
    </f7-block>
    
    <f7-block strong>
      <f7-block-title>Prestamo</f7-block-title>
      <f7-list>
       <f7-list-item   v-for="(prestamos,index,keycod) in clientes_info.prestamos" :id="index" :key="keycod">
        <div v-if="clientes_info.prestamos.dias_plazo!=''">
        <span> Dias de plazo: </span>{{prestamos.dias_plazo}}<br>
         <span>Fecha del prestamo: </span>{{prestamos.fecha}}<br>
         <span>Valor del prestamo: </span>{{prestamos.valor}}<br>
         <span>Total a pagar: </span>{{prestamos.total_apagar}}<br>
         <span>Plan seleccionado: </span>{{prestamos.plan_seleccionado}}<br>
        </div>
        <div v-else>
     No tiene prestamos
    </div>      
      </f7-list-item>
      </f7-list>
    </f7-block>
  </f7-page>
</template>
<script>
import CobradorService from '../Services/CobradoresServices.js';
  export default {
   data() {
       return {
            idad:'',
            id :this.$f7route.params.id,
            clientes_info:[],
            cobradorservice:null
       }
   },
   filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
  },
  beforeMount() {
    this.idad=localStorage.getItem("iad");
     let ui_cobrador=localStorage.getItem("uid"); 
     let id_empresa=localStorage.getItem("empresa"); 
     this.$f7.dialog.preloader("Buscando Informacion...");
          this.cobradoresService.getCobradoresClientesBuscar(this.idad,id_empresa,ui_cobrador,this.$f7route.params.id).then( (response) =>  {
              this.clientes_info=response.data;
              
              this.isLoadUsers= true;
              this.$f7.dialog.close();
          }).catch(error => {
              console.log(error);
          }); 
  },
    beforeCreate(){
      this.cobradoresService= new CobradorService();
     let posicion=this.$store.getters.getClientes.findIndex(x => {x.hasOwnProperty('nuevo')? x.nuevo === true:x});
     if(posicion>0){
       this.$store.commit('getSetNuevoClientes',posicion);
     }
  }
  };
</script>