<template>
<div class="my-5">
    <Carga v-if="usuarioCarga" />

    <template v-else>

        <BaseH1>Estas hablando con {{ user.nombre }} </BaseH1>


        <h2 class="sr-only">Mensajes</h2>
        <div class="flex flex-col items-start min-h-[400px] p-4 border border-violet-100 rounded mb-4">

            <Carga v-if="usuarioCarga" />
            <template v-else>
                <div v-for="mensaje in mensajes" :key="mensaje.id" class=" max-w[70%] p-2 rounded mb-2"
                    :class="{ 'bg-violet-100': mensaje.idRemitente !== usuarioAuth.id, 'bg-violet-300': mensaje.idRemitente === usuarioAuth.id, 'self-end': mensaje.idRemitente === usuarioAuth.id }">

                    <div>{{ mensaje.mensaje }}</div>
                    <div>{{ dateToString(mensaje.creado) || 'Enviando...' }}</div>

                </div>

            </template>

        </div>

        <h2 class="sr-only">Enviar mensajes</h2>
        <form class="flex gap-2" action="" @submit.prevent="hEnviarMensaje">

            <label for="mensaje" class="sr-only">Mensaje</label>

            <BaseTextArea id="mensaje" class="w-11/12" v-model="nuevoMensaje.mensaje" />

            <BaseButton class="w-1/12">Enviar</BaseButton>

        </form>

    </template>
</div>
</template>


<script>
import BaseButton from '../components/BaseButton.vue';
import BaseTextArea from '../components/BaseTextArea.vue';
import Carga from '../components/Carga.vue';
import { enviarMensajePrivado, GuardarMensajePrivado } from '../service/chatPrivado.js';
import { getUserById } from '../service/usuarios.js';
import { subscribeToAuth } from '../service/auth.js';
import { dateToString } from "../helpers/fecha.js";
import BaseH1 from '../components/BaseH1.vue';

export default {
    name: 'ChatPrivado',
    data() {
        return {
            usuarioCarga: true,
            user: {

                id: null,
                email: null

            },
            usuarioAuth: {

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

        };
    },

    methods: {

        hEnviarMensaje() {

            enviarMensajePrivado({ idRemitente: this.usuarioAuth.id, idReceptor: this.user.id, mensaje: this.nuevoMensaje.mensaje });

            this.nuevoMensaje.mensaje = '';

        },
        dateToString(date) {

            return dateToString(date);



        },

    },
    async mounted() {
        this.usuarioCarga = true;
        this.user = await getUserById(this.$route.params.id);
        this.chatUnsuscribe = subscribeToAuth(nuevoUsuario => this.usuarioAuth = nuevoUsuario);
        this.usuarioCarga = false;
        this.cargaMensajes = true;
        this.mensajesUnsuscribe = await GuardarMensajePrivado(
            {

                idRemitente: this.usuarioAuth.id,
                idReceptor: this.user.id

            },
            nuevoMensaje => this.mensajes = nuevoMensaje);
        this.cargaMensajes = false;
    },
    unmounted() {

        this.chatUnsuscribe();
        this.mensajesUnsuscribe();

    },

    components: { Carga, BaseButton, BaseTextArea, BaseH1 }

}
</script>


<style></style>

