<template>
    <input class="px-2 disabled:bg-slate-300 inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded"  :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)">
</template>
<script>
export default {

    name: 'BaseInput',
    props: ['modelValue'],
    emits: ['update:modelValue'],

}
</script>
<style></style>

