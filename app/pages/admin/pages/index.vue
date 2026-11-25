<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold font-heading text-[#1F2A30]">إدارة صفحات الموقع الثابتة</h2>
        <p class="text-xs text-[#44505A]">تحرير نصوص صفحات "عن الشركة"، "سياسة الخصوصية"، والصفحات المخصصة.</p>
      </div>
      <NuxtLink to="/admin/pages/new" class="main-btn sm !m-0">
        <i class="pi pi-plus"></i>
        <span>إنشاء صفحة جديدة</span>
      </NuxtLink>
    </div>

    <div class="bg-white rounded-xl border border-[#C7D8E1] shadow-sm overflow-hidden">
      <div v-if="pages.length > 0" class="overflow-x-auto">
        <table class="w-full text-right text-xs">
          <thead class="bg-[#F5F9FB] text-[#44505A] border-b border-[#C7D8E1]">
            <tr>
              <th class="p-3.5">عنوان الصفحة</th>
              <th class="p-3.5">الرابط (Slug)</th>
              <th class="p-3.5">عنوان SEO</th>
              <th class="p-3.5">الحالة</th>
              <th class="p-3.5 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#C7D8E1]">
            <tr v-for="pg in pages" :key="pg.id" class="hover:bg-[#F5F9FB]/50 transition-colors">
              <td class="p-3.5 font-bold text-[#1F2A30] text-sm">{{ pg.title }}</td>
              <td class="p-3.5 text-[#0F6F9E] font-mono">/{{ pg.slug }}</td>
              <td class="p-3.5 text-[#44505A] max-w-xs truncate">{{ pg.metaTitle || '-' }}</td>
              <td class="p-3.5">
                <span
                  class="px-2.5 py-0.5 rounded-full text-[10px] font-bold"
                  :class="pg.active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'"
                >
                  {{ pg.active ? 'نشطة' : 'مسودة' }}
                </span>
              </td>
              <td class="p-3.5">
                <div class="flex items-center justify-center gap-2">
                  <NuxtLink
                    :to="`/admin/pages/${pg.id}`"
                    class="p-1.5 rounded-lg border border-[#C7D8E1] hover:text-[#0F6F9E] text-[#44505A]"
                  >
                    <i class="pi pi-pencil"></i>
                  </NuxtLink>
                  <button
                    type="button"
                    class="p-1.5 rounded-lg border border-red-200 hover:bg-red-50 text-red-500"
                    @click="confirmDelete(pg)"
                  >
                    <i class="pi pi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="p-12 text-center text-sm text-[#44505A]">
        لا توجد صفحات مضافة.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useApiMethods } from "~/composables/useApiMethods";
import { API_ENDPOINTS } from "~/config/endpoints";
import { useConfirmAction } from "~/composables/useConfirmAction";
import type { PageContent } from "~/types";

definePageMeta({
  layout: "admin",
});

const { getMethod, submitMethod } = useApiMethods();
const { requireConfirmation } = useConfirmAction();

const pages = ref<PageContent[]>([]);

const loadPages = async () => {
  const res = await getMethod(API_ENDPOINTS.ADMIN.PAGES, {}, true);
  if (res?.data) {
    pages.value = res.data;
  }
};

const confirmDelete = (pg: PageContent) => {
  requireConfirmation({
    header: "حذف الصفحة",
    message: `هل أنت متأكد من حذف الصفحة "${pg.title}"؟`,
    onAccept: async () => {
      await submitMethod(API_ENDPOINTS.ADMIN.PAGE_ITEM(pg.id), true, {}, "DELETE");
      await loadPages();
    },
  });
};

onMounted(() => {
  loadPages();
});
</script>
