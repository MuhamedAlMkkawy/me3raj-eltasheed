<template>
  <div class="py-12 bg-[#F5F9FB] min-h-screen">
    <!-- Header -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div class="bg-gradient-to-l from-[#1F2A30] to-[#2B3238] rounded-2xl p-8 md:p-14 text-white shadow-lg relative overflow-hidden">
        <div class="max-w-3xl relative z-10 space-y-4">
          <span class="inline-block py-1 px-3 rounded-full bg-[#2AA9E3]/20 text-[#2AA9E3] font-semibold text-xs border border-[#2AA9E3]/30">
            خدمات متكاملة
          </span>
          <h1 class="text-3xl md:text-5xl font-heading font-bold text-white tracking-tight">
            خدماتنا الإنشائية والهندسية
          </h1>
          <p class="text-sm md:text-base text-[#C7D8E1] leading-relaxed">
            نقدم مجموعة متكاملة من حلول المقاولات العامة، البناء، التشطيب، والترميم بمعايير احترافية ومطابقة لأحدث الأكواد الهندسية.
          </p>
        </div>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div v-if="services.length === 0" class="text-center py-12">
        <i class="pi pi-spin pi-spinner text-3xl text-[#2AA9E3]"></i>
        <p class="text-sm text-[#44505A] mt-2">جاري تحميل الخدمات...</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="service in services"
          :key="service.id"
          class="bg-white rounded-2xl border border-[#C7D8E1]/70 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col"
        >
          <div class="h-48 overflow-hidden relative">
            <img
              :src="service.icon || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80'"
              :alt="service.titleAr"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>

          <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div class="space-y-2">
              <h2 class="text-xl font-heading font-bold text-[#1F2A30] group-hover:text-[#0F6F9E] transition-colors">
                {{ service.titleAr }}
              </h2>
              <p class="text-xs text-[#44505A] leading-relaxed line-clamp-3">
                {{ service.shortDescriptionAr || service.descriptionAr }}
              </p>
            </div>

            <div class="pt-4 border-t border-[#C7D8E1]/50 flex items-center justify-between">
              <NuxtLink
                :to="`/services/${service.slug}`"
                class="text-xs font-bold text-[#0F6F9E] hover:underline flex items-center gap-1.5"
              >
                <span>تفاصيل الخدمة</span>
                <i class="pi pi-arrow-left text-[10px]"></i>
              </NuxtLink>
              <NuxtLink
                to="/contact"
                class="px-3 py-1.5 rounded-lg bg-[#F5F9FB] text-xs font-semibold text-[#1F2A30] hover:bg-[#2AA9E3] hover:text-[#1F2A30] transition-colors"
              >
                طلب تسعير
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useApiMethods } from "~/composables/useApiMethods";
import { API_ENDPOINTS } from "~/config/endpoints";
import type { ServiceItem } from "~/types";

const { getMethod } = useApiMethods();
const services = ref<ServiceItem[]>([]);

useHead({
  title: "خدمات المقاولات العامة والإنشاءات | معراج التشييد",
});

onMounted(async () => {
  const res = await getMethod(API_ENDPOINTS.PUBLIC.SERVICES);
  if (res?.data) {
    services.value = res.data;
  }
});
</script>
