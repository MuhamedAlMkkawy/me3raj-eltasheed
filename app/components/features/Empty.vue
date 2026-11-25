<template>
  <div class="empty-state py-12 px-4 flex flex-col items-center justify-center text-center">
    <div class="w-24 h-24 mb-4 text-[#C7D8E1] flex items-center justify-center">
      <FeaturesNotFoundEyes />
    </div>
    <h3 class="text-lg font-semibold text-[#1F2A30] mb-2 font-heading">
      {{ title || $t('empty_component.text') }}
    </h3>
    <p v-if="description" class="text-sm text-[#44505A] max-w-md mb-6">
      {{ description }}
    </p>
    <slot name="action"></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  description?: string;
}>();
</script>
