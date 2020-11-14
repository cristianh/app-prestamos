<template>
    <div>
     <CCard>
         <CCardHeader>
        <strong>Empresa:</strong>
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
          label="Nombre"
          placeholder="Ingresa el nombre de la empresa"
          v-model="empresa_form.Nombre"
        />
      </CCol>
    </CRow>
    <CRow>
      <!-- @change="onSelectdEmpresa" -->
      <CCol sm="6">
         <CSelect
                  label="Pais"
                  :options="paises"
                  :value.sync="empresa_form.Pais"
                  @change="onSelectdPais"
                  
                />
       
        
      </CCol>
       <CCol sm="6">
        <CInput
                  label="Balance"
                  description="Ingresa del balance inicial"
                  prepend="$"
                  :value=empresa_form.Balance
                   v-currency="{
                    locale: 'de-DE',
                    currency: null,
                    valueAsInteger: true,
                    distractionFree: false,
                    precision:0,
                    autoDecimalMode: true,
                    valueRange: { min: 0 },
                    allowNegative: false
                  }"
                  v-model="valor_sin_puntos"
         />
        
      </CCol>
      <!-- @change="onSelectdEmpresa" -->
      <!-- <CCol sm="4">
         <CSelect
                  label="Departamento"
                  :options="departamentos"
                  :value.sync="empresa_form.Departamento"
                  @change="onSelectdDepartamento"
                />
       
        
      </CCol>
      <CCol sm="4">
         <CSelect
                  label="Ciudad"
                  :options="ciudades"
                  :value.sync="empresa_form.Ciudad"
                  
                />
       
        
      </CCol> -->
    </CRow>
     
     <CRow>
      <CCol sm="12">
      <CInput
                description="Ingrese el mensaje de bienvenida que aparecera en el app."
                label="Mensaje: (opcional)"
                type="textarea"
                placeholder="Mensaje..."
                v-model="empresa_form.Mensaje"
              />
      </CCol>
     </CRow>
    <CRow>
       <CCol col="4" sm="4" md="2" xl class="mb-3 mb-xl-0">
            <CButton color="success"  @click="onGuardarEmpresa" >GUARDAR</CButton>
          </CCol>
    </CRow>
    </CCardBody>
     </CCard>
       
    <WidgetsDropdown/>
    <CCard>
      <CCardBody>
        <CRow>
          <CCol sm="5">
            <h4 id="traffic" class="card-title mb-0">Traffic</h4>
            <div class="small text-muted">November 2017</div>
          </CCol>
          <CCol sm="7" class="d-none d-md-block">
            <CButton color="primary" class="float-right">
              <CIcon name="cil-cloud-download"/>
            </CButton>
            <CButtonGroup class="float-right mr-3">
              <CButton
                color="outline-secondary"
                v-for="(value, key) in ['Day', 'Month', 'Year']"
                :key="key"
                class="mx-0"
                :pressed="value === selected ? true : false"
                @click="selected = value"
              >
                {{value}}
              </CButton>
            </CButtonGroup>
          </CCol>
        </CRow>
        <MainChartExample style="height:300px;margin-top:40px;"/>
      </CCardBody>
      <CCardFooter>
        <CRow class="text-center">
          <CCol md sm="12" class="mb-sm-2 mb-0">
            <div class="text-muted">Visits</div>
            <strong>29.703 Users (40%)</strong>
            <CProgress
              class="progress-xs mt-2"
              :precision="1"
              color="success"
              :value="40"
            />
          </CCol>
          <CCol md sm="12" class="mb-sm-2 mb-0 d-md-down-none">
            <div class="text-muted">Unique</div>
            <strong>24.093 Users (20%)</strong>
            <CProgress
              class="progress-xs mt-2"
              :precision="1"
              color="info"
              :value="20"
            />
          </CCol>
          <CCol md sm="12" class="mb-sm-2 mb-0">
            <div class="text-muted">Pageviews</div>
            <strong>78.706 Views (60%)</strong>
            <CProgress
              class="progress-xs mt-2"
              :precision="1"
              color="warning"
              :value="60"
            />
          </CCol>
          <CCol md sm="12" class="mb-sm-2 mb-0">
            <div class="text-muted">New Users</div>
            <strong>22.123 Users (80%)</strong>
            <CProgress
              class="progress-xs mt-2"
              :precision="1"
              color="danger"
              :value="80"
            />
          </CCol>
          <CCol md sm="12" class="mb-sm-2 mb-0 d-md-down-none">
            <div class="text-muted">Bounce Rate</div>
            <strong>Average Rate (40.15%)</strong>
            <CProgress
              class="progress-xs mt-2"
              :precision="1"
              :value="40"
            />
          </CCol>
        </CRow>
      </CCardFooter>
    </CCard>
    <WidgetsBrand/>
     <Toast  autoZIndex position="bottomright" />
    </div>
</template>

<script>
import MainChartExample from '@/views/charts/MainChartExample'
import WidgetsDropdown from '@/views/widgets/WidgetsDropdown'
import WidgetsBrand from '@/views/widgets/WidgetsBrand'
import EmpresaService from '../Empresa/Services/EmpresasService.js';
import paisesData from '@/views/Paises/Paises.js'
import ciudadesData from '@/views/Ciudades/Ciudades.js'
export default {
  name: 'Dashboard',
  components: {
    MainChartExample,
    WidgetsDropdown,
    WidgetsBrand
  },
  data () {
    return {
      paises_data:paisesData,
      ciudades_data:ciudadesData,
      usuarioOnLogin:'',
      paises:[{ value: 'Seleccione', label: 'Seleccione' }],
      departamentos:[{ value: 'Seleccione', label: 'Seleccione' }],
      ciudades:[{ value: 'Seleccione', label: 'Seleccione' }],
      valor_sin_puntos:0,
      empresa_form:{
          Nombre:'',
          Balance:0,
          Mensaje:'',
          Pais:'',
          Departamento:'',
          Ciudad:'',
          contador_zonas:0,
          contador_clientes:0,
          contador_cobradores:0,
          contador_empresas:0
      },
      empresaService:null,
      selected: 'Month',
      tableItems: [
        {
          avatar: { url: 'img/avatars/1.jpg', status: 'success' },
          user: { name: 'Yiorgos Avraamu', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'USA', flag: 'cif-us' },
          usage: { value: 50, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Mastercard', icon: 'cib-cc-mastercard' },
          activity: '10 sec ago'
        },
        {
          avatar: { url: 'img/avatars/2.jpg', status: 'danger' },
          user: { name: 'Avram Tarasios', new: false, registered: 'Jan 1, 2015' },
          country: { name: 'Brazil', flag: 'cif-br' },
          usage: { value: 22, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Visa', icon: 'cib-cc-visa' },
          activity: '5 minutes ago'
        },
        {
          avatar: { url: 'img/avatars/3.jpg', status: 'warning' },
          user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'India', flag: 'cif-in' },
          usage: { value: 74, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Stripe', icon: 'cib-stripe' },
          activity: '1 hour ago'
        },
        {
          avatar: { url: 'img/avatars/4.jpg', status: '' },
          user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'France', flag: 'cif-fr' },
          usage: { value: 98, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'PayPal', icon: 'cib-paypal' },
          activity: 'Last month'
        },
        {
          avatar: { url: 'img/avatars/5.jpg', status: 'success' },
          user: { name: 'Agapetus Tadeáš', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'Spain', flag: 'cif-es' },
          usage: { value: 22, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Google Wallet', icon: 'cib-google-pay' },
          activity: 'Last week'
        },
        {
          avatar: { url: 'img/avatars/6.jpg', status: 'danger' },
          user: { name: 'Friderik Dávid', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'Poland', flag: 'cif-pl' },
          usage: { value: 43, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Amex', icon: 'cib-cc-amex' },
          activity: 'Last week'
        }
      ],
      tableFields: [
        { key: 'avatar', label: '', _classes: 'text-center' },
        { key: 'user' },
        { key: 'country', _classes: 'text-center' },
        { key: 'usage' },
        { key: 'payment', label: 'Payment method', _classes: 'text-center' },
        { key: 'activity' },
      ]
    }
  },
  computed: {
    
  },
  created() {
        this.empresaService= new EmpresaService();
  },
  beforeMount() {
     this.usuarioOnLogin=localStorage.getItem('id');
    //  axios.get('https://restcountries.eu/rest/v2/region/americas?fields=name;').then((resp)=>{
        
    //   //  =
    //  })

    for (const key in this.paises_data) {
            if (this.paises_data.hasOwnProperty(key)) {
                
                  let element={ value: this.paises_data[key].name, label: this.paises_data[key].name };
                  this.paises.push(element);
                 
            }
        }  

        

  },
  methods: {
    onSelectdPais($event){
      
      if(this.empresa_form.Pais==="Colombia"){ 
         for (const key in this.ciudades_data) {
            if (this.ciudades_data.hasOwnProperty(key)) {
                
                  let element={ value: this.ciudades_data[key].id, label: this.ciudades_data[key].departamento};
                  this.departamentos.push(element);
                 
            }
        }  
      }
      else if(this.empresa_form.Pais==="Brazil"){ 
         for (const key in this.ciudades_data) {
            if (this.ciudades_data.hasOwnProperty(key)) {
                
                  let element={ value: this.ciudades_data[key].id, label: this.ciudades_data[key].departamento};
                  this.departamentos.push(element);
                 
            }
        }  
      }
       else if(this.empresa_form.Pais==="Mexico"){ 
         for (const key in this.ciudades_data) {
            if (this.ciudades_data.hasOwnProperty(key)) {
                  let element={ value: this.ciudades_data[key].id, label: this.ciudades_data[key].departamento};
                  this.departamentos.push(element);
                 
            }
        }  
      }
      
    },
     onSelectdDepartamento($event){
      
  
         for (const key in this.ciudades_data) {
            
              if (this.ciudades_data.hasOwnProperty(key)) {
                
                if(this.ciudades_data[key].id==$event.target.value){
                  
                  this.empresa_form.Departamento=this.ciudades_data[key].departamento
                  this.ciudades_data[key].ciudades.forEach(ciudades => {
                    let element={ value: ciudades, label: ciudades};
                    this.ciudades.push(element);
                  });
                  
                 
                  
     
            }
            }
      }
      
    },
    onGuardarEmpresa(){
     
      //this.empresaService.guardarEmpresa(this.empresa_form).then(rsp=>{
        this.empresa_form.Balance=this.valor_sin_puntos.split('.').join('');
        this.empresaService.guardarEmpresa(this.usuarioOnLogin,this.empresa_form).then(rsp=>{
      
        localStorage.setItem('empresa',rsp.id);
        this.$toast.add({severity:'success', summary: 'Correcto.', detail:rsp.mensaje, life: 3000});
        this.departamentos=[{ value: 'Seleccione', label: 'Seleccione' }],
        this.ciudades=[{ value: 'Seleccione', label: 'Seleccione' }],  
        this.empresa_form={
          Nombre:'',
          Balance:'',
          Mensaje:'',
          Pais:'',
          Departamento:'',
          Ciudad:'',
          contador_zonas:0,
          contador_clientes:0,
          contador_cobradores:0,
          contador_empresas:0
      }
      this.valor_sin_puntos=0
      
      }).catch((error) => {
        //return response.status(500).send(error);
        this.$toast.add({severity:'warn', summary: 'Error.', detail:error, life: 3000});  
      });
      //axios.post('https://us-central1-manifest-life-279516.cloudfunctions.net/EmpresasGuardarZonas?doc=GO7yltXDczsVav0oln4a&sub=zonas',{data:'hola'}).then( response => {response.data}).catch(error => {return error}); 
   
    },
    color (value) {
      let $color
      if (value <= 25) {
        $color = 'info'
      } else if (value > 25 && value <= 50) {
        $color = 'success'
      } else if (value > 50 && value <= 75) {
        $color = 'warning'
      } else if (value > 75 && value <= 100) {
        $color = 'danger'
      }
      return $color
    }
  }
}
</script>