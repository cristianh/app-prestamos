<template>
   <f7-page name="Cobros">
    <f7-navbar >
        <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Modificar Abono</f7-nav-title>
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
        @click="onClickClientePaginaDetalles(cobros)"
         
        >
        <!-- confirm-text="Desea eliminar este cliente de la lista!" confirm-title="Seguro!" -->
        <f7-swipeout-actions right>
        <!-- <f7-swipeout-button close overswipe color="green" @click="onReply(cliente,cliente.data.usuario.nombre+cliente.data.usuario.apellido)">Seleccionar</f7-swipeout-button> -->
        <!-- <f7-swipeout-button @click="onOpenModalEditCobro(cobros)" color="blue" >Editar</f7-swipeout-button> -->
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
    <f7-popup class="demo-popup" :opened="popupOpened" @popup:closed="popupOpened = false">
      <f7-page>
        <f7-navbar title="Editar cobro">
          <f7-nav-right>
            <f7-link popup-close>Cerrar</f7-link>
          </f7-nav-right>
        </f7-navbar>
        <f7-block>
            
            
            Nombre: {{infocobroseleccionado.cliente_nombre}} {{infocobroseleccionado.cliente_apellido}}<br>
            Cedula: {{infocobroseleccionado.cliente_cedula}}<br>
            Hora: {{infocobroseleccionado.hora}}<br>
            Fecha:{{infocobroseleccionado.fecha}}<br>
            Saldo actual:{{infocobroseleccionado.valor_pago}}<br>

            <f7-block-title>Fomulario</f7-block-title>
<!-- {{historico_gastos}} -->
    <f7-list no-hairlines-md inset>
         <!-- :onValidate=onValidatedInput -->
        <f7-list-input
        outline
        floating-label
        label="Valor"
        type="text"
        placeholder="valor"
        
        validate
        pattern="[0-9.\s]+"
        error-message="Solo numeros"
        :value=valorform
        @input="valorform=$event.target.value"
       
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
        type="text"
        label="Hora"
        :value=horaform
        @input="horaform=$event.target.value"
        disabled
      ></f7-list-input>
       <f7-list-input
        outline
        floating-label
        type="date"
        label="fecha"
        :value="fechaform"
        @input="fechaform=$event.target.value"
        disabled
      ></f7-list-input>

    </f7-list>


            <f7-row>
    <f7-col>
      <f7-button fill  @click="onEditarCobros" color="green">ACTUALIZAR</f7-button>
    </f7-col>
            </f7-row>
        </f7-block>
      </f7-page>
    </f7-popup>
   </f7-page>
</template>

<script>
import AbonoService from '../Services/AbonoServices.js';
import ClientesService from '../Services/ClientesService.js';
import CobradorService from '../Services/CobradoresServices.js';

export default {
    data() {
        return {
            datastorage:{},
            lista_cobros_hoy:[],
            clientesservice:null,
            popupOpened:false,
            infocobroseleccionado:{},
            fechaform:'',
            horaform:'',
            valorform:'',
            balance_zona:''
        }
    },
    computed: {
       
    },
    created() {
        this.clientesservice= new ClientesService()
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
        batch.commit().then(() => {
            // ...
           
        });
    },
        onOpenModalEditCobro(cobro){
           
            this.infocobroseleccionado=cobro;
            // this.valorform=
            this.horaform=this.infocobroseleccionado.hora
            this.fechaform=this.infocobroseleccionado.fecha
            this.fechaform=new Date(this.fechaform).toISOString().slice(0,10)
            this.infocobroseleccionado.editado=true; 
            this.$f7.popup.open('.demo-popup');
        },
        onClickClientePaginaDetalles(clienteId){
         console.log(clienteId);
    //   this.$f7router.navigate(`/cliente_detalles/${clienteId}/`);
        }, 
         onDescuentaSaldoZona(){
       
       let saldo_actual=  localStorage.getItem("saldo_zona");
       console.log(saldo_actual)
      
       let saldoactualizado;
      //  let descuentosaldozona;
       console.log(this.infocobroseleccionado.valor_pago)
       console.log(Number(this.valorform.replace('.','')))
       saldoactualizado=Number(saldo_actual)-Number(this.infocobroseleccionado.valor_pago)
      //  if(Number(this.valorform.replace('.',''))>=Number(this.infocobroseleccionado.valor_pago)){
      //      saldoactualizado=Number(this.valorform.replace('.',''))+Number(this.infocobroseleccionado.valor_pago);
      //      descuentosaldozona=Number(saldo_actual)+Number(saldoactualizado);
      //      console.log(descuentosaldozona);
      //      console.log(saldoactualizado);
      //  }else{
      //      saldoactualizado=Number(this.infocobroseleccionado.valor_pago)-Number(this.valorform.replace('.',''));
      //      descuentosaldozona=Number(saldo_actual)-Number(saldoactualizado);
      //      console.log(descuentosaldozona);
      //      console.log(saldoactualizado);
      //  }
       
       

       let datasetcobrostore={
           id_cobro:this.infocobroseleccionado.cobro_id,
           nuevovalorcobro:saldoactualizado
       }

      
      
       this.$store.commit('setBalanceZona',Number(saldoactualizado));
       this.$store.commit('setEditCobrosHoy',datasetcobrostore);
       this.$store.commit('setbalance_finalJornada',Number(saldoactualizado));
       this.balance_zona= localStorage.getItem("saldo_zona");
    //    his.$f7router.back();
        // this.$f7.popup.close()
        // this.onActualizarPrestamos(saldoactualizado)
        this.updateValor()
       
        }, 
        onEditarCobros(){
    //    this.$f7.dialog.preloader('Actualizando cobro...');
    //    let zona= localStorage.getItem("zona");
    //    let empresa= this.datastorage.empresa
    //    let ui_cobrador=this.datastorage.uid
    //    let idad=this.datastorage.iad

    // //    this.infocobroseleccionado.valor_pago=this.valorform.replace('.','')
    //    this.infocobroseleccionado.fecha=this.$moment(this.fechaform).format("MM-DD-YYYY")
    //    this.infocobroseleccionado.hora=this.horaform


    //     let editarcobrostore=  localStorage.getItem("saldo_zona");

    //    this.clientesservice.actualizarClienteCobro(idad,empresa,ui_cobrador,this.infocobroseleccionado.cobro_id,this.infocobroseleccionado).then( (response) =>  {
    //         console.log(response.data);
    //         this.$f7.dialog.close();
    //          this.$f7.dialog.alert('Cobro actualizado','Atencion!')
    //          this.onDescuentaSaldoZona()
    //         //       this.informacion_pago.valor_pago=0;  
    //         //       this.valor_sin_puntos=0;  
    //         //         this.$f7.sheet.close();
    //         //   this.$f7.dialog.close();
              
    //         //   this.$store.commit('setDisminuyeContadorClientesListaPrestamos');
    //         //   // this.$f7router.back();
    //         //   this.clientesService.eliminarPrestamoPago(this.idad,idempresa,ui_cobrador,this.id,elemento).then( (response) =>  {
    //         //     this.$store.commit('eliminarClientePrestamoDiario',this.id);
    //         //         this.$f7router.back();
    //         //       });
    // });





        }, 
     onEliminarCobro(cobro){
       this.$f7.dialog.preloader('Eliminando cobro...');
       this.infocobroseleccionado=cobro;
       let zona= localStorage.getItem("zona");
       let empresa= this.datastorage.empresa
       let ui_cobrador=this.datastorage.uid
       let idad=this.datastorage.iad
       let cliente=this.$store.getters.getClientesCobros.find(x => x.data.prestamos[0].cliente ==this.infocobroseleccionado.cliente_id)
      console.log(this.$store.getters.getEstadoPrestamoAntesCobro);
       let prestamoestadoinicial=this.$store.getters.getEstadoPrestamoAntesCobro.find(x => x.cliente ==this.infocobroseleccionado.cliente_id)
       console.log(cliente)
       console.log(prestamoestadoinicial)
       cliente.data.prestamos[0]=prestamoestadoinicial

      
    this.clientesservice.eliminarClienteCobro(idad,empresa,ui_cobrador,this.infocobroseleccionado.cobro_id).then( (response) =>  {
      console.log(response.data)
      this.$f7.dialog.close();
      this.$f7.dialog.alert('Cobro eliminado','Atencion!')

      
       
       let estados=JSON.parse(localStorage.getItem('ListaEstadosCobro'))
       console.log(estados);
      //  let posicion = this.$store.getters.getClientesCobros.findIndex(x => x.data.id == this.id);
       let posicion = estados.findIndex(x => x.id == this.infocobroseleccionado.cliente_id);
       console.log(posicion);
       estados[posicion].estado= 0
       localStorage.setItem('ListaEstadosCobro',JSON.stringify(estados))

       let data_estado_ruta={
                      id: this.infocobroseleccionado.cliente_id,
                      estadopagoruta:0
        };
      //  this.$store.commit('setEstadoPrestamoRutaPago',data_estado_ruta);
         let dataTotalAPagarHoy={
            Idcliente: this.infocobroseleccionado.cliente_id,
            pagototalhoy:Number(this.infocobroseleccionado.valor_pago)
          };
      this.$store.commit('setEstadoTotalAPagar',dataTotalAPagarHoy);

      // this.$store.getters.getSaldosPagoDia

      this.$store.commit('SetReiniciarEstadoClientesPrestamos',data_estado_ruta)
      // this.$store.commit('setEstadosInicialesRutaClientesPrestamo')
      
                    // console.log(posicion);
                    
        // this.$store.commit('SetEliminarClientesPrestamos',posicion);

        this.clientesservice.actualizarClienteCobrador(idad,empresa,ui_cobrador,this.infocobroseleccionado.cliente_id,cliente.data).then( (response) =>  {
            console.log(response.data)

            
            this.onDescuentaSaldoZona()
              //     this.informacion_pago.valor_pago=0;  
              //     this.valor_sin_puntos=0;  
              //       this.$f7.sheet.close();
              // this.$f7.dialog.close();
              
              // this.$store.commit('setDisminuyeContadorClientesListaPrestamos');
              // // this.$f7router.back();
              // this.clientesService.eliminarPrestamoPago(this.idad,idempresa,ui_cobrador,this.id,elemento).then( (response) =>  {
              //   this.$store.commit('eliminarClientePrestamoDiario',this.id);
              //       this.$f7router.back();
              //     });
      });
     })
            
    },
    onActualizarPrestamos(saldonuevo){
       let zona= localStorage.getItem("zona");
       let empresa= this.datastorage.empresa
       let ui_cobrador=this.datastorage.uid
       let idad=this.datastorage.iad

      //  id_admin, id_empresa, id_cobrador, id_cliente, data

        let cliente=this.$store.getters.getClientesCobros.find(x => x.data.prestamos[0].cliente ==this.infocobroseleccionado.cliente_id)
    console.log(cliente);
    let saldopendiente=Number(cliente.data.prestamos[0].saldo_pendiente)
      saldopendiente=Number(saldopendiente)-Number(saldonuevo)
    let totalapagar=Number(cliente.data.prestamos[0].total_pagar)
      totalapagar=Number(totalapagar)-Number(saldonuevo)

      cliente.data.prestamos[0].saldo_pendiente=saldopendiente
      cliente.data.prestamos[0].total_pagar=totalapagar
    
    this.clientesservice.actualizarClienteCobrador(idad,empresa,ui_cobrador,this.infocobroseleccionado.cliente_id,cliente.data).then( (response) =>  {
            
              //     this.informacion_pago.valor_pago=0;  
              //     this.valor_sin_puntos=0;  
              //       this.$f7.sheet.close();
              // this.$f7.dialog.close();
              
              // this.$store.commit('setDisminuyeContadorClientesListaPrestamos');
              // // this.$f7router.back();
              // this.clientesService.eliminarPrestamoPago(this.idad,idempresa,ui_cobrador,this.id,elemento).then( (response) =>  {
              //   this.$store.commit('eliminarClientePrestamoDiario',this.id);
              //       this.$f7router.back();
              //     });
    });
    
    },
    onActualizarBalanceEmpresa(saldo_nuevo){
        
       let zona= localStorage.getItem("zona");
       let empresa= this.datastorage.empresa
       let ui_cobrador=this.datastorage.uid
       let idad=this.datastorage.iad
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
    let localstoragedata=localStorage.getItem('datainfologin')
      if(localstoragedata==null){
          this.$store.watch(() => this.$store.getters.getDatasStorage, datainfo => { 
        console.log("datastores",this.$store.getters.getDatasStorage)
        // console.log('watched: ', EstadosCobrosGuardados) 
       this.datastorage=datainfo
      //  console.log("datastores",this.data_store)
    //    this.idad=this.datastorage.iad
       
      })
      }else{
      
      this.datastorage=JSON.parse(localstoragedata)
      console.log("datastores",this.datastorage)
    //    this.idad=this.datastorage.iad
    }
    this.$store.watch(() => this.$store.getters.getCobrosHoy, CobrosHoy => { 
        // console.log('watched: ', EstadosCobrosGuardados) 
        this.lista_cobros_hoy=CobrosHoy
    })
    //  this.lista_cobros_hoy= this.$store.getters.getCobrosHoy     
    } 
}
</script>