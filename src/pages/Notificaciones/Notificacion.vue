<template>
  <f7-page name="Transacion">
    
    <f7-navbar>
       <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Notificacion</f7-nav-title>
    </f7-navbar>
      
       <div v-for="(transferencia,index,key) in getDatosTransferencia" :key="key">
       <f7-card>
  <f7-card-header class="title-card-text">
  <div>Nueva transferencia</div>
  </f7-card-header>
  <f7-card-content>
    
    <f7-row>
      <f7-col style="text-align:center">
        <span><b>Envia:</b><br> {{transferencia.nombreCobradorEnvia}}</span>
        
      </f7-col>
      <f7-col style="text-align:center">
         <span><b>Mensaje:</b><br>{{transferencia.mensaje}}</span>
      </f7-col>
    </f7-row>
     
   
  </f7-card-content>
  <f7-card-footer>
    
    <div class="demo-facebook-name">Fecha y hora:<br> {{transferencia.fecha}} {{transferencia.hora}}</div>
    <div class="demo-facebook-name">Valor:<br> {{transferencia.valor}}</div>
    <!-- <f7-link>Id cobrador: </f7-link>
    <f7-link>Valor: </f7-link> -->
  </f7-card-footer>
</f7-card>
  <f7-block>

  <f7-row>
    
    <f7-col >
      <f7-button fill large small @click="onAceptarTransaccion(transferencia.valor)" color="green">ACEPTAR</f7-button>
          
    </f7-col>
    
  </f7-row>
 
</f7-block>
  </div>
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
   onAceptarTransaccion(valor_transaccion) {
     let balance_actual_zona=this.$store.getters.getBalance;
     let nuevo_balance_zona=Number(balance_actual_zona)+Number(valor_transaccion);
     this.$store.commit('setBalanceZona',nuevo_balance_zona);
     this.$f7.dialog.alert('Nuevo saldo '+nuevo_balance_zona,'Saldo actualizado!',()=>{
              // this.identificacion=''
      });
   }
}
}
</script>

<style lang="less">
.span{
  font-weight:normal ;
}
.demo-facebook-name{
    margin-left: 4px;
    font-size: 13px;
    color: #8e8e93;
    text-align: center;
}

.title-card-text{
  text-align: center;
}
  
</style>