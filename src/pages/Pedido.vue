<template >
    <div class="mt-5">


        <BaseH1 class="text-2xl font-bold pb-4 text">Crea tu pedido</BaseH1>

        <div id="salida">

            <BaseH2 class="text-center m-2 p-2 underline">Productos</BaseH2>
            <div>
                <template v-if="!isLoading">
                    <div class="grid grid-cols-3 gap-2">
                        <div class="bg-green-100 m-2 p-2 rounded-lg" v-for="producto in productos" :key="producto.id">

                            <BaseP class="text-center font-extrabold">Nombre: {{ producto.nombre }}</BaseP>
                            <BaseP class="text-center font-light h-20">Descripción: {{ producto.descripcion }}</BaseP>
                            <BaseP class="text-green-600 font-bold text-right">Precio: {{ producto.precio }}</BaseP>


                            <BaseLabel for="cantidad" class="block  mt-4 mb-2">Selecciona cantidad</BaseLabel>
                            <select v-model="selectedQuantities[producto.id].cantidad" id="cantidad"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-400 focus:border-violet-400 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-violet-400 dark:focus:border-violet-400">
                                <option selected>0</option>

                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>


                        </div>

                    </div>

                </template>
                <template v-else>
                    <Carga />
                </template>

                <button class="text-violet-700 border border-indigo-600 rounded bg-green-200 p-1 m-2  mt-4 mb-5"
                    @click="calcularPrecioTotal">Calcular Precio Total</button>


                <p class="my-3">TOTAL: ${{ totalPrecio }}</p>
                <p class="my-3 text-red-600 text-sm font-bold">{{ errorPrecio }}</p>


                <p></p>

                <BaseButton @click="handleSubmit()" :cargando="isLoading">Crear pedido</BaseButton>

                <router-link :to="`/usuario/u5yIrSkVZ7Ndj6ya0zfmnDY6eTC3/chat`"
                    class="text-violet-700 underline block mt-5 text-right font-bold ">¿Tenes dudas antes de pedir?, habla
                    con nosotos
                    aquí.</router-link>
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
import { ImprimirProductos } from "../service/productos";
import { CrearPedidos } from "../service/pedidos";
import { enviarMensajePrivado } from "../service/chatPrivado";
import BaseP from "../components/BaseP.vue";
import BaseH1 from "../components/BaseH1.vue";
import BaseH2 from "../components/BaseH2.vue";

export default {
    name: "pedido",
    components: { BaseButton, BaseLabel, BaseInput, BaseTextArea, Carga, BaseP, BaseH1, BaseH2 },
    data() {

        return {
            isLoading: true,
            productos: [],

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
        calcularPrecioTotal() {
            console.log("entre");

            this.totalPrecio = 0;
            for (const producto of this.productos) {
                const cantidad = this.selectedQuantities[producto.id].cantidad || 0;
                this.totalPrecio += producto.precio * cantidad;
            }

            this.errorPrecio = ""
        },




        async handleSubmit() {
            if (this.totalPrecio !== 0) {
                try {
                    await CrearPedidos({ idUsuario: this.user.id, nombreUsuario: this.user.nombre, localidad: this.user.localidad, calle: this.user.calle, altura: this.user.altura, pedido: this.selectedQuantities, total: this.totalPrecio });

                    let mensaje = this.ContenidoComoTexto();

                    console.log(mensaje);

                    enviarMensajePrivado({ idRemitente: this.user.id, idReceptor: "u5yIrSkVZ7Ndj6ya0zfmnDY6eTC3", mensaje: mensaje });

                    this.$router.push('/usuario/u5yIrSkVZ7Ndj6ya0zfmnDY6eTC3/chat');


                } catch (error) {

                }
                this.registerCarga = false;
            } else { this.errorPrecio = "Elija las cantidades y calcule el total antes de crear el pedido." }

        },

        ContenidoComoTexto() {
            let contenidoComoTexto = "Hola!!!, mi pedido seria:\n\n";

            for (const productoId in this.selectedQuantities) {
                if (this.selectedQuantities.hasOwnProperty(productoId)) {
                    const producto = this.selectedQuantities[productoId];
                    if (producto.cantidad > 0) {
                        contenidoComoTexto += `- ${producto.nombre}: ${producto.cantidad}\n`;
                    }
                }

            }
            contenidoComoTexto += `\n- Usuario: ${this.user.email}\n- Nombre: ${this.user.nombre}\n- Calle: ${this.user.calle}\n- Altura: ${this.user.altura}\n- Localidad: ${this.user.localidad}\n\n- Total : $${this.totalPrecio}  `


            return contenidoComoTexto;
        },


    },


    mounted() {
        this.isLoading = true;
        this.productosUnsuscribe = ImprimirProductos(productos => {
            this.productos = productos;
            this.isLoading = false;


            this.selectedQuantities = {};
            for (const producto of productos) {
                this.selectedQuantities[producto.id] = {
                    cantidad: 0,
                    nombre: producto.nombre,
                };
            }
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




