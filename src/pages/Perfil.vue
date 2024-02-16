<template>
    <div class="pt-5">
        <BaseH1 class="font-bold text-center underline">{{ this.user.email }}</BaseH1>


        <template v-if="perfilCarga">
            <Carga />
        </template>
        <template v-else class="flex flex-wrap">
            <div class="flex ">
                <div class=" rounded-lg overflow-hidden shadow-lg bg-lime-100 p-5 text-center m-5 w-2/5 ">

                    <BaseH2 class="underline"> Tus datos</BaseH2>

                    <div class="mb-2 ">
                        <BaseLabel for="nombre">Nombre / Apodo </BaseLabel><span class="text-indigo-900 font-bold ">{{
                            user.nombre
                        }}</span>


                    </div>

                    <div class="mb-2">

                        <BaseLabel for="nombre">Calle </BaseLabel><span class="text-indigo-900 font-bold ">{{ user.calle
                        }}</span>

                    </div>

                    <div class="mb-2">
                        <BaseLabel for="nombre">Altura </BaseLabel><span class="text-indigo-900 font-bold ">{{ user.altura
                        }}</span>

                    </div>

                    <div class="mb-2 ">
                        <BaseLabel for="nombre">Localidad </BaseLabel><span class="text-indigo-900 font-bold ">{{
                            user.localidad
                        }}</span>

                    </div>

                    <router-link :to="`/perfilEditar`"
                        class="text-violet-700 border border-indigo-600 rounded bg-green-200 px-10 py-1 m-2 shadow-lg ">Editar</router-link>

                </div>
                <div class=" rounded-lg overflow-hidden shadow-lg bg-lime-100 p-5 text-center m-5 w-screen">
                    <BaseH2 class="underline"> Tus mensajes con nosotros</BaseH2>
                    <div class="flex flex-col items-start min-h-[400px] p-4 border border-violet-100 rounded mb-4">

                        <Carga v-if="usuarioCarga" />
                        <template v-else>
                            <template v-if="mensajes.length == 0">
                              <BaseP>Aún no tienes mensajes con nosotros.</BaseP>
                            </template>
                            <template v-else>                               
                            
                            <div v-for="mensaje in mensajes" :key="mensaje.id" class=" max-w[70%] p-2 rounded mb-2"
                    :class="{ 'bg-violet-100': mensaje.idRemitente !== user.id, 'bg-violet-300': mensaje.idRemitente === user.id, 'self-end': mensaje.idRemitente === user.id }">

                                <div>{{ mensaje.mensaje }}</div>
                                <div>{{ dateToString(mensaje.creado)}}</div>

                            </div>
                        </template>
                        </template>

                    </div>

                </div>

            </div>

        </template>


    </div>
</template>
<script>


import BaseButton from "../components/BaseButton.vue";
import BaseLabel from "../components/BaseLabel.vue";
import BaseInput from "../components/BaseInput.vue";
import BaseTextArea from "../components/BaseTextArea.vue";
import Carga from "../components/Carga.vue";
import { subscribeToAuth } from "./../service/auth.js";
import { getUserById} from "../service/usuarios";
import BaseH1 from "../components/BaseH1.vue";
import { GuardarMensajePrivado } from "../service/chatPrivado";
import { dateToString } from "../helpers/fecha";
import BaseH2 from "../components/BaseH2.vue";
import BaseP from "../components/BaseP.vue";



export default {
    name: "perfil",
    components: { BaseButton, BaseLabel, BaseInput, BaseTextArea, Carga, BaseH1, BaseH2, BaseP },
    data() {

        return {
            usuarioCarga: true,
            perfilCarga: false,



            user: {

                id: null,
                email: null,
                nombre: null,
                localidad: null,
                calle: null,
                altura: null,
                rol: null

            },

            usuario: {

                id: null,
                email: null

            },

            chatUnsuscribe: () => { },

            nuevoMensaje: {

                mensaje: ''

            },
            cargaMensajes: true,

            mensajes: [],

            mensajesUnsuscribe: () => { },


        }

    },

    mounted() {



        this.perfilCarga = true;

        subscribeToAuth(user => this.user = { ...user });

        this.perfilCarga = false;

    },



    methods: {
   
        dateToString(date) {

            return dateToString(date);



        },

    },
    async mounted() {
        this.usuarioCarga = true;
        this.usuario = await getUserById("u5yIrSkVZ7Ndj6ya0zfmnDY6eTC3");
        this.chatUnsuscribe = subscribeToAuth(nuevoUsuario => this.user = nuevoUsuario);
        this.usuarioCarga = false;
        this.cargaMensajes = true;
        this.mensajesUnsuscribe = await GuardarMensajePrivado(
            {

                idRemitente: this.user.id,
                idReceptor: this.usuario.id

            },
            nuevoMensaje => this.mensajes = nuevoMensaje);
        this.cargaMensajes = false;
    },
    unmounted() {

        this.chatUnsuscribe();
        this.mensajesUnsuscribe();

    },

}

</script>
<style ></style>


