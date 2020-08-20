<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm>
                <h1>Registro</h1>
                <p class="text-muted">Crear cuenta</p>
                <CInput
                  placeholder="Username"
                  autocomplete="username"
                  v-model="usuario.username"
                >
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput
                  placeholder="Email"
                  autocomplete="email"
                  prepend="@"
                  v-model="register.email"
                />
                <CInput
                  placeholder="Password"
                  type="password"
                  autocomplete="new-password"
                  v-model="register.password"
                >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <CInput
                  placeholder="Repeat password"
                  type="password"
                  autocomplete="new-password"
                  class="mb-4"
                  v-model="register.repassword"
                >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <CButton color="success" @click="guardar_usuario" block>Registrarme</CButton>
              </CForm>
            </CCardBody>
            <!-- <CCardFooter class="p-4">
              <CRow>
                <CCol col="6">
                  <CButton block color="facebook">
                    Facebook
                  </CButton>
                </CCol>
                <CCol col="6">
                  <CButton block color="twitter">
                    Twitter
                  </CButton>
                </CCol>
              </CRow>
            </CCardFooter> -->
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
    <Toast  autoZIndex position="bottomright" />
  </div>
</template>

<script>
import qs from 'qs';
export default {
  name: 'Register',
  data() {
    return {
       register:{
          email:'',
          password:'',
          repassword:''
       },
       usuario:{
          username:'',
          rol:'administrador'
       },
       error:''
    }
  },
  methods: {
      guardar_usuario(){
        // let telefono=this.usuario.telefono;
        if(this.register.password!==this.register.repassword){
          this.$toast.add({severity:'error', summary: 'Error', detail:'La contraseñas no coinciden!', life: 3000});
          
        }
        else{
          
           firebase.auth().createUserWithEmailAndPassword(this.register.email, this.register.password).then((response)=>{
            var user = firebase.auth().currentUser;
             

        

              axios.post('https://us-central1-manifest-life-279516.cloudfunctions.net/Usuarios',qs.stringify(this.usuario),{
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        }).then( (response) =>  {
                var id =response.data.id;
                user.updateProfile({
                      displayName:this.usuario.username+'-'+id+'-'+this.usuario.rol
                    }).then(function() {
                      return "actualizado";
                      
                    
                    }).catch(function(error) {
                      // An error happened.
                      return error;
                    });   
                    
                    this.$toast.add({severity:'success', summary: 'Correcto', detail:response.data.mensaje, life: 3000});
                    setTimeout(()=>{
                      this.$router.push('/'); 
                    },3500)
                     
              }).catch(error => {
                  console.log(error);
              });

             

            console.log(user);
        }).catch((error) => {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // ...
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
              case 'auth/weak-password':
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
                 this.error= error.code
                
            }
              
                     
        this.$toast.add({severity:'error', summary: 'Error', detail:this.error, life: 3000}); 
        
      });
        }
           
    }
  },
}
</script>
