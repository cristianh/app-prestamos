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
     
       <CCol sm="6">
         <!-- <pre>{{this.empresas_info}}</pre>
         <pre>{{ciudades_data}}</pre> -->
      <CSelect
                  label="Empresas"
                  :options="empresas"
                  :value.sync="zonas_form.empresa"
                  @change="onSelectEmpresa"
                />
      </CCol>
        <CCol sm="6">
         <CSelect
                  label="Ciudad"
                  :options="ciudades"
                  :value.sync="zonas_form.ciudad"
                  
                />
       
        
      </CCol>
       <CCol sm="12">
        <CInput
          label="Nombre"
          placeholder="Ingresa el nombre de la zona"
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
import ciudadesData from '@/views/Ciudades/Ciudades.js'
export default {
    data() {
        return {
        ciudades_data:ciudadesData,
        zonas_form:{
          nombre:'',
          balance:0,
          fecha:'',
          hora: '',
          empresa:'',
          descripcion_zona:'',
          ciudad:''
        },
        empresas_info:[],
        ciudades:[{ value: 'Seleccione', label: 'Seleccione' }],
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
      this.fecha_hora_value=this.$moment(new Date()).format("MM/DD/YYYY hh:mm:ss"),
      this.usuarioOnLogin=localStorage.getItem('id');
      let tamporal=[];
      this.empresaService.getAllEmpresas(this.usuarioOnLogin).then((result)=>{
        tamporal=result.data;
        this.empresas_info=result.data;
          for (const key in tamporal) {
            if (tamporal.hasOwnProperty(key)) {
                 let element={ value: tamporal[key].id, label: tamporal[key].Nombre };
                 this.empresas.push(element);
                 
                
            }
         }
        
        });

      
    },
    methods:{
      onSelectEmpresa($event){
          console.log($event);
          console.log(this.zonas_form.empresa);
          let empresa=this.empresas_info.filter(x=>x.id==this.zonas_form.empresa);
          console.log(empresa[0].Pais);
          console.log(this.ciudades_data[0].ciudades_principales);
           if(empresa[0].Pais==="Colombia"){ 
         for (const key in this.ciudades_data[0].ciudades_principales) {
            if (this.ciudades_data[0].ciudades_principales.hasOwnProperty(key)) {
                
                  let element={ value: this.ciudades_data[0].ciudades_principales[key], label: this.ciudades_data[0].ciudades_principales[key]};
                  this.ciudades.push(element);
                 
            }
        }  
      }
      },
        onGuardarZona(){
          axios.get('https://worldtimeapi.org/api/timezone/America/Bogota').then((res)=>{
         
          this.zonas_form.hora=this.$moment(res.datetime).format("hh:mm:ss");
          this.zonas_form.fecha=this.$moment(res.datetime).format("MM/DD/YYYY");
          this.zonaService.guardarZonaEmpresa(this.usuarioOnLogin,this.zonas_form.empresa,this.zonas_form).then(response=>{
            let mensaje=response.mensaje;
            console.log(response);
            if(mensaje){
               this.zonas_form={
          nombre:'',
          balance:0,
          fecha:'',
          hora: '',
          empresa:'',
          descripcion_zona:'',
          ciudad:''
        },
              this.$toast.add({severity:'success', summary: 'Correcto', detail:mensaje, life: 3000});    
            }
                 
          }).catch((error) => {
            this.$toast.add({severity:'error', summary: 'Error', detail:error, life: 3000});
          });  
          });
           
     }
    }
}
</script>