<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="4">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
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
                      <CButton color="primary" class="px-4" @click="signIn">INGRESAR</CButton>
                    </CCol>
                    <CCol col="6" class="text-right">
                      <CButton color="link" class="px-0">Forgot password?</CButton>
                      <CButton color="link" class="d-lg-none">Register now!</CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            
            <!-- <CCard
              color="primary"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <h2>Sign up</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <CButton
                  color="light"
                  variant="outline"
                  size="lg"
                >
                  Register Now!
                </CButton>
              </CCardBody>
            </CCard> -->
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
        signIn() {
                
                    firebase.auth().signInWithEmailAndPassword(this.username, this.password).then((response)=> {
                    console.log(response);
                      this.$router.push('home/dashboard');
                    // ...
                    }).catch((error)=> {
                    // Handle Errors here.
                    
                    //var errorCode = error.code;
                    var errorMessage = error.message;
                    this.error=errorMessage;
                    console.log(errorMessage);
                     this.$toast.add({severity:'error', summary: 'Error', detail:this.error, life: 3000});  
                    
                    });
              }
  }
  
}
</script>
