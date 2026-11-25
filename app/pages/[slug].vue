<template>
  <div class="py-12  min-h-screen">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="!pageData" class="text-center py-24">
        <i class="pi pi-spin pi-spinner text-3xl text-[#2AA9E3]"></i>
        <p class="text-sm text-[#44505A] mt-2">جاري تحميل الصفحة...</p>
      </div>

      <div v-else class="space-y-8">
        <!-- Breadcrumb & Back -->
        <div class="flex items-center gap-2 text-xs text-[#44505A]">
          <NuxtLink to="/" class="hover:text-[#0F6F9E]">الرئيسية</NuxtLink>
          <i class="pi pi-angle-left text-[10px]"></i>
          <span class="text-[#1F2A30] font-semibold">{{ pageData.titleAr }}</span>
        </div>

        <div class="bg-white rounded-2xl border border-[#C7D8E1] p-6 sm:p-12 shadow-sm space-y-6">
          <h1 class="text-2xl sm:text-4xl font-heading font-bold text-[#1F2A30] pb-4 border-b border-[#C7D8E1]">
            {{ pageData.titleAr }}
          </h1>

          <div class="prose max-w-none text-[#333333] leading-relaxed text-sm sm:text-base whitespace-pre-line">
            {{ pageData.contentAr }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useApiMethods } from "~/composables/useApiMethods";
import { API_ENDPOINTS } from "~/config/endpoints";
import type { PageItem } from "~/types";

definePageMeta({ key: (r) => r.fullPath });

const route = useRoute();
const slug = computed(() => route.params.slug as string);
const { getMethod } = useApiMethods();
const pageData = ref<PageItem | null>(null);

const fetchPage = async () => {
  pageData.value = null;
  const res = await getMethod(API_ENDPOINTS.PUBLIC.PAGE_BY_SLUG(slug.value));
  if (res?.data) {
    pageData.value = res.data;
    useHead({
      title: `${pageData.value.titleAr} | معراج التشييد للمقاولات العامة`,
    });
  }
};

watch(slug, () => fetchPage());
onMounted(() => fetchPage());
</script>
