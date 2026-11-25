<template>
  <!--
    Concept: "engineering blueprint". The page reads like a set of technical
    drawings -- survey-mark corners, dimension lines, numbered spec sheets --
    because the content is construction and engineering services.

    Full-bleed rule: the parent layout has margin/padding, so every edge-to-edge
    background is an absolute layer: left-1/2 + w-screen + -translate-x-1/2.
  -->
  <main
    dir="rtl"
    class="relative w-full font-['IBM_Plex_Sans_Arabic'] text-[#333333]"
  >
    <!-- Page background (full-bleed) -->
    <div
      class="pointer-events-none absolute inset-y-0 left-1/2 -z-20 w-screen -translate-x-1/2 bg-[#F3F7F9]"
    ></div>

    <!-- ==========================================
         HERO  (blueprint sheet)
    =========================================== -->
    <section class="relative isolate">
      <div
        class="blueprint pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden bg-[#14202A]"
      >
        <div
          class="absolute inset-0 bg-gradient-to-l from-transparent via-[#14202A]/40 to-[#14202A]/90"
        ></div>
        <div
          class="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-l from-[#0F6F9E] via-[#2AA9E3] to-[#75D0F5]"
        ></div>
      </div>

      <div
        class="mx-auto grid min-h-[420px] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:min-h-[480px] lg:grid-cols-[1.15fr_1fr] lg:px-8"
      >
        <div class="space-y-6">
          <nav
            class="flex items-center gap-2 text-xs font-medium text-[#9FB6C4]"
            aria-label="breadcrumb"
          >
            <NuxtLink to="/" class="transition-colors hover:text-[#2AA9E3]">
              الرئيسية
            </NuxtLink>
            <i class="pi pi-angle-left text-[9px] text-[#2AA9E3]"></i>
            <span class="text-[#2AA9E3]">خدماتنا</span>
          </nav>

          <div class="flex items-center gap-3 text-[#2AA9E3]">
            <span class="h-px w-10 bg-[#2AA9E3]"></span>
            <span class="text-[11px] font-bold tracking-[0.2em]">
              نطاق الأعمال
            </span>
          </div>

          <h1
            class="font-['Reem_Kufi'] text-4xl font-bold leading-[1.4] text-white md:text-5xl lg:text-6xl"
          >
            من الحفر إلى
            <span class="block text-[#2AA9E3]">مفتاح التسليم</span>
          </h1>

          <p class="max-w-xl text-sm leading-8 text-[#B7CAD6] sm:text-base">
            نقدم مجموعة متكاملة من حلول المقاولات العامة، البناء، التشطيب،
            والترميم بمعايير احترافية ومطابقة لأحدث الأكواد الهندسية.
          </p>

          <!-- Dimension line with count -->
          <div class="flex max-w-md items-center gap-3 pt-2 text-[#9FB6C4]">
            <span class="h-3 w-px bg-[#2AA9E3]"></span>
            <span class="h-px flex-1 bg-[#2AA9E3]/50"></span>
            <span class="text-xs font-bold tracking-wide text-white">
              <template v-if="!loading && services.length">
                {{ services.length }} تخصصات هندسية
              </template>
              <template v-else>تخصصات هندسية</template>
            </span>
            <span class="h-px flex-1 bg-[#2AA9E3]/50"></span>
            <span class="h-3 w-px bg-[#2AA9E3]"></span>
          </div>
        </div>

        <!-- Blueprint drawing -->
        <div class="pointer-events-none hidden lg:block" aria-hidden="true">
          <svg
            viewBox="0 0 360 300"
            class="mx-auto h-full max-h-[340px] w-full"
            fill="none"
            stroke="#2AA9E3"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <!-- ground -->
            <path d="M8 270H352" stroke-opacity=".7" />
            <path
              d="M8 270l10 10M30 270l10 10M52 270l10 10M74 270l10 10M96 270l10 10M118 270l10 10M140 270l10 10M162 270l10 10M184 270l10 10M206 270l10 10M228 270l10 10M250 270l10 10M272 270l10 10M294 270l10 10M316 270l10 10M338 270l10 10"
              stroke-opacity=".25"
            />
            <!-- building -->
            <rect x="46" y="120" width="118" height="150" stroke-opacity=".95" />
            <path
              d="M46 166H164M46 212H164M85 120V270M125 120V270"
              stroke-opacity=".35"
            />
            <path d="M40 120H170" stroke-opacity=".95" />
            <rect
              x="164"
              y="176"
              width="64"
              height="94"
              stroke-dasharray="4 4"
              stroke-opacity=".6"
            />
            <path
              d="M164 176l64 94M228 176l-64 94"
              stroke-opacity=".2"
              stroke-dasharray="3 5"
            />
            <!-- dimension line -->
            <path d="M26 120V270M21 120H31M21 270H31" stroke-opacity=".8" />
            <text
              x="14"
              y="200"
              fill="#2AA9E3"
              stroke="none"
              font-size="9"
              transform="rotate(-90 14 200)"
              text-anchor="middle"
              opacity=".8"
            >
              H = 18.0 m
            </text>
            <!-- crane -->
            <path d="M262 270V44M280 270V44" stroke-opacity=".85" />
            <path
              d="M262 270l18-28M280 270l-18-28M262 242l18-28M280 242l-18-28M262 214l18-28M280 214l-18-28M262 186l18-28M280 186l-18-28M262 158l18-28M280 158l-18-28M262 130l18-28M280 130l-18-28M262 102l18-28M280 102l-18-28M262 74l18-28M280 74l-18-28"
              stroke-opacity=".4"
            />
            <path d="M196 44H346M196 44H346V52H196Z" stroke-opacity=".85" />
            <path d="M262 44L271 14L280 44" stroke-opacity=".85" />
            <path d="M271 14L196 44M271 14L346 44" stroke-opacity=".5" />
            <path d="M318 52V122" stroke-dasharray="3 3" stroke-opacity=".8" />
            <rect x="306" y="122" width="24" height="16" stroke-opacity=".9" />
            <circle cx="214" cy="60" r="4" stroke-opacity=".7" />
          </svg>
        </div>
      </div>
    </section>

    <!-- ==========================================
         SERVICES INDEX  (table of contents)
    =========================================== -->
    <section
      v-if="!loading && !error && services.length"
      class="relative z-10 -mt-8 px-4 sm:px-6 lg:px-8"
    >
      <div
        class="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-[#C7D8E1] bg-white shadow-[0_16px_40px_rgba(20,32,42,0.12)]"
      >
        <div class="flex divide-x divide-x-reverse divide-[#C7D8E1] overflow-x-auto">
          <button
            v-for="(service, index) in services"
            :key="service.id"
            type="button"
            class="group flex min-w-[210px] flex-1 items-center gap-3 px-5 py-4 text-right transition-colors hover:bg-[#EAF6FC]"
            @click="goTo(service.id)"
          >
            <span
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#14202A] transition-colors group-hover:bg-[#2AA9E3]"
            >
              <i
                :class="[
                  service.icon,
                  'text-[#2AA9E3] group-hover:text-[#14202A]',
                ]"
              ></i>
            </span>
            <span class="min-w-0">
              <span class="block text-[10px] font-bold tracking-wider text-[#0F6F9E]">
                {{ String(index + 1).padStart(2, "0") }}
              </span>
              <span class="line-clamp-1 text-xs font-bold text-[#14202A]">
                {{ service.title }}
              </span>
            </span>
          </button>
        </div>
      </div>
    </section>

    <!-- ==========================================
         SERVICE SHEETS
    =========================================== -->
    <section class="relative py-16 sm:py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <!-- Loading -->
        <div v-if="loading" class="space-y-16">
          <div
            v-for="n in 2"
            :key="n"
            class="grid gap-10 lg:grid-cols-2"
          >
            <div class="aspect-[4/3] animate-pulse rounded-2xl bg-[#E1EAEF]"></div>
            <div class="space-y-4 py-6">
              <div class="h-4 w-24 animate-pulse rounded bg-[#E1EAEF]"></div>
              <div class="h-8 w-3/4 animate-pulse rounded bg-[#E1EAEF]"></div>
              <div class="h-3 w-full animate-pulse rounded bg-[#E1EAEF]"></div>
              <div class="h-3 w-5/6 animate-pulse rounded bg-[#E1EAEF]"></div>
              <div class="h-3 w-2/3 animate-pulse rounded bg-[#E1EAEF]"></div>
            </div>
          </div>
        </div>

        <!-- Error -->
        <div
          v-else-if="error"
          class="rounded-2xl border border-[#C7D8E1] bg-white px-5 py-16 text-center"
        >
          <div
            class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF6FC]"
          >
            <i class="pi pi-exclamation-circle text-2xl text-[#0F6F9E]"></i>
          </div>
          <h3 class="font-['Reem_Kufi'] text-xl font-bold text-[#14202A]">
            تعذر تحميل الخدمات
          </h3>
          <p class="mt-2 text-sm text-[#44505A]">
            حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى.
          </p>
          <button
            type="button"
            class="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#2AA9E3] px-6 py-3 text-sm font-bold text-[#14202A] transition-colors hover:bg-[#2298cf]"
            @click="fetchServices"
          >
            <i class="pi pi-refresh text-xs"></i>
            إعادة المحاولة
          </button>
        </div>

        <!-- Empty -->
        <div
          v-else-if="services.length === 0"
          class="rounded-2xl border border-dashed border-[#C7D8E1] bg-white px-5 py-20 text-center"
        >
          <i class="pi pi-cog mb-4 text-4xl text-[#2AA9E3]"></i>
          <h3 class="font-['Reem_Kufi'] text-xl font-bold text-[#14202A]">
            لا توجد خدمات حالياً
          </h3>
          <p class="mx-auto mt-2 max-w-sm text-sm leading-7 text-[#44505A]">
            نعمل على تحديث قائمة خدماتنا. يرجى زيارة الصفحة مرة أخرى لاحقاً.
          </p>
        </div>

        <!-- Sheets -->
        <div v-else class="space-y-20 sm:space-y-28">
          <article
            v-for="(service, index) in services"
            :id="`service-${service.id}`"
            :key="service.id"
            class="service-sheet relative scroll-mt-24"
          >
            <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <!-- Visual -->
              <div :class="index % 2 ? 'lg:order-2' : ''">
                <div class="relative">
                  <!-- survey corner marks -->
                  <span
                    v-for="c in corners"
                    :key="c"
                    :class="['pointer-events-none absolute z-10 h-7 w-7 border-[#2AA9E3]', c]"
                  ></span>

                  <div
                    class="group relative aspect-[4/3] overflow-hidden rounded-xl bg-[#14202A]"
                  >
                    <img
                      :src="service.image || FALLBACK_IMAGE"
                      :alt="service.title"
                      loading="lazy"
                      class="h-full w-full object-cover opacity-90 transition-transform duration-[900ms] ease-out group-hover:scale-105"
                    />
                    <div
                      class="absolute inset-0 bg-gradient-to-t from-[#14202A]/70 via-transparent to-[#14202A]/10"
                    ></div>

                    <!-- sheet tag -->
                    <span
                      class="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-md bg-[#14202A]/85 px-3 py-2 text-[10px] font-bold tracking-wider text-white backdrop-blur-sm"
                    >
                      <span class="h-1.5 w-1.5 rounded-full bg-[#2AA9E3]"></span>
                      لوحة {{ String(index + 1).padStart(2, "0") }}
                      / {{ String(services.length).padStart(2, "0") }}
                    </span>

                    <span
                      class="absolute left-4 top-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#2AA9E3] shadow-lg"
                    >
                      <i :class="[service.icon, 'text-2xl text-[#14202A]']"></i>
                    </span>
                  </div>
                </div>
              </div>

              <!-- Spec -->
              <div class="relative space-y-6">
                <span
                  class="pointer-events-none absolute -top-14 right-0 select-none font-['Reem_Kufi'] text-[120px] font-bold leading-none text-transparent sm:text-[150px]"
                  style="-webkit-text-stroke: 1.5px rgba(15, 111, 158, 0.18)"
                  aria-hidden="true"
                >
                  {{ String(index + 1).padStart(2, "0") }}
                </span>

                <div class="relative space-y-4 pt-6">
                  <div class="flex items-center gap-3 text-[#0F6F9E]">
                    <span class="h-px w-8 bg-[#2AA9E3]"></span>
                    <span class="text-[11px] font-bold tracking-[0.18em]">
                      الخدمة {{ String(index + 1).padStart(2, "0") }}
                    </span>
                  </div>

                  <h2
                    class="font-['Reem_Kufi'] text-2xl font-bold leading-[1.5] text-[#14202A] sm:text-4xl"
                  >
                    {{ service.title }}
                  </h2>

                  <p class="text-sm font-medium leading-8 text-[#0F6F9E] sm:text-base">
                    {{ service.description }}
                  </p>

                  <p
                    v-if="service.details"
                    class="text-sm leading-8 text-[#44505A]"
                  >
                    {{ service.details }}
                  </p>
                </div>

                <!-- Scope of work -->
                <div
                  v-if="service.features.length"
                  class="rounded-xl border border-[#C7D8E1] bg-white p-5"
                >
                  <div
                    class="mb-3 flex items-center justify-between border-b border-dashed border-[#C7D8E1] pb-3"
                  >
                    <span class="text-xs font-bold text-[#14202A]">
                      نطاق العمل
                    </span>
                    <span class="text-[10px] font-bold tracking-wider text-[#0F6F9E]">
                      {{ service.features.length }} بنود
                    </span>
                  </div>
                  <ul class="space-y-2.5">
                    <li
                      v-for="(feature, fi) in service.features"
                      :key="feature"
                      class="flex items-start gap-3 text-sm leading-7 text-[#333333]"
                    >
                      <span
                        class="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#EAF6FC] text-[10px] font-bold text-[#0F6F9E]"
                      >
                        {{ fi + 1 }}
                      </span>
                      <span>{{ feature }}</span>
                    </li>
                  </ul>
                </div>

                <div class="flex flex-wrap items-center gap-3">
                  <NuxtLink
                    :to="`/services/${service.slug}`"
                    class="group/btn inline-flex items-center gap-3 rounded-lg bg-[#14202A] px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#0F6F9E]"
                  >
                    <span>تفاصيل الخدمة</span>
                    <i
                      class="pi pi-arrow-left text-xs transition-transform duration-300 group-hover/btn:-translate-x-1"
                    ></i>
                  </NuxtLink>
                  <NuxtLink
                    to="/contact"
                    class="inline-flex items-center gap-2 rounded-lg border border-[#C7D8E1] bg-white px-6 py-3.5 text-sm font-bold text-[#14202A] transition-colors hover:border-[#2AA9E3] hover:bg-[#EAF6FC]"
                  >
                    <i class="pi pi-file-edit text-xs text-[#0F6F9E]"></i>
                    طلب تسعير
                  </NuxtLink>
                </div>
              </div>
            </div>

            <!-- divider with ticks -->
            <div
              v-if="index < services.length - 1"
              class="mt-20 flex items-center gap-3 text-[#C7D8E1] sm:mt-28"
              aria-hidden="true"
            >
              <span class="h-3 w-px bg-current"></span>
              <span class="h-px flex-1 border-t border-dashed border-current"></span>
              <span class="h-3 w-px bg-current"></span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ==========================================
         HOW WE WORK
    =========================================== -->
    <section class="relative pb-16 sm:pb-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mb-12 space-y-3 text-center">
          <div class="flex items-center justify-center gap-3 text-[#0F6F9E]">
            <span class="h-px w-8 bg-[#2AA9E3]"></span>
            <span class="text-[11px] font-bold tracking-[0.2em]">
              منهجية العمل
            </span>
            <span class="h-px w-8 bg-[#2AA9E3]"></span>
          </div>
          <h2
            class="font-['Reem_Kufi'] text-2xl font-bold text-[#14202A] sm:text-4xl"
          >
            كيف يمضي مشروعك معنا
          </h2>
        </div>

        <div class="relative">
          <span
            class="absolute inset-x-[12%] top-7 hidden border-t-2 border-dashed border-[#C7D8E1] lg:block"
            aria-hidden="true"
          ></span>

          <div class="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div
              v-for="step in process"
              :key="step.step"
              class="group text-center"
            >
              <span
                class="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl border-2 border-[#2AA9E3] bg-[#F3F7F9] font-['Reem_Kufi'] text-xl font-bold text-[#0F6F9E] transition-colors duration-300 group-hover:bg-[#2AA9E3] group-hover:text-[#14202A]"
              >
                {{ step.step }}
              </span>
              <h3 class="font-['Reem_Kufi'] text-lg font-bold text-[#14202A]">
                {{ step.title }}
              </h3>
              <p class="mx-auto mt-2 max-w-[260px] text-xs leading-7 text-[#44505A]">
                {{ step.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==========================================
         CTA  (full-bleed blueprint band)
    =========================================== -->
    <section class="relative isolate py-16 sm:py-20">
      <div
        class="blueprint pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden bg-[#14202A]"
      >
        <div
          class="absolute inset-0 bg-gradient-to-r from-[#14202A]/80 via-transparent to-[#14202A]/60"
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
              لم تجد ما تبحث عنه؟
            </span>
            <h2
              class="font-['Reem_Kufi'] text-3xl font-bold leading-relaxed text-white sm:text-4xl"
            >
              أرسل لنا مخططاتك ونعود إليك بعرض سعر
            </h2>
            <p class="text-sm leading-8 text-[#B7CAD6]">
              فريقنا الهندسي يدرس متطلبات مشروعك ويقدم حلاً مخصصاً مع جدول
              تنفيذ واضح وكميات دقيقة.
            </p>
          </div>

          <NuxtLink
            to="/contact"
            class="group inline-flex shrink-0 items-center gap-3 rounded-lg bg-[#2AA9E3] px-8 py-4 text-sm font-bold text-[#14202A] shadow-[0_8px_25px_rgba(42,169,227,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#2298cf]"
          >
            <span>طلب تسعير واستشارة</span>
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
import { ref, onMounted } from "vue";
import { useApiMethods } from "~/composables/useApiMethods";
import { API_ENDPOINTS } from "~/config/endpoints";

definePageMeta({ key: (r) => r.fullPath });

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85";

interface ServiceCard {
  id: string | number;
  slug: string | number;
  title: string;
  description: string;
  details: string;
  image: string;
  icon: string;
  features: string[];
}

const { getMethod } = useApiMethods();

const services = ref<ServiceCard[]>([]);
const loading = ref(true);
const error = ref(false);

// survey-mark corners around each service image
const corners = [
  "-right-2 -top-2 border-r-2 border-t-2",
  "-left-2 -top-2 border-l-2 border-t-2",
  "-bottom-2 -right-2 border-b-2 border-r-2",
  "-bottom-2 -left-2 border-b-2 border-l-2",
];

const process = [
  {
    step: 1,
    title: "الدراسة والاستشارة",
    description: "تحليل المخططات الهندسية وتقييم الموقع وتحديد المتطلبات الفنية بدقة.",
  },
  {
    step: 2,
    title: "التخطيط والميزانية",
    description: "إعداد الجدول الزمني المفصل وحساب الكميات وتحديد التكلفة بشفافية.",
  },
  {
    step: 3,
    title: "التنفيذ والإشراف",
    description: "بدء الأعمال مع إشراف هندسي يومي وتقارير دورية لكل مرحلة.",
  },
  {
    step: 4,
    title: "التسليم والضمان",
    description: "فحص الجودة النهائي وتسليم المشروع متكاملاً مع شهادات الضمان.",
  },
];

// w-screen layers include the scrollbar width; clip x-overflow on <body> here only.
useHead({
  title: "خدمات المقاولات العامة والإنشاءات | معراج التشييد",
  bodyAttrs: { class: "overflow-x-clip" },
});

const isUrl = (v: unknown): v is string =>
  typeof v === "string" && /^(https?:)?\/\/|^\//.test(v);

// Accept [..], { data: [..] } or { items: [..] } response shapes
const toList = (res: any): any[] => {
  const d = res?.data;
  if (Array.isArray(d)) return d;
  if (Array.isArray(d?.data)) return d.data;
  if (Array.isArray(d?.items)) return d.items;
  return [];
};

// Supports both naming styles (titleAr / title, shortDescriptionAr / shortDescription ...)
const normalize = (s: any): ServiceCard => {
  const lead =
    s.shortDescriptionAr || s.shortDescription || s.descriptionAr || s.description || "";
  const full = s.fullDescriptionAr || s.fullDescription || "";
  return {
    id: s.id,
    slug: s.slug || s.id,
    title: s.titleAr || s.title || "",
    description: lead || full,
    details: lead && full && full !== lead ? full : "",
    image: s.coverImage || (isUrl(s.icon) ? s.icon : ""),
    icon:
      typeof s.icon === "string" && s.icon.startsWith("pi")
        ? s.icon
        : "pi pi-cog",
    features: Array.isArray(s.features) ? s.features : [],
  };
};

const goTo = (id: string | number) => {
  document
    .getElementById(`service-${id}`)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const fetchServices = async () => {
  loading.value = true;
  error.value = false;

  try {
    const res = await getMethod(API_ENDPOINTS.PUBLIC.SERVICES);
    // getMethod swallows errors and returns null
    if (res === null) throw new Error("services request failed");

    services.value = toList(res)
      .filter((s) => s.active !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map(normalize);
  } catch (err) {
    console.error("Failed to load services:", err);
    services.value = [];
    error.value = true;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchServices);
</script>

<style scoped>
/* blueprint paper: major 120px grid + minor 24px grid */
.blueprint {
  background-image:
    linear-gradient(rgba(42, 169, 227, 0.14) 1px, transparent 1px),
    linear-gradient(90deg, rgba(42, 169, 227, 0.14) 1px, transparent 1px),
    linear-gradient(rgba(42, 169, 227, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(42, 169, 227, 0.06) 1px, transparent 1px);
  background-size:
    120px 120px,
    120px 120px,
    24px 24px,
    24px 24px;
}

.service-sheet {
  animation: sheet-appear 700ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes sheet-appear {
  from {
    opacity: 0;
    transform: translateY(22px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .service-sheet {
    animation: none;
  }
  .service-sheet *,
  .service-sheet {
    transition-duration: 0.01ms !important;
  }
}
</style>