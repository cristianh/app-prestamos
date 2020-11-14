<template>
    <f7-page name="Gastos">
    <f7-navbar :sliding="false">
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Registrar gasto</f7-nav-title>
     <!-- <f7-nav-right>
        <f7-link  tooltip="Nuevo cliente" size="21px" href="/cliente_nuevo/" color="green" icon-ios="f7:person_add_alt_1" icon-aurora="f7:person_add_alt_1" icon-md="material:person_add_alt_1" ></f7-link>
        <f7-link  tooltip="Filtro" popover-open=".popover-menu-filter" size="21px" color="green" icon-ios="f7:filter_list" icon-aurora="f7:filter_list" icon-md="material:filter_list" ></f7-link>
        <!-- <f7-button fill  popover-open=".popover-menu" class="boton-no-pago"  color="red">No PAGO</f7-button> -->
      <!-- </f7-nav-right> -->
    </f7-navbar>
<f7-block-title>Fomulario</f7-block-title>
<!-- {{historico_gastos}} -->
    <f7-list no-hairlines-md inset>
        
        <f7-list-input
        @input:empty="onMensaje"
        outline
        floating-label
        label="Valor"
        type="text"
        placeholder="valor"
        
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
        @input:empty="onMensaje"
        outline
        floating-label
        label="Descripcion"
        type="textarea"
        placeholder="descripcion"
        
        validate
        :value=form.descripcion
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

    

<f7-list accordion-list inset>
  <f7-list-item accordion-item title="Historial gastos">
    <f7-accordion-content>
      <div  v-if="historico_gastos.length>=1">
    <f7-list media-list >
  <f7-list-item
    v-for="(gastos,index,key) in historico_gastos"
    :id=gastos.id
    :title="`${gastos.descripcion}`"
    :subtitle=" `Valor: $ ${gastos.valor_gasto}`"
    :text="`Fecha: ${gastos.fecha_creacion}`" 
  >
    <img slot="media" :src="gastos.img_src" width="80" />
  </f7-list-item>
    </f7-list>
      </div>
       <div v-else>
            <f7-block>
                <f7-card
                title="Aun no se han realizado gastos."
                >
                </f7-card>
                
            </f7-block>
        </div>
    </f7-accordion-content>
  </f7-list-item>
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
                fecha_creacion:new Date().toISOString().slice(0,10),
                img_src:'https://via.placeholder.com/150/C0BEBE/808080C/O%20https://placeholder.com/'
            },
            
            datastorage:'',
            validar_campos:false,
            cobradorservice:null,
            historico_gastos:[],
            balance_zona:''
        }
    },
    beforeMount() {

        

         let localstoragedata=localStorage.getItem('datainfologin')
      if(localstoragedata==null){
        this.$store.watch(() => this.$store.getters.getDatasStorage, datainfo => { 
        console.log("datastores",this.$store.getters.getDatasStorage)
        // console.log('watched: ', EstadosgastosGuardados) 
       this.datastorage=datainfo
      //console.log("datastores",this.data_store)
      //this.idad=this.datastorage.iad
       
      })
      }else{
      
      this.datastorage=JSON.parse(localstoragedata)
      console.log("datastores",this.datastorage)
      //this.idad=this.datastorage.iad
      }

      this.cobradorservice.getAllGastoCobrador(this.datastorage.iad,this.datastorage.empresa,this.datastorage.uid).then((resp)=>{
            console.log("repo",resp);
            if(!resp.data=="Not Found"){
              this.historico_gastos=resp.data
            }
            
            
        }).catch((error)=>{
                if(this.$store.getters.getModoDebugger){
                  this.$store.commit('setErrorServices',error)
                  this.$f7.dialog.alert('Ha ocurrido un error, por favor verifique el menu debug','Atencion!')
                   console.log(error);
                 }
        });
    },
    created() {
        this.cobradorservice=new CobradorService()
    },
    methods: {
    updateValor(){
       let zona= localStorage.getItem("zona");
       let empresa= this.datastorage.empresa

              // Get a new write batch
        var batch = db.batch();

        // Update the population of 'SF'
        var sfRef = db.collection("usuarios").doc(this.datastorage.iad).collection("empresas").doc(empresa).collection('Zonas').doc(zona);
        batch.update(sfRef, {"balance": this.balance_zona});



        // Commit the batch
        batch.commit().then(function () {
            // ...
          
        });
    },
    onValidatedInput(isValid){
      this.validar_campos=!isValid
     },
    onMensaje(){
    // alert('campo vacio')
    },
    onDescuentaSaldoZona(){
       
       let saldo_actual=  localStorage.getItem("saldo_zona");
       let descuentosaldozona=Number(saldo_actual)-Number(this.form.valor_gasto.replace('.',''));
       console.log(descuentosaldozona)
      //  console.log()
       localStorage.setItem("saldo_zona", descuentosaldozona);
       this.$store.commit('setBalanceZona',Number(descuentosaldozona));
       this.$store.commit('setbalance_finalJornada',Number(descuentosaldozona));
       this.balance_zona= localStorage.getItem("saldo_zona");
       this.updateValor()
       
    },
    onGuardarGasto(){
        this.$f7.dialog.preloader('Guardando gasto...');
        console.log("datos:",this.datastorage.iad,this.datastorage.empresa,this.datastorage.uid);
        this.cobradorservice.guardarGastoCobrador(this.datastorage.iad,this.datastorage.empresa,this.datastorage.uid,this.form).then((resp)=>{
        console.log(resp);
        this.$f7.dialog.alert('Gasto guardado','Atencion!')
        this.$f7.dialog.close();
        this.historico_gastos.push(this.form)
        this.onDescuentaSaldoZona()
           

            this.form={
                valor_gasto:'',
                descripcion:'',
                fecha_creacion:new Date().toISOString().slice(0,10),
                img_src:'https://via.placeholder.com/150/C0BEBE/808080C/O%20https://placeholder.com/'
            }

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