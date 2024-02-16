<template>
    <header class="flex gap-8 p-2 items-center bg-lime-200 mb-10 shadow-lg">
        <!-- --------- -->

        <nav class="shadow-xl bg-white dark:bg-lime-200 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <img class="max-h-10" src="../public/imgs/ServicePowerLogo.png" alt="power service logo">

                <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul
                        class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-lime-200 md:dark:bg-lime-200 dark:border-lime-700">
                        <template v-if="user.rol !== 'administrador'">

                            <li
                                class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">
                                <router-link to="/">Bienvenidos</router-link>
                            </li>
                            <li
                                class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">
                                <router-link to="/about">Sobre nosotros</router-link>
                            </li>
                        </template>
                        <template v-if="user.id === null">
                            <li
                                class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">
                                <router-link to="/pricing">Precios</router-link>
                            </li>
                            <li
                                class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">
                                <router-link to="/register">Registrate</router-link>
                            </li>
                            <li
                                class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">
                                <router-link to="/login">Iniciar sesión</router-link>
                            </li>
                        </template>

                        <template v-else-if="user.rol == 'usuario'" class="">
                            <li
                                class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">
                                <router-link to="/chat">Deja tu reseña</router-link>
                            </li>
                            <li
                                class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">
                                <router-link to="/pedidos">Hacenos tu pedido</router-link>
                            </li>
                            <li
                                class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">
                                <form action="#" @submit.prevent="logOuting">
                                    <button type="submit">Cerrar sesión</button>
                                </form>
                            </li>
                            <li
                                class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">
                                <router-link to="/perfil" class="font-bold text-xs text-violet-700 shadow-sm font">{{
                                    user.email }}</router-link>
                            </li>
                        </template>

                        <template v-else-if="user.rol == 'administrador'" class="">
                            <li
                                class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">
                                <router-link to="/adminProductos">Admin. Productos</router-link>
                            </li>
                            <li
                                class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">
                                <router-link to="/ordenes">Ordenes</router-link>
                            </li>
                            <li
                                class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">
                                <form action="#" @submit.prevent="logOuting">
                                    <button type="submit">Cerrar sesión</button>
                                </form>
                            </li>
                            <li
                                class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">
                                <router-link to="/perfil" class="font-bold text-xs text-violet-700 shadow-sm font">{{
                                    user.email }}</router-link>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
        </nav>



    </header>
    <div class="rounded-lg container m-auto bg-indigo-200 p-2 shadow-lg ">

        <router-view></router-view>

    </div>

    <footer class="flex justify-center items-center h-[50px] bg-lime-200 shadow-lg mt-6 sticky top-[100vh] ">

        <a href="http://www.instagram.com"><img class="max-h-8 mx-5" src="../public/imgs/ig.png" alt="IG"></a>
        <p class="text-sm inline-block">Piñeiro David &copy; 2023</p>
        <a href="http://www.facebook.com"><img class="max-h-8 mx-5" src="../public/imgs/fb.png" alt="IG"></a>

    </footer>
</template>

<script>
import Chat from './pages/Chat.vue';
import { subscribeToAuth, logOut } from './service/auth.js';


export default {
    name: "App",
    data() {

        return {

            user: {

                id: null,
                email: null,
                rol: null,
                calle: null,
                altura: null,
                localidad: null,
                nombre: null

            }
        }
    },
    methods: {

        logOuting() {

            logOut();
            this.$router.push('/login');
        }


    },



    mounted() {

        subscribeToAuth(user => {

            this.user = { ...user }

        });

    },
    components: { Chat }
}
</script>

<style></style>


