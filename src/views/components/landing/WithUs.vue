<template>
  <section class="page" data-name="고객사">
    <!-- Title -->
    <div class="text" data-name="text">
      <p class="kicker">CLIENTS</p>
      <p class="title">INX와 함께한 클라이언트</p>
    </div>

    <!-- Grid -->
    <div class="frame">
      <div class="grid">
        <Logo
            v-for="(item, i) in displayItems"
            :key="`${item}-${i}`"
            class="cell"
            :name="item"
            :src="srcMap[item] ?? null"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

type LogoType =
    | "blank"
    | "wezon"
    | "kepco"
    | "kmd"
    | "apro"
    | "navien"
    | "drv"
    | "lexis"
    | "hanwha"
    | "exem"
    | "manna"
    | "한인진"
    | "sh"
    | "mworld"
    | "milre"
    | "dgo"
    | "oplatform"
    | "woorien";

/** 실제 로고 목록(여기만 늘어나도 됨) */
const gridItems = ref<LogoType[]>([
  "wezon",
  "kepco",
  "kmd",
  "apro",
  "navien",
  "drv",
  "lexis",
  "hanwha",
  "exem",
  "manna",
  "한인진",
]);

/** ✅ 이미지는 나중에 따로 받는다 했으니 맵만 준비(없으면 null이면 빈칸 유지) */
const srcMap = ref<Record<LogoType, string | null>>({
  blank: null,
  wezon: null,
  kepco: null,
  kmd: null,
  apro: null,
  navien: null,
  drv: null,
  lexis: null,
  hanwha: null,
  exem: null,
  manna: null,
  "한인진": null,
  sh: null,
  mworld: null,
  milre: null,
  dgo: null,
  oplatform: null,
  woorien: null,
});

/** ✅ 현재 열 수(모바일 2, 데스크탑 4) */
const cols = ref(2);
let mql: MediaQueryList | null = null;

function setCols() {
  cols.value = window.matchMedia("(min-width: 768px)").matches ? 4 : 2;
}

/** ✅ 핵심: 아이템 개수를 cols의 배수로 맞추기 위해 빈칸 패딩 */
const displayItems = computed<LogoType[]>(() => {
  const list = [...gridItems.value];
  const c = cols.value;
  const mod = list.length % c;
  const need = mod === 0 ? 0 : c - mod;
  for (let i = 0; i < need; i++) list.push("blank");
  return list;
});

/** 내부 컴포넌트 */
const Logo = defineLogo();

function defineLogo() {
  return {
    name: "Logo",
    props: {
      class: { type: String, default: "" },
      name: { type: String as () => LogoType, required: true },
      src: { type: String, default: null },
    },
    setup(props: any) {
      const failed = ref(false);

      const currentSrc = computed(() => {
        if (props.name === "blank") return null;
        if (failed.value) return null;
        return props.src || null;
      });

      const onError = () => (failed.value = true);

      return { currentSrc, onError };
    },
    template: `
      <div :class="['logo', $props.class]">
      <div class="inner">
        <img
            v-if="currentSrc"
            :src="currentSrc"
            alt=""
            class="img"
            @error="onError"
        />
      </div>
      <div aria-hidden="true" class="cellBorder"></div>
      </div>
    `,
  };
}

onMounted(() => {
  setCols();
  mql = window.matchMedia("(min-width: 768px)");
  const onChange = () => setCols();
  if (mql.addEventListener) mql.addEventListener("change", onChange);
  else mql.addListener(onChange as any);
});

onBeforeUnmount(() => {
  if (!mql) return;
  const onChange = () => setCols();
  if (mql.removeEventListener) mql.removeEventListener("change", onChange);
  else mql.removeListener(onChange as any);
});
</script>

<style scoped>
 ::before, ::after {
  /* box-sizing: border-box; */
  border-style: solid;

}

.page{
  background:#fff;
  width:100%;
  padding:40px 28px 80px;
  display:flex;
  flex-direction:column;
  gap:12px;
  align-items:center;
  font-family: Pretendard, system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans KR", Arial, sans-serif;
}

.text{
  width:100%;
  display:flex;
  flex-direction:column;
  gap:8px;
  align-items:center;
  line-height:1.4;
  font-weight:700;
}
.kicker{
  color:#9763f0;
  font-size:18px;
  letter-spacing:-0.54px;
  margin:0;
}
.title{
  color:#111217;
  font-size:40px;
  font-weight:700;
  letter-spacing:-1.2px;
  text-align:center;
  margin:0;
}

.frame{
  width:100%;
  max-width:1224px;
  border-radius:12px;
  overflow:hidden;      /* ✅ 라운드 깨짐 방지 */
  background:#fff;
}

.grid{
  display: grid;
  gap: 0;
  border: 1px solid #f6f7f9;
  border-radius: 11px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  background: #fff;
}

@media (min-width:768px){
  .grid{ grid-template-columns: repeat(4, minmax(0,1fr)); }
}

.logo{
  position: relative;
  height: 64px;
  background: #fafcfe;
  border-width: 1px;
  border-color: #f6f7f9;
}

.inner{
  width:100%;
  height:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  padding: 16px 24px;
  box-sizing:border-box;
}

.img{
  width:100%;
  height:100%;
  object-fit:contain;
}

/* ✅ 셀 내부 라인 */
.cellBorder{
  position:absolute;
  inset:0;
  border-right: 1px solid #dddddd !important;
  border-bottom: 1px solid #dddddd !important;
  pointer-events:none;
  box-sizing: border-box;
}

/* 모바일(2열): 2번째 열 right 제거 */
.grid > *:nth-child(2n) .cellBorder{ border-right:0; }

/* 데스크탑(4열): 4번째 열 right 제거 */
@media (min-width:768px){
  .grid > *:nth-child(4n) .cellBorder{ border-right:0; }
}
@media (max-width:438px){
  .title{
    font-size:28px;
  }
}

/* ✅ 마지막 행 bottom 제거: 이제 “항상 마지막 행이 꽉 차게 패딩”되므로 정확히 동작 */
.grid > *:nth-last-child(-n + 2) .cellBorder{ border-bottom:0; }
@media (min-width:768px){
  .grid > *:nth-last-child(-n + 4) .cellBorder{ border-bottom:0; }
}

</style>
