<template>
    <div>
    <CRow>
      <CCol>
        <CCard>
        {{zonasFormCobrador.empresa}}
                 {{zonasFormCobrador.zonas}}
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
      <CCol>
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
                />
               
         </CCardBody>
        </CCard>
      </CCol>
    </CRow>
      <CRow>
        <CCol>
        <CCard>
         <CCardHeader>
        <strong>Asingar Cobradores:</strong>
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
          {{selectionItem}}
        <PickList v-model="cobradores" :dataKey="cobradores.id" @move-all-to-target="getItems" @move-to-target="getItems"  @move-all-to-source="removeAll" @move-to-source="setItems" :selection.sync="selection">
            <template #sourceHeader>
        Cobradores
    </template>
    <template #targetHeader>
        Seleccionados
    </template>
    <template #item="slotProps">
        <div class="p-caritem">
            <!-- <img :src="'demo/images/car/' + slotProps.item.brand + '.png'"> -->
            <div>
                <!-- <span class="p-caritem-vin">Id:{{slotProps.item.id}}</span> -->
                <!-- {{slotProps.item}} -->
               
                 <span><b>Identificacion:</b> {{slotProps.item.Identificacion}}</span>
                  <span><b>Nombre:</b> {{slotProps.item.Nombre}} {{slotProps.item.Apellido}}</span>
                 <span><b>Telefono:</b> {{slotProps.item.Telefono}}</span>
                 <span><b>Direccion:</b> {{slotProps.item.Direccion1}}</span>
                <!-- <span>Nombre:{{slotProps.item}}</span>
                <span>Apellido:{{slotProps.item}}</span>
                 <span>Identificacion:{{slotProps.item.Identificacion}}</span> -->
            </div>
        </div>
    </template>
</PickList>
{{selection}}
{{selectionItemSelccionado}}
      </CCardBody>
      <CCardFooter align="right">
        <CButton color="success"  @click="onGuardarCobrador" >GUARDAR</CButton>
      </CCardFooter>
      </CCard>
    </CCol>
</CRow>
 <Toast  autoZIndex position="bottomright" />
      

        <!-- <CCard>
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
      <CCol sm="12"> -->
      <!-- <CSelect
                  label="Empresas"
                  :options="empresas"
                  :value.sync="zonas_form.empresa"
                /> -->
      <!-- </CCol>
    </CRow>
    
    </CCardBody>
    <CCardFooter>
      <CRow>
       <CCol col="4" sm="4" md="2" xl class="mb-3 mb-xl-0">
            <CButton color="success"  @click="guardar" >GUARDAR</CButton>
          </CCol>
    </CRow>
    </CCardFooter>
     </CCard> -->
    </div>
</template>

<script>
import ZonaService from './Services/ZonaService.js';
import CobradoresService from '../Cobradores/Services/CobradoresService.js';
import EmpresaService from '../Empresa/Services/EmpresasService.js';

export default {
    data() {
        return {
        zonasFormCobrador:{
          empresa:'',
          zonas:''
        },
        isEnabled:true,
        zonas_empresas:[],
        cobradores:[],
        zonaService:null,
        cobradoresService:null,
        empresaService:null,
        selection:[],
        selectionItem:[],
        selectionItemSelccionado:{
          id:''
        },
        empresas:[{ value: 'Seleccione', label: 'Seleccione' }],
        zonas:[{ value: 'Seleccione', label: 'Seleccione' }]
        
        }
    },
     created() {
        this.zonaService = new ZonaService();
        this.cobradoresService = new CobradoresService();
        this.empresaService= new EmpresaService();
    },
    beforeMount() {

      let tamporal_empresas=[];
      this.empresaService.getAllEmpresas().then((result)=>{
        
        tamporal_empresas=result.data;
          for (const key in tamporal_empresas) {
            if (tamporal_empresas.hasOwnProperty(key)) {
                 let element={ value: tamporal_empresas[key].id, label: tamporal_empresas[key].Nombre };
                 
                 this.empresas.push(element);
                 
                
            }
         }
        
        });
   
        let cobradores = this.cobradoresService.getAllCobradores();
         cobradores.then((response)=>{
            //
            this.cobradores= [response.data.slice(0,5),[]]
            //console.log(this.cobradores);
       
             
         });

    },
    methods:{
        onGuardarCobrador(){
          console.log(this.selection);
          
          this.zonaService.guardarCobradoresZona(this.zonasFormCobrador.empresa,this.zonasFormCobrador.zonas,this.selectionItemSelccionado).then(response=>{
            let mensaje=response.mensaje;
            console.log(response);
            if(mensaje){
              this.$toast.add({severity:'success', summary: 'Correcto', detail:mensaje, life: 3000});    
            }
                 
          }).catch((error) => {
            this.$toast.add({severity:'error', summary: 'Error', detail:error, life: 3000});
          });   
        },
        getItems(event){
          for (const iterator of event.items) {
             console.log(iterator.id);
             this.selectionItem.unshift(iterator.id);
            console.log(event.items.id);
            this.selectionItemSelccionado.id=iterator.id;
            
          }
          
            
           
        },
        removeAll(){
          this.selectionItem=[];
          this.selectionItemSelccionado={
          id:''
        }
        },
        setItems(event){
            // this.selectionItem.pop(event.items);
            // console.log(event.items.id);
            // this.selectionItemSelccionado={};
        },
        onSelectdEmpresa(){
            this.isEnabled=false;
            this.zonas=[{ value: 'Seleccione', label: 'Seleccione' }];
            let tamporal_Zonas=[];
            
            let zonasEmpresa=this.zonaService.getAllZonasEmpresa(this.zonasFormCobrador.empresa,'Zonas');
            
            zonasEmpresa.then((response)=>{
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

            
      }     
    }
  }
</script>

<style lang="less">
.p-caritem {
    display: flex;
    align-items: center;

    div {
        display: flex;
        flex-direction: column;
    }

    .p-caritem-vin {
        font-weight: 600;
        display: block;
        margin-bottom: .25rem;
    }

    img {
        width: 48px;
        height: 48px;
        margin-right: .5rem;
    }
}
    
</style>