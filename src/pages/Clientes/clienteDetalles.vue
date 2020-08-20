<template>
  <f7-page name="ClientesDetalles">
    <f7-navbar title="Usuario" back-link="Back"></f7-navbar>
    <f7-block-title>Usuario id: {{id}}</f7-block-title>
    <f7-card>
      <f7-row>
      <f7-col>
        <!-- {{[0]}} -->
      <f7-button fill large small popup-open=".demo-popup" color="green">EDITAR</f7-button>
    </f7-col>
      </f7-row>
    </f7-card>
  <!-- <pre>{{clientes_info}}</pre> -->
    <f7-block strong>
      <f7-block-title >Usuario</f7-block-title>
      <f7-list>
      <f7-list-item v-for="(usuario,index,keyus) in clientes_info.usuario" :id="index" :key="keyus">
        <span>{{index.replace('_',' ') | capitalize}}:</span>{{usuario}}
        <!-- {{keyus}} -->
        <!-- {{index}}
        {{keyus}} -->
      </f7-list-item>
      </f7-list>
    </f7-block>
    <f7-block strong >
       <f7-block-title >Negocio</f7-block-title>
       <f7-list>
      <f7-list-item  v-for="(negocio,index,keyne) in clientes_info.negocio" :id="index" :key="keyne">
        <span>{{index.replace('_',' ') | capitalize}}:</span>{{negocio}}
      </f7-list-item>
      </f7-list>
    </f7-block>
    <f7-block strong>
      <f7-block-title>Codeudor</f7-block-title>
      <f7-list>
       <f7-list-item   v-for="(codeudor,index,keycod) in clientes_info.codeudor" :id="index" :key="keycod">
         <span>{{index.replace('_',' ') | capitalize}}:</span>{{codeudor}}
      </f7-list-item>
      </f7-list>
    </f7-block>
    
    <f7-block strong>
      <f7-block-title>Prestamo</f7-block-title>
      <f7-list>
       <f7-list-item   v-for="(prestamos,index,keycod) in clientes_info.prestamos" :id="index" :key="keycod">
        <div v-if="clientes_info.prestamos.dias_plazo!=''">
         <span> Dias de mora: </span>{{prestamos.dias_con_mora}}<br>
         <span> Dias de plazo: </span>{{prestamos.dias_plazo}}<br>
         <span>Fecha del prestamo: </span>{{prestamos.fecha}}<br>
         <span>Valor del prestamo: </span>{{prestamos.valor|currency}}<br>
         <span>Total a pagar: </span>{{prestamos.total_apagar|currency}}<br>
         <span>Plan seleccionado: </span>{{prestamos.plan_seleccionado}}<br>
        </div>
        <div v-else>
     No tiene prestamos
    </div>      
      </f7-list-item>
      </f7-list>
    </f7-block>
    <!-- <MapCliente :coordenadas="this.clientes_info.geolocalizacion"/> -->
     
   <!-- {{this.clientes_info.geolocalizacion}} -->
     <!-- {{this.clientes_info.geolocalizacion}} -->
     <f7-block  inset>
            <f7-row>
            <f7-col lg="12" md="12">
                <f7-button fill  color="green" v-if="this.clientes_info.geolocalizacion!=null" @click="onMostrarMapa">{{mostrar_mapa?'Ocultar mapa':'Ver ubicacion'}}</f7-button>
            </f7-col>
            </f7-row>
            </f7-block>
    <f7-block v-if="mostrar_mapa" >
      
       <gmap-map v-if="this.clientes_info.geolocalizacion!=null"
      :center="coordenadas"
      :zoom="14"
      style="width:100%;  height: 400px;"
      :options="{
   zoomControl: true,
   mapTypeControl: false,
   scaleControl: false,
   streetViewControl: false,
   rotateControl: false,
   fullscreenControl: true,
   disableDefaultUi: false
 }"
    >
   
    <!-- @click="center=m.position" -->
      <gmap-marker
      
        :position="coordenadas"
        
      ></gmap-marker>
    </gmap-map>
</f7-block>
<f7-popup class="demo-popup" :opened="popupOpened" @popup:closed="popupOpened = false">
      <f7-page>
        <f7-navbar title="Editar usuario">
          <f7-nav-right>
            <f7-link popup-close>Cerrar</f7-link>
          </f7-nav-right>
        </f7-navbar>
        <f7-block>
           <f7-card>
      <f7-row>
      <f7-col>
        <!-- {{[0]}} -->
      <f7-button fill large small @click="onActualizarClienteCobrador" color="green">ACTUALIZAR</f7-button>
    </f7-col>
      </f7-row>
    </f7-card>
          <f7-block-title>Usuario</f7-block-title>
              <f7-list>
        
        <f7-list-input
        outline
        floating-label
        label="Identificacion"
        :value=form.usuario.identificacion
        type="text"
        placeholder="Identificacion"
        required
        validate
        maxlength=10
        minlength=7
        pattern="[0-9]{7,10}"
        error-message="Solo numeros (7-10) caracteres"
        @input="form.usuario.identificacion=$event.target.value"
        :onValidate=onValidatedInput
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Nombre"
        type="text"
        placeholder="Nombre"
        :value=form.usuario.nombre
        required
        validate
        pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+"
        error-message="Solo letras"
        @input="form.usuario.nombre=$event.target.value"
        :onValidate=onValidatedInput
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Apellido"
        type="text"
        placeholder="Apellido"
        :value=form.usuario.apellido
        required
        validate
        pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+"
        error-message="Solo letras"
        @input="form.usuario.apellido=$event.target.value"
        :onValidate=onValidatedInput
      ></f7-list-input>
      

      <f7-list-input
        outline
        floating-label
        label="Direccion 1"
        type="text"
        placeholder="Direccion 1"
        :value=form.usuario.direccion1
        required
        validate
        pattern="[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ#-_\s]*"
        @input="form.usuario.direccion1=$event.target.value"
        :onValidate=onValidatedInput
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Direccion 2 (opcional)"
        type="text"
        placeholder="Direccion 2"
        :value=form.usuario.direccion2
        validate
        pattern="[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ#-_\s]*"
        error-message="Solo letras"
        @input="form.usuario.direccion2=$event.target.value"
        :onValidate=onValidatedInput
      ></f7-list-input>
      <f7-list-input
        outline
        floating-label
        label="Telefono"
        type="text"
        placeholder="Telefono"
        :value=form.usuario.telefono
        required
        validate
        maxlength=10
        minlength=7
        pattern="[0-9]{7,10}"
        error-message="Solo numeros y minimo 7 maximo 10 caracteres "
        :error-message-force="false"
        :onValidate=onValidatedInput
        @input="form.usuario.telefono=$event.target.value"
      ></f7-list-input>
      
       <f7-list-input
       outline
        floating-label
        label="Oficio"
        type="text"
        placeholder="Oficio"
        :value=form.usuario.oficio
        required
        validate
        pattern="[A-Za-z]*"
        error-message="Solo letras"
        :onValidate=onValidatedInput
        @input="form.usuario.oficio=$event.target.value"
      ></f7-list-input>
    </f7-list>
    <f7-block-title>Negocio</f7-block-title>
    <f7-list >
        
        <f7-list-input
        outline
        floating-label
        label="Nombre negocio"
        type="text"
        placeholder="Nombre Negocio"
        :value=form.negocio.nombre_negocio
        required
        validate
        pattern="[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]+"
        error-message="Solo letras"
        :onValidate=onValidatedInput
        @input="form.negocio.nombre_negocio=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Direccion"
        type="text"
        placeholder="Direccion"
        :value=form.negocio.direccion
        required
        validate
        pattern="[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ#-_\s]*"
        :onValidate=onValidatedInput
        @input="form.negocio.direccion=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Telefono"
        type="text"
        placeholder="Telefono"
        :value=form.negocio.telefono
        required
        validate
        maxlength=10
        minlength=7
        pattern="[0-9]{7,10}"
        error-message="Solo numeros y minimo 7 maximo 10 caracteres "
        :onValidate=onValidatedInput
        @input="form.negocio.telefono=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Ciudad"
        type="text"
        placeholder="Ciudad"
        :value=form.negocio.ciudad
        required
        validate
        pattern="[A-Za-z]*"
        error-message="Solo letras"
        :onValidate=onValidatedInput
        @input="form.negocio.ciudad=$event.target.value"
      ></f7-list-input>     
    </f7-list>
    <f7-block-title>Codeudor</f7-block-title>
      <f7-list >
        <f7-list-input
        outline
        floating-label
        label="Nombre Codeudor"
        type="text"
        :value=form.codeudor.nombre_codeudor
        placeholder="Nombre Codeudor"
        pattern="[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+"
        error-message="Solo letras"
        validate
        :onValidate=onValidatedInput
        @input="form.codeudor.nombre_codeudor=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Identificacion Codeudor"
        type="text"
        placeholder="Identificacion Codeudor"
        :value=form.codeudor.documento_codeudor
        maxlength=10
        minlength=7
        pattern="[0-9]{7,10}"
        error-message="Solo numeros (7-10) caracteres"
        validate
        :onValidate=onValidatedInput
        @input="form.codeudor.documento_codeudor=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Telefono Codeudor 1"
        type="text"
        placeholder="Telefono Codeudor 1"
        :value=form.codeudor.telefono1
        pattern="[0-9]*"
        error-message="Solo numeros"
        :onValidate=onValidatedInput
        validate
        @input="form.codeudor.telefono1=$event.target.value"
      ></f7-list-input>


      <f7-list-input
        outline
        floating-label
        label="Telefono Codeudor 2 (opcional)"
        type="text"
        :value=form.codeudor.telefono2
        placeholder="Telefono Codeudor 2"
         pattern="[0-9]*"
        error-message="Solo numeros"
          validate
        :onValidate=onValidatedInput
        @input="form.codeudor.telefono2=$event.target.value"
      ></f7-list-input> 
         
       <f7-list-input
        outline
        floating-label
        label="Direccion"
        type="text"
        :value=form.codeudor.direccion
        placeholder="Direccion"
        pattern="[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ#-_\s]*"
        error-message="Solo letras"
        validate
        :onValidate=onValidatedInput
        @input="form.codeudor.direccion=$event.target.value"
      ></f7-list-input> 
 
      <f7-list-input
        outline
        floating-label
        label="Ciudad"
        type="text"
        :value=form.codeudor.ciudad
        placeholder="Ciudad"
        pattern="[A-Za-z]*"
        error-message="Solo letras"
        validate
        :onValidate=onValidatedInput
        @input="form.codeudor.ciudad=$event.target.value"
      ></f7-list-input>  

    </f7-list>
    <f7-block-title>Geolocalizacion</f7-block-title>
      <f7-list >
        <f7-list-input
        outline
        floating-label
        label="lat"
        type="text"
        :value=form.geolocalizacion.lat
        placeholder="lat"
        @input="form.geolocalizacion.lat=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="log"
        type="text"
        placeholder="log"
        :value=form.geolocalizacion.lng
        @input="form.geolocalizacion.lng=$event.target.value"
      ></f7-list-input>
      </f7-list>
        <f7-row>
      <f7-col>
        <!-- {{[0]}} -->
      <f7-button fill large small  @click="onActualizarGeolocalizacion" color="yellow">ACTUALIZAR UBICACION</f7-button>
    </f7-col>
      </f7-row>
        </f7-block>
      </f7-page>
    </f7-popup>
  </f7-page>
</template>
<script>
import CobradorService from '../Services/CobradoresServices.js';
import ClientesService from '../Services/ClientesService.js';
  export default {
   data() {
       return {
         validar_campos:false,
         form:{
                posicion:0,
                activo:true,
                usuario:{
                  identificacion:'',
                  nombre:'',
                  apellido:'',
                  direccion1:'',
                  direccion2:'',
                  oficio:'',
                  telefono:''
                },
                negocio:{
                  nombre_negocio:'',
                  direccion:'',
                  telefono:'',
                  ciudad:''
                },
                codeudor:{
                  nombre_codeudor:'',
                  documento_codeudor:'',
                  telefono1:'',
                  telefono2:'',
                  direccion:'',
                  ciudad:''
                },
                prestamos:new Array(),
                cobros:new Array(),
                geolocalizacion:{
                  lat:'', lng:''
                }
            },
           popupOpened: false,
            mostrar_mapa:false,
            idad:'',
            id :this.$f7route.params.id,
            clientes_info:[],
            cobradorservice:null,
            clienteservice:null,
            coordenadas:{lat: 1.38, lng: 103.8},
            lat:'',
            log:''
       }
   },
   filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
  },
  created() {
      this.cobradoresService= new CobradorService();
      this.clienteservice= new ClientesService();
  },
  methods: {
    onActualizarClienteCobrador(){
    this.idad=localStorage.getItem("iad");
     let ui_cobrador=localStorage.getItem("uid"); 
     let id_empresa=localStorage.getItem("empresa"); 

              this.clientes_info.usuario.identificacion=this.form.usuario.identificacion
              this.clientes_info.usuario.nombre=this.form.usuario.nombre
              this.clientes_info.usuario.apellido=this.form.usuario.apellido
              this.clientes_info.usuario.telefono=this.form.usuario.telefono
              this.clientes_info.usuario.direccion1= this.form.usuario.direccion1
              this.clientes_info.usuario.direccion2=this.form.usuario.direccion2
              this.clientes_info.usuario.oficio=this.form.usuario.oficio
               //Negocio
              this.clientes_info.negocio.nombre_negocio=this.form.negocio.nombre_negocio
              this.clientes_info.negocio.direccion=this.form.negocio.direccion
              this.clientes_info.negocio.telefono=this.form.negocio.telefono
              this.clientes_info.negocio.ciudad= this.form.negocio.ciudad
              //Coodeudor
                     
              this.clientes_info.codeudor.nombre_codeudor=this.form.codeudor.nombre_codeudor
              this.clientes_info.codeudor.documento_codeudor= this.form.codeudor.documento_codeudor
              this.clientes_info.codeudor.direccion=this.form.codeudor.direccion
              this.clientes_info.codeudor.ciudad=this.form.codeudor.ciudad
              this.clientes_info.codeudor.telefono2=this.form.codeudor.telefono2
              this.clientes_info.codeudor.telefono1= this.form.codeudor.telefono1
              if(this.clientes_info.geolocalizacion){
              //Geolocalizacion
              this.clientes_info.geolocalizacion.lng= this.form.geolocalizacion.lng
              this.clientes_info.geolocalizacion.lat= this.form.geolocalizacion.lat
              }

      this.clienteservice.actualizarClienteCobrador(this.idad,id_empresa,ui_cobrador,this.id,this.clientes_info).then( (response) =>  {
              // this.informacion_pago.valor_pago=0;
               this.$f7.dialog.confirm(response.data.mensaje,"Correcto");
               this.$f7.popup.close();
                // this.$f7router.back();
      });
    },
    onValidatedInput(isValid){
      this.validar_campos=!isValid
     },
     onActualizarGeolocalizacion(){
        navigator.geolocation.getCurrentPosition(this.onSuccessActualizacionGeolocalizacion, this.onErrorActualizacionGeolocalizacion);
      },
       onErrorActualizacionGeolocalizacion(error){
         this.geoHabilitado=true;
          switch(error.code) {
          case error.PERMISSION_DENIED:
            this.cargarGps=false;
            this.mensajeErrorGelocalizacion = "No a dado permisos para acceder a localizacion, no se guardara la ubicacion del cliente."
            break;
          case error.POSITION_UNAVAILABLE:
            this.cargarGps=false;
            this.mensajeErrorGelocalizacion= "No se puede acceder a la informacion de la localizacion."
            break;
          case error.TIMEOUT:
            this.cargarGps=false;
            this.mensajeErrorGelocalizacion = "Tiempo agotado para acceder a la localizacion."
            break;
          case error.UNKNOWN_ERROR:
            this.cargarGps=false;
            this.mensajeErrorGelocalizacion = "Error desconocido por favor contacte al administrador"
            break;
        }

        const self = this;
        self.$f7.dialog.alert(this.mensajeErrorGelocalizacion,'Importante');
       },
       onSuccessActualizacionGeolocalizacion(position){
         const self = this;
        self.$f7.dialog.alert('Las coordenadas han sido actualizadas','Importante');
            this.form.geolocalizacion.lng=position.coords.longitude
          this.form.geolocalizacion.lat=position.coords.latitude
        },
    onMostrarMapa(){
      this.mostrar_mapa=!this.mostrar_mapa;
    }
  },
  mounted() {
    // At this point, the child GmapMap has been mounted, but
    // its map has not been initialized.
    // Therefore we need to write mapRef.$mapPromise.then(() => ...)
      //  this.$refs.mapRef.$mapPromise.then((map) => {
      //         map.panTo(this.clientes_info.geolocalizacion)
      //         })
       var head = document.getElementsByTagName('head')[0];

                // Save the original method
                var insertBefore = head.insertBefore;

                // Replace it!
                head.insertBefore = function(newElement, referenceElement) {

                    if (newElement.href && newElement.href.indexOf('//fonts.googleapis.com/css?family=Roboto') > -1) {

                        console.info('Prevented Roboto from loading!');
                        return;
                    }

                    insertBefore.call(head, newElement, referenceElement);
                };
 
    
  },
  beforeMount() {
    this.idad=localStorage.getItem("iad");
     let ui_cobrador=localStorage.getItem("uid"); 
     let id_empresa=localStorage.getItem("empresa"); 
     this.$f7.dialog.preloader("Buscando Informacion...");
          this.cobradoresService.getCobradoresClientesBuscar(this.idad,id_empresa,ui_cobrador,this.$f7route.params.id).then( (response) =>  {
              
              this.clientes_info=response.data;
              //Usuario
              this.form.usuario.identificacion=this.clientes_info.usuario.identificacion
              this.form.usuario.nombre=this.clientes_info.usuario.nombre
              this.form.usuario.apellido=this.clientes_info.usuario.apellido
              this.form.usuario.telefono=this.clientes_info.usuario.telefono
              this.form.usuario.direccion1=this.clientes_info.usuario.direccion1
              this.form.usuario.direccion2=this.clientes_info.usuario.direccion2
              this.form.usuario.oficio=this.clientes_info.usuario.oficio
               //Negocio
              this.form.negocio.nombre_negocio=this.clientes_info.negocio.nombre_negocio
              this.form.negocio.direccion=this.clientes_info.negocio.direccion
              this.form.negocio.telefono=this.clientes_info.negocio.telefono
              this.form.negocio.ciudad=this.clientes_info.negocio.ciudad
              //Coodeudor
                     
              this.form.codeudor.nombre_codeudor=this.clientes_info.codeudor.nombre_codeudor
              this.form.codeudor.documento_codeudor=this.clientes_info.codeudor.documento_codeudor
              this.form.codeudor.direccion=this.clientes_info.codeudor.direccion
              this.form.codeudor.ciudad=this.clientes_info.codeudor.ciudad
              this.form.codeudor.telefono2=this.clientes_info.codeudor.telefono2
              this.form.codeudor.telefono1=this.clientes_info.codeudor.telefono1
              
             
          
              if(this.clientes_info.geolocalizacion){
                //Geolocalizacion
               this.form.geolocalizacion.lng=this.clientes_info.geolocalizacion.lng
               this.form.geolocalizacion.lat=this.clientes_info.geolocalizacion.lat
                this.coordenadas= {
                lat:Number(this.clientes_info.geolocalizacion.lat),
                lng:Number(this.clientes_info.geolocalizacion.lng)
                }
              }
              
              
              this.isLoadUsers= true;
              this.$f7.dialog.close();
    //                    this.$refs.mapRef.$mapPromise.then((map) => {
    //   map.panTo(this.clientes_info.geolocalizacion)
    // })
          }).catch(error => {
              console.log(error);
          }); 
 
  },
    beforeCreate(){
     let posicion=this.$store.getters.getClientes.findIndex(x => {x.hasOwnProperty('nuevo')? x.nuevo === true:x});
     if(posicion>0){
       this.$store.commit('getSetNuevoClientes',posicion);
     }
  }
  };
</script>