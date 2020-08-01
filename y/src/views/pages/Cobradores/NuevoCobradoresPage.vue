<template>
    <div>
      <CRow>
        <CCol md="6">
        <CCard>
         <CCardBody>
              <CSelect
                  label="Empresas"
                  :options="empresas"
                  :value.sync="usuario.empresa"
                  @change="onSelectdEmpresa"
                />
         </CCardBody>
        </CCard>
      </CCol>
      <CCol md="6">
         <CCard>
         <CCardBody>
            <CSelect
                  label="Zona"
                  :options="zonas"
                  :value.sync="usuario.zona"
                  :disabled=isEnabled
                />
         </CCardBody>
        </CCard>
      </CCol>
      </CRow>
     <CRow>
      <CCol md="6">
        <CCard>
          <CCardHeader>
            <strong>Informacion personal</strong> 
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CInput
                description="Ingresar la identificacion del nuevo cobrador."
                label="Identificacion:"
                horizontal
                placeholder="Identificacion"
                autocomplete="identificacion"
                v-model="usuario.identificacion"
              />
              <CInput
                description="Ingresar el nombre del nuevo cobrador."
                label="Nombre:"
                horizontal
                placeholder="Nombre"
                autocomplete="nombre"
                v-model="usuario.nombre"
              />
              <CInput
                label="Apellido:"
                horizontal
                type="text"
                placeholder="Apellido"
                description="Ingresar el apellido del nuevo cobrador."
                 v-model="usuario.apellido"
              />
              <CInput
                label="Direccion 1:"
                description="Ingresar la direccion del nuevo cobrador."
                placeholder="Direccion 1"
                horizontal
                 v-model="usuario.direccion1"
              />
               <CInput
                label="Direccion 2 (opcional)"
                description="Ingresar la direccion del nuevo cobrador."
                placeholder="Direccion 2 "
                horizontal
                 v-model="usuario.direccion2"
              />
              <CInput
                label="Telefono"
                type="text"
                horizontal
                placeholder="Telefono"
                description="Ingresar la telefono del nuevo cobrador."
                 v-model="usuario.telefono"
              />
             
            </CForm>
          </CCardBody>
          
        </CCard>
      
      </CCol>
      <CCol md="6">
        <CCard>
        <CCardHeader>
            <strong>Usuario y contraseña</strong> 
          </CCardHeader>
         <CCardBody>
            <CCardBody>
              <CInput
                type="email"
                description="Please enter your email."
                autocomplete="email"
                label="Email"
                placeholder="Enter Email..."
                required
                was-validated
                v-model="register.email"
              />
              <CInput
                type="password"
                description="Please enter your password."
                autocomplete="current-password"
                label="Password"
                placeholder="Enter Password..."
                required
                was-validated
                v-model="register.password"
              />
            </CCardBody>
    </CCardBody>
     </CCard>
      </CCol>
    </CRow>
     <CRow>
      <CCol md="12">
      <CCard align="right">
      <CCardBody>
              <CButton 
              type="submit" 
              size="sm" 
              color="success"
              @click="guardar_cobrador"
              >
              <CIcon 
              name="cil-check-circle"/> Registrar</CButton>
              <!-- <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban"/> </CButton> -->
            </CCardBody>
      </CCard>
      </CCol>
      </CRow>
      <Toast  autoZIndex position="bottomright" />
    </div>
</template>

<script>
import ZonaService from '../Zonas/Services/ZonaService.js';
import EmpresaService from '../Empresa/Services/EmpresasService.js';
import CobradorService from '../Cobradores/Services/CobradoresService.js';
export default {
    data() {
        return {
       register:{
          email:'',
          password:''
       },
       usuario:{
          identificacion:'',
          nombre:'',
          apellido:'',
          direccion1:'',
          direccion2:'',
          telefono:'',
          zona:'',
          empresa:'',
          rol:'cobrador'
       },
      zonaservice:null, 
      empresaservice:null,
      cobradorservice:null, 
      usuarioOnLogin:'', 
      isEnabled:true,
      empresas:[{ value: 'Seleccione', label: 'Seleccione' }],
      zonas:[{ value: 'Seleccione', label: 'Seleccione' }],
      error:''
       
        
        }
    },
     created() {
        this.zonaservice = new ZonaService();
        this.empresaservice= new EmpresaService();
        this.cobradorservice= new CobradorService();
    },
    beforeMount(){
      this.usuarioOnLogin=localStorage.getItem('id');
      let tamporal_empresas=[];
      this.empresaservice.getAllEmpresas(this.usuarioOnLogin).then((result)=>{
        
        tamporal_empresas=result.data;
        console.log(tamporal_empresas);
          for (const key in tamporal_empresas) {
            if (tamporal_empresas.hasOwnProperty(key)) {
                 let element={ value: tamporal_empresas[key].id, label: tamporal_empresas[key].Nombre };
                 
                 this.empresas.push(element);
                 
                
            }
         }
        
        });
    },
    
    methods:{
      onSelectdEmpresa(){
            this.isEnabled=false;
            this.zonas=[{ value: 'Seleccione', label: 'Seleccione' }];
            let tamporal_Zonas=[];
            
            this.zonaservice.getAllZonasEmpresa(this.usuarioOnLogin,this.usuario.empresa,'Zonas').then((response)=>{
            //console.log(response);
            tamporal_Zonas=response;
            for (const key in tamporal_Zonas) {
            if (tamporal_Zonas.hasOwnProperty(key)) {
                
                  let element={ value: tamporal_Zonas[key].id, label: tamporal_Zonas[key].nombre };
                  this.zonas.push(element);
                  // console.log(this.zonas);
            }
        }   
             
        });

            
      },
        guardar_cobrador(){
        
        // console.log("Cobrador........");
        let consulta=this.cobradorservice.buscarCobradorPorZona(this.usuarioOnLogin,this.usuario.empresa,this.usuario.zona).then((response)=>{
         console.log(response);
          if(response.data.id=='No hay coincidencias'){
            
              
                let telefono=this.usuario.telefono;

        firebase.auth().createUserWithEmailAndPassword(this.register.email, this.register.password).then((response)=>{
            var user = firebase.auth().currentUser;
console.log(this.usuario);
        this.cobradorservice.guardarCobrador(this.usuarioOnLogin,this.usuario.empresa,this.usuario).then( (response) =>  {
                console.log(response);
                var id =response.data;
                user.updateProfile({
                      displayName:this.usuario.nombre +" "+this.usuario.apellido+'-'+id+'-'+this.usuarioOnLogin+'-'+this.usuario.empresa
                    }).then(function() {
                      return "actualizado";
                      
                    
                    }).catch(function(error) {
                      // An error happened.
                      return "error";
                    });   
                this.$toast.add({severity:'success', summary: 'Correcto', detail:'Cobrador ha sido guardado', life: 3000});
                this.register={
                    email:'',
                    password:''
                }
                this.usuario={
                    identificacion:'',
                    nombre:'',
                    apellido:'',
                    direccion1:'',
                    direccion2:'',
                    telefono:'',
                    zona:'',
                    empresa:'',
                    rol:'cobrador'
                }
              }).catch(error => {
                  console.log(error);
              });
              
            console.log(user);
        }).catch((error)=> {
        // Handle Errors here.
        console.log(error.code);
        switch (error.code) {
              case 'auth/user-not-found':
                 this.error= 'No hay ningún registro de usuario que corresponda a este identificador o usuario puede haber sido eliminado.';
                 break;
            case 'auth/wrong-password':
                 this.error= 'La contraseña es inválida o el usuario no tiene contraseña.'
                break;
            case 'auth/invalid-email':
                this.error= 'La dirección de correo electrónico no es valida o está mal formateada.'
                  break;
              case 'auth/email-already-in-use':
                 this.error= "Este correo ya está siendo usado por otro usuario"
                  break;
                
              case 'userDisabled':
                 this.error= "Este usuario ha sido deshabilitado"
                break;
              case 'auth/network-request-failed':
                 this.error= "Error en la peticion de autenticacion."
                break;
              case 'operationNotAllowed':
                 this.error= "Operación no permitida"
                         break;
              case 'invalidEmail':
                 this.error= "Correo electrónico no valido"
                         break;
              case 'wrongPassword':
                 this.error= "Contraseña incorrecta"
                         break;
              case 'userNotFound':
                 this.error= "No se encontró cuenta del usuario con el correo especificado"
                         break;
              case 'networkError':
                 this.error= "Promblema al intentar conectar al servidor"
                         break;
              case 'weakPassword':
                 this.error= "Contraseña muy debil o no válida"
                         break;
              case 'missingEmail':
                 this.error= "Hace falta registrar un correo electrónico"
                         break;
              case 'internalError':
                 this.error= "Error interno"
                         break;
              case 'invalidCustomToken':
                 this.error = "Token personalizado invalido"
                         break;
              case 'tooManyRequests':
                 this.error= "Ya se han enviado muchas solicitudes al servidor"
                         break;
              default:
                 this.error= "Error desconocido contacte al administrador."
                
            }
              
                     this.$toast.add({severity:'error', summary: 'Error', detail:this.error, life: 3000}); 
      });
            
          }
          else{
             this.$toast.add({severity:'info', summary: 'Atencion', detail:'Esta zona ya tiene un cobrador asignado', life: 3000});
             
              
          }

          
          
          

        });

        
       
         
      
        
    }
    
  }
}
</script>