import { dateToString } from '../helpers/fecha.js';
import { db } from './firebase.js'
import { addDoc, collection, onSnapshot, serverTimestamp, query, orderBy } from "firebase/firestore";



const refChat = collection(db, 'chat');



export function chatGuardarMsj(data) {

    return addDoc(refChat, {
        ...data,
        creado: serverTimestamp()
    });

}



export function chatImprimirMsj(callback) {

    const q = query(refChat, orderBy('creado'));

    return  onSnapshot(q, snapshot => {
        const data = snapshot.docs.map(doc => {

            return {
                id: doc.id,
                idUsuario: doc.data().idUsuario,
                nombreUsuario: doc.data().nombreUsuario,
                usuario: doc.data().usuario,
                mensaje: doc.data().mensaje,
                creado: doc.data().creado?.toDate()

            };

        });

        callback(data);

    });

}