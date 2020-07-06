<template>
  <f7-page name="form">
    <f7-navbar title="Nuevo Cliente" back-link="Back">
   <f7-subnavbar >
      <f7-segmented sliding raised>
        <f7-button tab-link="#Personal" tab-link-active>Personal</f7-button>
        <f7-button tab-link="#Negocio">Negocio</f7-button>
        <f7-button tab-link="#Codeudor">Codeudor</f7-button>
      </f7-segmented>
    </f7-subnavbar>
    </f7-navbar>
    <f7-tabs>
    <f7-tab id="Personal" tab-active >
          <f7-block-title>Fomulario</f7-block-title>
   
    <f7-list no-hairlines-md inset>
        
        <f7-list-input
        outline
        floating-label
        label="Identificacion"
        type="text"
        placeholder="Identificacion"
        required
        validate
        pattern="[0-9]*"
        error-message="Solo numeros"
        @input="form.usuario.identificacion=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Nombre"
        type="text"
        placeholder="Nombre"
        required
        validate
        @input="form.usuario.nombre=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Apellido"
        type="text"
        placeholder="Apellido"
        required
        validate
        @input="form.usuario.apellido=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Direccion 1"
        type="text"
        placeholder="Direccion 1"
        required
        validate
        @input="form.usuario.direccion1=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Direccion 2"
        type="text"
        placeholder="Direccion 2"
        @input="form.usuario.direccion2=$event.target.value"
      ></f7-list-input>
      <f7-list-input
        outline
        floating-label
        label="Telefono"
        type="text"
        placeholder="Telefono"
        required
        validate
        pattern="[0-9]*"
        error-message="Solo numeros"
        @input="form.usuario.telefono=$event.target.value"
      ></f7-list-input>
       <f7-list-input
       outline
        floating-label
        label="Oficio"
        type="text"
        placeholder="Oficio"
        @input="form.usuario.oficio=$event.target.value"
      ></f7-list-input>

     
    </f7-list>

    </f7-tab>
    <f7-tab id="Negocio" >
               <f7-block-title>Negocio</f7-block-title>
   
    <f7-list no-hairlines-md inset>
        
        <f7-list-input
        outline
        floating-label
        label="Nombre negocio"
        type="text"
        placeholder="Nombre Negocio"
        @input="form.negocio.nombre_negocio=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Direccion"
        type="text"
        placeholder="Direccion"
        @input="form.negocio.direccion=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Telefono"
        type="text"
        placeholder="Telefono"
        @input="form.negocio.telefono=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Ciudad"
        type="text"
        placeholder="Ciudad"
        @input="form.negocio.ciudad=$event.target.value"
      ></f7-list-input>     
    </f7-list>
    </f7-tab>
    <f7-tab id="Codeudor" >
       <f7-block-title>Codeudor</f7-block-title>
      <f7-list no-hairlines-md inset>
        <f7-list-input
        outline
        floating-label
        label="Nombre Codeudor"
        type="text"
        placeholder="Nombre Codeudor"
        @input="form.codeudor.nombre_codeudor=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Documento Codeudor"
        type="text"
        placeholder="Documento Codeudor"
        @input="form.codeudor.documento_codeudor=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Telefono Codeudor 1"
        type="text"
        placeholder="Telefono Codeudor 1"
        @input="form.codeudor.telefeno1=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Telefono Codeudor 2"
        type="text"
        placeholder="Telefono Codeudor 2"
        @input="form.codeudor.telefeno2=$event.target.value"
      ></f7-list-input> 

      <f7-list-input
        outline
        floating-label
        label="Telefono Codeudor 3 (opcional)"
        type="text"
        placeholder="Telefono Codeudor 3"
        @input="form.codeudor.telefeno3=$event.target.value"
      ></f7-list-input> 

      <f7-list-input
        outline
        floating-label
        label="Ciudad"
        type="text"
        placeholder="Ciudad"
        @input="form.codeudor.ciudad=$event.target.value"
      ></f7-list-input>  
    </f7-list>
    </f7-tab>
  </f7-tabs>
  
      <f7-block>

  <f7-row>
    
    <f7-col>
        
      <f7-button fill large small @click="onGuardarCliente" color="green">GUARDAR</f7-button>
          
    </f7-col>
    
  </f7-row>
 
</f7-block>
  </f7-page>
</template>

<script>
import ClientesCobradoresService from '../Services/ClientesService.js';
export default {
    data() {
        return {
           cobradoresClientesService:null,
            form:{
                usuario:{
                  identificacion:'',
                  nombre:'',
                  apellido:'',
                  direccion1:'',
                  direccion2:'',
                  oficio:'',
                  telefono:''
                },
                negocio:{
                  nombre_negocio:'',
                  direccion:'',
                  telefeno:'',
                  ciudad:''
                },
                codeudor:{
                  nombre_codeudor:'',
                  documento_codeudor:'',
                  telefeno1:'',
                  telefeno2:'',
                  telefeno3:'',
                  ciudad:''
                },
                prestamos:[],
                cobros:[]
            }
        }
    },
    created() {
       this.ClientesCobradoresService=new ClientesCobradoresService();
    },
    methods:{
        onGuardarCliente(){
  

            let config = {
                     headers: { 'content-type': 'application/json; utf-8' },
                  method: 'POST'
  
    };

     const self = this;
        self.$f7.dialog.preloader('Guardando...');
     let ui_cobrador=localStorage.getItem("uid");

//  await db.collection('cobradores').doc(ui_cobrador).collection('Clientes').add(this.form).then(() => {
//     return response.send('Cliente registrado.');
//   }).catch((error) => {
//     return response.status(500).send(error);
//   });

    //  axios.post(`https://us-central1-manifest-life-279516.cloudfunctions.net/CobradoresGuardarClientes?doc=${ui_cobrador}&sub=Clientes`,this.form)
    this.ClientesCobradoresService.guardarClienteCobrador(ui_cobrador,this.form).then( (response) =>  {
      console.log("................id",response);
       self.$f7.dialog.close();
       let data={
         'id':response.data,
         'data':this.form,
         'nuevo':true
       }
       this.$store.commit('addNewClientes',data);
      // this.$store.state.clientes.push(this.form);
       //this.$store.clientes.push(this.$store.getters.getClientes);
       this.form={
                usuario:{
                  identificacion:'',
                  nombre:'',
                  apellido:'',
                  direccion1:'',
                  direccion2:'',
                  oficio:''
                },
                negocio:{
                  nombre_negocio:'',
                  direccion:'',
                  telefeno:'',
                  ciudad:''
                },
                codeudor:{
                  nombre_codeudor:'',
                  documento_codeudor:'',
                  telefeno1:'',
                  telefeno2:'',
                  telefeno3:'',
                  ciudad:''
                }
            }
        this.$f7router.back()
        console.log(response);
    }).catch(error => {
        console.log(error);
    }); 
        }
    }
}
</script>