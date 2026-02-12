<template>
  <Header :brochureHref="brochureHref" />

  <!-- Header 높이만큼 패딩 -->
  <main class="pt-[64px] sm:pt-[72px] bg-[#f0f3f6]">
    <router-view />
  </main>

  <FooterSection />

  <BackToTop/>
</template>

<script setup lang="ts">
import Header from "@/views/components/landing/Header.vue";
import FooterSection from "@/views/components/landing/FooterSection.vue";
import BackToTop from "@/views/components/common/BackToTop.vue";

const brochureHref = "https://drive.google.com/file/d/1Jk8R5wGMRRW-ULxiNFJRVSC0A9w3roIL/view"; // 네 값
</script>
