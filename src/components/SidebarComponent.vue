<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { Bars3BottomLeftIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { ArrowRightIcon } from '@heroicons/vue/20/solid'
//MagnifyingGlassIcon,
import PepperLogo from '@/assets/img/logo/logo.svg'

import axios from "axios";

const sidebarOpen = ref(false)

</script>

<script>
export default {
    data() {
        return {
            posts: [],
        }
    },

    mounted() {
        const StrapiBaseURL = 'https://strapi-116083-0.cloudclusters.net/api';
        let arrayContents = [];
        axios.get(`${StrapiBaseURL}/helps?populate=*`).then((resp) => {

            var articles = resp.data.data;
            var arrayArticles = [];
            var arrayCategories = [];
            let categories = []

            articles.forEach(z => {
                arrayArticles.push({
                    category: z.attributes.category.data.attributes.name,
                    title: z.attributes.title,
                    slug: z.attributes.slug
                })

                arrayCategories.push(z.attributes.category.data.attributes.name);
                categories = arrayCategories.filter((item, pos) => {
                    if (item != null) return arrayCategories.indexOf(item) == pos
                });
            });

            for (let i = 0; i < categories.length; i++) {

                var catArray = new Array(categories[i]);

                let thisCategoryArticles = arrayArticles.filter(function (art) {
                    return art.category == categories[i];
                }).map(function (art) {
                    return {
                        category: categories[i],
                        title: art.title,
                        slug: art.slug
                    }
                })

                let filteredArticles = catArray.concat(thisCategoryArticles);
                arrayContents.push(filteredArticles);
            }

            if (arrayContents != []) this.posts = arrayContents
        });
    }
}
</script>

<template>
    <TransitionRoot as="template" :show="sidebarOpen">
        <Dialog as="div" class="relative z-40 lg:hidden" @close="sidebarOpen = false">
            <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
            <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
                <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col bg-white border-r border-zinc-200 pt-5 pb-4">
                    <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                        <div class="absolute top-0 right-0 -mr-12 pt-2">
                            <button type="button" class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-0" @click="sidebarOpen = false">
                                <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                                </button>
                            </div>
                        </TransitionChild>
                        <div class="flex flex-shrink-0 items-center px-4">
                            <img :src="PepperLogo" class="w-[110px]" />
                        </div>
                        <div class="mt-5 h-0 flex-1 overflow-y-auto">
                            <nav class="flex-1 px-4 pb-4">
                                <!-- v-for posts -->
                                <div v-for="item in posts" v-bind:key="item">
                                    <a :href="'/categories/' + item[0]" class="text-xs uppercase font-bold text-slate-600 block mt-8 mb-3">
                                        {{ item[0] }}
                                    </a>
                                    <template v-for="article in item" :key="article">
                                        <a v-if="item.indexOf(article) > 0" :href="'/' + article.slug" :class="['border-gray-300 border-l-2 text-slate-500 transition duration-400 group flex items-center px-2 py-1.5 text-[12px] leading-4 font-medium']">
                                            {{ article.title }}
                                        </a>
                                    </template>
                                </div>
                            </nav>
                        </div>
                    </DialogPanel>
                </TransitionChild>
                <div class="w-14 flex-shrink-0" aria-hidden="true">
                    <!--  -->
                </div>
            </div>
        </Dialog>
    </TransitionRoot>


    <div class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 xl:w-72 lg:flex-col">
        <div class="flex flex-grow flex-col overflow-y-auto border-r border-zinc-200 pt-5">
            <router-link to="/" class="flex flex-shrink-0 items-center px-4">
                <img :src="PepperLogo" class="w-[110px]" />
            </router-link>
            <div class="mt-4 flex flex-1 flex-col">
                <nav class="flex-1 px-4 pb-4">
                    <!-- v-for posts -->
                    <div v-for="item in posts" v-bind:key="item">
                        <a :href="'/categories/' + item[0]" class="text-xs uppercase font-bold text-slate-600 block mt-8 mb-3">
                            {{ item[0] }}
                        </a>
                        <template v-for="article in item" :key="article">
                            <a v-if="item.indexOf(article) > 0" :href="'/' + article.slug" :class="['border-gray-300 border-l-2 text-slate-500 transition duration-400 group flex items-center px-2 py-1.5 text-[12px] leading-4 font-medium']">
                                {{ article.title }}
                            </a>
                        </template>
                    </div>
                </nav>
            </div>
        </div>
    </div>

    <div class="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white border-b border-zinc-200 opacity-[0.975] lg:ml-64 xl:ml-72">
        <button type="button" class="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden" @click="sidebarOpen = true">
            <Bars3BottomLeftIcon class="h-6 w-6" aria-hidden="true" />
        </button>
        <div class="flex flex-1 justify-between px-4">
            <div class="flex flex-1">
                <!--  <form class="flex w-full lg:ml-0" action="#" method="GET">
                                                <label for="search-field" class="sr-only">Search</label>
                                                <div class="relative w-full text-gray-400 focus-within:text-gray-600">
                                                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                                                        <MagnifyingGlassIcon class="h-5 w-5" aria-hidden="true" />
                                                    </div>
                                                    <input id="search-field" class="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 focus:border-transparent focus:outline-none focus:ring-0 focus:placeholder:text-gray-400 sm:text-sm" placeholder="Pesquisar" type="search" name="search" />
                                                </div>
                                            </form> -->
            </div>
            <div class="ml-4 flex items-center lg:ml-6">
                <a href="https://pepper.com.br/login.html" class="rounded-md bg-red-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 hover:text-white focus-visible:outline-0 flex items-center transition duration-500 ease">
                    Login
                    <ArrowRightIcon class="w-4 ml-1" />
                </a>
            </div>
        </div>
    </div>
</template>