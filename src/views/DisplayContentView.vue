<script setup>
import { PencilSquareIcon } from '@heroicons/vue/24/outline'
import { ChevronRightIcon, HomeIcon } from '@heroicons/vue/20/solid'
import FooterContactCTA from '@/components/FooterContactCTA.vue'
</script>

<script>
import Markdown from 'vue3-markdown-it';
import PublicContentService from '../service/PublicContentService'
import PepperIcon from '@/assets/img/logo/pepper-icon.png'

export default {
    components: {
        Markdown
    },
    data() {
        return {
            content: '',
            title: '',
            author: '',
            createdAt: '',
            updatedAt: '',
            slug: ''
        }
    },
    publicContentService: null,

    created() {
        this.publicContentService = new PublicContentService();
    },
    mounted() {

        console.log(this.$route.params)

        this.publicContentService
            .getContent(this.$route.params.article)
            .then((data) => {
                if (data) {
                    this.content = data.content;
                    this.title = data.title;
                    this.slug = data.slug;
                    this.createdAt = new Intl.DateTimeFormat('default', { dateStyle: 'short' }).format(new Date(data.createdAt));
                    this.updatedAt = new Intl.DateTimeFormat('default', { dateStyle: 'short' }).format(new Date(data.updatedAt));
                }
                else {
                    this.$router.push('/404')
                }
            });
    }
}
</script>

<template>
    <!-- Breadcrumb -->
    <nav class="flex mb-4" aria-label="Breadcrumb">
        <div class="flex items-center space-x-2">
            <div>
                <a href="#" class="text-gray-400 hover:text-indigo-500">
                    <HomeIcon class="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                </a>
            </div>

            <ChevronRightIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />

            <div>
                <span class="text-sm font-medium text-gray-500 tracking-tight">{{ title }}</span>
            </div>
        </div>
    </nav>

    <!-- Post title -->
    <h2 class="text-3xl font-bold tracking-tight">{{ title }}</h2>

    <!-- Updated at -->
    <span class="text-xs block text-gray-500 mb-8"> Última atualização em: <span class="font-semibold">{{ updatedAt }}</span></span>

    <!-- Post content -->
    <Markdown class="body-content" :source="content" />

    <!-- Post information -->
    <div class="flex flex-row items-center gap-3 mt-6 mb-6">
        <img class="inline-block h-10 w-10 rounded-full" :src="PepperIcon" />
        <div class="flex flex-col justify-center">
            <span class="text-sm mb-1 flex items-center justify-start">
                <PencilSquareIcon class="w-4 h-4 mr-1 opacity-70" />
                Postado por: <span class="font-bold ml-1">PEPPER</span>
            </span>
            <span class="text-xs block opacity-70">
                Atualizado em: <span v-html="createdAt"></span>
            </span>
        </div>
    </div>

    <!-- Footer contact CTA -->
    <FooterContactCTA />
</template>