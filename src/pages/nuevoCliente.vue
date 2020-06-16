<template>
  <f7-page name="form">
    <f7-navbar title="Nuevo Cliente" back-link="Back"></f7-navbar>

    <f7-block-title>Fomulario</f7-block-title>
   
    <f7-list no-hairlines-md>
        
        <f7-list-input
        label="Identificacion"
        type="text"
        placeholder="Identificacion"
        @input="form.identificacion=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        label="Nombre"
        type="text"
        placeholder="Nombre"
        @input="form.nombre=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        label="Apellido"
        type="text"
        placeholder="Apellido"
        @input="form.apellido=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        label="Direccion 1"
        type="text"
        placeholder="Direccion 1"
        @input="form.direccion1=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        label="Direccion 2"
        type="text"
        placeholder="Direccion 2"
        @input="form.direccion2=$event.target.value"
      ></f7-list-input>

       <f7-list-input
        label="Oficio"
        type="text"
        placeholder="Oficio"
        @input="form.oficio=$event.target.value"
      ></f7-list-input>

     
    </f7-list>
      <f7-block>

  <f7-row>
    
    <f7-col>
        
      <f7-button fill large small @click="onGuardarCliente" color="green">GUARDAR</f7-button>
       {{$data}}
    </f7-col>
    
  </f7-row>
</f7-block>
  </f7-page>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            form:{
                identificacion:'',
                nombre:'',
                apellido:'',
                direccion1:'',
                direccion2:'',
                oficio:''
            }
        }
    },
    methods:{
        onGuardarCliente(){
                     let config = {
                headers: {"Content-Type": "application/json"}, 
  
    };
    
                axios.post('https://us-central1-manifest-life-279516.cloudfunctions.net/Clientes',this.form,config)
    .then( (response) =>  {
        console.log(response);
    }).catch(error => {
        console.log(error);
    }); 
        }
    }
}
</script>