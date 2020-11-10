<template>
    <f7-page name="Gastos">
    <f7-navbar :sliding="false">
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Modificar Abono</f7-nav-title>
     <!-- <f7-nav-right>
        <f7-link  tooltip="Nuevo cliente" size="21px" href="/cliente_nuevo/" color="green" icon-ios="f7:person_add_alt_1" icon-aurora="f7:person_add_alt_1" icon-md="material:person_add_alt_1" ></f7-link>
        <f7-link  tooltip="Filtro" popover-open=".popover-menu-filter" size="21px" color="green" icon-ios="f7:filter_list" icon-aurora="f7:filter_list" icon-md="material:filter_list" ></f7-link>
        <!-- <f7-button fill  popover-open=".popover-menu" class="boton-no-pago"  color="red">No PAGO</f7-button> -->
      <!-- </f7-nav-right> -->
    </f7-navbar>
<f7-block-title>Fomulario</f7-block-title>
{{datastorage}}
    <f7-list no-hairlines-md inset>
        
        <f7-list-input
        outline
        floating-label
        label="Valor"
        type="text"
        placeholder="valor"
        required
        validate
        pattern="[0-9.\s]+"
        error-message="Solo numeros"
        :value=form.valor_gasto
        @input="form.valor_gasto=$event.target.value"
        :onValidate=onValidatedInput
         v-currency="{
          locale: 'de-DE',
          currency: null,
          valueAsInteger: true,
          distractionFree: false,
          precision:0,
          autoDecimalMode: true,
          valueRange: { min: 0 },
          allowNegative: false
        }"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Descripcion"
        type="textarea"
        placeholder="descripcion"
        required
        validate
        pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+"
        error-message="Solo letras"
        @input="form.descripcion=$event.target.value"
        :onValidate=onValidatedInput
      ></f7-list-input>
       <f7-list-input
        outline
        floating-label
        type="date"
        :value="form.fecha_creacion"
        @input="form.fecha_creacion=$event.target.value"
        disabled
      ></f7-list-input>
            <f7-row>
    
    <f7-col>
        
      <f7-button fill large small :disabled="validar_campos" @click="onGuardarGasto" color="green">GUARDAR</f7-button>
          
    </f7-col>
  
  </f7-row>
    </f7-list>

</f7-page>
</template>

<script>
import CobradorService from '../Services/CobradoresServices.js';
export default {
    data() {
        return {
            form:{
                valor_gasto:'',
                descripcion:'',
                fecha_creacion:new Date().toISOString().slice(0,10)
            },
            datastorage:'',
            validar_campos:false,
            cobradorservice:null
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
    created() {
        this.cobradorservice=new CobradorService()
    },
    methods: {
    onValidatedInput(isValid){
      this.validar_campos=!isValid
     },
    onGuardarGasto(){
        this.$f7.dialog.preloader('Guardando gasto...');
        console.log("datos:",this.datastorage.iad,this.datastorage.empresa,this.datastorage.uid);
        this.cobradorservice.guardarGastoCobrador(this.datastorage.iad,this.datastorage.empresa,this.datastorage.uid,this.form).then((resp)=>{
            console.log(resp);
            this.$f7.dialog.alert('Gasto guardado','Atencion!')
            this.$f7.dialog.close();
        }).catch((error)=>{
                if(this.$store.getters.getModoDebugger){
                  this.$store.commit('setErrorServices',error)
                  this.$f7.dialog.alert('Ha ocurrido un error, por favor verifique el menu debug','Atencion!')
                   console.log(error);
                 }
        });
    }
    },
}
</script>