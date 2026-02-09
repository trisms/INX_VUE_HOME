<script setup lang="ts">
import { computed, ref } from "vue";

type Size = "Desktop" | "Tablet" | "Mobile";
type MetaRow = { k: string; v: string };
type Project = {
  id: string;
  title: string;
  subtitle: string;
  meta: MetaRow[];
  categoryType: string;
  filePath: string;
  hero: "1" | "2" | "3" | "4";
};

const props = defineProps<{
  project: Project;
  size: Size;
  showImg?: boolean;
}>();

const showImg = computed(() => props.showImg ?? true);

const isDesktopOrTablet = computed(() => ["Desktop", "Tablet"].includes(props.size));
const isMobile = computed(() => props.size === "Mobile");
const isTablet = computed(() => props.size === "Tablet");

// ✅ .env 값 사용
const API_BASE = import.meta.env.VITE_API_BASE_URL as string; // "http://localhost:8080/api"

// ✅ id 매칭된 이미지 URL
const imgSrc = computed(() => `${API_BASE}/image/${props.project.id}`);

// ✅ 이미지 실패 시 fallback
const imgFailed = ref(false);
function onImgError() {
  imgFailed.value = true;
}
</script>

<template>
  <router-link :to="`/portfolio/${project.id}`" class="block w-full">
    <div class="content-stretch flex flex-col gap-[4px] items-start relative w-full">

      <!-- Desktop/Tablet -->
      <div
          v-if="isDesktopOrTablet"
          class="aspect-[818/460] bg-[#f0f3f6] relative shrink-0 w-full"
          :class="isTablet ? 'rounded-[8px]' : 'rounded-[12px]'"
          data-name="img-ratio"
      >
        <div class="overflow-clip relative rounded-[inherit] size-full">
          <!-- ✅ 이미지가 있으면 이미지 -->
          <img
              v-if="showImg && !imgFailed"
              :src="imgSrc"
              alt=""
              class="absolute inset-0 w-full h-full object-cover"
              @error="onImgError"
          />

          <!-- ✅ 실패하면 기존 BlankImage -->
          <BlankImage
              v-else
              className="-translate-y-1/2 absolute aspect-[1080/1080] left-0 right-0 top-1/2"
          />
        </div>

        <div
            aria-hidden="true"
            class="absolute border border-[#f0f3f6] border-solid inset-0 pointer-events-none"
            :class="isTablet ? 'rounded-[8px]' : 'rounded-[12px]'"
        />
      </div>

      <!-- Info -->
      <div class="content-stretch flex flex-col h-[52px] items-start relative shrink-0 w-full" data-name="info">
        <p
            class="font-['Pretendard:Regular',sans-serif] leading-[1.6] not-italic relative shrink-0 text-[#111217] text-[16px] text-left tracking-[-0.32px] w-full whitespace-pre-wrap"
            style="font-feature-settings: 'lnum','tnum';"
        >
          {{ project.title }}
        </p>
      </div>

      <!-- Mobile -->
      <div
          v-if="isMobile && showImg"
          class="aspect-[291/182] bg-[#f0f3f6] rounded-[8px] shrink-0 w-full relative overflow-hidden"
          data-name="img"
      >
        <img
            v-if="!imgFailed"
            :src="imgSrc"
            alt=""
            class="absolute inset-0 w-full h-full object-cover"
            @error="onImgError"
        />
        <BlankImage v-else className="absolute inset-0" />
      </div>

    </div>
  </router-link>
</template>
