<template>
    <div class="max-w-lg mx-auto py-8">
    <BaseH1>Editar perfil {{ this.user.nombre }}</BaseH1>

    <form action="#" @submit.prevent="handleSubmit">
        <template v-if="perfilCarga">
        <Carga/>
        </template>
        <template v-else>
        <div class="mb-2">
            <BaseLabel for="nombre">Nombre / Apodo</BaseLabel>
            <BaseInput type="nombre" id="nombre" v-model="user.nombre" :disabled="perfilCarga" />

        </div>

        <div class="mb-2">
            <BaseLabel for="calle">Calle</BaseLabel>
            <BaseInput type="calle" id="calle" v-model="user.calle" :disabled="perfilCarga" />

        </div>

        <div class="mb-2">
            <BaseLabel for="altura">Altura</BaseLabel>
            <BaseInput type="altura" id="altura" v-model="user.altura" :disabled="perfilCarga" />

        </div>

        <div class="mb-2">
            <BaseLabel for="localidad">Localidad</BaseLabel>
            <BaseInput type="localidad" id="localidad" v-model="user.localidad" :disabled="perfilCarga" />

        </div>

        <BaseButton class="my-4" :cargando="perfilCarga">Editar</BaseButton>

        <p class="font-normal italic text-center">*Luego de editar refresca la página para ver los cambios, estamos trabajando en la actualización automática, sepa entender :D</p>

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
import { EditarPerfilUsuario } from "../service/usuarios";
import BaseH1 from "../components/BaseH1.vue";


export default {
    name: "perfilEditar",
    components: { BaseButton, BaseLabel, BaseInput, BaseTextArea, Carga, BaseH1 },
    data() {

        return {

            perfilCarga: true,

            user: {

                id: null,
                email: null,
                nombre: null,
                localidad: null,
                calle: null,
                altura: null,
                rol: null

            },

        }

    },

    methods: {

        async handleSubmit() {

try {
    await EditarPerfilUsuario(this.user.id, {calle: this.user.calle, altura: this.user.altura , localidad: this.user.localidad , nombre: this.user.nombre});

    subscribeToAuth(user => this.user = { ...user });
    
    this.$router.push('/perfil');
   
    
} catch (error) {

}
this.registerCarga = false;


}



    },

    mounted() {

        this.perfilCarga = true;       

        subscribeToAuth(user => this.user = { ...user });

        this.perfilCarga = false;   

    },

}

</script>
<style ></style>