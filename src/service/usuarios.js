import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

/**
 * 
 * @param {string} id 
 * @returns {Promise<{id: string, email: string}>}
 */
export async function getUserById(id) 
{
   
    const refUsuario = doc(db, `usuarios/${id}`);
    const docSnapshot = await getDoc(refUsuario);

    return {

        id: docSnapshot.id,
        email: docSnapshot.data().email,
        rol: docSnapshot.data().rol,
        calle: docSnapshot.data().calle,
        altura: docSnapshot.data().altura,
        nombre: docSnapshot.data().nombre,
        localidad: docSnapshot.data().localidad

    }
}

export async function getUserdata(id) 
{
   
    const refUsuario = doc(db, `usuarios/${id}`);
    const docSnapshot = await getDoc(refUsuario);

    return {
       
        calle: docSnapshot.data().calle,
        altura: docSnapshot.data().altura,
        nombre: docSnapshot.data().nombre,
        localidad: docSnapshot.data().localidad
    }
}

export async function CrearPerfilUsuario(id, data) 
{
      
    return setDoc(doc(db, `usuarios/${id}`), {...data});

}

export async function EditarPerfilUsuario(id, data) 
{
      
    return updateDoc(doc(db, `usuarios/${id}`), {...data});

}