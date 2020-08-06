<template>
  <f7-page name="Transacion">
    
    <f7-navbar>
       <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Nueva Transacion</f7-nav-title>
       <f7-subnavbar >
      <f7-segmented sliding raised>
        <f7-button tab-link="#Transaccion" tab-link-active>Transaccion</f7-button>
        <f7-button tab-link="#Pendientes" @click="onDetectarTrasccionesPendientes">Pendientes</f7-button>
      </f7-segmented>
    </f7-subnavbar>
    </f7-navbar>
    <f7-tabs>
    <f7-tab id="Transaccion" tab-active >
    <f7-list ref="select_enviar" no-hairlines-md inset>
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
  <option v-for="(opciones,index,key) in opciones" :id=opciones.label :key="key"  :selected="opcionseleccionada" :value="`${opciones.value}`">{{opciones.label}}</option>
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
             <f7-list-item
             v-for="(transferencia_pendiente,index,key) in getDatosTransferenciaPendientes" :key="key"
             :title="`Enviado a: ${transferencia_pendiente.nombre_zona_envia}`"
             :text="`Enviado por: ${transferencia_pendiente.envia}`"
             :subtitle="`Valor: ${transferencia_pendiente.valor}`"
             :badge="transferencia_pendiente.estado_transaccion==false?'pendiente':'aceptado'" 
             :badge-color="transferencia_pendiente.estado_transaccion==false?'orange':'green'"
             :footer="`Fecha y hora: ${transferencia_pendiente.fecha}-${transferencia_pendiente.hora}`">
             </f7-list-item>
           </f7-list>
            </f7-block>
           
               <!-- <f7-card> -->
  <!-- <f7-card-header class="title-card-text">
  <div>Nueva transferencia</div>
  </f7-card-header>
  <f7-card-content>
    
    <f7-row>
      <f7-col style="text-align:center">
        <span><b>Envia:</b><br> {{transferencia.Envia}}</span>
        
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
  <!-- </f7-card-footer>
</f7-card>  -->
         </div>
  <!-- <f7-block>

  <f7-row>
    
    <f7-col >
      <f7-button fill large small  color="green">ACEPTAR</f7-button>
          
    </f7-col>
      <f7-col >
      <f7-button fill large small color="red">CANCELAR</f7-button>
          
    </f7-col>
    
  </f7-row>
 
</f7-block> -->
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
          idEmpresa:'',  
          idCobrador_recibe:'',
          nombre_zona_envia:'',
          envia:'',
          idCobrador_envia:'',  
          valor:0,
          estado_transaccion:false,
          fecha:new Date().toISOString().slice(0,10),
          hora: this.$moment(new Date()).format("hh:mm:ss"),
          mensaje:'',
          transaccion_nueva:true
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
          idEmpresa:'',  
          idCobrador_recibe:'',
          envia:'',
          idCobrador_envia:'', 
          nombre_zona_envia:'', 
          valor:'',
          estado_transaccion:false,
          fecha:new Date().toISOString().slice(0,10),
          hora: this.$moment(new Date()).format("hh:mm:ss"),
          mensaje:'',
          transaccion_nueva:true
          }
          this.valor_sin_puntos=0
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
          idEmpresa:'',  
          idCobrador_recibe:'',
          envia:'',
          idCobrador_envia:'',
          nombre_zona_envia:'',  
          valor:'',
          estado_transaccion:false,
          fecha:new Date().toISOString().slice(0,10),
          hora: this.$moment(new Date()).format("hh:mm:ss"),
          mensaje:'',
          transaccion_nueva:true
          }
          this.valor_sin_puntos=0;
          this.opcionseleccionada=0;
          this.opciones=[{value: 'empresa', label: 'Empresa' },{value: 'zona', label: 'Zona' }]
          this.empresa_zonas=[{ value: 'Seleccione', label: 'Seleccione' }]
    },
    methods: {
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
          this.form_transaccion={
          idEmpresa:'',  
          idCobrador_recibe:'',
          envia:'',
          idCobrador_envia:'',  
          valor:'',
          nombre_zona_envia:'',
          estado_transaccion:false,
          fecha:new Date().toISOString().slice(0,10),
          hora: this.$moment(new Date()).format("hh:mm:ss"),
          mensaje:'',
          transaccion_nueva:true
          }
          this.valor_sin_puntos=0;
          this.empresa_zonas=[{ value: 'Seleccione', label: 'Seleccione' }]
          this.opciones=[{value: 'empresa', label: 'Empresa' },{value: 'zona', label: 'Zona' }]   
          this.opcionseleccionada=0;  
              this.$f7.dialog.close();
              this.$f7.dialog.alert('Nuevo saldo '+this.balance_zona,'Saldo actualizado!',()=>{
              // this.identificacion=''
              this.$f7router.back();
             
          
             

        }); 
              });
  
    },
    onSelectZona($event){
       let id_zona=$event.target.value.split("-")[0]
       let nombre_zona=$event.target.value.split("-")[1]
       this.opcionseleccionadazona=id_zona;
      //  console.log($event.target.value.split("-"));
       
       let usuarioOnLogin=localStorage.getItem('iad');
       let id_empresa=localStorage.getItem('empresa');
      //  this.$f7.dialog.preloader('Cargando informacion...');
       this.form_transaccion.idCobrador_recibe=this.opcionseleccionadazona;
       this.form_transaccion.nombre_zona_envia=nombre_zona;
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
      this.opcionseleccionada=$event.target.value;
      if(this.opcionseleccionada=="empresa"){
        this.isHabilitadoInput=true;
        this.select_zona_acive=false;
        this.form_transaccion.idCobrador_recibe=this.id_empresa;
      }else if(this.opcionseleccionada=='0'){
        this.select_zona_acive=false;
      }else if(this.opcionseleccionada=='zona'){
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
        
        this.form_transaccion.valor= this.valor_sin_puntos.split('.').join('');
       
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
        this.form_transaccion.envia=localStorage.getItem('name');
        
      
      this.$f7.dialog.confirm('Desea realizar la transaccion','Seguro!', () => {
        this.$f7.dialog.preloader('Guardando...');
        if(this.opcionseleccionada=='empresa'){
          this.form_transaccion.idEmpresa=this.id_empresa;
           db.collection("usuarios").doc(this.idad).collection("empresas").doc(this.id_empresa).collection("Transferencias").add(this.form_transaccion)
    .then((rsp) =>{
        console.log("Document successfully written!");
        let idZona=localStorage.getItem("zona");
      let datosHistorialPendiente={}
        datosHistorialPendiente.idZonaRecibe=this.form_transaccion.idCobrador_recibe;
        datosHistorialPendiente.idTransaccion=rsp.id;
         axios.post(`https://us-central1-manifest-life-279516.cloudfunctions.net/guardarTransaccionPendiente?idadmin=${this.idad}&doc=${this.id_empresa}&subdoc=${idZona}`,datosHistorialPendiente).then((resp)=>{
           console.log(resp);
        });
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
        db.collection("usuarios").doc(this.idad).collection("empresas").doc(this.id_empresa).collection("Transferencias").add(this.form_transaccion)
    .then((rsp) =>{
        console.log("Document successfully written!");
          let idZona=localStorage.getItem("zona");
        let datosHistorialPendiente={}
        datosHistorialPendiente.idZonaRecibe=this.form_transaccion.idCobrador_recibe
        datosHistorialPendiente.idTransaccion=rsp.id;
         axios.post(`https://us-central1-manifest-life-279516.cloudfunctions.net/guardarTransaccionPendiente?idadmin=${this.idad}&doc=${this.id_empresa}&subdoc=${idZona}`,datosHistorialPendiente).then((resp)=>{
           console.log(resp);
        });
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

        console.log(idCobrador);
        console.log(idad);
        console.log(idempresa);
        console.log(idzona);
    
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