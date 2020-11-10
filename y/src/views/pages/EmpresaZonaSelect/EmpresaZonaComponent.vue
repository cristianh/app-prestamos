<template>
    <div>
    <CRow>
      <CCol>
        <CCard>
        <!-- {{zonasFormCobrador.empresa}} -->
                 <!-- {{zonasFormCobrador.zonas}} -->
         <!-- <CCardHeader>
           Empresas:
         </CCardHeader> -->
         <CCardBody>
           <CSelect
                  label="Empresas"
                  :options="empresas"
                  :value.sync="zonasFormCobrador.empresa"
                  @change="onSelectdEmpresa"
                />
                 
         </CCardBody>
        </CCard>
      </CCol>
      <CCol v-if="isVisibleZona">
         <CCard>
         <!-- <CCardHeader>
           Zonas:
         </CCardHeader> -->
         <CCardBody>
            <CSelect
                  label="Zonas"
                  :options="zonas"
                  :value.sync="zonasFormCobrador.zonas"
                  :disabled=isEnabled
                  @change="onSelectdZona"
                />
               
         </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    </div>
</template>

<script>
import ZonaService from '../Zonas/Services/ZonaService.js';
import EmpresaService from '../Empresa/Services/EmpresasService.js';
export default {
    props:{
        isVisibleZona:{
            type:Boolean,
            default:true,
        },
        allInfoZona:{
            type:Boolean,
            default:false
        }

    },
    data() {
        return {
        zonasFormCobrador:{
          empresa:'',
          zonas:''
        },
        usuarioOnLogin:'',
        isEnabled:true,
        zonas_empresas:[],
        zonaService:null,
        cobradoresService:null,
        empresaService:null,
        empresas:[{ value: 'Seleccione', label: 'Seleccione' }],
        zonas:[{ value: 'Seleccione', label: 'Seleccione' }]
        }
    },
    created() {
        this.zonaService = new ZonaService();
        this.empresaService= new EmpresaService();
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
    methods: {
       onSelectdEmpresa(){
            this.isEnabled=false;
            this.zonas=[{ value: 'Seleccione', label: 'Seleccione' }];
            let tamporal_Zonas=[];
            let zonasEmpresa=this.zonaService.getAllZonasEmpresa( this.usuarioOnLogin,this.zonasFormCobrador.empresa,'Zonas');
            
            zonasEmpresa.then((response)=>{
          
            tamporal_Zonas=response;
            console.log(tamporal_Zonas);
            for (const key in tamporal_Zonas) {
            if (tamporal_Zonas.hasOwnProperty(key)) {
                
                  let element={ value: tamporal_Zonas[key].id, label: tamporal_Zonas[key].nombre };
                  this.zonas.push(element);
                  
            }
        }   
             
        });  
        this.$emit('onSelectedEmpresa', this.zonasFormCobrador.empresa)
      },
      onSelectdZona($event){
          if(this.allInfoZona){
               let posicion_zona=this.zonas.findIndex(x=>x.value==$event.target.value)
       
         this.$emit('onSelectedZona', this.zonas[posicion_zona])

       
          }else{
             this.$emit('onSelectedZona', this.zonasFormCobrador.zonas)
          }
         
      } 
    }
    
}
</script>