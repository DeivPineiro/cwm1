<template >
    
    <button 
    class=" text-center text-lg leading-6 text-white font-extrabold inline-block max-h-11 transition w-full border p-2 border-gray-800 rounded-lg bg-violet-400 hover:bg-violet-300 disabled:bg-violet-200 motion-reduce:transition-none " 
    type="submit" :disabled="cargando">
    

    <!-- inline-block w-full py-4 px-6 mb-6 text-center text-lg leading-6 text-white font-extrabold bg-indigo-800 hover:bg-indigo-900 border-3 border-indigo-900 shadow rounded transition duration-200 -->

    <template v-if="!cargando">
    
        <slot/>
    

    </template>    
    <template v-else>
        <Carga class="scale-40 max-h-0" />
    </template>
    

</button>

</template>

<script>
import Carga from './Carga.vue';


export default {
    name: 'BaseButton',
    props: {
        cargando: {
            type: Boolean,
            default: false,
        }
    },
    components: { Carga }
}

</script>

<style >
    
</style>