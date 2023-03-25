<script setup>
import ImgInfoprodutor from '@/assets/img/illustrations/infoprodutor.jpg'
import ImgComprador from '@/assets/img/illustrations/comprador.jpg'
import ImgTermosUso from '@/assets/img/illustrations/termos-de-uso.jpg'
/* import ImgReportarProduto from '@/assets/img/illustrations/reportar-produto.jpg' */

import FooterContactCTA from '@/components/FooterContactCTA.vue'
</script>

<script>
const homeNavigationLinks = [
    {
        img: ImgComprador,
        text: 'Sou comprador e preciso de ajuda',
        href: '/categories/compradores/'
    },
    {
        img: ImgInfoprodutor,
        text: 'Sou produtor e preciso de suporte',
        href: '/categories/produtores/'
    },
    {
        img: ImgTermosUso,
        text: 'Termos de uso da Pepper',
        href: '/categories/termos-de-uso/'
    },
    /*     {
            img: ImgReportarProduto,
            text: 'Reportar ou denunciar um produto',
            href: '/categories/compradores/'
        }, */
]
</script>

<template>
    <div class="mx-auto max-w-2xl text-center mt-10">
        <h2 class="text-3xl tracking-tight text-gray-900 sm:text-4xl">Central de ajuda – Pepper</h2>
        <p class="mt-2 text-lg leading-8 text-gray-600">Como podemos te ajudar?</p>
    </div>
    <div class="mx-auto mt-8 mb-12 grid auto-rows-fr grid-cols-1 gap-8 lg:grid-cols-3 px-6 lg:px-2">
        <!-- v-for -->
        <div v-for="link in homeNavigationLinks" :key="link">
            <router-link :to="link.href" class="bg-white border border-slate-200 h-full hover:border-indigo-400 cursor-pointer rounded-lg w-full flex flex-col justify-center gap-2 p-6 hover:shadow-lg transition-all duration-400 text-center">
                <img :src="link.img" class="mx-auto max-h-[150px]" />
                <h5>{{ link.text }}</h5>
            </router-link>
        </div>
    </div>
    <!-- Footer contact CTA -->
    <FooterContactCTA />
</template>