import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from './firebase.js';
import { CrearPerfilUsuario, getUserById } from './usuarios.js';
 
let userData = {
    id: null,
    email: null,
    rol: null    
}

let observers = [];
if (localStorage.getItem('user')) {
    userData = JSON.parse(localStorage.getItem('user'))   
}

onAuthStateChanged(auth, async user => {

    if (user) {                  
        
        setUserData({ id: user.uid, email: user.email});
        localStorage.setItem('user', JSON.stringify(userData));
        const userInfo = await getUserById(user.uid);
        console.log(userInfo);
        setUserData({rol: userInfo.rol, calle: userInfo.calle, altura: userInfo.altura, localidad: userInfo.localidad, nombre: userInfo.nombre})

    } else {
        clearUserData();
        localStorage.removeItem('user');
    }
});



export async function registrar({ email, password, rol, calle, altura, localidad, nombre }) {
    try {
        const credencialesUsuario = await createUserWithEmailAndPassword(auth, email, password);
        CrearPerfilUsuario(credencialesUsuario.user.uid, {email, rol, calle, altura, localidad, nombre});
    return {
        id: credencialesUsuario.user.uid,
        email: credencialesUsuario.user.email,
        rol: 'Usuario',     
    }

    } catch (error) {
        return {
            code: error.code,
            message: error.message
        }

    }

}
/**
 * 
 * @param {email: string, password: string} user 
 *  
 * @return {Promise}
 */
export function login({ email, password }) {

    return signInWithEmailAndPassword(auth, email, password)
        .then(credencialesUsuario => {

            return { ...userData };

        })
        .catch(error => {
            return {
                code: error.code,
                message: error.message
            }
        });
}

export function logOut() {
    return signOut(auth);

}

//observers
//debugger;
export function subscribeToAuth(observer) {

    observers.push(observer);

    notify(observer);

    return () => {

        observers = observers.filter(obs => obs !== observer);

    }

}

function notifyAll() {

    observers.forEach(observer => notify(observer));

}

function notify(observer) {

    observer({ ...userData });

}

function setUserData(newData) {

    userData = { ...userData, ...newData};
    notifyAll();


}

//data control

function clearUserData() {

    setUserData({ id: null, email: null, rol: null });

}

export function getUserData() {

    return { ...userData };

}

