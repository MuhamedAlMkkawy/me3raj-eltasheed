<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold font-heading text-[#1F2A30]">إعدادات محركات البحث (SEO)</h2>
        <p class="text-xs text-[#44505A]">تحسين ظهور موقع معراج التشييد في نتائج Google ومواقع التواصل الاجتماعي.</p>
      </div>
      <MainButton
        label="حفظ إعدادات SEO"
        :loading="loading"
        @click="saveSeo"
      />
    </div>

    <div class="bg-white rounded-xl border border-[#C7D8E1] p-6 shadow-sm space-y-6" v-if="form">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormCustomField
          name="defaultTitle"
          label="العنوان الافتراضي للموقع (Meta Title)"
          v-model="form.defaultTitle"
          required
        />
        <FormCustomField
          name="titleTemplate"
          label="قالب العنوان للصفحات الفرعية"
          v-model="form.titleTemplate"
          placeholder="%s | معراج التشييد"
        />
      </div>

      <FormCustomField
        name="defaultDescription"
        label="الوصف التعريفي العام (Meta Description)"
        as="textarea"
        v-model="form.defaultDescription"
        :rows="3"
      />

      <FormCustomField
        name="defaultKeywords"
        label="الكلمات المفتاحية (مفصولة بفاصلة)"
        as="textarea"
        v-model="form.defaultKeywords"
        :rows="2"
      />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#C7D8E1]">
        <FormCustomField
          name="ogImage"
          label="صورة المشاركة على الشبكات (og:image)"
          v-model="form.ogImage"
          placeholder="/logo.png"
        />
        <FormCustomField
          name="twitterCard"
          label="نوع بطاقة منصة X (Twitter Card)"
          v-model="form.twitterCard"
          placeholder="summary_large_image"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useApiMethods } from "~/composables/useApiMethods";
import { API_ENDPOINTS } from "~/config/endpoints";
import type { SeoSettings } from "~/types";

definePageMeta({
  layout: "admin",
});

const { getMethod, submitMethod, loading } = useApiMethods();
const form = ref<SeoSettings | null>(null);

const loadSeo = async () => {
  const res = await getMethod(API_ENDPOINTS.ADMIN.SEO, {}, true);
  if (res?.data) {
    form.value = res.data;
  }
};

const saveSeo = async () => {
  if (!form.value) return;
  await submitMethod(API_ENDPOINTS.ADMIN.SEO, true, form.value, "PUT");
};

onMounted(() => {
  loadSeo();
});
</script>
