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
                  :value=form_transaccion.valor
                  description="Ingresa el valor de la transferencia"
                  prepend="$"
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
          envia:'', 
          valor:0,
          estado_transaccion:false,
          fecha:new Date().toISOString().slice(0,10),
          hora: '',
          mensaje:'',
          idEnvia:'',
          idRecibe:''
          },
          idSeleccionadaEmpresa:'',
          idSeleccionadaZona:'',
          nuevo_balanceempresa:0,
          valor_sin_puntos:0
        }
    },
      created() {
        this.zonaService = new ZonaService();
        this.empresaService= new EmpresaService();
    },
    beforeMount(){
      this.loading = true;
      this.usuarioOnLogin=localStorage.getItem('id');
      let tamporal_empresas=[];
      this.empresaService.getAllEmpresas(this.usuarioOnLogin).then((result)=>{
        if(result.data!='Not Found'){
          tamporal_empresas=result.data;
        // console.log(tamporal_empresas);
          for (const key in tamporal_empresas) {
            if (tamporal_empresas.hasOwnProperty(key)) {
                 let element={ value: tamporal_empresas[key].id, label: tamporal_empresas[key].Nombre };
                 
                 this.empresas.push(element);
                 
                
            }
         }
        }
        
        
        });
    },
    methods: {
        getBadge (status) {
      return status === 'Active' ? 'success'
        : status === 'Inactive' ? 'secondary'
          : status === 'Pending' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    },
        onGuardarTransaccion(){
    this.form_transaccion.envia='Empresa'
    this.hora=this.$moment(new Date()).format("hh:mm:ss")
    var sfRef = db.collection("usuarios").doc(this.usuarioOnLogin).collection("empresas").doc(this.idSeleccionadaEmpresa);

sfRef.get().then((doc)=>{

    this.nuevo_balanceempresa=doc.data().Balance;
    this.form_transaccion.valor=this.valor_sin_puntos.split('.').join('');
   
if(this.form_transaccion.valor==0 ||this.form_transaccion.valor==''){
  this.$toast.add({severity:'error', summary: 'Atencion', detail:'La transaccion no se puede realizar, ingrese el saldo a transferir', life: 3000});    
}else if(this.form_transaccion.valor>this.nuevo_balanceempresa || this.nuevo_balanceempresa==0){
   this.$toast.add({severity:'error', summary: 'Atencion', detail:'La transaccion no se puede realizar, el valor a transferir es mayor al saldo de la empresa o no cuenta con saldo.', life: 3000});    
}else{
   db.collection("usuarios").doc(this.usuarioOnLogin).collection("empresas").doc(this.idSeleccionadaEmpresa).collection("Zonas").doc(this.idSeleccionadaZona).collection("Transferencias").add(this.form_transaccion)
    .then(() =>{
        
        this.$toast.add({severity:'success', summary: 'Correcto', detail:'Transaccion Realizada en espera de aprobacion', life: 3000});    
        // let nuevo_balance_empresa=Number(balance_actual_zona)-Number(this.form_transaccion.valor);
        // this.$store.commit('setBalanceZona',nuevo_balance_zona);
    //     this.$f7.dialog.close();
      var batch = db.batch();

// Update the population of 'SF'
// /usuarios/Nf05nKycByv8CrjrzfL6/empresas/mhVF3FZqPlNAx1sV9c0o/Zonas/SmhRYXL86AUXG2JBZaNU


this.nuevo_balanceempresa=Number(this.nuevo_balanceempresa)-Number(this.form_transaccion.valor);

//  console.log(this.nuevo_balanceempresa);
if(this.nuevo_balanceempresa>0 || this.nuevo_balanceempresa==0){
  batch.update(sfRef, {"Balance": this.nuevo_balanceempresa });
 
}
else{
   batch.update(sfRef, {"Balance": 0 });
}




// Commit the batch
      batch.commit().then( () =>{
        this.form_transaccion={
          envia:'', 
          valor:0,
          estado_transaccion:false,
          fecha:new Date().toISOString().slice(0,10),
          hora: '',
          mensaje:'',
          idEnvia:'',
          idRecibe:''
          }
          this.valor_sin_puntos=0
          // ...
          //this.transacccionservice.elminiarTransaccion(this.idad,this.id_empresa,this.id_zona);
          
          // this.$f7router.back();
      });
    })
    .catch((error)=> {
        console.error("Error writing document: ", error);
    });
}




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
          // console.log(this.idSeleccionadaEmpresa);

      }
    },   
}
</script>