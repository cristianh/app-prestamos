<template>
<f7-page name="Clientes">
    <f7-navbar :sliding="false">
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Clientes</f7-nav-title>
       <f7-nav-right>
      <!-- <f7-link class="searchbar-enable" data-searchbar=".searchbar-cliente" icon-ios="f7:search" icon-aurora="f7:search" icon-md="material:search"></f7-link> -->
    </f7-nav-right>
    

      <!-- <f7-searchbar
     
      expandable
       class="searchbar-cliente"
      found-el=".searchbar-found"
      searchbar-ignore=".list-ignore"
      search-container=".search-list"
      search-in=".item-text"
      search-item="li"
      :disable-button="!$theme.aurora"
      placeholder="Buscar por cedula..."
    ></f7-searchbar> -->
      <!-- <f7-nav-title-large>Clientes</f7-nav-title-large> -->
    </f7-navbar>
    <!-- <f7-navbar title="Clientes" back-link="Atras">
      
    </f7-navbar> -->
       <!-- <f7-nav-right>
       
      </f7-nav-right> -->
    <f7-block>
      <!-- <pre>{{$store.getters.getContador}}</pre> -->
      <!-- <pre>{{$store.getters.getClientes}}</pre> -->
      <!-- <pre>{{$store.getters.getContadorClientes}}</pre> -->
      
  <f7-row>
   
    <f7-col>
        <!-- {{[0]}} -->
      <f7-button fill large small href="/cliente_nuevo/" color="green">NUEVO CLIENTE</f7-button>
    </f7-col>
     <f7-col>
      
        <f7-button  sortable-toggle=".sortable" fill large small color="blue" @click="onCambiarMensajeOrdenar">{{mensaje_ordenar}}</f7-button>
    </f7-col>

  </f7-row>
</f7-block>

<f7-block>
<div v-if="clientes.length!=0">
  <f7-list class="searchbar-not-found">
    <f7-list-item title="Cliente no encontrado."></f7-list-item>
  </f7-list>
       <!-- <pre>{{getClientesLista}}</pre> -->
        <f7-list  class="search-list searchbar-found" media-list  sortable @sortable:sort="onSort">
          <!-- :link="`/cliente_detalles/${cliente.id}/`" -->
        <f7-list-item swipeout   v-for="(cliente,index,key) in getClientesLista" 
          :id=cliente.id :key="key"  
          :text="`Cedula: ${cliente.data.usuario.identificacion}`" 
          :title="`${cliente.data.usuario.nombre} ${cliente.data.usuario.apellido}`" 
          :subtitle="cliente.data.usuario.direccion1==''?cliente.data.usuario.direccion2:cliente.data.usuario.direccion1" 
        
          :badge="cliente.nuevo?'nuevo':''" 
          :badge-color="cliente.nuevo?'green':''"
          :footer="`${cliente.data.hasOwnProperty('prestamos') && cliente.data.prestamos.length>0?'Prestamo: '+Number(cliente.data.prestamos[0].valor).toLocaleString('es-CO',{style: 'currency',currency: 'COP',minimumSignificantDigits:1}):'Prestamo: NA'}`"
          @click="onClickClientePaginaDetalles(cliente.data.id)">
          <!-- `:after=""Telefono: ${cliente.data.usuario.telefono}` -->
           <f7-swipeout-actions class="list-ignore" right>
             <f7-swipeout-button close color="green" v-if="cliente.data.usuario.telefono!=''" @click="onLlamar(cliente.data.usuario.telefono)">Llamar</f7-swipeout-button>
        <f7-swipeout-button close overswipe color="blue" @click="onSeleccionarCliente(cliente.data.id,cliente.data.usuario.nombre+' '+cliente.data.usuario.apellido)">Prestamo</f7-swipeout-button>
        </f7-swipeout-actions>
         <!-- <f7-link v-if="cliente.data.usuario.telefono" style="margin-left:12px;font-size:14px" external  :href="`tel:${cliente.data.usuario.telefono}`"><f7-icon material="settings_phone"></f7-icon>{{cliente.data.usuario.telefono}}</f7-link> -->
          </f7-list-item>
        </f7-list>
       
</div>
<div v-else>
       <f7-block inset>
         <f7-card
         title=" No hay clientes">
           
         </f7-card>
        
       </f7-block> 
</div>
 </f7-block>
<!-- Swipe to step demo sheet -->
    <f7-sheet
      class="demo-sheet-swipe-to-step"
      style="height:auto; --f7-sheet-bg-color: #fff;"
      swipe-to-close
      swipe-to-step
      backdrop
    >
      <!-- Initial swipe step sheet content -->
      <div class="sheet-modal-swipe-step">
<f7-card>
      <!-- <f7-card-header>
         <f7-list  inset>
                <f7-list-item align="right" title="Saldo zona" :after="balance_zona"><f7-icon ios="f7:local_atm" aurora="f7:local_atm" md="material:local_atm"></f7-icon>
                </f7-list-item>
              </f7-list>
      </f7-card-header> -->
  <f7-card-content>
  <f7-row>
      <f7-col md="12"> 
        <f7-list inset>
            <f7-list-input
        label="Valor:"
        type="text"
        :value="valor_sin_puntos"
        min=0
        placeholder="0"
        clear-button
        @input.capture="valor_sin_puntos=$event.target.value"
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
    label="Plan"
    type="select"
    defaultValue="15/15"
    placeholder="Seleccione..."
    @change="onSelectPlan"
    error-message="Por favor seleccione un plan."
    required
    validate
  >
   <option value="0">Seleccione</option>
  <option  v-for="(planes,index,key) in tazasdeinteres"  :selected="planseleccionado" :key=key :value="`${planes.plazo}-${planes.interes}`">{{planes.nombre}}
  </option>
       </f7-list-input>
        </f7-list>
          <f7-list inset>
          <f7-list-input
          label="Fecha"
          type="date"
          clear-button
          :value="info_prestamo.fecha"
           @input="info_prestamo.fecha=$event.target.value"
           disabled
      >
    </f7-list-input>
 </f7-list>
      </f7-col>
  </f7-row>
  </f7-card-content>
   <f7-card-footer>
    <f7-link>Saldo de la zona</f7-link>
    <f7-link>{{balance_zona|currency}}</f7-link>
  </f7-card-footer>
</f7-card>
        <div class="display-flex padding justify-content-space-between align-items-center">
          <div style="font-size: 18px"><b>Total:</b></div>
          <div style="font-size: 22px"><b><span>$ {{valor_sin_puntos==0?0:valor_sin_puntos}}</span></b></div>
        </div>
        <div class="padding-horizontal padding-bottom">
          <f7-button large fill @click.prevent="onConfirmarPago" >CONFIRMAR</f7-button>
          <!-- <div class="margin-top text-align-center">Swipe up for more details</div> -->
        </div>
      </div>
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
   <!-- Will morph to Toolbar -->
  <!-- <f7-fab position="right-bottom" slot="fixed" morph-to=".toolbar.fab-morph-target">
    <f7-icon ios="f7:search" aurora="f7:search" md="material:search"></f7-icon>
    <f7-icon ios="f7:search" aurora="f7:search" md="material:close"></f7-icon>
  </f7-fab> -->
 </f7-page>
</template>

<script>
import { WhatsApp } from 'vue-socialmedia-share';
import ClientesCobradoresService from '../Services/ClientesService.js';
import AbonoService from '../Services/AbonoServices.js';

// usage in local component


export default {
  components: {
    WhatsApp
  },
    data() {
        return {
            busqueda:'',
            idad:'',
            clientes:[],
            clientes_lista_ordenada:[],
            isLoadUsers:false,
            numero_clientes:0,
            txt_ordenar:false,
            mensaje_ordenar:'ORDENAR',
            posiciones_lista_ordenada:[],
            clientesservices:null,
            total_prestado:0,
            numero_clientes:0,
            planseleccionado:'',
            tazaseleccionada:'',
            tazasdeinteres:[],
            abonoService:null,
            balance_zona:'',
            cliente_seleccionado:'',
            effect:'blink',
            tipo_seleccionado:'',
            info_prestamo:{
              valor:0,
              // fecha:this.$moment(new Date).format("DD/MM/YYYY"), 
              fecha:new Date().toISOString().slice(0,10), 
              cliente:'',
              total_apagar:0,
              plan_seleccionado:'',
              dias_plazo:'',
              dias_con_mora:0,
              estado_prestamo:false,
              saldo_pendiente:0,
              saldo_pago_dia:0
            },
            valor_sin_puntos:0
        }
    },
    watch: {
    UploadClientes(newValue,oldvalue){
  
      this.clientes=this.$store.getters.getClientes;
    }
  },
  created() {
    this.clientesservices =new ClientesCobradoresService();
  },
  computed: {
    getClientesLista(){
      let temporarlistaclientes=this.$store.getters.getOrdenarClientes;
      if(this.busqueda==""){
        return temporarlistaclientes
      }else{
         return temporarlistaclientes.filter(cliente => {
         return cliente.data.usuario.identificacion.toLowerCase().includes(this.busqueda.toLowerCase())
      //  return 
       }); 
      }
      
    
    }
  },
    beforeCreate() {
     
    },
    beforeMount(){
      this.idad=localStorage.getItem("iad");
      this.clientes=this.$store.getters.getOrdenarClientes;
      this.numero_clientes=this.clientes.length;
      if(this.numero_clientes==1){
      this.isLoadUsers=true;
      }
      else{
      this.isLoadUsers=false;
      }
       this.balance_zona=localStorage.getItem("saldo_zona");
    this.abonoService= new AbonoService();
    this.tazasdeinteres=this.$store.getters.getTazaseInteres;
 
    },
    methods: {
      onClickClientePaginaDetalles(clienteId){
      this.$f7router.navigate(`/cliente_detalles/${clienteId}/`);
    },
      onLlamar(telefono){
        window.location.href = "tel:"+telefono;
      },
      onCambiarMensajeOrdenar(){
         this.txt_ordenar=!this.txt_ordenar
        
       if(this.txt_ordenar){
        
        this.mensaje_ordenar='LISTO';
             
      }else{
        this.mensaje_ordenar='ORDENAR';
      }
      },
      onSort(data) {
         let ui_cobrador=localStorage.getItem("uid");
         let id_empresa=localStorage.getItem("empresa");
         
          this.$f7.dialog.preloader('Guardando lista...');
     
          
      
        

        //  Promise.all([updateposicion1, updateposicion2]).then(()=> {
            
        //  });

  
        // Sort data   
        let elemento1=this.clientes[data.to];
        let elemento2=this.clientes[data.from];

        elemento1.data.posicion=data.to;
        elemento2.data.posicion=data.from;
        

        let data_elements={
          elm:{
            id:data.el.id,
            el1:elemento2,
            el2:elemento1
          },
          data:data
        }
      
        this.$store.commit('SetPosicionListaClientes',data_elements);

           let distancia=data.to-data.from;
        
         if(distancia==1){
               // https://us-central1-manifest-life-279516.cloudfunctions.net/actualizarPosicionClienteLista?doc=zEAF3BMDDj9IXGwYOBXO&subdoc=Js46FGqf1w9yvPhjKeJ9
        this.clientesservices.actualizarPosicionCliente(this.idad,id_empresa,ui_cobrador,this.clientes[data.to].data.id,{posicion_inicial:Number(data.from)}).then(()=>{     
           this.clientesservices.actualizarPosicionCliente(this.idad,id_empresa,ui_cobrador,this.clientes[data.from].data.id,{posicion_inicial:Number(data.to)}).then(()=>{
                this.$f7.dialog.close();
           })
        });
         }else{
               // https://us-central1-manifest-life-279516.cloudfunctions.net/actualizarPosicionClienteLista?doc=zEAF3BMDDj9IXGwYOBXO&subdoc=Js46FGqf1w9yvPhjKeJ9
        this.clientesservices.actualizarPosicionCliente(this.idad,id_empresa,ui_cobrador,this.clientes[data.to].data.id,{posicion_inicial:Number(data.from)}).then(()=>{     
           this.clientesservices.actualizarPosicionCliente(this.idad,id_empresa,ui_cobrador,this.clientes[data.from].data.id,{posicion_inicial:Number(data.to)}).then(()=>{
                this.$f7.dialog.close();
           })
        });
         }
              
    
      },
      getPosicionElemento(id_clientepass){
          return this.clientes.findIndex(x=>x.id==id_clientepass);
          // return this.clientes[1];
      },
      getElementoLista(id_clientepass){
          return this.clientes.filter(x=>x.id==id_clientepass);
          // return this.clientes[1];
      },
      getBuscarPosicionElementoInferior(posicion_find){
          return this.clientes.filter(x=>x.data.posicion==posicion_find);
          // return this.clientes[1];
      },
       getBuscarPosicionElementoSuperior(posicion_find){
          return this.clientes.filter(x=>x.data.posicion==posicion_find);
          // return this.clientes[1];
      },

       onActualizarLista(){
      this.clientes=this.$store.getters.getClientes;
    },
    roundTo(value, places){
     var power = Math.pow(10, places);
     return Math.round(value * power) / power;
    },
    onSelectPlan($event){
      this.planseleccionado=$event.target.value.split("-")[0];
      this.tazaseleccionada=$event.target.value.split("-")[1];
    },
    updateBalanceValor(){
      
       let zona= localStorage.getItem("zona");
       let empresa= localStorage.getItem("empresa");

       // Get a new write batch
var batch = db.batch();

// Update the population of 'SF'

var sfRef = db.collection("usuarios").doc(this.idad).collection("empresas").doc(empresa).collection('Zonas').doc(zona);
batch.update(sfRef, {"balance": this.balance_zona});



// Commit the batch
batch.commit().then( ()=> {
    // ...
   this.info_prestamo={
                valor:0,
              // fecha:this.$moment(new Date).format("DD/MM/YYYY"), 
              fecha:new Date().toISOString().slice(0,10), 
              cliente:'',
              total_apagar:0,
              plan_seleccionado:'',
              dias_plazo:'',
              dias_con_mora:0,
              estado_prestamo:false,
              estado_pago_prestamo:{
                pago:false,
                nopago:false,
                pendiente:false
              },
              saldo_pendiente:0,
              saldo_pago_dia:0
            }

            
            this.valor_sin_puntos=0;
});
       
       

    },
    onCobroPendiente(usuario){
      this.$store.commit('cobroPendiente',usuario);
      
    },
    onSeleccionarCliente(id,nombrecompleto) {
        this.balance_zona=localStorage.getItem("saldo_zona");
        this.cliente_seleccionado=id;
        // app.dialog.alert(id);
        this.$f7.dialog.confirm('Confirmar usuario',nombrecompleto, () => {
           
           let elemento = this.clientes.findIndex(x=>x.data.id==id);
           console.log(this.clientes[elemento].data);
           if(this.clientes[elemento].data.hasOwnProperty('prestamos')){
              if(this.clientes[elemento].data.prestamos.length>0){
  // && this.clientes[elemento].data.prestamos.estado_prestamo!=true
           this.$f7.dialog.alert('No se puede realizar el prestamo, el cliente tiene un saldo por pagar.',nombrecompleto);
          }else{
          this.$f7.dialog.alert(nombrecompleto,'Confirmado!',()=>{
            this.$f7.sheet.open('.demo-sheet-swipe-to-step');
          });
          }
          }else{
          this.$f7.dialog.alert(nombrecompleto,'Confirmado!',()=>{
            this.$f7.sheet.open('.demo-sheet-swipe-to-step');
          });
           }
        });
      },
    pago(tipo_pago){
      this.tipo_seleccionado=tipo_pago;
    },
    onConfirmarPago($event){

      if(this.cliente_seleccionado==='' || this.cliente_seleccionado==null){
         
         this.$f7.dialog.alert('Debe seleccionar un Cliente!','Atencion!');
      }
      else if(this.planseleccionado=='' || this.planseleccionado==undefined){
       this.$f7.dialog.alert('Debe seleccionar un plan!','Atencion!');
      }
      else if(this.valor_sin_puntos=='' || this.valor_sin_puntos==0){
       this.$f7.dialog.alert('Debe ingresar un valor!','Atencion!');
      }
      else{
         //  valor preswtamo  "x"
          //  interes  i
          // plazo p
          // total a pagar = x*i+x

          // total a pagar / p 
          // 2 valor
          // fecha_hora
          // fecha_inicio
          let saldo_actual_zona=  localStorage.getItem("saldo_zona");
          this.info_prestamo.valor=this.valor_sin_puntos.split('.').join('');
          // this.info_prestamo.valor=this.info_prestamo.valor.replace('.', "");
          if(Number(this.info_prestamo.valor)>saldo_actual_zona || saldo_actual_zona==0){
             const app = this.$f7;
        // app.dialog.alert(id);
        app.dialog.confirm('No se puede realizar el pretamo porque el saldo de la zona es inferio a la cantidad a prestar, revise el valor','Error...', () => {
          this.info_prestamo.valor=0;
        });
      }else{

            const self = this;
          const app = this.$f7;
          let ui_cobrador=localStorage.getItem("uid");
          self.$f7.dialog.preloader('Guardando prestamo...');
          this.info_prestamo.cliente=this.cliente_seleccionado;
          let id_empresa=localStorage.getItem("empresa");
          // this.info_prestamo.valor=this.info_prestamo.valor.replace('.', "");
          let valor_prestamo=this.info_prestamo.valor;
          let taza_seleccionada_interes= this.tazaseleccionada;
          let plazo_dias= this.planseleccionado;
          let total_apagar=Number(valor_prestamo)*Number(taza_seleccionada_interes)+Number(valor_prestamo);
          console.log( this.info_prestamo);
          let pago=Number(total_apagar)/Number(plazo_dias)
        
          this.info_prestamo.total_apagar=total_apagar;
         
          this.info_prestamo.plan_seleccionado=this.planseleccionado;
          this.info_prestamo.dias_plazo=Number(this.planseleccionado);

          var formData = new FormData();

          this.abonoService.guardarAbonosPrestamos(this.idad,id_empresa,ui_cobrador,this.info_prestamo.cliente,this.info_prestamo).then( (response) =>  {
          let saldo_actual=  localStorage.getItem("saldo_zona");
          // this.info_prestamo.valor=this.info_prestamo.valor.replace('.', "");
          let saldo_valor=   this.info_prestamo.valor;
          let descuentosaldozona=Number(saldo_actual)-Number(saldo_valor);
          localStorage.setItem("saldo_zona", descuentosaldozona);
          this.balance_zona= localStorage.getItem("saldo_zona");
          this.$store.commit('setBalanceZona',Number(descuentosaldozona));
          this.total_prestado=Number(this.total_prestado)+Number(this.info_prestamo.valor)
          localStorage.setItem("total_prestado",this.total_prestado);
          let elemento = this.clientes.findIndex(x=>x.data.id==this.cliente_seleccionado);
          if(this.clientes[elemento].data.hasOwnProperty('prestamos')){
          this.clientes[elemento].data.prestamos.push(this.info_prestamo);
          }else{
            this.clientes[elemento].data.prestamos=new Array(this.info_prestamo)
          }
          
          this.updateBalanceValor();
          //  this.info_prestamo.valor=0;
          // this.cliente_seleccionado='';
          self.$f7.dialog.close();
          this.$f7.sheet.close();
          this.info_prestamo.plan_seleccionado='';
          this.planseleccionado=undefined;
          this.$f7router.back();
          
       });
      }

      }
    }
    },
}
</script>