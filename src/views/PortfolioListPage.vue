<template>
  <Header :brochureHref="brochureHref" />
  <main class="pt-[64px] sm:pt-[72px]">
    <PortfolioList />
  </main>
</template>

<script setup lang="ts">
import Header from "@/views/components/landing/Header.vue";
import PortfolioList from "@/views/components/landing/PortfolioList.vue";

const brochureHref = "/brochure.pdf"; // 네 값으로
</script>
