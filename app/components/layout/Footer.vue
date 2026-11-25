<template>
  <footer
    class="relative overflow-hidden bg-[#1F2A30] font-['IBM_Plex_Sans_Arabic'] text-white mt-5"
    dir="rtl"
  >
    <!-- Accent line (matches header) -->
    <div class="h-[3px] w-full bg-gradient-to-l from-[#2AA9E3] via-[#0F6F9E] to-[#1F2A30]"></div>

    <!-- Soft glow decoration -->
    <div
      class="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#2AA9E3]/10 blur-3xl"
    ></div>

    <div class="relative mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
      <!-- CTA band -->
      <div
        class="flex flex-col items-start justify-between gap-5 rounded-3xl bg-[#182025] p-6 ring-1 ring-[#2B3238] sm:flex-row sm:items-center sm:p-8"
      >
        <div class="flex items-center gap-4">
          <span
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2AA9E3]/15 text-[#2AA9E3] ring-1 ring-[#2AA9E3]/30"
          >
            <i class="pi pi-comments text-lg"></i>
          </span>
          <p class="font-['Reem_Kufi'] text-xl font-bold leading-snug text-white sm:text-2xl">
            طلب استشارة وعرض سعر
          </p>
        </div>

        <NuxtLink
          to="/contact"
          class="group inline-flex items-center gap-3 rounded-full bg-[#2AA9E3] py-1.5 pl-1.5 pr-6 text-sm font-bold text-[#1F2A30] transition-all duration-300 hover:bg-[#2298cf] hover:shadow-[0_8px_20px_-6px_rgba(42,169,227,0.5)]"
        >
          <span>تواصل معنا</span>
          <span
            class="flex h-9 w-9 items-center justify-center rounded-full bg-[#1F2A30] text-[#2AA9E3] transition-transform duration-300 group-hover:-translate-x-0.5"
          >
            <i class="pi pi-arrow-left text-xs"></i>
          </span>
        </NuxtLink>
      </div>

      <!-- Main Footer Grid -->
      <div
        class="grid grid-cols-1 gap-12 border-b border-[#2B3238] py-14 md:grid-cols-2 lg:grid-cols-12"
      >
        <!-- Col 1: About & Logo -->
        <div class="space-y-5 lg:col-span-4">
          <div class="flex items-center gap-3">
            <div
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white p-2 ring-4 ring-[#2B3238]"
            >
              <img src="/logo.png" alt="معراج التشييد" class="h-full w-full object-contain" />
            </div>
            <div class="flex flex-col">
              <span class="font-['Reem_Kufi'] text-xl font-bold leading-none text-white">
                معراج التشييد
              </span>
              <span class="mt-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-[#2AA9E3]">
                <span class="h-[2px] w-4 rounded-full bg-[#2AA9E3]"></span>
                للمقاولات العامة
              </span>
            </div>
          </div>

          <p class="max-w-sm text-[13px] leading-loose text-[#C7D8E1]">
            شركة وطنية رائدة متخصصة في تنفيذ المشروعات الإنشائية، التشطيبات الفاخرة، والأعمال الكهروميكانيكية والبنية التحتية بأعلى معايير كود البناء السعودي.
          </p>

          <div class="flex items-center gap-2.5 pt-1">
            <a
              v-if="company?.socialLinks?.twitter"
              :href="company.socialLinks.twitter"
              target="_blank"
              rel="noopener"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-[#2B3238] text-[#C7D8E1] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2AA9E3] hover:text-[#1F2A30]"
              aria-label="منصة X"
            >
              <i class="pi pi-twitter text-sm"></i>
            </a>
            <a
              v-if="company?.socialLinks?.linkedin"
              :href="company.socialLinks.linkedin"
              target="_blank"
              rel="noopener"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-[#2B3238] text-[#C7D8E1] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2AA9E3] hover:text-[#1F2A30]"
              aria-label="لينكد إن"
            >
              <i class="pi pi-linkedin text-sm"></i>
            </a>
            <a
              v-if="company?.socialLinks?.instagram"
              :href="company.socialLinks.instagram"
              target="_blank"
              rel="noopener"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-[#2B3238] text-[#C7D8E1] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2AA9E3] hover:text-[#1F2A30]"
              aria-label="إنستغرام"
            >
              <i class="pi pi-instagram text-sm"></i>
            </a>
            <a
              v-if="company?.socialLinks?.whatsapp"
              :href="company.socialLinks.whatsapp"
              target="_blank"
              rel="noopener"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-[#2B3238] text-[#C7D8E1] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2AA9E3] hover:text-[#1F2A30]"
              aria-label="واتساب"
            >
              <i class="pi pi-whatsapp text-sm"></i>
            </a>
          </div>
        </div>

        <!-- Col 2: Quick Links -->
        <div class="lg:col-span-2">
          <h4 class="mb-5 flex items-center gap-2 font-['Reem_Kufi'] text-lg font-bold text-white">
            <span class="h-5 w-1 rounded-full bg-[#2AA9E3]"></span>
            روابط سريعة
          </h4>
          <ul class="space-y-1 text-[13px]">
            <li v-for="link in quickLinks" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="group flex items-center gap-2.5 rounded-lg py-1.5 text-[#C7D8E1] transition-all duration-200 hover:-translate-x-1 hover:text-[#2AA9E3]"
              >
                <i class="pi pi-angle-left text-[10px] text-[#2AA9E3] transition-transform group-hover:-translate-x-0.5"></i>
                <span>{{ link.label }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Col 3: Specialties -->
        <div class="lg:col-span-3">
          <h4 class="mb-5 flex items-center gap-2 font-['Reem_Kufi'] text-lg font-bold text-white">
            <span class="h-5 w-1 rounded-full bg-[#2AA9E3]"></span>
            مجالات تخصصنا
          </h4>
          <ul class="flex flex-wrap gap-2 text-[12px]">
            <li
              v-for="item in specialties"
              :key="item"
              class="flex items-center gap-2 rounded-full bg-[#2B3238]/70 px-3.5 py-2 text-[#C7D8E1] ring-1 ring-[#2B3238] transition-colors duration-200 hover:bg-[#182025] hover:text-white hover:ring-[#2AA9E3]/50"
            >
              <i class="pi pi-check text-[9px] text-[#2AA9E3]"></i>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <!-- Col 4: Contact & Legal -->
        <div class="lg:col-span-3">
          <h4 class="mb-5 flex items-center gap-2 font-['Reem_Kufi'] text-lg font-bold text-white">
            <span class="h-5 w-1 rounded-full bg-[#2AA9E3]"></span>
            تواصل معنا
          </h4>

          <div class="space-y-3.5 text-[13px] text-[#C7D8E1]">
            <div class="flex items-start gap-3">
              <span
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2B3238] text-[#2AA9E3]"
              >
                <i class="pi pi-map-marker text-sm"></i>
              </span>
              <span class="pt-1.5 leading-relaxed">
                {{ company?.address || 'المملكة العربية السعودية، الرياض، طريق الملك فهد' }}
              </span>
            </div>

            <div class="flex items-center gap-3">
              <span
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2B3238] text-[#2AA9E3]"
              >
                <i class="pi pi-phone text-sm"></i>
              </span>
              <a
                :href="`tel:${company?.phone || '+966114567890'}`"
                class="font-semibold transition-colors hover:text-[#2AA9E3]"
                dir="ltr"
              >
                {{ company?.phone || '+966 11 456 7890' }}
              </a>
            </div>

            <div class="flex items-center gap-3">
              <span
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2B3238] text-[#2AA9E3]"
              >
                <i class="pi pi-envelope text-sm"></i>
              </span>
              <a
                :href="`mailto:${company?.email || 'info@me3raj.sa'}`"
                class="truncate transition-colors hover:text-[#2AA9E3]"
              >
                {{ company?.email || 'info@me3raj.sa' }}
              </a>
            </div>

            <div class="space-y-2 rounded-2xl bg-[#182025] p-4 text-[11px] text-[#A0AEC0] ring-1 ring-[#2B3238]">
              <div class="flex items-center justify-between gap-3">
                <span>سجل تجاري</span>
                <span class="font-mono text-white">{{ company?.crNumber || '1010894562' }}</span>
              </div>
              <div class="h-px bg-[#2B3238]"></div>
              <div class="flex items-center justify-between gap-3">
                <span>الرقم الضريبي</span>
                <span class="font-mono text-white">{{ company?.vatNumber || '310458921400003' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div
        class="flex flex-col items-center justify-between gap-3 py-6 text-xs text-[#C7D8E1] sm:flex-row"
      >
        <p>جميع الحقوق محفوظة &copy; {{ new Date().getFullYear() }} شركة معراج التشييد للمقاولات العامة.</p>
        <p
          class="rounded-full bg-[#182025] px-4 py-1.5 text-[11px] ring-1 ring-[#2B3238]"
        >
          معتمدون وفق كود البناء السعودي ومتطلبات السلامة المعتمدة.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useApiMethods } from "~/composables/useApiMethods";
import { API_ENDPOINTS } from "~/config/endpoints";
import type { CompanyInfo } from "~/types";

const { getMethod } = useApiMethods();
const company = ref<CompanyInfo | null>(null);

const quickLinks = [
  { to: "/", label: "الرئيسية" },
  { to: "/about", label: "عن الشركة ورؤيتنا" },
  { to: "/services", label: "خدماتنا الإنشائية" },
  { to: "/projects", label: "سجل المشاريع المنجزة" },
  { to: "/contact", label: "طلب استشارة وعرض سعر" },
];

const specialties = [
  "المقاولات الإنشائية والعظم",
  "التشطيبات المعمارية والديكور",
  "الأعمال الكهروميكانيكية (MEP)",
  "الترميم وتدعيم المباني القائمة",
  "أعمال البنية التحتية وتطوير المواقع",
];

onMounted(async () => {
  try {
    const res = await getMethod(API_ENDPOINTS.PUBLIC.COMPANY_INFO);
    if (res?.data) {
      company.value = res.data;
    }
  } catch (error) {
    console.error("Failed to load company information:", error);
  }
});
</script>