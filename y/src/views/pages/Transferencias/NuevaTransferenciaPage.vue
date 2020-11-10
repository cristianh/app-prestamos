<template>
    <div>
       <empresazonaselected  :allInfoZona=true :isVisibleZona=true @onSelectedEmpresa="onEmpresaSeleccionadaParent" @onSelectedZona="onZonaSeleccionadaParent"></empresazonaselected>

   
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
import CobradorService from '../Cobradores/Services/CobradoresService';

export default {
    data() {
        return {
            zonaService:null,
            empresaService:null,
            cobradorService:null,
          form_transaccion:{
          envia:'', 
          valor:0,
          estado_transaccion:0,
          fecha:new Date().toISOString().slice(0,10),
          hora: '',
          mensaje:'',
          recibe:'',
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
        this.cobradorService= new CobradorService();
    },
    beforeMount(){
      this.loading = true;
      this.usuarioOnLogin=localStorage.getItem('id');
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
    console.log(this.usuarioOnLogin);
    console.log(this.idSeleccionadaEmpresa);
    console.log(this.idSeleccionadaZona);
    var sfRef = db.collection("usuarios").doc(this.usuarioOnLogin).collection("empresas").doc(this.idSeleccionadaEmpresa);

sfRef.get().then((doc)=>{

    this.nuevo_balanceempresa=doc.data().Balance;
    this.form_transaccion.valor=this.valor_sin_puntos.split('.').join('');
   
if(this.form_transaccion.valor==0 ||this.form_transaccion.valor==''){
  this.$toast.add({severity:'error', summary: 'Atencion', detail:'La transaccion no se puede realizar, ingrese el saldo a transferir', life: 3000});    
}else if(this.form_transaccion.valor>this.nuevo_balanceempresa || this.nuevo_balanceempresa==0){
   this.$toast.add({severity:'error', summary: 'Atencion', detail:'La transaccion no se puede realizar, el valor a transferir es mayor al saldo de la empresa o no cuenta con saldo.', life: 3000});    
}else{

  this.form_transaccion.idRecibe=this.idSeleccionadaZona
  this.form_transaccion.hora=this.$moment(new Date()).format("hh:mm:ss"),
   db.collection("usuarios").doc(this.usuarioOnLogin).collection("empresas").doc(this.idSeleccionadaEmpresa).collection("Zonas").doc(this.idSeleccionadaZona).collection("Transferencias").add(this.form_transaccion)
    .then(() =>{
        
        this.$toast.add({severity:'success', summary: 'Correcto', detail:'Transaccion Realizada en espera de aprobacion', life: 3000});    

      var batch = db.batch();




this.nuevo_balanceempresa=Number(this.nuevo_balanceempresa)-Number(this.form_transaccion.valor);


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
          estado_transaccion:0,
          fecha:new Date().toISOString().slice(0,10),
          hora:'',
          mensaje:'',
          idEnvia:'',
          idRecibe:'',
          recibe:''
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
      onEmpresaSeleccionadaParent(empresa){
       this.idSeleccionadaEmpresa=empresa
      },
      onZonaSeleccionadaParent(zona){
        this.form_transaccion.recibe=zona.label
        this.idSeleccionadaZona=zona.value;
      }
    },   
}
</script>