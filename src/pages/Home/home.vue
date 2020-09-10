<template>
    <f7-page name="home">
    
    
    
        <!-- Top Navbar -->
    
    
    
        <f7-navbar :sliding="false">
    
    
    
            <f7-nav-left>
    
    
    
                <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
                <!-- <f7-link external href="https://api.whatsapp.com/send?phone=0573127083365&text=hola">wp</f7-link> -->
    
    
    
            </f7-nav-left>
    
    
    
            <f7-nav-title sliding>Sucomercio</f7-nav-title>
    
    
    
            <!-- <f7-nav-title-large>Sucomercio</f7-nav-title-large> -->
    
    
    
        </f7-navbar>
    
    
    
    
    
    
    
        <f7-card>
    
    
    
            <f7-card-header valign="center">
    
    
    
                {{profile_name}}
    
    
    
            </f7-card-header>
    
    
    
            <f7-card-content>
    
    
    
                <div v-if="mensaje_bienvenida">
    
    
    
                    <p>{{mensaje_bienvenida}}</p>
    
    
    
                </div>
    
    
    
                <div v-else>
    
    
    
                    Cargando....
    
    
    
                </div>
    
    
    
            </f7-card-content>
    
    
    
            <f7-card-footer>
    
    
    
                <strong>Ultima conexion:</strong> {{ lastActivity | moment("DD-MM-YYYY HH:mm") }}
    
    
    
            </f7-card-footer>
    
    
    
        </f7-card>
    
    
    
        <f7-block>
    
    
    
            <div v-if="isLoadBalnces">
    
    
    
                <f7-list inset>
    
    
    
                    <!-- <f7-list-item title="Saldo Empresa" :after="balance_empresa"><f7-icon ios="f7:local_atm" aurora="f7:local_atm" md="material:local_atm"></f7-icon> -->
    
    
    
    
    
    
    
                    </f7-list-item>
    
    
                    <!-- :after="getBalanceZona!=0 || getBalanceZona!=''?getBalanceZona:'0'" -->
                    <f7-list-item title="Saldo Zona" >
    
                        {{getBalanceZona!=0 || getBalanceZona!=''?getBalanceZona:'0'|currency}}
    
                        <!-- <f7-icon ios="f7:local_atm" aurora="f7:local_atm" md="material:local_atm"></f7-icon> -->
    
    
    
                    </f7-list-item>
    
    
    
                    <!-- <f7-list-item title="Id Zona" :after="id_zona"><f7-icon ios="f7:room" aurora="f7:room" md="material:room"></f7-icon></f7-list-item>
    
        
    
           <f7-list-item title="Id Cobrador" :after="uid"><f7-icon ios="f7:person" aurora="f7:person" md="material:person"></f7-icon></f7-list-item>
    
        
    
           <f7-list-item title="Id Empresa" :after="id_empresa"><f7-icon ios="f7:person" aurora="f7:person" md="material:person"></f7-icon></f7-list-item> -->
    
    
    
                </f7-list>
    
    
    
            </div>
    
    
    
            <div v-else>
    
    
    
                Cargando saldo.....
    
    
    
            </div>
    
    
    
        </f7-block>
    
    
    
    </f7-page>
</template>

<script>
import ClientesCobradoresService from '../Services/ClientesService.js';
import CobradoresService from '../Services/CobradoresServices.js';
import EmpresaService from '../Services/EmpresaServices';
import TransaccionService from '../Services/TransaccionServices.js';
import firebase from 'firebase'
export default {
    data() {
        return {
            mensaje_bienvenida: '',
            firstor: '',
            lastActivity: '',
            profile_name: '',
            balance_zona: 0,
            balance_empresa: '',
            isLoadBalnces: false,
            cobradoresClientesService: null,
            cobradoresService: null,
            empresaService: null,
            transaccionService:null,
            idad: ''
            

        }
    },
    watch: {
        Uploadabono(newBalance, oldBalance) {
            this.balance_zona = localStorage.getItem("saldo_zona");
        }
    },
    computed: {
        getBalanceZona() {
            return this.$store.getters.getBalance;
        }
    },
    beforeMount() {
        // console.log(navigator.onLine)
        // this.CobradoresService = new CobradoresService();
        if(localStorage.getItem("fecha_lista_generada")){
         let fecha_lista = this.$moment(localStorage.getItem("fecha_lista_generada")).format('YYYY-MM-DD');
         let fecha_hoy = this.$moment(new Date()).format('YYYY-MM-DD');
        //  alert(fecha_hoy>fecha_lista)
        
                                        
                                       
        
                                       
                                    
                                        if(fecha_hoy>fecha_lista){
                                                localStorage.removeItem("fecha_lista_generada")
                                                localStorage.removeItem("Informe_final_ruta")
                                                localStorage.removeItem("estado_lista_prestamos_clientes")
                                                localStorage.removeItem("mostrar_resultado_final")
                                                localStorage.removeItem("jornada_confirmada")
                                                localStorage.removeItem("cobros_hoy")
                                                localStorage.removeItem("ListaEstadosCobro")
                                              
                                        }
                                        
        }
        

        if(!navigator.onLine){
                    this.$f7.dialog.close()
                    this.profile_name = 'Bienvenido ' + localStorage.getItem("name") + '.';
                    this.lastActivity = localStorage.getItem("lastactivity");
                    this.$f7.dialog.alert("Revise su conexion a internet e intentelo nuevamente","Atencion!");
                    this.mensaje_bienvenida = 'Invitado';
                    this.balance_empresa = 0;
                    this.isLoadBalnces = true;
        }else{
            // localStorage.setItem("total_prestado",0)
        this.idad = localStorage.getItem("iad")
        const self = this;

        this.profile_name = 'Bienvenido ' + localStorage.getItem("name") + '.';
        this.lastActivity = localStorage.getItem("lastactivity");
        this.uid=localStorage.getItem("uid");
        // console.log(this.uid);

        let zona;
        let empresa=localStorage.getItem("empresa");
        self.$f7.dialog.preloader("Cargando informacion...");
        // console.log(this.uid);
        // localStorage.setItem("listagenerada",false);
        
        this.CobradoresService.getInformacionCobrador(this.idad,empresa,this.uid).then((resp)=>{
          
            if(resp.data.collecciones.find(x=>x==="parametros_cobros")){
                // alert('la empresa no a dfinico los paramtros de cobro');
                
            }else{
                self.$f7.dialog.alert("La empresa no a definido los parametros de los prestamos,contacte al administrador.","Atencion!");
            }
            
            // console.log(resp.data);
            
            this.mensaje_bienvenida = resp.data.empresa[0].Mensaje;
            this.balance_empresa = resp.data.empresa[0].Balance;
            //this.isLoadRutas= true;
            this.isLoadBalnces = true;
            this.$store.commit('setZonasEmpresas',resp.data.zonas)
            localStorage.setItem("empresa", empresa);
            // localStorage.setItem("empresa", empresa);

  
            
            resp.data.cobrador.forEach(element => { 
               
                let buscarZonaCobrador=resp.data.zonas.filter(x=>x.id===element.zona);
                
                if(buscarZonaCobrador.length>=1){
              
                localStorage.setItem("zona", buscarZonaCobrador[0].id);
                this.$store.commit('setBalanceZona', buscarZonaCobrador[0].balance);
                localStorage.setItem("saldo_zona", buscarZonaCobrador[0].balance);
                localStorage.setItem("saldo_inicial_zona", buscarZonaCobrador[0].balance);
                this.balance_zona = this.$store.getters.getBalance;
               
                }
            });
            
         let tazaseinteres = resp.data.parametros_cobros;
            for (const key in tazaseinteres) {
                if (tazaseinteres.hasOwnProperty(key)) {
                    const element = tazaseinteres[key];
                   
                    //this.clientes.push(element);
                    this.$store.state.tasaseinteres.unshift(element);

                    ///this.clientes_nombres.push(element.data.usuario.nombre);

                }
            }

            let clientes_cobrador = resp.data.clientes;
            let estadoListaCobro=[]
                for (const key in clientes_cobrador) {
                if (clientes_cobrador.hasOwnProperty(key)) {
                    const element = clientes_cobrador[key];
                    
                    //this.clientes.push(element);
                    this.$store.state.clientes.unshift(element);
                    // alert(element.data.hasOwnProperty('prestamos'))
                    if(element.data.hasOwnProperty('prestamos')){
                       
                            let fecha_prestamo = this.$moment(element.data.prestamos[0].fecha).format('YYYY-MM-DD');
                            let fecha_anterior_hoy = this.$moment(new Date()).format('YYYY-MM-DD');

                           
                        //    alert(fecha_prestamo<fecha_anterior_hoy && element.data.prestamos.length >= 1 && element.data.prestamos[0].estado_prestamo == "false")
                                //  if (element.data.prestamos.length > 0 && element.data.prestamos[0].estado_prestamo == false) {
                            if(fecha_prestamo<fecha_anterior_hoy && element.data.prestamos.length >= 1 && element.data.prestamos[0].estado_prestamo == "false") {
                                
                                 this.onActualizarEstadosLista(element)
                                 
                               
                                // this.$store.state.clientes_cobros.push(element);
                            // }else{
                            //     this.$store.state.clientes_cobros.unshift(element);
                            // }

                
                               

                                

                                
                                
                                // alert(localStorage.getItem("listagenerada"))
                                if(Boolean(localStorage.getItem("listagenerada"))==false || localStorage.getItem("listagenerada")=='false' ){
                                    
                                  estadoListaCobro.unshift({estado:0,id:element.data.id,posicion:element.data.posicion})
                                  localStorage.setItem('ListaEstadosCobro',JSON.stringify(estadoListaCobro))
                               
                                 
                                
                                }else{
                                    
                                    //  this.$store.commit('setEstadoCobrosLista',JSON.parse(localStorage.getItem('ListaEstadosCobro')))
                                     if(localStorage.getItem('cobros_pendientesArray')){
                                            this.$store.state.cobros_pendientes=[]
                                            let cobros_pendientes=JSON.parse(localStorage.getItem('cobros_pendientesArray'))
                                            cobros_pendientes.forEach(element => {
                                                 this.$store.state.cobros_pendientes.unshift(element)
                                            });
                                         
                                            localStorage.setItem('cobro_pendiente', this.$store.state.cobros_pendientes.length)
                                             this.$store.state.jornada_cobrador.numero_cobros_pendientes=this.$store.state.cobros_pendientes.length
                                         
                                             
                                     }
                                     if(localStorage.getItem('total_prestado')){
                                        this.$store.state.jornada_cobrador.total_prestado=Number(localStorage.getItem('total_prestado'))
                                     }
                                    //  total_prestado
                                     
                                     if(localStorage.getItem('cobros_efectivos')){
                                        this.$store.state.jornada_cobrador.catidad_cobrosefectivos=Number(localStorage.getItem('cobros_efectivos'))
                                     }
                                    
                                     if(localStorage.getItem('cobros_nofectivos')){
                                        this.$store.state.jornada_cobrador.catidad_cobrosenofectivos=Number(localStorage.getItem('cobros_nofectivos'))
                                     }

                                     if(localStorage.getItem('total_cobros')){
                                         this.$store.state.jornada_cobrador.total_cobros_realizados=Number(localStorage.getItem('total_cobros'))
                                     }
                                    
                                     if(localStorage.getItem('lista_clientes_cobrados')){
                                       this.$store.state.contadorClientesSeleccionados=Number(localStorage.getItem('lista_clientes_cobrados'))
                                          
                                     }

                                     if(localStorage.getItem('cobros_hoy')){
                                       this.$store.state.cobros_hoy=JSON.parse(localStorage.getItem('cobros_hoy'))   
                                     }
                                    

                                     

                                      
                                    // localStorage.removeItem('cobros_nofectivos')
                                    
                                }
                            }
                    // }
                    }
                    
                }
            }
    
          
          this.$store.commit('setEstadoCobrosLista',JSON.parse(localStorage.getItem('ListaEstadosCobro')))
          
            self.$f7.dialog.close()

               this.onDetectarTransacciones()
            //    this.onActualizarEstadosLista()
            
        });

        }
        
    },
    methods: {
        onActualizarEstadosLista(elemento_lista_cobros){
        // let lista_cobros_ordenada=this.$store.getters.getOrdenarListaClientesCobros
        
        // let lista_cobros_ordenada=listaCobros
                                if(localStorage.getItem('ListaEstadosCobro')){
                                    let estados=JSON.parse(localStorage.getItem('ListaEstadosCobro'))
                                     let elemento_lista=estados.filter(x=>x.id===elemento_lista_cobros.data.id)
                                    // let posicion_lista=lista_cobros_ordenada.findIndex(x=>x.data.id===elemento_lista[0].id)
                                                    // console.log(elemento_lista[0].estado);
                                                    // console.log(posicion_lista);
                                                    if(elemento_lista.length>=1){
                                                            console.log(elemento_lista[0].estado);
                                                                    switch (elemento_lista[0].estado) {
                                                    case 1:
                                                elemento_lista_cobros.data.estado_pago_prestamo.pago=true
                                                 elemento_lista_cobros.data.estado_pago_prestamo.nopago=false
                                                elemento_lista_cobros.data.estado_pago_prestamo.pendiente=false
                                                        break;
                                                    case 2:
                                                            elemento_lista_cobros.data.estado_pago_prestamo.pago=false
                                                 elemento_lista_cobros.data.estado_pago_prestamo.nopago=true
                                                 elemento_lista_cobros.data.estado_pago_prestamo.pendiente=false
                                                        break;
                                                    case 3:
                                                    elemento_lista_cobros.data.estado_pago_prestamo.pago=false
                                                 elemento_lista_cobros.data.estado_pago_prestamo.nopago=false
                                                 elemento_lista_cobros.data.estado_pago_prestamo.pendiente=true
                                                        break;
                                                
                                                    default:
                                                        break;
                                                }
                                                   }
                                                
                                                    // console.log(elemento_lista_cobros);

                                    this.$store.state.clientes_cobros.unshift(elemento_lista_cobros);

                                    //  for (const key in lista_cobros_ordenada) {
                                    //             if (lista_cobros_ordenada.hasOwnProperty(key)) {
                                    //                  const element_estado = lista_cobros_ordenada[key];
                                                    
                                                    
                                    //                 if(posicion_lista>=1){
                                    
                                    //                 }
                                    //                 }
                                    //             }

                                     }else{
                                        this.$store.state.clientes_cobros.unshift(elemento_lista_cobros);
                                     }

                 
                                
                                // this.$store.commit('setActualizarEstadosListaCobros',lista_cobros_ordenada)
        },
 onDetectarTransaccionesEmpresa(idCobrador,idad,idempresa,idzona){
            
    let transferenciaEmpresa= db.collection("usuarios").doc(this.idad).collection("empresas").doc(idempresa).collection("Zonas").doc(idzona).collection('Transferencias')
    transferenciaEmpresa.where("envia", "==", "Empresa")
    .onSnapshot({includeMetadataChanges: false},(snapshot) => {
         let idTransacciones=[];
        
          snapshot.docs.forEach(element => {
         idTransacciones.push(element.id);
      });
   

        snapshot.docChanges().forEach((change)=> {
            
            if (change.type === "added") {
                this.$f7.dialog.alert('Tiene una nueva transferencia de empresa!','Atencion!');
                  let data_transacciones={
                  id:change.doc.id,
                  data:change.doc.data()
                }
                console.log(data_transacciones);
                this.$store.commit('setAumentaContadorTransferencias');
                this.$store.commit('setDatosTransferencia',data_transacciones);
                console.log("Modified city: ", change.doc.data());
               
            }
            if (change.type === "modified") {
                 
            }
            if (change.type === "removed") {
                console.log("Removed city: ", change.doc.data());
            }
        });
    });
        },
onDetectarTransaccionesCanceladas(idCobrador,idad,idempresa,idzona){
     //detectarCancelados
       let transferencia= db.collection("usuarios").doc(this.idad).collection("empresas").doc(idempresa).collection('Transferencias')
      transferencia.where("estado_transaccion", "==", 0)
      transferencia.where("idCobrador_envia", "==", idCobrador)
      .onSnapshot((snapshot)=> {
        
          let contador=0;
    
        snapshot.docChanges().forEach((change)=> {
            
            if (change.type === "added") {
               
                 
                
                // this.$store.commit('setAumentaContadorTransferencias');
                // this.$store.commit('setDatosTransferencia',change.doc.data());
                this.$store.commit('setDatosTransferenciaPendientes',change.doc.data());
                

                console.log("New: ", change.doc.data());
            }
            if (change.type === "modified") {
                    if(change.doc.data().estado_transaccion==3){ 
                        let idad=localStorage.getItem("iad");
                    let mensaje=`Por valor de: ${Number(change.doc.data().valor).toLocaleString('es-CO',{style: 'currency',currency: 'COP',minimumSignificantDigits:1})}.`
                    this.$f7.dialog.alert(mensaje,`Transferencia envida a "${change.doc.data().nombre_zona_recibe}" cancelada!`,()=>{
                        this.$f7.dialog.preloader('Actualizando saldo de la zona ...');
                        let nuevosaldo=Number(this.$store.getters.getBalance)+ Number(change.doc.data().valor);
                        // Get a new write batch
                        var batch = db.batch();

                        // Update the population of 'SF'
                        // /usuarios/Nf05nKycByv8CrjrzfL6/empresas/mhVF3FZqPlNAx1sV9c0o/Zonas/SmhRYXL86AUXG2JBZaNU
                        var sfRef = db.collection("usuarios").doc(idad).collection("empresas").doc(change.doc.data().idEmpresa_cobrador).collection("Zonas").doc(change.doc.data().idZona_envia);
                        batch.update(sfRef, {"balance": Number(nuevosaldo)});

                        // Commit the batch
                        batch.commit().then( () =>{
                        // ...
                        console.log('balance actualizado');
                        this.$store.commit('setActualizarDatosTransferenciaPendiente',change.doc.data());
                        this.$store.commit('setBalanceZona',nuevosaldo)
                        this.$f7.dialog.close();
                        // this.transaccionService.elminiarTransaccion(idad,change.doc.data().idEmpresa_cobrador);
                        //Cambiamos el estado a cancelado

                        // this.estado_transaccion='success'
                        });
                  });
        
                   console.log("Changed: ", change.doc.data());
                
               
              
                console.log("Modified city: ", change.doc.data());
                }
                    
            }
            if (change.type === "removed") {
                 
            }
        });
    });
},


    
    onDetectarTransacciones(){
        let idCobrador=localStorage.getItem('uid');
        let idad=localStorage.getItem("iad");
        let idempresa=localStorage.getItem("empresa");
        let idzona=localStorage.getItem("zona");
    
   

        this.onDetectarTransaccionesCanceladas(idCobrador,idad,idempresa,idzona);
        this.onDetectarTransaccionesEmpresa(idCobrador,idad,idempresa,idzona);

        let transferencia= db.collection("usuarios").doc(this.idad).collection("empresas").doc(idempresa).collection('Transferencias')
      transferencia.where("estado_transaccion", "==", 1)
      transferencia.where("transaccion_nueva", "==", true)
      transferencia.where("idCobrador_recibe", "==", idzona)
      .onSnapshot((snapshot)=> {
        
          let contador=0;
          let mensaje=false;
             let idTransacciones=[];
        
          snapshot.docs.forEach(element => {
         idTransacciones.push(element.id);
      });
            // console.log();
        snapshot.docChanges().forEach((change)=> {
            
            if (change.type === "added") {
               

                 
                
                // this.$store.commit('setAumentaContadorTransferencias');
                // this.$store.commit('setDatosTransferencia',change.doc.data());
                // this.$store.commit('setDatosTransferenciaPendientes',change.doc.data());
                console.log(change.doc);
                    if(change.doc.data().estado_transaccion==1){
                        if(snapshot.docs.length>=1 && mensaje==false){
                    this.$f7.dialog.alert(`Tienes ${snapshot.docs.length} transferencias nuevas aprobadas de zona!`,'Atencion!');
                    mensaje=true
                }
                //  this.$f7.dialog.alert('Tienes '+(contador+1)+' transferencia nueva aprobada de zona!','Atencion!');
                    
                 let data_transacciones={
                  id:change.doc.id,
                  data:change.doc.data()
                }
              
                 this.$store.commit('setDatosTransferenciaPendientes',data_transacciones);
                // console.log(data_transacciones);
                this.$store.commit('setAumentaContadorTransferencias');
                this.$store.commit('setDatosTransferencia',data_transacciones);
               
                }
               
                

                console.log("New: ", change.doc.data());
            }
            if (change.type === "modified") {
                

                 console.log("Changed: ", change.doc.data());
                 console.log(change.doc);
                    if(change.doc.data().estado_transaccion==1 && change.doc.data().transaccion_nueva==true){
                 
                    if(snapshot.docs.length>=1 && mensaje==false){
                    this.$f7.dialog.alert(`Tienes ${snapshot.docs.length} transferencias nuevas aprobadas de zona!`,'Atencion!');
                    mensaje=true
                }
                 let data_transacciones={
                  id:change.doc.id,
                  data:change.doc.data()
                }
              
                 this.$store.commit('setDatosTransferenciaPendientes',data_transacciones);
                // console.log(data_transacciones);
                this.$store.commit('setAumentaContadorTransferencias');
                this.$store.commit('setDatosTransferencia',data_transacciones);
               
                
                }
                else {
                    
                }
                    
            }
            if (change.type === "removed") {
                 
            }
        });
    });
        // this.onDetectarTransaccionNuevas(idCobrador,idad,idempresa,idzona);
        // this.onDetectarTransaccionesNuevasAprobadas(idCobrador,idad,idempresa,idzona);

      },
    },
    created() {
        // Acceder a datos almacenados
        this.ClientesCobradoresService = new ClientesCobradoresService();
        this.CobradoresService = new CobradoresService();
        this.empresaService = new EmpresaService(); 
        this.transaccionService = new TransaccionService(); 
    },
    beforeCreate() {
        this.uid = localStorage.getItem("uid");

    }
}
</script>