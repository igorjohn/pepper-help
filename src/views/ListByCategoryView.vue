<script setup>
import FooterContactCTA from '@/components/FooterContactCTA.vue'

import axios from "axios";
</script>

<script>
import Markdown from 'vue3-markdown-it';
import PublicContentService from '../service/PublicContentService'

export default {
    data() {
        return {
            thisCategory: this.$route.params.category,
            thisCategoryArticles: [],
        }
    },
    components: {
        Markdown
    },
    publicContentService: null,

    methods: {
        formatDate(dateString) {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('default', { dateStyle: 'short' }).format(date);
        }
    },

    created() {
        this.publicContentService = new PublicContentService();
    },
    mounted() {

        const StrapiBaseURL = 'http://localhost:1337/api';
        axios.get(`${StrapiBaseURL}/helps?populate=*`).then((resp) => {

            var articles = resp.data.data;
            var arrayArticles = [];

            articles.forEach(z => {
                arrayArticles.push({
                    category: z.attributes.category.data.attributes.name,
                    title: z.attributes.title,
                    slug: z.attributes.slug,
                    content: z.attributes.content,
                    updatedAt: z.attributes.updatedAt
                })
            });

            let selectedCategory = this.$route.params.category;

            this.thisCategoryArticles = arrayArticles.filter(function (art) {
                return art.category == selectedCategory
            }).map(function (art) {
                return {
                    category: art.category,
                    title: art.title,
                    slug: art.slug,
                    content: art.content,
                    updatedAt: art.updatedAt
                }
            })
        });
    }
}
</script>

<template>
    <div class="mx-auto w-full">
        <h2 class="tracking-tight">Artigos na categoria <span class="capitalize-first inline-block">{{ thisCategory.replace('-', ' ').replace('-', ' ') }}:</span></h2>

        <div class="mt-10 space-y-12 flex flex-col flex-wrap overflow-hidden whitespace-normal">

            <div v-if="thisCategoryArticles && thisCategoryArticles !== []">
                <article v-for="post in thisCategoryArticles" :key="post.id" class="flex flex-col items-start justify-between w-full">

                    <div class="flex items-center gap-x-4 text-xs">
                        <time :datetime="post.updatedAt" class="text-gray-500">Atualizado em: {{ formatDate(post.updatedAt) }}</time>
                        <a :href="post.category.toLowerCase()" class="capitalize-first inline-block relative z-10 rounded-full bg-gray-50 py-1.5 px-3 font-medium text-gray-600 hover:bg-gray-100">{{ post.category.replace('-', ' ').replace('-', ' ') }}</a>
                    </div>
                    <div class="group relative">
                        <a :href="'/' + post.slug" class="mt-3 mb-1 text-lg font-semibold leading-6 block">
                            <span class="absolute inset-0" />
                            {{ post.title }}
                        </a>
                        <Markdown class="post-briefing mt-4 leading-6" :source="post.content" />
                    </div>
                </article>
            </div>

        </div>

        <!-- Footer contact CTA -->
        <FooterContactCTA />


    </div>
</template>

<style >
.post-briefing {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    max-width: 100%;
}

.post-briefing * {
    font-size: 0.875rem;
    color: rgb(75 85 99);
    line-height: 1.5rem;
    margin-bottom: 0.25rem;
    font-weight: normal;
}

.capitalize-first:first-letter {
    text-transform: uppercase;

}
</style>