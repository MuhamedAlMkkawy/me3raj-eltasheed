<template>
  <!--
    The single-service page is the "full specification sheet" for a service
    (same blueprint language as the services list).

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
         LOADING
    =========================================== -->
    <div v-if="loading" class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="h-[340px] animate-pulse rounded-2xl bg-[#E1EAEF]"></div>
      <div class="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div class="space-y-4">
          <div class="h-6 w-1/3 animate-pulse rounded bg-[#E1EAEF]"></div>
          <div class="h-4 w-full animate-pulse rounded bg-[#E1EAEF]"></div>
          <div class="h-4 w-5/6 animate-pulse rounded bg-[#E1EAEF]"></div>
          <div class="h-4 w-2/3 animate-pulse rounded bg-[#E1EAEF]"></div>
        </div>
        <div class="h-64 animate-pulse rounded-2xl bg-[#E1EAEF]"></div>
      </div>
    </div>

    <!-- ==========================================
         ERROR / NOT FOUND
    =========================================== -->
    <div
      v-else-if="!service"
      class="mx-auto max-w-xl px-4 py-28 text-center sm:px-6"
    >
      <div
        class="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#EAF6FC]"
      >
        <i class="pi pi-exclamation-circle text-3xl text-[#0F6F9E]"></i>
      </div>
      <h1 class="font-['Reem_Kufi'] text-2xl font-bold text-[#14202A]">
        تعذر العثور على الخدمة
      </h1>
      <p class="mt-2 text-sm leading-7 text-[#44505A]">
        قد تكون الخدمة غير متاحة أو حدث خطأ أثناء تحميل البيانات.
      </p>
      <div class="mt-7 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-lg bg-[#2AA9E3] px-6 py-3 text-sm font-bold text-[#14202A] transition-colors hover:bg-[#2298cf]"
          @click="fetchService"
        >
          <i class="pi pi-refresh text-xs"></i>
          إعادة المحاولة
        </button>
        <NuxtLink
          to="/services"
          class="inline-flex items-center gap-2 rounded-lg border border-[#C7D8E1] bg-white px-6 py-3 text-sm font-bold text-[#14202A] transition-colors hover:border-[#2AA9E3]"
        >
          كل الخدمات
        </NuxtLink>
      </div>
    </div>

    <template v-else>
      <!-- ==========================================
           HERO
      =========================================== -->
      <section class="relative isolate">
        <div
          class="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden bg-[#14202A]"
        >
          <img
            :src="service.image || FALLBACK_IMAGE"
            :alt="service.title"
            class="h-full w-full object-cover opacity-40"
          />
          <div class="blueprint absolute inset-0"></div>
          <div
            class="absolute inset-0 bg-gradient-to-t from-[#14202A] via-[#14202A]/70 to-[#14202A]/30"
          ></div>
          <div
            class="absolute inset-0 bg-gradient-to-l from-[#14202A]/70 via-transparent to-transparent"
          ></div>
          <div
            class="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-l from-[#0F6F9E] via-[#2AA9E3] to-[#75D0F5]"
          ></div>
        </div>

        <div
          class="mx-auto flex min-h-[400px] max-w-7xl flex-col justify-end px-4 pb-24 pt-12 sm:px-6 md:min-h-[460px] lg:px-8"
        >
          <nav
            class="mb-auto flex flex-wrap items-center gap-2 text-xs font-medium text-[#9FB6C4]"
            aria-label="breadcrumb"
          >
            <NuxtLink to="/" class="transition-colors hover:text-[#2AA9E3]">
              الرئيسية
            </NuxtLink>
            <i class="pi pi-angle-left text-[9px] text-[#2AA9E3]"></i>
            <NuxtLink
              to="/services"
              class="transition-colors hover:text-[#2AA9E3]"
            >
              الخدمات
            </NuxtLink>
            <i class="pi pi-angle-left text-[9px] text-[#2AA9E3]"></i>
            <span class="line-clamp-1 text-[#2AA9E3]">{{ service.title }}</span>
          </nav>

          <div class="mt-12 flex flex-col gap-6 sm:flex-row sm:items-end">
            <span
              class="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#2AA9E3] shadow-[0_12px_30px_rgba(42,169,227,0.35)]"
            >
              <i :class="[service.icon, 'text-4xl text-[#14202A]']"></i>
            </span>

            <div class="max-w-3xl space-y-4">
              <div class="flex flex-wrap items-center gap-3">
                <span class="flex items-center gap-3 text-[#2AA9E3]">
                  <span class="h-px w-8 bg-[#2AA9E3]"></span>
                  <span class="text-[11px] font-bold tracking-[0.2em]">
                    خدمة معتمدة
                  </span>
                </span>
                <span
                  v-if="position"
                  class="rounded-md bg-white/10 px-3 py-1 text-[10px] font-bold tracking-wider text-white backdrop-blur-sm"
                >
                  لوحة {{ String(position).padStart(2, "0") }}
                  / {{ String(all.length).padStart(2, "0") }}
                </span>
              </div>

              <h1
                class="font-['Reem_Kufi'] text-3xl font-bold leading-[1.45] text-white sm:text-4xl md:text-5xl"
              >
                {{ service.title }}
              </h1>

              <p
                v-if="service.description"
                class="max-w-2xl text-sm leading-8 text-[#B7CAD6] sm:text-base"
              >
                {{ service.description }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- ==========================================
           QUICK FACTS (overlaps hero)
      =========================================== -->
      <section class="relative z-10 -mt-12 px-4 sm:px-6 lg:px-8">
        <div
          class="mx-auto grid max-w-7xl grid-cols-2 divide-[#C7D8E1] overflow-hidden rounded-2xl border border-[#C7D8E1] bg-white shadow-[0_16px_40px_rgba(20,32,42,0.12)] sm:grid-cols-3 sm:divide-x sm:divide-x-reverse"
        >
          <div
            v-for="fact in facts"
            :key="fact.label"
            class="flex items-center gap-4 px-5 py-4"
          >
            <span
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#14202A]"
            >
              <i :class="['pi', fact.icon, 'text-[#2AA9E3]']"></i>
            </span>
            <div class="min-w-0">
              <p class="text-[11px] font-medium text-[#44505A]">
                {{ fact.label }}
              </p>
              <p class="mt-0.5 truncate text-sm font-bold text-[#14202A]">
                {{ fact.value }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- ==========================================
           BODY
      =========================================== -->
      <section class="py-14 sm:py-20">
        <div
          class="mx-auto grid max-w-7xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8"
        >
          <!-- Main -->
          <div class="min-w-0 space-y-16">
            <!-- Overview -->
            <div class="space-y-6">
              <div class="flex items-center gap-3 text-[#0F6F9E]">
                <span class="h-px w-10 bg-[#2AA9E3]"></span>
                <span class="text-[11px] font-bold tracking-[0.2em]">
                  نظرة عامة
                </span>
              </div>
              <h2
                class="font-['Reem_Kufi'] text-2xl font-bold text-[#14202A] sm:text-4xl"
              >
                نظرة عامة على الخدمة
              </h2>

              <p
                v-if="service.description && service.details"
                class="border-r-4 border-[#2AA9E3] bg-white py-4 pr-5 text-sm font-medium leading-9 text-[#0F6F9E] sm:text-base"
              >
                {{ service.description }}
              </p>

              <p
                class="whitespace-pre-line text-sm leading-9 text-[#44505A] sm:text-base sm:leading-10"
              >
                {{ service.details || service.description }}
              </p>
            </div>

            <!-- Scope of work -->
            <div v-if="service.features.length" class="space-y-7">
              <div class="space-y-3">
                <div class="flex items-center gap-3 text-[#0F6F9E]">
                  <span class="h-px w-10 bg-[#2AA9E3]"></span>
                  <span class="text-[11px] font-bold tracking-[0.2em]">
                    نطاق العمل
                  </span>
                </div>
                <h3
                  class="font-['Reem_Kufi'] text-2xl font-bold text-[#14202A] sm:text-3xl"
                >
                  ما يميز تنفيذنا لهذه الخدمة
                </h3>
              </div>

              <div class="grid gap-4 sm:grid-cols-2">
                <div
                  v-for="(feat, idx) in service.features"
                  :key="idx"
                  class="group relative flex items-start gap-4 overflow-hidden rounded-xl border border-[#C7D8E1] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#2AA9E3]/60 hover:shadow-lg"
                >
                  <span
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF6FC] font-['Reem_Kufi'] text-lg font-bold text-[#0F6F9E] transition-colors duration-300 group-hover:bg-[#2AA9E3] group-hover:text-[#14202A]"
                  >
                    {{ idx + 1 }}
                  </span>
                  <p class="pt-1.5 text-sm font-semibold leading-7 text-[#14202A]">
                    {{ feat }}
                  </p>
                  <span
                    class="absolute inset-x-0 bottom-0 h-[3px] origin-right scale-x-0 bg-[#2AA9E3] transition-transform duration-500 group-hover:scale-x-100"
                  ></span>
                </div>
              </div>
            </div>

            <!-- Process -->
            <div class="space-y-7">
              <div class="space-y-3">
                <div class="flex items-center gap-3 text-[#0F6F9E]">
                  <span class="h-px w-10 bg-[#2AA9E3]"></span>
                  <span class="text-[11px] font-bold tracking-[0.2em]">
                    مراحل التنفيذ
                  </span>
                </div>
                <h3
                  class="font-['Reem_Kufi'] text-2xl font-bold text-[#14202A] sm:text-3xl"
                >
                  كيف نُنجز هذه الخدمة
                </h3>
              </div>

              <ol class="relative space-y-6">
                <span
                  class="absolute bottom-6 right-[19px] top-6 border-r-2 border-dashed border-[#C7D8E1]"
                  aria-hidden="true"
                ></span>
                <li
                  v-for="step in process"
                  :key="step.step"
                  class="relative flex items-start gap-5"
                >
                  <span
                    class="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-[#2AA9E3] bg-[#F3F7F9] font-['Reem_Kufi'] text-base font-bold text-[#0F6F9E]"
                  >
                    {{ step.step }}
                  </span>
                  <div class="rounded-xl border border-[#C7D8E1] bg-white px-5 py-4 flex-1">
                    <h4 class="font-['Reem_Kufi'] text-base font-bold text-[#14202A]">
                      {{ step.title }}
                    </h4>
                    <p class="mt-1 text-xs leading-7 text-[#44505A]">
                      {{ step.description }}
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            <!-- Prev / Next -->
            <nav
              v-if="prev || next"
              class="grid gap-4 border-t border-dashed border-[#C7D8E1] pt-10 sm:grid-cols-2"
              aria-label="التنقل بين الخدمات"
            >
              <NuxtLink
                v-if="prev"
                :to="`/services/${prev.slug}`"
                class="group flex items-center gap-4 rounded-xl border border-[#C7D8E1] bg-white p-4 transition-all duration-300 hover:border-[#2AA9E3]/60 hover:shadow-lg"
              >
                <i
                  class="pi pi-arrow-right text-sm text-[#0F6F9E] transition-transform duration-300 group-hover:translate-x-1"
                ></i>
                <div class="min-w-0">
                  <p class="text-[10px] font-bold tracking-wider text-[#0F6F9E]">
                    الخدمة السابقة
                  </p>
                  <p class="mt-1 line-clamp-1 text-sm font-bold text-[#14202A]">
                    {{ prev.title }}
                  </p>
                </div>
              </NuxtLink>

              <NuxtLink
                v-if="next"
                :to="`/services/${next.slug}`"
                class="group flex items-center justify-between gap-4 rounded-xl border border-[#C7D8E1] bg-white p-4 transition-all duration-300 hover:border-[#2AA9E3]/60 hover:shadow-lg sm:col-start-2"
              >
                <div class="min-w-0">
                  <p class="text-[10px] font-bold tracking-wider text-[#0F6F9E]">
                    الخدمة التالية
                  </p>
                  <p class="mt-1 line-clamp-1 text-sm font-bold text-[#14202A]">
                    {{ next.title }}
                  </p>
                </div>
                <i
                  class="pi pi-arrow-left text-sm text-[#0F6F9E] transition-transform duration-300 group-hover:-translate-x-1"
                ></i>
              </NuxtLink>
            </nav>
          </div>

          <!-- Sidebar -->
          <aside class="space-y-5 lg:sticky lg:top-24">
            <!-- CTA -->
            <div
              class="blueprint relative overflow-hidden rounded-2xl bg-[#14202A] p-7 text-white shadow-[0_20px_45px_rgba(20,32,42,0.2)]"
            >
              <div
                class="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-l from-[#0F6F9E] via-[#2AA9E3] to-[#75D0F5]"
              ></div>
              <div class="relative space-y-4">
                <span
                  class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2AA9E3]/15"
                >
                  <i class="pi pi-send text-[#2AA9E3]"></i>
                </span>
                <h3 class="font-['Reem_Kufi'] text-xl font-bold leading-relaxed">
                  هل ترغب بالاستفسار عن هذه الخدمة لمشروعك؟
                </h3>
                <p class="text-xs leading-7 text-[#B7CAD6]">
                  فريقنا المتخصص يوفر استشارات مجانية وجداول كميات دقيقة.
                </p>
                <NuxtLink
                  to="/contact"
                  class="group inline-flex w-full items-center justify-center gap-3 rounded-lg bg-[#2AA9E3] px-6 py-3.5 text-sm font-bold text-[#14202A] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2298cf]"
                >
                  <span>طلب دراسة وتسعير</span>
                  <i
                    class="pi pi-arrow-left text-xs transition-transform duration-300 group-hover:-translate-x-1"
                  ></i>
                </NuxtLink>
              </div>
            </div>

            <!-- Other services -->
            <div
              v-if="others.length"
              class="overflow-hidden rounded-2xl border border-[#C7D8E1] bg-white"
            >
              <div
                class="flex items-center justify-between border-b border-dashed border-[#C7D8E1] px-5 py-4"
              >
                <h3 class="text-sm font-bold text-[#14202A]">خدمات أخرى</h3>
                <NuxtLink
                  to="/services"
                  class="text-[11px] font-bold text-[#0F6F9E] transition-colors hover:text-[#2AA9E3]"
                >
                  عرض الكل
                </NuxtLink>
              </div>
              <ul class="divide-y divide-[#C7D8E1]/70">
                <li v-for="s in others" :key="s.id">
                  <NuxtLink
                    :to="`/services/${s.slug}`"
                    class="group flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-[#EAF6FC]"
                  >
                    <span
                      class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#14202A] transition-colors group-hover:bg-[#2AA9E3]"
                    >
                      <i
                        :class="[
                          s.icon,
                          'text-sm text-[#2AA9E3] group-hover:text-[#14202A]',
                        ]"
                      ></i>
                    </span>
                    <span class="line-clamp-1 flex-1 text-xs font-bold text-[#14202A]">
                      {{ s.title }}
                    </span>
                    <i
                      class="pi pi-angle-left text-xs text-[#0F6F9E] transition-transform duration-300 group-hover:-translate-x-1"
                    ></i>
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <NuxtLink
              to="/services"
              class="group flex items-center justify-between rounded-xl border border-[#C7D8E1] bg-white px-5 py-4 text-sm font-bold text-[#14202A] transition-colors hover:border-[#2AA9E3]/60"
            >
              <span>العودة لكل الخدمات</span>
              <i
                class="pi pi-arrow-left text-xs text-[#0F6F9E] transition-transform duration-300 group-hover:-translate-x-1"
              ></i>
            </NuxtLink>
          </aside>
        </div>
      </section>
    </template>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useApiMethods } from "~/composables/useApiMethods";
import { API_ENDPOINTS } from "~/config/endpoints";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85";

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

// Remount the page whenever the route changes (e.g. /services/a -> /services/b)
definePageMeta({ key: (r) => r.fullPath });

const route = useRoute();
const slug = computed(() => String(route.params.slug));
const { getMethod } = useApiMethods();

const service = ref<ServiceCard | null>(null);
const all = ref<ServiceCard[]>([]);
const loading = ref(true);
let requestId = 0; // ignore responses from outdated requests

// w-screen layers include the scrollbar width; clip x-overflow on <body> here only.
useHead({
  title: computed(() =>
    service.value
      ? `${service.value.title} | معراج التشييد للمقاولات العامة`
      : "خدماتنا | معراج التشييد للمقاولات العامة",
  ),
  bodyAttrs: { class: "overflow-x-clip" },
});

const process = [
  {
    step: 1,
    title: "الدراسة والاستشارة",
    description: "تحليل المخططات وتقييم الموقع وتحديد المتطلبات الفنية بدقة.",
  },
  {
    step: 2,
    title: "التخطيط والميزانية",
    description: "جدول زمني مفصل وحساب للكميات وتكلفة واضحة وشفافة.",
  },
  {
    step: 3,
    title: "التنفيذ والإشراف",
    description: "أعمال ميدانية بإشراف هندسي يومي وتقارير دورية لكل مرحلة.",
  },
  {
    step: 4,
    title: "التسليم والضمان",
    description: "فحص الجودة النهائي وتسليم متكامل مع شهادات الضمان المعتمدة.",
  },
];

const isUrl = (v: unknown): v is string =>
  typeof v === "string" && /^(https?:)?\/\/|^\//.test(v);

// Accept { data: {..} }, { data: { data: {..} } } or { data: [{..}] }
const toObject = (res: any): any | null => {
  let d = res?.data;
  if (d && !Array.isArray(d) && d.data && typeof d.data === "object") d = d.data;
  if (Array.isArray(d)) d = d[0];
  return d && typeof d === "object" ? d : null;
};

// Accept [..], { data: [..] } or { items: [..] } response shapes
const toList = (res: any): any[] => {
  const d = res?.data;
  if (Array.isArray(d)) return d;
  if (Array.isArray(d?.data)) return d.data;
  if (Array.isArray(d?.items)) return d.items;
  return [];
};

// Supports both naming styles (titleAr / title, descriptionAr / fullDescription ...)
const normalize = (s: any): ServiceCard => {
  const lead =
    s.shortDescriptionAr || s.shortDescription || "";
  const full =
    s.fullDescriptionAr || s.fullDescription || s.descriptionAr || s.description || "";
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

const fetchService = async () => {
  const current = ++requestId;
  loading.value = true;

  try {
    const res = await getMethod(API_ENDPOINTS.PUBLIC.SERVICE_BY_SLUG(slug.value));
    if (current !== requestId) return;
    // getMethod swallows errors and returns null
    if (res === null) throw new Error("service request failed");
    const obj = toObject(res);
    service.value = obj ? normalize(obj) : null;
  } catch (err) {
    if (current !== requestId) return;
    console.error("Failed to load service:", err);
    service.value = null;
  } finally {
    if (current === requestId) loading.value = false;
  }
};

// the full list powers "other services" and previous / next navigation
const fetchAll = async () => {
  try {
    const res = await getMethod(API_ENDPOINTS.PUBLIC.SERVICES);
    if (res === null) return;
    all.value = toList(res)
      .filter((s) => s.active !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map(normalize);
  } catch (err) {
    console.error("Failed to load services list:", err);
  }
};

const currentIndex = computed(() =>
  all.value.findIndex((s) => String(s.slug) === slug.value),
);
const position = computed(() => (currentIndex.value >= 0 ? currentIndex.value + 1 : 0));
const prev = computed(() =>
  currentIndex.value > 0 ? all.value[currentIndex.value - 1] : null,
);
const next = computed(() =>
  currentIndex.value >= 0 && currentIndex.value < all.value.length - 1
    ? all.value[currentIndex.value + 1]
    : null,
);
const others = computed(() =>
  all.value.filter((s) => String(s.slug) !== slug.value).slice(0, 5),
);

const facts = computed(() => [
  { icon: "pi-check-circle", label: "نوع الخدمة", value: "خدمة معتمدة" },
  {
    icon: "pi-list",
    label: "بنود نطاق العمل",
    value: service.value?.features.length
      ? `${service.value.features.length} بنود`
      : "حسب المشروع",
  },
  { icon: "pi-shield", label: "المعايير", value: "كود البناء السعودي" },
]);

watch(slug, () => fetchService());

onMounted(() => {
  fetchService();
  fetchAll();
});
</script>

<style scoped>
/* blueprint paper: major 120px grid + minor 24px grid */
.blueprint {
  background-image:
    linear-gradient(rgba(42, 169, 227, 0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(42, 169, 227, 0.12) 1px, transparent 1px),
    linear-gradient(rgba(42, 169, 227, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(42, 169, 227, 0.05) 1px, transparent 1px);
  background-size:
    120px 120px,
    120px 120px,
    24px 24px,
    24px 24px;
}
</style>