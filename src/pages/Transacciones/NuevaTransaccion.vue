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
    label="Enviar a:"
    type="select"
    defaultValue="15/15"
    placeholder="Seleccione..."
    @change="onSelectPlan"
    error-message="Por favor seleccione un plan."
    required
    validate
  >
   <option value="0">Seleccione</option>
  <option  value="empresa">Empresa</option>
   <option  value="zona">Zona</option>
       </f7-list-input>
        <f7-list-input
        outline
        floating-label
        label="Id"
        type="text"
        :value="form_transaccion.idCobrador_recibe"
        placeholder="Id a enviar"
        @input="form_transaccion.idCobrador_recibe=$event.target.value"
        :disabled="isHabilitadoInput"
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
      <f7-list accordion-list>
      <f7-list-item accordion-item title="Informacion personal">
    <f7-accordion-content>
            <f7-list>
       <f7-list-item title="Id Zona" :after="id_zona"><f7-icon ios="f7:room" aurora="f7:room" md="material:room"></f7-icon></f7-list-item>
   <!-- <f7-list-item title="Id Cobrador" :after="uid"><f7-icon ios="f7:person" aurora="f7:person" md="material:person"></f7-icon></f7-list-item> -->
   <f7-list-item title="Id Empresa" :after="id_empresa"><f7-icon ios="f7:business" aurora="f7:business" md="material:business"></f7-icon></f7-list-item>
  </f7-list>
    </f7-accordion-content>
  </f7-list-item>
      </f7-list>
      </f7-block>
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
          uid:'',
          id_zona:'',
          id_empresa:'',
          opcionseleccionada:'',
          isHabilitadoInput:'',
          datos_transferencia:{},
          clientes:[],
          form_transaccion:{
          idCobrador_recibe:'',
          nombreCobradorEnvia:'',
          idCobrador_envia:'',  
          valor:'',
          estado_transaccion:false,
          fecha:new Date().toISOString().slice(0,10),
          hora: this.$moment(new Date()).format("hh:mm:ss"),
          mensaje:''
          }
        }
    },
    beforeMount(){
      // this.clientes=this.$store.getters.getClientes;
      //this.clientes_lista_ordenada=this.$store.getters.getOrdenarClientes
      this.uid = localStorage.getItem("uid");
      this.id_empresa=localStorage.getItem("empresa");
      this.id_zona = localStorage.getItem("zona")
      this.clientes=this.$store.getters.getOrdenarClientes;
    },
    computed:{
      getDatosTransferencia(){
        return this.$store.getters.getDatosTransferencia;
      }
    },
    methods: {
    onSelectPlan($event){
      this.opcionseleccionada=$event.target.value;
      if(this.opcionseleccionada=="empresa"){
        this.isHabilitadoInput=true;
        this.form_transaccion.idCobrador_recibe=this.id_empresa;
      }else{
         this.isHabilitadoInput=false;
         this.form_transaccion.idCobrador_recibe='';
      }
      console.log(this.opcionseleccionada);
    },
       onBuscarCobrador(idCobrador){
          let cliente= this.clientes.filter(x=>x.id==idCobrador);
          return cliente;
      },
      onGuardarTransaccion() {
        // Sort data
         let balance_actual_zona=this.$store.getters.getBalance;
        if(Number(this.form_transaccion.valor)>Number(balance_actual_zona)){
          this.$f7.dialog.alert('No se puede realizar la transaccion, el monto de la transaccion es superior al saldo de la zona','Atencion!');
        } 
        else if(this.form_transaccion.valor==0 || this.form_transaccion.valor==''){
          this.$f7.dialog.alert('No se puede realizar la transaccion, debe ingresar un valor','Atencion!');
        }
        else if(balance_actual_zona==0){
            this.$f7.dialog.alert('No se puede realizar la transaccion, no hay saldo disponible de la zona','Atencion!');
        }else{
               this.form_transaccion.idCobrador_envia=localStorage.getItem('uid');
        this.form_transaccion.nombreCobradorEnvia=localStorage.getItem('name');
        
      
      this.$f7.dialog.confirm('Desea realizar la transaccion','Seguro!', () => {
        this.$f7.dialog.preloader('Guardando...');
      db.collection("empresas").doc(this.form_transaccion.idCobrador_recibe).collection("Transferencias").doc('nueva_transaccion').set(this.form_transaccion)
    .then(() =>{
        console.log("Document successfully written!");
     let nuevo_balance_zona=Number(balance_actual_zona)-Number(this.form_transaccion.valor);
     this.$store.commit('setBalanceZona',nuevo_balance_zona);
        this.$f7.dialog.close();
    })
    .catch((error)=> {
        console.error("Error writing document: ", error);
    });
      });
        } 
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