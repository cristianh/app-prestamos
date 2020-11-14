const functions = require('firebase-functions');
const admin = require('firebase-admin');
const util = require('util');
const { Console } = require('console');
const cors = require('cors')({ origin: true });



admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const db = admin.firestore();

const fieldValue = admin.firestore.FieldValue;
const fieldValueincrement = admin.firestore.FieldValue.increment(1);
const fieldValuedeincrement = admin.firestore.FieldValue.increment(-1);

/**
 * @function Funcion para actualizar el estado del usuario en la lista de cobros.
 */
exports.updateEstadoUsuario = functions.firestore
    .document('usuarios/{usuarioId}/empresas/{empresaId}/cobradores/{cobradorId}/Clientes/{clienteId}')
    .onUpdate((change, context) => {
        const previousValue = change.before.data().activo;
        db.collection('usuarios').doc(context.params.usuarioId).collection('empresas').doc(context.params.empresaId).collection('cobradores').doc(context.params.cobradorId).collection('clientes').doc(context.params.clienteId).set({
            activo: true
        }, { merge: true });
        // db.collection('usuarios').doc(context.params.usuarioId).collection('empresas').doc(context.params.empresaId).doc('contador_clientes').set({
        //     contador_clientes: fieldValueincrement
        // }, { merge: true });
    });

/**
 * @function Funcion contar los clientes.
 */
exports.contadorClientes = functions.firestore
    .document('usuarios/{usuarioId}/empresas/{empresaId}/cobradores/{cobradorId}/clientes/{clienteId}')
    .onCreate((change, context) => {
        // const previousValue = change.before.data().activo;
        db.collection('usuarios').doc(context.params.usuarioId).collection('empresas').doc(context.params.empresaId).set({
            contador_clientes: fieldValueincrement
        }, { merge: true });
    });

/**
 * @function Funcion contar los cobradores.
 */
exports.contadorCobradores = functions.firestore
    .document('usuarios/{usuarioId}/empresas/{empresaId}/cobradores/{cobradorId}')
    .onCreate((change, context) => {
        // const previousValue = change.before.data().activo;
        db.collection('usuarios').doc(context.params.usuarioId).collection('empresas').doc(context.params.empresaId).set({
            contador_cobradores: fieldValueincrement
        }, { merge: true });
    });

/**
 * @function Funcion contar los cobradores.
 */
exports.contadorZonas = functions.firestore
    .document('usuarios/{usuarioId}/empresas/{empresaId}/Zonas/{zonaId}')
    .onCreate((change, context) => {
        // const previousValue = change.before.data().activo;
        db.collection('usuarios').doc(context.params.usuarioId).collection('empresas').doc(context.params.empresaId).set({
            contador_zonas: fieldValueincrement
        }, { merge: true });
    });

/**
 * @function Funcion contador clientes.
 */
exports.ContadorClientesEmpresa = functions.firestore
    .document('usuarios/{usuarioId}/empresas/{empresaId}/cobradores/{cobradorId}/Clientes/{clienteId}')
    .onWrite((change, context) => {
        // Get an object representing the document
        // e.g. {'name': 'Marie', 'age': 66}
        // ...or the previous value before this update
        if (!change.before.exists) {
            // New document Created : add one to count

            db.collection('usuarios').doc(context.params.usuarioId).collection('empresas').doc(context.params.empresaId).set({
                contador_cobradores: fieldValueincrement
            });

        } else if (change.before.exists && change.after.exists) {
            // Updating existing document : Do nothing

        } else if (!change.after.exists) {
            // Deleting document : subtract one from count

            db.collection('usuarios').doc(context.params.usuarioId).collection('empresas').doc(context.params.empresaId).set({
                contador_cobradores: fieldValuedeincrement
            });

        }
    });


/**
 * @function Funcion para buscar el cobrador por la zona.
 */
exports.InformeDia = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');

    try {
        let infodia = {
            cobros: [],
            observaciones: [],
            clientes: [],
            prestamos: [],
            jornada_dia: []
        };


        const list_collections_cobradores_clientes = await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('cobradores').doc(request.query.idcobrador).listCollections();
        const collectionIds = list_collections_cobradores_clientes.map(col => col.id);
        if (collectionIds.includes('Jornada_Ruta')) {
            let jornadas_collection = db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('cobradores').doc(request.query.idcobrador).collection('Jornada_Ruta')
            let jornadas_collection_clientes = db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('cobradores').doc(request.query.idcobrador).collection('clientes')
            let jornadas_collection_cobros = db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('cobradores').doc(request.query.idcobrador).collection('cobros')
            let jornadas_collection_nopagos = db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('cobradores').doc(request.query.idcobrador).collection('observaciones')


            let restultadoCollectionJornadas = jornadas_collection.where("fecha_inicial", "==", request.body.fecha).get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {

                        let id = doc.id;
                        let datadocument = doc.data();
                        datadocument.id = id;
                        let data = {
                            data: datadocument
                        }
                        infodia.jornada_dia.push(data);
                    });
                    return true;
                });



            let restultadoCollectionCobros = jornadas_collection_cobros.where("fecha", "==", request.body.fecha).get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {

                        let id = doc.id;
                        let datadocument = doc.data();
                        datadocument.id = id;
                        infodia.cobros.push(datadocument);
                    });
                    return true;
                });

            let restultadoCollectionNoCobros = jornadas_collection_nopagos.where("fecha", "==", request.body.fecha).get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {

                        let id = doc.id;
                        let datadocument = doc.data();
                        datadocument.id = id;
                        infodia.observaciones.push(datadocument);
                    });
                    return true;
                });

            Promise.all([restultadoCollectionJornadas, restultadoCollectionCobros, restultadoCollectionNoCobros]).then(values => {
                return response.status(200).send(infodia);
            }).catch((error) => {
                return response.status(500).send(error);
            });

        }





        // return response.status(200).send(JSON.stringify(collectionIds));
    } catch (error) {
        return response.status(500).send(error);
    }
})



/**
 * @function Funcion para buscar el cobrador por la zona.
//  */
exports.InfoDashboard = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');

    try {
        let infodia = {
            NumerotransferenciasRecibidas: [],
            NumerotransferenciasEnviadas: [],
            totaldineroprestado: [],
            totaldinerocobrado: []
        };


        let list_collections_zonas_transferencias = await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('Zonas').doc(request.query.idzona).collection('Transferencias');
        let list_collections_empresa_historial_transacciones = await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('historial_transaccion');
        let list_collections_empresa_cobradores_cobros = await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('cobradores').doc(request.query.idcobrador).collection('cobros');
        let list_collections_empresa_cobradores_clientes = await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('cobradores').doc(request.query.idcobrador).collection('clientes');
        // const list_collections_zonas_transferencias = await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('Zonas').doc(request.query.idzona).collection('Transferencias').listCollections();
        // const collectionIds = list_collections_cobradores_clientes.map(col => col.id);
        // if (collectionIds.includes('Jornada_Ruta')) {
        // let jornadas_collection = db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('cobradores').doc(request.query.idcobrador).collection('Jornada_Ruta')
        // let jornadas_collection_clientes = db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('cobradores').doc(request.query.idcobrador).collection('clientes')
        // let jornadas_collection_cobros = db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('cobradores').doc(request.query.idcobrador).collection('cobros')
        // let jornadas_collection_nopagos = db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('cobradores').doc(request.query.idcobrador).collection('observaciones')


        let list_collections_empresa_historial_transacciones_query = list_collections_empresa_historial_transacciones.where("fecha", "<", request.body.fecha1).where("fecha", ">", request.body.fecha2).where("estado_transaccion", "==", request.body.estado).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {

                    let id = doc.id;
                    let datadocument = doc.data();
                    datadocument.id = id;
                    let data = {
                        data: datadocument
                    }
                    infodia.NumerotransferenciasRecibidas.push(data);
                });
                return true;
            });



        // let restultadoCollectionCobros = jornadas_collection_cobros.where("fecha", "==", request.body.fecha).get()
        //     .then((querySnapshot) => {
        //         querySnapshot.forEach((doc) => {

        //             let id = doc.id;
        //             let datadocument = doc.data();
        //             datadocument.id = id;
        //             infodia.cobros.push(datadocument);
        //         });
        //         return true;
        //     });

        // let restultadoCollectionNoCobros = jornadas_collection_nopagos.where("fecha", "==", request.body.fecha).get()
        //     .then((querySnapshot) => {
        //         querySnapshot.forEach((doc) => {

        //             let id = doc.id;
        //             let datadocument = doc.data();
        //             datadocument.id = id;
        //             infodia.observaciones.push(datadocument);
        //         });
        //         return true;
        //     });

        Promise.all([list_collections_empresa_historial_transacciones_query]).then(values => {
            return response.status(200).send(infodia);
        }).catch((error) => {
            return response.status(500).send({ 'error': error.code, 'mensaje': error.message, 'details ': error.details });
        });

        // }
        // return response.status(200).send(JSON.stringify(collectionIds));
    } catch (error) {
        return response.status(500).send({ 'error': error.code, 'mensaje': error.message, 'details ': error.details });
    }
})




/**
 * @function Funcion para buscar el cobrador por la zona.
 */
exports.InformacionParaCobradores = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');

    try {
        let infocobrador = {
            collecciones: [],
            empresa: [],
            zonas: [],
            cobrador: [],
            clientes: [],
            lista_clientes: [],
            parametros_cobros: []
        };
        const collections = await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).listCollections();
        const info_empresa = await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc);
        // const collections_clientes_cobrador = await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc);
        const collectionIds = collections.map(col => col.id);
        infocobrador.collecciones = collectionIds;

        const collections_zona = await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('Zonas');
        const collections_parametros_cobro = await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('parametros_cobros');
        const collections_cobradores = await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('cobradores').doc(request.query.idcobrador);
        const collections_cobradores_clientes = await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('cobradores').doc(request.query.idcobrador).collection('clientes');
        const collections_lista_clientes = await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('cobradores').doc(request.query.idcobrador).collection('lista_clientes_posicion').doc('posiciones');

        let restultadoConsultazonasempresa = collections_zona.where("empresa", "==", request.query.doc).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {

                    let id = doc.id;
                    let datadocument = doc.data();
                    datadocument.id = id;
                    infocobrador.zonas.push(datadocument);
                });
                return true;
            });

        let restultadoConsultacobradoressempresa = collections_cobradores.get()
            .then((doc) => {
                if (doc.exists) {
                    let id_cobrador = doc.id;
                    let datadocument_cobrador = doc.data();
                    datadocument_cobrador.id = id_cobrador;
                    infocobrador.cobrador.push(datadocument_cobrador);

                    return true;

                } else {
                    return false;
                }

            });

        let restultadoConsultaListaClientes = collections_lista_clientes.get()
            .then((doc) => {
                // infocobrador.lista_clientes.push(doc.data());
                if (doc.exists) {

                    let datalista_cliente = doc.data();
                    infocobrador.lista_clientes.push(datalista_cliente);

                    return true;

                } else {
                    return false;
                }

            });

        let restultadoConsultainfoempresa = info_empresa.get()
            .then((doc) => {
                if (doc.exists) {
                    let id_cobrador = doc.id;
                    let datadocument_cobrador = doc.data();
                    datadocument_cobrador.id = id_cobrador;
                    infocobrador.empresa.push(datadocument_cobrador);

                    return true;

                } else {
                    return false;
                }

            });

        let restultadoConsultaparametroscobros = collections_parametros_cobro.where("empresa", "==", request.query.doc).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {

                    let id_parametros_cobros = doc.id;
                    let datadocument_parametros_cobros = doc.data();
                    datadocument_parametros_cobros.id = id_parametros_cobros;
                    infocobrador.parametros_cobros.push(datadocument_parametros_cobros);
                });
                return true;
            });

        let restultadoConsultaClientesCobrador = collections_cobradores_clientes.get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let id_clientes = doc.id;
                    let datacobradores_clientes = doc.data();
                    datacobradores_clientes.id = id_clientes;
                    infocobrador.clientes.push({ data: datacobradores_clientes });
                });
                return true;
            });

        Promise.all([restultadoConsultazonasempresa, restultadoConsultacobradoressempresa, restultadoConsultaListaClientes, restultadoConsultainfoempresa, restultadoConsultaparametroscobros, restultadoConsultaClientesCobrador]).then(values => {
            return response.status(200).send(infocobrador);
        }).catch((error) => {
            return response.status(500).send(error);
        });



        //     let empresasCollection = await db.collection('usuarios').doc(request.query.idadmin).collection('empresas');
        //     let zonasCollection = await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('empresas');
        //     let idCobrador = '';
        //     let restultadoConsulta = empresasCollection.where("Zona", "==", request.query.zona).get()
        //         .then((querySnapshot) => {
        //             querySnapshot.forEach((doc) => {
        //                 // doc.data() is never undefined for query doc snapshots
        //                 // console.log(doc.id, " => ", doc.data());
        //                 idCobrador = doc.id;

        //             });
        //             return response.status(200).send(idCobrador);
        //         });

    } catch (error) {
        return response.status(500).send(error);
    }
});






/**
 * @function Funcion para guardar los cobros de los cobradores.
 */
exports.CobradoresGuardarCobros = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');

    try {
        await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.id_empresa).collection('cobradores').doc(request.query.doc).collection('cobros').add(request.body).then((resp) => {
            return response.status(200).send({ mensaje: 'Cobro registrado.', id: resp.id });
        });

    } catch (error) {
        return response.status(500).send(error);
    }
});

/**
 * @function Funcion para los prestamos del cliente.
 */
exports.ClienteEliminarPrestamosPago = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');

    try {
        await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.id_empresa).collection('cobradores').doc(request.query.doc).collection('clientes').doc(request.query.sub).update({
            prestamos: fieldValue.delete()
        });
        return response.status(200).send('Cobro registrado.');
    } catch (error) {
        return response.status(500).send(error);
    }
});


/**
 * @function Funcion para eliminar el cobro al cliente.
 */
exports.ClienteEliminarCobro = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');

    try {

        await db.collection('usuarios').doc(request.query.id_admin).collection('empresas').doc(request.query.id_empresa).collection('cobradores').doc(request.query.id_cobrador).collection('cobros').doc(request.query.id_cobro).delete().then(() => {
            return response.status(200).send('Cobro eliminado.');
        })

    } catch (error) {
        return response.status(500).send(error);
    }
});

/**
 * @function Funcion para los prestamos del cliente.
 */
exports.ClienteActualizarCobro = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');

    try {
        await db.collection('usuarios').doc(request.query.id_admin).collection('empresas').doc(request.query.id_empresa).collection('cobradores').doc(request.query.id_cobrador).collection('cobros').doc(request.query.id_cobro).update(request.body, { merge: true }).then((resp) => {
            return response.status(200).send({ mensaje: 'Cobro Actualizado.', id: resp.id });
        })

    } catch (error) {
        return response.status(500).send(error);
    }
});

/**
 * @function Funcion para guardar las observaciones de los cobros no realizados.
 */
exports.CobradoresGuardarObservacionNoPago = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');

    try {
        await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.id_empresa).collection('cobradores').doc(request.query.doc).collection('observaciones').add(request.body).then((resp) => {
            return response.status(200).send({ mensaje: 'Observacion registrada.', id: resp.id });
        });
        return response.send('Cobro registrado.');
    } catch (error) {
        return response.status(500).send(error);
    }
});

/**
 * @function Funcion que guarda la zona de la empresa.
 */
exports.getEmpresaZonaDoc = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');

    try {
        let datasubcolltion = [];
        await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('Zonas').doc(request.query.subdoc).get().then(doc => {
            if (!doc.exists) {

                return response.send('Not Found')
            }

            return response.status(200).send(JSON.stringify(doc.data())).end();
        })
    } catch (error) {
        return response.send('Error getting document', err).end();
    }
});

/**
 * @function Funcion que devuelve las zonas de la empresa.
 */
exports.EmpresasZonas = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');

    let datasubcolltion = [];
    await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection(request.query.sub).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                let id = doc.id;
                let datadocument = doc.data();
                datadocument.id = id;
                datasubcolltion.push(datadocument);
            });
            return response.status(200).send(JSON.stringify(datasubcolltion));
        })
        .catch(err => {
            return response.send('Error getting document', err).end();
        });
});

/**
 * @function Funcion para guardar las zonas en la empresa.
 */
exports.EmpresasZonasGuardar = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');
    try {
        const snapshot = await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).get();

        if (!snapshot.exists) {
            return response.status(200).send(JSON.stringify({ mensaje: 'Empresa no econtrada.' })).end();
        } else {

            await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection(request.query.sub).add(request.body).then(() => {
                return response.status(200).send(JSON.stringify({ mensaje: 'Zona Guardada.' })).end();
            }).catch((error) => {
                return response.status(500).send(error);
            });
        }
    } catch (error) {
        return response.send('Error getting document', error).end();
    }

});

/**
 * @function Funcion para guardar los clientes de los cobradores.
 */
exports.CobradoresGuardarClientes = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');
    try {
        await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('cobradores').doc(request.query.subdoc).collection('clientes').add(request.body).then((res) => {
            return response.status(200).send(res.id);
        });
    } catch (error) {
        return response.status(500).send(error);
    }

});

/**
 * @function Funcion para actualiza los clientes de los cobradores.
 */
exports.CobradoresClientesUpdate = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');
    try {
        await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.id_empresa).collection('cobradores').doc(request.query.doc).collection('clientes').doc(request.query.subdoc).set(request.body, { merge: true }).then(() => {
            return response.status(200).send({ mensaje: 'Actualizado' });
        });
    } catch (error) {
        return response.status(500).send(error);
    }
});




/**
 * @function Funcion para actualiza los clientes de los cobradores.
 */
exports.CobradoresGuardarListaDia = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');
    try {
        await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.id_empresa).collection('cobradores').doc(request.query.doc).collection('lista_jornada_dia').add(request.body).then((resp) => {
            return response.status(200).send({ mensaje: 'Lista guardada', id: resp.id });
        });
    } catch (error) {
        return response.status(500).send(error);
    }
});

/**
 * @function Funcion para actualiza los clientes de los cobradores.
 */
exports.CobradoresConsultarLista = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');
    try {
        let datasubcolltion = []
        await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.id_empresa).collection('cobradores').doc(request.query.doc).collection('lista_jornada_dia').doc(request.query.subdoc).get()
            .then(doc => {
                // snapshot.forEach(doc => {
                //     let id = doc.id;
                //     let datadocument = doc.data();
                //     datadocument.id = id;
                //     datasubcolltion.push(datadocument);



                // });



                return response.status(200).send(doc.data());
            })

        // await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.id_empresa).collection('cobradores').doc(request.query.doc).collection('lista_jornada_dia').add(request.body).then(() => {
        //     return response.status(200).send({ mensaje: 'Lista guardada' });
        // });
    } catch (error) {
        return response.status(500).send(error);
    }
});


/**
 * @function Funcion para buscar el cliente del cobrador.
 */
exports.CobradoresClientesBuscar = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');
    let datasubcolltion = [];
    const docRef = await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.id_empresa).collection('cobradores').doc(request.query.doc).collection('clientes').doc(request.query.subdoc).get().then(doc => {
            if (!doc.exists) {

                return response.send('Not Found')
            }

            return response.status(200).send(JSON.stringify(doc.data())).end();
        })
        .catch(err => {
            return response.send('Error getting document', err).end();
        });
});

/**
 * @function Funcion para guardar las zonas de los cobradores.
 */
exports.ZonasGuardarCobradores = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');
    try {
        await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('Zonas').doc(request.query.subdoc).collection('Cobradores').add(request.body).then(() => {
            return response.send(JSON.stringify({ mensaje: 'Cobrador Guardado en la zona.' }));
        });
    } catch (error) {
        return response.status(500).send(error);
    }
});








/**
 * @function Funcion para guardar los prestamos de los cobradores.
 */
exports.CobradoresGuardarPrestamos = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');
    // await db.collection('cobradores').doc(request.query.doc).collection('Clientes').doc(request.query.subid).collection(request.query.sub).add(request.body).then(() => {
    await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.id_empresa).collection('cobradores').doc(request.query.doc).collection('clientes').doc(request.query.sub).update({
        prestamos: fieldValue.arrayUnion(request.body)
    }).then(() => {
        return response.send('Prestamo registrado.');
    }).catch((error) => {
        return response.status(500).send(error);
    });
});

/**
 * @function Funcion para guardar los prestamos de los cobradores.
 */
exports.CobradoresActualizarPrestamos = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');
    // return response.send(request.body);
    let data = request.body.toString();
    await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.id_empresa).collection('cobradores').doc(request.query.doc).collection('clientes').doc(request.query.sub).set({
        prestamos: fieldValue.arrayUnion(request.body, { merge: true })
    }).then(() => {
        return response.send('Prestamo registrado.');
    }).catch((error) => {
        return response.status(500).send(error);
    });
});

/**
 * @function Funcion para guardar los rutas de los cobradores.
 */
exports.CobradoresGuardarRutas = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET,POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');
    await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.id_empresa).collection('cobradores').doc(request.query.doc).collection(request.query.sub).add(request.body).then((result) => {
        return response.send(result.id);
    }).catch((error) => {
        return response.status(500).send(error);
    });
});

/**
 * @function Funcion para guardar los rutas de los cobradores.
 */
exports.CobradoresGuardarClientesRutas = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET,POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');


    await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.id_empresa).collection('cobradores').doc(request.query.doc).collection('Rutas').doc(request.query.sub).update({
        clientes: request.body
    }, { merge: true }).then((result) => {
        return response.send(result.id);
    }).catch((error) => {
        return response.status(500).send(error);
    });
});

/**
 * @function Funcion para guardar los gastos de los cobradores.
 */
exports.CobradoresGuardarGastos = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET,POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');
    await db.collection('usuarios').doc(request.query.id_admin).collection('empresas').doc(request.query.id_empresa).collection('cobradores').doc(request.query.ui_cobrador).collection('gastos').add(request.body).then(() => {
        return response.send('Gasto registrado.');
    }).catch((error) => {
        return response.status(500).send(error);
    });
});

/**
 * @function Funcion para ver todos los gastos de los cobradores.
 */
exports.getCobradoresGastos = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET,POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');

    try {
        const snapshot = await db.collection('usuarios').doc(request.query.id_admin).collection('empresas').doc(request.query.id_empresa).collection('cobradores').doc(request.query.ui_cobrador).collection('gastos').get();
        let gastos = [];

        if (snapshot.empty) {
            return response.send('Not Found');
        } else {
            snapshot.forEach(doc => {
                let id = doc.id;
                let datadocument = doc.data();
                datadocument.id = id;
                gastos.push(datadocument);
                // cobradores.push({
                //         id: doc.id,
                //         data: doc.data()
                //     });
            });
            return response.status(200).send(JSON.stringify(gastos));
        }
    } catch (error) {
        return response.status(500).send(error);
    }
});

/**
 * @function Funcion para buscar el cobrador por la zona.
 */
exports.buscarCobradorZona = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');

    try {
        let cobradoresCollection = await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('cobradores');
        let idFind = '';
        let query = cobradoresCollection.where('zona', '==', request.query.zona).get()
            .then((snapshot) => {
                if (!snapshot.empty) {
                    snapshot.forEach(doc => {
                        idFind = { id: doc.id };
                    });

                } else {
                    idFind = { id: "No hay coincidencias" };
                }

                return response.status(200).send(idFind);
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });

    } catch (error) {
        return response.status(500).send(error);
    }
});


/**
 * @function Funcion para buscar el cobrador por la zona.
 */
exports.buscarZonaCobrador = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');
    try {
        let infoZona = [];

        await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.idempresa).collection('Zonas').doc(request.query.doc).get().then((snapshot) => {
            // return response.status(200).send(JSON.stringify(snapshot));
            if (snapshot.exists) {

                let id = snapshot.id;
                let datadocument = snapshot.data();
                datadocument.id = id;
                infoZona.push(datadocument);
                // cobradores.push({
                //     id: doc.id,
                //     data: doc.data()
                // });

                return response.status(200).send(JSON.stringify(infoZona));

            } else {
                return response.status(200).send('Not Found');
            }
        });


    } catch (error) {
        return response.status(500).send(error)
    }

});



exports.CobradoresGuardar = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET,POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');

    try {
        // return response.status(200).send(request.body);
        // await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('cobradores').add(request.body).
        // let data = {
        //     Nombre: request.body.nombre
        //         // Apellido: request.body.apellido,
        //         // Direccion1: request.body.direccion1,
        //         // Direccion2: request.body.direccion2,
        //         // Identificacion: request.body.identificacion,
        //         // Telefono: request.body.telefono,
        //         // Zona: request.body.zona,
        //         // Empresa: request.body.empresa,
        //         // Rol: request.body.rol
        // }
        await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('cobradores').add(request.body).then((ref) => {
            // db.collection('cobradores').doc(ref.id).collection("Clientes").set({'hola':'fg'});
            return response.status(200).send({ mensaje: 'El nuevo cobrador ha sido registrado', id: ref.id });
        });

    } catch (error) {
        // db.collection('cobradores').doc(ref.id).collection("Clientes").set({'hola':'fg'});
        return response.status(500).send(error);
    }

});



/*
 * @function Funcion para retornar todos los cobradores por empresa.
 * @param request
 * @param response
 * @param body
 */

exports.getAllCobradores = functions.https.onRequest(async(request, response, body) => {
    //response.send("Hello from Firebase!");
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');
    try {
        const snapshot = await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.idempresa).collection('cobradores').get();
        let cobradores = [];

        if (snapshot.empty) {
            return response.send('Not Found');
        } else {
            snapshot.forEach(doc => {
                let id = doc.id;
                let datadocument = doc.data();
                datadocument.id = id;
                cobradores.push(datadocument);
                // cobradores.push({
                //         id: doc.id,
                //         data: doc.data()
                //     });
            });
            return response.status(200).send(JSON.stringify(cobradores));
        }
    } catch (error) {
        return response.status(500).send(error);
    }
});


exports.updateInfoCobradores = functions.https.onRequest(async(request, response, body) => {
    //response.send("Hello from Firebase!");
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');
    try {
        await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.idempresa).collection('cobradores').doc(request.query.doc).set(request.body, { merge: true })
            .then((resp) => {
                return response.status(200).send({ mensaje: 'Informacion actualizada', id: resp.id })
            });
    } catch (error) {
        return response.send('Error getting document', error);

    }
});

exports.eliminarCobradores = functions.https.onRequest(async(request, response, body) => {
    //response.send("Hello from Firebase!");
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');
    try {
        await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.idempresa).collection('cobradores').doc(request.query.doc).delete()
            .then(() => res.status(204).send("Document successfully deleted!"))
            .catch((error) => {
                return response.status(500).send(error);
            });
        return response.send({ mensaje: 'Cobrador eliminado.' })

    } catch (error) {
        return response.send('Error getting document', error);

    }
});




/*
 * @function Funcion que se encarga de manajar los end-point de Empresas.
 * @param request
 * @param response
 * @param body
 */
exports.Cobradores = functions.https.onRequest(async(request, response, body) => {
    //response.send("Hello from Firebase!");
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');
    try {
        const snapshot = await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('cobradores').get();
        //return  await response.send(request.query.all);

        switch (request.method) {
            case 'GET':
                if (request.query.doc === 'todos') {
                    let cobradores = [];

                    if (snapshot.empty) {
                        return response.send('Not Found');
                    } else {
                        snapshot.forEach(doc => {
                            let id = doc.id;
                            let datadocument = doc.data();
                            datadocument.id = id;
                            cobradores.push(datadocument);
                            // cobradores.push({
                            //         id: doc.id,
                            //         data: doc.data()
                            //     });
                        });
                        return response.status(200).send(JSON.stringify(cobradores));
                    }
                } else {
                    if (request.query.sub) {
                        let datasubcolltion = [];

                        const collections = await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('cobradores').doc(request.query.subdoc).listCollections();
                        const collectionIds = collections.map(col => col.id);

                        const docRef = await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('cobradores').doc(request.query.subdoc).collection(request.query.sub).get()
                            .then(snapshot => {
                                snapshot.forEach(doc => {
                                    let id = doc.id;
                                    let datadocument = doc.data();
                                    //cobradores.push(id,datadocument);
                                    datasubcolltion.push({
                                        id: doc.id,
                                        data: doc.data(),
                                        collectiosId: collectionIds
                                    });


                                });



                                return response.status(200).send(JSON.stringify(datasubcolltion));
                            })
                            .catch(err => {
                                return response.send('Error getting document', err).end();
                            });
                    } else {

                        const docRef = await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('cobradores').doc(request.query.subdoc).get()
                            .then(doc => {
                                if (!doc.exists) {

                                    return response.send('Not Found')
                                }

                                return response.status(200).send(JSON.stringify(doc.data())).end();
                            })
                            .catch(err => {
                                return response.send('Error getting document', err).end();
                            });
                    }
                    //}
                }

                break;
            case 'PUT':
                await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('cobradores').doc(request.query.doc).set(request.body, { merge: true })
                    .then(() => response.json(request.query.doc))
                    .catch((error) => response.status(500).send(error))
                break;
            case 'DELETE':

                await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('cobradores').doc(request.query.doc).delete()
                    .then(() => res.status(204).send("Document successfully deleted!"))
                    .catch((error) => {
                        return response.status(500).send(error);
                    });
                return response.send(request.method);
            default:

                break;
        }
    } catch (err) {
        return response.send('Error getting document', err);

    }
});

/**
 * @function Funcion que se encarga de manajar los end-point de Empresas.
 * @param request
 * @param response
 * @param body
 */
exports.Empresas = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');
    try {
        const snapshot = await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').get();
        //return  await response.send(request.query.all);

        switch (request.method) {
            case 'GET':
                if (request.query.doc === 'todos') {
                    let empresas = [];

                    if (snapshot.empty) {
                        return response.send('Not Found');
                    } else {
                        snapshot.forEach(doc => {
                            // let id = doc.id;
                            let datadocument = doc.data();
                            datadocument.id = doc.id
                            empresas.push(datadocument);
                            // users.push({
                            //         id: doc.id,
                            //         data: doc.data()
                            //     });
                        });
                        return response.status(200).send(JSON.stringify(empresas));
                    }
                } else {
                    const docRef = await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).get()
                        .then(doc => {
                            if (!doc.exists) {

                                return response.send('Not Found')
                            }

                            return response.status(200).send(JSON.stringify(doc.data())).end();
                        })
                        .catch(err => {
                            return response.send('Error getting document', err).end();
                        });
                }

                break;
            case 'POST':
                //response.status(200).send(request.body);

                await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').add(request.body).then((resp) => {
                    return response.send({ mensaje: 'Empresas registrada', id: resp.id });
                }).catch((error) => {
                    return response.status(500).send(error);
                });

                break;
            case 'PUT':
                await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).set(request.body, { merge: true })
                    .then(() => response.json(request.query.doc))
                    .catch((error) => response.status(500).send(error))
                break;
            case 'DELETE':

                await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).delete()
                    .then(() => res.status(204).send("Document successfully deleted!"))
                    .catch((error) => {
                        return response.status(500).send(error);
                    });
                return response.send(request.method);
            default:

                break;
        }
    } catch (err) {
        return response.send('Error getting document', err);

    }
    return response.status(200).send('ok').end();
});

/**
 * @function Funcion que se encarga de manajar los end-point de Clientes.
 * @param request
 * @param response
 * @param body
 * @description Metodos GET,POST,PUT,ELETE.
 */
exports.Rutas = functions.https.onRequest(async(request, response, body) => {
    //response.send("Hello from Firebase!");
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    try {
        const snapshot = await db.collection('usuarios').doc(request.query.idadmin).collection('rutas').get();
        //return  await response.send(request.query.all);

        switch (request.method) {
            case 'GET':
                if (request.query.doc === 'todos') {
                    let rutas = [];

                    if (snapshot.empty) {
                        return response.send('Not Found');
                    } else {
                        snapshot.forEach(doc => {
                            let id = doc.id;
                            let datadocument = doc.data();
                            //clientes.push(id,{id},data:{datadocument});
                            rutas.push({
                                id: doc.id,
                                data: doc.data()
                            });
                        });
                        return response.status(200).send(JSON.stringify(rutas));
                    }
                } else {
                    const docRef = await db.collection('usuarios').doc(request.query.idadmin).collection('rutas').doc(request.query.doc).get()
                        .then(doc => {
                            if (!doc.exists) {

                                return response.send('Not Found')
                            }

                            return response.status(200).send(JSON.stringify(doc.data())).end();
                        })
                        .catch(err => {
                            return response.send('Error getting document', err).end();
                        });
                }

                break;
            case 'POST':

                await db.collection('usuarios').doc(request.query.idadmin).collection('rutas').add({
                    Nombre: request.body.nombre,
                    fecha_creacion: request.body.fecha,
                    balance: request.body.balance
                }).then(() => {
                    return response.send('Ruta registrada');
                }).catch((error) => {
                    return response.status(500).send(error);
                });

                break;
            case 'PUT':
                await db.collection('usuarios').doc(request.query.idadmin).collection('rutas').doc(request.query.doc).set(request.body, { merge: true })
                    .then(() => response.json(request.query.doc))
                    .catch((error) => response.status(500).send(error))
                break;
            case 'DELETE':

                await db.collection('usuarios').doc(request.query.idadmin).collection('rutas').doc(request.query.doc).delete()
                    .then(() => res.status(204).send("Document successfully deleted!"))
                    .catch((error) => {
                        return response.status(500).send(error);
                    });
                return response.send(request.method);
            default:

                break;
        }
    } catch (err) {
        return response.send('Error getting document', err);

    }
    return response.status(200).send('ok').end();
});
/**
 * @function Funcion que se encarga de manajar los end-point de Clientes.
 * @param request
 * @param response
 * @param body
 * @description Metodos GET,POST,PUT,ELETE.
 */
exports.Clientes = functions.https.onRequest(async(request, response, body) => {
    //response.send("Hello from Firebase!");
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    try {
        const snapshot = await db.collection('usuarios').doc(request.query.idadmin).collection('clientes').get();
        //return  await response.send(request.query.all);

        switch (request.method) {
            case 'GET':
                if (request.query.doc === 'todos') {
                    let clientes = [];

                    if (snapshot.empty) {
                        return response.send('Not Found');
                    } else {
                        snapshot.forEach(doc => {
                            let id = doc.id;
                            let datadocument = doc.data();
                            //clientes.push(id,{id},data:{datadocument});
                            clientes.push({
                                id: doc.id,
                                data: doc.data()
                            });
                        });
                        return response.status(200).send(JSON.stringify(clientes));
                    }
                } else {
                    const docRef = await db.collection('usuarios').doc(request.query.idadmin).collection('clientes').doc(request.query.doc).get()
                        .then(doc => {
                            if (!doc.exists) {

                                return response.send('Not Found')
                            }

                            return response.status(200).send(JSON.stringify(doc.data())).end();
                        })
                        .catch(err => {
                            return response.send('Error getting document', err).end();
                        });
                }

                break;
            case 'POST':

                await db.collection('usuarios').doc(request.query.idadmin).collection('clientes').add({
                    Nombre: request.body.nombre,
                    Apellido: request.body.apellido,
                    Direccion1: request.body.direccion1,
                    Direccion2: request.body.direccion2,
                    Identificacion: request.body.identificacion,
                    Oficio: request.body.oficio
                }).then(() => {
                    return response.send('cliente registrado');
                }).catch((error) => {
                    return response.status(500).send(error);
                });

                break;
            case 'PUT':
                await db.collection('usuarios').doc(request.query.idadmin).collection('cobradores').doc(request.query.doc).collection('clientes').doc(request.query.subdoc).set(request.body, { merge: true })
                    .then((response) => response.json(response))
                    .catch((error) => response.status(500).send(error))
                break;
            case 'DELETE':

                await db.collection('usuarios').doc(request.query.idadmin).collection('clientes').doc(request.query.doc).delete()
                    .then(() => res.status(204).send("Document successfully deleted!"))
                    .catch((error) => {
                        return response.status(500).send(error);
                    });
                return response.send(request.method);
            default:

                break;
        }
    } catch (err) {
        return response.send('Error getting document', err);

    }
    return response.status(200).send('ok').end();
});
/**
 * @function Funcion que se encarga de manajar los end-point de Usuarios.
 * @param request
 * @param response
 * @param body
 */
exports.Usuarios = functions.https.onRequest(async(request, response, body) => {
    //response.send("Hello from Firebase!");
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    try {
        const snapshot = await db.collection('usuarios').get();
        //return  await response.send(request.query.all);

        switch (request.method) {
            case 'GET':
                if (request.query.doc === 'todos') {
                    let users = [];

                    if (snapshot.empty) {
                        return response.send('Not Found');
                    } else {
                        snapshot.forEach(doc => {
                            let id = doc.id;
                            let datadocument = doc.data();
                            users.push(id, datadocument);
                            // users.push({
                            //         id: doc.id,
                            //         data: doc.data()
                            //     });
                        });
                        return response.status(200).send(JSON.stringify(users));
                    }
                } else {
                    const docRef = await db.collection('usuarios').doc(request.query.doc).get()
                        .then(doc => {
                            if (!doc.exists) {

                                return response.send('Not Found')
                            }

                            return response.status(200).send(JSON.stringify(doc.data())).end();
                        })
                        .catch(err => {
                            return response.send('Error getting document', err).end();
                        });
                }

                break;
            case 'POST':
                //response.status(200).send(request.body);

                await db.collection('usuarios').add(request.body).then((res) => {
                    return response.status(200).send({ mensaje: 'Usuario registrado', id: res.id });
                }).catch((error) => {
                    return response.status(500).send(error);
                });

                break;
            case 'PUT':
                await db.collection('usuarios').doc(request.query.doc).set(request.body, { merge: true })
                    .then(() => response.json(request.query.doc))
                    .catch((error) => response.status(500).send(error))
                break;
            case 'DELETE':

                await db.collection('usuarios').doc(request.query.doc).delete()
                    .then(() => res.status(204).send("Document successfully deleted!"))
                    .catch((error) => {
                        return response.status(500).send(error);
                    });
                return response.send(request.method);
            default:

                break;
        }
    } catch (err) {
        return response.send('Error getting document', err);

    }
    return response.status(200).send('ok').end();
});

/**
 * @function Funcion que retorna todas las empresas activas.
 */
exports.getEmpresasActive = functions.https.onRequest((request, response, body) => {
    //response.send("Hello from Firebase!");


    // Create a reference to the cities collection
    let citiesRef = db.collection('usuarios').doc(request.query.idadmin).collection('empresas');

    // Create a query against the collection
    let queryRef = citiesRef.where('activo', '==', 'true').get()
        .then(snapshot => {
            let datadocumnts = [];
            if (snapshot.empty) {
                datadocumnts.push('No matching documents.');
            }
            snapshot.forEach(doc => {
                let id = doc.id;
                let data = doc.data();
                datadocumnts[id] = data;
            });
            return response.status(200).send(JSON.stringify(datadocumnts));


        })
        .catch(err => {
            return response.send('Error getting document', err);
        });
});

/**
 * @function Funcion que devuelve todas la tazas de interes.
 */
exports.getTazaseInteres = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');

    let cobradores = [];
    const snapshot = await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('parametros_cobros').get();
    if (snapshot.empty) {
        return response.send('Not Found');
    } else {
        snapshot.forEach(doc => {
            let id = doc.id;
            let datadocument = doc.data();
            datadocument.id = id;
            cobradores.push(datadocument);
            // cobradores.push({
            //     id: doc.id,
            //     data: doc.data()
            // });
        });
        return response.status(200).send(JSON.stringify(cobradores));
    }
});


exports.actualizarTazaseInteres = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');

    try {


        // return response.status(200).send(request.body).end();
        const snapshot = await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('parametros_cobros').doc(request.query.subdoc).update({ nombre: request.body.nombre, plazo: request.body.plazo, interes: request.body.interes }, { merge: true })
            .then(res => {
                return response.status(200).send(JSON.stringify({ mensaje: 'Plan de pago actualizado', id: res.id })).end();
            }).catch((error) => {
                return response.status(500).send(error);
            });
    } catch (error) {
        return response.status(500).send(error);
    }


});



/**
 * @function Funcion para Eliminar las plan cobro.
 */
exports.EliminarPlanCobro = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');

    try {

        await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('parametros_cobros').doc(request.query.subdoc).delete();
        // });
    } catch (error) {
        return response.status(500).send(error);
    }

});

/**
 * @function Funcion que guarda los planes nuevos de cobro de la empresa.
 */
exports.GuardarNuevoPlanEmpresa = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');

    try {
        await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('parametros_cobros').add(request.body).then(res => {
            return response.status(200).send(JSON.stringify({ mensaje: 'El nuevo plan ha sido creado.', id: res.id })).end();
        }).catch((error) => {
            return response.status(500).send(error);
        });
    } catch (error) {
        return response.send('Error getting document', error).end();
    }
});

/**
 * @function Funcion que guardar la informacion de la ruta.
 */
exports.guardarJornadaInfoRuta = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');

    try {
        await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.id_empresa).collection('cobradores').doc(request.query.doc).collection('Jornada_Ruta').add(request.body).then(res => {
            return response.status(200).send(JSON.stringify({ mensaje: 'Rornada_Ruta.', id: res.id })).end();
        }).catch((error) => {
            return response.status(500).send(error);
        });
    } catch (error) {
        return response.send('Error getting document', error).end();
    }
});

/**
 * @function Funcion que actualiza la ruta de la jornada.
 */
exports.actualizarJornadaRutaDia = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');

    try {
        const snashop = await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.id_empresa).collection('cobradores').doc(request.query.doc).collection('Jornada_Ruta').doc(request.query.subdoc);
        // return response.status(200).send(JSON.stringify(snashop)).end();
        snashop.set(request.body, { merge: true }).then(res => {
            return response.status(200).send(JSON.stringify({ mensaje: 'Jornada terminada y actualizada.', id: res.id })).end();
        }).catch((error) => {
            return response.status(500).send(error);
        });
    } catch (error) {
        return response.send('Error getting document', error).end();
    }
});


/**
 * @function Funcion actualiza la posicion del cliente en la lista.
 */
exports.actualizarPosicionClienteLista = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');

    try {
        await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.id_empresa).collection('cobradores').doc(request.query.doc).collection('lista_clientes_posicion').doc('posiciones')
            .set(request.body)
            .then(res => {
                return response.status(200).send(JSON.stringify({ mensaje: 'Lista Guardada', id: res.id })).end();
            }).catch((error) => {
                return response.status(500).send(error);
            });
        //return response.status(200).send(JSON.stringify(snashop)).end();

    } catch (error) {
        return response.send('Error getting document', error).end();
    }
});




/**
 * @function Funcion para Eliminar las transacciones.
 */
exports.EliminarTransaccion = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');

    try {

        await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('Zonas').doc(request.query.subdoc).collection('Transferencias').doc('nueva_transaccion').delete();
        // });
    } catch (error) {
        return response.status(500).send(error);
    }

});

/**
 * @function Funcion para buscar las trasacciones pendientes.
 */
exports.transaccionesPendientes = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');

    try {

        await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('Zonas').doc(request.query.subdoc).collection('Transferencias').where("estado_transaccion", "==", false).get()
            .then(snapshot => {
                let prestamos_pendientes = [];
                if (snapshot.empty) {
                    datadocumnts.push('No matching documents.');
                }
                snapshot.forEach(doc => {
                    // let id = doc.id;
                    let data = doc.data();
                    data.id = doc.id;
                    prestamos_pendientes.push(data);
                });
                return response.status(200).send(prestamos_pendientes);
            });

    } catch (error) {
        return response.status(500).send(error);
    }

});


/**
 * @function Funcion para Eliminar las transacciones.
 */
exports.EliminarTransaccionEmpresa = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');

    try {

        await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('Transferencias').doc(request.query.subdoc).delete();
        // });
    } catch (error) {
        return response.status(500).send(error);
    }

});

/**
 * @function Funcion para Eliminar las transacciones.
 */
exports.EliminarTransaccionEmpresaZona = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');

    try {
        // /usuarios/rPmEcBvQTRjJZrgmpqJ2/empresas/hQPTik3wZ0yK2i5y6tdX/Zonas/4rPV9a3klSx6WQCxpNBO/Transferencias/QHS7AH4NicEKSwuRRtu3
        await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('Zonas').doc(request.query.idzona).collection('Transferencias').doc(request.query.idtransaccion).delete().then((resp) => {
            return response.status(200).send('Transaccion eliminada');
        });
        // });
    } catch (error) {
        return response.status(500).send(error);
    }

});



/**
 * @function Funcion para actualizar el estado de la transaccion.
 */
exports.actualizarEstadoTransaccion = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');

    try {
        // return response.status(200).send(request.query.estado_transaccion);
        await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('Transferencias').doc(request.query.subdoc).update({
            estado_transaccion: Number(request.query.estado_transaccion),
            transaccion_nueva: true
        }, { merge: true }).then((resp) => {
            return response.status(200).send('Transaccion actualizada');
            // });
        });
    } catch (error) {
        return response.status(500).send(error);
    }

});

/**
 * @function Funcion para guardar los prestamos de los guardar el historial de transacciones.
 */
exports.guardarTransaccionPendiente = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');
    try {
        const snapshot = await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('Zonas').doc(request.query.subdoc).collection('Transacciones_pendientes').add(request.body).then(() => {
            return response.status(200).send(JSON.stringify({ mensaje: 'Transaccion PendienteGuardada.' })).end();
        }).catch((error) => {
            return response.status(500).send(error);
        });

    } catch (error) {
        return response.send('Error getting document', error).end();
    }
});


/**
 * @function Funcion para guardar los prestamos de los guardar el historial de transacciones.
 */
exports.guardarHistorialTransaccion = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');
    try {
        const snapshot = await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).get();

        if (!snapshot.exists) {
            return response.status(200).send(JSON.stringify({ mensaje: 'Empresa no econtrada.' })).end();
        } else {

            await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('historial_transaccion').add(request.body).then(() => {
                return response.status(200).send(JSON.stringify({ mensaje: 'Historial Guardado.' })).end();
            }).catch((error) => {
                return response.status(500).send(error);
            });
        }
    } catch (error) {
        return response.send('Error getting document', error).end();
    }
});

/**
 * @function Funcion que devuelve todas la tazas de interes.
 */
exports.getHistorialTransacciones = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');

    try {
        let historialTrasacciones = [];
        const snapshot = await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('historial_transaccion').get();
        if (snapshot.empty) {
            return response.send('Not Found');
        } else {
            snapshot.forEach(doc => {
                let data = doc.data();
                data.id = doc.id;
                historialTrasacciones.push(data);
            });
            return response.status(200).send(JSON.stringify(historialTrasacciones));
        }
    } catch (error) {
        return response.status(500).send(error);
    }

});

/**
 * @function Funcion que devuelve todas la tazas de interes.
 */
exports.getTransacciones = functions.https.onRequest(async(request, response, body) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Credentials', 'true'); // vital
    response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
    response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');

    try {
        let Trasacciones = [];
        const snapshot = await db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('Transferencias').get();
        if (snapshot.empty) {
            return response.send('Not Found');
        } else {
            snapshot.forEach(doc => {
                let data = doc.data();
                data.id = doc.id;
                Trasacciones.push(data);
            });
            return response.status(200).send(JSON.stringify(Trasacciones));
        }
    } catch (error) {
        return response.status(500).send(error);
    }

});