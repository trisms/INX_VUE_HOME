<template>
  <section ref="rootRef" class="banner" data-name="BANNER">
    <div class="display" data-name="Display">
      <div class="display-inner">
        <div class="headline-wrap" data-name="텍스트">
          <h2 class="headline">
            대표님,<br />
            이런 <span>고민</span>을 겪고 계시진 않았나요?
          </h2>

          <div class="bubbles" data-name="고민들">
            <div class="bubble">
              <p>제품은 좋은데, <span class="purple">고객이 이해하지 못한다</span>고 느끼시나요?</p>
            </div>
            <div class="bubble">
              <p>웹/앱 경험이 산만해, <span class="purple">사용자가 이탈</span>하진 않나요?</p>
            </div>
            <div class="bubble">
              <p><span class="purple">고객 피드백</span>을 반영하고 있나요?</p>
            </div>
          </div>
        </div>

        <!-- ✅ 소스(모바일/데스크탑)가 바뀌면 picture를 리마운트 -->
        <div
            ref="motionRef"
            class="graphic-holder graphic-motion"
            :class="{ 'is-in': isIn }"
            aria-hidden="true"
        >
          <img
              class="graphic-img"
              :src="currentGraphic"
              alt=""
          />
        </div>
      </div>
    </div>

    <div class="cta" data-name="CTA">
      <div class="cta-inner">
        <div class="cta-text">
          <p class="cta-title">
            <span class="lime">전략이 보이는 디자인</span><br />
            INX와 함께하세요
          </p>

          <div class="btn-row">
            <button class="btn-inquiry" type="button">
              <span>바로 문의하기</span>
            </button>

            <a
                class="btn-brochure"
                href="https://drive.google.com/file/d/1Jk8R5wGMRRW-ULxiNFJRVSC0A9w3roIL/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
            >
              <span class="inner">
                <strong>회사소개서</strong>
                <span class="icon" aria-hidden="true">
                  <svg viewBox="0 0 18 17" fill="none" aria-hidden="true">
                    <path
                        d="M9.5 0V12.25L14.75 7L15.5 7.66L9 14.16L2.5 7.66L3.25 7L8.5 12.25V0H9.5ZM0 14H1V16H17V14H18V17H0V14Z"
                        fill="#111217"
                    />
                  </svg>
                </span>
              </span>
              <span class="gloss"></span>
            </a>
          </div>
        </div>

        <div class="reviews" data-name="후기컨테이너">
          <div class="lane" data-name="후기">
            <div class="track" :style="{ '--dur': `${duration}s` }">
              <!-- 1번 세트 -->
              <div class="item" v-for="(t, i) in testimonials" :key="`a-${i}`">
                <p class="txt">“{{ t }}”</p>
              </div>

              <!-- 2번 세트(복제): 끊김 없이 무한 롤링용 -->
              <div class="item" v-for="(t, i) in testimonials" :key="`b-${i}`" aria-hidden="true">
                <p class="txt">“{{ t }}”</p>
              </div>
            </div>
          </div>

          <div class="fade-left" aria-hidden="true"></div>
          <div class="fade-right" aria-hidden="true"></div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'

const graphic = new URL('@/assets/img/inx/graphic.png', import.meta.url).href
const graphicSm = new URL('@/assets/img/inx/graphic-sm.png', import.meta.url).href

const rootRef = ref<HTMLElement | null>(null)
const motionRef = ref<HTMLElement | null>(null)

const isIn = ref(false)
const isVisible = ref(false)
const isMobile = ref(false)

const currentGraphic = computed(() =>
    isMobile.value ? graphicSm : graphic
)

let io: IntersectionObserver | null = null
let mql: MediaQueryList | null = null


const testimonials = [
  "디자인과 사업모델 발굴에 대한 식견이 넓어짐",
  "디자인을 토대로 개발자간의 소통을 원활히 하는데 도움 되었습니다.",
  "무에서 유를 초기에 함께 잡아줘서 방향이 빨랐어요",
  "사용자 흐름이 정리되니 개발 속도가 확 올라갔습니다",
];

const duration = 22; // 숫자 ↑ 느리게, ↓ 빠르게


function replay() {
  if (!isVisible.value) return

  isIn.value = false

  nextTick(() => {
    const el = motionRef.value
    if (!el) return
    void el.offsetHeight
    requestAnimationFrame(() => {
      isIn.value = true
    })
  })
}

onMounted(() => {
  // Intersection
  if (rootRef.value) {
    io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            isVisible.value = true
            isIn.value = true
          } else {
            isVisible.value = false
            isIn.value = false
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -60% 0px' }
    )
    io.observe(rootRef.value)
  }

  // breakpoint
  mql = window.matchMedia('(max-width: 799px)')
  const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
    isMobile.value = e.matches
    replay() // ✅ 작아질 때만 아래서 다시 올라옴
  }

  isMobile.value = mql.matches

  if (mql.addEventListener) mql.addEventListener('change', onChange)
  else mql.addListener(onChange as any)
})

onBeforeUnmount(() => {
  io?.disconnect()
  if (mql) {
    if (mql.removeEventListener) mql.removeEventListener('change', replay as any)
    else mql.removeListener(replay as any)
  }
})
</script>




<style scoped>
/* 레이아웃 담당: 전역 CSS의 left/top/width/height 그대로 써도 OK */
.graphic-holder{
  position:absolute;
  z-index:1;
}
.graphic-motion{
  opacity:0;
  transform: translate3d(0, 300px, 0); /* ✅ 음수로 */
  will-change: transform, opacity;
}

.graphic-motion.is-in{
  opacity:1;
  transform: translate3d(0, 0, 0);
  transition:
      transform 2200ms cubic-bezier(0.22, 1, 0.36, 1),
      opacity 1400ms ease-out 220ms;
}

.graphic-img{
  display:block;
  height:auto;
}

</style>


