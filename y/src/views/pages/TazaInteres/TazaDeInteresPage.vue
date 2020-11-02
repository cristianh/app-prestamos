<template>
    <div>
     <CCard>
         <CCardHeader>
        <strong>Nuevo plan de pago:</strong>
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
    <CRow alignHorizontal="start">
      <CCol sm="12">
          
        <CInput
          label="Nombre del plan"
          placeholder="ingrese el nombre del nuevo plan."
          v-model="planpago_form.nombre"
        />
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="12">
        <CInput
                  label="Interes del plan"
                  placeholder="Ingrese el interes del plan"
                  v-model="planpago_form.interes"
         />
        
      </CCol>
    </CRow>
     <CRow>
      <CCol sm="12">
      <CInput
                description="Ingrese los dias de plazo del plan"
                label="Plazo plan (dias)"
                placeholder="dias."
                v-model="planpago_form.plazo"
              />
      </CCol>
     </CRow>
      <CRow>
      <CCol md="12">
        <CSelect
                  label="Empresas"
                  :options="empresas"
                  :value.sync="planpago_form.empresa"
                />
      </CCol>
      </CRow>
    <CRow>
       <CCol col="4" sm="4" md="2" xl class="mb-3 mb-xl-0">
            <CButton color="success"  @click="onGuardarPlan" >GUARDAR</CButton>
          </CCol>
    </CRow>
    </CCardBody>
     </CCard>
       <!-- {{planpago_form}} -->
     <Toast  autoZIndex position="bottomright" />
    </div>
</template>

<script>
import MainChartExample from '@/views/charts/MainChartExample'
import WidgetsDropdown from '@/views/widgets/WidgetsDropdown'
import WidgetsBrand from '@/views/widgets/WidgetsBrand'
import EmpresaService from '../Empresa/Services/EmpresasService.js';

export default {
  name: 'Dashboard',
  components: {
    MainChartExample,
    WidgetsDropdown,
    WidgetsBrand
  },
  data () {
    return {
      planpago_form:{
          nombre:'',
          interes:'',
          plazo:'',
          empresa:'' 
      },
      empresas:[{ value: 'Seleccione', label: 'Seleccione' }],
      idSeleccionadaEmpresa:'',
      usuarioOnLogin:'',
      empresaService:null
    }
  },
  beforeMount() {
    this.usuarioOnLogin=localStorage.getItem('id');
      let tamporal_empresas=[];
      this.empresaService.getAllEmpresas(this.usuarioOnLogin).then((result)=>{
        
        tamporal_empresas=result.data;
        
          for (const key in tamporal_empresas) {
            if (tamporal_empresas.hasOwnProperty(key)) {
                 let element={ value: tamporal_empresas[key].id, label: tamporal_empresas[key].Nombre };
                 
                 this.empresas.push(element);
                 
                
            }
         }
        
        });
  },
  created() {
        this.empresaService= new EmpresaService();
  },
  methods: {
    onGuardarPlan(){
      this.empresaService.guardarNuevoPlanEmpresa(this.usuarioOnLogin,this.planpago_form.empresa,this.planpago_form).then(rsp=>{
        
        this.$toast.add({severity:'success', summary: 'Correcto.', detail:rsp.mensaje, life: 3000});  
        this.planpago_form={
          nombre:'',
          interes:'',
          plazo:''
      };
      }).catch((error) => {
        //return response.status(500).send(error);
        this.$toast.add({severity:'warn', summary: 'Error.', detail:error, life: 3000});  
      });
      //axios.post('https://us-central1-manifest-life-279516.cloudfunctions.net/EmpresasGuardarZonas?doc=GO7yltXDczsVav0oln4a&sub=zonas',{data:'hola'}).then( response => {response.data}).catch(error => {return error}); 
   
    }
  }
}
</script>