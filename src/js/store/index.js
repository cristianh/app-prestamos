import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        contador_transferencias: 0,
        datos_transeferencia: [],
        datos_transeferencia_pendientes: [],
        saldo_pago_dia: [],
        estados_prestamos_ruta: [],
        jornada_cobrador: {
            hora_inicial: '',
            fecha_inicial: '',
            fecha_final: '',
            hora_final: '',
            balance_final_manual: '',
            balance_final: '',
            catidad_cobrosefectivos: 0,
            catidad_cobrosenofectivos: 0,
            numero_cobros_pendientes: 0,
            total_cobros_realizados: 0
        },
        clientes: [],
        clientes_lista_ordenada: [],
        clientes_cobros: [],
        clientes_prestamos: [],
        temporal1: '',
        temporal2: '',
        cobros_pendientes: [],
        zonas: [],
        zonas_empresa: [],
        tasaseinteres: [],
        contador: 0,
        estado_ruta: false,
        cobrador_ordena_lista: false,
        balance_zona: 0

    },
    mutations: {
        setActualizarDatosTransferenciaPendiente(state, databusqueda) {
            let posicion = state.datos_transeferencia_pendientes.findIndex(x => x.valor === databusqueda.valor && x.hora === databusqueda.hora && x.fecha === databusqueda.fecha);
            console.log(posicion);
            console.log(state.datos_transeferencia_pendientes[posicion]);
            state.datos_transeferencia_pendientes[posicion].estado_transaccion = databusqueda.estado_transaccion
        },
        setDatosTransferenciaPendientes(state, data_transferencia) {
            state.datos_transeferencia_pendientes.push(data_transferencia)
        },
        setEliminarDatosTransferenciaPendiente(state) {
            state.datos_transeferencia_pendientes = []
        },
        setDatosTransferencia(state, data_transferencia) {
            state.datos_transeferencia.push(data_transferencia)
        },
        setEliminarDatosTransferencia(state) {
            state.datos_transeferencia = []
        },
        setEstadoTransferencia(state, estadotransferencia) {
            state.datos_transeferencia[0].estado_transaccion = estadotransferencia
        },
        setAumentaContadorTransferencias(state) {
            state.contador_transferencias++;
        },
        setDisminuyeContadorTransferencias(state) {
            if (state.contador_transferencias >= 0) {
                state.contador_transferencias--;
            }

        },
        setfechInicialJornada(state, fecha_inicial_jornada) {
            state.jornada_cobrador.fecha_inicial = fecha_inicial_jornada;
        },
        sethoraInicialJornada(state, hora_inicial_jornada) {
            state.jornada_cobrador.hora_inicial = hora_inicial_jornada;
        },
        setfechaFinalJornada(state, fecha_final_jornada) {
            state.jornada_cobrador.fecha_final = fecha_final_jornada;
        },
        sethoraFinalJornada(state, hora_final_jornada) {
            state.jornada_cobrador.hora_final = hora_final_jornada;
        },
        setbalance_finalManualJornada(state, nuevo_valance) {
            state.jornada_cobrador.balance_final_manual = nuevo_valance;
        },
        setbalance_finalJornada(state, nuevo_valance) {
            state.jornada_cobrador.balance_final = nuevo_valance;
        },
        setCatidad_cobrosefectivosJornada(state) {
            state.jornada_cobrador.catidad_cobrosefectivos++;
        },
        setCatidad_cobrosenofectivosJornada(state) {
            state.jornada_cobrador.catidad_cobrosenofectivos++;
        },
        setNumero_cobros_pendientesJornada(state) {
            state.jornada_cobrador.numero_cobros_pendientes++;
        },
        setQuitar_cobros_pendientesJornada(state) {
            if (state.jornada_cobrador.numero_cobros_pendientes != 0) {
                state.jornada_cobrador.numero_cobros_pendientes--;
            } else {
                state.jornada_cobrador.numero_cobros_pendientes = 0;
            }

        },
        setTotalCobros(state, numeroCobros) {
            state.jornada_cobrador.total_cobros_realizados = numeroCobros;
        },
        addTasaseInteres(state, tazas) {
            state.tasaseinteres.unshift(tazas)
        },
        addNewClientes(state, clientenuevo) {
            // mutate state
            //console.log(clientenuevo);
            state.contador = state.contador + 1;
            state.clientes.unshift(clientenuevo)
        },
        addClientesCobros(state, clientenuevocobro) {
            // mutate state
            //console.log(clientenuevo);
            state.clientes_cobros.unshift(clientenuevocobro)
        },
        addClientesPrestamosList(state, clientenuevoprestamolist) {
            // mutate state
            //console.log(clientenuevo);
            state.clientes_cobros.unshift(clientenuevoprestamolist)
        },
        addNewZona(state, zonanueva) {
            // mutate state
            //console.log(clientenuevo);

            state.zonas.unshift(zonanueva)
        },
        setZonasEmpresas(state, zonas) {
            // mutate state
            //console.log(clientenuevo);

            state.zonas_empresas = zonas;
        },
        getSetNuevoClientes(state, posicion) {
            state.clientes[posicion].nuevo = false
        },
        SetPosicionListaClientes(state, data_posicion) {

            state.clientes.splice(data_posicion.data.from, 1, data_posicion.elm.el1);
            state.clientes.splice(data_posicion.data.to, 1, data_posicion.elm.el2);

        },

        SetEliminarPosicionListaClientes(state, data_posicion) {
            state.clientes.splice(data_posicion.data.from, 1);
        },
        setEstadoListaOrdenada(state, newstado) {
            state.cobrador_ordena_lista = newstado;
        },
        setBalanceZona(state, nuevoBalance) {
            state.balance_zona = nuevoBalance;
        },
        setEstadoRuta(state, newEstado) {
            state.estado_ruta = newEstado;
        },
        setEstadoPrestamoRutaPago(state, data) {
            let posicion = state.clientes_prestamos.findIndex(x => x.data.id == data.id);

            state.clientes_prestamos[posicion].data.prestamos[0].estado_pago_prestamo.pago = data.estadopagoruta;

        },
        setEstadoPrestamoRutaNoPago(state, data) {
            let posicion = state.clientes_prestamos.findIndex(x => x.data.id == data.id);


            state.clientes_prestamos[posicion].data.prestamos[0].estado_pago_prestamo.nopago = data.estadopagoruta;

        },
        setEstadoPrestamoPendiente(state, data) {
            let posicion = state.clientes_prestamos.findIndex(x => x.data.id == data.id);
            console.log(data.id);
            console.log("estadte", state.clientes_prestamos[posicion]);
            console.log("posicion", posicion);
            console.log("data.estadopagoruta", data.estadopagoruta);
            state.clientes_prestamos[posicion].data.prestamos[0].estado_pendiente_prestamo_ruta = data.pagopendiente;
        },
        setEstadoDiasMora(state, data) {
            let posicion = state.clientes_prestamos.findIndex(x => x.data.id == data.id);
            state.clientes_prestamos[posicion].data.prestamos[0].dias_con_mora = data.dias_mora;
        },
        cobroClientePendiente(state, clientePendiente) {
            state.cobros_pendientes.unshift(clientePendiente.cliente);

            state.jornada_cobrador.numero_cobros_pendientes++;



        },
        eliminarClientePrestamoDiario(state, Idcliente) {
            let posicion = state.clientes_prestamos.findIndex(x => x.data.id == Idcliente);
            state.clientes_prestamos.splice(posicion, 1);
        },
        setEstadoTotalAPagar(state, data) {
            let posicion = state.clientes_prestamos.findIndex(x => x.data.id == data.Idcliente);
            state.saldo_pago_dia[posicion] = data.pagototalhoy;
        }


    },
    getters: {
        getDatosTransferenciaPendiente: state => {
            return state.datos_transeferencia_pendientes;
        },
        getDatosTransferencia: state => {
            return state.datos_transeferencia;
        },
        getContadorTransacciones: state => {
            return state.contador_transferencias;
        },
        getSaldoApagarHoy: state => {
            let valor_prestamo = 0;
            let taza_seleccionada_interes = 0;
            let plazo_dias = 0;
            let total_apagar = 0;
            let pago = 0;

            state.clientes_prestamos.forEach(elementP => {
                valor_prestamo = elementP.data.prestamos[0].valor;
                taza_seleccionada_interes;
                switch (elementP.data.prestamos[0].plan_seleccionado) {
                    case "10":
                        taza_seleccionada_interes = 0.10
                        break
                    case "15":
                        taza_seleccionada_interes = 0.15
                        break
                    case "20":
                        taza_seleccionada_interes = 0.20
                        break
                }

                plazo_dias = Number(elementP.data.prestamos[0].dias_plazo) + Number(elementP.data.prestamos[0].dias_con_mora)

                total_apagar = (Number(valor_prestamo) * taza_seleccionada_interes) + Number(valor_prestamo);
                console.log(total_apagar);

                if (Number(plazo_dias) <= 0) {
                    pago = 0;
                } else {

                }

                pago = Math.round(Number(total_apagar) / Number(plazo_dias));
                if (elementP.data.prestamos[0].saldo_pendiente > 0) {
                    pago = Number(elementP.data.prestamos[0].saldo_pendiente) + Number(pago);
                }
                state.saldo_pago_dia.push(pago);

            });
            return state.saldo_pago_dia;
        },
        getBalanceFinalZona: state => {
            return state.jornada_cobrador.balance_final
        },
        getCobrosTotalCobrado: state => {
            return state.jornada_cobrador.total_cobros_realizados;
        },
        getCobrosPendientes: state => {
            return state.jornada_cobrador.numero_cobros_pendientes;
        },
        getCobrosEfectivos: state => {
            return state.jornada_cobrador.catidad_cobrosefectivos;
        },
        getCobrosNoEfectivos: state => {
            return state.jornada_cobrador.catidad_cobrosenofectivos;
        },
        getClientesPrestamo: state => {
            let element_count = state.clientes.filter(x => x.data.prestamos.length > 0 && x.data.prestamos[0].estado_prestamo != true);
            return element_count.length;
        },
        getEstadoPrestamoRuta: state => {
            for (const key in state.clientes_prestamos) {
                if (state.clientes_prestamos.hasOwnProperty(key)) {
                    const element = state.clientes_prestamos[key];
                    console.log("....elementstore", element);
                    state.estados_prestamos_ruta.push(element.data.prestamos[0].estado_pago_prestamo);
                }
            }
            return state.estados_prestamos_ruta;
        },
        getClientesListaPrestamo: state => {
            return state.clientes_prestamos.sort(function(a, b) {
                if (a.data.posicion < b.data.posicion) {
                    return 1;
                }
                if (a.data.posicion > b.data.posicion) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });
        },
        getJornadaCobrador: state => {
            return state.jornada_cobrador
        },
        getClientesCobros: state => {
            return state.clientes_cobros
        },
        getBalance: state => {
            return state.balance_zona
        },
        getClientes: state => {
            return state.clientes
        },
        getContadorClientes: state => {
            return state.clientes.length
        },
        getClientes_lista_Ordenada: state => {
            return state.clientes_lista_ordenada
        },
        getEstado_Lista_ordenada: state => {
            return state.cobrador_ordena_lista
        },
        getClientesAbonos: state => {
            return state.clientes
        },
        getZonas: state => {
            return state.zonas
        },
        getZonasEmpresa: state => {
            return state.zonas_empresas
        },
        getContador: state => {
            return state.contador
        },
        getContadorClientes: state => {
            return state.clientes.length
        },
        getTazaseInteres: state => {
            return state.tasaseinteres
        },
        getEstadoRuta: state => {
            return state.estado_ruta
        },
        getOrdenarClientes: state => {
            return state.clientes.sort(function(a, b) {
                if (a.data.posicion > b.data.posicion) {
                    return 1;
                }
                if (a.data.posicion < b.data.posicion) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });
        }
    },
    actions: {},
    modules: {}
});