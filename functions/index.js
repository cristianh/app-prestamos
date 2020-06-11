const functions = require('firebase-functions');
const admin = require('firebase-admin');
const util = require('util')


admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.addUsuario =  functions.https.onRequest(( request, response) => {
 //response.send("Hello from Firebase!");
         try {
           admin.firestore().collection('usuarios').add({
                                                    usuario:'Matias'
                                                });
            return response.send('ok');
         } catch (error) {
             return response.send('Error getting document', error);
         }
});


exports.addEmpresa =  functions.https.onRequest(( request, response,body) => {
 //response.send("Hello from Firebase!");
 const empresa=request.body;
         try {
           admin.firestore().collection('empresas').add(empresa);
            return response.send('ok');
         } catch (error) {
             return response.send('Error getting document', error);
         }
});

exports.getEmpresasActive =  functions.https.onRequest(( request, response,body) => {
 //response.send("Hello from Firebase!");

      
      // Create a reference to the cities collection
      let citiesRef = admin.firestore().collection('empresas');

      // Create a query against the collection
      let queryRef = citiesRef.where('activo', '==', 'true').get()
      .then(snapshot => {
        let datadocumnts=[];
        if (snapshot.empty) {
          datadocumnts.push('No matching documents.');
        }
          snapshot.forEach(doc => {
              let id = doc.id ;
              let data = doc.data() ;
              datadocumnts[id]=data;
          });
       return response.status(200).send(JSON.stringify(datadocumnts));
     
      
  })
  .catch(err => {
    return response.send('Error getting document', err);
  });
});

exports.getData = functions.https.onRequest(  (request, response) => {
 const docRef = admin.firestore().collection('usuarios').doc('usuario1');
 const getDoc = docRef.get()
   .then(doc => {
     if (!doc.exists) {
       console.log('No such document!');
       return response.send('Not Found')
     } 
       console.log(doc.data());
       return response.status(200).send(JSON.stringify(doc.data()));
   })
   .catch(err => {
     return response.send('Error getting document', err);
   });
});

exports.getDataDocumentUsuarios = functions.https.onRequest( async (request, response) => {
response.set('Access-Control-Allow-Origin', '*');
response.set('Access-Control-Allow-Credentials', 'true'); // vital
 const snapshot =  await admin.firestore().collection('usuarios').get();
 let users=[];
    try {
       if (snapshot.empty) {
       return response.send('Not Found');
     }else{
       snapshot.forEach(doc => {
        let id = doc.id;
        let datadocument = doc.data();
        users.push(id,datadocument);
     });
     return response.status(200).send(JSON.stringify(users));
    }
    } catch (err) {
         return response.send('Error getting document', err);
      
    }
});

