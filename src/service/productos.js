import { db } from './firebase.js'
import { addDoc, collection, onSnapshot, serverTimestamp, query, orderBy, getDoc, doc, setDoc, updateDoc } from "firebase/firestore";

const refProductos = collection(db, 'productos');


export function ImprimirProductos(callback) {

    const q = query(refProductos, orderBy('nombre'));

    return  onSnapshot(q, snapshot => {
        const data = snapshot.docs.map(doc => {

            return {
                id: doc.id,
                nombre: doc.data().nombre,
                precio: doc.data().precio,
                descripcion: doc.data().descripcion
                
            };

        });

        callback(data);

    });

}

export async function getProductosById(id) 
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

export async function CrearProducto(data) 
{
      
    return addDoc(refProductos, {...data});

}

export async function EditarProducto(id, data) 
{
      
    return updateDoc(doc(db, `productos/${id}`), {...data});

}


