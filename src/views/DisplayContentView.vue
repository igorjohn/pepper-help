<script setup>
import { PencilSquareIcon } from '@heroicons/vue/24/outline'
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
            dateCreated: '',
        }
    },
    publicContentService: null,

    created() {
        this.publicContentService = new PublicContentService();
    },
    mounted() {

        this.publicContentService
            .getContentSlug(this.$route.params.article)
            .then((data) => { data ? this.content = data : this.$router.push('/404') });

        this.publicContentService
            .getDateCreated(this.$route.params.article)
            .then((data) => { this.dateCreated = new Intl.DateTimeFormat('default', { dateStyle: 'short' }).format(new Date(data)) });
    }
}
</script>

<template>
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
                Atualizado em: <span v-html="dateCreated"></span>
            </span>
        </div>
    </div>

    <!-- Footer contact CTA -->
    <FooterContactCTA />
</template>