<template >
    <div class="mt-5">


        <BaseH1 class="text-2xl font-bold pb-4 text">Lista de precios</BaseH1>

        <div id="salida">

            <BaseH2 class="text-center m-2 p-2 underline">Productos</BaseH2>
            <div>
                <template v-if="!isLoading">
                    <div class="grid grid-cols-3 gap-2">
                        <div class="bg-green-100 m-2 p-2 rounded-lg" v-for="producto in productos" :key="producto.id">

                            <BaseP class="text-center font-extrabold">Nombre: {{ producto.nombre }}</BaseP>
                            <BaseP class="text-center font-light h-20">Descripción: {{ producto.descripcion }}</BaseP>
                            <BaseP class="text-green-600 font-bold text-right">Precio: {{ producto.precio }}</BaseP>




                        </div>

                    </div>

                </template>
                <template v-else>
                    <Carga />
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

            
            unsuscribe: () => { },
            productosUnsuscribe: () => { },
           


        }



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




