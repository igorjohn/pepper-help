<script setup>
import Svg404 from '@/assets/img/illustrations/error-404.svg';
</script>

<template>
    <section>
        <img :src="Svg404" class="mx-auto w-[500px] max-w-full mb-10" />
        <h2 class="text-center">Ops... Página não encontrada</h2>
        <p class="text-center">Parece que o link que você tentou acessar não existe.</p>
    </section>
</template>