<template>
<f7-page name="Abono">
  <f7-navbar   :sliding="false">
     <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
        <f7-nav-title sliding>Ruta</f7-nav-title>
      </f7-nav-left>
    <f7-nav-right>
      <!-- <f7-link class="searchbar-enable" data-searchbar=".searchbar-ruta" icon-ios="f7:search" icon-aurora="f7:search" icon-md="material:search"></f7-link> -->
    </f7-nav-right>
    <!-- <f7-searchbar
      expandable
      class="searchbar-ruta"
      search-container=".search-list-ruta"
      search-in=".item-subtitle"
      :disable-button="!$theme.aurora"
      placeholder="Buscar por cedula..."
    ></f7-searchbar> -->
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
                <f7-button fill  :disabled="btn_comenzar_ruta" @click="onGenerarListaJornadaPago">Comenzar<f7-icon material="swap_vert"></f7-icon></f7-button>
            </f7-col>
            </f7-row>
            </f7-block>
            
               <div v-if="estado_lista_prestamos_clientes"> <f7-card>
          <f7-card-content>
           <!-- Final:{{getBalanceFinal}}
           Realizados hoy p:{{getPrestamosRealiozadoshoy}}
           Total cobros:{{getTotalCobros}} -->
          Cobros pagos: {{getCantidadCobrosEfectivos}}<br>
          Cobros no pagos: {{getCantidadCobrosNoRealizados}}<br>
          <!-- Cobros pendientes: {{getCatidadCobrosPendientes}}<br> -->
          Balance inicial de la zona: {{this.balance_zona|currency}}<br>
          Total Prestado: {{getPrestamosRealiozadoshoy|currency}}<br>
          Balance final de la zona: {{getBalanceFinal!=0?Number(getBalanceFinal)+Number(getPrestamosRealiozadoshoy):Number(this.balance_zona)-Number(getPrestamosRealiozadoshoy)|currency}}<br>
          Total dinero recogido: {{getTotalCobros|currency}} 
          <!-- <f7-block>
         <table border="1">
          <tr>
            <th>
            Cobros pagos
            </th>
             <th>
            Cobros no pagos
            </th>
             <th>
            Balance inicial de la zona
            </th>
             <th>
               Total Prestado
            </th>
             <th>
              Balance final de la zona
            </th>
             <th>
             Total dinero recogido
            </th>
            <tr>
           <tr>
            <td>
              {{getCantidadCobrosEfectivos}}
              </td>
              <td>
                {{getCantidadCobrosNoRealizados}}
              </td>
              <td>
                {{this.balance_zona|currency}}
                </td>
                <td>
                  {{getPrestamosRealiozadoshoy|currency}}
                  </td>
                <td>
                  {{getBalanceFinal!=0?Number(getBalanceFinal)+Number(getPrestamosRealiozadoshoy)+Number(getTotalCobros):Number(this.balance_zona)-Number(getPrestamosRealiozadoshoy)|currency}}
                  </td>
                  <td>
                    {{getTotalCobros|currency}}
                    </td>
            </tr>
          
         </table>
         <br>
          </f7-block> -->
    
          <f7-row v-if="!ruta_terminada">
          <f7-col md="12">
              <f7-list >
                <f7-list-input
              outline
              floating-label
              label="Dinero recogido hoy"
              type="text"
              placeholder="Por favor ingrese el dinero recogido hoy."
              required
              :value=jornada_cobrador.balance_final_manual
              validate
              pattern="[0-9.]*"
              error-message="Solo numeros"
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
              @input="jornada_cobrador.balance_final_manual=$event.target.value"
            ></f7-list-input>
            <f7-button large :disabled="btn_ruta_terminada" @click="onConfirmarJornada" >CONFIRMAR</f7-button>
                </f7-list>
                
          </f7-col>
          
        </f7-row>
          
           </f7-card-content>
         </f7-card></div>
             
     </div>
      <div v-else>
          <!-- {{getTodosClientesPrestamo}} -->
       <!-- {{clientes}} -->
          <div v-if="clientes.length!=0 ">
            <!-- <f7-block inset>
              <f7-row>
        <f7-col>
                    <f7-button  sortable-toggle=".sortable"  fill  color="blue" @click="cambiarEstadoLista" :text="txt_ordenar?'GUARDAR':'ORDENAR'"></f7-button>
                </f7-col>
         </f7-row>
         </f7-block> -->
          <f7-block>
        <f7-row>
        <f7-col>
            <f7-button  fill color="red" @click="onCerrarRuta">Terminar Ruta <f7-icon material="cancel"></f7-icon></f7-button>
        </f7-col>
         </f7-row>
        </f7-block>
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
        :disabled="getEstadoPrestamo[index].estado==1  || getEstadoPrestamo[index].estado==2"
        v-for="(cliente,index,key) in getTodosClientesPrestamo"
       
        :badge="`${cliente.data.prestamos.length==0 || cliente.data.prestamos==undefined? 'NA':Number(cliente.data.prestamos[0].dias_con_mora)>=1?'Mora: '+Number(cliente.data.prestamos[0].dias_con_mora)+' dia':'Mora: '+Number(cliente.data.prestamos[0].dias_con_mora)+' dias'}`"
        :badge-color="`${cliente.data.prestamos.length==0 || cliente.data.prestamos==undefined? 'NA':Number(cliente.data.prestamos[0].dias_con_mora)>=1?'red':''}`"
        :class="{'pago':getEstadoPrestamo[index].estado==1,'no-pago':getEstadoPrestamo[index].estado==2,'pendiente':getEstadoPrestamo[index].estado==3}"
        :subtitle="`Cedula: ${cliente.data.usuario.identificacion}`"   
        :id=cliente.data.id
        :key=key
        :title="`${cliente.data.usuario.nombre}-${cliente.data.usuario.apellido}`" 
        :footer="`${calculoTotalPagoHoy[index]!=undefined ? calculoTotalPagoHoy[index]==0?'Pago':'Saldo a pagar: '+Number(calculoTotalPagoHoy[index]).toLocaleString('es-CO',{style: 'currency',currency: 'COP',minimumSignificantDigits:1}):'NA'}`"  
        @click="onClickClientePaginaDetalles(cliente.data.id,calculoTotalPagoHoy[index])"
        >
        <f7-swipeout-actions right>
        <!-- <f7-swipeout-button close overswipe color="green" @click="onReply(cliente,cliente.data.usuario.nombre+cliente.data.usuario.apellido)">Seleccionar</f7-swipeout-button> -->
        <!-- <f7-swipeout-button close color="blue" >Pendiente</f7-swipeout-button> -->
        <f7-swipeout-button confirm-text="Desea eliminar este cliente de la lista!" confirm-title="Seguro!" color="red" delete>Eliminar</f7-swipeout-button>
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
 <f7-toolbar top >
                <f7-list style="width: 100%;" >
        
        <f7-list-input
        wrap
        type="number"
        placeholder="Buscar por cedula..."
        clear-button
        
        validate
        maxlength=10
        minlength=7
        pattern="[0-9]"
        error-message="Solo numeros"
        @input="busqueda=$event.target.value"
      
      ></f7-list-input>
 </f7-list>
  </f7-toolbar>
</f7-page>
</template>



<script>
import AbonoService from '../Services/AbonoServices.js';
import CobradorService from '../Services/CobradoresServices.js';
import ClientesService from '../Services/ClientesService.js';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ciudadesData from '@/pages/Ciudades/Ciudades.js'


export default {
  components:{
    DataTable,
    Column
  },
  data() {
    return {
      lista_prestamos:[],
      lista_cobros_realizados:[],
      busqueda:'',
    // estado_peniente:false,
    btn_comenzar_ruta:false,
    btn_ruta_terminada:false,
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
      clientesService:null,
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
  created() {
     this.corbradorService= new CobradorService();
     this.clientesService= new ClientesService();
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
    
    this.$store.watch(() => this.$store.getters.getEstadoPrestamoRuta, EstadosCobrosGuardados => { 
        console.log('watched: ', EstadosCobrosGuardados) 
        this.lista_cobros_realizados=EstadosCobrosGuardados
    })
    
    this.balance_zona=localStorage.getItem("saldo_zona");
   
    this.clientes=this.$store.getters.getClientes
    
    this.jornada_cobrador=this.$store.getters.getJornadaCobrador;
    // this.isComienzoRuta=this.$store.getters.getEstadoRuta;
    // alert("inicio ruta",this.isComienzoRuta)
    
    if(Boolean(localStorage.getItem("listagenerada"))==true || localStorage.getItem("listagenerada")=='true' ){
       
    // this.onComenzarFornada()
    let estados=JSON.parse(localStorage.getItem('ListaEstadosCobro'))
        for (const key in estados) {
          if (estados.hasOwnProperty(key)) {
            const element = estados[key];
            if(element.estado==1 || element.estado==2){
              // element.estado==1
              // setAumentaContadorClientesListaPrestamos
              this.$store.commit('setAumentaContadorClientesListaPrestamos');

            }

            
          }
        }
      this.isComienzoRuta=true;
    }else{
      // alert("false",localStorage.getItem("listagenerada"))
      this.isComienzoRuta=false;
    }
    
  },
  beforeCreate(){
   if(Boolean(localStorage.getItem("listagenerada"))==true || localStorage.getItem("listagenerada")=='true' ){
       
    //  alert("true",localStorage.getItem("listagenerada"))
      
      // this.onComenzarFornada()
      this.$store.commit('setEstadoListaCobrosRealizados')
   }
  
  },
  computed: {
     getEstadoPrestamo(){
      // console.log(state.clientes_cobros);
            // let estados = JSON.parse(localStorage.getItem('ListaEstadosCobro'))
            // return estados[data] == 1 ?
            //     'pago' : estados[data] == 2 ?
            //     'no-pago' : estados[data] == 3 ?
            //     'pendiente' : 'normal'
      return this.$store.getters.getEstadoPrestamoRuta
      // 'pendiente'? data.estado_pendiente_prestamo_ruta:
      // 'pago'cliente.data.prestamos[0].estado_pago_prestamo.pago==true,'no-pago':Boolean(cliente.data.prestamos[0].estado_pago_prestamo.nopago)==true}
    },
    getPrestamosRealiozadoshoy(){
      return localStorage.getItem("total_prestado")
    },
    getTotalCobros(){
    //  return localStorage.getItem("total_cobros_realizados")
      return this.$store.getters.getCobrosTotalCobrado  
    },
    getCantidadCobrosNoRealizados(){
     return this.$store.getters.getCobrosNoEfectivos   
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

      let temporarlistaclientesprestamos=this.$store.getters.getClientesListaPrestamo
      console.log("temporarlistaclientesprestamos",temporarlistaclientesprestamos);
      if(this.busqueda==""){
        return this.$store.getters.getClientesListaPrestamo
      }else{
         return temporarlistaclientesprestamos.filter(cliente => {
        return cliente.data.usuario.identificacion.toLowerCase().includes(this.busqueda.toLowerCase())
      //  return 
       }); 
      }
    
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
    onClickClientePaginaDetalles(clienteId,saldoAPagar){
       console.log(this.contadorClientesSeleccionados);
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
      
      console.log("verificamos",Number(this.jornada_cobrador.balance_final_manual.split('.').join(''))==Number(this.$store.getters.getCobrosTotalCobrado));
      if(this.jornada_cobrador.balance_final_manual==""){
        this.$f7.dialog.alert('Debe ingresar el saldo recogido!','Atencion');
      }
      else if(Number(this.jornada_cobrador.balance_final_manual.split('.').join(''))==Number(this.$store.getters.getCobrosTotalCobrado)){
      
      let guardando= this.$f7.dialog.preloader('Guardando...');
      let ui_cobrador=localStorage.getItem("uid");
      let id_admin=localStorage.getItem("iad");
      let id_jornadacobrador=localStorage.getItem("idjornadacobrador");
      let id_empresa=localStorage.getItem("empresa");
      this.jornada_cobrador.balance_final=localStorage.getItem("saldo_zona");
          

      this.jornada_cobrador.balance_final_manual=0
      this.corbradorService.actualizarJornadaCobrador(id_admin,id_empresa,ui_cobrador,id_jornadacobrador,this.jornada_cobrador).then(response =>{
                this.$f7.dialog.close();
              this.$f7.dialog.alert('Jornada cerrada correctamente!','Correcto',()=>{
                setTimeout(()=>{
                  this.ruta_terminada=true
                  
                  // this.$f7.sheet.close('.mensaje_final-sheet');
                  this.$f7.dialog.close();
                  // guardando.close();
                },1200)
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
        let numero_de_clientes_prestamo=this.$store.getters.getContadorClientesPrestamo;
        let numero_de_clientes_prestamos_realizados=this.$store.getters.getContadorListaClientesPrestamo;
        if(this.$store.getters.getCobrosPendientes>0){
          app.dialog.confirm('Hay cobros pendientes','Atencion');
         
        }
        
        else if(numero_de_clientes_prestamos_realizados!=numero_de_clientes_prestamo){
            app.dialog.confirm('Aun quedan cobros por realizar','Atencion!');
        }
        else{
           app.dialog.confirm('Seguro desea terminar la ruta!','Terminar ruta', () => {
        
        axios.get('http://worldtimeapi.org/api/timezone/America/Bogota').then((res)=>{
          this.$store.commit('sethoraFinalJornada',this.$moment(res.datetime).format("hh:mm:ss"));
          this.$store.commit('setfechaFinalJornada',this.$moment(res.datetime).format("MM/DD/YYYY"));
        });
          
          this.$store.commit('setEstadoRuta',false);

          this.isComienzoRuta=false;
          this.ruta_terminada=false;
          this.btn_comenzar_ruta=true;
          this.btn_ruta_terminada=false;
          this.estado_lista_prestamos_clientes=true;
          localStorage.removeItem("listagenerada")
          localStorage.removeItem("listaClientesCobros")
          localStorage.removeItem("ListaEstadosCobro")
          localStorage.removeItem('cobro_pendiente')
          localStorage.removeItem('cobros_efectivos')
          localStorage.removeItem('cobros_nofectivos')
          localStorage.removeItem('total_cobros_realizados')
         
          this.$store.state.estados_prestamos_ruta=[]
          // this.$f7.sheet.open('.mensaje_final-sheet');
        
        });

          
        }

    },
    onGenerarListaJornadaPago(){
        
        localStorage.setItem("listagenerada",true);
        // localStorage.setItem("listaClientesPrestamos",JSON.stringify(this.$store.getters.getClientesListaPrestamo));
        // this.clientes=JSON.parse(localStorage.getItem("listaClientesPrestamos"))
        // this.clientes=this.$store.getters.getClientesListaPrestamo
        
        let id_empresa=localStorage.getItem("empresa");
        this.$f7.dialog.preloader('Creando lista...');
        this.$store.commit('setfechInicialJornada',new Date().toISOString().slice(0,10));
        this.$store.commit('sethoraInicialJornada',this.$moment(new Date).format("hh:mm:ss"));
         let ui_cobrador=localStorage.getItem("uid");
         let id_admin=localStorage.getItem("iad");
        this.corbradorService.guardarJornadaCobrador(id_admin,id_empresa,ui_cobrador,this.jornada_cobrador).then(response =>{
                 console.log("................response",response);
                 this.isComienzoRuta=true;
                 this.btn_ruta_terminada=true;
                  this.btn_comenzar_ruta=true;
                 localStorage.setItem("idjornadacobrador",response.data.id);
                 this.$store.commit('setEstadoRuta',true);
                 this.$f7.dialog.close();
             }).catch(error =>{
                console.log(error);
         })
        // this.onComenzarFornada()

        
    },
    onComenzarFornada(){
        

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

table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  text-align: left;
  padding: 8px;
}

tr:nth-child(even){background-color: #f2f2f2}

th {
  background-color: #4CAF50;
  color: white;
}

@media screen and (max-width: 600px) {
  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }
  
  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  
  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: .625em;
  }
  
  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: .8em;
    text-align: right;
  }
  
  table td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }
  
  table td:last-child {
    border-bottom: 0;
  }
}
</style>