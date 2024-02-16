<template >
    <div class="my-5">


        <BaseH1 class="text-2xl font-bold pb-4">Lista de ordenes</BaseH1>

        <div id="salida">

            <div>
                <template v-if="!isLoading">
                    <div class="grid grid-cols-3 gap-2">
                        <template v-if="pedidos.length == 0">
                            <p class="font-bold">No hay pedidos</p>
                        </template>
                        <template v-else>                          
                        
                        <div class="bg-green-100 m-2 p-2 mb-4 rounded-lg" v-for="pedido in pedidos" :key="pedido.id">

                            <div class="text-center text-violet-600 font-bold mb-5 underline">Datos del pedido</div>

                            <div v-for="p in pedido.pedido">
                                <div v-if="p.cantidad !== 0">
                                    <hr>
                                    <div>Nombre: {{ p.nombre }}</div>
                                    <div>Cantidad: <span class="text-red-500 font-bold">{{ p.cantidad }}</span></div>
                                    <hr>
                                </div>
                            </div>
                            <div class="text-green-500 font-bold text-right">Total: ${{ pedido.total }}</div>

                            <div class="text-center text-violet-600 font-bold mb-5 underline ">Datos del usuario</div>
                            <div>Nombre: {{ pedido.nombre }}</div>
                            <div>Calle: {{ pedido.calle }}</div>
                            <div>Altura: {{ pedido.altura }}</div>
                            <div>Localidad: {{ pedido.localidad }}</div>
                            <div>Fecha de pedido: {{ dateToString(pedido.creado)}}</div>



                            <div class="grid grid-cols-2 gap-2">
                                <router-link :to="`/usuario/${pedido.idUsuario}/chat`"
                                    class="text-center text-green-700 font-bold border border-indigo-600 rounded bg-green-200 p-1 m-2  mt-8 mb-5 ">Confirmar
                                    orden con usuario</router-link>

                                <button
                                    class="text-center text-red-700 font-bold border border-indigo-600 rounded bg-red-200 p-1 m-2  mt-8 mb-5"
                                    @click="handleSubmit(pedido.id)">Quitar orden de la lista</button>


                            </div>
                        </div>
                    </template>
                    </div>

                </template>

            </div>
        </div>




    </div>
</template>
<script>


import BaseButton from "../components/BaseButton.vue";
import BaseLabel from "../components/BaseLabel.vue";
import BaseInput from "../components/BaseInput.vue";
import BaseTextArea from "../components/BaseTextArea.vue";
import Carga from "../components/Carga.vue";
import { subscribeToAuth } from "./../service/auth.js";
import { BorrarPedidos, ImprimirPedidos } from "../service/pedidos";
import { dateToString } from "../helpers/fecha.js";
import BaseH1 from "../components/BaseH1.vue";


export default {
    name: "pedido",
    components: { BaseButton, BaseLabel, BaseInput, BaseTextArea, Carga, BaseH1 },
    data() {

        return {
            isLoading: true,
            pedidos: [],

            user: {

                id: null,
                email: null,
                nombre: null,
                localidad: null,
                calle: null,
                altura: null,
                rol: null

            },
            unsuscribe: () => { },
            productosUnsuscribe: () => { },
            selectedQuantities: {},
            totalPrecio: 0,
            errorPrecio: ''


        }



    },


    methods: {

        handleSubmit(id) {

            BorrarPedidos(id);


        },

        dateToString(date) {

            return dateToString(date);

        },

    },


    mounted() {
        this.isLoading = true;
        this.productosUnsuscribe = ImprimirPedidos(pedidos => {
            this.pedidos = pedidos;
            this.isLoading = false;

        });


        this.unsuscribe = subscribeToAuth(newUser => this.user = { ...newUser });

    },
    unmounted() {
        this.productosUnsuscribe();
        this.unsuscribe();

    }
}


</script>
<style ></style>




