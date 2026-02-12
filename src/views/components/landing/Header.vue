<template>
  <!-- ================= HEADER ================= -->
  <header class="fixed top-0 left-0 w-full z-50">
    <div class="bg-white border-b border-black/10 shadow-[0_6px_18px_rgba(0,0,0,0.08)] ">
      <div
          class="h-[64px] sm:h-[72px] px-[18px] sm:px-[22px]
               flex items-center justify-between max-w-[1280px] mx-auto"
      >
        <!-- ================= Left : Logo ================= -->
        <a href="/" class="flex items-center gap-[10px]">
          <div class="w-[26px] h-[26px] flex items-center justify-center">
            <!-- 임시 로고 -->
            <img src="@/assets/img/inx/logo/logo.png">
          </div>
        </a>

        <!-- ================= Right : Nav + CTA ================= -->
        <div class="flex items-center gap-[28px]">
          <!-- Nav -->
          <nav
              ref="navRef"
              class="relative flex items-center gap-[22px] sm:gap-[28px]
                   text-[14px] sm:text-[15px]"
          >
            <button
                class="nav-item"
                :class="{ 'is-active': active === 'portfolio' }"
                @click="goPortfolio"
            >
              포트폴리오
            </button>

            <button
                class="nav-item"
                :class="{ 'is-active': active === 'contact' }"
                @click="goContact"
            >
              문의하기
            </button>


            <!-- underline -->
            <span
                class="nav-underline"
                :style="underlineStyle"
                aria-hidden="true"
            />
          </nav>
          <!-- CTA : 회사소개서 -->
          <a
              class="brochure"
              href="https://drive.google.com/uc?export=download&id=1Jk8R5wGMRRW-ULxiNFJRVSC0A9w3roIL"
              rel="noreferrer"
              aria-label="회사소개서 다운로드"
          >
            <span class="brochure-text hidden sm:inline">
              회사소개서
            </span>
            <span class="brochure-ico" aria-hidden="true">
              <svg viewBox="0 0 18 17" class="w-[18px] h-[18px]">
                <path
                    d="M9.5 0V12.25L14.75 7L15.5 7.66L9 14.16L2.5 7.66L3.25 7L8.5 12.25V0H9.5ZM0 14H1V16H17V14H18V17H0V14Z"
                    fill="currentColor"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </div>
  </header>

  <!-- ================= Spacer ================= -->
  <!-- fixed header가 컨텐츠 덮지 않게 -->
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";

defineProps<{
  brochureHref: string;
}>();

const router = useRouter();
const route = useRoute();

type ActiveKey = "portfolio" | "contact";
const active = ref<ActiveKey>("portfolio");

const navRef = ref<HTMLElement | null>(null);
const underlineLeft = ref(0);
const underlineWidth = ref(0);

const underlineStyle = computed(() => ({
  transform: `translateX(${underlineLeft.value}px)`,
  width: `${underlineWidth.value}px`,
}));


function scrollToHash(hash: string) {
  const el = document.querySelector(hash) as HTMLElement | null;
  if (!el) return;

  // ✅ Tailwind의 scroll-mt-[72px]가 있으면 헤더 높이 보정은 자동으로 됨
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setUnderline() {
  if (!navRef.value) return;

  const btn = navRef.value.querySelector(".nav-item.is-active") as HTMLElement | null;
  if (!btn) return;

  const navRect = navRef.value.getBoundingClientRect();
  const btnRect = btn.getBoundingClientRect();

  underlineLeft.value = btnRect.left - navRect.left;
  underlineWidth.value = btnRect.width;
}

function goTo(hash: string, key: ActiveKey) {
  active.value = key;
  requestAnimationFrame(setUnderline);

  const el = document.querySelector(hash) as HTMLElement | null;
  if (!el) return;

  const scroller = document.querySelector("main") as HTMLElement | null;
  if (!scroller) return;

  const headerOffset = window.innerWidth < 640 ? 64 : 72;

  // main 기준 위치 계산
  const top =
      el.getBoundingClientRect().top
      - scroller.getBoundingClientRect().top
      + scroller.scrollTop
      - headerOffset;

  scroller.scrollTo({ top, behavior: "smooth" });
}


/** ✅ 홈으로 이동 후 특정 섹션으로 스크롤 */
async function pushHomeAndScroll(hash: string) {
  // ✅ 홈이 아니면 홈으로 + hash까지 같이 push
  if (route.path !== "/") {
    await router.push({ path: "/", hash });
    await nextTick();
    // DOM 렌더 한 박자 후 스크롤
    requestAnimationFrame(() => scrollToHash(hash));
  } else {
    // 홈이면 바로 스크롤
    scrollToHash(hash);
    // (원하면 주소창 해시도 맞춰주기)
    history.replaceState(null, "", hash);
  }
}

async function goPortfolio() {
  active.value = "portfolio";
  // 포트폴리오가 "홈 섹션"이면 이걸로:
  // await pushHomeAndScroll("#portfolio");

  // 포트폴리오가 별도 페이지면 이대로:
  await router.push("/portfolioList");
}

function goContact() {
  active.value = "contact";
  requestAnimationFrame(setUnderline);

  const el = document.querySelector("#footer") as HTMLElement | null;
  if (!el) return;

  // 헤더 높이 보정해서 window 스크롤
  const headerOffset = window.innerWidth < 640 ? 64 : 72;
  const y = window.scrollY + el.getBoundingClientRect().top - headerOffset;

  window.scrollTo({ top: y, behavior: "smooth" });

  // ✅ 현재 경로 유지 + #footer만 붙이기
  history.replaceState(null, "", `${location.pathname}${location.search}#footer`);
}

function scrollToId(id: string) {
  const el = document.querySelector(id) as HTMLElement | null;
  if (!el) return;

  const scroller = document.querySelector("main") as HTMLElement | null;
  const headerOffset = window.innerWidth < 640 ? 64 : 72;

  // main 스크롤이면 main 기준으로 스크롤
  if (scroller) {
    const top =
        el.getBoundingClientRect().top -
        scroller.getBoundingClientRect().top +
        scroller.scrollTop -
        headerOffset;

    scroller.scrollTo({ top, behavior: "smooth" });
  } else {
    // window 스크롤이면 window 기준
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
function onResize() {
  setUnderline();
}

onMounted(() => {
  requestAnimationFrame(setUnderline);
  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
});
</script>


<style scoped>
/* ================= Nav ================= */
.nav-item {
  position: relative;
  padding: 6px 4px;
  font-weight: 600;
  letter-spacing: -0.2px;
  color: rgba(17, 18, 23, 0.65);
  transition: color 160ms ease, opacity 160ms ease;
}

.nav-item:hover {
  color: rgba(17, 18, 23, 0.92);
}

.nav-item.is-active {
  color: rgba(17, 18, 23, 0.92);
}

/* underline */
.nav-underline {
  position: absolute;
  left: 0;
  bottom: -12px;
  height: 2px;
  /*background: rgba(17, 18, 23, 0.92);*/
  border-radius: 999px;
  transition: transform 220ms ease, width 220ms ease;
}

/* ================= Brochure CTA ================= */
.brochure {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 31px;
  width: 200px;
  padding: 0 14px 0 16px;
  border-radius: 8px;
  background: #c9ff7e;
  color: #111217;
  border: 1px solid rgba(17, 18, 23, 0.25);
  box-shadow: 0 3px 0 rgba(17, 18, 23, 0.25), 0 6px 16px rgba(0, 0, 0, 0.12);
  font-weight: 800;
  letter-spacing: -0.3px;
  transition: transform 160ms ease, box-shadow 160ms ease, filter 160ms ease;
  justify-content: space-between;
}

.brochure:hover {
  transform: translateY(-1px);
  box-shadow:
      0 4px 0 rgba(17, 18, 23, 0.25),
      0 10px 22px rgba(0, 0, 0, 0.14);
  filter: brightness(0.98);
}

.brochure:active {
  transform: translateY(1px);
  box-shadow:
      0 1px 0 rgba(17, 18, 23, 0.3),
      0 4px 10px rgba(0, 0, 0, 0.12);
}

.brochure-text {
  font-size: 14px;
}

.brochure-ico {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: rgba(17, 18, 23, 0);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
@media (max-width: 799px){
  .brochure {
    width: unset;
  }
}
</style>
