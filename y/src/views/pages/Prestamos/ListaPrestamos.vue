<template>
    <div>
        <empresazonaselected  :isVisibleZona=true @onSelectedZona="onSelectedZonaParent"></empresazonaselected>
        <CCard>
    <CCardHeader>
      <slot name="header">
        <CIcon name="cil-grid"/> Informe
      </slot>
    </CCardHeader>
    
    <CCardBody>

        
         <CRow>
      <CCol md="6">
           <CCard>
         <CCardHeader>
           Desde:   <Calendar id="desde" :showIcon="true" v-model="desde" :monthNavigator="true" :yearNavigator="true" yearRange="2000:2030" />
         </CCardHeader>
        
        </CCard>
      </CCol>
      <CCol md="6">
          <CCard>
         <CCardHeader>
           Hasta:  <Calendar id="hasta" :showIcon="true" v-model="hasta" :monthNavigator="true" :yearNavigator="true" yearRange="2000:2030" />
         </CCardHeader>
         <!-- <CCardBody>
            
         </CCardBody> -->
          </CCard>
      </CCol>
         </CRow>
    </CCardBody>
  </CCard>
    </div>
</template>

<script>
export default {
    data() {
        return {
            zonaSelected:'',
            desde:'',
            hasta:''
        }
    },
    methods: {
        onSelectedZonaParent(zona){
            console.log(zona)
        }
    },
}
</script>