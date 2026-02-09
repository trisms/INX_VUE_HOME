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
        <!-- 4 x 3 = 12칸 중 11개만 (원본처럼 마지막 1칸 비움) -->
        <Logo v-for="(item, i) in gridItems" :key="i" class="cell" :property1="item" />
      </div>
      <div aria-hidden="true" class="frameBorder" />
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * Vue 3 + <script setup> 단일 페이지
 * - 이미지가 없거나 import 실패/로딩 실패여도 에러 없이 넘어가게 처리
 * - figma:asset 경로는 해당 환경에서만 동작할 수 있음(없으면 그냥 빈칸)
 */
import { computed, ref } from "vue";

// ===== 안전한 이미지 로딩 (import 실패해도 앱 안 죽게) =====
async function safeImport(path: string): Promise<string | null> {
  try {
    const mod = await import(/* @vite-ignore */ path);
    return (mod as any)?.default ?? null;
  } catch {
    return null;
  }
}

const src = ref<Record<string, string | null>>({
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

// figma asset들 (없으면 null 유지)
Promise.all([
  safeImport("figma:asset/f77552c9a9f4aacc9e880283e9a6358e309d8958.png").then(v => (src.value.wezon = v)),
  safeImport("figma:asset/55aaa5f420f5836b4b9bcb179a11173ba81ebad2.png").then(v => (src.value.kepco = v)),
  safeImport("figma:asset/2ed37f911281fbc286922252824af23f428bea8d.png").then(v => (src.value.kmd = v)),
  safeImport("figma:asset/56819956dc47444cf32ca28ab26806a2a510888d.png").then(v => (src.value.apro = v)),
  safeImport("figma:asset/85ecbd86bc3e369ea574f51c8cb3bbfc72bdadc1.png").then(v => (src.value.navien = v)),
  safeImport("figma:asset/c7c3c59921cca456132608c44d802a28062fed97.png").then(v => (src.value.drv = v)),
  safeImport("figma:asset/3cfd51d657e33df5ac1d3bb6f3d59feb16b0b21a.png").then(v => (src.value.lexis = v)),
  safeImport("figma:asset/c9713a748ada6a7052ef214ff77c63f6fca9e5a3.png").then(v => (src.value.hanwha = v)),
  safeImport("figma:asset/492bfc7cd0f7cbf20ac4f5dd62092a859f693a10.png").then(v => (src.value.exem = v)),
  safeImport("figma:asset/20163c51b76ce3c4576a15dbb6ed65be258fa6cc.png").then(v => (src.value.manna = v)),
  safeImport("figma:asset/e8e460084dd63e4b737b1e1d0637928d0855ae4a.png").then(v => (src.value["한인진"] = v)),
  safeImport("figma:asset/6080a81dc0930cafc1f5cc1ecb4b986603bf8682.png").then(v => (src.value.sh = v)),
  safeImport("figma:asset/0bf574e6cfa73833062b71fcb06b4d2b54148a46.png").then(v => (src.value.mworld = v)),
  safeImport("figma:asset/60399de80a47cfbfbf68bbfb06445e65a5e224cb.png").then(v => (src.value.milre = v)),
  safeImport("figma:asset/358e33241e76e7fe231ba7ace697c1bc94ff4c47.png").then(v => (src.value.dgo = v)),
  safeImport("figma:asset/bf8b2fc421d94d94255f643495c8d4591356dfa6.png").then(v => (src.value.oplatform = v)),
  safeImport("figma:asset/1158ea87b1059637ecca03c262e748439baf4313.png").then(v => (src.value.woorien = v)),
]);

type LogoType =
    | "빈칸"
    | "wezon"
    | "apro"
    | "lexis"
    | "manna"
    | "mworld"
    | "oplatform"
    | "한인진"
    | "hanwha"
    | "navien"
    | "kepco"
    | "woorien"
    | "milre"
    | "dgo"
    | "sh"
    | "exem"
    | "drv"
    | "kmd";

// 원본처럼 11개만 렌더 (12번째 칸은 빈칸)
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

// ===== Logo Component (SFC 내부 컴포넌트) =====
const Logo = defineLogoComponent();

function defineLogoComponent() {
  return {
    name: "Logo",
    props: {
      class: { type: String, default: "" },
      property1: { type: String as () => LogoType, default: "빈칸" },
    },
    setup(props: any) {
      const failed = ref(false);

      const kmdGroup = computed(() =>
          ["kmd", "drv", "lexis", "hanwha", "한인진", "sh", "mworld", "milre", "dgo"].includes(props.property1)
      );
      const wezonGroup = computed(() =>
          ["wezon", "kepco", "apro", "navien", "exem", "manna", "woorien"].includes(props.property1)
      );
      const whiteBgGroup = computed(() =>
          [
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
            "sh",
            "mworld",
            "milre",
            "dgo",
            "woorien",
          ].includes(props.property1)
      );

      const isOplatform = computed(() => props.property1 === "oplatform");

      const rootClass = computed(() => {
        const bg = isOplatform.value
            ? "bg-white min-w-[154px] w-[188px]"
            : whiteBgGroup.value
                ? "bg-white w-[188px]"
                : "bg-[#fafbfd] w-[187px]";
        return `${props.class || ""} logo h-[64px] relative ${bg}`.trim();
      });

      const paddingClass = computed(() => {
        if (isOplatform.value) return "px-[28px] py-[16px]";
        if (kmdGroup.value) return "px-[28px] py-[16px]";
        if (wezonGroup.value) return "px-[28px] py-[20px]";
        return "";
      });

      const aspectClass = computed(() => {
        const map: Record<string, string> = {
          wezon: "aspect-[206/63]",
          kepco: "aspect-[498/101]",
          kmd: "aspect-[187/56]",
          apro: "aspect-[201/44]",
          navien: "aspect-[292/49]",
          drv: "aspect-[120/31]",
          lexis: "aspect-[124/60]",
          hanwha: "aspect-[268/61]",
          exem: "aspect-[117/35]",
          manna: "aspect-[166/40]",
          "한인진": "aspect-[260/55]",
          sh: "aspect-[113/40]",
          mworld: "aspect-[160/52]",
          milre: "aspect-[135/66]",
          dgo: "aspect-[128/49]",
          oplatform: "aspect-[177/64]",
          woorien: "aspect-[207/46]",
        };
        return map[props.property1] || "";
      });

      const currentSrc = computed(() => {
        if (failed.value) return null;
        return src.value[props.property1] ?? null;
      });

      const onError = () => {
        failed.value = true; // 이 칸만 빈칸 처리
      };

      return { rootClass, paddingClass, aspectClass, currentSrc, onError };
    },
    template: `
      <div :class="rootClass">
        <div class="flex items-center justify-center size-full">
          <div class="content-stretch flex items-center justify-center size-full relative" :class="paddingClass">
            <div v-if="currentSrc" class="h-full relative shrink-0" :class="aspectClass">
              <img
                :src="currentSrc"
                alt=""
                class="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                @error="onError"
              />
            </div>
          </div>
        </div>

        <div aria-hidden="true" class="cellBorder" />
      </div>
    `,
  };
}
</script>

<style scoped>
/* page layout */
.page {
  background: #fff;
  width: 100%;
  padding: 40px 28px 80px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

/* title */
.text {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  line-height: 1.4;
  font-style: normal;
  font-family: Pretendard, system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans KR", Arial, sans-serif;
  font-weight: 700;
}
.kicker {
  color: #9763f0;
  font-size: 18px;
  letter-spacing: -0.54px;
  margin: 0;
}
.title {
  color: #111217;
  font-size: 40px;
  letter-spacing: -1.2px;
  text-align: center;
  margin: 0;
}

/* frame */
.frame {
  background: #fff;
  width: 100%;
  max-width: 1224px;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}
.grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-rows: repeat(3, auto);
}
.cell {
  height: 64px;
  position: relative;
  background: #fafbfd;
}

/* borders */
.frameBorder {
  position: absolute;
  inset: 0;
  border: 1px solid #f0f3f6;
  border-radius: 8px;
  pointer-events: none;
}
.cellBorder {
  position: absolute;
  inset: 0;
  border-right: 1px solid #f0f3f6;
  border-bottom: 1px solid #f0f3f6;
  pointer-events: none;
}

/* tiny helpers (Tailwind class 일부 대체 안전망) */
.size-full { width: 100%; height: 100%; }
.content-stretch { width: 100%; }
.relative { position: relative; }
.absolute { position: absolute; }
.inset-0 { inset: 0; }
.object-cover { object-fit: cover; }
.pointer-events-none { pointer-events: none; }
.max-w-none { max-width: none; }
.h-full { height: 100%; }
.shrink-0 { flex-shrink: 0; }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
</style>
