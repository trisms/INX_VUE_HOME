<template>
  <section class="bg-white py-[120px]">
    <div class="max-w-[1280px] mx-auto px-[28px]">
      <!-- ===== Header ===== -->
      <div class="border-b border-[#dadde1] pb-[40px] text-center">
        <p class="text-[#9763f0] text-[18px] tracking-[-0.54px]">PORTFOLIO</p>
        <p class="text-[#111217] text-[40px] tracking-[-1.2px]">INX의 포트폴리오</p>

        <!-- ===== Tags ===== -->
        <div class="max-w-[1280px] relative shrink-0 w-full" data-name="tags">
          <div class="flex flex-row items-center justify-center max-w-[inherit] w-full">
            <div
                class="content-stretch cursor-pointer flex flex-wrap gap-[7px]
                     items-center justify-center max-w-[inherit] px-[28px] relative w-full min-w-0"
            >
              <button
                  v-for="cat in categories"
                  :key="cat"
                  type="button"
                  class="tag-btn"
                  :class="{ 'is-active': selectedCats.has(cat) }"
                  @click="toggleCat(cat)"
              >
                <span class="tag-text">{{ cat }}</span>
              </button>

              <!-- 선택해제 버튼이 필요하면 주석 해제 -->
              <!--
              <button
                v-if="selectedCats.size"
                type="button"
                class="tag-btn tag-btn--ghost"
                @click="clearCats"
              >
                <span class="tag-text">선택해제</span>
              </button>
              -->
            </div>
          </div>
        </div>
      </div>

      <!-- ===== Rolling Projects ===== -->
      <div class="bg-white content-stretch flex flex-col gap-[40px] items-center relative min-h-screen" data-name="Projects">
        <div class="relative shrink-0 w-full" data-name="text">
          <div class="flex flex-col items-center w-full">
            <div class="content-stretch flex flex-col gap-[8px] items-center pb-[40px] px-[28px] relative w-full"></div>
          </div>
        </div>

        <div class="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full" data-name="Projects">
          <!-- 로딩/에러 -->
          <p v-if="loading" class="w-full text-center text-[#747985] text-[14px]">
            불러오는 중...
          </p>
          <p v-else-if="error" class="w-full text-center text-red-500 text-[14px]">
            {{ error }}
          </p>

          <template v-else>
            <!-- 1st row: L -> R -->
            <div class="proj-row proj-row--ltr">
              <div
                  ref="track1Ref"
                  class="proj-track"
                  :style="{ '--dur': `${dur1}s` }"
                  aria-label="Portfolio rolling row 1"
              >
                <template v-for="it in loopRow1" :key="it._key">
                  <!-- ✅ 1개일 때 트랙 길이 확보용 spacer -->
                  <div
                      v-if="it.__type === 'spacer'"
                      class="proj-spacer"
                      :style="{ width: `${it.w}px` }"
                      aria-hidden="true"
                  />
                  <router-link
                      v-else
                      class="proj-card"
                      :class="`proj-card--${it.variant}`"
                      :to="`/portfolio/${it.id}`"
                  >
                    <div class="thumb" :class="`thumb--${it.variant}`">
                      <img
                          v-if="it.img"
                          :src="it.img"
                          alt=""
                          @error="onImgError($event)"
                      />
                      <div v-else class="thumb-placeholder"></div>
                    </div>

                    <div class="meta">
                      <p class="cat">{{ it.cat }}</p>
                      <p class="title">{{ it.title }} </p>
                    </div>
                  </router-link>
                </template>
              </div>
            </div>

            <!-- 2nd row: R -> L -->
            <div v-if="showSecondRow" class="proj-row proj-row--rtl">
              <div
                  ref="track2Ref"
                  class="proj-track"
                  :style="{ '--dur': `${dur2}s` }"
                  aria-label="Portfolio rolling row 2"
              >
                <template v-for="it in loopRow2" :key="it._key">
                  <div
                      v-if="it.__type === 'spacer'"
                      class="proj-spacer"
                      :style="{ width: `${it.w}px` }"
                      aria-hidden="true"
                  />
                  <router-link
                      v-else
                      class="proj-card"
                      :class="`proj-card--${it.variant}`"
                      :to="`/portfolio/${it.id}`"
                  >
                    <div class="thumb" :class="`thumb--${it.variant}`">
                      <img
                          v-if="it.img"
                          :src="it.img"
                          alt=""
                          @error="onImgError($event)"
                      />
                      <div v-else class="thumb-placeholder"></div>
                    </div>

                    <div class="meta">
                      <p class="cat">{{ it.cat }}</p>
                      <p class="title">{{ it.title }}</p>
                    </div>
                  </router-link>
                </template>
              </div>
            </div>

            <!-- 필터 결과 0개 안내 -->
            <p v-if="filteredProjects.length === 0" class="w-full text-center text-[#747985] text-[14px]">
              선택한 카테고리에 해당하는 포트폴리오가 없습니다.
            </p>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { http } from "@/lib/http";

const dur1 = 50; // 1줄 속도(초) 숫자↑ 느림
const dur2 = 50; // 2줄 속도(초)

type Variant = "wide" | "tall";

type ProjectItem = {
  id: string;     // /portfolio/:id 로 이동 (fileNo 매핑)
  title: string;
  cat: string;    // 카테고리(필터 기준)
  img: string;    // 없으면 "" -> placeholder
  variant: Variant;
};

const categories = ["UXUI 디자인", "디자인컨설팅", "공공디자인", "안전디자인"] as const;

const selectedCats = ref<Set<string>>(new Set());

function toggleCat(cat: string) {
  const next = new Set(selectedCats.value);
  if (next.has(cat)) next.delete(cat);
  else next.add(cat);
  selectedCats.value = next;
}
function clearCats() {
  selectedCats.value = new Set();
}

/* ================== DB 응답 타입 (아까 select 기준) ================== */
type PortfolioFile = {
  fileName: string;
  fileOriginName: string;
  fileNo: number;
  dataStatus: number;
  fileSize: number;
  filePath: string;
  enabled: string;
  insertDate: string;
  putUserId: string;
  updateDate?: string | null;
  modUserId?: string | null;
  categoryType: string | null;
};

type ApiListResponse = {
  result: string;
  list: PortfolioFile[];
};

/* ================== 상태 ================== */
const projects = ref<ProjectItem[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

/* ================== (임시) category 매핑 규칙 ==================
   USER_FILE에는 category가 없으니 일단 파일명/원본명에 키워드로 분류.
   네 컨벤션에 맞게 조건을 바꾸면 됨.
*/
function toCat(f: PortfolioFile): (typeof categories)[number] {

  const ct = (f.categoryType ?? "").toLowerCase();

  // ✅ 1순위: DB categoryType 매핑
  switch (ct) {
    case "1": return "UXUI 디자인";
    case "2": return "디자인컨설팅";
    case "3": return "공공디자인";
    case "4": return "안전디자인";
  }


  const s = `${f.fileName ?? ""} ${f.fileOriginName ?? ""}`.toLowerCase();
  if (s.includes("ux") || s.includes("ui")) return "UXUI 디자인";
  if (s.includes("컨설팅") || s.includes("consult")) return "디자인컨설팅";
  if (s.includes("공공")) return "공공디자인";
  if (s.includes("안전")) return "안전디자인";
  if (s.includes("안전")) return "안전디자인";


  return "UXUI 디자인";
}

/* img: filePath가 웹에서 접근 가능한 URL일 때만 의미 있음.
   로컬경로면 img가 깨지니 ""로 두면 placeholder가 뜸.
*/
const API_BASE = import.meta.env.VITE_API_BASE_URL as string; // http://localhost:8080/api

function toImg(f: PortfolioFile): string {
  // ✅ 같은 api 사용: /api/image/{fileNo}
  // fileNo가 없으면 빈칸 -> placeholder
  const id = f.fileNo;
  if (!id) return "";
  //return `${API_BASE}/image/${id}`;
  return `http://210.126.2.153:8080/api/image/${id}`;
}
function toVariant(f: PortfolioFile): Variant {
  // 파일명 기반으로 wide/tall 정하고 싶으면 여기서 규칙 추가 가능
  const n = Number(f.fileNo ?? 0);
  return n % 3 === 0 ? "tall" : "wide";
}

function toProjectItem(f: PortfolioFile): ProjectItem {
  return {
    id: String(f.fileNo),
    title: f.fileName || `Portfolio #${f.fileNo}`,
    cat: toCat(f),
    img: toImg(f),
    variant: toVariant(f),
  };
}

/* ================== API 호출 (더미 -> DB) ================== */
async function loadProjects() {
  loading.value = true;
  error.value = null;
  try {
    const { data } = await http.get<ApiListResponse>("http://210.126.2.153:8080/api/portfolio/list");
    const rows = Array.isArray(data?.list) ? data.list : [];

    // 필요하면 enabled/dataStatus 필터 여기서
    const alive = rows.filter((r) => String(r.dataStatus) === "1");
    projects.value = alive.map(toProjectItem);
  } catch (e: any) {
    error.value = e?.message ?? "포트폴리오를 불러오지 못했어요.";
    projects.value = [];
  } finally {
    loading.value = false;
  }
}

/** 필터: 선택 없으면 전체 */
const filteredProjects = computed<ProjectItem[]>(() => {
  const set = selectedCats.value;
  if (set.size === 0) return projects.value;
  return projects.value.filter((p) => set.has(p.cat));
});

/** 이미지 로딩 실패도 placeholder로 */
function onImgError(e: Event) {
  const el = e.target as HTMLImageElement | null;
  if (!el) return;
  el.style.display = "none";
  const parent = el.parentElement;
  if (parent && !parent.querySelector(".thumb-placeholder")) {
    const div = document.createElement("div");
    div.className = "thumb-placeholder";
    parent.appendChild(div);
  }
}

/** 트랙 길이 계산용 */
const track1Ref = ref<HTMLElement | null>(null);
const track2Ref = ref<HTMLElement | null>(null);

const repeat1 = ref(2);
const repeat2 = ref(2);

const showSecondRow = ref(true);
const spacerW = ref(0);

function getAvgCardWidth(list: ProjectItem[]) {
  if (list.length === 0) return 320 + 16;
  const sum = list.reduce((acc, p) => acc + (p.variant === "wide" ? 320 : 280), 0);
  return sum / list.length + 16;
}

function calcRepeat(trackEl: HTMLElement | null, list: ProjectItem[], minRepeat = 2) {
  if (!trackEl) return minRepeat;
  const rowEl = trackEl.parentElement as HTMLElement | null;
  if (!rowEl) return minRepeat;

  const viewport = rowEl.clientWidth;
  const avg = getAvgCardWidth(list);
  const baseLen = Math.max(1, list.length) * avg;

  const need = Math.ceil((viewport * 3) / baseLen);
  return Math.max(minRepeat, need);
}

function estimateRowFilled(list: ProjectItem[], viewport: number) {
  if (list.length < 2) return false;
  const avg = getAvgCardWidth(list);
  const baseLen = list.length * avg;
  return baseLen >= viewport * 1.2;
}

type LoopCard = ProjectItem & { __type?: "card"; _dup: number; _key: string };
type LoopSpacer = { __type: "spacer"; w: number; _key: string };
type LoopItem = LoopCard | LoopSpacer;

function buildLoop(list: ProjectItem[], repeat: number): LoopItem[] {
  const out: ProjectItem[] = [];
  for (let r = 0; r < repeat; r++) out.push(...list);

  return out.map((p, idx) => ({
    ...p,
    __type: "card",
    _dup: idx,
    _key: `card-${p.id}-${idx}`,
  }));
}

function buildLoopWithSpacer(list: ProjectItem[]): LoopItem[] {
  const only = list[0];
  if (!only) return [];

  const spacer: LoopSpacer = { __type: "spacer", w: spacerW.value, _key: `spacer-${spacerW.value}` };
  const card: LoopCard = { ...only, __type: "card", _dup: 0, _key: `single-${only.id}` };

  return [card, spacer, card, spacer].map((it, idx) => ({ ...it, _key: `${(it as any)._key}-${idx}` } as any));
}

const loopRow1 = computed<LoopItem[]>(() => {
  const list = filteredProjects.value;
  if (list.length === 1) return buildLoopWithSpacer(list);
  return buildLoop(list, repeat1.value);
});

const loopRow2 = computed<LoopItem[]>(() => {
  const list = filteredProjects.value;
  if (list.length === 1) return buildLoopWithSpacer(list);
  const reversed = [...list].reverse();
  return buildLoop(reversed, repeat2.value);
});

async function updateRepeats() {
  await Promise.resolve();

  const list = filteredProjects.value;
  const rowEl = track1Ref.value?.parentElement as HTMLElement | null;
  const vw = rowEl?.clientWidth ?? 1200;

  showSecondRow.value = estimateRowFilled(list, vw);

  if (list.length === 1) {
    showSecondRow.value = false;
    spacerW.value = Math.ceil(vw * 2.2);
    repeat1.value = 2;
    repeat2.value = 2;
    return;
  }

  spacerW.value = 0;
  repeat1.value = calcRepeat(track1Ref.value, list, 2);
  repeat2.value = calcRepeat(track2Ref.value, list, 2);
}

let onResize: (() => void) | null = null;

onMounted(() => {
  loadProjects(); // ✅ 더미 -> DB 조회로 변경
  updateRepeats();

  onResize = () => updateRepeats();
  window.addEventListener("resize", onResize, { passive: true });
});

onBeforeUnmount(() => {
  if (onResize) window.removeEventListener("resize", onResize);
});

watch(filteredProjects, () => {
  updateRepeats();
});
</script>

<style scoped>
/* ===== Tag buttons ===== */
.tag-btn{
  border: 1px solid #dadde1;
  background: #fff;
  color:#353841;
  border-radius: 999px;
  padding: 6px 12px;
  line-height: 1;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  user-select:none;
  transition: background .18s ease, border-color .18s ease, color .18s ease;
}
.tag-btn:hover{ border-color:#b9c0c9; }
.tag-btn.is-active{
  background: #e5e8ff;
  border-color: #2f6bff;
  color: #2f2f7a;
}
.tag-btn--ghost{ border-style:dashed; }
.tag-text{
  font-size:18px;
  letter-spacing:-0.54px;
  font-family: Pretendard, system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans KR", Arial, sans-serif;
}

/* ===== Rolling rows ===== */
:root{ --thumb-radius: 14px; }

.proj-row{
  width:100%;
  overflow:hidden;
  position:relative;
  padding: 4px 0;
  background:#ffffff;
}

.proj-track{
  display:flex;
  gap:16px;
  width:max-content;
  will-change: transform;
  animation: marquee var(--dur, 28s) linear infinite;
}

.proj-card{
  flex:0 0 auto;
  border-radius: var(--thumb-radius);
  overflow:hidden;
  background:#ffffff;
  border:none;
  box-shadow:none;
  display:block;
}

.proj-card--wide{ width: 320px; }
.proj-card--tall{ width: 280px; }

.proj-spacer{
  flex: 0 0 auto;
  height: 1px;
}

.thumb{
  border-radius: var(--thumb-radius);
  overflow:hidden;
  background:#f1f3f6;
}
.thumb img{
  width:100%;
  height:100%;
  display:block;
  border-radius: var(--thumb-radius);
}

.thumb--wide{ aspect-ratio: 16 / 9; }
.thumb--wide img{ object-fit: cover; object-position: center; }

.thumb--tall{
  aspect-ratio: 16 / 9;
  background:#f0f3f6;
}
.thumb--tall img{
  object-fit: contain;
  object-position: center;
  background:#f0f3f6;
}

.thumb-placeholder{
  width:100%;
  height:100%;
  border-radius: var(--thumb-radius);
  background: linear-gradient(135deg, #eef1f4, #e5e9ee);
}

.meta{ padding: 12px 12px 14px; background:#fff; }
.cat{ margin:0; font-size:12px; color:#747985; }
.title{
  margin:6px 0 0;
  font-size:16px;
  font-weight:800;
  color:#111217;
  letter-spacing:-0.3px;
  line-height:1.35;
  display:-webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow:hidden;
}

@keyframes marquee{
  from{ transform: translate3d(0,0,0); }
  to  { transform: translate3d(-50%,0,0); }
}
.proj-row--ltr .proj-track{ animation-direction: reverse; }
.proj-row--rtl .proj-track{ animation-direction: normal; }
.proj-row:hover .proj-track{ animation-play-state: paused; }

@media (max-width: 799px){
  .proj-row--rtl{ display:none; }
  .min-h-screen{ min-height: 35vh; }
  .tag-text{ font-size:16px; }
  .proj-card--wide{ width: 260px; }
  .proj-card--tall{ width: 230px; }
}
@media (max-width: 420px){
  .proj-card--wide{ width: 230px; }
  .proj-card--tall{ width: 210px; }
}
</style>
