<template>
  <div
      class="content-stretch flex flex-col gap-[120px] items-center relative size-full"
      style="margin-top: 30px"
      data-name="Projects"
  >
    <section class="bg-white w-full max-w-[375px] md:max-w-[900px] lg:max-w-[1224px] rounded-[20px]">
      <div
          class="flex flex-col gap-[36px] px-[18px] py-[32px]
               md:flex-row md:gap-[16px]
               lg:px-[24px] lg:py-[60px]"
      >
        <!-- 로딩/에러 -->
        <p v-if="loading" class="w-full text-center text-[#747985] text-[14px]">
          불러오는 중...
        </p>
        <p v-else-if="error" class="w-full text-center text-red-500 text-[14px]">
          {{ error }}
        </p>

        <!-- 데이터 -->
        <template v-else-if="detail">
          <div class="w-full md:w-[342px] flex flex-col gap-[20px]">
            <ProjectTitle :title="detail.fileName" :subtitle="detail.fileOriginName || ''" />
            <ProjectMeta :meta="metaRows" />
          </div>

          <!-- ✅ fileNo로 이미지 호출 -->
          <ProjectImages :file-no="detail.fileNo" :subs="subs" />
        </template>

        <!-- detail이 null인데 loading도 아닌 경우 -->
        <p v-else class="w-full text-center text-[#747985] text-[14px]">
          데이터가 없습니다.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, onMounted, PropType, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { http } from "@/lib/http";


type SubImage = {
  subFileNo: number;
};


const subs = ref<SubImage[]>([]);
const API_BASE = import.meta.env.VITE_API_BASE_URL as string; // http://localhost:8080/api

type MetaRow = { k: string; v: string };

type FileDetail = {
  fileNo: number;
  fileName: string;
  fileOriginName: string;
  insertDate?: string | null;
  categoryType?: string | number | null; // 1~4
  // 있으면 더 추가 가능
};

type ApiDetailResponse = {
  result: string;
  file: FileDetail;
  subs?: SubImage[]; // ✅ 추가
};

const route = useRoute();
const fileNo = computed(() => Number(route.params.id));

const loading = ref(false);
const error = ref<string | null>(null);
const detail = ref<FileDetail | null>(null);

function toYear(d?: string | null) {
  return d?.slice(0, 4) || "-";
}
function toScope(ct?: string | number | null) {
  switch (String(ct ?? "")) {
    case "1": return "UXUI 디자인";
    case "2": return "디자인컨설팅";
    case "3": return "공공디자인";
    case "4": return "안전디자인";
    default: return "-";
  }
}

const metaRows = computed<MetaRow[]>(() => {
  if (!detail.value) return [];
  return [
    { k: "Year:", v: toYear(detail.value.insertDate) },
    { k: "고객사:", v: "-" }, // 필드 생기면 연결
    { k: "Scope of Work:", v: toScope(detail.value.categoryType) },
    { k: "Industry:", v: "-" }, // 필드 생기면 연결
  ];
});

async function loadDetail() {
  if (!Number.isFinite(fileNo.value)) return;

  loading.value = true;
  error.value = null;
  detail.value = null;
  subs.value = [];

  try {
    const { data } = await http.get<ApiDetailResponse>(`${API_BASE}/api/portfolio/detail`, {
      params: { fileNo: fileNo.value },
    });

    if (String(data?.result) !== "200" || !data?.file) {
      throw new Error("상세 데이터를 찾지 못했어요.");
    }

    detail.value = data.file;
    subs.value = Array.isArray(data.subs) ? data.subs.slice(0, 4) : []; // ✅ 최대 4개
  } catch (e: any) {
    error.value = e?.message ?? "상세 정보를 불러오지 못했어요.";
  } finally {
    loading.value = false;
  }
}


onMounted(loadDetail);
watch(fileNo, () => loadDetail());

/* ================= 내부 컴포넌트들 (너가 준 방식 그대로 유지) ================= */

/* 타이틀 */
const ProjectTitle = defineComponent({
  name: "ProjectTitle",
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
  },
  template: `
    <div class="flex flex-col gap-[8px]">
    <p class="font-bold text-[32px] tracking-[-0.96px] text-[#111217]">
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
  props: {
    class: { type: String, default: "" },
  },
  template: `
    <div :class="['bg-[#f0f3f6] rounded-[12px] relative overflow-hidden', $props.class]">
    <div class="absolute inset-0 border border-[#f0f3f6] rounded-[12px] pointer-events-none"></div>
    </div>
  `,
});

/* 이미지 영역: 기존 3단 레이아웃 유지 + HERO만 API로 */
const ProjectImages = defineComponent({
  name: "ProjectImages",
  components: { Frame },
  props: {
    fileNo: { type: Number, required: true },
    subs: { type: Array as PropType<{ subFileNo: number }[]>, default: () => [] }, // ✅ 추가
  },
  setup(props) {
    const imgFailed = ref(false);

    // ✅ 메인
    const heroImg = computed(() => `${API_BASE}/api/image/${props.fileNo}`);

    console.log(props.fileNo)
    console.log(props.subs)

    // ✅ 서브: 4칸 고정으로 맞춤
    const subSlots = computed(() => {
      const arr = (props.subs || []).slice(0, 4);
      // 길이 4로 패딩
      while (arr.length < 4) arr.push(null as any);
      return arr;
    });


    // ✅ 서브 URL
    const subUrl = (subFileNo: number) =>
        `${API_BASE}/api/sub/image/${encodeURIComponent(String(subFileNo))}`;
    function onHeroError() {
      imgFailed.value = true;
    }

    return { heroImg, imgFailed, onHeroError, subSlots, subUrl };
  },
  template: `
    <div class="w-full md:flex-1 flex flex-col gap-[8px]" data-name="imgs">

    <!-- ✅ 모바일: < md -->
    <div class="flex flex-col gap-[8px] md:hidden">
      <!-- HERO -->
      <div class="relative bg-[#f0f3f6] w-full aspect-[818/460] rounded-[12px] overflow-hidden">
        <img v-if="!imgFailed" :src="heroImg" class="absolute inset-0 w-full h-full object-cover" alt="" @error="onHeroError" />
        <Frame v-else class="absolute inset-0" />
      </div>

      <!-- SUB 4 -->
      <div v-for="(s, i) in subSlots" :key="i"
           class="relative bg-[#f0f3f6] w-full aspect-[818/460] rounded-[12px] overflow-hidden">
        <img v-if="s && s.subFileNo"
             :src="subUrl(s.subFileNo)"
             class="absolute inset-0 w-full h-full object-cover"
             alt=""
             @error="$event.target.style.display='none'" />
        <Frame class="absolute inset-0" />
      </div>
    </div>

    <!-- ✅ 테블릿: md ~ < lg -->
    <div class="hidden md:flex lg:hidden flex-col gap-[8px] w-full">
      <!-- HERO -->
      <div class="relative bg-[#f0f3f6] w-full aspect-[818/460] rounded-[12px] overflow-hidden">
        <img v-if="!imgFailed" :src="heroImg" class="absolute inset-0 w-full h-full object-cover" alt="" @error="onHeroError" />
        <Frame v-else class="absolute inset-0" />
      </div>

      <!-- SUB 4 (2x2) -->
      <div class="grid grid-cols-2 gap-[8px] w-full">
        <div v-for="(s, i) in subSlots" :key="i"
             class="relative bg-[#f0f3f6] aspect-[818/460] rounded-[12px] overflow-hidden">
          <img v-if="s && s.subFileNo"
               :src="subUrl(s.subFileNo)"
               class="absolute inset-0 w-full h-full object-cover"
               alt=""
               @error="$event.target.style.display='none'" />
          <Frame class="absolute inset-0" />
        </div>
      </div>
    </div>

    <!-- ✅ 데스크탑: >= lg -->
    <div class="hidden lg:flex lg:flex-col lg:gap-[8px]">
      <!-- HERO -->
      <div class="relative bg-[#f0f3f6] h-[460px] w-[818px] rounded-[12px] overflow-hidden">
        <img v-if="!imgFailed" :src="heroImg" class="absolute inset-0 w-full h-full object-cover" alt="" @error="onHeroError" />
        <Frame v-else class="absolute inset-0" />
      </div>

      <!-- SUB 4 (2x2) -->
      <div class="grid grid-cols-2 gap-[8px] w-full">
        <div v-for="(s, i) in subSlots" :key="i"
             class="relative bg-[#f0f3f6] aspect-[818/460] rounded-[12px] overflow-hidden">
          <img v-if="s && s.subFileNo"
               :src="subUrl(s.subFileNo)"
               class="absolute inset-0 w-full h-full object-cover"
               alt=""
               @error="$event.target.style.display='none'" />
          <Frame class="absolute inset-0" />
        </div>
      </div>
    </div>

    </div>
  `,
});

</script>
