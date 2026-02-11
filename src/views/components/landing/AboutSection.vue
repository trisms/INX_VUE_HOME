<!-- src/components/landing/AboutSection.vue -->
<template>
  <section
      class="w-full px-[20px] sm:px-[28px] py-[80px] sm:py-[120px] flex flex-col items-center gap-[40px]"
      data-name="Process-여백"
      style="background-color: #f0f3f6;"
  >
    <!-- Title -->
    <header class="w-full flex flex-col items-center gap-[8px] font-['Pretendard:Bold',sans-serif] leading-[1.4]">
      <p class="text-[#9763f0] font-bold text-[18px] tracking-[-0.54px]">ABOUT</p>
      <p class="text-[#111217] text-[40px] tracking-[-1.2px] font-bold text-center">Design Your Tomorrow</p>
    </header>

    <!-- Cards -->
    <div class="w-full flex flex-col gap-[16px] items-center" data-name="About">
      <!-- Card 1 -->
      <article
          :ref="setCardRef"
          class="about-card w-full max-w-[809px] bg-white rounded-[20px]"
          data-name="Card"
          style="--delay: 0ms;"
      >
        <div class="w-full p-[8px] flex flex-col md:flex-row lg:flex-row gap-[16px] items-stretch lg:items-center">
          <div class="flex-1 min-w-0">
            <div class="pl-[8px] lg:pl-[12px] pt-[16px] lg:pt-0 flex flex-col gap-[12px]">
              <p class="text-[#9763f0] text-[18px] sm:text-[20px] tracking-[-0.6px] font-['Pretendard:Bold',sans-serif]">
                1. We are
              </p>

              <div class="text-[#111217] flex flex-col gap-[6px]">
                <p class="text-[20px] sm:text-[24px] tracking-[-0.72px] font-['Pretendard:Bold',sans-serif] leading-[1.4]">
                  고객사를 <br class="hidden lg:block" />
                  제대로 이해하는 팀
                </p>

                <p
                    class="text-[16px] sm:text-[18px] tracking-[-0.36px] leading-[1.6] font-['Pretendard:Regular',sans-serif]"
                    style="font-feature-settings:'lnum','tnum'"
                >
                  고객사의 상황을 깊이 파악하고,<br class="hidden lg:block" />
                  가장 알맞은 <span class="font-['Pretendard:Bold',sans-serif]">프로세스·전략·커뮤니케이션</span>을 제공합니다.
                </p>
              </div>
            </div>
          </div>

          <div class="flex-1 min-w-0">
            <div class="w-full rounded-[12px] overflow-hidden bg-[#f0f3f6] aspect-[818/460] flex items-center justify-center text-sm text-slate-500">
              <img :src="about1" alt="" />
            </div>
          </div>
        </div>
      </article>

      <!-- Card 2 -->
      <article
          :ref="setCardRef"
          class="about-card w-full max-w-[809px] bg-white rounded-[20px]"
          data-name="Card"
          style="--delay: 120ms;"
      >
        <div class="w-full p-[8px] flex flex-col md:flex-row lg:flex-row gap-[16px] items-stretch lg:items-center">
          <div class="flex-1 min-w-0">
            <div class="pl-[8px] lg:pl-[12px] pt-[16px] lg:pt-0 flex flex-col gap-[12px]">
              <p class="text-[#9763f0] text-[18px] sm:text-[20px] tracking-[-0.6px] font-['Pretendard:Bold',sans-serif]">
                2. How
              </p>

              <div class="text-[#111217] flex flex-col gap-[6px]">
                <p class="text-[20px] sm:text-[24px] tracking-[-0.72px] font-['Pretendard:Bold',sans-serif] leading-[1.4]">
                  기획부터 실행까지 <br class="hidden lg:block" />
                  책임지는 전문가
                </p>

                <p
                    class="text-[16px] sm:text-[18px] tracking-[-0.36px] leading-[1.6] font-['Pretendard:Regular',sans-serif]"
                    style="font-feature-settings:'lnum','tnum'"
                >
                  경험 많은 연구진이 처음부터 끝까지<br class="hidden lg:block" />
                  <span class="font-['Pretendard:Bold',sans-serif]">완성도 있게</span> 프로젝트를 이끌어갑니다.
                </p>
              </div>
            </div>
          </div>

          <div class="flex-1 min-w-0">
            <div class="w-full rounded-[12px] overflow-hidden bg-[#f0f3f6] aspect-[818/460] flex items-center justify-center text-sm text-slate-500">
              <img :src="about2" alt="" />
            </div>
          </div>
        </div>
      </article>

      <!-- Card 3 -->
      <article
          :ref="setCardRef"
          class="about-card w-full max-w-[809px] bg-white rounded-[20px]"
          data-name="Card"
          style="--delay: 240ms;"
      >
        <div class="w-full p-[8px] flex flex-col md:flex-row lg:flex-row gap-[16px] items-stretch lg:items-center">
          <div class="flex-1 min-w-0">
            <div class="pl-[8px] lg:pl-[12px] pt-[16px] lg:pt-0 flex flex-col gap-[12px]">
              <p class="text-[#9763f0] text-[18px] sm:text-[20px] tracking-[-0.6px] font-['Pretendard:Bold',sans-serif]">
                3. Why us
              </p>

              <div class="text-[#111217] flex flex-col gap-[6px]">
                <p class="text-[20px] sm:text-[24px] tracking-[-0.72px] font-['Pretendard:Bold',sans-serif] leading-[1.4]">
                  예쁘기만 한 디자인을 <br class="hidden lg:block" />
                  만들지 않습니다.
                </p>

                <p
                    class="text-[16px] sm:text-[18px] tracking-[-0.36px] leading-[1.6] font-['Pretendard:Regular',sans-serif]"
                    style="font-feature-settings:'lnum','tnum'"
                >
                  비즈니스 전략을 반영한 결과물로<br class="hidden lg:block" />
                  <span class="font-['Pretendard:Bold',sans-serif]">성과</span>를 만드는 팀입니다.
                </p>
              </div>
            </div>
          </div>

          <div class="flex-1 min-w-0">
            <div class="w-full rounded-[12px] overflow-hidden bg-[#f0f3f6] aspect-[818/460] flex items-center justify-center text-sm text-slate-500">
              <img :src="about3" alt="" />
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const about1 = new URL('@/assets/img/inx/tommrow/img-ratio.png', import.meta.url).href
const about2 = new URL('@/assets/img/inx/tommrow/img-ratio2.png', import.meta.url).href
const about3 = new URL('@/assets/img/inx/tommrow/img-ratio3.png', import.meta.url).href

// ✅ function ref로 안전하게 DOM 수집
const cardRefs = ref<HTMLElement[]>([])
function setCardRef(el: HTMLElement | null) {
  if (!el) return
  cardRefs.value.push(el)
}

let io: IntersectionObserver | null = null

function resetAndPlay(el: HTMLElement) {
  // 매번 재생: 클래스 제거 → reflow → 다시 추가
  el.classList.remove('in-view')
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  el.offsetHeight
  el.classList.add('in-view')
}

onMounted(() => {
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  if (reduce) {
    cardRefs.value.forEach((el) => el.classList.add('in-view'))
    return
  }

  io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement
          if (entry.isIntersecting) {
            resetAndPlay(el) // ✅ 들어올 때마다 항상 재생
          } else {
            // ✅ 화면 밖으로 나가면 상태 초기화 (다음 진입 때 다시 애니메이션)
            el.classList.remove('in-view')
          }
        }
      },
      {
        root: null,
        // ✅ 더 아래에서 "올라오는" 느낌: 시작 시점을 더 늦춤
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.08,
      },
  )

  cardRefs.value.forEach((el) => io?.observe(el))
})

onBeforeUnmount(() => {
  io?.disconnect()
  io = null
})
</script>

<style scoped>
/* ✅ 기본 상태: 더 아래에서 시작 */
.about-card{
  opacity: 0;
  transform: translate3d(0, 64px, 0) scale(0.99);
  filter: blur(0.25px);
  will-change: transform, opacity;
}

/* ✅ in-view 때: keyframes로 "슬로우 + 아래에서 + 팅김" */
.about-card.in-view{
  animation: popUpSlow 1050ms cubic-bezier(0.16, 1.15, 0.25, 1) var(--delay, 0ms) both;
}

@keyframes popUpSlow{
  0%{
    opacity: 0;
    transform: translate3d(0, 72px, 0) scale(0.99);
    filter: blur(0.25px);
  }
  55%{
    opacity: 1;
    filter: blur(0);
  }
  100%{
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
    filter: blur(0);
  }
}

@media (prefers-reduced-motion: reduce){
  .about-card{
    opacity: 1;
    transform: none;
    filter: none;
  }
  .about-card.in-view{
    animation: none;
  }
}
</style>
