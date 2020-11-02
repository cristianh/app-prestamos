<template>
  <f7-page name="Transacion">
    
    <f7-navbar>
       <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Notificacion</f7-nav-title>
    </f7-navbar>
     <f7-block  v-if="getDatosTransferencia.length==0" inset>
         <f7-card
         title=" No hay notificaciones">
           
         </f7-card>
       
       </f7-block> 
       <div v-for="(transferencia,index,key) in getDatosTransferencia" :key="key">
         <div v-if="getDatosTransferencia.length===0">
 
<f7-block inset>
         <f7-card
         title=" No hay transacciones">
           
         </f7-card>
        
       </f7-block> 


    
         </div>
         <div v-else>
               <f7-card>
  <f7-card-header class="title-card-text">
  <div>Nueva transferencia</div>
  </f7-card-header>
  <f7-card-content>
    
    <f7-row>
       <!-- <pre>{{getDatosTransferencia}}</pre> -->
      <f7-col v-if="transferencia.data.enviado_por" style="text-align:center">
        <span><b>Envia:</b><br> {{transferencia.data.enviado_por}}</span>
        
      </f7-col>
      <f7-col  v-if="transferencia.data.envia" style="text-align:center">
        <span><b>Envia:</b><br> {{transferencia.data.envia}}</span>
        
      </f7-col>
      <f7-col style="text-align:center">
         <span><b>Mensaje:</b><br>{{transferencia.data.mensaje}}</span>
      </f7-col>
    </f7-row>
     
   
  </f7-card-content>
  <f7-card-footer>
    
    <div class="demo-facebook-name">Fecha y hora:<br> {{transferencia.data.fecha}} {{transferencia.data.hora}}</div>
    <div class="demo-facebook-name">Valor:<br> {{Number(transferencia.data.valor).toLocaleString('es-CO',{style: 'currency',currency: 'COP',minimumSignificantDigits:1})}}</div>
    <!-- <f7-link>Id cobrador: </f7-link>
    <f7-link>Valor: </f7-link> -->
  </f7-card-footer>
</f7-card>
         </div>
  <f7-block>

  <f7-row>
    
    <f7-col >
      <f7-button fill large small @click="onAceptarTransaccion(transferencia.id)" color="green">ACEPTAR</f7-button>
          
    </f7-col>
      <!-- <f7-col >
      <f7-button fill large small @click="onCancelarTransaccion(transferencia.id)" color="red">CANCELAR</f7-button>
          
    </f7-col> -->
    
  </f7-row>
 
</f7-block>
  </div>
  </f7-page>
</template>

<script>
import TransaccionesService from '../Services/TransaccionServices.js';
export default {
    data() {
        return {
          datastorage:'',
          idad:'',
          id_empresa:'',
          id_zona:'',
          datos_transaccion:'',
          datos_transferencia:{},
          transacccionservice:null,
          clientes:[],
          saldoActualEmpresa:0,
          saldoActualZona:0,
          balance_zona:0,
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

      this.idad=this.datastorage.iad
      console.log(this.idad);
      this.transacccionservice= new TransaccionesService();
      this.clientes=this.$store.getters.getOrdenarClientes;
    },
    computed:{
      getDatosTransferencia(){
        return this.$store.getters.getDatosTransferencia;
      }
    },
    methods: {

      updateValorZona(Transaccion){
          let zona= localStorage.getItem("zona");
          let empresa= this.datastorage.empresa
       
          // Get a new write batch
          var batch = db.batch();
          console.log(Transaccion.data.envia=="Empresa");
    if(Transaccion.data.envia=="Empresa"){
          // Update the population of 'SF'
          
          var sfRef = db.collection("usuarios").doc(this.datastorage.iad).collection("empresas").doc(empresa).collection('Zonas').doc(zona);
          batch.update(sfRef, {"balance": this.balance_zona});



          // Commit the batch
          batch.commit().then( () =>{
              // console.log(Transaccion);
              // console.log(Transaccion.data);
              
              this.transacccionservice.guardarHistorialTransaccion(this.datastorage.iad,this.id_empresa,Transaccion.data).then(()=>{
              this.$store.commit('setEliminarDatoTransferencia',Transaccion.id);  
              this.$f7.dialog.close();
              this.$f7.dialog.alert('Nuevo saldo '+Number(this.balance_zona).toLocaleString('es-CO',{style: 'currency',currency: 'COP',minimumSignificantDigits:1}),'Saldo actualizado!',()=>{
              
              // this.transacccionservice.eliminarTransaccionEmpresaZona(this.idad,empresa,zona,Transaccion.id)
              // db.collection('usuarios').doc(this.idad).collection('empresas').doc(empresa).collection('Zonas').doc(zona).collection('Transferencias').doc(Transaccion.id).delete()
               this.transacccionservice.eliminarTransaccionEmpresaZona(this.datastorage.iad,empresa,zona,Transaccion.id).then(()=>{
                
              });

          }); 
              }).catch((error)=>{
                this.$f7.dialog.close()
                 if(this.$store.getters.getModoDebugger){
                  this.$store.commit('setErrorServices',error)
                  this.$f7.dialog.alert('Ha ocurrido un error, por favor verifique el menu debug','Atencion!')
                   console.log(error);
          }
       });
          });
    }else {
        var sfRef = db.collection("usuarios").doc(this.datastorage.iad).collection("empresas").doc(empresa).collection('Zonas').doc(zona);
          batch.update(sfRef, {"balance": this.balance_zona});



          // Commit the batch
          batch.commit().then( () =>{
              console.log(Transaccion);
              
              this.transacccionservice.guardarHistorialTransaccion(this.datastorage.iad,this.id_empresa,Transaccion.data).then(()=>{
              this.$store.commit('setEliminarDatoTransferencia',Transaccion.id);
               
              this.$f7.dialog.close();
              this.$f7.dialog.alert('Nuevo saldo '+Number(this.balance_zona).toLocaleString('es-CO',{style: 'currency',currency: 'COP',minimumSignificantDigits:1}),'Saldo actualizado!',()=>{
              // this.identificacion=''
             
             console.log(Transaccion.id);
              // this.transacccionservice.eliminarTransaccionEmpresa(this.idad,empresa,Transaccion.id).
              // db.collection('usuarios').doc(this.idad).collection('empresas').doc(empresa).collection('Transferencias').doc(Transaccion.id).delete()
              this.transacccionservice.eliminarTransaccionEmpresa(this.datastorage.iad,empresa,Transaccion.id).then(()=>{
                
              });
            

          }); 
              }).catch((error)=>{
                this.$f7.dialog.close()
                 if(this.$store.getters.getModoDebugger){
                  this.$store.commit('setErrorServices',error)
                  this.$f7.dialog.alert('Ha ocurrido un error, por favor verifique el menu debug','Atencion!')
                   console.log(error);
          }
       });
          });

    } 
  
    },
   onAceptarTransaccion(Idtransaccion) {
     this.datos_transaccion= this.$store.getters.getDatosTransferencia;
     console.log(".........................this.datos_transaccion",this.datos_transaccion);
    let posicion = this.datos_transaccion.findIndex(x => x.id == Idtransaccion);
    // this.datos_transaccion.splice(posicion,1)  
     console.log(".........................posicion",posicion);
     let transaccion= this.datos_transaccion[posicion];
     console.log(".........................transaccion",transaccion);
    
     let uid = this.datastorage.uid
     this.id_empresa=this.datastorage.empresa
     this.id_zona = localStorage.getItem("zona")
     this.$store.commit('setEstadoTransferencia',1);
      
      console.log(this.datos_transaccion[0]);
    
     
     let balance_actual_zona=this.$store.getters.getBalance;
     let nuevo_balance_zona=Number(balance_actual_zona)+Number(transaccion.data.valor);
     localStorage.setItem("saldo_zona",nuevo_balance_zona);
     this.balance_zona=nuevo_balance_zona
     this.$store.commit('setBalanceZona',nuevo_balance_zona);
     this.$store.commit('setDisminuyeContadorTransferencias');
     this.$f7.dialog.preloader("Actualizando saldo...");
      transaccion.data.estado_transaccion=1
     this.updateValorZona(transaccion);
     
   },
   onCancelarTransaccion(idtranferencia){
         this.datos_transaccion= this.$store.getters.getDatosTransferencia;
     console.log(".........................this.datos_transaccion",this.datos_transaccion);
    let posicion = this.datos_transaccion.findIndex(x => x.id == idtranferencia);
    // this.datos_transaccion.splice(posicion,1)  
     console.log(".........................posicion",posicion);
     let transaccion= this.datos_transaccion[posicion];
     console.log(".........................transaccion",transaccion);
    
      console.log(".....................",transaccion);
    //  transaccion.data.estado_transaccion=1
    if(transaccion.data.envia=='Empresa'){
       
     let uid = this.datastorage.uid
     this.id_empresa= this.datastorage.empresa
     this.id_zona = localStorage.getItem("zona")
     this.$store.commit('setEstadoTransferencia',2);
     transaccion.data.estado_transaccion=2
    //  console.log(this.datos_transaccion[0]);
      this.transacccionservice.guardarHistorialTransaccion(this.idad,this.id_empresa,transaccion.data).then(()=>{
      
      // this.$f7.dialog.close();
      this.$f7.dialog.alert('transaccion cancelada','Atencion!',()=>{
      // this.identificacion=''
         let zona= localStorage.getItem("zona");
       let empresa= this.datastorage.empresa
          this.$store.commit('setDisminuyeContadorTransferencias');
          // this.transacccionservice.elminiarTransaccion(this.idad,this.id_empresa,this.id_zona);
           this.transacccionservice.eliminarTransaccionEmpresaZona(this.datastorage.iad,empresa,zona,transaccion.id).then(()=>{
                this.$store.commit('setEliminarDatosTransferencia',transaccion.id);  
          // this.$f7router.back();
          });
          // this.transacccionservice.elminiarTransaccion(this.idad,this.id_empresa,transaccion.id);
          



// Update the population of 'SF'
// /usuarios/Nf05nKycByv8CrjrzfL6/empresas/mhVF3FZqPlNAx1sV9c0o/Zonas/SmhRYXL86AUXG2JBZaNU
// var sfRef = db.collection("usuarios").doc(this.idad).collection("empresas").doc(empresa);

// sfRef.get().then((doc)=>{
  
//     this.saldoActualEmpresa=doc.data().Balance;
//            // Get a new write batch
// var batch = db.batch();


// this.saldoActualEmpresa=Number(this.saldoActualEmpresa)+ Number(transaccion.data.valor)


// batch.update(sfRef, {"Balance": this.saldoActualEmpresa });



// // Commit the batch
//       batch.commit().then( () =>{
//           // ...
       
//       });
// });


      
        });
      }).catch((error)=>{
        this.$f7.dialog.close()
                 if(this.$store.getters.getModoDebugger){
                  this.$store.commit('setErrorServices',error)
                  this.$f7.dialog.alert('Ha ocurrido un error, por favor verifique el menu debug','Atencion!')
                   console.log(error);
          }
       });
    }
    else{
              this.datos_transaccion= this.$store.getters.getDatosTransferencia;
     console.log(".........................this.datos_transaccion",this.datos_transaccion);
    let posicion = this.datos_transaccion.findIndex(x => x.id == idtranferencia);
    // this.datos_transaccion.splice(posicion,1)  
     console.log(".........................posicion",posicion);
     let transaccion= this.datos_transaccion[posicion];
     console.log(".........................transaccion",transaccion);
    
      console.log(".....................",transaccion);
    //  transaccion.data.estado_transaccion=1

     let uid = this.datastorage.uid
     this.id_empresa= this.datastorage.empresa
     this.id_zona = localStorage.getItem("zona")
     this.$store.commit('setEstadoTransferencia',2);
    //  console.log(this.datos_transaccion[0]);
    //  this.datos_transaccion[0].data.estado_transaccion=2
    transaccion.data.estado_transaccion=2
     
      this.transacccionservice.guardarHistorialTransaccion(this.idad,this.id_empresa,transaccion.data).then(()=>{
      
      // this.$f7.dialog.close();
      this.$f7.dialog.alert('transaccion cancelada','Atencion!',()=>{
      // this.identificacion=''
         let zona= localStorage.getItem("zona");
       let empresa= this.datastorage.empresa

        
          // this.transacccionservice.elminiarTransaccion(this.idad,this.id_empresa,this.id_zona);
           this.transacccionservice.eliminarTransaccionEmpresa(this.datastorage.iad,empresa,transaccion.id).then(()=>{
              this.$store.commit('setDisminuyeContadorTransferencias');
              this.$store.commit('setEliminarDatosTransferencia',transaccion.id);  
              // this.$f7router.back();
          }).catch((error)=>{
            this.$f7.dialog.close()
                 if(this.$store.getters.getModoDebugger){
                  this.$store.commit('setErrorServices',error)
                  this.$f7.dialog.alert('Ha ocurrido un error, por favor verifique el menu debug','Atencion!')
                   console.log(error);
          }
       });
          



// Update the population of 'SF'
// /usuarios/Nf05nKycByv8CrjrzfL6/empresas/mhVF3FZqPlNAx1sV9c0o/Zonas/SmhRYXL86AUXG2JBZaNU
// var sfRef = db.collection("usuarios").doc(this.idad).collection("empresas").doc(empresa).collection("Zonas").doc(zona);

// sfRef.get().then((doc)=>{
  
//     this.saldoActualZona=doc.data().balance;
//            // Get a new write batch
// var batch = db.batch();


// this.saldoActualZona=Number(this.saldoActualZona)+ Number(tranferencia.data.valor)


// batch.update(sfRef, {"balance": this.saldoActualZona });



// // Commit the batch
//       batch.commit().then( () =>{
//           // ...
         
//       });
// });


      
        });
      }).catch((error)=>{
        this.$f7.dialog.close()
                 if(this.$store.getters.getModoDebugger){
                  this.$store.commit('setErrorServices',error)
                  this.$f7.dialog.alert('Ha ocurrido un error, por favor verifique el menu debug','Atencion!')
                   console.log(error);
          }
       });
    }
    
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