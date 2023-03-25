<script setup>
import FooterPepper from '@/components/FooterPepper.vue'
import SidebarComponent from '@/components/SidebarComponent.vue'

</script>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<template>
  <div class="flex grow flex-col bg-white">

    <!-- Sidebar -->
    <SidebarComponent />

    <div class="flex flex-1 flex-col lg:pl-64 xl:pl-72">

      <!-- Content -->
      <main>
        <section class="max-w-6xl mx-auto mt-16 mb-12 flex flex-col justify-center grow px-4 lg:px-8">
          <router-view />
        </section>
      </main>

      <!-- Footer -->
      <FooterPepper />

    </div>
  </div>
</template>

