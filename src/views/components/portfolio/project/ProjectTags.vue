<script setup lang="ts">
type TagCode = "1" | "2" | "3" | "4";

type TagItem = { code: TagCode; label: string };

const props = defineProps<{
  modelValue: TagCode[];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", v: TagCode[]): void;
}>();

const tags: TagItem[] = [
  { code: "1", label: "UXUI 디자인" },
  { code: "2", label: "디자인컨설팅" },
  { code: "3", label: "공공디자인" },
  { code: "4", label: "안전디자인" },
];

const isActive = (code: TagCode) => props.modelValue.includes(code);

function toggleTag(code: TagCode) {
  let next = [...props.modelValue];
  if (next.includes(code)) next = next.filter((c) => c !== code);
  else next.push(code);

  emit("update:modelValue", next);
}
</script>

<template>
  <div class="relative">
    <div class="content-stretch flex gap-[16px] items-start pb-[16px] w-full overflow-x-auto " style="border-bottom: 1px solid #ddd;">
      <button
          v-for="t in tags"
          :key="t.code"
          type="button"
          class="relative rounded-[100px] shrink-0 transition-all duration-200"
          :class="isActive(t.code) ? 'bg-[#353841]' : 'bg-white'"
          @click="toggleTag(t.code)"
      >
        <div
            class="absolute border inset-0 rounded-[100px]"
            :class="isActive(t.code) ? 'border-[#353841]' : 'border-[#353841]'"
        />
        <div class="px-[14px] py-[3px] relative ">
          <p
              class="text-[16px] transition-colors"
              :class="isActive(t.code) ? 'text-white' : 'text-[#353841]'"
          >
            {{ t.label }}
          </p>
        </div>
      </button>
    </div>
  </div>
</template>
