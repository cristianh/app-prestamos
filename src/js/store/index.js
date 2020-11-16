import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';

//   plugins: [createPersistedState()],
// localStorage.setItem("uid", id[1]);
// localStorage.setItem("email", data.user.email);
// localStorage.setItem("name", id[0]);
// localStorage.setItem("iad", id[2]);
// localStorage.setItem("empresa", id[3]);
// localStorage.setItem("lastactivity", data.user.metadata.lastSignInTime);

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        data_local_storage: null,
        error_debug_services: '',
        mododebuggerActive: false,
        contadorClientesSeleccionados: 0,
        contador_transferencias: 0,
        datos_transeferencia: [],
        datos_transeferencia_pendientes: [],
        saldo_pago_dia: [],
        estados_prestamos_ruta: [],
        posiciones_lista: [],
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
            total_cobros_realizados: 0,
            total_prestado: 0
        },
        cobros_hoy: [],
        estados_prestamos_antes_cobros: [],
        nocobros_hoy: [],
        clientes: [],
        clientes_clon: [],
        clientes_lista_ordenada: [],
        clientes_cobros: [],
        clientes_prestamos: [],
        cobros_pendientes: [],
        zonas: [],
        zonas_empresa: [],
        tasaseinteres: [],
        contador: 0,
        estado_ruta: false,
        cobrador_ordena_lista: false,
        balance_zona: 0,
        listaDBguardad: false

    },
    mutations: {
        setLoadLocalStorage(state, datastorage) {
            state.data_local_storage = JSON.stringify(datastorage)
        },
        setModoDebuggerActive(state, estado) {
            state.mododebuggerActive = estado
        },
        setErrorServices(state, error) {
            state.error_debug_services = error
        },
        setCobrosHoy(state, infocobroshoy) {
            state.cobros_hoy.push(infocobroshoy)
            console.log("setCobrosHoy", state.cobros_hoy)
            localStorage.setItem("cobros_hoy", JSON.stringify(state.cobros_hoy));
        },
        setEstadosPrestamosAntesCobros(state, infoprestamo) {
            alert('guardo el cobro estado anterior')
            state.estados_prestamos_antes_cobros.push(infoprestamo)
            localStorage.setItem("estados_prestamos_antes_cobros", JSON.stringify(state.estados_prestamos_antes_cobros));
        },
        setEliminarEstadosPrestamosAntesCobros(state, idcliente) {
            let posicion = state.estados_prestamos_antes_cobros.findIndex(x => x.cliente === idcliente);
            state.estados_prestamos_antes_cobros.splice(posicion, 1)
            localStorage.setItem("estados_prestamos_antes_cobros", JSON.stringify(state.estados_prestamos_antes_cobros));
        },
        setEditCobrosHoy(state, datacobro) {

            let posicion = state.cobros_hoy.findIndex(x => x.cobro_id === datacobro.id_cobro);
            console.log("setEditCobrosHoy posicion", posicion);
            state.cobros_hoy[posicion].valor_pago = datacobro.nuevovalorcobro
            localStorage.setItem("cobros_hoy", JSON.stringify(state.cobros_hoy));
        },
        setEliminarCobrosHoy(state, datacobro) {
            let cobroshoylocalstore = JSON.parse(localStorage.getItem('cobros_hoy'))

            let posicion = cobroshoylocalstore.findIndex(x => x.cobro_id === datacobro.id_cobro);
            console.log("setEliminarCobrosHoy posicion", posicion);
            cobroshoylocalstore.splice(posicion, 1)
                // // delete state.cobros_hoy[posicion]
            localStorage.setItem("cobros_hoy", JSON.stringify(cobroshoylocalstore));
        },
        setEliminarTodoCobros(state) {
            state.cobros_hoy = []
            localStorage.setItem("cobros_hoy", JSON.stringify(state.cobros_hoy));
        },
        // setNoCobrosHoy(state, infonocobroshoy) {
        //     state.nocobros_hoy.push(infonocobroshoy)
        //     localStorage.setItem("nocobros_hoy", JSON.stringify(state.nocobros_hoy));
        // },
        setActualizarDatosTransferenciaPendiente(state, databusqueda) {
            let posicion = state.datos_transeferencia_pendientes.findIndex(x => x.valor === databusqueda.valor && x.hora === databusqueda.hora && x.fecha === databusqueda.fecha);

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
        setEliminarDatosTransferencia(state, id) {
            let posicion_transferencia = state.datos_transeferencia.findIndex(x => x.id == id)
            state.datos_transeferencia.splice(posicion_transferencia, 1)
        },
        setEliminarDatoTransferencia(state, id) {
            let posicion = state.datos_transeferencia.findIndex(x => x.data.id == id)

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
            if (state.contadorClientesSeleccionados != 0) {

                state.contadorClientesSeleccionados--;
                localStorage.setItem('lista_clientes_cobrados', state.contadorClientesSeleccionados)

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
        setTotal_prestadoJornada(state, nuevo_prestado) {
            state.jornada_cobrador.total_prestado = nuevo_prestado;
            localStorage.setItem("total_prestado", nuevo_prestado);
        },
        setCatidad_cobrosefectivosJornadaAumenta(state) {
            state.jornada_cobrador.catidad_cobrosefectivos++;
            localStorage.setItem('cobros_efectivos', state.jornada_cobrador.catidad_cobrosefectivos)
        },
        setCatidad_cobrosefectivosJornadaDisminuye(state) {
            if (state.jornada_cobrador.catidad_cobrosefectivos != 0) {
                state.jornada_cobrador.catidad_cobrosefectivos--;
            }

            localStorage.setItem('cobros_efectivos', state.jornada_cobrador.catidad_cobrosefectivos)
        },
        setCatidad_cobrosenofectivosJornada(state) {
            state.jornada_cobrador.catidad_cobrosenofectivos++;
            localStorage.setItem('cobros_nofectivos', state.jornada_cobrador.catidad_cobrosenofectivos)
        },
        setQuitar_cobros_pendientesJornada(state, idClienteCobro) {
            if (localStorage.getItem('cobros_pendientesArray')) {
                let pendientesarray = JSON.parse(localStorage.getItem('cobros_pendientesArray'))
                let pendientestore = state.cobros_pendientes
                let posicion_array = pendientesarray.findIndex(x => x == idClienteCobro);
                let posicion_pendiente = pendientestore.findIndex(x => x == idClienteCobro);
                if (posicion_array != -1 && posicion_pendiente != -1) {
                    if (state.jornada_cobrador.numero_cobros_pendientes != 0) {
                        state.jornada_cobrador.numero_cobros_pendientes--;

                        pendientesarray.splice(posicion_array, 1)
                        pendientestore.splice(posicion_pendiente, 1)
                        localStorage.setItem('cobros_pendientesArray', JSON.stringify(pendientesarray)) //
                        localStorage.setItem('cobro_pendiente', Number(state.jornada_cobrador.numero_cobros_pendientes))
                    } else {

                    }
                }
            }



        },
        setTotalCobros(state, numeroCobros) {
            state.jornada_cobrador.total_cobros_realizados = numeroCobros;
            localStorage.setItem('total_cobros', state.jornada_cobrador.total_cobros_realizados)
        },
        addTasaseInteres(state, tazas) {
            state.tasaseinteres.unshift(tazas)
        },
        addNewClientes(state, clientenuevo) {
            state.contador = state.contador + 1;
            state.clientes.unshift(clientenuevo)
        },
        addNewClientesNuevosLista(state, clientenuevo) {
            state.contador = state.contador + 1;
            state.clientes.push(clientenuevo)
        },
        addClientesCobros(state, clientenuevocobro) {

            state.clientes_cobros.unshift(clientenuevocobro)
        },
        addClientesPrestamosList(state, clientenuevoprestamolist) {


            state.clientes_cobros.unshift(clientenuevoprestamolist)
        },
        addNewZona(state, zonanueva) {


            state.zonas.unshift(zonanueva)
        },
        addPosicionListaCliente(state, data) {
            state.posiciones_lista.unshift(data)
            state.posiciones_lista = state.posiciones_lista.sort((a, b) => {
                if (a.posicion > b.posicion) {
                    return 1;
                }
                if (a.posicion < b.posicion) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });

        },
        addPosicionListaClienteCreada(state, data) {
            state.posiciones_lista.push(data)
        },
        setActulizarPosicionesLista(state, data) {
            // state.posiciones_lista = []
            state.posiciones_lista = data

        },
        setActulizarListaClientes(state, data) {
            // state.posiciones_lista = []
            state.clientes_clon = data

        },
        setActulizarListaClientesCobros(state, data) {
            // state.posiciones_lista = []
            state.clientes_cobros = data

        },
        SetActualizarPrestamoClientes(state, data) {
            let posicion = state.clientes_cobros.findIndex(x => x.data.id == data.id);
            // console.log(posicion);
            state.clientes_cobros[posicion].data.prestamos[0] = data.prestamo
        },
        setPosicionListaCliente(state, data) {
            let posicion_elemento1 = null
            let posicion_elemento2 = null
            for (const key in state.posiciones_lista) {
                if (state.posiciones_lista.hasOwnProperty(key)) {
                    const element = state.posiciones_lista[key];

                    if (element.idCliente == data.data.el1.data.id) {
                        element.posicion = data.data.el2.data.posicion
                    }
                    if (element.idCliente == data.data.el2.data.id) {

                        element.posicion = data.data.el1.data.posicion


                    }


                }
            }

            // state.posiciones_lista[]


        },
        setZonasEmpresas(state, zonas) {
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

            let inicio = data_posicion.from;
            let fin = data_posicion.to;

            let clientes_lista_ordenada = state.clientes
            state.clientes = []


            let element;


            if (fin < inicio) {
                let temporal = clientes_lista_ordenada.splice(inicio, 1);



                for (inicio; inicio < clientes_lista_ordenada - 1; inicio++) {
                    clientes_lista_ordenada[inicio] = clientes_lista_ordenada[inicio];
                }
                clientes_lista_ordenada.splice(fin, 0, temporal[0]);

            } else if (fin > inicio) {


                let temporal = clientes_lista_ordenada.splice(inicio, 1);


                for (inicio; inicio > clientes_lista_ordenada.length; inicio--) {
                    clientes_lista_ordenada[inicio] = clientes_lista_ordenada[inicio];

                }
                clientes_lista_ordenada.splice(fin, 0, temporal[0]);

            } else {

            }


            state.clientes = clientes_lista_ordenada
        },
        SetPosicionElementoClientes(state, data_posicion) {


            // state.clientes.splice(data_posicion.data.from, 1, data_posicion.elm.el1);
            // state.clientes.splice(data_posicion.data.to, 1, data_posicion.elm.el2);
            // state.clientes[data_posicion.data.from].data.posicion = data_posicion.data.to
            // state.clientes[data_posicion.data.to].data.posicion = data_posicion.data.from

        },

        SetEliminarPosicionListaClientes(state, data_posicion) {
            state.clientes.splice(data_posicion.data.from, 1);
        },
        SetEliminarClientesPrestamos(state, data_posicion) {
            state.clientes_prestamos.splice(data_posicion, 1);

            let estados = JSON.parse(localStorage.getItem('ListaEstadosCobro'))
                // let posicion = estados.findIndex(x => x.id == data_posicion);
            estados.splice(data_posicion, 1);
        },
        SetReiniciarEstadoClientesPrestamos(state, data) {

            let posicion = state.clientes_cobros.findIndex(x => x.data.id == data.id);
            state.estados_prestamos_ruta[posicion].estado = data.estadopagoruta;
            // let posicion = state.clientes_cobros.findIndex(x => x.data.id == data.id);

            // state.estados_prestamos_ruta[posicion].estado = data.estadopagoruta;
            state.clientes_cobros[posicion].data.estado_pago_prestamo.nopago = false;
            state.clientes_cobros[posicion].data.estado_pago_prestamo.pago = false;
            state.clientes_cobros[posicion].data.estado_pago_prestamo.pendiente = false;

            // estados.splice(data_posicion, 1);
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
            state.clientes_cobros[posicion].data.estado_pago_prestamo.nopago = false;
            state.clientes_cobros[posicion].data.estado_pago_prestamo.pago = true;
            state.clientes_cobros[posicion].data.estado_pago_prestamo.pendiente = false;

        },
        setEstadosInicialesRutaClientesPrestamo(state) {
            let lista_cobros_ordenada = state.clientes_cobros
            for (const key in lista_cobros_ordenada) {
                if (lista_cobros_ordenada[key].data.hasOwnProperty('prestamos')) {

                    state.clientes_cobros[key].data.estado_pago_prestamo.nopago = false;
                    state.clientes_cobros[key].data.estado_pago_prestamo.pago = false;
                    state.clientes_cobros[key].data.estado_pago_prestamo.pendiente = false;
                }
            }

        },
        setEstadoPrestamoEstadoRuta(state, idClientePrestamo) {

            let posicion = state.clientes_cobros.findIndex(x => x.data.id == idClientePrestamo);
            if (posicion != -1) {
                state.clientes_cobros[posicion].data.activo = false;
            } else {
                console.log('elemento no encontrado');
            }

        },
        setEstadoPrestamoEliminarNoCobro(state, data) {
            // editado
            let posicion = state.clientes_cobros.findIndex(x => x.data.id == data.id);
            state.clientes_cobros[posicion].data.estado_pago_prestamo.nopago = false;
        },
        setSaldoPendiente(state, datapendiente) {
            // editado
            let posicion = state.clientes_cobros.findIndex(x => x.data.id == datapendiente.id);
            state.clientes_cobros[posicion].data.prestamos[0].saldo_pendiente = datapendiente.saldo_pendiente
        },
        setEstadoPrestamoEliminarCobro(state, data) {
            // editado
            let posicion = state.clientes_cobros.findIndex(x => x.data.id == data.id);
            state.clientes_cobros[posicion].data.estado_pago_prestamo.pago = false;

        },
        setEstadoPrestamoRutaNoPago(state, data) {
            // editado

            let posicion = state.clientes_cobros.findIndex(x => x.data.id == data.id);
            state.estados_prestamos_ruta[posicion].estado = data.estadopagoruta;

            state.clientes_cobros[posicion].data.estado_pago_prestamo.nopago = true;
            state.clientes_cobros[posicion].data.estado_pago_prestamo.pago = false;
            state.clientes_cobros[posicion].data.estado_pago_prestamo.pendiente = false;


        },
        setEstadoPendiente(state, data) {
            let posicion = state.clientes_cobros.findIndex(x => x.data.id == data.id);
            state.estados_prestamos_ruta[posicion].estado = data.estadopagoruta;
            state.clientes_cobros[posicion].data.estado_pago_prestamo.nopago = false;
            state.clientes_cobros[posicion].data.estado_pago_prestamo.pago = false;
            state.clientes_cobros[posicion].data.estado_pago_prestamo.pendiente = true;

        },
        setEstadoDiasMora(state, data) {
            let posicion = state.clientes_cobros.findIndex(x => x.data.id == data.id);
            // alert(posicion)
            state.clientes_cobros[posicion].data.prestamos[0].dias_con_mora = data.dias_mora;
        },
        setTotalApagarEliminarCobros(state, data) {
            let posicion = state.clientes_cobros.findIndex(x => x.data.id == data.id);
            // alert(data.valor)
            state.clientes_cobros[posicion].data.prestamos[0].total_apagar = state.clientes_cobros[posicion].data.prestamos[0].total_apagar + data.valor;
        },
        cobroClientePendiente(state, clientePendiente) {
            state.cobros_pendientes.unshift(clientePendiente);

            state.jornada_cobrador.numero_cobros_pendientes++;
            localStorage.setItem('cobro_pendiente', state.cobros_pendientes.length)
            localStorage.setItem('cobros_pendientesArray', JSON.stringify(state.cobros_pendientes))
        },
        eliminarClientePrestamoDiario(state, Idcliente) {
            let posicion = state.clientes_cobros.findIndex(x => x.data.id == Idcliente);

            let posicion_cliente = state.clientes.findIndex(x => x.data.id == Idcliente);
            let estados = JSON.parse(localStorage.getItem('ListaEstadosCobro'))
            let posicion_estados = estados.findIndex(x => x.id == Idcliente);
            let lista_clientes = JSON.parse(localStorage.getItem('lista_clientes_cobrados'))
            if (lista_clientes != 0) {
                lista_clientes = lista_clientes - 1;

                localStorage.setItem('lista_clientes_cobrados', lista_clientes)
            } else {
                lista_clientes = 0;
                localStorage.setItem('lista_clientes_cobrados', lista_clientes)
            }

            // alert(typeof(estados))
            // let posicion_estados_ruta = state.estados_prestamos_ruta.findIndex(x => x.data.id == Idcliente);
            state.estados_prestamos_ruta.splice(posicion, 1);
            // delete estados[posicion]
            estados.splice(posicion_estados, 1)
            delete state.posiciones_lista[posicion]
            state.clientes[posicion_cliente].data.prestamos[0].estado_prestamo = true
            localStorage.setItem('ListaEstadosCobro', JSON.stringify(estados))
        },
        setEstadoCobrosLista(state, data) {
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
        },
        setActualizarEstadosListaCobros(state, nueva_lista) {
            state.clientes_cobros = nueva_lista
        },
        setlistaDbGuardada(state, nueva_lista) {
            state.listaDBguardad = true
        }
    },
    //  uid:localStorage.getItem('uid'),
    //       email:localStorage.getItem('email'),
    //       name:localStorage.getItem('name'),
    //       iad: localStorage.getItem('iad'),
    //       empresa: localStorage.getItem('empresa'),
    //       lastactivity: localStorage.getItem('lastactivity')
    getters: {
        getDatasStorage: state => {
            return JSON.parse(state.data_local_storage)
        },
        getDatasStorageUid: state => {
            return state.data_local_storage.uid
        },
        getDatasStorageEmpresa: state => {
            return state.data_local_storage.empresa
        },
        getDatasStorageIad: state => {
            return state.data_local_storage.iad
        },
        getDatasStorageName: state => {
            return state.data_local_storage.name
        },
        getDatasStorageLastActivity: state => {
            return state.data_local_storage.lastactivity
        },
        getErrorMensajeServices: state => {
            return state.error_debug_services
        },
        getModoDebugger: state => {
            return state.mododebuggerActive
        },
        getListaDBguardad: state => {
            return state.listaDBguardad
        },
        getPosicionesListaClientes: state => {
            return state.posiciones_lista
        },
        getCobrosHoy: state => {
            return state.cobros_hoy
        },
        getEstadoPrestamoAntesCobro: state => {
            return state.estados_prestamos_antes_cobros
        },
        // getNoCobrosHoy: state => {
        //     return state.nocobros_hoy
        // },
        getDatosTransferenciaPendiente: state => {
            return state.datos_transeferencia_pendientes;
        },
        getDatosTransferencia: state => {
            return state.datos_transeferencia;
        },
        getContadorTransacciones: state => {
            return state.contador_transferencias;
        },
        getContadorListaClientesCobros: state => {
            return state.contadorClientesSeleccionados;
        },
        getSaldoApagarHoy: state => {
            let valor_prestamo = 0;
            let taza_seleccionada_interes = 0;
            let plazo_dias = 0;
            let total_apagar = 0;

            let pago_hoy = 0;

            state.saldo_pago_dia = []

            state.clientes_cobros.forEach(elementP => {

                valor_prestamo = elementP.data.prestamos[0].valor;

                taza_seleccionada_interes = Number(elementP.data.prestamos[0].plan_seleccionado) / 100

                plazo_dias = Number(elementP.data.prestamos[0].dias_plazo)
                pago_hoy = Math.round((valor_prestamo * (1 + taza_seleccionada_interes)) / plazo_dias)
                console.log("pago_hoy", pago_hoy)


                if (elementP.data.prestamos[0].saldo_pendiente > 0) {


                    if (pago_hoy < elementP.data.prestamos[0].saldo_pendiente) {


                        pago_hoy = Number(elementP.data.prestamos[0].saldo_pendiente) + Number(pago_hoy);
                        state.saldo_pago_dia.push({ pago: pago_hoy, id: elementP.data.prestamos[0].cliente })
                    } else {


                        pago_hoy = Number(pago_hoy) + Number(elementP.data.prestamos[0].saldo_pendiente);
                        state.saldo_pago_dia.push({ pago: pago_hoy, id: elementP.data.prestamos[0].cliente })
                    }

                } else if (elementP.data.prestamos[0].saldo_pendiente < 0) {
                    if (pago_hoy < elementP.data.prestamos[0].saldo_pendiente) {
                        pago_hoy = Number(elementP.data.prestamos[0].saldo_pendiente) - Number(pago_hoy);
                        state.saldo_pago_dia.push({ pago: pago_hoy, id: elementP.data.prestamos[0].cliente })

                    } else {

                        pago_hoy = Number(pago_hoy) + Number(elementP.data.prestamos[0].saldo_pendiente);
                        state.saldo_pago_dia.push({ pago: pago_hoy, id: elementP.data.prestamos[0].cliente })

                    }


                } else if (elementP.data.prestamos[0].saldo_pendiente == 0) {
                    state.saldo_pago_dia.push({ pago: pago_hoy, id: elementP.data.prestamos[0].cliente });

                } else {

                }




            });
            // }

            // state.saldo_pago_dia.push(pago_hoy)
            console.log("saldo a pagar return", state.saldo_pago_dia);

            return state.saldo_pago_dia;
        },
        getSaldosPagoDia: state => {
            return state.saldo_pago_dia
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

            return state.estados_prestamos_ruta;
        },
        getClientesListaPrestamo: state => {
            return state.clientes_cobros
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
        getContadorClientesCobros: state => {
            return state.clientes_cobros.length
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
            // if (state.listaDBguardad) {


            // } else {
            //     return state.clientes
            // }


        },
        getOrdenarListaClientesCobros: state => {
            // if (state.listaDBguardad) {
            return state.clientes_cobros
                // return state.clientes_cobros.sort((a, b) => {
                //     if (a.data.posicion > b.data.posicion) {
                //         return 1;
                //     }
                //     if (a.data.posicion < b.data.posicion) {
                //         return -1;
                //     }
                //     // a must be equal to b
                //     return 0;
                // });
                // } else {

            // }
        }
    },
    actions: {},
    modules: {}
});