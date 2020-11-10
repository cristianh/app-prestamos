import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () =>
    import ('@/containers/TheContainer')

// Views
const Dashboard = () =>
    import ('@/views/Dashboard')

const Colors = () =>
    import ('@/views/theme/Colors')
const Typography = () =>
    import ('@/views/theme/Typography')

//Empresa.
const Empresa = () =>
    import ('@/views/pages/Empresa/EmpresasPage')
const Empresa_nueva = () =>
    import ('@/views/pages/Empresa/EmpresaNuevaPage')
const Empresa_Editar = () =>
    import ('@/views/pages/Empresa/EmpresaEditarPage')
const Eliminar_Editar = () =>
    import ('@/views/pages/Empresa/EliminarEmpresasPage')
    //Empresa Bienvenida
    // const MensajeBienvenidaCobradores = () => import('@/views/pages/Empresa/MensajeBienvenidaCobradores')

//Transferencias
const Transferencias = () =>
    import ('@/views/pages/Transferencias/TransferenciasPage')
const NuevaTransferencia = () =>
    import ('@/views/pages/Transferencias/NuevaTransferenciaPage')
const HistorialTransferencia = () =>
    import ('@/views/pages/Transferencias/HistorialTransferenciasPage')

const NuevaNotificacion = () =>
    import ('@/views/pages/Notificaciones/NotificacionesPage')



// Prestamos
const ListaPrestamos = () =>
    import ('@/views/pages/Prestamos/ListaPrestamos')


//Zonas.
const Zona_nueva = () =>
    import ('@/views/pages/Zonas/ZonaNuevaPage')
const ZonaCobrador = () =>
    import ('@/views/pages/Zonas/ZonasCobradores.vue')
    //Cobrador
const Cobrador_nuevo = () =>
    import ('@/views/pages/Cobradores/NuevoCobradoresPage')

//Clientes
const Listar_clientes = () =>
    import ('@/views/pages/Clientes/ListarClientesPage')

//Clientes
const Listar_cobradores = () =>
    import ('@/views/pages/Cobradores/ListarCobradoresPage')

//Tazas interes
const Taza_Interes = () =>
    import ('@/views/pages/TazaInteres/TazaDeInteresPage')
const Taza_Interes_lista = () =>
    import ('@/views/pages/TazaInteres/TazasListaPage')

//Tazas interes
const Map_users = () =>
    import ('@/views/pages/Map/MapPage')


const Charts = () =>
    import ('@/views/charts/Charts')
const Widgets = () =>
    import ('@/views/widgets/Widgets')

// Views - Components
const Cards = () =>
    import ('@/views/base/Cards')
const Forms = () =>
    import ('@/views/base/Forms')
const Switches = () =>
    import ('@/views/base/Switches')
const Tables = () =>
    import ('@/views/base/Tables')
const Tabs = () =>
    import ('@/views/base/Tabs')
const Breadcrumbs = () =>
    import ('@/views/base/Breadcrumbs')
const Carousels = () =>
    import ('@/views/base/Carousels')
const Collapses = () =>
    import ('@/views/base/Collapses')
const Jumbotrons = () =>
    import ('@/views/base/Jumbotrons')
const ListGroups = () =>
    import ('@/views/base/ListGroups')
const Navs = () =>
    import ('@/views/base/Navs')
const Navbars = () =>
    import ('@/views/base/Navbars')
const Paginations = () =>
    import ('@/views/base/Paginations')
const Popovers = () =>
    import ('@/views/base/Popovers')
const ProgressBars = () =>
    import ('@/views/base/ProgressBars')
const Tooltips = () =>
    import ('@/views/base/Tooltips')

// Views - Buttons
const StandardButtons = () =>
    import ('@/views/buttons/StandardButtons')
const ButtonGroups = () =>
    import ('@/views/buttons/ButtonGroups')
const Dropdowns = () =>
    import ('@/views/buttons/Dropdowns')
const BrandButtons = () =>
    import ('@/views/buttons/BrandButtons')

// Views - Icons
const CoreUIIcons = () =>
    import ('@/views/icons/CoreUIIcons')
const Brands = () =>
    import ('@/views/icons/Brands')
const Flags = () =>
    import ('@/views/icons/Flags')

// Views - Notifications
const Alerts = () =>
    import ('@/views/notifications/Alerts')
const Badges = () =>
    import ('@/views/notifications/Badges')
const Modals = () =>
    import ('@/views/notifications/Modals')

// Views - Pages
const Page404 = () =>
    import ('@/views/pages/Page404')
const Page500 = () =>
    import ('@/views/pages/Page500')
const Login = () =>
    import ('@/views/pages/Login')
const Register = () =>
    import ('@/views/pages/Register')

// Users
const Users = () =>
    import ('@/views/users/Users')
const User = () =>
    import ('@/views/users/User')

Vue.use(Router)

export default new Router({
    mode: 'hash', // https://router.vuejs.org/api/#mode
    linkActiveClass: 'active',
    scrollBehavior: () => ({ y: 0 }),
    routes: configRoutes()
})

function configRoutes() {
    return [{
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/registro',
            name: 'registro',
            component: Register
        },
        {
            path: '/map',
            name: 'map',
            component: Map_users
        },
        {
            path: '/home',
            redirect: 'home/dashboard',
            name: 'Home',
            component: TheContainer,
            children: [{
                    path: 'dashboard',
                    name: 'Dashboard',
                    component: Dashboard
                },
                {
                    path: 'pages',
                    redirect: '/pages/empresa',
                    name: 'Pages',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                            path: '/nueva_empresa',
                            name: 'Nueva empresa',
                            component: Empresa
                        },
                        {
                            path: '/editar_empresa',
                            name: 'Editar empresa',
                            component: Empresa_Editar
                        },
                        {
                            path: '/borrar_empresa',
                            name: 'Eliminr empresa',
                            component: Eliminar_Editar
                        }
                        // {
                        //   path: '/mensaje_bienvenida_cobradores',
                        //   name: 'Mensaje bienvenida',
                        //   component:MensajeBienvenidaCobradores
                        // }
                    ]
                },
                {
                    path: 'pages',
                    redirect: '/pages/zonas',
                    name: 'Pages',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                            path: '/nueva_zona',
                            name: 'Nueva zona',
                            component: Zona_nueva
                        },
                        {
                            path: '/editar_zona',
                            name: 'Editar empresa',
                            component: Empresa_Editar
                        },
                        {
                            path: '/borrar_zona',
                            name: 'Eliminar empresa',
                            component: Eliminar_Editar
                        },
                        {
                            path: '/zonas_cobradores',
                            name: 'Zona cobrador',
                            component: ZonaCobrador
                        }

                    ]
                },
                {
                    path: 'pages',
                    redirect: '/pages/cobradores',
                    name: 'Pages',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                            path: '/nueva_cobrador',
                            name: 'Nueva cobrador',
                            component: Cobrador_nuevo
                        },
                        {
                            path: '/listar_cobradores',
                            name: 'Listar cobradores',
                            component: Listar_cobradores
                        }
                        // {
                        //   path: '/borrar_cobrador',
                        //   name: 'Eliminr cobrador',
                        //   component: Eliminar_Editar
                        // }
                    ]
                },
                {
                    path: 'pages',
                    redirect: '/pages/transferencias',
                    name: 'Pages',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                            path: '/transferencias',
                            name: '',
                            component: Transferencias
                        }, {
                            path: '/nueva_transferencia',
                            name: 'nueva transferencia',
                            component: NuevaTransferencia
                        },
                        {
                            path: '/historial_transacciones',
                            name: 'historial transacciones',
                            component: HistorialTransferencia
                        }
                    ]
                },
                {
                    path: 'pages',
                    redirect: '/pages/listaprestamos',
                    name: 'Pages',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                            path: '/listaprestamos',
                            name: '',
                            component: ListaPrestamos
                        },
                        //{
                        //     path: '/nueva_transferencia',
                        //     name: 'nueva transferencia',
                        //     component: NuevaTransferencia
                        // },
                        // {
                        //     path: '/historial_transacciones',
                        //     name: 'historial transacciones',
                        //     component: HistorialTransferencia
                        // }
                    ]
                },
                {
                    path: 'pages',
                    redirect: '/pages/notificaciones',
                    name: 'Pages',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                        path: '/notificaciones',
                        name: '',
                        component: NuevaNotificacion
                    }]
                },
                {
                    path: 'pages',
                    redirect: '/pages/taza',
                    name: 'Pages',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                            path: '/nueva_plan',
                            name: 'Nueva plan',
                            component: Taza_Interes
                        }, {
                            path: '/listar_planes',
                            name: 'Listar planes',
                            component: Taza_Interes_lista
                        },
                        // {
                        //   path: '/borrar_cobrador',
                        //   name: 'Eliminr cobrador',
                        //   component: Eliminar_Editar
                        // }
                    ]
                },
                {
                    path: 'pages',
                    redirect: '/pages/clientes',
                    name: 'Pages',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                            path: '/listar_clientes',
                            name: 'Listar Clientes',
                            component: Listar_clientes
                        }
                        // {
                        //   path: '/editar_cobrador',
                        //   name: 'Editar cobrador',
                        //   component: Empresa_Editar
                        // },
                        // {
                        //   path: '/borrar_cobrador',
                        //   name: 'Eliminr cobrador',
                        //   component: Eliminar_Editar
                        // }
                    ]
                },
                {
                    path: 'theme',
                    redirect: '/theme/colors',
                    name: 'Theme',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                            path: 'colors',
                            name: 'Colors',
                            component: Colors
                        },
                        {
                            path: 'typography',
                            name: 'Typography',
                            component: Typography
                        }
                    ]
                },
                {
                    path: 'charts',
                    name: 'Charts',
                    component: Charts
                },
                {
                    path: 'widgets',
                    name: 'Widgets',
                    component: Widgets
                },
                {
                    path: 'users',
                    meta: {
                        label: 'Users'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [{
                            path: '',
                            name: 'Users',
                            component: Users
                        },
                        {
                            path: ':id',
                            meta: {
                                label: 'User Details'
                            },
                            name: 'User',
                            component: User
                        }
                    ]
                },
                {
                    path: 'base',
                    redirect: '/base/cards',
                    name: 'Base',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                            path: 'cards',
                            name: 'Cards',
                            component: Cards
                        },
                        {
                            path: 'forms',
                            name: 'Forms',
                            component: Forms
                        },
                        {
                            path: 'switches',
                            name: 'Switches',
                            component: Switches
                        },
                        {
                            path: 'tables',
                            name: 'Tables',
                            component: Tables
                        },
                        {
                            path: 'tabs',
                            name: 'Tabs',
                            component: Tabs
                        },
                        {
                            path: 'breadcrumbs',
                            name: 'Breadcrumbs',
                            component: Breadcrumbs
                        },
                        {
                            path: 'carousels',
                            name: 'Carousels',
                            component: Carousels
                        },
                        {
                            path: 'collapses',
                            name: 'Collapses',
                            component: Collapses
                        },
                        {
                            path: 'jumbotrons',
                            name: 'Jumbotrons',
                            component: Jumbotrons
                        },
                        {
                            path: 'list-groups',
                            name: 'List Groups',
                            component: ListGroups
                        },
                        {
                            path: 'navs',
                            name: 'Navs',
                            component: Navs
                        },
                        {
                            path: 'navbars',
                            name: 'Navbars',
                            component: Navbars
                        },
                        {
                            path: 'paginations',
                            name: 'Paginations',
                            component: Paginations
                        },
                        {
                            path: 'popovers',
                            name: 'Popovers',
                            component: Popovers
                        },
                        {
                            path: 'progress-bars',
                            name: 'Progress Bars',
                            component: ProgressBars
                        },
                        {
                            path: 'tooltips',
                            name: 'Tooltips',
                            component: Tooltips
                        }
                    ]
                },
                {
                    path: 'buttons',
                    redirect: '/buttons/standard-buttons',
                    name: 'Buttons',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                            path: 'standard-buttons',
                            name: 'Standard Buttons',
                            component: StandardButtons
                        },
                        {
                            path: 'button-groups',
                            name: 'Button Groups',
                            component: ButtonGroups
                        },
                        {
                            path: 'dropdowns',
                            name: 'Dropdowns',
                            component: Dropdowns
                        },
                        {
                            path: 'brand-buttons',
                            name: 'Brand Buttons',
                            component: BrandButtons
                        }
                    ]
                },
                {
                    path: 'icons',
                    redirect: '/icons/coreui-icons',
                    name: 'CoreUI Icons',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                            path: 'coreui-icons',
                            name: 'Icons library',
                            component: CoreUIIcons
                        },
                        {
                            path: 'brands',
                            name: 'Brands',
                            component: Brands
                        },
                        {
                            path: 'flags',
                            name: 'Flags',
                            component: Flags
                        }
                    ]
                },
                {
                    path: 'notifications',
                    redirect: '/notifications/alerts',
                    name: 'Notifications',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                            path: 'alerts',
                            name: 'Alerts',
                            component: Alerts
                        },
                        {
                            path: 'badges',
                            name: 'Badges',
                            component: Badges
                        },
                        {
                            path: 'modals',
                            name: 'Modals',
                            component: Modals
                        }
                    ]
                }
            ]
        },
        {
            path: '/pages',
            redirect: '/pages/404',
            name: 'Pages',
            component: {
                render(c) { return c('router-view') }
            },
            children: [{
                    path: '404',
                    name: 'Page404',
                    component: Page404
                },
                {
                    path: '500',
                    name: 'Page500',
                    component: Page500
                },
                {
                    path: 'login',
                    name: 'Login',
                    component: Login
                },
                {
                    path: 'register',
                    name: 'Register',
                    component: Register
                }
            ]
        }
    ]
}