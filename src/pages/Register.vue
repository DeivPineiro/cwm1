<template >
    <div class="max-w-lg mx-auto py-8">
    <BaseH1 class="text-center mb-8 ">Registrate</BaseH1>

    <form action="#" @submit.prevent="handleSubmit">

        <div class="mb-2">
            <BaseLabel for="email">Email</BaseLabel>
            <BaseInput type="email" id="email" v-model="newUser.email" :disabled="registerCarga" />


        </div>
        <div class="mb-2">
            <BaseLabel for="password">Contraseña</BaseLabel>
            <BaseInput type="password" id="password" v-model="newUser.password" :disabled="registerCarga"/>

        </div>

        <div class="mb-2">
            <BaseLabel for="calle">Calle</BaseLabel>
            <BaseInput type="calle" id="calle" v-model="newUser.calle" :disabled="registerCarga"/>

        </div>

        <div class="mb-2">
            <BaseLabel for="altura">Altura</BaseLabel>
            <BaseInput type="altura" id="altura" v-model="newUser.altura" :disabled="registerCarga"/>

        </div>

        <div class="mb-2">
            <BaseLabel for="localidad">Localidad</BaseLabel>
            <BaseInput type="localidad" id="localidad" v-model="newUser.localidad" :disabled="registerCarga"/>

        </div>

        <div class="mb-2">
            <BaseLabel for="nombre">Nombre / Apodo</BaseLabel>
            <BaseInput type="nombre" id="nombre" v-model="newUser.nombre" :disabled="registerCarga"/>

        </div>

        <BaseButton class="mt-10" :cargando="registerCarga">Registrarse</BaseButton>

    </form>
</div>
</template>
<script>
import BaseButton from '../components/BaseButton.vue';
import BaseH1 from '../components/BaseH1.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseLabel from '../components/BaseLabel.vue';
import { registrar } from '../service/auth';

export default {
    name: 'Register',
    components: { BaseButton, BaseLabel, BaseInput, BaseH1 },
    data() {

        return {

            registerCarga: false,

            newUser: {

                email: '',
                password: '',
                rol: 'usuario',
                calle: '',
                altura: '',
                localidad: '',
                nombre: '' 

            }

        }

    },
    methods: {

        async handleSubmit() {

            try {

                this.registerCarga = true;
                await registrar({ ...this.newUser });
                this.$router.push('/');

            } catch (error) {

            }
            this.registerCarga = false;


        }


    },
}
</script>
<style ></style>