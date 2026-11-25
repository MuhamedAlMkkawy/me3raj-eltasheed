<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold font-heading text-[#1F2A30]">إدارة خدمات المقاولات</h2>
        <p class="text-xs text-[#44505A]">تحكم في الخدمات الإنشائية والمعمارية والكهروميكانيكية التي تقدمها الشركة.</p>
      </div>
      <NuxtLink to="/admin/services/new" class="main-btn sm !m-0">
        <i class="pi pi-plus"></i>
        <span>إضافة خدمة جديدة</span>
      </NuxtLink>
    </div>

    <!-- Services Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" v-if="services.length > 0">
      <div
        v-for="srv in services"
        :key="srv.id"
        class="bg-white rounded-xl border border-[#C7D8E1] p-5 shadow-sm flex flex-col justify-between hover:border-[#2AA9E3] transition-all"
      >
        <div>
          <div class="flex items-center justify-between mb-3">
            <div class="w-10 h-10 rounded-lg bg-[#2AA9E3]/15 text-[#0F6F9E] flex items-center justify-center text-lg">
              <i :class="srv.icon || 'pi pi-briefcase'"></i>
            </div>
            <span
              class="px-2 py-0.5 rounded text-[10px] font-bold"
              :class="srv.active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'"
            >
              {{ srv.active ? 'نشطة بالموقع' : 'معطلة' }}
            </span>
          </div>

          <h3 class="font-bold text-base text-[#1F2A30] font-heading mb-1">{{ srv.title }}</h3>
          <p class="text-xs text-[#44505A] line-clamp-3 mb-4">{{ srv.shortDescription }}</p>
        </div>

        <div class="pt-3 border-t border-[#C7D8E1] flex items-center justify-between">
          <span class="text-[11px] text-[#44505A]">الترتيب: {{ srv.order }}</span>
          <div class="flex items-center gap-2">
            <NuxtLink
              :to="`/admin/services/${srv.id}`"
              class="p-1.5 rounded-lg border border-[#C7D8E1] hover:text-[#0F6F9E] text-[#44505A]"
            >
              <i class="pi pi-pencil"></i>
            </NuxtLink>
            <button
              type="button"
              class="p-1.5 rounded-lg border border-red-200 hover:bg-red-50 text-red-500"
              @click="confirmDelete(srv)"
            >
              <i class="pi pi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="bg-white p-12 text-center text-sm text-[#44505A] rounded-xl border border-[#C7D8E1]">
      لا توجد خدمات مضافة حالياً.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useApiMethods } from "~/composables/useApiMethods";
import { API_ENDPOINTS } from "~/config/endpoints";
import { useConfirmAction } from "~/composables/useConfirmAction";
import type { Service } from "~/types";

definePageMeta({
  layout: "admin",
});

const { getMethod, submitMethod } = useApiMethods();
const { requireConfirmation } = useConfirmAction();

const services = ref<Service[]>([]);

const loadServices = async () => {
  const res = await getMethod(API_ENDPOINTS.ADMIN.SERVICES, {}, true);
  if (res?.data) {
    services.value = res.data;
  }
};

const confirmDelete = (service: Service) => {
  requireConfirmation({
    header: "حذف الخدمة",
    message: `هل أنت متأكد من حذف الخدمة "${service.title}"؟`,
    onAccept: async () => {
      await submitMethod(API_ENDPOINTS.ADMIN.SERVICE_ITEM(service.id), true, {}, "DELETE");
      await loadServices();
    },
  });
};

onMounted(() => {
  loadServices();
});
</script>
