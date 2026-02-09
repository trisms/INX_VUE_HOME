<template>
  <teleport to="body">
    <div class="modal-backdrop" @click.self="close">
      <div class="modal-window">
        <button class="close" @click="close">✕</button>

        <!-- 카드 덱 -->
        <div class="d-flex">
          <div class="deck-wrapper w-85">
              <div
                  v-for="(page, index) in pages"
                  :key="page.uid"
                  class="deck-card"
                  :style="cardStyle(index)"
              >
                <img :src="page.img" />
                <!--                <div class="bg-white h-50"><img :src="page.img" /></div>-->
              </div>
            <div class="indicator cta-wrap mt-1">
              <button class="cta-btn">
                <span class="text">View more Work</span>
                <span class="icon">
                        →
                      </span>
              </button>
            </div>
              <div class="indicator">
            <span
                v-for="n in total"
                :key="n"
                :class="{ active: n - 1 === currentIndex }"
            />
              </div>
          </div>
          <div class="arrow-area ">
            <button class="circle-arrow" @click="prev">...</button>
            <button class="circle-arrow" @click="next">...</button>
          </div>


        </div>

      </div>
    </div>
  </teleport>
</template>
<script setup>
import { ref, computed } from 'vue'
const entering = ref(false);
const emit = defineEmits(['close'])

const close = () => emit('close')


const origin = [
  { id: 1, img: '/src/assets/img/work/work-img-1.jpg' },
  { id: 2, img: '/src/assets/img/work/work-img-2.jpg' },
  { id: 3, img: '/src/assets/img/work/work-img-3.jpg' },
  { id: 4, img: '/src/assets/img/work/work-img-4.jpg' },
];

// ▶ 앞으로 (뒤에 있던 카드가 앞으로)
// uid는 v-for 안정성용
const pages = ref(
    origin.map((p, i) => ({ ...p, uid: `${p.id}-${i}` }))
)

const total = origin.length

// 현재 맨 앞 카드의 원래 index
const currentIndex = computed(() => pages.value[0].id)

// ▶ 앞으로
const next = () => {
  entering.value = true

  const last = pages.value.pop()
  pages.value.unshift(last)

  requestAnimationFrame(() => {
    entering.value = false
  })
}

// ◀ 뒤로
const prev = () => {
  const first = pages.value.shift()
  pages.value.push(first)
}

const cardStyle = (index) => {
  const isFront = index === 0

  return {
    zIndex: pages.value.length - index,
    transform: isFront && entering.value
        ? 'translateX(0px) scale(1.05)'
        : `
          translateY(${index * -40}px)
          scale(${1 - index * 0.070})
        `,
    transition: isFront
        ? 'transform 0.45s cubic-bezier(.22,.61,.36,1)'
        : 'transform 0.45s ease',
    opacity: index > 4 ? 0 : 1,
  }
}
</script>
<style scoped>




/* 모달 배경 */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
}

/* 모달 박스 */
.modal-window {
  position: relative;
  width: 90vw;
  max-width: 90vw;
  text-align: center;
}

/* 닫기 버튼 */
.close {
  position: absolute;
  top: 12px;
  right: 12px;
}


/* 이하 덱 스타일은 이전과 동일 */




/* 인디케이터 */
.indicator {
  position: absolute;
  bottom: -40px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #bbb;
  opacity: 0.5;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.indicator span.active {
  opacity: 1;
  transform: scale(1.5);
  background: #6c5ce7;
}

/* 화살표 */
/*.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 10px 14px;
  border-radius: 50%;
}*/

.arrow.prev {
  left: -60px;
}

.arrow.next {
  right: -60px;
}


.deck-wrapper {
  position: relative;
  height:  700px;
}

/* 카드 */
.deck-card {
  position: absolute;
  inset: 0;
  transition: transform 0.45s ease, opacity 0.45s ease;
}

.deck-card img {
  width: 90%;
  height: 85%;
  border-radius: 15px;

/*  object-fit: contain;*/
}

/* 오른쪽 25% 화살표 영역 */
.arrow-area {
  display: flex;
  flex-direction: column;
  justify-content: center; /* 세로 중앙 */
  align-items: center;
  gap: 24px;
  position: relative;
}

/* 화살표 버튼 */
.arrow-btn {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  font-size: 22px;
  cursor: pointer;
  background: #f1f1f1;
  transition: transform 0.2s ease, background 0.2s ease;
}

.arrow-btn:hover {
  transform: scale(1.1);
  background: #e0e0e0;
}

/* 기존 absolute 화살표 제거 */
.arrow {
  position: static;
  transform: none;
}


/* 버튼 컨테이너 */
.cta-wrap {
  bottom: 13px;
  position: absolute;
}

/* 메인 버튼 */
.cta-btn {
  display: flex;
  align-items: center;
  gap: 20px;

  padding: 14px 22px 14px 28px;
  border-radius: 999px;
  border: none;
  cursor: pointer;

  color: #fff;
  font-size: 16px;
  font-weight: 500;

  background: linear-gradient(
      180deg,
      rgba(255,255,255,0.18),
      rgba(255,255,255,0.06)
  );
  backdrop-filter: blur(10px);

  box-shadow:
      inset 0 0 0 1px rgba(255,255,255,0.15),
      0 8px 24px rgba(0,0,0,0.35);

  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

/* 텍스트 */
.cta-btn .text {
  white-space: nowrap;
}

/* 오른쪽 원형 아이콘 */
.cta-btn .icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #fff;
  color: #000;
  font-size: 18px;

  transition: transform 0.25s ease;
}

/* Hover 효과 */
.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow:
      inset 0 0 0 1px rgba(255,255,255,0.25),
      0 14px 32px rgba(0,0,0,0.45);
}

.cta-btn:hover .icon {
  transform: translateX(4px);
}


/* 세로 스택 */
.arrow-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 공통 원형 버튼 */
.circle-arrow {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  background: radial-gradient(
      circle at top,
      rgba(255,255,255,0.08),
      rgba(255,255,255,0.02)
  );

  box-shadow:
      inset 0 0 0 1px rgba(255,255,255,0.12),
      0 6px 18px rgba(0,0,0,0.45);

  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* SVG 화살표 */
.circle-arrow svg {
  width: 22px;
  height: 22px;
  fill: none;
  stroke: #e6e6e6;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Hover */
.circle-arrow:hover {
  transform: translateY(-2px);
  box-shadow:
      inset 0 0 0 1px rgba(255,255,255,0.25),
      0 10px 26px rgba(0,0,0,0.55);
}

/* Active */
.circle-arrow:active {
  transform: translateY(0);
}
.w-85{
  width: 85%;
}
.w-15{
  width: 15%;
}
</style>
