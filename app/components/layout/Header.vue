<template>
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#C7D8E1] transition-all duration-300">
    <!-- Top Announcement / Contact Bar -->
    <div class="bg-[#1F2A30] text-white text-xs py-2 px-4 border-b border-[#2B3238] hidden md:block">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-6 text-[#C7D8E1]">
          <a :href="`tel:${company?.phone || '+966114567890'}`" class="flex items-center gap-2 hover:text-[#2AA9E3] transition-colors" dir="ltr">
            <span>{{ company?.phone || '+966 11 456 7890' }}</span>
            <i class="pi pi-phone text-[#2AA9E3]"></i>
          </a>
          <a :href="`mailto:${company?.email || 'info@me3raj.sa'}`" class="flex items-center gap-2 hover:text-[#2AA9E3] transition-colors">
            <i class="pi pi-envelope text-[#2AA9E3]"></i>
            <span>{{ company?.email || 'info@me3raj.sa' }}</span>
          </a>
          <span class="flex items-center gap-2">
            <i class="pi pi-map-marker text-[#2AA9E3]"></i>
            <span>{{ company?.city || 'الرياض' }}، {{ company?.country || 'المملكة العربية السعودية' }}</span>
          </span>
        </div>

        <div class="flex items-center gap-4">
          <span class="text-[#C7D8E1] text-[11px]">س.ت: {{ company?.crNumber || '1010894562' }}</span>
          <NuxtLink
            to="/admin"
            class="text-[11px] text-[#2AA9E3] hover:underline flex items-center gap-1 font-semibold"
          >
            <i class="pi pi-lock text-[10px]"></i>
            <span>بوابة الإدارة</span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <!-- Official Logo -->
      <NuxtLink to="/" class="flex items-center gap-3 shrink-0">
        <img
          src="/logo.png"
          alt="شركة معراج التشييد للمقاولات العامة"
          class="h-12 w-auto object-contain"
        />
        <div class="flex flex-col">
          <span class="font-heading font-bold text-lg text-[#1F2A30] leading-none tracking-tight">معراج التشييد</span>
          <span class="text-[10px] text-[#44505A] font-semibold mt-0.5">للمقاولات العامة</span>
        </div>
      </NuxtLink>

      <!-- Desktop Nav Links -->
      <nav class="hidden lg:flex items-center gap-8">
        <NuxtLink
          v-for="link in PUBLIC_NAV_LINKS"
          :key="link.to"
          :to="link.to"
          class="text-sm font-semibold transition-colors py-2 relative"
          :class="[
            isCurrentRoute(link.to)
              ? 'text-[#0F6F9E] font-bold after:absolute after:bottom-0 after:inset-x-0 after:h-0.5 after:bg-[#2AA9E3]'
              : 'text-[#1F2A30] hover:text-[#0F6F9E]'
          ]"
        >
          {{ link.labelAr }}
        </NuxtLink>
      </nav>

      <!-- Header CTA & Mobile Toggle -->
      <div class="flex items-center gap-4">
        <NuxtLink
          to="/contact"
          class="main-btn sm hidden sm:inline-flex !m-0 shadow-sm"
        >
          <i class="pi pi-send"></i>
          <span>طلب عرض سعر</span>
        </NuxtLink>

        <!-- Mobile Menu Button -->
        <button
          type="button"
          class="lg:hidden p-2 rounded-lg border border-[#C7D8E1] text-[#1F2A30] hover:bg-[#F5F9FB]"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          aria-label="القائمة"
        >
          <i :class="isMobileMenuOpen ? 'pi pi-times text-xl' : 'pi pi-bars text-xl'"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <div
      v-if="isMobileMenuOpen"
      class="lg:hidden bg-white border-b border-[#C7D8E1] px-4 pt-2 pb-6 space-y-3 shadow-xl"
    >
      <NuxtLink
        v-for="link in PUBLIC_NAV_LINKS"
        :key="link.to"
        :to="link.to"
        class="block py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors"
        :class="isCurrentRoute(link.to) ? 'bg-[#F5F9FB] text-[#0F6F9E]' : 'text-[#1F2A30] hover:bg-gray-50'"
        @click="isMobileMenuOpen = false"
      >
        {{ link.labelAr }}
      </NuxtLink>

      <div class="pt-3 border-t border-[#C7D8E1] space-y-2">
        <NuxtLink
          to="/contact"
          class="main-btn sm w-full !m-0 justify-center"
          @click="isMobileMenuOpen = false"
        >
          <i class="pi pi-send"></i>
          <span>طلب عرض سعر هندسي</span>
        </NuxtLink>
        <NuxtLink
          to="/admin"
          class="block text-center py-2 text-xs font-semibold text-[#0F6F9E]"
          @click="isMobileMenuOpen = false"
        >
          دخول لوحة التحكم CMS
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { PUBLIC_NAV_LINKS } from "~/config/navigation";
import { useApiMethods } from "~/composables/useApiMethods";
import { API_ENDPOINTS } from "~/config/endpoints";
import type { CompanyInfo } from "~/types";

const route = useRoute();
const isMobileMenuOpen = ref(false);
const { getMethod } = useApiMethods();

const company = ref<CompanyInfo | null>(null);

const isCurrentRoute = (path: string) => {
  const current = route.path.replace(/^\/(ar|en)/, '') || '/';
  if (path === '/') return current === '/';
  return current.startsWith(path);
};

onMounted(async () => {
  const res = await getMethod(API_ENDPOINTS.PUBLIC.COMPANY_INFO);
  if (res?.data) {
    company.value = res.data;
  }
});
</script>
