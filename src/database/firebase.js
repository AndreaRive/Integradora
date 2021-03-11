//Importamos todos los servicios de firebase
/*
1.- firestore
2.- auth
3.- storage
4.- hosting
*/
import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBKnPzATZ2Jku0F02lw2iXpc8i9b3NrVwM',
  authDomain: 'rowait-96ed3.firebaseapp.com',
  projectId: 'rowait-96ed3',
  storageBucket: 'rowait-96ed3.appspot.com',
  messagingSenderId: '185582525332',
  appId: '1:185582525332:web:8cd288de0a064ef27d4d81',
  measurementId: 'G-5NSG039QJ2',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/*
Retornar los servicios de firebase 
*/

const db = firebase.firestore();
const auth = firebase.auth();

/* 
Generamos una librería reutilizable
*/
export default {
  db,
  auth,
};
