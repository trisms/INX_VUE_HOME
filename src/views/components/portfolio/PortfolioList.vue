<template>
  <div
      class="bg-white content-stretch flex flex-col gap-[20px] items-center px-[28px] py-[40px] relative size-full"
      data-name="프로젝트 구분-배경"
  >
    <!-- Sticky Filter (구조 유지) -->
    <ProjectTags
        className="shrink-0 sticky top-0 w-full max-w-[1280px]"
        v-model="selectedTags"
    />

    <!-- (선택) 로딩/에러: 레이아웃 깨지지 않게 가볍게만 -->
    <div v-if="loading" class="w-full max-w-[1280px] text-[14px] text-[#353841]">
      불러오는 중...
    </div>
    <div v-else-if="error" class="w-full max-w-[1280px] text-[14px] text-red-500">
      {{ error }}
    </div>

    <!-- Grid (구조 유지) -->
    <div
        v-else
        class="cursor-pointer grid gap-[16px] max-w-[1280px] w-full relative shrink-0
             grid-cols-1 md:grid-cols-3 lg:grid-cols-4"
        data-name="프로젝트"
    >
      <ProjectCard
          v-for="p in filteredProjects"
          :key="p.id"
          :project="p"
          :size="size"
          :showImg="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed } from "vue";
import ProjectCard from "@/views/components/portfolio/project/ProjectCard.vue";
import ProjectTags from "@/views/components/portfolio/project/ProjectTags.vue";
const API_BASE = import.meta.env.VITE_API_BASE_URL as string; // http://localhost:8080/api
import { http } from "@/lib/http";

/* ================= Types (기존 구조 유지) ================= */
type Size = "Desktop" | "Tablet" | "Mobile";
type MetaRow = { k: string; v: string };
type Tag = "UXUI 디자인" | "디자인컨설팅" | "공공디자인" | "안전디자인";

/** ProjectCard에서 hero 타입을 "p|p1|p2|p3"로 강제하므로 그대로 맞춤 */
type Hero = "1" | "2" | "3" | "4";

type Project = {
  id: string;
  title: string;
  subtitle: string;
  filePath: string;
  meta: MetaRow[];
  hero: Hero;
  categoryType: TagCode;
};

/** DB select 기준 */
type PortfolioFile = {
  fileName: string;
  fileOriginName: string;
  fileNo: number;
  dataStatus: number;
  fileSize: number;
  filePath: string;
  enabled: string; // 'Y' | 'N' or '1'/'0'
  insertDate: string;
  putUserId: string;
  updateDate?: string | null;
  modUserId?: string | null;
  categoryType : string | null;
};

/** API 응답 형태: { result:"200", list:[...] } */
type ApiListResponse = {
  result: string;
  list: PortfolioFile[];
};
type TagCode = "1" | "2" | "3" | "4";

const selectedTags = ref<TagCode[]>([]);
/* ================= State ================= */
const projects = ref<Project[]>([]);

const loading = ref(false);
const error = ref<string | null>(null);

const size = ref<Size>("Desktop");

/* ================= Responsive ================= */
function calcSize() {
  const w = window.innerWidth;
  if (w < 768) size.value = "Mobile";
  else if (w < 1024) size.value = "Tablet";
  else size.value = "Desktop";
}

function toTagLabel(ct: TagCode) {
  switch (ct) {
    case "1": return "UXUI 디자인";
    case "2": return "디자인컨설팅";
    case "3": return "공공디자인";
    case "4": return "안전디자인";
  }
}

/* ================= Mapping (DB -> UI Project) ================= */
function toYear(insertDate: string) {
  return insertDate?.slice(0, 4) || "-";
}

/*function toTagFromFile(f: PortfolioFile): Tag {
  const s = `${f.fileName ?? ""} ${f.fileOriginName ?? ""}`.toLowerCase();

  // 🔧 규칙은 너 파일명/원본명 컨벤션에 맞게 바꾸면 됨
  if (s.includes("ux") || s.includes("ui")) return "UXUI 디자인";
  if (s.includes("컨설팅") || s.includes("consult")) return "디자인컨설팅";
  if (s.includes("공공")) return "공공디자인";
  if (s.includes("안전")) return "안전디자인";

  return "UXUI 디자인";
}*/

function pickHero(f: PortfolioFile): Hero {
  // ✅ hero는 프로젝트 카드 placeholder 선택용으로만 쓰이고(현재 이미지 실제 출력 안함)
  // fileNo로 고르게 분산해도 되고, 파일명 기반으로 분류해도 됨.
  const n = Number(f.fileNo ?? 0);
  const m = ((n % 4) + 4) % 4;
  return (["1", "2", "3", "4"][m] as Hero) ?? "1";
}

function toProject(f: PortfolioFile): Project {
  const ct = (f.categoryType ?? "1") as TagCode;

  return {
    id: String(f.fileNo),
    title: f.fileName ?? `Portfolio #${f.fileNo}`,
    subtitle: f.fileOriginName ?? "",
    filePath: f.filePath,
    meta: [
      { k: "Year:", v: toYear(f.insertDate) },
      { k: "고객사:", v: "-" },
      { k: "Scope of Work:", v: toTagLabel(ct) }, // 라벨 표시용
      { k: "Industry:", v: "-" },
    ],
    hero: pickHero(f),
    categoryType: ct,
  };
}

/* ================= Fetch ================= */
async function loadProjects() {
  loading.value = true;
  error.value = null;

  try {
    // GET /portfolio/list (백엔드가 이 구조로 내려준다고 했음)
    const { data } = await http.get<ApiListResponse>(`${API_BASE}/api/portfolio/list`);
    const rows = Array.isArray(data?.list) ? data.list : [];


    // 필요하면 enabled/dataStatus 필터를 여기서 추가
    const filtered = rows.filter((r) => String(r.dataStatus) === "1");
    projects.value = filtered.map(toProject);
  } catch (e: any) {
    error.value = e?.message ?? "포트폴리오 목록을 불러오지 못했어요.";
    projects.value = [];
  } finally {
    loading.value = false;
  }
}

/* ================= Filter ================= */
const filteredProjects = computed(() => {
  if (selectedTags.value.length === 0) return projects.value;
  return projects.value.filter((p) => selectedTags.value.includes(p.categoryType));
});

/* ================= Lifecycle ================= */
onMounted(() => {
  calcSize();
  window.addEventListener("resize", calcSize, { passive: true });

  loadProjects(); // ✅ DB 연동
});

onBeforeUnmount(() => window.removeEventListener("resize", calcSize));
</script>

<style scoped>
.content-stretch { width: 100%; }
.size-full { width: 100%; height: 100%; }
</style>
