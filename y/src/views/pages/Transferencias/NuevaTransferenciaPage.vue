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
                  @change="onZonaSeleccionada"
                />
         </CCardBody>
        </CCard>
      </CCol>
      </CRow>
   
      <CRow>
      <CCol sm="12">
           <CCard>
         <CCardBody>
              <CInput
                description="Ingrese el mensaje descriptivo para la transaccion."
                label="Mensaje: (opcional)"
                type="textarea"
                placeholder="Mensaje..."
                v-model="form_transaccion.mensaje"
              />
        <CInput
                  label="Valor"
                  append=".000"
                  description="Ingresa el valor de la transferencia"
                  prepend="$"
                  v-model="form_transaccion.valor"
         />
         </CCardBody>
          <CCardFooter align="right">

            <CButton color="success"  @click="onGuardarTransaccion">ENVIAR</CButton>
   
          </CCardFooter>
           </CCard>
        
      </CCol>
      
    
    </CRow>
     <Toast  autoZIndex position="bottomright" />
    </div>
</template>

<script>
import ZonaService from '../Zonas/Services/ZonaService.js';
import EmpresaService from '../Empresa/Services/EmpresasService.js';
export default {
    data() {
        return {
            zonaService:null,
            empresaService:null,
            isEnabled:true,
            empresas:[{ value: 'Seleccione', label: 'Seleccione' }],
            zonas:[{ value: 'Seleccione', label: 'Seleccione' }],
            usuario:{
            zona:'',
            empresa:''
            },
          form_transaccion:{
          Envia:'', 
          valor:0,
          estado_transaccion:false,
          fecha:new Date().toISOString().slice(0,10),
          hora: this.$moment(new Date()).format("hh:mm:ss"),
          mensaje:''
          },
          idSeleccionadaEmpresa:'',
          idSeleccionadaZona:''
        }
    },
      created() {
        this.zonaService = new ZonaService();
        this.empresaService= new EmpresaService();
    },
    beforeMount(){
      this.usuarioOnLogin=localStorage.getItem('id');
      let tamporal_empresas=[];
      this.empresaService.getAllEmpresas(this.usuarioOnLogin).then((result)=>{
        
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
    methods: {
        onGuardarTransaccion(){
    this.form_transaccion.Envia='Empresa';
      db.collection("usuarios").doc(this.usuarioOnLogin).collection("empresas").doc(this.idSeleccionadaEmpresa).collection("Zonas").doc(this.idSeleccionadaZona).collection("Transferencias").doc('nueva_transaccion').set(this.form_transaccion)
    .then(() =>{
        console.log("Document successfully written!");
        this.$toast.add({severity:'success', summary: 'Correcto', detail:'Transaccion Realizada en espera de aprobacion', life: 3000});    
    //  let nuevo_balance_zona=Number(balance_actual_zona)-Number(this.form_transaccion.valor);
    //  this.$store.commit('setBalanceZona',nuevo_balance_zona);
    //     this.$f7.dialog.close();
    })
    .catch((error)=> {
        console.error("Error writing document: ", error);
    });
     

        },
        onSelectdEmpresa(){
            this.isEnabled=false;
            this.zonas=[{ value: 'Seleccione', label: 'Seleccione' }];
            let tamporal_Zonas=[];
            this.idSeleccionadaEmpresa=this.usuario.empresa;
            this.zonaService.getAllZonasEmpresa(this.usuarioOnLogin,this.usuario.empresa,'Zonas').then((response)=>{
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
      onZonaSeleccionada($event){
          this.idSeleccionadaZona=$event.target.value;

      }
    },   
}
</script>