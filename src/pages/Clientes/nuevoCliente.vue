<template>
  <f7-page name="form">
    <f7-navbar title="Nuevo Cliente" back-link="Back">
   <f7-subnavbar >
      <f7-segmented sliding raised>
        <f7-button tab-link="#Personal" tab-link-active>Personal</f7-button>
        <f7-button tab-link="#Negocio">Negocio</f7-button>
        <f7-button tab-link="#Codeudor">Codeudor</f7-button>
      </f7-segmented>
    </f7-subnavbar>
    </f7-navbar>
    <f7-tabs>
    <f7-tab id="Personal" tab-active >
      
        
          
     
          <f7-block-title>Fomulario</f7-block-title>
    <f7-list no-hairlines-md inset>
        
        <f7-list-input
        outline
        floating-label
        label="Identificacion"
        type="text"
        placeholder="Identificacion"
        required
        validate
        maxlength="11"
        max="11"
        pattern="[0-9]*"
        error-message="Solo numeros"
        @input="identificacion=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Nombre"
        type="text"
        placeholder="Nombre"
        required
        validate
        pattern="[A-Za-z]*"
        error-message="Solo letras"
        @input="form.usuario.nombre=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Apellido"
        type="text"
        placeholder="Apellido"
        required
        validate
        pattern="[A-Za-z]*"
        error-message="Solo letras"
        @input="form.usuario.apellido=$event.target.value"
      ></f7-list-input>
      

      <f7-list-input
        outline
        floating-label
        label="Direccion 1"
        type="text"
        placeholder="Direccion 1"
        required
        validate
        @input="form.usuario.direccion1=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Direccion 2 (opcional)"
        type="text"
        placeholder="Direccion 2"
        @input="form.usuario.direccion2=$event.target.value"
      ></f7-list-input>
      <f7-list-input
        outline
        floating-label
        label="Celular"
        type="text"
        placeholder="Celular"
        required
        validate
        maxlength="10"
        max="10"
        minlength="1"
        min="1"
        info="Ingrese el numero de celular completo."
        pattern="[0-9]*"
        error-message="Solo numeros"
        :error-message-force="false"
        @input="telefono=$event.target.value"
      ></f7-list-input>
      
       <f7-list-input
       outline
        floating-label
        label="Oficio"
        type="text"
        placeholder="Oficio"
        required
        validate
        pattern="[A-Za-z]*"
        error-message="Solo letras"
        @input="form.usuario.oficio=$event.target.value"
      ></f7-list-input>

     
    </f7-list>

    </f7-tab>
    <f7-tab id="Negocio" >
               <f7-block-title>Negocio</f7-block-title>
   
    <f7-list no-hairlines-md inset>
        
        <f7-list-input
        outline
        floating-label
        label="Nombre negocio"
        type="text"
        placeholder="Nombre Negocio"
        required
        validate
        pattern="[A-Za-z]*"
        error-message="Solo letras"
        @input="form.negocio.nombre_negocio=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Direccion"
        type="text"
        placeholder="Direccion"
        required
        validate
        @input="form.negocio.direccion=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Telefono"
        type="text"
        placeholder="Telefono"
        required
        validate
        pattern="[0-9]*"
        error-message="Solo numeros"
        @input="telefonoNegocio=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Ciudad"
        type="text"
        placeholder="Ciudad"
        required
        validate
        pattern="[A-Za-z]*"
        error-message="Solo letras"
        @input="form.negocio.ciudad=$event.target.value"
      ></f7-list-input>     
    </f7-list>
    </f7-tab>
    <f7-tab id="Codeudor" >
       <f7-block-title>Codeudor</f7-block-title>
      <f7-list no-hairlines-md inset>
        <f7-list-input
        outline
        floating-label
        label="Nombre Codeudor"
        type="text"
        placeholder="Nombre Codeudor"
        pattern="[A-Za-z]*"
        error-message="Solo letras"
        @input="form.codeudor.nombre_codeudor=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Documento Codeudor"
        type="text"
        placeholder="Documento Codeudor"
        pattern="[A-Za-z]*"
        error-message="Solo letras"
        @input="form.codeudor.documento_codeudor=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Telefono Codeudor 1"
        type="text"
        placeholder="Telefono Codeudor 1"
        pattern="[0-9]*"
        error-message="Solo numeros"
        @input="form.codeudor.telefeno1=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Telefono Codeudor 2"
        type="text"
        placeholder="Telefono Codeudor 2"
         pattern="[0-9]*"
        error-message="Solo numeros"
        @input="form.codeudor.telefeno2=$event.target.value"
      ></f7-list-input> 

      <f7-list-input
        outline
        floating-label
        label="Telefono Codeudor 3 (opcional)"
        type="text"
        placeholder="Telefono Codeudor 3"
         pattern="[0-9]*"
        error-message="Solo numeros"
        @input="form.codeudor.telefeno3=$event.target.value"
      ></f7-list-input> 

      <f7-list-input
        outline
        floating-label
        label="Ciudad"
        type="text"
        placeholder="Ciudad"
        pattern="[A-Za-z]*"
        error-message="Solo letras"
        @input="form.codeudor.ciudad=$event.target.value"
      ></f7-list-input>  
    </f7-list>
    </f7-tab>
  </f7-tabs>
  <f7-block style="text-align:center;color:red;font-size:12px;font-family:Roboto" v-if="error_form">{{error_form}}</f7-block>
      <f7-block>

  <f7-row>
    
    <f7-col>
        
      <f7-button fill large small :disabled="validar_campos" @click="onGuardarCliente" color="green">GUARDAR</f7-button>
          
    </f7-col>
      <!-- <f7-col v-if="geoHabilitado">
        
      <f7-button fill large small  @click="onVolverACargarGeo" color="green">LOCALIZACION</f7-button>
          
    </f7-col> -->

    
  </f7-row>

</f7-block>
<div v-if="cargarGps"> 
  <Message  severity="success"  :sticky="true" :life="1500">Localizacion optenida</Message>
</div>
<div v-else>
  <Message  severity="error"  :sticky="true" :life="1500">No se ha podido tener informacion de la localizacion, revise el gps y vuelva a intentarlo.</Message>
  
</div>

  </f7-page>
</template>

<script>
// zona
          // balance incial
          // total prestamo 
          // total cobros
          // catidad cobrosefectivos
          // catidad cobrosenofectivos
          // total gstos
          // total transfererencias
          // balance final
          // balance final manual
import ClientesCobradoresService from '../Services/ClientesService.js';
export default {
    data() {
        return {
          telefono:'',
          telefonoNegocio:'',
          telefonoContacto1:'',
          telefonoContacto2:'',
          identificacion:'',
          cargarGps:true,
           cobradoresClientesService:null,
           contador_cobros_efectivos:0,
           contador_cobros_no_efectivos:0,
           validar_campos:true,
           clientes:[],
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
                  telefeno:'',
                  ciudad:''
                },
                codeudor:{
                  nombre_codeudor:'',
                  documento_codeudor:'',
                  telefeno1:'',
                  telefeno2:'',
                  telefeno3:'',
                  ciudad:''
                },
                prestamos:[],
                cobros:[],
                geolocalizacion:{}
            },
            lat:'',
            log:'',
            mensajeErrorGelocalizacion:'',
            geoHabilitado:false,
            error_form:'',
            
        }
    },
    computed: {
      
    },
    watch: {
       telefono(value){
         console.log(value.length);
        if(value.length<10){
            this.error_form='El celular no esta completo.';
            this.validar_campos=true;
        }else{
           this.error_form='';
           this.form.usuario.telefono=this.telefono;
            this.validar_campos=false;
        }
      },
      telefonoNegocio(value){
         console.log(value.length);
        if(value.length<10){
            this.error_form='El telefono del negocio no esta completo.';
            this.validar_campos=true;
        }else{
           this.error_form='';
           this.form.negocio.telefono=this.telefono;
           this.validar_campos=false;
        }
      },
      identificacion(value){
          if(value.length<=9){
            this.error_form='La cedula tiene pocos numeros.';
            this.validar_campos=true;
          } else {
            this.error_form='';
            if(this.clientes.filter(x=>x.data.usuario.identificacion==value).length>0){
            this.$f7.dialog.alert('Este cliente ya existe!','Atencion!',()=>{
              // this.identificacion=''
            });
          }else{
            this.form.usuario.identificacion=this.identificacion;
          }
          }
      }
    },
    destroyed() {
      this.form={
                posicion:0,
                activo:true,
                telefonoUsuario:'',
                usuario:{
                  identificacion:'',
                  nombre:'',
                  apellido:'',
                  direccion1:'',
                  direccion2:'',
                  oficio:''
                },
                negocio:{
                  nombre_negocio:'',
                  direccion:'',
                  telefeno:'',
                  ciudad:''
                },
                codeudor:{
                  nombre_codeudor:'',
                  documento_codeudor:'',
                  telefeno1:'',
                  telefeno2:'',
                  telefeno3:'',
                  ciudad:''
                },
                prestamos:[],
                cobros:[],
                geolocalizacion:{}
            },
            this.lat='',
            this.log='',
            this.mensajeErrorGelocalizacion='',
            this.geoHabilitado=false
    },
    created() {
       this.cobradoresClientesService=new ClientesCobradoresService();
       navigator.geolocation.getCurrentPosition(this.onSuccessGeolocalizacion, this.onErrorGeolocalizacio);
    },
    beforeMount() {
      this.clientes=this.$store.getters.getClientes;
    },
    methods:{
     
      onVolverACargarGeo(){
        navigator.geolocation.getCurrentPosition(this.onSuccessGeolocalizacion, this.onErrorGeolocalizacio);
      },
       onErrorGeolocalizacio(error){
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
       onSuccessGeolocalizacion(position){
         this.geoHabilitado=false;
         this.cargarGps=true;
          this.form.geolocalizacion={
             log:position.coords.longitude,
             lat:position.coords.latitude
          }
        },
      getInfoGelocalitation(){
          return axios.get("https://ipinfo.io?token=3e5d1c9a59d8aa",  (response) => {
              return JSON.stringify(response, null, 4)
          }, "jsonp");
      },
        onCobrosNoRealizados(){
          localStorage.setItem("cobros_no_efectivos",this.contador_cobros_no_efectivos++);
        },
        onGuardarCliente(){
         
          let campos_usuario=Object.values(this.form.usuario);
          let campos_negocio=Object.values(this.form.negocio);
          let filtro_contador_campos_usuario=campos_usuario.filter(x=>x=="").length;
          let filtro_contador_campos_negocio=campos_negocio.filter(x=>x=="").length;
         
         
          let sumaacampos=Number(filtro_contador_campos_usuario)+Number(filtro_contador_campos_negocio);
           console.log(Number(filtro_contador_campos_usuario));
           console.log(Number(filtro_contador_campos_negocio));
           console.log(sumaacampos);
          if(sumaacampos==0 || sumaacampos==1){
              this.validar_campos=false;
        let config = {
                     headers: { 'content-type': 'application/json; utf-8' },
                  method: 'POST'
          };

     const self = this;
        self.$f7.dialog.preloader('Guardando...');
     let ui_cobrador=localStorage.getItem("uid");
     this.form.posicion=Number(this.$store.getters.getContadorClientes)+1;
      this.cobradoresClientesService.guardarClienteCobrador(ui_cobrador,this.form).then( (response) =>  {
      
       self.$f7.dialog.close();
       let data={
         'id':response.data,
         'data':this.form,
         'nuevo':true
       }
       
       this.$store.commit('addNewClientes',data);
       localStorage.setItem("cobros_efectivos",this.contador_cobros_efectivos++);
     
       
        this.$f7router.back()
        
    }).catch(error => {
        console.log(error);
    }); 
          }
          else{

            this.$f7.dialog.confirm('La informacion del usuario y el negocio son requeridas, por favor verifique los campos he intentelo nuevamente.','Atencio!');
            
  
          }

    
        }
    }
}
</script>