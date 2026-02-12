<template>
  <div
      class="content-stretch flex flex-col gap-[120px] items-center relative size-full"
      style="margin-top: 30px"
      data-name="Projects"
  >
    <!-- 로딩/에러 -->
    <p v-if="loading" class="w-full text-center text-[#747985] text-[14px]">
      불러오는 중...
    </p>
    <p v-else-if="error" class="w-full text-center text-red-500 text-[14px]">
      {{ error }}
    </p>

    <!-- 리스트 -->
    <template v-else>
      <section
          v-for="item in items"
          :key="item.fileNo"
          class="bg-white w-full max-w-[375px] md:max-w-[900px] lg:max-w-[1224px] rounded-[20px]"
      >
        <div
            class="flex flex-col gap-[36px] px-[18px] py-[32px]
                 md:flex-row md:gap-[16px]
                 lg:px-[24px] lg:py-[60px]"
        >
          <div class="w-full md:w-[342px] flex flex-col gap-[20px]">
            <ProjectTitle :title="item.fileName" :subtitle="item.subTitle || ''" />
            <ProjectMeta :meta="makeMetaRows(item)" />
          </div>

          <ProjectImages :fileNo="item.fileNo" :subs="item.subs ?? []" />
        </div>
      </section>

      <p v-if="items.length === 0" class="w-full text-center text-[#747985] text-[14px]">
        데이터가 없습니다.
      </p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, onMounted, PropType, ref } from "vue";
import { http } from "@/lib/http";

/** ================== API BASE ================== */
const API_BASE_RAW =
    (import.meta.env.VITE_API_BASE_URL as string | undefined) || window.location.origin;

const apiUrl = (path: string) => new URL(path, API_BASE_RAW).toString();

// 이미지 서버 베이스
const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

/** ================== Types ================== */
type SubDto = {
  subFileNo: number;
  fileNo: number;
  imageUrl?: string; // "/api/sub/image/{subFileNo}"
};

type MetaRow = { k: string; v: string };

type PortfolioItem = {
  fileNo: number;
  fileName: string;
  subTitle?: string;
  year?: string;
  customer?: string;
  industry?: string;
  categoryType?: string | number | null;
  imageUrl?: string;     // "/api/image/{fileNo}"
  subs?: SubDto[];
};

type ApiListResponse = {
  result: string;
  list: PortfolioItem[];
};

/** ================== State ================== */
const loading = ref(false);
const error = ref<string | null>(null);
const items = ref<PortfolioItem[]>([]);

/** ================== Helpers ================== */
function toScope(ct?: string | number | null) {
  switch (String(ct ?? "")) {
    case "1": return "UXUI 디자인";
    case "2": return "디자인컨설팅";
    case "3": return "공공디자인";
    case "4": return "안전디자인";
    default: return "-";
  }
}

function makeMetaRows(d: PortfolioItem): MetaRow[] {
  return [
    { k: "Year:", v: d.year || "-" },
    { k: "고객사:", v: d.customer || "-" },
    { k: "Scope of Work:", v: toScope(d.categoryType) },
    { k: "Industry:", v: d.industry || "-" },
  ];
}

/** ================== Load ================== */
async function loadList() {
  loading.value = true;
  error.value = null;
  items.value = [];

  try {
    const { data } = await http.get<ApiListResponse>(apiUrl("/api/portfolio/detail"), {
      params: {
        // categoryType: 2,
        // limit: 50,
      },
    });

    if (String(data?.result) !== "200" || !Array.isArray(data.list)) {
      throw new Error("목록 데이터를 찾지 못했어요.");
    }

    // ✅ 지금 서버 응답 형태 그대로 정규화
    items.value = data.list.map((it: any) => ({
      fileNo: Number(it.fileNo),
      fileName: String(it.fileName ?? ""),
      subTitle: it.subTitle ?? "",
      year: it.year ?? "",
      customer: it.customer ?? "",
      industry: it.industry ?? "",
      categoryType: it.categoryType ?? null,
      imageUrl: it.imageUrl ?? undefined,
      subs: Array.isArray(it.subs) ? it.subs.slice(0, 4) : [],
    }));
  } catch (e: any) {
    error.value = e?.message ?? "목록 정보를 불러오지 못했어요.";
  } finally {
    loading.value = false;
  }
}

onMounted(loadList);

/* ================= 내부 컴포넌트들 ================= */

/* 타이틀 */
const ProjectTitle = defineComponent({
  name: "ProjectTitle",
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
  },
  template: `
    <div class="flex flex-col gap-[8px]">
    <p class="font-bold text-[30px] tracking-[-0.96px] text-[#111217]">
      {{ title }}
    </p>
    <p class="text-[18px] text-[#353841] tracking-[-0.36px]">
      {{ subtitle }}
    </p>
    </div>
  `,
});

/* 메타 */
const ProjectMeta = defineComponent({
  name: "ProjectMeta",
  props: {
    meta: { type: Array as PropType<MetaRow[]>, required: true },
  },
  template: `
    <div class="flex flex-col gap-[4px] text-[16px] text-[#353841]">
    <div v-for="(row, i) in meta" :key="i" class="flex gap-[4px]">
      <b>{{ row.k }}</b>
      <span>{{ row.v }}</span>
    </div>
    </div>
  `,
});

/* 프레임 */
const Frame = defineComponent({
  name: "Frame",
  props: { class: { type: String, default: "" } },
  template: `
    <div :class="['rounded-[12px] relative overflow-hidden', $props.class]">
    <div class="absolute inset-0 border border-[#f0f3f6] rounded-[12px] pointer-events-none"></div>
    </div>
  `,
});

/* 이미지 영역 (오류 방지 버전) */
const ProjectImages = defineComponent({
  name: "ProjectImages",
  components: { Frame },
  props: {
    fileNo: { type: Number, required: true },
    subs: { type: Array as PropType<SubDto[]>, default: () => [] },
  },
  setup(props) {
    console.log("ProjectImages setup", props.fileNo, props.subs);

    const heroFailed = ref(false);
    const failedSubs = ref<Record<number, true>>({});

    // ✅ VITE_API_BASE_URL이 .../api 로 끝나도 안전하게 ORIGIN만 추출
    const ORIGIN = (import.meta.env.VITE_API_BASE_URL as string).replace(/\/api\/?$/, "");

    const heroImg = computed(() => `${ORIGIN}/api/image/${props.fileNo}`);

    const subSlots = computed(() => {
      const base = (props.subs ?? []).slice(0, 4);
      return Array.from({ length: 4 }, (_, i) => base[i] ?? null);
    });
    const subUrl = (s: SubDto) => {
      // 서버가 "/api/sub/image/23"을 주면 ORIGIN 붙여서 절대경로로
      if (s.imageUrl) {
        if (/^https?:\/\//i.test(s.imageUrl)) return s.imageUrl;
        return `${ORIGIN}${s.imageUrl}`;
      }
      return `${ORIGIN}/api/sub/image/${encodeURIComponent(String(s.subFileNo))}`;
    };

    function onHeroError() {
      heroFailed.value = true;
    }
    function onSubError(subFileNo: number) {
      failedSubs.value[subFileNo] = true;
    }
    function subOk(s: SubDto | null) {
      return !!(s && s.subFileNo) && !failedSubs.value[s.subFileNo];
    }

    return { heroImg, heroFailed, onHeroError, subSlots, subUrl, onSubError, subOk };
  },

  template: `
    <div class="w-full md:flex-1 flex flex-col gap-[8px]" data-name="imgs">

    <!-- ✅ 모바일: < md -->
    <div class="flex flex-col gap-[8px] md:hidden">
      <!-- HERO -->
      <div class="relative bg-[#f0f3f6] w-full aspect-[818/460] rounded-[12px] overflow-hidden">
        <img
            v-if="!heroFailed"
            :src="heroImg"
            class="absolute inset-0 w-full h-full object-cover z-[2]"
            alt=""
            @error="onHeroError"
        />
        <Frame v-else class="absolute inset-0" />
      </div>

      <!-- SUB 4 -->
      <div
          v-for="(s, i) in subSlots"
          :key="i"
          class="relative bg-[#f0f3f6] w-full aspect-[818/460] rounded-[12px] overflow-hidden"
      >
        <Frame class="absolute inset-0 z-[1]" />
        <img
            v-if="subOk(s)"
            :src="subUrl(s)"
            class="absolute inset-0 w-full h-full object-cover z-[2]"
            alt=""
            @error="onSubError(s.subFileNo)"
        />
      </div>
    </div>

    <!-- ✅ 테블릿: md ~ < lg -->
    <div class="hidden md:flex lg:hidden flex-col gap-[8px] w-full">
      <!-- HERO -->
      <div class="relative bg-[#f0f3f6] w-full aspect-[818/460] rounded-[12px] overflow-hidden">
        <img
            v-if="!heroFailed"
            :src="heroImg"
            class="absolute inset-0 w-full h-full object-cover z-[2]"
            alt=""
            @error="onHeroError"
        />
        <Frame v-else class="absolute inset-0" />
      </div>

      <!-- SUB 4 (2x2) -->
      <div class="grid grid-cols-2 gap-[8px] w-full">
        <div
            v-for="(s, i) in subSlots"
            :key="i"
            class="relative bg-[#f0f3f6] aspect-[818/460] rounded-[12px] overflow-hidden"
        >
          <Frame class="absolute inset-0 z-[1]" />
          <img
              v-if="subOk(s)"
              :src="subUrl(s)"
              class="absolute inset-0 w-full h-full object-cover z-[2]"
              alt=""
              @error="onSubError(s.subFileNo)"
          />
        </div>
      </div>
    </div>

    <!-- ✅ 데스크탑: >= lg -->
    <div class="hidden lg:flex lg:flex-col lg:gap-[8px]">
      <!-- HERO -->
      <div class="relative bg-[#f0f3f6] h-[460px] w-[818px] rounded-[12px] overflow-hidden">
        <img
            v-if="!heroFailed"
            :src="heroImg"
            class="absolute inset-0 w-full h-full object-cover z-[2]"
            alt=""
            @error="onHeroError"
        />
        <Frame v-else class="absolute inset-0" />
      </div>

      <!-- SUB 4 (2x2) -->
      <div class="grid grid-cols-2 gap-[8px] w-full">
        <div
            v-for="(s, i) in subSlots"
            :key="i"
            class="relative bg-[#f0f3f6] aspect-[818/460] rounded-[12px] overflow-hidden"
        >
          <Frame class="absolute inset-0 z-[1]" />
          <img
              v-if="subOk(s)"
              :src="subUrl(s)"
              class="absolute inset-0 w-full h-full object-cover z-[2]"
              alt=""
              @error="onSubError(s.subFileNo)"
          />
        </div>
      </div>
    </div>

    </div>
  `

});
</script>
