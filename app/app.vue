
<template>
  <NuxtLayout>
    <NuxtPage />

    <Toast />
    <ConfirmDialog />

    <FeaturesLoading v-if="loading" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";

const { locale } = useI18n();

const globalStore = useGlobalStore();
const loading = computed(() => globalStore.loading);

useHead({
  htmlAttrs: {
    lang: () => locale.value,
    dir: () => locale.value === "ar" ? "rtl" : "ltr",
  },
});
</script>

<style>
/* Simple page transition */
.page-enter-active,
.page-leave-active {
  transition: opacity 200ms ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition: none;
  }
}
</style>
