<template>
    <BaseH1 class="text-2xl font-bold my-5 pb-4 text-center">Deja una reseña de nuestro productos!!</BaseH1>

    <div class=" justify-between gap-5 border rounded-lg m-5">

        <div id="salida">

            <BaseH2 class="text-xl text-center m-2 p-2 underline">Reseñas de nuestros clientes</BaseH2>
            <div class="mx-8">
                <div class="grid grid-cols-3 gap-2">
                    <template v-if="!isLoading">

                        <div class="bg-green-100 m-2 p-2 rounded-lg shadow-xl " v-for="mensaje in mensajes"
                            :key="mensaje.id">

                            <div class="text-center text-violet-700 underline font-extrabold">{{mensaje.nombreUsuario }}</div>
                            <div class="text-center py-5">{{ mensaje.mensaje }}</div>
                            <div class="text-right text-xs  text-gray-400">{{ dateToString(mensaje.creado) }}</div>

                        </div>

                    </template>


                    <template v-else>
                        <Carga />
                    </template>
                </div>
            </div>
        </div>

        <form action="#" id="formulario-chat" @submit.prevent="enviarMensaje">

            <div class="bg-indigo-50 m-2 p-2 rounded-lg mx-10 mt-5 shadow-xl">

                <BaseLabel for="mensaje">Tu reseña</BaseLabel>
                <BaseTextArea id="mensaje" v-model="nuevoMensaje.mensaje"></BaseTextArea>

            </div>
            <div class="mx-10">
                <BaseButton class="my-5" :cargando="IsSaving">Enviar</BaseButton>
            </div>

        </form>



    </div>
</template>

<script>

import { chatImprimirMsj, chatGuardarMsj } from "../service/chat.js";
import { dateToString } from "../helpers/fecha.js";
import BaseButton from "../components/BaseButton.vue";
import BaseLabel from "../components/BaseLabel.vue";
import BaseInput from "../components/BaseInput.vue";
import BaseTextArea from "../components/BaseTextArea.vue";
import Carga from "../components/Carga.vue";
import { subscribeToAuth } from "./../service/auth.js";
import BaseH1 from "../components/BaseH1.vue";
import BaseH2 from "../components/BaseH2.vue";

export default {
    name: "Chat",
    components: { BaseButton, BaseLabel, BaseInput, BaseTextArea, Carga, BaseH1, BaseH2 },
    data() {

        return {
            isLoading: true,
            IsSaving: false,
            mensajes: [],
            nuevoMensaje: {

                mensaje: ''

            },

            user: {

                id: null,
                email: null

            },
            unsuscribe: () => { },
            chatUnsuscribe: () => { },
        }

    },

    methods: {
        enviarMensaje() {

            if (this.IsSaving) return;
            this.IsSaving = true;
            chatGuardarMsj({
                idUsuario: this.user.id,
                nombreUsuario: this.user.nombre,
                usuario: this.user.email,
                mensaje: this.nuevoMensaje.mensaje

            })
                .then(() => {

                    this.nuevoMensaje.mensaje = '';
                    this.IsSaving = false;

                });
        },
        dateToString(date) {

            return dateToString(date);



        },
    },

    mounted() {
        this.isLoading = true;
        this.chatUnsuscribe = chatImprimirMsj(mensajes => {
            this.mensajes = mensajes;
            this.isLoading = false;

        });

        this.unsuscribe = subscribeToAuth(newUser => this.user = { ...newUser });

    },
    unmounted() {
        this.chatUnsuscribe();
        this.unsuscribe();

    }
}
</script>

<style></style>