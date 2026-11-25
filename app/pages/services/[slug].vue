<template>
  <div class="py-12 bg-[#F5F9FB] min-h-screen">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="!service" class="text-center py-24">
        <i class="pi pi-spin pi-spinner text-3xl text-[#2AA9E3]"></i>
        <p class="text-sm text-[#44505A] mt-2">جاري تحميل بيانات الخدمة...</p>
      </div>

      <div v-else class="space-y-8">
        <!-- Breadcrumb & Back -->
        <div class="flex items-center gap-2 text-xs text-[#44505A]">
          <NuxtLink to="/" class="hover:text-[#0F6F9E]">الرئيسية</NuxtLink>
          <i class="pi pi-angle-left text-[10px]"></i>
          <NuxtLink to="/services" class="hover:text-[#0F6F9E]">الخدمات</NuxtLink>
          <i class="pi pi-angle-left text-[10px]"></i>
          <span class="text-[#1F2A30] font-semibold">{{ service.titleAr }}</span>
        </div>

        <!-- Cover & Title Card -->
        <div class="bg-white rounded-2xl border border-[#C7D8E1] overflow-hidden shadow-sm">
          <div class="h-64 sm:h-80 w-full overflow-hidden relative">
            <img
              :src="service.icon || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80'"
              :alt="service.titleAr"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            <div class="absolute bottom-6 right-6 left-6 text-white">
              <span class="inline-block py-1 px-3 rounded-md bg-[#2AA9E3] text-[#1F2A30] font-bold text-xs mb-2">
                خدمة معتمدة
              </span>
              <h1 class="text-2xl sm:text-4xl font-heading font-bold text-white">{{ service.titleAr }}</h1>
            </div>
          </div>

          <div class="p-6 sm:p-10 space-y-8">
            <div class="space-y-4">
              <h2 class="text-xl font-heading font-bold text-[#1F2A30]">نظرة عامة على الخدمة</h2>
              <p class="text-sm sm:text-base text-[#333333] leading-relaxed whitespace-pre-line">
                {{ service.descriptionAr }}
              </p>
            </div>

            <!-- Features / Capabilities -->
            <div v-if="service.features && service.features.length" class="space-y-4 pt-4 border-t border-[#C7D8E1]">
              <h3 class="text-lg font-heading font-bold text-[#1F2A30]">ما يميز تنفيذنا لهذه الخدمة</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  v-for="(feat, idx) in service.features"
                  :key="idx"
                  class="flex items-center gap-3 p-3 rounded-xl bg-[#F5F9FB] border border-[#C7D8E1]/50 text-xs sm:text-sm text-[#1F2A30] font-medium"
                >
                  <i class="pi pi-check text-[#0F6F9E] font-bold"></i>
                  <span>{{ feat }}</span>
                </div>
              </div>
            </div>

            <!-- CTA Box -->
            <div class="bg-[#1F2A30] rounded-xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
              <div class="space-y-1 text-center sm:text-right">
                <h3 class="text-lg font-heading font-bold">هل ترغب بالاستفسار عن هذه الخدمة لمشروعك؟</h3>
                <p class="text-xs text-[#C7D8E1]">فريقنا المتخصص يوفر استشارات مجانية وجداول كميات دقيقة.</p>
              </div>
              <NuxtLink to="/contact" class="main-btn whitespace-nowrap shrink-0 !m-0">
                <i class="pi pi-send"></i>
                <span>طلب دراسة وتسعير</span>
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
import type { ServiceItem } from "~/types";

const route = useRoute();
const slug = route.params.slug as string;
const { getMethod } = useApiMethods();
const service = ref<ServiceItem | null>(null);

onMounted(async () => {
  const res = await getMethod(API_ENDPOINTS.PUBLIC.SERVICE_BY_SLUG(slug));
  if (res?.data) {
    service.value = res.data;
    useHead({
      title: `${service.value.titleAr} | معراج التشييد للمقاولات العامة`,
    });
  }
});
</script>
