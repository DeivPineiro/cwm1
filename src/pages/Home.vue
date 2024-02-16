<template>
    <div class="my-5 p-10">
        <BaseH1 class="text-center">Bienvenidos a ServicePower empanadas.</BaseH1>
        <div class="flex p-5 justify-center items-center">
            <img class="m-5" src="../../public/imgs/ServicePowerLogo.png" alt="">
        </div>
        <BaseH2 class="">¡Sabor auténtico en cada bocado!</BaseH2>
        <BaseP>
            En ServicePower, nos enorgullece ofrecer las empanadas más deliciosas y auténticas que encontrarás en cualquier
            lugar. Nuestro compromiso es llevar a tu mesa la tradición y el sabor de las empanadas como las hacían nuestras
            abuelas.

        </BaseP>

        <BaseP>Nuestra misión es ofrecerte empanadas frescas, hechas a mano y con ingredientes de alta calidad. Nos
            enorgullece mantener las tradiciones de la cocina casera y transmitirlas a las futuras generaciones.</BaseP>
        <div class="my-20 border-4 shadow-lg  border-indigo-500 rounded-lg p-5">
            <BaseH2 class="underline text-center">Nuestras Especialidades</BaseH2>

            <BaseP class="text-center">
                Descubre un mundo de sabores con nuestra amplia variedad de empanadas, hechas con ingredientes frescos y
                cariño:
            </BaseP>
            <BaseP class="text-center">
                <span class="font-bold text-lime-600">Empanada Criolla:</span> Nuestra receta clásica, rellena de carne
                jugosa, cebolla, huevo y aceitunas. ¡Una explosión de
                sabor en cada bocado!
            </BaseP>
            <BaseP class="text-center">
                <span class="font-bold text-lime-600">Empanada de Pollo:</span> Jugosa carne de pollo, cebolla, pimiento y
                un toque de especias que te harán sentir como en
                casa.
            </BaseP>
            <BaseP class="text-center">
                <span class="font-bold text-lime-600">Empanada Vegetariana: </span>Para nuestros amigos vegetarianos, una
                opción rellena de espinacas, champiñones y queso.
                ¡Sabrosa y saludable!
            </BaseP>
            <BaseP class="text-center">
                <span class="font-bold text-lime-600"> Empanada de Queso y Cebolla:</span> El equilibrio perfecto entre
                queso derretido y cebolla caramelizada en una masa
                crujiente.
            </BaseP>

            <div class="p-5 mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                    <img class="shadow-xl h-auto max-w-full rounded-lg max-h-60" src="../../public/imgs/empanada1.jpg"
                        alt="">
                </div>
                <div>
                    <img class="shadow-xl h-auto max-w-full rounded-lg max-h-60" src="../../public/imgs/Empanada2.jpeg"
                        alt="">
                </div>
                <div>
                    <img class="shadow-xl h-auto max-w-full rounded-lg max-h-60" src="../../public/imgs/empanada3.jpg"
                        alt="">
                </div>
                <div>
                    <img class="shadow-xl h-auto max-w-full rounded-lg max-h-60" src="../../public/imgs/empanada4.jpg"
                        alt="">
                </div>
                <div>
                    <img class="shadow-xl h-auto max-w-full rounded-lg max-h-60" src="../../public/imgs/empanada5.jpg"
                        alt="">
                </div>
                <div>
                    <img class="shadow-xl h-auto max-w-full rounded-lg max-h-60" src="../../public/imgs/empanada6.jpg"
                        alt="">
                </div>

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