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
          :ref="setCardRef(item.fileNo)"
          :id="`p-${item.fileNo}`"
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
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  PropType,
  ref,
  watch,
} from "vue";
import { useRoute } from "vue-router";
import { http } from "@/lib/http";

/** ================== API BASE ================== */
const API_BASE_RAW =
    (import.meta.env.VITE_API_BASE_URL as string | undefined) || window.location.origin;
const apiUrl = (path: string) => new URL(path, API_BASE_RAW).toString();

/** ✅ 이미지 ORIGIN (VITE_API_BASE_URL이 .../api 여도 안전) */
const ORIGIN = ((import.meta.env.VITE_API_BASE_URL as string) || window.location.origin).replace(
    /\/api\/?$/,
    ""
);

/** ================== Router (URL에서 38 꺼내기) ================== */
const route = useRoute();

/**
 * ✅ 여기 핵심: 라우터가 :id 이므로 route.params.id
 * /portfolio/38 => targetId = 38
 */
const targetId = computed<number | null>(() => {
  const v = route.params.id;
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : null;
});

/** ================== Types ================== */
type SubDto = {
  subFileNo: number;
  fileNo: number;
  imageUrl?: string;
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
  imageUrl?: string;
  subs?: SubDto[];
};

type ApiListResponse = {
  result: string;
  list: any[];
};

/** ================== State ================== */
const loading = ref(false);
const error = ref<string | null>(null);
const items = ref<PortfolioItem[]>([]);

/** ================== Scroll refs ================== */
const cardRefs = ref<Record<number, HTMLElement | null>>({});
const setCardRef = (fileNo: number) => (el: HTMLElement | null) => {
  cardRefs.value[fileNo] = el;
};

async function scrollToTarget() {
  const t = targetId.value;
  if (!t) return;
  if (!items.value.length) return;

  const exists = items.value.some((x) => x.fileNo === t);
  if (!exists) return;

  await nextTick();

  // 이미지 로딩으로 레이아웃 변할 수 있으니 "두 번" 잡아줌 (안정성)
  const run = () => {
    const el = cardRefs.value[t];
    if (!el) return;

    const headerOffset = window.innerWidth < 640 ? 64 : 72;
    const top = window.scrollY + el.getBoundingClientRect().top - headerOffset - 12;

    window.scrollTo({ top, behavior: "smooth" });
  };

  requestAnimationFrame(run);
  setTimeout(run, 80);
}

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
    // ✅ 리스트 페이지면 list API를 호출해야 함
    const { data } = await http.get<ApiListResponse>(apiUrl("/api/portfolio/detail"), {
      params: {
        // categoryType: 2,
        // limit: 50,
      },
    });

    if (String((data as any)?.result) !== "200" || !Array.isArray((data as any).list)) {
      throw new Error("목록 데이터를 찾지 못했어요.");
    }

    items.value = (data as any).list.map((it: any) => {
      const f = it.file ?? it; // {file, subs} or flat

      const rawSubs = it.subs ?? f.subs;
      const normalizedSubs =
          Array.isArray(rawSubs)
              ? rawSubs
              : rawSubs && typeof rawSubs === "object"
                  ? Object.values(rawSubs)
                  : [];

      return {
        fileNo: Number(f.fileNo),
        fileName: String(f.fileName ?? ""),
        subTitle: f.subTitle ?? "",
        year: f.year ?? "",
        customer: f.customer ?? "",
        industry: f.industry ?? "",
        categoryType: f.categoryType ?? null,
        imageUrl: it.imageUrl ?? f.imageUrl ?? undefined,
        subs: normalizedSubs.slice(0, 4),
      } as PortfolioItem;
    });

    await scrollToTarget();
  } catch (e: any) {
    error.value = e?.message ?? "목록 정보를 불러오지 못했어요.";
  } finally {
    loading.value = false;
  }
}

onMounted(loadList);

// ✅ id가 바뀌거나 리스트가 채워지면 스크롤 재시도
watch([items, targetId], () => {
  scrollToTarget();
});

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
    <p class="font-bold text-[30px] tracking-[-0.96px] text-[#111217]">{{ title }}</p>
    <p class="text-[18px] text-[#353841] tracking-[-0.36px]">{{ subtitle }}</p>
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

/* 이미지 영역 */
const ProjectImages = defineComponent({
  name: "ProjectImages",
  components: { Frame },
  props: {
    fileNo: { type: Number, required: true },
    subs: { type: Array as PropType<SubDto[]>, default: () => [] },
  },
  setup(props) {
    const heroFailed = ref(false);
    const failedSubs = ref<Record<number, true>>({});

    const heroImg = computed(() => `${ORIGIN}/api/image/${props.fileNo}`);

    const subSlots = computed(() => {
      const base = (props.subs ?? []).slice(0, 4);
      return Array.from({ length: 4 }, (_, i) => base[i] ?? null);
    });

    const subUrl = (s: SubDto) => {
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
    <div class="grid grid-cols-1 md:grid-cols-2 gap-[8px] w-full">
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
  `,
});
</script>
