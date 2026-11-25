<template>
  <div class="py-12 bg-[#F5F9FB] min-h-screen">
    <!-- Header -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div class="bg-gradient-to-l from-[#1F2A30] to-[#2B3238] rounded-2xl p-8 md:p-14 text-white shadow-lg relative overflow-hidden">
        <div class="max-w-3xl relative z-10 space-y-4">
          <span class="inline-block py-1 px-3 rounded-full bg-[#2AA9E3]/20 text-[#2AA9E3] font-semibold text-xs border border-[#2AA9E3]/30">
            سجل الإنجازات
          </span>
          <h1 class="text-3xl md:text-5xl font-heading font-bold text-white tracking-tight">
            مشاريعنا وأعمالنا الإنشائية
          </h1>
          <p class="text-sm md:text-base text-[#C7D8E1] leading-relaxed">
            استعرض نخبة من المشاريع المتنوعة التي نفذتها معراج التشييد بأعلى معايير الإتقان والجودة عبر مختلف مناطق المملكة.
          </p>
        </div>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div v-if="projects.length === 0" class="text-center py-12">
        <i class="pi pi-spin pi-spinner text-3xl text-[#2AA9E3]"></i>
        <p class="text-sm text-[#44505A] mt-2">جاري تحميل المشاريع...</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="project in projects"
          :key="project.id"
          class="bg-white rounded-2xl border border-[#C7D8E1]/70 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col"
        >
          <div class="h-56 overflow-hidden relative">
            <img
              :src="project.coverImage || 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=800&q=80'"
              :alt="project.titleAr"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute top-4 right-4 bg-[#1F2A30]/80 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium">
              {{ project.category || 'إنشاءات' }}
            </div>
            <div class="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md text-[#1F2A30] text-xs px-2.5 py-1 rounded-lg font-bold">
              {{ project.status === 'completed' ? 'مكتمل' : 'قيد التنفيذ' }}
            </div>
          </div>

          <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div class="space-y-2">
              <h2 class="text-xl font-heading font-bold text-[#1F2A30] group-hover:text-[#0F6F9E] transition-colors">
                {{ project.titleAr }}
              </h2>
              <p class="text-xs text-[#44505A] leading-relaxed line-clamp-3">
                {{ project.shortDescriptionAr || project.descriptionAr }}
              </p>
            </div>

            <div class="pt-4 border-t border-[#C7D8E1]/50 flex items-center justify-between text-xs text-[#44505A]">
              <span class="flex items-center gap-1.5">
                <i class="pi pi-map-marker text-[#2AA9E3]"></i>
                <span>{{ project.location || 'الرياض' }}</span>
              </span>
              <NuxtLink
                :to="`/projects/${project.id}`"
                class="font-bold text-[#0F6F9E] hover:underline flex items-center gap-1"
              >
                <span>تفاصيل المشروع</span>
                <i class="pi pi-arrow-left text-[10px]"></i>
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
import type { ProjectItem } from "~/types";

const { getMethod } = useApiMethods();
const projects = ref<ProjectItem[]>([]);

useHead({
  title: "سجل المشاريع والأعمال | شركة معراج التشييد للمقاولات العامة",
});

onMounted(async () => {
  const res = await getMethod(API_ENDPOINTS.PUBLIC.PROJECTS);
  if (res?.data) {
    projects.value = res.data;
  }
});
</script>
