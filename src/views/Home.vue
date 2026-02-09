<template>
<!--  <Header brochureHref="https://drive.google.com/file/d/1Jk8R5wGMRRW-ULxiNFJRVSC0A9w3roIL/view" />-->
    <BannerSection />
    <PortfolioSection id="portfolio" class="scroll-mt-[72px]" />
    <ServiceSection id="process" class="scroll-mt-[72px]" />
   <AboutSection id="about" class="scroll-mt-[72px]" />
   <WithUs id="withus" class="scroll-mt-[72px]" />

<!--    <FooterSection id="contact" class="scroll-mt-[72px]" />-->


</template>

<script setup lang="ts">
import BannerSection from '@/views/components/landing/BannerSection.vue'
import PortfolioSection from '@/views/components/landing/PortfolioSection.vue'
import ServiceSection from '@/views/components/landing/ServiceSection.vue'
import AboutSection from '@/views/components/landing/AboutSection.vue'
import FooterSection from '@/views/components/landing/FooterSection.vue'
import Header from "@/views/components/landing/Header.vue";
import WithUs from "@/views/components/landing/WithUs.vue";
</script>
