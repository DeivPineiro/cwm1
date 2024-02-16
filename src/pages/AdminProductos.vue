<template >
   
        <div class="my-5">


            <BaseH1 class="text-2xl font-bold pb-4">Admin Productos</BaseH1>

            <div id="salida">

                <BaseH2 class="text-xl text-center m-2 p-2 underline">Productos</BaseH2>
                <BaseP class="italic font-thin text-green-700 mx-4">*Click en el nombre para editar</BaseP>
                <div>
                    <template v-if="!isLoading">
                        <div class="grid grid-cols-3 gap-2">

                        <div class="bg-green-100 m-2 p-2 rounded-lg" v-for="producto in productos" :key="producto.id">

                            <div class="font-bold pb-2"><router-link :to="`/productos/${producto.id}/editar`"
                                    class="text-violet-700 underline">Nombre: {{ producto.nombre }}</router-link></div>
                                    <BaseP class="text-center font-light h-20">Descripcion: {{ producto.descripcion }}</BaseP>
                            <BaseP class="text-green-600 font-bold text-right">Precio: {{ producto.precio }}</BaseP>

                        </div>
                    </div>
                    </template>
                    
                    <template v-else>
                        <Carga />
                    </template>
                    <div class="my-2">
                    <router-link :to="`/CrearProducto`"
                        class="text-violet-700 border border-indigo-600 rounded bg-green-200 p-1 m-2 ">Crear
                        Producto</router-link>
                    </div>
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
import BaseH1 from "../components/BaseH1.vue";
import BaseH2 from "../components/BaseH2.vue";
import BaseP from "../components/BaseP.vue";

export default {
    name: "adminProductos",
    components: { BaseButton, BaseLabel, BaseInput, BaseTextArea, Carga, BaseH1 , BaseH2 , BaseP  },
    data() {

        return {
            isLoading: true,
            productos: [],
            nuevoProducto: {
                id: '',
                nombre: '',
                precio: '',
                descripcion: ''

            },

            user: {

                id: null,
                email: null

            },
            unsuscribe: () => { },
            productosUnsuscribe: () => { },
        }

    },

    methods: {

    },

    mounted() {
        this.isLoading = true;
        this.productosUnsuscribe = ImprimirProductos(productos => {
            this.productos = productos;
            this.isLoading = false;
            console.log(this.productosUnsuscribe);
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