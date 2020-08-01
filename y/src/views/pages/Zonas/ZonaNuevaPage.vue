<template>
    <div>
      <CForm @submit.prevent="onGuardarZona" method="post" novalidate>
        <CCard>
         <CCardHeader>
        <strong>Zona:</strong>
        <div class="card-header-actions">
          <a 
            href="https://coreui.io/vue/docs/components/button-components" 
            class="card-header-action" 
            rel="noreferrer noopener" 
            target="_blank"
          >
            
          </a>
        </div>
      </CCardHeader>
         <CCardBody>
    <CRow>
      <CCol sm="12">
        <CInput
          label="Nombre"
          placeholder="Ingresa el nombre de la empresa"
          v-model="zonas_form.nombre"
        />
      </CCol>
    </CRow>
    <CRow>
    <CCol sm="12">
      <CInput
                description="Ingrese la descripcion de la zona."
                label="Descripcion"
                type="textarea"
                placeholder="Descripcion"
                v-model="zonas_form.descripcion_zona"
              />
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="12">
        <CInput
                  label="Balance"
                  append=".000"
                  description="Balance inicial"
                  prepend="$"
                  :value=0
                  readonly
                  v-model="zonas_form.balance"
         />
      </CCol>
      <!-- <CCol sm="12">
             <CInput
                label="Fecha y Hora"
                type="datetime"
                :value="fecha_hora_value"
                v-model="zonas_form.fecha_hora"
              />
      </CCol> -->
      <CCol sm="12">
      <CSelect
                  label="Empresas"
                  :options="empresas"
                  :value.sync="zonas_form.empresa"
                  
                />
      </CCol>
    </CRow>
    
    </CCardBody>
    <CCardFooter>
      <CRow>
       <CCol col="4" sm="4" md="2" xl class="mb-3 mb-xl-0">
            <CButton type="submit" size="sm" color="success" >GUARDAR</CButton>
          </CCol>
    </CRow>
    </CCardFooter>
     </CCard>
      </CForm>
     <Toast  autoZIndex position="bottomright" />
    </div>
</template>

<script>
import ZonaService from './Services/ZonaService.js';
import EmpresaService from '../Empresa/Services/EmpresasService.js';
export default {
    data() {
        return {
        zonas_form:{
          nombre:'',
          balance:0,
          fecha:new Date().toISOString().slice(0,10),
          hora: this.$moment(new Date()).format("hh:mm:ss"),
          empresa:'',
          descripcion_zona:''
        },
        empresas:[{ value: 'Seleccione', label: 'Seleccione' }],
        zonaService:null,
        empresaService:null,
        usuarioOnLogin:''
        }
        
    },
    created() {
        this.zonaService = new ZonaService();
        this.empresaService= new EmpresaService();
    },
    beforeMount() {
      this.fecha_hora_value=this.$moment(new Date()).format("MM/DDDD/YYYY hh:mm:ss"),
      this.usuarioOnLogin=localStorage.getItem('id');
      let tamporal=[];
      let empresas= this.empresaService.getAllEmpresas(this.usuarioOnLogin);
        empresas.then((result)=>{
        
        tamporal=result.data;
          for (const key in tamporal) {
            if (tamporal.hasOwnProperty(key)) {
                 let element={ value: tamporal[key].id, label: tamporal[key].Nombre };
                 this.empresas.push(element);
                 
                
            }
         }
        
        });

      
    },
    methods:{
        onGuardarZona(){
//           const params = new URLSearchParams();
// params.append('param1', 'value1');
// params.append('param2', 'value2');
          this.zonaService.guardarZonaEmpresa(this.usuarioOnLogin,this.zonas_form.empresa,this.zonas_form).then(response=>{
            let mensaje=response.mensaje;
            console.log(response);
            if(mensaje){
              this.$toast.add({severity:'success', summary: 'Correcto', detail:mensaje, life: 3000});    
            }
                 
          }).catch((error) => {
            this.$toast.add({severity:'error', summary: 'Error', detail:error, life: 3000});
          });   
     }
    }
}
</script>