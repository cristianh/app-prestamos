<template>
   <f7-page name="Cobros">
    <f7-navbar >
        <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Eliminar Abono</f7-nav-title>
    </f7-navbar>
    
    
    <f7-block>
        <!-- {{lista_cobros}} -->
        <div v-if="lista_cobros.length>=1">
            {{lista_cobros}}
        <f7-list>
        <f7-list-item  
        media-list
        swipeout  
         
        v-for="(cobros,index,key) in lista_cobros"
        :subtitle=" `Valor:${Number(cobros.valor_pago).toLocaleString('es-CO',{style: 'currency',currency: 'COP',minimumSignificantDigits:1})}`"   
        :id=cobros.cliente_id
        :key=key
        :title="`${cobros.cliente_nombre} ${cobros.cliente_apellido} `" 
        :footer="`Fecha: ${cobros.fecha}`"
         
        >
        <!-- confirm-text="Desea eliminar este cliente de la lista!" confirm-title="Seguro!" -->
        <f7-swipeout-actions right>
        <!-- <f7-swipeout-button close overswipe color="green" @click="onReply(cliente,cliente.data.usuario.nombre+cliente.data.usuario.apellido)">Seleccionar</f7-swipeout-button> -->
        <!-- <f7-swipeout-button @click="onEditarCobros(cobros)" color="blue" >Editar</f7-swipeout-button> -->
        <f7-swipeout-button   @click="onEliminarCobro(cobros)" color="red" close >Eliminar</f7-swipeout-button>
        </f7-swipeout-actions>
        <!-- {{cliente.data.prestamos[0].estado_pago_prestamo.pendiente}} -->
        <!-- {{lista_cobros_realizados[index].estado}} -->
         <!-- {{cliente.data.activo }}
         {{cliente.data.prestamos[0].estado_pago_prestamo.pago}}
         {{cliente.data.prestamos[0].estado_pago_prestamo.nopago}}
         {{cliente.data.prestamos[0].estado_pago_prestamo.pendiente}} -->
        <!-- {{Number(cliente.data.prestamos[0].dias_con_mora)}} -->
        </f7-list-item>
        </f7-list>
        </div>
        <div v-else>
            <f7-block>
                <f7-card
                title="Aun no se han realizado cobros."
                >
                </f7-card>
                
            </f7-block>
        </div>
        <!-- {{lista_cobros}} -->
    </f7-block>
   </f7-page>
</template>

<script>
import AbonoService from '../Services/AbonoServices.js';
import ClientesService from '../Services/ClientesService.js';
import CobradorService from '../Services/CobradoresServices.js';

export default {
    data() {
        return {
            lista_cobros:[],
            clientesservice:null,
            cliente_busqueda:[]
        }
    },
    created() {
        this.clientesservice= new ClientesService()
    },
    
    methods: {
        onEditarCobros(cobros){
       let zona= localStorage.getItem("zona");
       let empresa= localStorage.getItem("empresa");
       let ui_cobrador=localStorage.getItem("uid");
       let idad=localStorage.getItem("iad");





        },
        onDd(){
            alert('borro')
        }, 
        onEliminarCobro(cobro){

                
            this.$f7.dialog.alert('Desesa eliminar este cobro','Seguro!',()=>{
                
                 let zona= localStorage.getItem("zona");
       let empresa= localStorage.getItem("empresa");
       let ui_cobrador=localStorage.getItem("uid");
       let idad=localStorage.getItem("iad");
       let buscarInfoCliente=this.$store.getters.getClientesCobros.find(x=>x.data.id==cobro.cliente_id)
        console.log(buscarInfoCliente.data.estado_pago_prestamo)
      //Pendiente  cambiar el estado de la lista
        if(buscarInfoCliente.data.estado_pago_prestamo.nopago==true){
            this.onReturnEstadoPrestamoNoPago(cobro,buscarInfoCliente)
            
            // buscarInfoCliente.data.prestamos[0].total_apagar=Number(buscarInfoCliente.data.prestamos[0].total_apagar)-Number(saldo)
        }else if(buscarInfoCliente.data.estado_pago_prestamo.pago==true){
            this.onReturnEstadoPrestamoPago(cobro,buscarInfoCliente)
        }
        this.lista_cobros.splice(this.lista_cobros.findIndex(x=>x.cliente_id==cobro.cliente_id),1)
            });

    //         this.clientesService.eliminarClienteCobro(idad,idempresa,ui_cobrador,cobro.cliente.id,cobro.id_cobro,cobro).then( (response) =>  {

    //  })
            
    },
    onReturnEstadoPrestamoNoPago(cobro,buscarInfoCliente){
        console.log(buscarInfoCliente.data)
            let cobrosArrayHoy=JSON.parse(localStorage.getItem('cobros_hoy'))
            let cobrosEstados=JSON.parse(localStorage.getItem('ListaEstadosCobro'))  
            // let posicionCobroInfoArray=cobrosArrayHoy.findIndex(x=>cliente_id==cobro.cliente_id)
            let posicionCobroInfoArray=cobrosArrayHoy.findIndex(x=>x.cliente_id==cobro.cliente_id)
            let posicionCobroEstados=cobrosEstados.findIndex(x=>x.id==cobro.cliente_id)
            console.log(posicionCobroInfoArray)
            cobrosEstados[posicionCobroEstados].estado=0
            cobrosArrayHoy.splice(posicionCobroInfoArray,1)
            localStorage.setItem('cobros_hoy',JSON.stringify(cobrosArrayHoy))
            localStorage.setItem('ListaEstadosCobro',JSON.stringify(cobrosEstados))
            let diasNewMora=Number(buscarInfoCliente.data.prestamos[0].dias_con_mora)-Number(1)
            //seteamos los dias
            let dataCobro={
                id:buscarInfoCliente.data.id,
                dias_mora:diasNewMora

            }
            
            //seteamos el estado del pretamo
            this.$store.commit('setEstadoDiasMora',dataCobro)
            let saldo=Number(this.$store.getters.getBalance)-Number(cobro.valor_pago)
            
            this.$store.commit('setEstadoPrestamoEliminarNoCobro',dataCobro)
            this.$store.commit('setBalanceZona',saldo)
            dataCobro.valor=Number(buscarInfoCliente.data.prestamos[0].total_apagar)-Number(cobro.valor_pago)
            this.$store.commit('setTotalApagarEliminarCobros',dataCobro)
        
    },
    onReturnEstadoPrestamoPago(cobro,buscarInfoCliente){
            //*)Vrificamo si estado pago.
            

        //1) Verificamos el estado pago.
        //Lo cambiamos
         let cobrosListaEstados=JSON.parse(localStorage.getItem('ListaEstadosCobro'))
         let posicionCobroEstados=cobrosListaEstados.findIndex(x=>x.id==cobro.cliente_id)
          let diasNewMora=buscarInfoCliente.data.prestamos[0].dias_con_mora;
        //  reiniciamos el estado y los dias si son 1 y  dias es mayor a
        console.log(cobrosListaEstados[posicionCobroEstados].estado)
        if(cobrosListaEstados[posicionCobroEstados].estado==1 && buscarInfoCliente.data.prestamos[0].dias_con_mora<0){
           diasNewMora=Number(buscarInfoCliente.data.prestamos[0].dias_con_mora)-Number(1)
        }
        console.log(diasNewMora);
         cobrosListaEstados[posicionCobroEstados].estado=0
        //2) lo buscamos en la lista de estado.
        let cobrosArrayHoy=JSON.parse(localStorage.getItem('cobros_hoy')) 
        let posicionCobroInfoArray=cobrosArrayHoy.findIndex(x=>x.cliente_id==cobro.cliente_id)
         console.log(posicionCobroInfoArray)
         //Eliminamos del la lista de los cobros de hoy.
        cobrosArrayHoy.splice(posicionCobroInfoArray,1)

        //3)Restauramos los estados el el localstorage
            localStorage.setItem('cobros_hoy',JSON.stringify(cobrosArrayHoy))
            localStorage.setItem('ListaEstadosCobro',JSON.stringify(cobrosListaEstados))
            //seteamos el estado del pretamo
            let dataCobro={
                id:buscarInfoCliente.data.id,
                dias_mora:diasNewMora
            }

            this.$store.commit('setEstadoDiasMora',dataCobro)

            let saldo=Number(this.$store.getters.getBalance)-Number(cobro.valor_pago)
            let saldo_pendiente=Number(buscarInfoCliente.data.prestamos[0].saldo_pendiente)-Number(cobro.valor_pago)
            //Volvemos el estado normal de la lista de cobros.
            this.$store.commit('setEstadoPrestamoEliminarCobro',dataCobro)
            //Actualizar el balance de la zona.
            this.$store.commit('setBalanceZona',saldo)
            dataCobro.valor=Number(buscarInfoCliente.data.prestamos[0].total_apagar)+Number(cobro.valor_pago)
            this.$store.commit('setTotalApagarEliminarCobros',dataCobro)
            let saldoPendiente={
                id:buscarInfoCliente.data.id,
                saldo_pendiente:saldo_pendiente

            }
            this.$store.commit('setSaldoPendiente',saldoPendiente)
            this.$store.commit('setTotalApagarEliminarCobros',dataCobro)
            //actualizamos el saldo en la db.
            this.onActualizarBalanceEmpresa(saldo)
    },
    onActualizarPrestamos(cliente_cobro_id){
        let zona= localStorage.getItem("zona");
       let empresa= localStorage.getItem("empresa");
       let ui_cobrador=localStorage.getItem("uid");
       let idad=localStorage.getItem("iad");

        let clientes=this.$store.getters.getClientesCobros.findIndex(x => x.data.prestamos[0].cliente ==cliente_cobro_id)

    // this.clientesservice.actualizarClienteCobrador(cobros.cliente.id,idempresa,ui_cobrador,cobros.cliente.id,clientes).then( (response) =>  {
            
            //       this.informacion_pago.valor_pago=0;  
            //       this.valor_sin_puntos=0;  
            //         this.$f7.sheet.close();
            //   this.$f7.dialog.close();
              
            //   this.$store.commit('setDisminuyeContadorClientesListaPrestamos');
            //   // this.$f7router.back();
            //   this.clientesService.eliminarPrestamoPago(this.idad,idempresa,ui_cobrador,this.id,elemento).then( (response) =>  {
            //     this.$store.commit('eliminarClientePrestamoDiario',this.id);
            //         this.$f7router.back();
            //       });
    // });
    },
    onActualizarBalanceEmpresa(saldo_nuevo){
        
       let zona= localStorage.getItem("zona");
       let empresa= localStorage.getItem("empresa");
       let ui_cobrador=localStorage.getItem("uid");
       let idad=localStorage.getItem("iad");
        //        // Get a new write batch
        var batch = db.batch();

        // Update the population of 'SF'
        var sfRef = db.collection("usuarios").doc(idad).collection("empresas").doc(empresa).collection('Zonas').doc(zona);
        batch.update(sfRef, {"balance": saldo_nuevo});



        // Commit the batch
        batch.commit().then(function () {
            // ...
        
        });
    }
    },
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
  },
    computed: {
       
    },
    beforeMount() {
    this.$store.watch(() => this.$store.getters.getCobrosHoy, CobrosHoy => { 
        // console.log('watched: ', EstadosCobrosGuardados) 
        this.lista_cobros=CobrosHoy
    })
    // this.$store.watch(() => this.$store.getters.getNoCobrosHoy, CobrosNoHoy => { 
    //     // console.log('watched: ', EstadosCobrosGuardados) 
    //     this.lista_cobros.push(CobrosNoHoy)
    // })
    //  this.lista_cobros= this.$store.getters.getCobrosHoy     
    } 
}
</script>