<template>
  <f7-page name="Transacion">
    
    <f7-navbar>
       <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Nueva Transacion</f7-nav-title>
       <f7-subnavbar >
      <f7-segmented sliding raised>
        <f7-button tab-link="#Enviar" tab-link-active>Enviar</f7-button>
        <!-- <f7-button tab-link="#Recibir">Recibir</f7-button> -->
      </f7-segmented>
    </f7-subnavbar>
    </f7-navbar>
    <f7-tabs>
    <f7-tab id="Enviar" tab-active >
    <f7-list no-hairlines-md inset>
        <f7-list-input
        outline
        floating-label
        label="Id Cobrador"
        type="text"
        placeholder="Id cobrador a enviar"
        @input="form_transaccion.idCobrador_recibe=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Mensaje"
        type="textarea"
        placeholder="mensaje"
        @input="form_transaccion.mensaje=$event.target.value"
      ></f7-list-input>

       <f7-list-input
        outline
        floating-label
        label="Valor"
        type="text"
        placeholder="valor de la transaccion"
        @input="form_transaccion.valor=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        type="date"
        :value="form_transaccion.fecha"
        @input="form_transaccion.fecha=$event.target.value"
        disabled
      ></f7-list-input>  
    </f7-list>
          <f7-block>

  <f7-row>
    
    <f7-col>
      <f7-button fill large small @click="onGuardarTransaccion" color="green">REALIZAR TRANSACION</f7-button>
          
    </f7-col>
    
  </f7-row>
 
</f7-block>
    </f7-tab>
    </f7-tabs>
  </f7-page>
</template>

<script>

export default {
    data() {
        return {
          datos_transferencia:{},
          clientes:[],
            form_transaccion:{
              idCobrador_recibe:'',
              nombreCobradorEnvia:'',
              idCobrador_envia:'',  
              valor:'',
              estado_transaccion:true,
              fecha:new Date().toISOString().slice(0,10),
              hora: this.$moment(new Date()).format("hh:mm:ss"),
              mensaje:''
            }
        }
    },
    beforeMount(){
      // this.clientes=this.$store.getters.getClientes;
      //this.clientes_lista_ordenada=this.$store.getters.getOrdenarClientes
      this.clientes=this.$store.getters.getOrdenarClientes;
    },
    computed:{
      getDatosTransferencia(){
        return this.$store.getters.getDatosTransferencia;
      }
    },
    methods: {
       onBuscarCobrador(idCobrador){
          let cliente= this.clientes.filter(x=>x.id==idCobrador);
          return cliente;
      },
      onGuardarTransaccion() {
        // Sort data
        this.form_transaccion.idCobrador_envia=localStorage.getItem('uid');
        this.form_transaccion.nombreCobradorEnvia=localStorage.getItem('name');
        
      
      this.$f7.dialog.confirm('Desea realizar la transaccion','Seguro!', () => {
        this.$f7.dialog.preloader('Guardando...');
      db.collection("cobradores").doc(this.form_transaccion.idCobrador_recibe).collection("Transferencias").doc('nueva_transaccion').set(this.form_transaccion)
    .then(() =>{
        console.log("Document successfully written!");
        this.$f7.dialog.close();
    })
    .catch((error)=> {
        console.error("Error writing document: ", error);
    });
      });
     
    
  },
   onAceptarTransaccion() {
   }
}
}
</script>

<style lang="less">
.demo-facebook-name{
    margin-left: 4px;
    font-size: 13px;
    color: #8e8e93;
}
  
</style>