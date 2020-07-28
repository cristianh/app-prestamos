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
    this.$router.replace('/notificaciones');
    }
  },
  computed: {
    getContadorTransacciones(){
      return this.$store.getters.getContadorTransacciones;
    }
  },
   beforeMount() {
      this.idad=localStorage.getItem('id');
   }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>