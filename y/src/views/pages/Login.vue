<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="9">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-muted">Ingresar a mi cuenta</p>
                  <CInput
                    placeholder="Username"
                    autocomplete="username email"
                    v-model="username"
                  >
                    <template #prepend-content><CIcon name="cil-user"/></template>
                  </CInput>
                  <CInput
                    placeholder="Password"
                    type="password"
                    autocomplete="curent-password"
                    v-model="password"
                  >
                    <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton color="primary" class="px-4"  @click="signIn">INGRESAR</CButton>
                    </CCol>
                    <CCol col="6" class="text-right">
                      <!-- <CButton color="link" class="px-0">Forgot password?</CButton> -->
                      <CButton color="link"  class="d-lg-none">Registrarme</CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            
            <CCard
              color="primary"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <h2>Registrarte</h2>
                <p>Registrate y ten una prueba gratuita por 30 dias.</p>
                <CButton
                  color="light"
                  variant="outline"
                  size="lg"
                  @click="onRegistrarme"
                >
                  Registrarme
                </CButton>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
     <Toast  autoZIndex position="bottomright" />
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      username:'',
      password:'',
      error:''
    }
  },
  methods:{
     onRegistrarme(){
       window.location.replace('#/registro');
       
     },
     signIn() {
                
                  firebase.auth().signInWithEmailAndPassword(this.username, this.password).then((response)=> {
                   
                    const info= response.user.displayName.split("-");
               
                     const usuario_login={
                       'id':info[1],
                       'username':response.user,
                       'displayName':info[0],
                       'email':response.user.email,
                       'ultimaconexion':response.user.metadata.lastSignInTime,
                       'rol':info[2]
                     }
                     localStorage.setItem('id',info[1]);
                     localStorage.setItem('username',response.user);
                     localStorage.setItem('displayName',info[0]);
                     localStorage.setItem('email',info[1],response.user.email);
                     localStorage.setItem('ultimaconexion',response.user.metadata.lastSignInTime);
                     localStorage.setItem('rol',info[2]);

                  
                    //this.$store.commit('setUsurioLogin',usuario_login);
            
                    if(info[2]=='administrador'){
                        //  this.oneDetectarTransacciones();
                         this.$router.push('home/dashboard');
                         
                    }else{
                       this.error='No tiene privilegios para ingresar a eta pagina.';
                       this.$toast.add({severity:'error', summary: 'Error', detail:this.error, life: 3000});  
                        //  this.$router.push('/');
                    }
                     
                    // ...
                    }).catch((error)=> {
                    // Handle Errors here.
                    
                    //var errorCode = error.code;
                  //  var errorMessage = error.message;
            
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
              case 'emailAlreadyInUse':
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
        
 
  }
  
}
</script>
