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
  </f7-page>
</template>
<script>
  export default {
   data() {
       return {
            id :this.$f7route.params.id,
            clientes_info:[]
       }
   },
   filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
  },
    beforeCreate(){
         let ui_cobrador=localStorage.getItem("uid"); 
          axios.get(`https://us-central1-manifest-life-279516.cloudfunctions.net/CobradoresClientesBuscar?doc=${ui_cobrador}&sub=clientes&subdoc=${this.$f7route.params.id}`)
          .then( (response) =>  {
              this.clientes_info=response.data;
             
              this.isLoadUsers= true;
          }).catch(error => {
              console.log(error);
          }); 
  }
  };
</script>