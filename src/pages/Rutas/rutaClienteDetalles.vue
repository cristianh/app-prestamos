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
            datastorage:{},
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
  beforeMount() {
    let localstoragedata=localStorage.getItem('datainfologin')
      if(localstoragedata==null){
        this.$store.watch(() => this.$store.getters.getDatasStorage, datainfo => { 
        console.log("datastores",this.$store.getters.getDatasStorage)
        // console.log('watched: ', EstadosCobrosGuardados) 
       this.datastorage=datainfo
      //console.log("datastores",this.data_store)
      //this.idad=this.datastorage.iad
       
      })
      }else{
      
      this.datastorage=JSON.parse(localstoragedata)
      console.log("datastores",this.datastorage)
      //this.idad=this.datastorage.iad
      }
  },
    beforeCreate(){
         let ui_cobrador=this.datastorage.uid
          axios.get(`https://us-central1-manifest-life-279516.cloudfunctions.net/CobradoresClientesBuscar?doc=${ui_cobrador}&sub=clientes&subdoc=${this.$f7route.params.id}`)
          .then( (response) =>  {
              this.clientes_info=response.data;
             
              this.isLoadUsers= true;
          }).catch(error => {
                if(this.$store.getters.getModoDebugger){
                  this.$store.commit('setErrorServices',error)
                  this.$f7.dialog.alert('Ha ocurrido un error, por favor verifique el menu debug','Atencion!')
                   console.log(error);
                }
          }); 
  }
  };
</script>