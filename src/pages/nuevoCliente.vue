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
        @input="form.identificacion=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Nombre"
        type="text"
        placeholder="Nombre"
        @input="form.nombre=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Apellido"
        type="text"
        placeholder="Apellido"
        @input="form.apellido=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Direccion 1"
        type="text"
        placeholder="Direccion 1"
        @input="form.direccion1=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Direccion 2"
        type="text"
        placeholder="Direccion 2"
        @input="form.direccion2=$event.target.value"
      ></f7-list-input>

       <f7-list-input
       outline
        floating-label
        label="Oficio"
        type="text"
        placeholder="Oficio"
        @input="form.oficio=$event.target.value"
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
        @input="form.identificacion=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Direccion"
        type="text"
        placeholder="Direccion"
        @input="form.nombre=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Telefono"
        type="text"
        placeholder="Telefono"
        @input="form.apellido=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        label="Ciudad"
        type="text"
        placeholder="Ciudad"
        @input="form.direccion1=$event.target.value"
      ></f7-list-input>     
    </f7-list>
    </f7-tab>
    <f7-tab id="Codeudor" class="page-content">
      <f7-block>
        <p>Donec iaculis posuere massa sed dignissim. Praesent id nibh nec massa mollis egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas...</p>
      </f7-block>
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
     const self = this;
        self.$f7.dialog.preloader('Guardando...');
       
                axios.post('https://us-central1-manifest-life-279516.cloudfunctions.net/Clientes',this.form,config)
    .then( (response) =>  {
       self.$f7.dialog.close();
       this.form={
                identificacion:'',
                nombre:'',
                apellido:'',
                direccion1:'',
                direccion2:'',
                oficio:''
        }
        console.log(response);
    }).catch(error => {
        console.log(error);
    }); 
        }
    }
}
</script>