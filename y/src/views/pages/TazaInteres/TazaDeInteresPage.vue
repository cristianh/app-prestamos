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
       <CCol col="4" sm="4" md="2" xl class="mb-3 mb-xl-0">
            <CButton color="success"  @click="onGuardarPlan" >GUARDAR</CButton>
          </CCol>
    </CRow>
    </CCardBody>
     </CCard>
       
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
          plazo:'' 
      },
       usuarioOnLogin:'',
      empresaService:null
    }
  },
  beforeMount() {
    this.usuarioOnLogin=localStorage.getItem('id');
  },
  created() {
        this.empresaService= new EmpresaService();
  },
  methods: {
    onGuardarPlan(){
      this.empresaService.guardarNuevoPlanEmpresa(this.usuarioOnLogin,this.planpago_form).then(rsp=>{
        this.$toast.add({severity:'success', summary: 'Correcto.', detail:'Plan creado', life: 3000});  
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