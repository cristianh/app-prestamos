<template>
    <div>
      <CForm @submit.prevent="guardar_cobrador" novalidate>
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
              >
              <CIcon 
              name="cil-check-circle"/> Registrar</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban"/> Reset</CButton>
            </CCardBody>
      </CCard>
      </CCol>
      </CRow>
     </CForm>
     {{$data.usuario}}
     {{$data.register}}
    </div>
</template>

<script>
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
          telefono:''
       },
        empresas:[]
        
        }
    },

    methods:{
        guardar_cobrador(){
        let telefono=this.usuario.telefono;

        firebase.auth().createUserWithEmailAndPassword(this.register.email, this.register.password).then((response)=>{
            var user = firebase.auth().currentUser;

        

              axios.post('https://us-central1-manifest-life-279516.cloudfunctions.net/Cobradores',this.usuario).then( (response) =>  {
                var id =response.data;
                user.updateProfile({
                      displayName:this.usuario.nombre +" "+this.usuario.apellido+'-'+id,
                      photoURL: "hola"
                    }).then(function() {
                      return "actualizado";
                    
                    }).catch(function(error) {
                      // An error happened.
                      return "error";
                    });   
                
              }).catch(error => {
                  console.log(error);
              });

             

            console.log(user);
        }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
      });
      
           
    }
    
  }
}
</script>