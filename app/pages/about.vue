<template>
  <div class="py-12 bg-[#F5F9FB] min-h-screen">
    <!-- Hero / Header Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div class="bg-gradient-to-l from-[#1F2A30] to-[#2B3238] rounded-2xl p-8 md:p-14 text-white shadow-lg relative overflow-hidden">
        <div class="max-w-3xl relative z-10 space-y-4">
          <span class="inline-block py-1 px-3 rounded-full bg-[#2AA9E3]/20 text-[#2AA9E3] font-semibold text-xs border border-[#2AA9E3]/30">
            معراج التشييد للمقاولات العامة
          </span>
          <h1 class="text-3xl md:text-5xl font-heading font-bold text-white tracking-tight">
            عن الشركة ورؤيتنا المستقبلية
          </h1>
          <p class="text-sm md:text-base text-[#C7D8E1] leading-relaxed">
            ريادة هندسية ومعايير عالمية في تنفيذ المشاريع الإنشائية، التشطيبات الفاخرة، وأعمال البنية التحتية في المملكة العربية السعودية.
          </p>
        </div>
      </div>
    </section>

    <!-- Detailed About Content -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="space-y-6">
          <div class="inline-flex items-center gap-2 text-[#0F6F9E] font-semibold text-sm">
            <span class="w-8 h-0.5 bg-[#2AA9E3]"></span>
            <span>هويتنا وقيمنا</span>
          </div>
          <h2 class="text-2xl md:text-3xl font-heading font-bold text-[#1F2A30]">
            نبني بثقة، ونشيّد للمستقبل وفق أعلى مقاييس الجودة والسلامة
          </h2>
          <p class="text-sm md:text-base text-[#333333] leading-relaxed">
            {{ company?.description || 'تأسست شركة معراج التشييد للمقاولات العامة لتكون شريكاً استراتيجياً فاعلاً في مسيرة التنمية والتطوير العمراني بالمملكة العربية السعودية، متماشية مع مستهدفات رؤية المملكة 2030.' }}
          </p>
          <div class="space-y-4 pt-2">
            <div class="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#C7D8E1]/60 shadow-sm">
              <div class="w-10 h-10 rounded-lg bg-[#2AA9E3]/15 text-[#0F6F9E] flex items-center justify-center shrink-0">
                <i class="pi pi-check-circle text-lg"></i>
              </div>
              <div>
                <h3 class="font-heading font-bold text-[#1F2A30] text-base mb-1">الرؤية والهدف</h3>
                <p class="text-xs text-[#44505A] leading-relaxed">أن نكون الخيار الأول في قطاع الإنشاءات والمقاولات عبر تقديم حلول هندسية متكاملة تتجاوز تطلعات عملائنا.</p>
              </div>
            </div>

            <div class="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#C7D8E1]/60 shadow-sm">
              <div class="w-10 h-10 rounded-lg bg-[#2AA9E3]/15 text-[#0F6F9E] flex items-center justify-center shrink-0">
                <i class="pi pi-shield text-lg"></i>
              </div>
              <div>
                <h3 class="font-heading font-bold text-[#1F2A30] text-base mb-1">الجودة والسلامة المهنية</h3>
                <p class="text-xs text-[#44505A] leading-relaxed">نلتزم بأدق معايير كود البناء السعودي وأنظمة السلامة العالمية لضمان سلامة الكوادر واستدامة المشاريع.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="relative">
          <div class="rounded-2xl overflow-hidden shadow-xl border border-[#C7D8E1]/50 bg-white p-2">
            <img
              src="https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=1200&q=80"
              alt="معراج التشييد للمقاولات العامة"
              class="w-full h-[400px] object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Company Statistics Section -->
    <section class="bg-white border-y border-[#C7D8E1] py-16 mb-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div class="p-4">
            <div class="text-3xl md:text-4xl font-heading font-bold text-[#0F6F9E] mb-2">+15</div>
            <div class="text-xs md:text-sm font-medium text-[#44505A]">سنة من الخبرة الإنشائية</div>
          </div>
          <div class="p-4">
            <div class="text-3xl md:text-4xl font-heading font-bold text-[#0F6F9E] mb-2">+120</div>
            <div class="text-xs md:text-sm font-medium text-[#44505A]">مشروعاً منجزاً بنجاح</div>
          </div>
          <div class="p-4">
            <div class="text-3xl md:text-4xl font-heading font-bold text-[#0F6F9E] mb-2">+85</div>
            <div class="text-xs md:text-sm font-medium text-[#44505A]">مهندساً وخبيراً متخصصاً</div>
          </div>
          <div class="p-4">
            <div class="text-3xl md:text-4xl font-heading font-bold text-[#0F6F9E] mb-2">100%</div>
            <div class="text-xs md:text-sm font-medium text-[#44505A]">التزام بالمعايير والمواعيد</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-[#1F2A30] rounded-2xl p-8 md:p-12 text-center text-white space-y-6">
        <h2 class="text-2xl md:text-3xl font-heading font-bold">هل تبحث عن شريك إنشائي موثوق لمشروعك القادم؟</h2>
        <p class="text-sm text-[#C7D8E1] max-w-2xl mx-auto">فريقنا الهندسي على أتم الاستعداد لدراسة متطلبات مشروعك وتقديم عروض أسعار متكاملة وجداول تنفيذ دقيقة.</p>
        <div>
          <NuxtLink to="/contact" class="main-btn inline-flex">
            <i class="pi pi-phone"></i>
            <span>تواصل مع الفريق الهندسي</span>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useApiMethods } from "~/composables/useApiMethods";
import { API_ENDPOINTS } from "~/config/endpoints";
import type { CompanyInfo } from "~/types";

const { getMethod } = useApiMethods();
const company = ref<CompanyInfo | null>(null);

useHead({
  title: "عن شركة معراج التشييد للمقاولات العامة | الريادة في البناء",
});

onMounted(async () => {
  const res = await getMethod(API_ENDPOINTS.PUBLIC.COMPANY_INFO);
  if (res?.data) {
    company.value = res.data;
  }
});
</script>
