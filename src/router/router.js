import { createRouter, createWebHashHistory } from 'vue-router';
import About from './../pages/About.vue';
import Chat from './../pages/Chat.vue';
import ChatPrivado from './../pages/ChatPrivado.vue';
import Home from './../pages/Home.vue';
import Pricing from './../pages/Pricing.vue';
import Login from './../pages/Login.vue';
import Register from './../pages/Register.vue';
import Perfil from './../pages/Perfil.vue';
import Pedido from './../pages/Pedido.vue';
import AdminProductos from './../pages/AdminProductos.vue';
import Productos from './../pages/Productos.vue';
import CrearProductos from './../pages/CrearProducto.vue';
import PerfilEditar from './../pages/PerfilEditar.vue';

import Ordenes from './../pages/Ordenes.vue';
import { subscribeToAuth } from '../service/auth';

const routes = [

    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/chat', component: Chat, meta:{Auth: true}},   
    { path: '/pricing', component: Pricing },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/perfil', component: Perfil, meta:{Auth: true}},
    { path: '/adminProductos', component: AdminProductos, meta:{Auth: true}},
    { path: '/ordenes', component: Ordenes, meta:{Auth: true}},
    { path: '/productos/:id/editar', component: Productos, meta:{Auth: true}},
    { path: '/crearProducto', component: CrearProductos, meta:{Auth: true}},
    { path: '/perfilEditar', component: PerfilEditar, meta:{Auth: true}},    
    { path: '/pedidos', component: Pedido, meta:{Auth: true}},
    { path: '/usuario/:id/chat', component: ChatPrivado, meta:{Auth: true}},

];



const router = createRouter({
   
    history: createWebHashHistory(),
    routes,
});

let user = {

    id: null,
    email: null,
    rol: null,

}

subscribeToAuth(newUser => user = newUser);

router.beforeEach((to, from)=>{

    if(user.id === null && to.meta.Auth){

        return '/login';
        
    }
});

export default router;