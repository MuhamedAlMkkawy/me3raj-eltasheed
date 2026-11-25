<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <NuxtLink to="/admin/pages" class="p-2 rounded-lg border border-[#C7D8E1] hover:bg-white text-[#44505A]">
          <i class="pi pi-arrow-right"></i>
        </NuxtLink>
        <div>
          <h2 class="text-xl font-bold font-heading text-[#1F2A30]">
            {{ isNew ? 'إنشاء صفحة جديدة' : `تعديل صفحة: ${form.title}` }}
          </h2>
          <p class="text-xs text-[#44505A]">تعديل المحتوى، الرابط، وإعدادات الميتا تاج للمحركات.</p>
        </div>
      </div>
      <MainButton
        label="حفظ الصفحة"
        :loading="loading"
        @click="savePage"
      />
    </div>

    <div class="bg-white rounded-xl border border-[#C7D8E1] p-6 shadow-sm space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormCustomField
          name="title"
          label="عنوان الصفحة"
          v-model="form.title"
          required
        />
        <FormCustomField
          name="slug"
          label="الرابط (Slug)"
          v-model="form.slug"
          required
        />
      </div>

      <FormCustomField
        name="subtitle"
        label="العنوان الفرعي"
        v-model="form.subtitle"
      />

      <FormCustomField
        name="content"
        label="محتوى الصفحة (يدعم وسوم HTML)"
        as="textarea"
        v-model="form.content"
        :rows="12"
      />

      <div class="border-t border-[#C7D8E1] pt-6 space-y-4">
        <h3 class="text-sm font-bold font-heading text-[#1F2A30]">إعدادات SEO للصفحة</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormCustomField
            name="metaTitle"
            label="عنوان الميتا (Meta Title)"
            v-model="form.metaTitle"
          />
          <FormCustomField
            name="metaDescription"
            label="وصف الميتا (Meta Description)"
            v-model="form.metaDescription"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useApiMethods } from "~/composables/useApiMethods";
import { API_ENDPOINTS } from "~/config/endpoints";
import type { PageContent } from "~/types";

definePageMeta({
  layout: "admin",
});

const route = useRoute();
const router = useRouter();
const localeRoute = useLocaleRoute();
const { getMethod, submitMethod, loading } = useApiMethods();

const pageId = route.params.id as string;
const isNew = pageId === "new";

const form = ref<Partial<PageContent>>({
  title: "",
  slug: "",
  subtitle: "",
  content: "",
  metaTitle: "",
  metaDescription: "",
  active: true,
});

const loadPage = async () => {
  if (isNew) return;
  const res = await getMethod(API_ENDPOINTS.ADMIN.PAGE_ITEM(pageId), {}, true);
  if (res?.data) {
    form.value = res.data;
  }
};

const savePage = async () => {
  if (!form.value.title) return;
  const endpoint = isNew ? API_ENDPOINTS.ADMIN.PAGES : API_ENDPOINTS.ADMIN.PAGE_ITEM(pageId);
  const method = isNew ? "POST" : "PUT";

  const res = await submitMethod(endpoint, true, form.value, method);
  if (res?.data) {
    router.push(localeRoute("/admin/pages"));
  }
};

onMounted(() => {
  loadPage();
});
</script>
