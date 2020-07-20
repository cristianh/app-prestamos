export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer'
        // badge: {
        //   color: 'primary',
        //   text: 'NEW'
        // }
      },
       {
        _name: 'CSidebarNavTitle',
        _children: ['Menu']
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Empresas',
        route: '/empresa',
        icon: 'cil-puzzle',
        items: [
          {
             name: 'Nueva Empresa',
             to: '/nueva_empresa',
             icon: 'cil-plus'
             
          },
          {
            name: 'Listar Empresas',
            to: '/editar_empresa',
          }
          // {
          //   name: 'MEnsaje',
          //   to: '/borrar_empresa',
          // }
        ]
      },
       {
        _name: 'CSidebarNavDropdown',
        name: 'Planes pago',
        route: '/empresa',
        icon: 'cil-puzzle',
        items: [
          {
             name: 'Nueva Plan Pago',
             to: '/nueva_plan',
             icon: 'cil-plus'
             
          },
          // {
          //   name: 'Listar Empresas',
          //   to: '/editar_empresa',
          // }
          // {
          //   name: 'MEnsaje',
          //   to: '/borrar_empresa',
          // }
        ]
      },
      //  {
      //   _name: 'CSidebarNavTitle',
      //   _children: ['Zonas']
      // },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Zonas',
        route: '/zonas',
        icon: 'cil-puzzle',
        items: [
          {
             name: 'Nueva Zona',
             to: '/nueva_zona',
             icon: 'cil-user-follow',
          },
          {
            name: 'Zonas Cobradores',
            to: '/zonas_cobradores',
          },
          // {
          //   name: 'Borrar Empresa',
          //   to: '/borrar',
          // }
        ]
      },
      //  {
      //   _name: 'CSidebarNavTitle',
      //   _children: ['Cobradores']
      // },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Cobradores',
        route: '/zonas',
        icon: 'cil-puzzle',
        items: [
          {
             name: 'Nueva Cobrador',
             to: '/nueva_cobrador',
             icon: 'cil-user-follow',
          }
          // {
          //   name: 'Editar Empresa',
          //   to: '/editar',
          // },
          // {
          //   name: 'Borrar Empresa',
          //   to: '/borrar',
          // }
        ]
      },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Nueva Empresa',
      //   to: '/pages/nueva',
      //   icon: 'cil-drop'
      // },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Editar Empresa',
      //   to: '/pages/editar',
      //   icon: 'cil-drop'
      // },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Borrar Empresa',
      //   to: '/pages/borrar',
      //   icon: 'cil-drop'
      // },
      //  {
      //   _name: 'CSidebarNavTitle',
      //   _children: ['Clientes']
      // },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Clientes',
        route: '/zonas',
        icon: 'cil-puzzle',
        items: [
          {
             name: 'Listar  Clientes',
             to: '/listar_clientes',
             icon: 'cil-user-follow',
          }
          // {
          //   name: 'Editar Empresa',
          //   to: '/editar',
          // },
          // {
          //   name: 'Borrar Empresa',
          //   to: '/borrar',
          // }
        ]
      },
       // {
      //   _name: 'CSidebarNavTitle',
      //   _children: ['Theme']
      // },
      
      // {
      //   _name: 'CSidebarNavTitle',
      //   _children: ['Theme']
      // },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Colors',
      //   to: 'theme/colors',
      //   icon: 'cil-drop'
      // },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Typography',
      //   to: '/theme/typography',
      //   icon: 'cil-pencil'
      // },
      // {
      //   _name: 'CSidebarNavTitle',
      //   _children: ['Components']
      // },
      // {
      //   _name: 'CSidebarNavDropdown',
      //   name: 'Base',
      //   route: '/base',
      //   icon: 'cil-puzzle',
      //   items: [
      //     {
      //       name: 'Breadcrumbs',
      //       to: '/breadcrumbs'
      //     },
      //     {
      //       name: 'Cards',
      //       to: '/base/cards'
      //     },
      //     {
      //       name: 'Carousels',
      //       to: '/base/carousels'
      //     }, 
      //     {
      //       name: 'Collapses',
      //       to: '/base/collapses'
      //     },
      //     {
      //       name: 'Forms',
      //       to: '/base/forms'
      //     },
      //     {
      //       name: 'Jumbotrons',
      //       to: '/base/jumbotrons'
      //     },
      //     {
      //       name: 'List Groups',
      //       to: '/base/list-groups'
      //     },
      //     {
      //       name: 'Navs',
      //       to: '/base/navs'
      //     },
      //     {
      //       name: 'Navbars',
      //       to: '/base/navbars'
      //     },
      //     {
      //       name: 'Paginations',
      //       to: '/base/paginations'
      //     },
      //     {
      //       name: 'Popovers',
      //       to: '/base/popovers'
      //     },
      //     {
      //       name: 'Progress Bars',
      //       to: '/base/progress-bars'
      //     },
      //     {
      //       name: 'Switches',
      //       to: '/base/switches'
      //     },
      //     {
      //       name: 'Tables',
      //       to: '/base/tables'
      //     },
      //     {
      //       name: 'Tabs',
      //       to: '/base/tabs'
      //     },
      //     {
      //       name: 'Tooltips',
      //       to: '/base/tooltips'
      //     }
      //   ]
      // },
      // {
      //   _name: 'CSidebarNavDropdown',
      //   name: 'Buttons',
      //   route: '/buttons',
      //   icon: 'cil-cursor',
      //   items: [
      //     {
      //       name: 'Buttons',
      //       to: '/buttons/standard-buttons'
      //     },
      //     {
      //       name: 'Button Dropdowns',
      //       to: '/buttons/dropdowns'
      //     },
      //     {
      //       name: 'Button Groups',
      //       to: '/buttons/button-groups'
      //     },
      //     {
      //       name: 'Brand Buttons',
      //       to: '/buttons/brand-buttons'
      //     }
      //   ]
      // },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Charts',
      //   to: '/charts',
      //   icon: 'cil-chart-pie'
      // },
      // {
      //   _name: 'CSidebarNavDropdown',
      //   name: 'Icons',
      //   route: '/icons',
      //   icon: 'cil-star',
      //   items: [
      //     {
      //       name: 'CoreUI Icons',
      //       to: '/icons/coreui-icons',
      //       badge: {
      //         color: 'info',
      //         text: 'NEW'
      //       }
      //     },
      //     {
      //       name: 'Brands',
      //       to: '/icons/brands'
      //     },
      //     {
      //       name: 'Flags',
      //       to: '/icons/flags'
      //     }
      //   ]
      // },
      // {
      //   _name: 'CSidebarNavDropdown',
      //   name: 'Notifications',
      //   route: '/notifications',
      //   icon: 'cil-bell',
      //   items: [
      //     {
      //       name: 'Alerts',
      //       to: '/notifications/alerts'
      //     },
      //     {
      //       name: 'Badges',
      //       to: '/notifications/badges'
      //     },
      //     {
      //       name: 'Modals',
      //       to: '/notifications/modals'
      //     }
      //   ]
      // },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Widgets',
      //   to: '/widgets',
      //   icon: 'cil-calculator',
      //   badge: {
      //     color: 'primary',
      //     text: 'NEW',
      //     shape: 'pill'
      //   }
      // },
      // {
      //   _name: 'CSidebarNavDivider',
      //   _class: 'm-2'
      // },
      // {
      //   _name: 'CSidebarNavTitle',
      //   _children: ['Extras']
      // },
      // {
      //   _name: 'CSidebarNavDropdown',
      //   name: 'Pages',
      //   route: '/pages',
      //   icon: 'cil-star',
      //   items: [
      //     {
      //       name: 'Login',
      //       to: '/pages/login'
      //     },
      //     {
      //       name: 'Register',
      //       to: '/pages/register'
      //     },
      //     {
      //       name: 'Error 404',
      //       to: '/pages/404'
      //     },
      //     {
      //       name: 'Error 500',
      //       to: '/pages/500'
      //     }
      //   ]
      // },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Download CoreUI',
      //   href: 'http://coreui.io/vue/',
      //   icon: { name: 'cil-cloud-download', class: 'text-white' },
      //   _class: 'bg-success text-white',
      //   target: '_blank'
      // },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Try CoreUI PRO',
      //   href: 'http://coreui.io/pro/vue/',
      //   icon: { name: 'cil-layers', class: 'text-white' },
      //   _class: 'bg-danger text-white',
      //   target: '_blank'
      // }
    ]
  }
]