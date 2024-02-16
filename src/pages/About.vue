<template>
    <div class="my-5 p-10">
        <BaseH1 class="text-center">ServicePower: Donde la Pasión por las empanadas se encuentra con la excelencia</BaseH1>
        <div class="flex p-5 justify-center items-center">
            <img class="m-5 shadow-2xl h-auto max-w-full rounded-lg  " src="../../public/imgs/about1.webp" alt="about">
        </div>
        <BaseH2 class="">¡Sabor auténtico en cada bocado!</BaseH2>
        <BaseP>
            En ServicePower, estamos comprometidos con la misión de llevar las empanadas más deliciosas y auténticas a tu
            mesa. Nos apasiona la cocina tradicional y creemos que las empanadas son una expresión auténtica de sabor y
            cultura. Desde nuestro humilde comienzo, hemos crecido para convertirnos en un destino de confianza para los
            amantes de las empanadas en todo el país.

        </BaseP>

        <BaseP>Nuestra misión es ofrecerte empanadas frescas, hechas a mano y con ingredientes de alta calidad. Nos
            enorgullece mantener las tradiciones de la cocina casera y transmitirlas a las futuras generaciones.</BaseP>
        <div class="my-20 border-4 shadow-lg  border-indigo-500 rounded-lg p-5">
            <BaseH2 class="underline text-center">Nuestra Historia</BaseH2>

            <BaseP class="text-center">
                ServicePower fue fundada en 2005 por un grupo de amigos con una visión compartida: compartir la alegría de
                las empanadas caseras con el mundo. Comenzamos en una pequeña cocina, perfeccionando nuestras recetas a lo
                largo de los años, y pronto ganamos una base de clientes apasionados que buscaban la autenticidad en cada
                bocado.
            </BaseP>
            <BaseP class="text-center">
                Hoy, estamos orgullosos de ser una empresa local con una presencia nacional. Nuestras recetas han pasado de
                generación en generación, manteniendo la esencia de la tradición de las empanadas caseras. A lo largo de los
                años, hemos crecido, pero nuestra dedicación a la calidad y la autenticidad nunca ha vacilado.
            </BaseP>
            <BaseH2 class="underline text-center">Nuestra Misión</BaseH2>
            <BaseP class="text-center">
                En ServicePower, nuestra misión es simple: servir empanadas que deleiten el paladar y reconforten el alma.
                Nos esforzamos por:

                Utilizar ingredientes frescos y de alta calidad en cada empanada.
                Mantener las recetas tradicionales que hacen que nuestras empanadas sean únicas.
                Crear un ambiente cálido y acogedor en nuestro local para compartir momentos especiales con nuestros
                clientes.
                Contribuir a la comunidad local y apoyar iniciativas caritativas que sean importantes para nosotros.
            </BaseP>
            <BaseH2 class="underline text-center">Nuestro Compromiso con la Calidad</BaseH2>
            <BaseP class="text-center">
                La calidad está en el corazón de todo lo que hacemos en ServicePower. Nuestras empanadas son preparadas a
                mano diariamente con ingredientes frescos y amor. Nos enorgullece mantener los estándares más altos de
                higiene y sabor en todo lo que servimos.
            </BaseP>
            <BaseH2 class="underline text-center">Gracias por elegirnos</BaseH2>
            <div class="flex p-5 justify-center items-center">
                <img class="m-5" src="../../public/imgs/ServicePowerLogo.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
import BaseH1 from "../components/BaseH1.vue";
import BaseH2 from "../components/BaseH2.vue";
import BaseP from "../components/BaseP.vue";


export default {
    name: 'Home',
    components: { BaseH1, BaseH2, BaseP }
}
</script>
<style ></style>