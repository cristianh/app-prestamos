<template>
<div>
<div v-if="getContadorTransacciones>0">
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
     
      <CHeaderNavItem class="d-md-down-none mx-2">
        <CHeaderNavLink >
          <CIcon  name="cil-bell"/>
          <CBadge v-if="getContadorTransacciones>0" color="warning"  class="ml-auto">{{getContadorTransacciones}}</CBadge>
        </CHeaderNavLink>
      </CHeaderNavItem>
    </template>
     <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Notificacion</strong>
    </CDropdownHeader>
    <CDropdownItem  @click="irNotificaciones">
     
      <CIcon name="cil-dollar" /> Tiene una nueva transferencia.
    </CDropdownItem>
  </CDropdown>
</div>
<div v-else>
       <CHeaderNavItem class="d-md-down-none mx-2">
        <CHeaderNavLink >
          <CIcon  name="cil-bell"/>
        </CHeaderNavLink>
      </CHeaderNavItem>
</div>
</div>
</template>

<script>
export default {
  name: 'TheHeaderDropdownTransaccion',
  data () {
    return { 
      itemsCount: 42
    }
  },
  methods: {
    irNotificaciones(){
      console.log(this.$router.currentRouter);
    this.$router.replace('/notificaciones');
    },
    oneDetectarTransacciones(){
          this.idad=localStorage.getItem('id');
      console.log('created');
    
    this.$store.commit('setEliminarDatosTransferencia');
    this.$store.commit('setReiniciarContadorTransacciones');
    db.collection("usuarios").doc(this.idad).collection("empresas").get().then((querySnapshot)=> {
    querySnapshot.forEach((doc)=> {
     
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
    let transferencia= db.collection("usuarios").doc(this.idad).collection("empresas").doc(doc.id).collection('Transferencias')
      transferencia.where("transaccion_nueva", "==", true)
      transferencia.where("estado_transaccion", "==", false)
      .onSnapshot((snapshot)=> {
    
   if(snapshot.docChanges().length>=1){
     this.$toast.add({severity:'info', summary: 'Atencion!', detail: 'Tiene un nueva transaccion.', life: 6000});  
   }
      
      //  console.log(typeof(snapshot.t.docs))
        snapshot.docChanges().forEach((change)=> {
            
            if (change.type === "added") {
                let data_transacciones={
                  id:change.doc.id,
                  data:change.doc.data()
                }
                console.log(data_transacciones);
                this.$store.commit('setAumentaContadorTransacciones');
                this.$store.commit('setDatosTransferencia',data_transacciones);
                
                // this.$store.commit('setAumentaContadorTransferencias');
                // this.$store.commit('setDatosTransferencia',change.doc.data());
                // this.$store.commit('setDatosTransferenciaPendientes',this.form_transaccion);
                // console.log("New: ", change.doc.data());
                
            }
            if (change.type === "modified") {
                console.log("Modified city: ", change.doc.data());
                 let data_transacciones={
                  id:change.doc.id,
                  data:change.doc.data()
                }
                console.log(data_transacciones);
                this.$store.commit('setAumentaContadorTransacciones');
                this.$store.commit('setDatosTransferencia',data_transacciones);
                
                // this.$store.commit('setAumentaContadorTransferencias');
                // this.$store.commit('setDatosTransferencia',change.doc.data());
                // this.$store.commit('setDatosTransferenciaPendientes',this.form_transaccion);
                // console.log("New: ", change.doc.data());
                
            }
           
        });
    });

     let transferenciaAceptada= db.collection("usuarios").doc(this.idad).collection("empresas").doc(doc.id).collection('Transferencias')
      transferenciaAceptada.where("transaccion_nueva", "==", true)
      transferenciaAceptada.where("estado_transaccion", "==", true)
      .onSnapshot((snapshot)=> {
    
  //  if(snapshot.docChanges().length>=1){
  //    this.$toast.add({severity:'info', summary: 'Atencion!', detail: 'Tiene un nueva transaccion.', life: 6000});  
  //  }
      
      //  console.log(typeof(snapshot.t.docs))
        snapshot.docChanges().forEach((change)=> {
            
            // if (change.type === "added") {
          
                
            // }
            // if (change.type === "modified") {
              
                
            // }
            if (change.type === "removed") {
                 
                console.log("Removed city: ", change.doc.data());
                // let posicion=this.items.findIndex(x=>x.data.id==itemsInfo.data.id);
                // this.items.splice(posicion,1);
                
                console.log(change.doc.id);
                this.$store.commit('setEliminarDatoTransferenciaPorId',change.doc.data().id_transaccion);
               
               
            }
        });
    });
        
    //  db.collection("usuarios").doc(this.idad).collection("empresas").doc(doc.id).collection('Transferencias').doc('nueva_transaccion').onSnapshot({includeMetadataChanges: false},(doc) => {
    //       // console.log(doc);
    //  if(doc.exists!=false){
       
    //     console.log("Current data: ", doc.data());
    //     
    //     this.$store.commit('setAumentaContadorTransacciones');
    //     this.$store.commit('setDatosTransferencia',doc.data());
    //  }

    // });
    });
   });

    }
  },
  computed: {
    getContadorTransacciones(){
      return this.$store.getters.getContadorTransacciones;
    }
  },
   beforeMount() {
      this.idad=localStorage.getItem('id');
      this.oneDetectarTransacciones();
      
   }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>