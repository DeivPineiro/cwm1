<template >
    

    <form action="#" @submit.prevent="Logining">
        <section class="py-26 mt-5">
            <BaseH1 class="text-center">Login</BaseH1>
            <div class="container px-4 mx-auto">
                <div class="max-w-lg mx-auto py-8">
        <div class="mb-2">
            <BaseLabel for="email">Email</BaseLabel>
            <BaseInput type="email" id="email" v-model="form.email" :disabled="logingCarga" />


        </div>
        <div class="mb-2">
            <BaseLabel for="password">Contraseña</BaseLabel>
            <BaseInput type="password" id="password" v-model="form.password" :disabled="logingCarga" />


        </div>
        <BaseButton class="mt-4" :cargando="logingCarga">Ingresar</BaseButton>
        <p class="my-4 text-center font-extrabold">¿No tenes una cuenta?, ¡registrate! <a class="text-red-500 hover:underline" href="/#/register">Registrarme</a></p>
    </div>
    </div>
    </section>
    </form>
</template>
<script>
import BaseButton from '../components/BaseButton.vue';
import BaseH1 from '../components/BaseH1.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseLabel from '../components/BaseLabel.vue';
import { login } from '../service/auth.js';

export default {
    name: 'Login',
    components: { BaseButton, BaseLabel, BaseInput, BaseH1 },
    emits:['logged'],
    data() {

        return {
            logingCarga: false,
            form: {

                email: '',
                password: ''

            }
        }
    },
    methods: {
        
        Logining(){

            this.logingCarga= true;

            login({

                ...this.form

            }) 
            .then(user =>{

                // console.log(user);
                this.$emit('logged',{...user});
                this.$router.push('/');
            })           
            .finally(()=>{

                this.logingCarga= false;

            });



        }

    },
}
</script>
<style ></style>