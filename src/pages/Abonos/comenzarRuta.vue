<template>
<f7-page name="Abono">
  <f7-navbar   :sliding="false">
     <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
    <f7-nav-right>
      <f7-link class="searchbar-enable" data-searchbar=".searchbar-ruta" icon-ios="f7:search" icon-aurora="f7:search" icon-md="material:search"></f7-link>
    </f7-nav-right>
    <f7-searchbar
      expandable
      class="searchbar-ruta"
      search-container=".search-list-ruta"
      search-in=".item-subtitle"
      :disable-button="!$theme.aurora"
      placeholder="Buscar por cedula..."
    ></f7-searchbar>
     <!-- <f7-nav-title sliding>Abonos</f7-nav-title>
      <f7-nav-title-large>Abonos</f7-nav-title-large> -->
  </f7-navbar>

  <f7-list class="searchbar-not-found">
    <f7-list-item title="Cliente no encontrado."></f7-list-item>
    <f7-row>
        
    <f7-col>
        <!-- {{[0]}} -->
        <!-- {{jornada_cobrador}} -->
      
      <f7-button fill large small href="/cliente_nuevo/" color="green">NUEVO CLIENTE</f7-button>
    </f7-col>
    </f7-row>
  </f7-list>
     <div v-if="!this.isComienzoRuta" > 
         <f7-block  inset>
            <f7-row>
            <f7-col lg="12" md="12">
                <f7-button fill  :disabled="ruta_terminada" @click="onGenerarListaJornadaPago">Comenzar<f7-icon material="swap_vert"></f7-icon></f7-button>
            </f7-col>
            </f7-row>
            </f7-block>
             <f7-block>
               <div v-if="estado_lista_prestamos_clientes"> <f7-card>
          <f7-card-content>
            <f7-card>
          <f7-card-content>
          Cobros realizados hoy: {{getCantidadCobrosEfectivos}}<br>
          Cobros no realizados hoy: {{getCantidadCobrosNoRealizados}}<br>
          Cobros Pendientes: {{getCatidadCobrosPendientes}}<br>
          Balance inicial de la zona: {{this.balance_zona}}<br>
          Balance final de la zona: {{getBalanceFinal}}<br>
          Total dinero recogido hoy: ${{getTotalCobros}}
          </f7-card-content>
          <f7-row v-if="!ruta_terminada">
          <f7-col md="12">
              <f7-list >
                <f7-list-input
              outline
              floating-label
              label="Dinero fisico"
              type="text"
              placeholder="Por favor ingrese el saldo."
              required
              validate
              pattern="[0-9]*"
              error-message="Solo numeros"
              @input="jornada_cobrador.balance_final_manual=$event.target.value"
            ></f7-list-input>
            <f7-button large :disabled="ruta_terminada" @click="onConfirmarJornada" >CONFIRMAR</f7-button>
                </f7-list>
                
          </f7-col>
          
        </f7-row>
        </f7-card>
          </f7-card-content>
         </f7-card></div>
             </f7-block>
     </div>
      <div v-else>
          <div v-if="clientes.length!=0 ">
            <!-- <f7-block inset>
              <f7-row>
        <f7-col>
                    <f7-button  sortable-toggle=".sortable"  fill  color="blue" @click="cambiarEstadoLista" :text="txt_ordenar?'GUARDAR':'ORDENAR'"></f7-button>
                </f7-col>
         </f7-row>
         </f7-block> -->
         <f7-block>
       <!-- {{posiciones_lista_ordenada}} -->
          
         <f7-block-title >Clientes</f7-block-title>
       <!-- :link="`/cliente_detalles/${cliente.id}/`" -->
        <f7-list  class="search-list-ruta searchbar-found">
                  
<!-- :after="`${cliente.data.prestamos.length==0 || cliente.data.prestamos==undefined? 'NA':Number(cliente.data.prestamos[0].dias_con_mora)>=1?'Mora: '+Number(cliente.data.prestamos[0].dias_con_mora)+' dia':'Mora: '+Number(cliente.data.prestamos[0].dias_con_mora)+' dias'}`"  -->
<!-- {'pendiente':cliente.data.prestamos[0].estado_pago_ruta==3,'normal':cliente.data.prestamos[0].estado_pago_ruta==0,'pago':cliente.data.prestamos[0].estado_pago_ruta==1,'no-pago':cliente.data.prestamos[0].estado_pago_ruta==2 -->
        <f7-list-item  
        media-list
        swipeout  
        :disabled="!cliente.data.activo" 
        v-for="(cliente,index,key) in getTodosClientesPrestamo"
       
        :badge="`${cliente.data.prestamos.length==0 || cliente.data.prestamos==undefined? 'NA':Number(cliente.data.prestamos[0].dias_con_mora)>=1?'Mora: '+Number(cliente.data.prestamos[0].dias_con_mora)+' dia':'Mora: '+Number(cliente.data.prestamos[0].dias_con_mora)+' dias'}`"
        :badge-color="`${cliente.data.prestamos.length==0 || cliente.data.prestamos==undefined? 'NA':Number(cliente.data.prestamos[0].dias_con_mora)>=1?'red':''}`"
        :class="{'pendiente':cliente.data.prestamos[0].estado_pendiente_prestamo_ruta,'normal':cliente.data.prestamos[0].estado_pago_ruta==0,'pago':getEstadosPrestamos[index].pago,'no-pago':getEstadosPrestamos[index].nopago}"  
        :subtitle="`Cedula: ${cliente.data.usuario.identificacion}`"   
        :id=cliente.data.id
        :key=key
        :title="`${cliente.data.usuario.nombre}-${cliente.data.usuario.apellido}`" 
        :footer="`${calculoTotalPagoHoy[index]!=undefined ? 'Saldo pago hoy: '+calculoTotalPagoHoy[index]:'NA'}`"  
        @click="onClickClientePaginaDetalles(cliente.data.id,calculoTotalPagoHoy[index])"
        >
        <f7-swipeout-actions right>
        <!-- <f7-swipeout-button close overswipe color="green" @click="onReply(cliente,cliente.data.usuario.nombre+cliente.data.usuario.apellido)">Seleccionar</f7-swipeout-button> -->
        <f7-swipeout-button close color="blue" @click="onCobroPendiente(cliente)">Pendiente</f7-swipeout-button>
        <f7-swipeout-button confirm-text="Desea eliminar este cliente de la lista!" confirm-title="Seguro!" color="red" delete>Eliminar</f7-swipeout-button>
        </f7-swipeout-actions>
        
        </f7-list-item>
        </f7-list>
        </f7-block>
        <f7-block>
        <f7-row>
        <f7-col>
            <f7-button  fill color="red" @click="onCerrarRuta">Terminar Ruta <f7-icon material="cancel"></f7-icon></f7-button>
        </f7-col>
         </f7-row>
        </f7-block>
      </div>
            <div v-else>
       <f7-block  inset>
         <f7-card>
          <f7-card-content>
        "No hay clientes con prestamo para hoy"
          </f7-card-content>
         </f7-card>

</f7-block>
</div>
</div>

    <f7-sheet class="mensaje_final-sheet" :opened="sheetOpened" @sheet:closed="sheetOpened = false">
      <f7-toolbar>
        <div class="left" style="margin-left:12px">Informe final de ruta</div>
        <div class="right">
          <f7-link sheet-close>Cerrar</f7-link>
        </div>
      </f7-toolbar>
      <!-- Scrollable sheet content -->
      <f7-page-content>
   
        
       
        
        

        
      </f7-page-content>
    </f7-sheet>

</f7-page>
</template>



<script>
import AbonoService from '../Services/AbonoServices.js';
import CobradorService from '../Services/CobradoresServices.js';
import ClientesService from '../Services/ClientesService.js';

export default {
  data() {
    return {
    // estado_peniente:false,
    ruta_terminada:false,
    sheetOpened: false,
    posiciones_lista_ordenada:[],
    estado_lista_prestamos_clientes:false,
    color_bedge:'',
    jornada_cobrador:{
      balance_final_manual:0
    },
      numero_clientes:0,
      corbradorService:null,
      balance_zona:'',
      clientes:[],
      cliente_seleccionado:'',
      txt_ordenar:false,
      isLoadUsers:false,
      isComienzoRuta:false,
      informacion_pago:{
        valor:0,
        // fecha:this.$moment(new Date).format("DD/MM/YYYY"), 
        fecha:new Date().toISOString().slice(0,10), 
        cliente:'',
        estado_abono:true
      },
      contador_dias_pago:0
      
    }
  },
  watch: {
    // UploadClientes(newCliente,oldCliente){
    //   this.clientes=this.$store.getters.getClientes;
    // },
    // isComienzoRuta(newCliente,oldCliente){
    //    this.isComienzoRuta=this.$store.getters.getEstadoRuta
    // }
  },
  beforeMount(){
    this.balance_zona=localStorage.getItem("saldo_zona");
    this.clientes=this.$store.getters.getClientesListaPrestamo;
    this.corbradorService= new CobradorService();
    this.isComienzoRuta=this.$store.getters.getEstadoRuta;
    this.jornada_cobrador=this.$store.getters.getJornadaCobrador;
    
  },
  beforeCreate(){
 
  
  },
  computed: {
    getTotalCobros(){
     return this.$store.getters.getCobrosTotalCobrado
    },
    getCantidadCobrosNoRealizados(){
      return Number(this.$store.getters.getClientesListaPrestamo.length)-Number(this.$store.getters.getCobrosEfectivos)
    },
    getCatidadCobrosPendientes(){
      return this.$store.getters.getCobrosPendientes
    },
    getCantidadCobrosEfectivos(){
      return this.$store.getters.getCobrosEfectivos
    },
    getBalanceFinal(){
      return this.$store.getters.getBalanceFinalZona
    },
    getSaldoBalaceZona(){
        this.balance_zona=localStorage.getItem("saldo_zona");
    },
    getTodosClientesPrestamo(){
      return this.$store.getters.getClientesListaPrestamo
    },
    getEstadosPrestamos(){
      return this.$store.getters.getEstadoPrestamoRuta
    },
     estadoPrestamodia(){
       
     },
    
     diasValoraPago(){
      let valor_apagar=[];
      for (const key in this.clientes) {
        if (this.clientes.hasOwnProperty(key)) {
          const element = this.clientes[key];
          if(element.data.prestamos.length>0){
          element.data.prestamos.forEach(elementP => {
             valor_apagar.push(elementP.total_apagar);
          });
          }
         
         
        }
      }
      return valor_apagar;
    },
     clientesConPrestamo(){
       let element=this.clientes.filter(x =>x.data.prestamos.length>0 && x.data.prestamos[0].estado_prestamo!=true);
       if(element){
         this.numero_clientes=Number(this.numero_clientes)+1; 
       }
        
       return element;
    },
     calculoTotalPagoHoy(){
      //  console.log(this.$store.getters.getSaldoApagarHoy);
      return this.$store.getters.getSaldoApagarHoy;
       
    }
  },
  methods:{
    onCobroPendiente(cliente){
      // alert('pendiente');
      console.log(cliente);
       let data_pendiente={
            id: cliente.data.id,
            pagopendiente:true
          };
      this.$store.commit('setEstadoPrestamoPendiente',data_pendiente);
      this.$f7.dialog.alert('Marcado como pendiente','Correcto');
      this.$store.commit('cobroClientePendiente',cliente);
     
    // this.onCambiarEstadoRuta();
   
  },
    onClickClientePaginaDetalles(clienteId,saldoAPagar){
      console.log(clienteId,saldoAPagar);
      this.$f7router.navigate('/abonos_detalle/'+clienteId+'/'+saldoAPagar);
    },
    cambiarEstadoLista(){
     
    },
    onSort(data) {
      
      // let data_posicion={
      //   cliente_id:data.el.id,
      //   from:data.from,
      //   to:data.to
      // }
      // let data_values= Object.values(data_posicion);
      //  console.log(data_values);

      //  data_values.forEach(element => {
        
      //  });
      // console.log(this.posiciones_lista_ordenada.filter(x=>x.cliente_id==data.el.id).length);
      // if(this.posiciones_lista_ordenada.filter(x=>x.cliente_id==data.el.id).length>0){
      //   let element= this.posiciones_lista_ordenada.filterIndex(x=>x.cliente_id==data.el.id);
      //   this.posiciones_lista_ordenada[element].to=data.to;
      // }else{
      //   this.posiciones_lista_ordenada.push(data_posicion);
      // }
      
    },
    onConfirmarJornada(){
      if(this.jornada_cobrador.balance_final_manual==this.$store.getters.getCobrosTotalCobrado){
          let guardando= this.$f7.dialog.preloader('Guardando...');
       let ui_cobrador=localStorage.getItem("uid");
      let id_admin=localStorage.getItem("iad");
      let id_jornadacobrador=localStorage.getItem("idjornadacobrador");
      let id_empresa=localStorage.getItem("empresa");
      this.jornada_cobrador.balance_final=localStorage.getItem("saldo_zona");
      this.corbradorService.actualizarJornadaCobrador(id_admin,id_empresa,ui_cobrador,id_jornadacobrador,this.jornada_cobrador).then(response =>{
                this.$f7.dialog.close();
              this.$f7.dialog.alert('Jornada cerrada correctamente!','Correcto',()=>{
                setTimeout(()=>{
                  this.ruta_terminada=true
                  // this.$f7.sheet.close('.mensaje_final-sheet');
                  this.$f7.dialog.close();
                  // guardando.close();
                },2000)
              });
             }).catch(error =>{
                console.log(error);
             })
      }else{
        this.$f7.dialog.alert('Los valores no corresponden, por favor verifique','Atencion!');
      }
   

    },
    onCerrarRuta(){
       const app = this.$f7;
        // app.dialog.alert(id);
        console.log(this.$store.getters.getCobrosPendientes);
        if(this.$store.getters.getCobrosPendientes>0){
          app.dialog.confirm('Hay cobros pendientes','Atencion');
         
        }
        else{
           app.dialog.confirm('Seguro desea terminar la ruta!','Terminar ruta', () => {
        
          this.$store.commit('sethoraFinalJornada',this.$moment(new Date).format("hh:mm:ss"));
          this.$store.commit('setfechaFinalJornada',new Date().toISOString().slice(0,10));
          this.$store.commit('setEstadoRuta',false);

          this.isComienzoRuta=false;
          // this.$f7.sheet.open('.mensaje_final-sheet');
        
        });

          
        }

    },
    onGenerarListaJornadaPago(){
        const self = this;
        let id_empresa=localStorage.getItem("empresa");
        self.$f7.dialog.preloader('Creando lista...');
        this.$store.commit('setfechInicialJornada',new Date().toISOString().slice(0,10));
        this.$store.commit('sethoraInicialJornada',this.$moment(new Date).format("hh:mm:ss"));
         let ui_cobrador=localStorage.getItem("uid");
         let id_admin=localStorage.getItem("iad");
             this.corbradorService.guardarJornadaCobrador(id_admin,id_empresa,ui_cobrador,this.jornada_cobrador).then(response =>{
                 console.log("................response",response);
                 this.isComienzoRuta=true;
                 this.estado_lista_prestamos_clientes=true;
                 localStorage.setItem("idjornadacobrador",response.data.id);
                 this.$store.commit('setEstadoRuta',true);
                 self.$f7.dialog.close();
             }).catch(error =>{
                console.log(error);
             })
    }
}
}
</script>

<style lang="less">
.pago{
  border-left: 5px solid green
}

.no-pago{
   border-left: 5px solid red
}

.pendiente{
   border-left: 5px solid blue
}
.normal{
  border:0px
}
</style>