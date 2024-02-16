import { addDoc, collection, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore"
import { db } from "./firebase.js"

const chatPrivadoCache = {};

export async function enviarMensajePrivado({ idRemitente, idReceptor, mensaje }) {

    const chatPrivadoDoc = await getChatPrivadoDoc({ idRemitente, idReceptor });

    const refMensaje = collection(db, `chats-privados/${chatPrivadoDoc.id}/mensajes`);

    await addDoc(refMensaje, {

        idRemitente,
        mensaje,
        creado: serverTimestamp()

    });

    return true;

}


export async function GuardarMensajePrivado({ idRemitente, idReceptor}, callback) {

    const chatPrivadoDoc = await getChatPrivadoDoc({ idRemitente, idReceptor });

    const refMensaje = collection(db, `chats-privados/${chatPrivadoDoc.id}/mensajes`);

    return onSnapshot(query(refMensaje, orderBy('creado')), snapshot => {

        const mensajes = snapshot.docs.map(doc => {

            return {

                id: doc.id,
                idRemitente: doc.data().idRemitente,
                mensaje: doc.data().mensaje,
                creado: doc.data().creado?.toDate()

            }

        });

        callback(mensajes);

    });

}

async function getChatPrivadoDoc({ idRemitente, idReceptor }) {

    const refCache = getDesdeCache({ idRemitente, idReceptor });
    if(refCache) return refCache;

    const refChatPrivado = collection(db, 'chats-privados');

    const snapshot = await getDocs(query(refChatPrivado, where('users', '==', { [idRemitente]: true, [idReceptor]: true }), limit(1)));

    let chatPrivadoDoc;

    if (snapshot.empty) {

        chatPrivadoDoc = await addDoc(refChatPrivado, {

            users: {

                [idRemitente]: true,
                [idReceptor]: true,

            }
        });
    } else {

        chatPrivadoDoc = snapshot.docs[0];

    }

    agregarAlCache({ idRemitente, idReceptor }, chatPrivadoDoc)

    return chatPrivadoDoc;


}

function agregarAlCache({ idRemitente, idReceptor }, value){
    
    const key = idRemitente + idReceptor ;
    chatPrivadoCache[key] = value;

}

function getDesdeCache({ idRemitente, idReceptor }, value){

    const key = idRemitente + idReceptor ;
    return chatPrivadoCache[key] = value || null;

}