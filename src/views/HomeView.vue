<script setup>
import axios from "axios";

/* import ImgInfoprodutor from '@/assets/img/illustrations/infoprodutor.jpg'
import ImgComprador from '@/assets/img/illustrations/comprador.jpg'
import ImgTermosUso from '@/assets/img/illustrations/termos-de-uso.jpg' */
/* import ImgReportarProduto from '@/assets/img/illustrations/reportar-produto.jpg' */

import FooterContactCTA from '@/components/FooterContactCTA.vue'
</script>

<script>



export default {

    data() {
        return {
            homeCategories: [],
        }
    },
    mounted() {
        const StrapiBaseURL = 'https://strapi-116083-0.cloudclusters.net/api';

        var array = [];

        axios.get(`${StrapiBaseURL}/categories?populate=*`).then((resp) => {

            var categories = resp.data.data;
            console.log(categories)

            categories.forEach(z => {
                array.push({
                    name: z.attributes.name,
                    description: z.attributes.description,
                    homeText: z.attributes.homeText,
                    image: StrapiBaseURL.replace('/api', '') + z.attributes.image.data.attributes.url
                })
            });

            this.homeCategories = array;
            console.log(this.homeCategories)

        });
    }
}
</script>

<template>
    <div class="mx-auto max-w-2xl text-center mt-10">
        <h2 class="text-3xl tracking-tight text-gray-900 sm:text-4xl">Central de ajuda – Pepper</h2>
        <p class="mt-2 text-lg leading-8 text-gray-600">Como podemos te ajudar?</p>
    </div>
    <div class="mx-auto mt-8 mb-12 grid auto-rows-fr grid-cols-1 gap-8 lg:grid-cols-3 px-6 lg:px-2">
        <!-- v-for -->
        <div v-for="link in homeCategories" :key="link">
            <router-link :to="'/categories/' + link.name" class="border border-slate-200 h-full hover:border-indigo-400 cursor-pointer rounded-lg w-full flex flex-col justify-center gap-2 p-6 hover:shadow-lg transition-all duration-400 text-center">
                <img :src="link.image" class="mx-auto max-h-[150px]" />
                <span class="text-xs block text-center text-gray-500">Artigos na categoria:

                    "<span class="capitalize font-semibold">{{ link.name }}</span>"
                </span>
                <h5>{{ link.homeText }}</h5>
            </router-link>
        </div>
    </div>
    <!-- Footer contact CTA -->
    <FooterContactCTA />
</template>