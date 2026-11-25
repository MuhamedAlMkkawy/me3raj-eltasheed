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
const currentDir = computed(() => (locale.value === "ar" ? "rtl" : "ltr"));

const globalStore = useGlobalStore();
const loading = computed(() => globalStore.loading);

useHead({
  htmlAttrs: {
    lang: locale,
    dir: currentDir,
  },
});
</script>
