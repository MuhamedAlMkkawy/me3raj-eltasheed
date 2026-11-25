<template>
  <header
    class="site-header sticky top-0 z-50 border-b border-[#C7D8E1]/80 bg-[#efeff0] font-['IBM_Plex_Sans_Arabic'] text-[#333333] shadow-[0_8px_30px_-18px_rgba(31,42,48,0.22)] backdrop-blur-xl"
  >
    <!-- Utility Bar -->
    <div class="hidden bg-[#1F2A30] text-[#F5F9FB] md:block">
      <div class="mx-auto flex h-10 max-w-7xl items-center justify-between px-6 lg:px-8">
        <div class="flex items-center gap-6 text-[11px] text-[#C7D8E1]">
          <a
            :href="`tel:${company?.phone || '+966114567890'}`"
            class="flex items-center gap-2 transition-colors hover:text-white"
            dir="ltr"
          >
            <i class="pi pi-phone text-[#2AA9E3]"></i>
            <span class="font-semibold tracking-wide">{{ company?.phone || '+966 11 456 7890' }}</span>
          </a>

          <span class="h-4 w-px bg-[#44505A]"></span>

          <a
            :href="`mailto:${company?.email || 'info@me3raj.sa'}`"
            class="flex items-center gap-2 transition-colors hover:text-white"
          >
            <i class="pi pi-envelope text-[#2AA9E3]"></i>
            <span>{{ company?.email || 'info@me3raj.sa' }}</span>
          </a>

          <span class="h-4 w-px bg-[#44505A]"></span>

          <span class="flex items-center gap-2">
            <i class="pi pi-map-marker text-[#2AA9E3]"></i>
            <span>{{ company?.city || 'الرياض' }}، {{ company?.country || 'المملكة العربية السعودية' }}</span>
          </span>
        </div>

        <div class="flex items-center gap-5">
          <span class="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium text-[#C7D8E1]">
            السجل التجاري:
            <span class="mr-1 font-bold text-white">{{ company?.crNumber || '1010894562' }}</span>
          </span>

          <NuxtLink
            to="/admin"
            class="flex items-center gap-2 text-[11px] font-semibold text-[#2AA9E3] transition-colors hover:text-white"
          >
            <i class="pi pi-lock text-[10px]"></i>
            <span>بوابة الإدارة</span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Main Navigation -->
  <div class="mx-auto flex h-[82px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
    <NuxtLink
      to="/"
      class="group flex shrink-0 items-center gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F6F9E]"
      aria-label="الصفحة الرئيسية"
    >
      <!-- logo plate with survey-mark corners -->
      <span class="relative flex h-[58px] w-[66px] items-center justify-center bg-white">
        <span class="absolute -right-1 -top-1 h-3 w-3 border-r-2 border-t-2 border-[#2AA9E3] transition-all duration-300 group-hover:h-4 group-hover:w-4"></span>
        <span class="absolute -left-1 -top-1 h-3 w-3 border-l-2 border-t-2 border-[#2AA9E3] transition-all duration-300 group-hover:h-4 group-hover:w-4"></span>
        <span class="absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-[#2AA9E3] transition-all duration-300 group-hover:h-4 group-hover:w-4"></span>
        <span class="absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2 border-[#2AA9E3] transition-all duration-300 group-hover:h-4 group-hover:w-4"></span>
        <img
          src="@/assets/images/logo.gif"
          alt="شركة معراج التشييد للمقاولات العامة"
          class="h-16 w-auto object-cover"
        />
      </span>

      <span class="h-10 w-px bg-[#C7D8E1]"></span>

      <!-- name + dimension-line tagline -->
      <span class="flex flex-col gap-2">
        <span class="font-['Reem_Kufi'] text-[22px] font-bold leading-none text-[#14202A] transition-colors duration-300 group-hover:text-[#0F6F9E]">
          معراج التشييد
        </span>
        <span class="flex items-center gap-2 text-[10px] font-medium text-[#44505A] sm:text-[11px]">
          <span class="h-2.5 w-px bg-[#2AA9E3]"></span>
          <span class="h-px w-5 bg-[#2AA9E3]/60 transition-all duration-300 group-hover:w-8"></span>
          للمقاولات العامة والتطوير
        </span>
      </span>
    </NuxtLink>

      <!-- Desktop Links -->
      <nav class="hidden h-full items-center gap-1 lg:flex" aria-label="القائمة الرئيسية">
        <NuxtLink
          v-for="link in PUBLIC_NAV_LINKS"
          :key="link.to"
          :to="link.to"
          class="group relative flex h-full items-center px-3.5 text-[13px] transition-colors duration-200"
          :class="isCurrentRoute(link.to) ? 'font-bold text-[#0F6F9E]' : 'font-semibold text-[#44505A] hover:text-[#0F6F9E]'"
        >
          {{ link.labelAr }}
          <span
            class="absolute bottom-[19px] left-3.5 right-3.5 h-[3px] origin-right rounded-full bg-[#2AA9E3] transition-transform duration-300"
            :class="isCurrentRoute(link.to) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'"
          ></span>
        </NuxtLink>
      </nav>

      <!-- Actions -->
      <div class="flex items-center gap-3">
        <NuxtLink
          to="/contact"
          class="group hidden items-center gap-3 rounded-xl bg-[#2AA9E3] px-5 py-3 text-[12px] font-bold text-[#1F2A30] shadow-[0_4px_12px_rgba(42,169,227,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2298cf] hover:shadow-[0_7px_18px_rgba(42,169,227,0.25)] sm:inline-flex"
        >
          <span>طلب عرض سعر</span>
          <i class="pi pi-arrow-left text-[11px] transition-transform duration-300 group-hover:-translate-x-1"></i>
        </NuxtLink>

        <button
          type="button"
          class="flex h-11 w-11 items-center justify-center rounded-xl border border-[#C7D8E1] bg-[#F5F9FB] text-[#1F2A30] transition-all duration-200 hover:border-[#2AA9E3] hover:bg-[#EAF6FC] lg:hidden"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          :aria-expanded="isMobileMenuOpen"
          aria-label="القائمة"
        >
          <i :class="isMobileMenuOpen ? 'pi pi-times text-lg' : 'pi pi-bars text-lg'"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-3"
    >
      <div
        v-if="isMobileMenuOpen"
        class="absolute left-0 right-0 top-full border-t border-[#C7D8E1] bg-white shadow-[0_20px_35px_-15px_rgba(31,42,48,0.22)] lg:hidden"
      >
        <div class="mx-auto max-w-7xl px-4 pb-6 pt-5 sm:px-6">
          <div class="mb-5 flex items-center gap-3 rounded-2xl border border-[#C7D8E1]/70 bg-[#F5F9FB] p-4">
            <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#C7D8E1] bg-white">
              <img src="/logo.png" alt="معراج التشييد" class="h-8 w-auto object-contain" />
            </div>
            <div class="flex flex-col gap-1">
              <span class="font-['Reem_Kufi'] text-sm font-bold text-[#1F2A30]">معراج التشييد</span>
              <span class="text-[10px] text-[#44505A]">للمقاولات العامة والتطوير</span>
            </div>
          </div>

          <nav class="space-y-1.5" aria-label="قائمة الهاتف">
            <NuxtLink
              v-for="(link, index) in PUBLIC_NAV_LINKS"
              :key="link.to"
              :to="link.to"
              class="group flex items-center justify-between rounded-xl border px-4 py-3.5 text-sm transition-all duration-200"
              :class="isCurrentRoute(link.to) ? 'border-[#2AA9E3]/30 bg-[#EAF6FC] font-bold text-[#0F6F9E]' : 'border-transparent text-[#333333] hover:border-[#C7D8E1] hover:bg-[#F5F9FB] hover:text-[#0F6F9E]'"
              @click="isMobileMenuOpen = false"
            >
              <div class="flex items-center gap-3">
                <span
                  class="flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-bold"
                  :class="isCurrentRoute(link.to) ? 'bg-[#2AA9E3] text-[#1F2A30]' : 'bg-[#F5F9FB] text-[#44505A]'"
                >
                  {{ String(index + 1).padStart(2, '0') }}
                </span>
                <span>{{ link.labelAr }}</span>
              </div>
              <i v-if="isCurrentRoute(link.to)" class="pi pi-check-circle text-sm text-[#2AA9E3]"></i>
              <i v-else class="pi pi-angle-left text-xs text-[#C7D8E1] transition-transform group-hover:-translate-x-1 group-hover:text-[#0F6F9E]"></i>
            </NuxtLink>
          </nav>

          <div class="mt-5 space-y-3 rounded-2xl border border-[#C7D8E1] bg-[#F5F9FB] p-4">
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-2 text-xs text-[#44505A]">
                <i class="pi pi-phone text-[#0F6F9E]"></i>
                <span>الهاتف الموحد</span>
              </div>
              <a :href="`tel:${company?.phone || '+966114567890'}`" class="text-xs font-bold text-[#1F2A30]" dir="ltr">
                {{ company?.phone || '+966 11 456 7890' }}
              </a>
            </div>

            <div class="h-px bg-[#C7D8E1]"></div>

            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-2 text-xs text-[#44505A]">
                <i class="pi pi-envelope text-[#0F6F9E]"></i>
                <span>البريد الإلكتروني</span>
              </div>
              <a :href="`mailto:${company?.email || 'info@me3raj.sa'}`" class="max-w-[65%] truncate text-xs font-semibold text-[#1F2A30]">
                {{ company?.email || 'info@me3raj.sa' }}
              </a>
            </div>

            <div class="h-px bg-[#C7D8E1]"></div>

            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-2 text-xs text-[#44505A]">
                <i class="pi pi-building text-[#0F6F9E]"></i>
                <span>السجل التجاري</span>
              </div>
              <span class="text-xs font-bold text-[#1F2A30]">{{ company?.crNumber || '1010894562' }}</span>
            </div>
          </div>

          <div class="mt-5 grid grid-cols-1 gap-2.5">
            <NuxtLink
              to="/contact"
              class="flex items-center justify-center gap-3 rounded-xl bg-[#2AA9E3] px-5 py-3.5 text-sm font-bold text-[#1F2A30] shadow-sm transition-all hover:bg-[#2298cf]"
              @click="isMobileMenuOpen = false"
            >
              <i class="pi pi-send text-xs"></i>
              <span>طلب عرض سعر هندسي</span>
              <i class="pi pi-arrow-left text-[10px]"></i>
            </NuxtLink>

            <NuxtLink
              to="/admin"
              class="flex items-center justify-center gap-2 rounded-xl border border-[#C7D8E1] bg-white py-3 text-xs font-bold text-[#0F6F9E] transition-all hover:bg-[#F5F9FB]"
              @click="isMobileMenuOpen = false"
            >
              <i class="pi pi-lock text-xs"></i>
              <span>دخول لوحة التحكم CMS</span>
            </NuxtLink>
          </div>

          <div class="mt-5 text-center text-[10px] text-[#44505A]">
            {{ company?.city || 'الرياض' }}، {{ company?.country || 'المملكة العربية السعودية' }}
          </div>
        </div>
      </div>
    </Transition>
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
  const current = route.path.replace(/^\/(ar|en)/, "") || "/";
  if (path === "/") return current === "/";
  return current === path || current.startsWith(`${path}/`);
};

onMounted(async () => {
  try {
    const res = await getMethod(API_ENDPOINTS.PUBLIC.COMPANY_INFO);
    if (res?.data) company.value = res.data;
  } catch (error) {
    console.error("Failed to load company information:", error);
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Reem+Kufi:wght@600;700&display=swap');

/*
 * Break out of any parent max-width, margin or horizontal padding.
 * The header background spans the viewport; its contents stay max-w-7xl.
 */
.site-header {
  width: 100vw;
  max-width: 100vw;
  margin-inline: calc(50% - 50vw);
  -webkit-font-smoothing: antialiased;
}

@media (prefers-reduced-motion: reduce) {
  .site-header *,
  .site-header *::before,
  .site-header *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
</style>
