<template>
  <button
      class="backtop"
      :class="{ show: visible }"
      type="button"
      aria-label="Back to top"
      @click="scrollTop"
  >
    <!-- ✅ 중앙 정렬되는 SVG chevron-up -->
    <svg class="chev" viewBox="0 0 24 24" aria-hidden="true">
      <path
          d="M4 15L12 7l8 8"
          fill="none"
          stroke="currentColor"
          stroke-width="2.6"
          stroke-linecap="round"
          stroke-linejoin="round"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";

const visible = ref(false);

function onScroll() {
  visible.value = window.scrollY > 200;
}

function scrollTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<style scoped>
.backtop {
  position: fixed;
  right: 18px;
  bottom: 18px;
  z-index: 9999;

  width: 44px;
  height: 44px;
  border-radius: 999px;

  background: #fff;
  color: #111217;
  border: 1px solid rgba(17, 18, 23, 0.18);
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.18);

  /* ✅ 진짜 중앙 정렬 */
  display: grid;
  place-items: center;

  opacity: 0;
  pointer-events: none;
  transform: translateY(6px);
  transition: opacity 160ms ease, transform 160ms ease;
}

.backtop.show {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

.backtop:active {
  transform: translateY(1px);
}

/* ✅ 아이콘 크기/정렬 미세 조정 */
.chev {
  width: 22px;
  height: 22px;
  display: block;
  transform: translateY(-1px); /* optical centering */
}

@media (max-width: 640px) {
  .backtop {
    right: 14px;
    bottom: 14px;
  }
}
</style>
