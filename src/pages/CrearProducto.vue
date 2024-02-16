<template>
    <div class="max-w-lg mx-auto py-8">
    <BaseH1 class="text-center underline">Crear producto <span class="text-indigo-900 font-bold">{{ this.producto.nombre
    }}</span></BaseH1>

    <form action="#" @submit.prevent="handleSubmit">
        <template v-if="productoCarga">
            <Carga />
        </template>
        <template v-else>
            <div class="mb-2">
                <BaseLabel for="nombre">Nombre</BaseLabel>
                <BaseInput type="nombre" id="nombre" v-model="producto.nombre" :disabled="productoCarga" />

            </div>

            <div class="mb-2">
                <BaseLabel for="calle">Precio</BaseLabel>
                <BaseInput type="calle" id="calle" v-model="producto.precio" :disabled="productoCarga" />

            </div>

            <div class="mb-2">
                <BaseLabel for="altura">Descripción</BaseLabel>
                <BaseInput type="altura" id="altura" v-model="producto.descripcion" :disabled="productoCarga" />

            </div>



            <BaseButton :cargando="productoCarga">Crear</BaseButton>
        </template>
    </form>
</div>
</template>
<script>


import BaseButton from "../components/BaseButton.vue";
import BaseLabel from "../components/BaseLabel.vue";
import BaseInput from "../components/BaseInput.vue";
import BaseTextArea from "../components/BaseTextArea.vue";
import Carga from "../components/Carga.vue";
import { subscribeToAuth } from "./../service/auth.js";
import { CrearProducto } from "../service/productos.js";
import BaseH1 from "../components/BaseH1.vue";



export default {
    name: "perfilEditar",
    components: { BaseButton, BaseLabel, BaseInput, BaseTextArea, Carga, BaseH1 },
    data() {

        return {

            productoCarga: true,

            user: {

                id: null,
                email: null,
                nombre: null,
                localidad: null,
                calle: null,
                altura: null,
                rol: null

            },
            producto: {

                id: null,
                nombre: null,
                precio: null,
                descripcion: null,

            },

            unsuscribe: () => { },
            productosUnsuscribe: () => { },

        }

    },

    methods: {

        async handleSubmit() {

            try {
                await CrearProducto( { nombre: this.producto.nombre, precio: this.producto.precio, descripcion: this.producto.descripcion });

                this.$router.push('/adminProductos');


            } catch (error) {

            }
            this.registerCarga = false;


        }



    },

    async mounted() {

        this.productoCarga = true;
       
        subscribeToAuth(user => this.user = { ...user });

        this.productoCarga = false;

    },

}

</script>
<style ></style>