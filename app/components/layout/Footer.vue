<template>
  <footer class="bg-[#1F2A30] text-white pt-16 pb-8 border-t-4 border-[#2AA9E3] font-body" dir="rtl">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Main Footer Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#2B3238]">
        <!-- Col 1: About & Logo -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-white p-2 flex items-center justify-center shrink-0">
              <img src="/logo.png" alt="معراج التشييد" class="w-full h-full object-contain" />
            </div>
            <div>
              <span class="font-heading font-bold text-lg text-white block leading-tight">معراج التشييد</span>
              <span class="text-[11px] text-[#2AA9E3] font-semibold">للمقاولات العامة</span>
            </div>
          </div>

          <p class="text-xs text-[#C7D8E1] leading-relaxed">
            شركة وطنية رائدة متخصصة في تنفيذ المشروعات الإنشائية، التشطيبات الفاخرة، والأعمال الكهروميكانيكية والبنية التحتية بأعلى معايير كود البناء السعودي.
          </p>

          <div class="flex items-center gap-3 pt-2">
            <a
              v-if="company?.socialLinks?.twitter"
              :href="company.socialLinks.twitter"
              target="_blank"
              class="w-8 h-8 rounded-lg bg-[#2B3238] flex items-center justify-center text-[#C7D8E1] hover:text-[#2AA9E3] hover:bg-[#182025] transition-colors"
              aria-label="منصة X"
            >
              <i class="pi pi-twitter text-sm"></i>
            </a>
            <a
              v-if="company?.socialLinks?.linkedin"
              :href="company.socialLinks.linkedin"
              target="_blank"
              class="w-8 h-8 rounded-lg bg-[#2B3238] flex items-center justify-center text-[#C7D8E1] hover:text-[#2AA9E3] hover:bg-[#182025] transition-colors"
              aria-label="لينكد إن"
            >
              <i class="pi pi-linkedin text-sm"></i>
            </a>
            <a
              v-if="company?.socialLinks?.instagram"
              :href="company.socialLinks.instagram"
              target="_blank"
              class="w-8 h-8 rounded-lg bg-[#2B3238] flex items-center justify-center text-[#C7D8E1] hover:text-[#2AA9E3] hover:bg-[#182025] transition-colors"
              aria-label="إنستغرام"
            >
              <i class="pi pi-instagram text-sm"></i>
            </a>
            <a
              v-if="company?.socialLinks?.whatsapp"
              :href="company.socialLinks.whatsapp"
              target="_blank"
              class="w-8 h-8 rounded-lg bg-[#2B3238] flex items-center justify-center text-[#C7D8E1] hover:text-[#2AA9E3] hover:bg-[#182025] transition-colors"
              aria-label="واتساب"
            >
              <i class="pi pi-whatsapp text-sm"></i>
            </a>
          </div>
        </div>

        <!-- Col 2: Quick Links -->
        <div class="space-y-4">
          <h4 class="font-heading font-bold text-base text-white border-b border-[#2B3238] pb-2">روابط سريعة</h4>
          <ul class="space-y-2 text-xs">
            <li>
              <NuxtLink to="/" class="text-[#C7D8E1] hover:text-[#2AA9E3] transition-colors flex items-center gap-2">
                <i class="pi pi-angle-left text-[10px] text-[#2AA9E3]"></i>
                <span>الرئيسية</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="text-[#C7D8E1] hover:text-[#2AA9E3] transition-colors flex items-center gap-2">
                <i class="pi pi-angle-left text-[10px] text-[#2AA9E3]"></i>
                <span>عن الشركة ورؤيتنا</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/services" class="text-[#C7D8E1] hover:text-[#2AA9E3] transition-colors flex items-center gap-2">
                <i class="pi pi-angle-left text-[10px] text-[#2AA9E3]"></i>
                <span>خدماتنا الإنشائية</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/projects" class="text-[#C7D8E1] hover:text-[#2AA9E3] transition-colors flex items-center gap-2">
                <i class="pi pi-angle-left text-[10px] text-[#2AA9E3]"></i>
                <span>سجل المشاريع المنجزة</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="text-[#C7D8E1] hover:text-[#2AA9E3] transition-colors flex items-center gap-2">
                <i class="pi pi-angle-left text-[10px] text-[#2AA9E3]"></i>
                <span>طلب استشارة وعرض سعر</span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Col 3: Services Links -->
        <div class="space-y-4">
          <h4 class="font-heading font-bold text-base text-white border-b border-[#2B3238] pb-2">مجالات تخصصنا</h4>
          <ul class="space-y-2 text-xs text-[#C7D8E1]">
            <li class="flex items-center gap-2">
              <i class="pi pi-check text-[#2AA9E3] text-[10px]"></i>
              <span>المقاولات الإنشائية والعظم</span>
            </li>
            <li class="flex items-center gap-2">
              <i class="pi pi-check text-[#2AA9E3] text-[10px]"></i>
              <span>التشطيبات المعمارية والديكور</span>
            </li>
            <li class="flex items-center gap-2">
              <i class="pi pi-check text-[#2AA9E3] text-[10px]"></i>
              <span>الأعمال الكهروميكانيكية (MEP)</span>
            </li>
            <li class="flex items-center gap-2">
              <i class="pi pi-check text-[#2AA9E3] text-[10px]"></i>
              <span>الترميم وتدعيم المباني القائمة</span>
            </li>
            <li class="flex items-center gap-2">
              <i class="pi pi-check text-[#2AA9E3] text-[10px]"></i>
              <span>أعمال البنية التحتية وتطوير المواقع</span>
            </li>
          </ul>
        </div>

        <!-- Col 4: Contact & Legal -->
        <div class="space-y-4">
          <h4 class="font-heading font-bold text-base text-white border-b border-[#2B3238] pb-2">تواصل معنا</h4>
          <div class="space-y-3 text-xs text-[#C7D8E1]">
            <div class="flex items-start gap-2.5">
              <i class="pi pi-map-marker text-[#2AA9E3] mt-0.5"></i>
              <span>{{ company?.address || 'المملكة العربية السعودية، الرياض، طريق الملك فهد' }}</span>
            </div>
            <div class="flex items-center gap-2.5" dir="ltr">
              <a :href="`tel:${company?.phone || '+966114567890'}`" class="hover:text-[#2AA9E3]">
                {{ company?.phone || '+966 11 456 7890' }}
              </a>
              <i class="pi pi-phone text-[#2AA9E3]"></i>
            </div>
            <div class="flex items-center gap-2.5">
              <i class="pi pi-envelope text-[#2AA9E3]"></i>
              <a :href="`mailto:${company?.email || 'info@me3raj.sa'}`" class="hover:text-[#2AA9E3]">
                {{ company?.email || 'info@me3raj.sa' }}
              </a>
            </div>
            <div class="pt-2 text-[11px] text-[#A0AEC0] space-y-1">
              <div>سجل تجاري: <span class="text-white font-mono">{{ company?.crNumber || '1010894562' }}</span></div>
              <div>الرقم الضريبي: <span class="text-white font-mono">{{ company?.vatNumber || '310458921400003' }}</span></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#C7D8E1] gap-4">
        <p>جميع الحقوق محفوظة &copy; {{ new Date().getFullYear() }} شركة معراج التشييد للمقاولات العامة.</p>
        <p class="text-[11px]">معتمدون وفق كود البناء السعودي ومتطلبات السلامة المعتمدة.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useApiMethods } from "~/composables/useApiMethods";
import { API_ENDPOINTS } from "~/config/endpoints";
import type { CompanyInfo } from "~/types";

const { getMethod } = useApiMethods();
const company = ref<CompanyInfo | null>(null);

onMounted(async () => {
  const res = await getMethod(API_ENDPOINTS.PUBLIC.COMPANY_INFO);
  if (res?.data) {
    company.value = res.data;
  }
});
</script>
