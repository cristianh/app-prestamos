import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        contadorClientesSeleccionados: 0,
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
        setEliminarDatoTransferencia(state, id) {
            let posicion = state.datos_transeferencia.findIndex(x => x.data.id == id)
            console.log(state.datos_transeferencia[posicion]);
            console.log(state.datos_transeferencia);
            state.datos_transeferencia.splice(posicion, 1)
        },
        setEstadoTransferencia(state, estadotransferencia) {
            state.datos_transeferencia[0].estado_transaccion = estadotransferencia
        },
        setAumentaContadorTransferencias(state) {
            state.contador_transferencias++;
        },
        setDisminuyeContadorTransferencias(state) {
            if (state.contador_transferencias == 0) {

            } else {
                state.contador_transferencias--;
            }

        },
        setAumentaContadorClientesListaPrestamos(state) {
            state.contadorClientesSeleccionados++;
        },
        setDisminuyeContadorClientesListaPrestamos(state) {
            if (state.contadorClientesSeleccionados == 0) {

            } else {
                state.contadorClientesSeleccionados--;
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
            console.log(clientenuevoprestamolist);
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
        setActualizarInformacionClientes(state, data) {
            let posicion = state.clientes.findIndex(x => x.data.id == data.id);
            state.clientes[posicion].data = data.info
            state.clientes[posicion].data.id = data.id
        },
        SetPosicionListaClientes(state, data_posicion) {



            state.clientes.splice(data_posicion.data.to, 1, data_posicion.elm.el1);
            state.clientes.splice(data_posicion.data.from, 1, data_posicion.elm.el2);
            // state.clientes[data_posicion.data.from].data.posicion = data_posicion.data.to
            // state.clientes[data_posicion.data.to].data.posicion = data_posicion.data.from

        },
        SetPosicionElementoClientes(state, data_posicion) {



            state.clientes.splice(data_posicion.data.from, 1, data_posicion.elm.el1);
            state.clientes.splice(data_posicion.data.to, 1, data_posicion.elm.el2);
            // state.clientes[data_posicion.data.from].data.posicion = data_posicion.data.to
            // state.clientes[data_posicion.data.to].data.posicion = data_posicion.data.from

        },

        SetEliminarPosicionListaClientes(state, data_posicion) {
            state.clientes.splice(data_posicion.data.from, 1);
        },
        SetEliminarClientesPrestamos(state, data_posicion) {
            state.clientes_prestamos.splice(data_posicion, 1);
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
            let posicion = state.clientes_cobros.findIndex(x => x.data.id == data.id);

            state.estados_prestamos_ruta[posicion].estado = data.estadopagoruta;

        },
        setEstadoPrestamoEstadoRuta(state, idClientePrestamo) {
            console.log(",.,.,.", typeof(idClientePrestamo))
            console.log(state.clientes_cobros)
            let posicion = state.clientes_cobros.findIndex(x => x.data.id == idClientePrestamo);
            if (posicion != -1) {
                state.clientes_cobros[posicion].data.activo = false;
            } else {
                console.log('elemento no encontrado');
            }

        },
        setEstadoPrestamoRutaNoPago(state, data) {
            let posicion = state.clientes_cobros.findIndex(x => x.data.id == data.id);


            state.estados_prestamos_ruta[posicion].estado = data.estadopagoruta;

        },
        setEstadoPendiente(state, data) {
            let posicion = state.clientes_cobros.findIndex(x => x.data.id == data.id);


            state.estados_prestamos_ruta[posicion].estado = data.estadopagoruta;
        },
        setEstadoDiasMora(state, data) {
            let posicion = state.clientes_cobros.findIndex(x => x.data.id == data.id);
            state.clientes_cobros[posicion].data.dias_con_mora = data.dias_mora;
        },
        cobroClientePendiente(state, clientePendiente) {
            state.cobros_pendientes.unshift(clientePendiente.cliente);

            state.jornada_cobrador.numero_cobros_pendientes++;



        },
        eliminarClientePrestamoDiario(state, Idcliente) {
            let posicion = state.clientes_cobros.findIndex(x => x.data.id == Idcliente);
            state.clientes_cobros.splice(posicion, 1);
        },
        setEstadoCobrosLista(state, data) {
            state.estados_prestamos_ruta = data
        },
        setEstadoCobrosRuta(state, data) {
            state.estados_prestamos_ruta = data
        },
        setEstadoTotalAPagar(state, data) {
            let posicion = state.clientes_cobros.findIndex(x => x.data.id == data.Idcliente);
            state.saldo_pago_dia[posicion] = data.pagototalhoy;
        },
        setEstadoLocalListaCobros(state, data) {


            if (Boolean(localStorage.getItem("listagenerada")) == true || localStorage.getItem("listagenerada") == 'true') {
                let estadolista = JSON.parse(localStorage.getItem("listaClientesCobros"));
                for (const key in estadolista) {
                    if (estadolista.hasOwnProperty(key)) {
                        // const element = estadolista[key];
                        if (estadolista[key].prestamos[0].cliente == data.cliente_id) {
                            // delete element.prestamos[0].estado_pago_prestamo
                            estadolista[key].estado_pago_prestamo.pago = data.estado_pago_prestamo.pago
                        }
                    }
                }
                // let elemento = estadolista.filter(x => x.data.prestamos[0].cliente == data.cliente_id)
                // let posicion_elemento = estadolista.findIndex(x => x.data.prestamos[0].cliente == data.cliente_id)
                // console.log(estadolista);
                // console.log(elemento);
                // console.log(posicion_elemento);
                localStorage.setItem("listaClientesCobros", JSON.stringify(estadolista));
            } else {
                localStorage.removeItem('listagenerada');
            }
        },
        setEstadoListaCobrosRealizados(state) {
            if (Boolean(localStorage.getItem("listagenerada")) == true || localStorage.getItem("listagenerada") == 'true') {

                //  alert("true",localStorage.getItem("listagenerada"))

                // this.onComenzarFornada()

            }
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
        getContadorListaClientesPrestamo: state => {
            return state.contadorClientesSeleccionados;
        },
        getSaldoApagarHoy: state => {
            let valor_prestamo = 0;
            let taza_seleccionada_interes = 0;
            let plazo_dias = 0;
            let total_apagar = 0;
            let pago = 0;

            state.clientes_cobros.forEach(elementP => {
                valor_prestamo = elementP.data.prestamos[0].total_apagar;
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
        getContadorClientesPrestamo: state => {
            let element_count = state.clientes_cobros.filter(x => x.data.prestamos.length > 0 && x.data.prestamos[0].estado_prestamo != true);
            return element_count.length;
        },
        getEstadoPrestamoRuta: state => {
            console.log("---------------------", state.estados_prestamos_ruta);
            return state.estados_prestamos_ruta;
        },
        getClientesListaPrestamo: state => {
            return state.clientes_cobros.sort((a, b) => {
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
            return state.clientes.sort((a, b) => {
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