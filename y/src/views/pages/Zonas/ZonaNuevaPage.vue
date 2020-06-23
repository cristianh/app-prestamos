<template>
    <div>
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
    <CRow form class="form-group" alignHorizontal="start">
      <CCol sm="12">
        <CInput
          label="Nombre"
          placeholder="Ingresa el nombre de la empresa"
          v-model.lazy="zonas_form.nombre"
        />
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="12">
        <CInput
                  label="Balance"
                  append=".000"
                  description="Ingresa del balance inicial"
                  prepend="$"
                  v-model.number="zonas_form.balance"
         />
      </CCol>
      <CCol sm="12">
             <CInput
                label="Date"
                type="date"
                v-model.lazy="zonas_form.fecha"
              />
      </CCol>
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
            <CButton color="success"  @click="guardar" >GUARDAR</CButton>
          </CCol>
    </CRow>
    </CCardFooter>
     </CCard>
     {{$data.zonas_form}}
    </div>
</template>

<script>
import ZonaService from './Services/ZonaService.js';
import EmpresaService from '../Empresa/Services/EmpresasService.js';
export default {
    props:{
            nombre:String,
            balance:Number,
            fecha:String,
            empresa:String
    },
    data() {
        return {
        zonas_form:{
          nombre:'',
          balance:'',
          fecha:'',
          empresa:''
        },
        empresas:[{ value: 'Seleccione', label: 'Seleccione' }],
        zonaService:null,
        empresaService:null
        }
        
    },
    created() {
        this.zonaService = new ZonaService();
        this.empresaService= new EmpresaService();
    },
    beforeMount() {

      let tamporal=[];
      let empresas= this.empresaService.getAllEmpresas();
        empresas.then((result)=>{
        
        tamporal=result.data;
          for (const key in tamporal) {
            if (tamporal.hasOwnProperty(key)) {
                 let element={ value: tamporal[key].id, label: tamporal[key].Nombre };
                 console.log(element);
                 this.empresas.push(element);
                 
                
            }
         }
        
        });
      
        

      

   
    },
    methods:{
        guardar(){
          this.zonaService.guardarZonaEmpresa(this.zonas_form.empresa,this.zonas_form);      
     }
    }
}
</script>