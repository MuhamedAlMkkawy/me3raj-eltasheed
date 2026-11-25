<template>
  <!--
    Concept: "a company built like a building".
    - the hero ends in a city skyline
    - the company's values stand as structural columns on a foundation
    - registration data is presented like an official credentials plate

    Full-bleed rule: the parent layout has margin/padding, so every edge-to-edge
    background is an absolute layer: left-1/2 + w-screen + -translate-x-1/2.
  -->
  <main
    dir="rtl"
    class="relative w-full font-['IBM_Plex_Sans_Arabic'] text-[#333333]"
  >
    <!-- Page background (full-bleed) -->
    <div
      class="pointer-events-none absolute inset-y-0 left-1/2 -z-20 w-screen -translate-x-1/2 bg-[#F5F9FB]"
    ></div>

    <!-- ==========================================
         HERO  (skyline)
    =========================================== -->
    <section class="relative isolate">
      <div
        class="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden bg-[#1F2A30]"
      >
        <div
          class="absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-[#2AA9E3]/[0.12] blur-3xl"
        ></div>
        <div
          class="absolute -left-24 top-10 h-[320px] w-[320px] rounded-full bg-[#0F6F9E]/20 blur-3xl"
        ></div>

        <!-- skyline silhouette -->
        <svg
          class="absolute inset-x-0 bottom-0 h-[170px] w-full sm:h-[220px]"
          viewBox="0 0 1440 220"
          preserveAspectRatio="xMidYMax slice"
          aria-hidden="true"
        >
          <g fill="#2AA9E3" fill-opacity="0.07">
            <rect x="0" y="120" width="90" height="100" />
            <rect x="90" y="70" width="70" height="150" />
            <rect x="160" y="140" width="110" height="80" />
            <rect x="270" y="40" width="80" height="180" />
            <rect x="350" y="100" width="60" height="120" />
            <rect x="410" y="150" width="120" height="70" />
            <rect x="530" y="60" width="90" height="160" />
            <rect x="620" y="110" width="70" height="110" />
            <rect x="690" y="20" width="100" height="200" />
            <rect x="790" y="90" width="80" height="130" />
            <rect x="870" y="140" width="100" height="80" />
            <rect x="970" y="50" width="70" height="170" />
            <rect x="1040" y="105" width="90" height="115" />
            <rect x="1130" y="70" width="80" height="150" />
            <rect x="1210" y="130" width="100" height="90" />
            <rect x="1310" y="60" width="130" height="160" />
          </g>
          <g fill="#2AA9E3" fill-opacity="0.12">
            <rect x="290" y="60" width="6" height="8" />
            <rect x="306" y="60" width="6" height="8" />
            <rect x="322" y="60" width="6" height="8" />
            <rect x="290" y="84" width="6" height="8" />
            <rect x="322" y="84" width="6" height="8" />
            <rect x="710" y="40" width="6" height="8" />
            <rect x="730" y="40" width="6" height="8" />
            <rect x="750" y="40" width="6" height="8" />
            <rect x="710" y="66" width="6" height="8" />
            <rect x="750" y="66" width="6" height="8" />
            <rect x="710" y="92" width="6" height="8" />
            <rect x="730" y="92" width="6" height="8" />
            <rect x="550" y="80" width="6" height="8" />
            <rect x="570" y="80" width="6" height="8" />
            <rect x="990" y="70" width="6" height="8" />
            <rect x="1010" y="70" width="6" height="8" />
          </g>
        </svg>

        <div
          class="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-l from-[#0F6F9E] via-[#2AA9E3] to-[#75D0F5]"
        ></div>
      </div>

      <div
        class="mx-auto max-w-7xl px-4 pb-44 pt-12 sm:px-6 sm:pb-52 lg:px-8"
      >
        <nav
          class="mb-14 flex items-center gap-2 text-xs font-medium text-[#C7D8E1]"
          aria-label="breadcrumb"
        >
          <NuxtLink to="/" class="transition-colors hover:text-[#2AA9E3]">
            الرئيسية
          </NuxtLink>
          <i class="pi pi-angle-left text-[9px] text-[#2AA9E3]"></i>
          <span class="text-[#2AA9E3]">عن الشركة</span>
        </nav>

        <div class="max-w-4xl space-y-6">
          <span class="text-xs font-bold tracking-[0.2em] text-[#2AA9E3]">
            {{ c.nameAr || "معراج التشييد للمقاولات العامة" }}
          </span>
          <h1
            class="font-['Reem_Kufi'] text-4xl font-bold leading-[1.45] text-white md:text-6xl"
          >
            {{ c.tagline || "نبني بثقة، ونشيّد للمستقبل بأعلى معايير الإتقان والجودة" }}
          </h1>
        </div>
      </div>
    </section>

    <!-- ==========================================
         CREDENTIALS PLATE
    =========================================== -->
    <section class="relative z-10 -mt-24 px-4 sm:-mt-28 sm:px-6 lg:px-8">
      <div
        class="mx-auto grid max-w-7xl overflow-hidden rounded-2xl border border-[#C7D8E1] bg-white shadow-[0_24px_60px_rgba(31,42,48,0.16)] lg:grid-cols-[1.2fr_2fr]"
      >
        <div class="relative bg-[#2AA9E3] p-7 text-[#1F2A30] sm:p-8">
          <i
            class="pi pi-building absolute -bottom-4 -left-2 text-[90px] text-[#1F2A30]/10"
          ></i>
          <p class="text-[10px] font-bold tracking-[0.2em] opacity-70">
            بطاقة التعريف
          </p>
          <h2 class="mt-3 font-['Reem_Kufi'] text-xl font-bold leading-relaxed">
            {{ c.nameAr || "معراج التشييد للمقاولات العامة" }}
          </h2>
          <p class="mt-1 text-xs font-medium opacity-80" dir="ltr">
            {{ c.nameEn || "Me'raj Al-Tashyeed General Contracting Co." }}
          </p>
        </div>

        <dl
          class="grid grid-cols-2 divide-[#C7D8E1] sm:grid-cols-4 lg:divide-x lg:divide-x-reverse"
        >
          <div
            v-for="cell in plate"
            :key="cell.label"
            class="border-b border-[#C7D8E1] p-5 sm:border-b-0 sm:p-6"
          >
            <dt class="text-[11px] font-medium text-[#44505A]">
              {{ cell.label }}
            </dt>
            <dd
              class="mt-2 text-sm font-bold leading-6 text-[#1F2A30]"
              :dir="cell.ltr ? 'ltr' : undefined"
              :class="cell.ltr ? 'text-right' : ''"
            >
              {{ cell.value }}
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- ==========================================
         STORY
    =========================================== -->
    <section class="relative py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div class="space-y-7">
            <div class="flex items-center gap-3 text-[#0F6F9E]">
              <span class="h-px w-10 bg-[#2AA9E3]"></span>
              <span class="text-[11px] font-bold tracking-[0.2em]">من نحن</span>
            </div>

            <h2
              class="font-['Reem_Kufi'] text-3xl font-bold leading-[1.6] text-[#1F2A30] sm:text-4xl"
            >
              شريكك الهندسي الموثوق لتحويل الرؤى إلى منجزات شامخة
            </h2>

            <p class="text-sm leading-9 text-[#44505A] sm:text-base sm:leading-10">
              {{
                c.description ||
                "تأسست شركة معراج التشييد للمقاولات العامة لتكون شريكاً استراتيجياً فاعلاً في مسيرة التنمية والتطوير العمراني بالمملكة العربية السعودية، متماشية مع مستهدفات رؤية المملكة 2030."
              }}
            </p>

            <div class="flex flex-wrap gap-3 pt-1">
              <NuxtLink
                to="/projects"
                class="group inline-flex items-center gap-3 rounded-lg bg-[#1F2A30] px-6 py-3.5 text-sm font-bold text-white transition-colors duration-300 hover:bg-[#0F6F9E]"
              >
                <span>استعرض مشاريعنا</span>
                <i
                  class="pi pi-arrow-left text-xs transition-transform duration-300 group-hover:-translate-x-1"
                ></i>
              </NuxtLink>
              <NuxtLink
                to="/services"
                class="inline-flex items-center gap-2 rounded-lg border border-[#C7D8E1] bg-white px-6 py-3.5 text-sm font-bold text-[#1F2A30] transition-colors hover:border-[#2AA9E3] hover:bg-[#EAF6FC]"
              >
                خدماتنا
              </NuxtLink>
            </div>
          </div>

          <div class="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div
              class="group relative overflow-hidden rounded-2xl bg-[#1F2A30] shadow-[0_24px_60px_rgba(31,42,48,0.18)]"
            >
              <img
                :src="ABOUT_IMAGE"
                alt="معراج التشييد للمقاولات العامة"
                loading="lazy"
                class="h-[340px] w-full object-cover transition-transform duration-[900ms] group-hover:scale-105 sm:h-[480px]"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-[#1F2A30]/70 via-transparent to-transparent"
              ></div>
            </div>

            <!-- years badge -->
            <div
              class="absolute -bottom-8 right-6 flex items-center gap-4 rounded-2xl bg-[#2AA9E3] px-6 py-5 text-[#1F2A30] shadow-xl sm:right-10"
            >
              <span class="font-['Reem_Kufi'] text-5xl font-bold leading-none">
                15+
              </span>
              <span class="text-xs font-bold leading-6">
                عاماً من الخبرة<br />في البناء والتشييد
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==========================================
         VISION & MISSION
    =========================================== -->
    <section class="relative pb-16 pt-6 sm:pb-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          class="grid overflow-hidden rounded-3xl border border-[#C7D8E1] shadow-[0_20px_50px_rgba(31,42,48,0.08)] md:grid-cols-2"
        >
          <article
            v-for="(card, i) in pillars"
            :key="card.title"
            class="relative overflow-hidden p-8 sm:p-12"
            :class="i === 0 ? 'bg-[#1F2A30] text-white' : 'bg-white text-[#1F2A30]'"
          >
            <span
              class="pointer-events-none absolute -top-6 left-6 select-none font-['Reem_Kufi'] text-[160px] font-bold leading-none"
              :class="i === 0 ? 'text-[#2AA9E3]/10' : 'text-[#2AA9E3]/15'"
              aria-hidden="true"
            >
              ”
            </span>

            <div class="relative space-y-5">
              <div
                class="flex items-center gap-3"
                :class="i === 0 ? 'text-[#2AA9E3]' : 'text-[#0F6F9E]'"
              >
                <i :class="['pi', card.icon, 'text-xl']"></i>
                <span class="text-[11px] font-bold tracking-[0.2em]">
                  {{ card.label }}
                </span>
              </div>
              <h3 class="font-['Reem_Kufi'] text-2xl font-bold sm:text-3xl">
                {{ card.title }}
              </h3>
              <p
                class="text-sm leading-9 sm:text-base sm:leading-10"
                :class="i === 0 ? 'text-[#C7D8E1]' : 'text-[#44505A]'"
              >
                {{ card.text }}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ==========================================
         VALUES  (structural columns on a foundation)
    =========================================== -->
    <section class="relative pb-16 sm:pb-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mb-12 max-w-2xl space-y-3">
          <div class="flex items-center gap-3 text-[#0F6F9E]">
            <span class="h-px w-10 bg-[#2AA9E3]"></span>
            <span class="text-[11px] font-bold tracking-[0.2em]">
              ما نبني عليه
            </span>
          </div>
          <h2
            class="font-['Reem_Kufi'] text-3xl font-bold text-[#1F2A30] sm:text-4xl"
          >
            قيم هي أعمدة كل مشروع
          </h2>
          <p class="text-sm leading-8 text-[#44505A]">
            كما لا يقوم مبنى بلا أعمدة متينة، لا يقوم عملنا إلا على هذه المبادئ.
          </p>
        </div>

        <div
          class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:flex lg:items-end lg:gap-4"
        >
          <div
            v-for="(value, i) in values"
            :key="value"
            class="group relative flex flex-col justify-between overflow-hidden rounded-t-2xl border border-b-0 border-[#C7D8E1] bg-white p-6 transition-colors duration-300 hover:bg-[#1F2A30] lg:flex-1"
            :class="colHeights[i % colHeights.length]"
          >
            <span
              class="absolute inset-x-0 top-0 h-2 bg-[#2AA9E3] transition-all duration-300 group-hover:h-3"
            ></span>

            <span
              class="mt-3 font-['Reem_Kufi'] text-5xl font-bold leading-none text-[#2AA9E3]/30 transition-colors duration-300 group-hover:text-[#2AA9E3]"
            >
              {{ String(i + 1).padStart(2, "0") }}
            </span>

            <p
              class="mt-8 text-sm font-bold leading-8 text-[#1F2A30] transition-colors duration-300 group-hover:text-white"
            >
              {{ value }}
            </p>
          </div>
        </div>

        <!-- foundation -->
        <div
          class="foundation h-5 rounded-b-md bg-[#1F2A30]"
          aria-hidden="true"
        ></div>
        <p class="mt-3 text-center text-[11px] font-bold tracking-[0.2em] text-[#44505A]">
          الأساس · الجودة والنزاهة والالتزام
        </p>
      </div>
    </section>

    <!-- ==========================================
         STATS  (full-bleed band)
    =========================================== -->
    <section class="relative isolate py-16 sm:py-24">
      <div
        class="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden bg-[#1F2A30]"
      >
        <div
          class="absolute -left-20 -top-32 h-80 w-80 rounded-full bg-[#2AA9E3]/10 blur-3xl"
        ></div>
        <div
          class="absolute -bottom-32 right-[15%] h-72 w-72 rounded-full bg-[#0F6F9E]/20 blur-3xl"
        ></div>
        <div
          class="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-l from-[#0F6F9E] via-[#2AA9E3] to-[#75D0F5]"
        ></div>
      </div>

      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mb-12 flex items-center gap-3 text-[#2AA9E3]">
          <span class="h-px w-10 bg-[#2AA9E3]"></span>
          <span class="text-[11px] font-bold tracking-[0.2em]">
            أرقام تعكس خبرتنا
          </span>
        </div>

        <div
          class="grid grid-cols-2 gap-y-12 lg:grid-cols-4 lg:divide-x lg:divide-x-reverse lg:divide-white/10"
        >
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="group px-2 text-center lg:px-8 lg:text-right"
          >
            <div
              class="font-['Reem_Kufi'] text-5xl font-bold leading-none text-white transition-colors duration-300 group-hover:text-[#2AA9E3] sm:text-6xl lg:text-7xl"
              dir="ltr"
            >
              {{ stat.value }}
            </div>
            <span
              class="mx-auto mt-5 block h-[3px] w-10 rounded-full bg-[#2AA9E3] transition-all duration-300 group-hover:w-16 lg:mx-0"
            ></span>
            <p class="mt-4 text-xs font-medium leading-7 text-[#C7D8E1] sm:text-sm">
              {{ stat.label }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ==========================================
         OFFICIAL DATA + MAP
    =========================================== -->
    <section v-if="records.length || mapUrl" class="relative py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          class="grid items-stretch gap-10 lg:gap-14"
          :class="mapUrl && records.length ? 'lg:grid-cols-[1fr_1.15fr]' : ''"
        >
          <div v-if="records.length" class="space-y-7">
            <div class="space-y-3">
              <div class="flex items-center gap-3 text-[#0F6F9E]">
                <span class="h-px w-10 bg-[#2AA9E3]"></span>
                <span class="text-[11px] font-bold tracking-[0.2em]">
                  البيانات الرسمية
                </span>
              </div>
              <h2
                class="font-['Reem_Kufi'] text-2xl font-bold text-[#1F2A30] sm:text-4xl"
              >
                موثوقون ومسجلون رسمياً
              </h2>
            </div>

            <dl
              class="divide-y divide-[#C7D8E1] overflow-hidden rounded-2xl border border-[#C7D8E1] bg-white"
            >
              <div
                v-for="row in records"
                :key="row.label"
                class="flex items-start gap-4 px-5 py-4"
              >
                <span
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF6FC]"
                >
                  <i :class="['pi', row.icon, 'text-[#0F6F9E]']"></i>
                </span>
                <div class="min-w-0 flex-1">
                  <dt class="text-[11px] font-medium text-[#44505A]">
                    {{ row.label }}
                  </dt>
                  <dd
                    class="mt-1 break-words text-sm font-bold leading-7 text-[#1F2A30]"
                    :dir="row.ltr ? 'ltr' : undefined"
                    :class="row.ltr ? 'text-right' : ''"
                  >
                    {{ row.value }}
                  </dd>
                </div>
              </div>
            </dl>

            <div class="flex flex-wrap gap-3">
              <a
                v-if="c.phone"
                :href="`tel:${digits(c.phone)}`"
                class="inline-flex items-center gap-2 rounded-lg bg-[#1F2A30] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#0F6F9E]"
              >
                <i class="pi pi-phone text-xs"></i>
                اتصل بنا
              </a>
              <a
                v-if="whatsappUrl"
                :href="whatsappUrl"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center gap-2 rounded-lg border border-[#C7D8E1] bg-white px-6 py-3.5 text-sm font-bold text-[#1F2A30] transition-colors hover:border-[#2AA9E3] hover:bg-[#EAF6FC]"
              >
                <i class="pi pi-whatsapp text-xs text-[#0F9D78]"></i>
                واتساب
              </a>
            </div>
          </div>

          <!-- Map -->
          <div
            v-if="mapUrl"
            class="relative min-h-[320px] overflow-hidden rounded-2xl border border-[#C7D8E1] bg-[#E5EDF2] shadow-[0_20px_50px_rgba(31,42,48,0.1)]"
          >
            <iframe
              :src="mapUrl"
              title="موقع الشركة"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              class="absolute inset-0 h-full w-full border-0"
            ></iframe>
          </div>
        </div>
      </div>
    </section>

    <!-- ==========================================
         CTA  (full-bleed band)
    =========================================== -->
    <section class="relative isolate py-16 sm:py-20">
      <div
        class="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden bg-[#1F2A30]"
      >
        <div
          class="absolute -left-20 -top-32 h-80 w-80 rounded-full bg-[#2AA9E3]/10 blur-3xl"
        ></div>
        <div
          class="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-l from-[#0F6F9E] via-[#2AA9E3] to-[#75D0F5]"
        ></div>
      </div>

      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          class="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-right"
        >
          <div class="max-w-2xl space-y-3">
            <span class="text-xs font-bold tracking-[0.18em] text-[#2AA9E3]">
              شريكك الهندسي الموثوق
            </span>
            <h2
              class="font-['Reem_Kufi'] text-3xl font-bold leading-relaxed text-white sm:text-4xl"
            >
              هل تبحث عن شريك إنشائي موثوق لمشروعك القادم؟
            </h2>
            <p class="text-sm leading-8 text-[#C7D8E1]">
              فريقنا الهندسي على أتم الاستعداد لدراسة متطلبات مشروعك وتقديم
              عروض أسعار متكاملة وجداول تنفيذ دقيقة.
            </p>
          </div>

          <NuxtLink
            to="/contact"
            class="group inline-flex shrink-0 items-center gap-3 rounded-lg bg-[#2AA9E3] px-8 py-4 text-sm font-bold text-[#1F2A30] shadow-[0_8px_25px_rgba(42,169,227,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#2298cf]"
          >
            <i class="pi pi-phone text-sm"></i>
            <span>تواصل مع الفريق الهندسي</span>
            <i
              class="pi pi-arrow-left text-xs transition-transform duration-300 group-hover:-translate-x-1"
            ></i>
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onActivated } from "vue";
import { useApiMethods } from "~/composables/useApiMethods";
import { API_ENDPOINTS } from "~/config/endpoints";
import type { CompanyInfo } from "~/types";

definePageMeta({ key: (r) => r.fullPath });

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=1400&q=85";

const { getMethod } = useApiMethods();

const company = ref<CompanyInfo | null>(null);
// loose view of the company object so optional fields can fall back safely
const c = computed<any>(() => company.value ?? {});

// w-screen layers include the scrollbar width; clip x-overflow on <body> here only.
useHead({
  title: "عن شركة معراج التشييد للمقاولات العامة | الريادة في البناء",
  meta: [
    {
      name: "description",
      content:
        "تعرف على شركة معراج التشييد للمقاولات العامة ورؤيتها وخبراتها في تنفيذ المشاريع الإنشائية والتطوير العمراني بالمملكة العربية السعودية.",
    },
  ],
  bodyAttrs: { class: "overflow-x-clip" },
});

const digits = (s: string) => String(s).replace(/[^\d+]/g, "");

const pillars = computed(() => [
  {
    icon: "pi-eye",
    label: "الرؤية",
    title: "أين نتجه",
    text:
      c.value.vision ||
      "أن نكون الخيار الأول في قطاع الإنشاءات والمقاولات عبر تقديم حلول هندسية متكاملة تتجاوز تطلعات عملائنا.",
  },
  {
    icon: "pi-flag",
    label: "الرسالة",
    title: "كيف نعمل",
    text:
      c.value.mission ||
      "نلتزم بأدق معايير كود البناء السعودي وأنظمة السلامة العالمية لضمان سلامة الكوادر واستدامة المشاريع.",
  },
]);

const values = computed<string[]>(() =>
  Array.isArray(c.value.values) && c.value.values.length
    ? c.value.values
    : [
        "الجودة والإتقان في أدق التفاصيل",
        "الشفافية والنزاهة في التعامل",
        "الالتزام الصارم بمواعيد التسليم",
        "معايير السلامة المهنية والبيئية",
        "الابتكار والتطوير المستمر",
      ],
);

// column heights (large screens only) -> a symmetrical colonnade
const colHeights = [
  "lg:min-h-[230px]",
  "lg:min-h-[270px]",
  "lg:min-h-[310px]",
  "lg:min-h-[270px]",
  "lg:min-h-[230px]",
];

const stats = [
  { value: "+15", label: "سنة من الخبرة الإنشائية" },
  { value: "+120", label: "مشروعاً منجزاً بنجاح" },
  { value: "+85", label: "مهندساً وخبيراً متخصصاً" },
  { value: "100%", label: "التزام بالمعايير والمواعيد" },
];

const plate = computed(() =>
  [
    { label: "السجل التجاري", value: c.value.crNumber, ltr: true },
    { label: "الرقم الضريبي", value: c.value.vatNumber, ltr: true },
    { label: "المدينة", value: c.value.city, ltr: false },
    { label: "الدولة", value: c.value.country, ltr: false },
  ].filter((i) => !!i.value),
);

const records = computed(() =>
  [
    { icon: "pi-map-marker", label: "العنوان", value: c.value.address, ltr: false },
    { icon: "pi-clock", label: "ساعات العمل", value: c.value.workingHours, ltr: false },
    { icon: "pi-phone", label: "الهاتف", value: c.value.phone, ltr: true },
    { icon: "pi-envelope", label: "البريد الإلكتروني", value: c.value.email, ltr: true },
  ].filter((i) => !!i.value),
);

const whatsappUrl = computed(() => {
  const link = c.value.socialLinks?.whatsapp;
  if (link) return link;
  return c.value.whatsapp ? `https://wa.me/${digits(c.value.whatsapp).replace("+", "")}` : "";
});

const mapUrl = computed<string>(() => c.value.mapEmbedUrl || "");

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
/* hatched ground under the columns */
.foundation {
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(42, 169, 227, 0.35) 0,
    rgba(42, 169, 227, 0.35) 2px,
    transparent 2px,
    transparent 10px
  );
  background-color: #1f2a30;
}
</style>