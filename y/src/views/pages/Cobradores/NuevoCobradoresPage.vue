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
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban"/> Reset</CButton>
            </CCardBody>
      </CCard>
      </CCol>
      </CRow>
      <Toast  autoZIndex position="bottomright" />
     {{$data.usuario}}
     {{$data.register}}
    </div>
</template>

<script>
import ZonaService from '../Zonas/Services/ZonaService.js';
import EmpresaService from '../Empresa/Services/EmpresasService.js';
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
          empresa:''
       },
      isEnabled:true,
      empresas:[{ value: 'Seleccione', label: 'Seleccione' }],
      zonas:[{ value: 'Seleccione', label: 'Seleccione' }]
       
        
        }
    },
     created() {
        this.zonaService = new ZonaService();
        this.empresaService= new EmpresaService();
    },
    beforeMount(){
      let tamporal_empresas=[];
      this.empresaService.getAllEmpresas().then((result)=>{
        
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
            
            this.zonaService.getAllZonasEmpresa(this.usuario.empresa,'Zonas').then((response)=>{
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
                this.$toast.add({severity:'success', summary: 'Correcto', detail:'Usuario Guardado.', life: 3000});  
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