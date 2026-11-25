<template>
  <div class="homepage-view font-body text-[#333333] bg-[#F5F9FB]" dir="rtl">
    <!-- 1. HERO SECTION -->
    <section class="relative bg-[#1F2A30] text-white py-20 lg:py-28 overflow-hidden">
      <!-- Background Image with Dark & Primary Gradient Overlay -->
      <div class="absolute inset-0 z-0">
        <img
          :src="homepage?.heroBackgroundImage || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80'"
          alt="شركة معراج التشييد"
          class="w-full h-full object-cover opacity-20"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#1F2A30] via-[#1F2A30]/80 to-transparent"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="max-w-3xl space-y-6">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2AA9E3]/20 border border-[#2AA9E3]/40 text-[#2AA9E3] text-xs font-semibold">
            <i class="pi pi-verified text-sm"></i>
            <span>{{ homepage?.heroBadge || 'ريادة في المقاولات والبناء في المملكة العربية السعودية' }}</span>
          </div>

          <!-- Main Title -->
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight">
            {{ homepage?.heroTitle || 'نبني مستقبلاً مستداماً' }}
            <span class="text-[#2AA9E3] block mt-1">{{ homepage?.heroHighlight || 'بإتقان هندسي رفيع' }}</span>
          </h1>

          <!-- Subtitle -->
          <p class="text-sm sm:text-base text-[#C7D8E1] leading-relaxed max-w-2xl">
            {{ homepage?.heroSubtitle || 'شركة معراج التشييد تقدم حلولاً إنشائية ومعمارية متكاملة ترتقي بالمشاريع السكنية والتجارية والصناعية وفق كود البناء السعودي وأعلى معايير الجودة العالمية.' }}
          </p>

          <!-- Buttons -->
          <div class="flex flex-wrap items-center gap-4 pt-4">
            <!-- Primary button with dark text #1F2A30 -->
            <NuxtLink
              :to="homepage?.heroCtaLink || '/projects'"
              class="main-btn lg shadow-lg"
            >
              <i class="pi pi-building"></i>
              <span>{{ homepage?.heroCtaText || 'استكشف مشاريعنا' }}</span>
            </NuxtLink>

            <NuxtLink
              :to="homepage?.heroSecondaryCtaLink || '/contact'"
              class="main-btn lg btn-outline"
            >
              <i class="pi pi-send"></i>
              <span>{{ homepage?.heroSecondaryCtaText || 'طلب عرض سعر' }}</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Hero Stats Strip -->
        <div class="mt-16 pt-10 border-t border-[#2B3238] grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div
            v-for="st in (homepage?.stats || defaultStats)"
            :key="st.id"
            class="space-y-1"
          >
            <div class="text-2xl sm:text-3xl font-extrabold font-heading text-[#2AA9E3] flex items-center">
              <span>{{ st.number }}</span>
              <span>{{ st.suffix || '+' }}</span>
            </div>
            <div class="text-xs text-[#C7D8E1] font-medium">{{ st.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. ABOUT COMPANY SECTION -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Text Content -->
          <div class="space-y-6">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F9FB] border border-[#C7D8E1] text-[#0F6F9E] text-xs font-bold">
              <span>{{ homepage?.aboutBadge || 'من نحن' }}</span>
            </div>

            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-[#1F2A30] leading-snug">
              {{ homepage?.aboutTitle || 'شريكك الهندسي الموثوق لتحويل الرؤى إلى منجزات شامخة' }}
            </h2>

            <p class="text-sm text-[#44505A] leading-relaxed">
              {{ homepage?.aboutDescription || 'تأسست شركة معراج التشييد للمقاولات العامة ككيان وطني سعودي متخصص في تنفيذ أضخم المشاريع الإنشائية والتطويرية. نجمع بين الكفاءة الهندسية المتقدمة والتنفيذ الاحترافي الملتزم بالجداول الزمنية والميزانيات المحددة.' }}
            </p>

            <!-- Key Highlights List -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div class="flex items-center gap-3 p-3 rounded-lg bg-[#F5F9FB] border border-[#C7D8E1]">
                <i class="pi pi-check-circle text-[#2AA9E3] text-lg"></i>
                <span class="text-xs font-bold text-[#1F2A30]">مطابقة كود البناء السعودي</span>
              </div>
              <div class="flex items-center gap-3 p-3 rounded-lg bg-[#F5F9FB] border border-[#C7D8E1]">
                <i class="pi pi-shield text-[#2AA9E3] text-lg"></i>
                <span class="text-xs font-bold text-[#1F2A30]">ضمانات شاملة على الهيكل</span>
              </div>
              <div class="flex items-center gap-3 p-3 rounded-lg bg-[#F5F9FB] border border-[#C7D8E1]">
                <i class="pi pi-clock text-[#2AA9E3] text-lg"></i>
                <span class="text-xs font-bold text-[#1F2A30]">التزام دقيق بالجدول الزمني</span>
              </div>
              <div class="flex items-center gap-3 p-3 rounded-lg bg-[#F5F9FB] border border-[#C7D8E1]">
                <i class="pi pi-users text-[#2AA9E3] text-lg"></i>
                <span class="text-xs font-bold text-[#1F2A30]">كوادر هندسية وإشراف ميداني</span>
              </div>
            </div>

            <div class="pt-4">
              <NuxtLink to="/about" class="main-btn btn-outline sm !m-0">
                <span>المزيد عن مسيرتنا ورؤيتنا</span>
                <i class="pi pi-arrow-left text-xs mr-2"></i>
              </NuxtLink>
            </div>
          </div>

          <!-- Image Composition -->
          <div class="relative">
            <div class="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
              <img
                :src="homepage?.aboutImage1 || 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=800&q=80'"
                alt="تنفيذ هندسي لمشروع إنشائي"
                class="w-full h-full object-cover"
              />
            </div>
            <!-- Floating Experience Badge -->
            <div class="absolute -bottom-6 -right-6 bg-[#1F2A30] text-white p-5 rounded-2xl shadow-xl border border-[#2AA9E3] flex items-center gap-4">
              <div class="text-3xl font-extrabold font-heading text-[#2AA9E3]">
                {{ homepage?.aboutYearsExperience || 15 }}+
              </div>
              <div class="text-xs leading-tight font-medium text-[#C7D8E1]">
                عاماً من الريادة<br />في التشييد والبناء
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. SERVICES SECTION -->
    <section class="py-20 bg-[#F5F9FB] border-y border-[#C7D8E1]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span class="text-xs font-bold text-[#0F6F9E] bg-[#2AA9E3]/15 px-3 py-1 rounded-full uppercase">خدماتنا المعتمدة</span>
          <h2 class="text-2xl sm:text-3xl font-bold font-heading text-[#1F2A30]">حلول مقاولات متكاملة بمواصفات قياسية</h2>
          <p class="text-xs sm:text-sm text-[#44505A]">
            نقدم باقة واسعة من الخدمات الإنشائية المتخصصة التي تلبي تطلعات القطاعين الحكومي والخاص بأعلى مستويات الحرفية.
          </p>
        </div>

        <!-- Services Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="srv in services"
            :key="srv.id"
            class="bg-white rounded-2xl border border-[#C7D8E1] p-6 shadow-sm hover:shadow-xl hover:border-[#2AA9E3] transition-all flex flex-col justify-between group"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-[#2AA9E3]/15 text-[#0F6F9E] flex items-center justify-center text-2xl group-hover:bg-[#2AA9E3] group-hover:text-[#1F2A30] transition-colors">
                <i :class="srv.icon || 'pi pi-briefcase'"></i>
              </div>

              <h3 class="font-bold text-lg font-heading text-[#1F2A30] group-hover:text-[#0F6F9E] transition-colors">
                {{ srv.title }}
              </h3>

              <p class="text-xs text-[#44505A] leading-relaxed">
                {{ srv.shortDescription }}
              </p>

              <!-- Features checklist -->
              <ul v-if="srv.features && srv.features.length > 0" class="space-y-1.5 pt-2">
                <li
                  v-for="(feat, fIdx) in srv.features.slice(0, 3)"
                  :key="fIdx"
                  class="text-xs text-[#44505A] flex items-center gap-2"
                >
                  <i class="pi pi-check text-[#2AA9E3] text-[10px]"></i>
                  <span>{{ feat }}</span>
                </li>
              </ul>
            </div>

            <div class="pt-6 mt-4 border-t border-[#C7D8E1]/60">
              <NuxtLink
                :to="`/services/${srv.slug}`"
                class="text-xs font-bold text-[#0F6F9E] hover:text-[#1F2A30] flex items-center gap-1.5 transition-colors"
              >
                <span>تفاصيل الخدمة والمواصفات</span>
                <i class="pi pi-arrow-left text-[10px]"></i>
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="mt-12 text-center">
          <NuxtLink to="/services" class="main-btn btn-outline sm !m-0">
            <span>استعراض كافة الخدمات الهندسية</span>
            <i class="pi pi-arrow-left text-xs mr-2"></i>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 4. PROJECTS PORTFOLIO SECTION -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div class="space-y-3">
            <span class="text-xs font-bold text-[#0F6F9E] bg-[#2AA9E3]/15 px-3 py-1 rounded-full uppercase">سجل الإنجازات</span>
            <h2 class="text-2xl sm:text-3xl font-bold font-heading text-[#1F2A30]">أحدث المشاريع المشيّدة</h2>
            <p class="text-xs sm:text-sm text-[#44505A] max-w-xl">
              نماذج من منجزاتنا في مختلف مناطق المملكة تبرهن على التزامنا بالجودة، المتانة، والدقة المعمارية.
            </p>
          </div>

          <NuxtLink to="/projects" class="main-btn btn-outline sm !m-0 shrink-0">
            <span>عرض معرض المشاريع كاملاً</span>
            <i class="pi pi-arrow-left text-xs mr-2"></i>
          </NuxtLink>
        </div>

        <!-- Projects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="prj in featuredProjects"
            :key="prj.id"
            class="bg-white rounded-2xl border border-[#C7D8E1] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#2AA9E3] transition-all flex flex-col justify-between group"
          >
            <div>
              <!-- Cover Image with Aspect Ratio -->
              <div class="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  :src="prj.coverImage || '/logo.png'"
                  :alt="prj.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span class="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#1F2A30]/90 text-white text-[11px] font-semibold backdrop-blur-sm">
                  {{ prj.category }}
                </span>
                <span
                  class="absolute bottom-3 left-3 px-2.5 py-0.5 rounded text-[10px] font-bold"
                  :class="prj.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'"
                >
                  {{ prj.status === 'completed' ? 'مكتمل' : 'قيد التنفيذ' }}
                </span>
              </div>

              <!-- Details -->
              <div class="p-5 space-y-2">
                <div class="flex items-center gap-2 text-[11px] text-[#44505A]">
                  <i class="pi pi-map-marker text-[#2AA9E3]"></i>
                  <span>{{ prj.location }}</span>
                  <span class="text-gray-300">&bull;</span>
                  <span>{{ prj.year }}</span>
                </div>

                <h3 class="font-bold text-base font-heading text-[#1F2A30] group-hover:text-[#0F6F9E] transition-colors leading-snug">
                  {{ prj.title }}
                </h3>

                <p class="text-xs text-[#44505A] line-clamp-2 leading-relaxed">
                  {{ prj.description }}
                </p>
              </div>
            </div>

            <div class="px-5 pb-5 pt-2 border-t border-[#C7D8E1]/60 flex items-center justify-between">
              <span class="text-xs font-bold text-[#0F6F9E]">{{ prj.area ? `المساحة: ${prj.area}` : prj.client }}</span>
              <NuxtLink
                :to="`/projects/${prj.id}`"
                class="main-btn sm !m-0 !h-8 !px-3 text-xs"
              >
                <span>تفاصيل المشروع</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. WHY CHOOSE US SECTION -->
    <section class="py-20 bg-[#1F2A30] text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span class="text-xs font-bold text-[#2AA9E3] bg-[#2AA9E3]/20 px-3 py-1 rounded-full uppercase">قيمنا وتميزنا</span>
          <h2 class="text-2xl sm:text-3xl font-bold font-heading text-white">لماذا يختار العملاء معراج التشييد؟</h2>
          <p class="text-xs sm:text-sm text-[#C7D8E1]">
            نضع الشفافية والموثوقية في صميم علاقتنا مع كل عميل، مدعومين برصيد موثوق من الالتزام والخبرة الهندسية.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="item in (homepage?.whyUs || defaultWhyUs)"
            :key="item.id"
            class="bg-[#2B3238] rounded-2xl p-6 border border-[#44505A]/50 hover:border-[#2AA9E3] transition-colors space-y-3"
          >
            <div class="w-12 h-12 rounded-xl bg-[#2AA9E3] text-[#1F2A30] flex items-center justify-center text-xl font-bold">
              <i :class="item.icon || 'pi pi-check'"></i>
            </div>
            <h3 class="text-base font-bold font-heading text-white">{{ item.title }}</h3>
            <p class="text-xs text-[#C7D8E1] leading-relaxed">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. WORK PROCESS SECTION -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span class="text-xs font-bold text-[#0F6F9E] bg-[#2AA9E3]/15 px-3 py-1 rounded-full uppercase">منهجية العمل</span>
          <h2 class="text-2xl sm:text-3xl font-bold font-heading text-[#1F2A30]">كيف نُدير ونُنفّذ مشروعك؟</h2>
          <p class="text-xs sm:text-sm text-[#44505A]">
            نتبع خطة عمل هندسية محكمة من الاستشارة الأولية وحتى التسليم النهائي والضمان.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="proc in (homepage?.process || defaultProcess)"
            :key="proc.step"
            class="relative p-6 rounded-2xl bg-[#F5F9FB] border border-[#C7D8E1] space-y-3"
          >
            <div class="w-10 h-10 rounded-full bg-[#1F2A30] text-[#2AA9E3] font-extrabold text-sm flex items-center justify-center font-heading">
              0{{ proc.step }}
            </div>
            <h3 class="text-base font-bold font-heading text-[#1F2A30]">{{ proc.title }}</h3>
            <p class="text-xs text-[#44505A] leading-relaxed">{{ proc.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. TESTIMONIALS SECTION -->
    <section class="py-20 bg-[#F5F9FB] border-t border-[#C7D8E1]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span class="text-xs font-bold text-[#0F6F9E] bg-[#2AA9E3]/15 px-3 py-1 rounded-full uppercase">آراء العملاء</span>
          <h2 class="text-2xl sm:text-3xl font-bold font-heading text-[#1F2A30]">شهادات نعتز بها من شركاء النجاح</h2>
          <p class="text-xs sm:text-sm text-[#44505A]">
            ثقة عملائنا وشركائنا التجاريين والمؤسسيين هي المقياس الحقيقي لتميزنا.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div
            v-for="test in (homepage?.testimonials || defaultTestimonials)"
            :key="test.id"
            class="bg-white p-8 rounded-2xl border border-[#C7D8E1] shadow-sm space-y-4 relative"
          >
            <div class="flex items-center gap-1 text-amber-400">
              <i v-for="s in test.rating" :key="s" class="pi pi-star-fill text-xs"></i>
            </div>

            <p class="text-xs text-[#333333] leading-relaxed italic">
              "{{ test.content }}"
            </p>

            <div class="pt-4 border-t border-[#C7D8E1] flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-[#2AA9E3]/20 text-[#0F6F9E] font-bold flex items-center justify-center shrink-0">
                {{ test.clientName[0] }}
              </div>
              <div>
                <span class="font-bold text-xs text-[#1F2A30] block">{{ test.clientName }}</span>
                <span class="text-[11px] text-[#44505A]">{{ test.role }} - {{ test.company }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 8. HIGH-IMPACT CTA SECTION -->
    <section class="py-16 bg-gradient-to-r from-[#1F2A30] to-[#2B3238] text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-white">
          {{ homepage?.ctaTitle || 'جاهز للبدء في تشييد مشروعك القادم؟' }}
        </h2>
        <p class="text-xs sm:text-sm text-[#C7D8E1] max-w-2xl mx-auto">
          {{ homepage?.ctaSubtitle || 'تواصل مع مستشارينا الهندسيين اليوم للحصول على دراسة فنية وعرض سعر مخصص لمشروعك.' }}
        </p>
        <div>
          <NuxtLink
            :to="homepage?.ctaButtonLink || '/contact'"
            class="main-btn lg shadow-xl inline-flex !m-0"
          >
            <i class="pi pi-send"></i>
            <span>{{ homepage?.ctaButtonText || 'تواصل معنا الآن' }}</span>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useApiMethods } from "~/composables/useApiMethods";
import { API_ENDPOINTS } from "~/config/endpoints";
import type { HomepageContent, Service, Project } from "~/types";

const { getMethod } = useApiMethods();

const homepage = ref<HomepageContent | null>(null);
const services = ref<Service[]>([]);
const projects = ref<Project[]>([]);

const defaultStats = [
  { id: "1", number: 140, suffix: "+", label: "مشروع منجز بنجاح" },
  { id: "2", number: 15, suffix: "+", label: "عاماً من الخبرة" },
  { id: "3", number: 450, suffix: "+", label: "مهندس وفني متخصص" },
  { id: "4", number: 99, suffix: "%", label: "نسبة رضا عملائنا" },
];

const defaultWhyUs = [
  { id: "1", title: "الالتزام الدقيق بالمواعيد", description: "ندير مشاريعنا بجداول زمنية صارمة تضمن التسليم في الموعد.", icon: "pi pi-clock" },
  { id: "2", title: "أعلى معايير الجودة والسلامة", description: "نطبق كود البناء السعودي ومعايير ISO في إدارة الجودة والسلامة.", icon: "pi pi-shield" },
  { id: "3", title: "كوادر هندسية نخبوية", description: "فريق من المهندسين ذوي التجربة الميدانية الواسعة في مشاريع كبرى.", icon: "pi pi-verified" },
  { id: "4", title: "عقود واضحة وضمانات معتمدة", description: "شفافية كاملة في التسعير مع تقديم ضمانات رسمية معتمدة.", icon: "pi pi-file-check" },
];

const defaultProcess = [
  { step: 1, title: "الدراسة والاستشارة", description: "تحليل المخططات الهندسية وتحديد المتطلبات الفنية بدقة." },
  { step: 2, title: "التخطيط والميزانية", description: "إعداد الجدول الزمني المفصل وتحديد التكلفة الإجمالية بشفافية." },
  { step: 3, title: "التنفيذ والإشراف", description: "بدء الأعمال الإنشائية مع إشراف هندسي يومي وتقارير دورية." },
  { step: 4, title: "التسليم والضمان", description: "فحص الجودة النهائي وتقديم شهادات الضمان المعتمدة." },
];

const defaultTestimonials = [
  {
    id: "1",
    clientName: "م. فهد بن عبدالعزيز العتيبي",
    role: "الرئيس التنفيذي",
    company: "شركة الاستثمار العقاري المتقدمة",
    content: "تعاملنا مع شركة معراج التشييد في مشروع مجمع واحة الأعمال، وكان الالتزام بالمعايير الفنية وسرعة الإنجاز نموذجاً يحتذى به.",
    rating: 5,
  },
  {
    id: "2",
    clientName: "أ. سلطان الشمري",
    role: "مدير المشاريع",
    company: "مجموعة المطورين المتحدة",
    content: "دقة التنفيذ والاهتمام بأدق التفاصيل المعمارية والإنشائية في مشروع الفلل السكنية جعلت معراج التشييد شريكنا الاستراتيجي الدائم.",
    rating: 5,
  },
];

const featuredProjects = computed(() => {
  const feat = projects.value.filter((p) => p.featured);
  return feat.length > 0 ? feat.slice(0, 3) : projects.value.slice(0, 3);
});

onMounted(async () => {
  const [homeRes, srvRes, prjRes] = await Promise.all([
    getMethod(API_ENDPOINTS.PUBLIC.HOMEPAGE),
    getMethod(API_ENDPOINTS.PUBLIC.SERVICES),
    getMethod(API_ENDPOINTS.PUBLIC.PROJECTS),
  ]);

  if (homeRes?.data) homepage.value = homeRes.data;
  if (srvRes?.data) services.value = srvRes.data;
  if (prjRes?.data) projects.value = prjRes.data;
});
</script>
