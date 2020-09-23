<template>
   <f7-page name="Cobros">
    <f7-navbar >
        <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Cobros realizados</f7-nav-title>
    </f7-navbar>
    
    
    <f7-block>
        <!-- {{lista_cobros_hoy}} -->
        <div v-if="lista_cobros_hoy.length>=1">
        <f7-list>
        <f7-list-item  
        media-list
        swipeout  
         
        v-for="(cobros,index,key) in lista_cobros_hoy"
        :subtitle=" `Valor:${Number(cobros.valor_pago).toLocaleString('es-CO',{style: 'currency',currency: 'COP',minimumSignificantDigits:1})}`"   
        :id=cobros.cliente_id
        :key=key
        :title="`${cobros.cliente_nombre} ${cobros.cliente_apellido} `" 
        :footer="`Fecha: ${cobros.fecha}`"
         
        >
        <!-- confirm-text="Desea eliminar este cliente de la lista!" confirm-title="Seguro!" -->
        <f7-swipeout-actions right>
        <!-- <f7-swipeout-button close overswipe color="green" @click="onReply(cliente,cliente.data.usuario.nombre+cliente.data.usuario.apellido)">Seleccionar</f7-swipeout-button> -->
        <f7-swipeout-button @click="onEditarCobros(cobros)" color="blue" >Editar</f7-swipeout-button>
        <f7-swipeout-button  @click="onEliminarCobro(cobros)" color="red" delete>Eliminar</f7-swipeout-button>
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
        <!-- {{lista_cobros_hoy}} -->
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
            lista_cobros_hoy:[],
            clientesservice:null
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
     onEliminarCobro(cobro){
          let zona= localStorage.getItem("zona");
       let empresa= localStorage.getItem("empresa");
       let ui_cobrador=localStorage.getItem("uid");
       let idad=localStorage.getItem("iad");
    //         this.clientesService.eliminarClienteCobro(idad,idempresa,ui_cobrador,cobro.cliente.id,cobro.id_cobro,cobro).then( (response) =>  {

    //  })
            
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
        this.lista_cobros_hoy=CobrosHoy
    })
    //  this.lista_cobros_hoy= this.$store.getters.getCobrosHoy     
    } 
}
</script>