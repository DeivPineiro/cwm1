import { db } from './firebase.js'
import { addDoc, collection, onSnapshot, serverTimestamp, query, orderBy, getDoc, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

const refPedidos = collection(db, 'pedidos');


export function ImprimirPedidos(callback) {

    const q = query(refPedidos, orderBy('creado'));

    return  onSnapshot(q, snapshot => {
        const data = snapshot.docs.map(doc => {

            return {
                id: doc.id,
                idUsuario: doc.data().idUsuario,
                nombre: doc.data().nombreUsuario,
                calle: doc.data().calle,
                altura: doc.data().altura,
                localidad: doc.data().localidad,
                creado: doc.data().creado,
                pedido: doc.data().pedido,
                total: doc.data().total
                
            };

        });

        callback(data);

    });

}

export async function getPedidossById(id) 
{
   
    const refProducto = doc(db, `productos/${id}`);
    const docSnapshot = await getDoc(refProducto);

    return {

        id: docSnapshot.id,
        nombre: docSnapshot.data().nombre,
        precio: docSnapshot.data().precio,
        descripcion: docSnapshot.data().descripcion,
        

    }
}

export async function CrearPedidos(data) 
{
      
    return addDoc(refPedidos, {...data, creado: serverTimestamp()});

}


export async function BorrarPedidos(id) 
{
    const RefPedidoBorrar = doc(db, 'pedidos', id);
    await deleteDoc(RefPedidoBorrar);

}





