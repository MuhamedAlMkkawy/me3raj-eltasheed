<template>
  <div class="py-12 bg-[#F5F9FB] min-h-screen">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="!project" class="text-center py-24">
        <i class="pi pi-spin pi-spinner text-3xl text-[#2AA9E3]"></i>
        <p class="text-sm text-[#44505A] mt-2">جاري تحميل بيانات المشروع...</p>
      </div>

      <div v-else class="space-y-8">
        <!-- Breadcrumb & Back -->
        <div class="flex items-center gap-2 text-xs text-[#44505A]">
          <NuxtLink to="/" class="hover:text-[#0F6F9E]">الرئيسية</NuxtLink>
          <i class="pi pi-angle-left text-[10px]"></i>
          <NuxtLink to="/projects" class="hover:text-[#0F6F9E]">المشاريع</NuxtLink>
          <i class="pi pi-angle-left text-[10px]"></i>
          <span class="text-[#1F2A30] font-semibold">{{ project.titleAr }}</span>
        </div>

        <!-- Cover & Title Card -->
        <div class="bg-white rounded-2xl border border-[#C7D8E1] overflow-hidden shadow-sm">
          <div class="h-72 sm:h-96 w-full overflow-hidden relative">
            <img
              :src="project.coverImage || 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=1200&q=80'"
              :alt="project.titleAr"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            <div class="absolute bottom-6 right-6 left-6 text-white space-y-2">
              <div class="flex items-center gap-2">
                <span class="py-1 px-3 rounded-md bg-[#2AA9E3] text-[#1F2A30] font-bold text-xs">
                  {{ project.category || 'مقاولات عامة' }}
                </span>
                <span class="py-1 px-3 rounded-md bg-white/20 backdrop-blur-md text-white font-medium text-xs">
                  {{ project.status === 'completed' ? 'مشروع مكتمل' : 'قيد التنفيذ' }}
                </span>
              </div>
              <h1 class="text-2xl sm:text-4xl font-heading font-bold text-white">{{ project.titleAr }}</h1>
            </div>
          </div>

          <!-- Project Metadata Strip -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-[#F5F9FB] border-b border-[#C7D8E1] text-xs">
            <div>
              <span class="text-[#44505A] block mb-1">العميل</span>
              <span class="font-bold text-[#1F2A30]">{{ project.client || 'خاص' }}</span>
            </div>
            <div>
              <span class="text-[#44505A] block mb-1">الموقع</span>
              <span class="font-bold text-[#1F2A30]">{{ project.location || 'المملكة العربية السعودية' }}</span>
            </div>
            <div>
              <span class="text-[#44505A] block mb-1">تاريخ الإنجاز</span>
              <span class="font-bold text-[#1F2A30]">{{ project.year || '2024' }}</span>
            </div>
            <div>
              <span class="text-[#44505A] block mb-1">المساحة / النطاق</span>
              <span class="font-bold text-[#1F2A30]">{{ project.area || 'شامل التنفيذ' }}</span>
            </div>
          </div>

          <div class="p-6 sm:p-10 space-y-8">
            <div class="space-y-4">
              <h2 class="text-xl font-heading font-bold text-[#1F2A30]">تفاصيل ونطاق العمل</h2>
              <p class="text-sm sm:text-base text-[#333333] leading-relaxed whitespace-pre-line">
                {{ project.descriptionAr }}
              </p>
            </div>

            <!-- Gallery Images -->
            <div v-if="project.gallery && project.gallery.length" class="space-y-4 pt-4 border-t border-[#C7D8E1]">
              <h3 class="text-lg font-heading font-bold text-[#1F2A30]">معرض صور المشروع</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div
                  v-for="(img, idx) in project.gallery"
                  :key="idx"
                  class="h-44 rounded-xl overflow-hidden border border-[#C7D8E1]/60 shadow-sm"
                >
                  <img :src="img" :alt="`${project.titleAr} - ${idx+1}`" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
              </div>
            </div>

            <!-- CTA Box -->
            <div class="bg-[#1F2A30] rounded-xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
              <div class="space-y-1 text-center sm:text-right">
                <h3 class="text-lg font-heading font-bold">هل لديك مشروع مماثل ترغب بتنفيذه؟</h3>
                <p class="text-xs text-[#C7D8E1]">نحن نوفر الخبرة والمعدات لضمان إنجاز مشروعك بأعلى كفاءة.</p>
              </div>
              <NuxtLink to="/contact" class="main-btn whitespace-nowrap shrink-0 !m-0">
                <i class="pi pi-send"></i>
                <span>طلب تسعير واستشارة</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useApiMethods } from "~/composables/useApiMethods";
import { API_ENDPOINTS } from "~/config/endpoints";
import type { ProjectItem } from "~/types";

const route = useRoute();
const id = route.params.id as string;
const { getMethod } = useApiMethods();
const project = ref<ProjectItem | null>(null);

onMounted(async () => {
  const res = await getMethod(API_ENDPOINTS.PUBLIC.PROJECT_BY_ID(id));
  if (res?.data) {
    project.value = res.data;
    useHead({
      title: `${project.value.titleAr} | مشاريع معراج التشييد للمقاولات العامة`,
    });
  }
});
</script>
