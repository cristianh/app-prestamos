<template>
  <f7-page name="Transacion">
    
    <f7-navbar>
       <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Nueva Transacion</f7-nav-title>
       <f7-subnavbar >
      <f7-segmented sliding raised>
        <f7-button tab-link="#Transferencias" tab-link-active>Transferencias</f7-button>
        <f7-button tab-link="#Pendientes" @click="onDetectarTrasccionesPendientes">Pendientes</f7-button>
      </f7-segmented>
    </f7-subnavbar>
    </f7-navbar>
    <f7-tabs>
    <f7-tab id="Transferencias" tab-active >
    <f7-list no-hairlines-md inset>
      <f7-list-input
    label="Enviar a:"
    type="select"
    defaultValue="Seleccione"
    placeholder="Seleccione"
    @change="onSelectPlan"
    error-message="Por favor seleccione un plan."
    required
    validate
  >
   <option value="0">Seleccione</option>
  <option v-for="(opciones,index,key) in opciones" :id=opciones.label :key="key" :selected="opcionresetseleccionada" :value="`${opciones.value}`">{{opciones.label}}</option>
       </f7-list-input>
            <f7-list-input
    v-show="select_zona_acive"
    label="Seleccione la zona:"
    type="select"
    defaultValue="Seleccione..."
    placeholder="Seleccione..."
    @change="onSelectZona"
    error-message="Por favor seleccione la zona."
    required
    validate
  >
   <option v-for="(zonas_empresa,index,key) in empresa_zonas" :id=zonas_empresa.label :key="key" :value="`${zonas_empresa.value}-${zonas_empresa.label}`">{{zonas_empresa.label}}</option>
       </f7-list-input>
        <f7-list-input
        v-if="false"
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
        :value=form_transaccion.mensaje
        @input="form_transaccion.mensaje=$event.target.value"
      ></f7-list-input>

       <f7-list-input
        outline
        floating-label
        label="Valor"
        type="text"
        :value=valor_sin_puntos
        placeholder="valor de la transaccion"
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
        @input="valor_sin_puntos=$event.target.value"
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
       <!-- <f7-block>
      <f7-list accordion-list>
      <f7-list-item accordion-item title="Informacion personal">
    <f7-accordion-content>
            <f7-list>
       <f7-list-item title="Id Zona" :after="id_zona"><f7-icon ios="f7:room" aurora="f7:room" md="material:room"></f7-icon></f7-list-item> -->
   <!-- <f7-list-item title="Id Cobrador" :after="uid"><f7-icon ios="f7:person" aurora="f7:person" md="material:person"></f7-icon></f7-list-item> -->
   <!-- <f7-list-item title="Id Empresa" :after="id_empresa"><f7-icon ios="f7:business" aurora="f7:business" md="material:business"></f7-icon></f7-list-item>
  </f7-list>
    </f7-accordion-content>
  </f7-list-item>
      </f7-list>
      </f7-block> -->
          <f7-block>

  <f7-row>
    
    <f7-col>
      <f7-button fill large small :disabled="estadobotonTransaccion" @click="onGuardarTransaccion" color="green">REALIZAR TRANSACION</f7-button>
          
    </f7-col>
    
  </f7-row>
 
</f7-block>
    </f7-tab>
    <!-- </f7-navbar> -->
    <f7-tab id="Pendientes">
      <!-- hola mundo -->
       <div>
         <div v-if="getDatosTransferenciaPendientes.length===0">
 
<f7-block inset>
         <f7-card
         title=" No hay transacciones">
           
         </f7-card>
        
       </f7-block> 


    
         </div>
         <div v-else>
            <f7-block> 
           <f7-list media-list>
             <!-- {{getDatosTransferenciaPendientes}} -->
             
             <f7-list-item
             v-for="(transferencia_pendiente,index,key) in getDatosTransferenciaPendientes" :key="key"
             :title="`Enviado a: ${transferencia_pendiente.nombre_zona_recibe}`"
             :text="`Enviado por: ${transferencia_pendiente.enviado_por}`"
             :subtitle="`Valor: ${Number(transferencia_pendiente.valor).toLocaleString('es-CO',{style: 'currency',currency: 'COP',minimumSignificantDigits:1})}`"
             :badge="onEstado_trasaccionTexto(transferencia_pendiente.estado_transaccion)" 
             :badge-color="onEstado_trasaccionColor(transferencia_pendiente.estado_transaccion)"
             :footer="`Fecha y hora: ${transferencia_pendiente.fecha}-${transferencia_pendiente.hora}`">
             </f7-list-item>
           </f7-list>
            </f7-block>
         </div>
  </div>
      
    </f7-tab>
    </f7-tabs>
  </f7-page>
</template>

<script>
import CobradorService from '../Services/CobradoresServices.js';
import TransaccionService from '../Services/TransaccionServices.js';
export default {
    data() {
        return {
          idad:'',
          uid:'',
          id_zona:'',
          id_empresa:'',
          balance_zona:0,
          opcionresetseleccionada:0,
          opcionseleccionada:0,
          opcionseleccionadazona:'',
          isHabilitadoInput:'',
          datos_transferencia:{},
          cobradorservice:null,
          transaccionservice:null, 
          clientes:[],
          opciones:[{value: 'empresa', label: 'Empresa' },{value: 'zona', label: 'Zona' }],
          empresa_zonas:[{ value: 'Seleccione', label: 'Seleccione' }],
          form_transaccion:{
          id_transaccion:Date.now(),
          idEmpresa:'',  
          idCobrador_recibe:'',
          idEmpresa_cobrador:'',
          idZona_envia:'',
          idZona_recibe:'',
          nombre_zona_recibe:'',
          enviado_por:'',
          idCobrador_envia:'',  
          valor:0,
          estado_transaccion:0,
          notificado:false,
          fecha:new Date().toISOString().slice(0,10),
          hora:'',
          mensaje:'',
          transaccion_nueva:false
          },
          estadobotonTransaccion:false,
          valor_sin_puntos:0,
          select_zona_acive:false
        }
    },
    beforeMount(){
      this.idad=localStorage.getItem("iad");
      this.uid = localStorage.getItem("uid");
      this.id_empresa=localStorage.getItem("empresa");
      this.id_zona = localStorage.getItem("zona")
      this.clientes=this.$store.getters.getOrdenarClientes;
      // this.transaccionservice.getTransaccionesPendiente(this.idad,this.id_empresa,this.id_zona).then((resp)=>{
      //   console.log(resp);
      // });
     
    
    },
    destroyed() {
       this.form_transaccion={
          id_transaccion:Date.now(),
          idEmpresa:'',  
          idCobrador_recibe:'',
          idEmpresa_cobrador:'',
          idZona_envia:'',
          idZona_recibe:'',
          enviado_por:'',
          idCobrador_envia:'', 
          nombre_zona_recibe:'', 
          valor:'',
          estado_transaccion:0,
          notificado:false,
          fecha:new Date().toISOString().slice(0,10),
          fecha:'',
          mensaje:'',
          transaccion_nueva:false
          }
          this.valor_sin_puntos=0
          this.opcionseleccionada=0;
          this.opcionresetseleccionada=0
          this.empresa_zonas=[{ value: 'Seleccione', label: 'Seleccione' }]
    },
    computed:{
      getDatosTransferencia(){
        return this.$store.getters.getDatosTransferencia;
      },
       getDatosTransferenciaPendientes(){
        return this.$store.getters.getDatosTransferenciaPendiente;
      }
    },
    created() {
       this.cobradorservice= new CobradorService();
       this.transaccionservice= new TransaccionService();
    },
    beforeCreate(){
       this.form_transaccion={
          id_transaccion:Date.now(),
          idEmpresa:'',  
          idCobrador_recibe:'',
          idZona_envia:'',
          idZona_recibe:'',
          idEmpresa_cobrador:'',
          enviado_por:'',
          idCobrador_envia:'',
          nombre_zona_recibe:'',  
          valor:'',
          estado_transaccion:0,
          notificado:false,
          fecha:new Date().toISOString().slice(0,10),
          hora: '',
          mensaje:'',
          transaccion_nueva:false
          }
          this.valor_sin_puntos=0;
          this.opcionseleccionada=0;
          this.opcionresetseleccionada=0;
          this.opciones=[{value: 'empresa', label: 'Empresa' },{value: 'zona', label: 'Zona' }]
          this.empresa_zonas=[{ value: 'Seleccione', label: 'Seleccione' }]
    },
    methods: {
       onEstado_trasaccionColor(transaccionEstate){
         switch (transaccionEstate) {
           case 0:
             return 'orange'
             break;
           case 1:
             return 'green'
             break;
           case 3:
             return 'red'
             break;
         
           default:
             break;
         }
       },
       onEstado_trasaccionTexto(transaccionEstate){
         switch (transaccionEstate) {
           case 0:
             return 'Pendiente'
             break;
           case 1:
             return 'Aprobado'
             break;
           case 3:
             return 'Cancelado'
             break;
         
           default:
             break;
         }
       },
       updateValorBalance(){
         
       let zona= localStorage.getItem("zona");
       let empresa= localStorage.getItem("empresa");

       // Get a new write batch
var batch = db.batch();

// Update the population of 'SF'
// /usuarios/Nf05nKycByv8CrjrzfL6/empresas/mhVF3FZqPlNAx1sV9c0o/Zonas/SmhRYXL86AUXG2JBZaNU
var sfRef = db.collection("usuarios").doc(this.idad).collection("empresas").doc(empresa).collection('Zonas').doc(zona);
batch.update(sfRef, {"balance": this.balance_zona});



// Commit the batch
batch.commit().then( () =>{
    // ...
          
          this.valor_sin_puntos=0;
          this.empresa_zonas=[{ value: 'Seleccione', label: 'Seleccione' }]
          this.opciones=[{value: 'empresa', label: 'Empresa' },{value: 'zona', label: 'Zona' }]   
          this.opcionseleccionada=0;  
              this.$f7.dialog.close();
              this.$f7.dialog.alert('Nuevo saldo '+Number(this.balance_zona).toLocaleString('es-CO',{style: 'currency',currency: 'COP',minimumSignificantDigits:1}),'Saldo actualizado!',()=>{
              // this.identificacion=''
              this.$f7router.back();
             
          
             

        }); 
        this.form_transaccion={
          id_transaccion:Date.now(),  
          idEmpresa:'',  
          idCobrador_recibe:'',
          idZona_envia:'',
          idZona_recibe:'',
          idEmpresa_cobrador:'',
          enviado_por:'',
          idCobrador_envia:'',  
          valor:'',
          nombre_zona_recibe:'',
          estado_transaccion:0,
          notificado:false,
          fecha:new Date().toISOString().slice(0,10),
          hora:'',
          mensaje:'',
          transaccion_nueva:false
          }
              });
  
    },
    onSelectZona($event){
       let id_zona=$event.target.value.split("-")[0]
       let nombre_zona=$event.target.value.split("-")[1]
       this.opcionseleccionadazona=id_zona;
       console.log(nombre_zona);
       
       let usuarioOnLogin=localStorage.getItem('iad');
       let id_empresa=localStorage.getItem('empresa');
      //  this.$f7.dialog.preloader('Cargando informacion...');
       this.form_transaccion.idCobrador_recibe=this.opcionseleccionadazona;
       this.form_transaccion.nombre_zona_recibe=nombre_zona;
      //  this.cobradorservice.buscarCobradorPorZona(usuarioOnLogin,id_empresa,this.opcionseleccionadazona).then((response)=>{
        
      //    this.$f7.dialog.close();
      //    if(response.data.id=='No hay coincidencias'){
      //      this.$f7.dialog.alert('La zona no tiene un cobrador asociado, contacte al administrador.','Atencion!');
      //    }else{
      //     //  this.form_transaccion.idCobrador_recibe=response.data.id;
           
      //       // console.log(response);
           
      //    }
      //  });
      
    },
    onSelectPlan($event){
      console.log($event.target.value);
     
      if($event.target.value=="empresa"){
        this.opcionseleccionada=$event.target.value;
        this.isHabilitadoInput=true;
        this.select_zona_acive=false;
        this.form_transaccion.idCobrador_recibe=this.id_empresa;
      }else if($event.target.value=='0'){
        // this.opcionseleccionada=$event.target.value;
        this.select_zona_acive=false;
      }else if($event.target.value=='zona'){
        this.opcionseleccionada=$event.target.value;
         this.isHabilitadoInput=true;
         this.select_zona_acive=true;
           let zonas= this.$store.getters.getZonasEmpresa;
           let idzona=localStorage.getItem("zona");
           let zonas_exlucida_actual=zonas.filter(x=>x.id!=idzona)
          
         for (const key in zonas_exlucida_actual) {
            if (zonas_exlucida_actual.hasOwnProperty(key)) {
                 let element={ value: zonas_exlucida_actual[key].id, label: zonas_exlucida_actual[key].nombre };
                 this.empresa_zonas.push(element);
                 
                
            }
         }
        //  this.form_transaccion.idCobrador_recibe='';
      }
     
    },
       onBuscarCobrador(idCobrador){
          let cliente= this.clientes.filter(x=>x.id==idCobrador);
          return cliente;
      },
      onGuardarTransaccion() {
        // Sort data
         let balance_actual_zona=this.$store.getters.getBalance;
        
        this.form_transaccion.valor= this.valor_sin_puntos.split('.').join('')
        this.form_transaccion.hora=this.$moment(new Date()).format("hh:mm:ss")
        this.form_transaccion.idZona_recibe=this.opcionseleccionadazona
        this.form_transaccion.idZona_envia=localStorage.getItem('zona')
        this.estadobotonTransaccion=true;
        if(Number(this.form_transaccion.valor)>Number(balance_actual_zona)){
          this.estadobotonTransaccion=false;
          this.$f7.dialog.alert('No se puede realizar la transaccion, el monto de la transaccion es superior al saldo de la zona','Atencion!');
        } 
        else if(this.form_transaccion.valor==0 || this.form_transaccion.valor==''){
          this.estadobotonTransaccion=false;
          this.$f7.dialog.alert('No se puede realizar la transaccion, debe ingresar un valor','Atencion!');
        }
        else if(balance_actual_zona==0){
          this.estadobotonTransaccion=false;
            this.$f7.dialog.alert('No se puede realizar la transaccion, no hay saldo disponible de la zona','Atencion!');
        }else{
        
        this.form_transaccion.idCobrador_envia=localStorage.getItem('uid');
        this.form_transaccion.enviado_por=localStorage.getItem('name');
        this.form_transaccion.idEmpresa_cobrador=localStorage.getItem('empresa');
        
      
      this.$f7.dialog.confirm('Desea realizar la transaccion','Seguro!', () => {
        this.$f7.dialog.preloader('Guardando...');
        if(this.opcionseleccionada=='empresa'){
          this.form_transaccion.idEmpresa=this.id_empresa;
          this.form_transaccion.nombre_zona_recibe="empresa";
           db.collection("usuarios").doc(this.idad).collection("empresas").doc(this.id_empresa).collection("Transferencias").add(this.form_transaccion)
    .then((rsp) =>{
        console.log("Document successfully written!");
        this.opcionresetseleccionada=undefined;
        let idZona=localStorage.getItem("zona");
      let datosHistorialPendiente={}
        datosHistorialPendiente.idZonaRecibe=this.form_transaccion.idCobrador_recibe;
        datosHistorialPendiente.idTransaccion=rsp.id;
     
         this.$store.commit('setDatosTransferenciaPendientes',this.form_transaccion);
        this.estadobotonTransaccion=false;
        this.select_zona_acive=false;
     let nuevo_balance_zona=Number(balance_actual_zona)-Number(this.form_transaccion.valor);
     this.balance_zona=nuevo_balance_zona;
     this.$store.commit('setBalanceZona',nuevo_balance_zona);
        this.$f7.dialog.close();
        this.updateValorBalance();
    })
    .catch((error)=> {
        console.error("Error writing document: ", error);
    });
        }
        else{
          console.log(this.idad);
          console.log(this.id_empresa);
          console.log(this.form_transaccion);

        db.collection("usuarios").doc(this.idad).collection("empresas").doc(this.id_empresa).collection("Transferencias").add(this.form_transaccion)
    .then((rsp) =>{
        console.log("Document successfully written!");
        this.opcionresetseleccionada=undefined
          let idZona=localStorage.getItem("zona");
        let datosHistorialPendiente={}
        datosHistorialPendiente.idZonaRecibe=this.form_transaccion.idCobrador_recibe
        datosHistorialPendiente.idTransaccion=rsp.id;
      
        this.$store.commit('setDatosTransferenciaPendientes',this.form_transaccion);
        this.estadobotonTransaccion=false;
        this.select_zona_acive=false;
     let nuevo_balance_zona=Number(balance_actual_zona)-Number(this.form_transaccion.valor);
     this.balance_zona=nuevo_balance_zona;
     this.$store.commit('setBalanceZona',nuevo_balance_zona);
        this.$f7.dialog.close();
        this.updateValorBalance();
    })
    .catch((error)=> {
        console.error("Error writing document: ", error);
    });
        }
     
      },()=>{
        this.estadobotonTransaccion=false;
      });
        } 
  },
   onAceptarTransaccion() {
   },
   onDetectarTrasccionesPendientes(){ 
        this.$store.commit('setEliminarDatosTransferenciaPendiente');
        let idCobrador=localStorage.getItem('uid');
        let idad=localStorage.getItem("iad");
        let idempresa=localStorage.getItem("empresa");
        let idzona=localStorage.getItem("zona");

    // db.collection("usuarios").doc(this.idad).collection("empresas").doc(idempresa).collection('Transferencias').doc('nueva_transaccion')
    // .onSnapshot({includeMetadataChanges: false},(doc) => {
    //       console.log(doc);
    //   if(doc.exists!=false){
    //     this.$f7.dialog.alert('Tiene una nueva transferencia de empresa!','Atencion!');
    //     console.log("Current data: ", doc.data());
    //      this.$store.commit('setAumentaContadorTransferencias');
    //      this.$store.commit('setDatosTransferencia',doc.data());
    //   }
    // });
      let transferencia= db.collection("usuarios").doc(this.idad).collection("empresas").doc(idempresa).collection('Transferencias')
      transferencia.where("estado_transaccion", "==", false)
      transferencia.where("idCobrador_envia", "==", idCobrador)
      .onSnapshot((snapshot)=> {
        
       console.log( snapshot.docChanges());

   if(snapshot.docChanges().length>=1){
    //  this.$f7.dialog.alert('Tiene una nueva transferencia de zona!','Atencion!');
   }

       console.log( snapshot);
        snapshot.docChanges().forEach((change)=> {
            
            if (change.type === "added") {
                
                
                // this.$store.commit('setAumentaContadorTransferencias');
                // this.$store.commit('setDatosTransferencia',change.doc.data());
                this.$store.commit('setDatosTransferenciaPendientes',change.doc.data());
                

                console.log("New: ", change.doc.data());
            }
            if (change.type === "modified") {
               this.$store.commit('setActualizarDatosTransferenciaPendiente',change.doc.data());
              
                console.log("Modified city: ", change.doc.data());
            }
            if (change.type === "removed") {
                console.log("Removed city: ", change.doc.data());
            }
        });
    });
      },

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