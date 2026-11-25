<template>
  <!--
    Concept: "the portfolio". Image-led, like a gallery of finished buildings:
    a featured showcase, then tall photo cards that reveal the project data
    (client, area, duration) on hover.

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
         HERO  (cover photo + numbers)
    =========================================== -->
    <section class="relative isolate">
      <div
        class="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden bg-[#1F2A30]"
      >
        <img
          :src="heroImage"
          alt=""
          class="h-full w-full object-cover opacity-35"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-[#1F2A30] via-[#1F2A30]/75 to-[#1F2A30]/40"
        ></div>
        <div
          class="absolute inset-0 bg-gradient-to-l from-[#1F2A30]/80 via-transparent to-transparent"
        ></div>
        <div
          class="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-l from-[#0F6F9E] via-[#2AA9E3] to-[#75D0F5]"
        ></div>
      </div>

      <div class="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <nav
          class="flex items-center gap-2 text-xs font-medium text-[#C7D8E1]"
          aria-label="breadcrumb"
        >
          <NuxtLink to="/" class="transition-colors hover:text-[#2AA9E3]">
            الرئيسية
          </NuxtLink>
          <i class="pi pi-angle-left text-[9px] text-[#2AA9E3]"></i>
          <span class="text-[#2AA9E3]">مشاريعنا</span>
        </nav>

        <div class="max-w-3xl space-y-6 pb-14 pt-16 sm:pt-24">
          <div class="flex items-center gap-3 text-[#2AA9E3]">
            <span class="h-px w-10 bg-[#2AA9E3]"></span>
            <span class="text-[11px] font-bold tracking-[0.2em]">
              سجل الإنجازات
            </span>
          </div>

          <h1
            class="font-['Reem_Kufi'] text-4xl font-bold leading-[1.4] text-white md:text-6xl"
          >
            مبانٍ نفخر بها،
            <span class="block text-[#2AA9E3]">وأعمال تتحدث عنا</span>
          </h1>

          <p class="max-w-2xl text-sm leading-8 text-[#C7D8E1] sm:text-base">
            استعرض نخبة من المشاريع المتنوعة التي نفذتها معراج التشييد بأعلى
            معايير الإتقان والجودة عبر مختلف مناطق المملكة.
          </p>
        </div>

        <!-- Numbers -->
        <div
          class="grid grid-cols-2 gap-y-8 border-t border-white/15 py-8 sm:grid-cols-4 sm:divide-x sm:divide-x-reverse sm:divide-white/10"
        >
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="px-2 sm:px-8 sm:first:pr-0"
          >
            <div
              class="font-['Reem_Kufi'] text-4xl font-bold leading-none text-white sm:text-5xl"
              dir="ltr"
              style="text-align: right"
            >
              <template v-if="loading">—</template>
              <template v-else>{{ stat.value }}</template>
            </div>
            <p class="mt-3 text-xs font-medium text-[#C7D8E1]">
              {{ stat.label }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ==========================================
         PORTFOLIO
    =========================================== -->
    <section class="relative py-14 sm:py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <!-- Loading -->
        <div
          v-if="loading"
          class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <div
            v-for="n in 6"
            :key="n"
            class="aspect-[4/5] animate-pulse rounded-2xl bg-[#E1EAEF]"
          ></div>
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
          <h3 class="font-['Reem_Kufi'] text-xl font-bold text-[#1F2A30]">
            تعذر تحميل المشاريع
          </h3>
          <p class="mt-2 text-sm text-[#44505A]">
            حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى.
          </p>
          <button
            type="button"
            class="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#2AA9E3] px-6 py-3 text-sm font-bold text-[#1F2A30] transition-colors hover:bg-[#2298cf]"
            @click="fetchProjects"
          >
            <i class="pi pi-refresh text-xs"></i>
            إعادة المحاولة
          </button>
        </div>

        <!-- No projects at all -->
        <div
          v-else-if="projects.length === 0"
          class="rounded-2xl border border-dashed border-[#C7D8E1] bg-white px-5 py-20 text-center"
        >
          <i class="pi pi-building mb-4 text-4xl text-[#2AA9E3]"></i>
          <h3 class="font-['Reem_Kufi'] text-xl font-bold text-[#1F2A30]">
            لا توجد مشاريع حالياً
          </h3>
          <p class="mx-auto mt-2 max-w-sm text-sm leading-7 text-[#44505A]">
            نعمل باستمرار على تحديث سجل أعمالنا. يرجى زيارة الصفحة مرة أخرى
            للاطلاع على أحدث مشاريعنا.
          </p>
        </div>

        <template v-else>
          <!-- ======== Featured showcase ======== -->
          <article
            v-if="showcase"
            class="group relative mb-14 overflow-hidden rounded-3xl bg-[#1F2A30] shadow-[0_28px_70px_rgba(31,42,48,0.22)]"
          >
            <NuxtLink
              :to="`/projects/${showcase.id}`"
              class="absolute inset-0 z-10"
              :aria-label="`عرض مشروع ${showcase.title}`"
            ></NuxtLink>

            <div class="relative min-h-[460px] sm:min-h-[520px]">
              <img
                :src="showcase.image || FALLBACK_IMAGE"
                :alt="showcase.title"
                class="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-[#1F2A30] via-[#1F2A30]/55 to-transparent"
              ></div>
              <div
                class="absolute inset-0 bg-gradient-to-l from-[#1F2A30]/90 via-[#1F2A30]/30 to-transparent"
              ></div>

              <div
                class="relative flex h-full min-h-[460px] flex-col justify-between p-6 sm:min-h-[520px] sm:p-10 lg:p-14"
              >
                <div class="flex flex-wrap items-center gap-3">
                  <span
                    class="inline-flex items-center gap-2 rounded-full bg-[#2AA9E3] px-4 py-1.5 text-[11px] font-bold text-[#1F2A30]"
                  >
                    <i class="pi pi-star-fill text-[10px]"></i>
                    مشروع مميز
                  </span>
                  <span
                    class="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md"
                  >
                    {{ showcase.category }}
                  </span>
                </div>

                <div class="max-w-2xl space-y-5">
                  <h2
                    class="font-['Reem_Kufi'] text-3xl font-bold leading-[1.45] text-white sm:text-5xl"
                  >
                    {{ showcase.title }}
                  </h2>
                  <p
                    v-if="showcase.description"
                    class="line-clamp-3 text-sm leading-8 text-[#D5E2EA] sm:text-base"
                  >
                    {{ showcase.description }}
                  </p>

                  <dl
                    class="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/15 pt-5 sm:grid-cols-4"
                  >
                    <div v-for="spec in showcase.specs" :key="spec.label">
                      <dt class="text-[11px] font-medium text-[#9FB6C4]">
                        {{ spec.label }}
                      </dt>
                      <dd class="mt-1 text-sm font-bold text-white">
                        {{ spec.value }}
                      </dd>
                    </div>
                  </dl>

                  <span
                    class="inline-flex items-center gap-3 rounded-lg bg-[#2AA9E3] px-7 py-3.5 text-sm font-bold text-[#1F2A30] transition-all duration-300 group-hover:bg-white"
                  >
                    عرض تفاصيل المشروع
                    <i
                      class="pi pi-arrow-left text-xs transition-transform duration-300 group-hover:-translate-x-1"
                    ></i>
                  </span>
                </div>
              </div>
            </div>
          </article>

          <!-- ======== Filters ======== -->
          <div
            class="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
          >
            <div class="space-y-3">
              <div class="flex items-center gap-3 text-[#0F6F9E]">
                <span class="h-px w-10 bg-[#2AA9E3]"></span>
                <span class="text-[11px] font-bold tracking-[0.2em]">
                  معرض الأعمال
                </span>
              </div>
              <h2
                class="font-['Reem_Kufi'] text-2xl font-bold text-[#1F2A30] sm:text-4xl"
              >
                استكشف مشاريعنا
              </h2>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
              <!-- status segmented -->
              <div
                class="inline-flex w-fit rounded-lg border border-[#C7D8E1] bg-white p-1"
                role="tablist"
              >
                <button
                  v-for="s in statusTabs"
                  :key="s.value"
                  type="button"
                  role="tab"
                  :aria-selected="activeStatus === s.value"
                  class="rounded-md px-4 py-2 text-xs font-bold transition-colors duration-300"
                  :class="
                    activeStatus === s.value
                      ? 'bg-[#1F2A30] text-white'
                      : 'text-[#44505A] hover:text-[#0F6F9E]'
                  "
                  @click="activeStatus = s.value"
                >
                  {{ s.label }}
                </button>
              </div>
            </div>
          </div>

          <!-- category tabs -->
          <div
            v-if="categories.length > 2"
            class="-mx-4 mb-10 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
            role="tablist"
          >
            <button
              v-for="cat in categories"
              :key="cat.name"
              type="button"
              role="tab"
              :aria-selected="activeCategory === cat.name"
              class="inline-flex shrink-0 items-center gap-2 rounded-full border px-5 py-2 text-xs font-bold transition-all duration-300"
              :class="
                activeCategory === cat.name
                  ? 'border-[#2AA9E3] bg-[#2AA9E3] text-[#1F2A30]'
                  : 'border-[#C7D8E1] bg-white text-[#44505A] hover:border-[#2AA9E3] hover:text-[#0F6F9E]'
              "
              @click="activeCategory = cat.name"
            >
              {{ cat.name === ALL ? "كل الأعمال" : cat.name }}
              <span
                class="rounded-full px-2 py-0.5 text-[10px]"
                :class="
                  activeCategory === cat.name
                    ? 'bg-[#1F2A30]/15'
                    : 'bg-[#EAF6FC] text-[#0F6F9E]'
                "
              >
                {{ cat.count }}
              </span>
            </button>
          </div>

          <!-- nothing matches filters -->
          <div
            v-if="gridItems.length === 0 && !showcase"
            class="rounded-2xl border border-dashed border-[#C7D8E1] bg-white px-5 py-16 text-center"
          >
            <i class="pi pi-filter mb-3 text-3xl text-[#2AA9E3]"></i>
            <p class="text-sm font-bold text-[#1F2A30]">
              لا توجد مشاريع تطابق هذا التصنيف
            </p>
            <button
              type="button"
              class="mt-4 text-xs font-bold text-[#0F6F9E] hover:text-[#2AA9E3]"
              @click="resetFilters"
            >
              عرض كل الأعمال
            </button>
          </div>

          <!-- ======== Photo cards ======== -->
          <TransitionGroup
            v-else
            name="card"
            tag="div"
            class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <NuxtLink
              v-for="(project, index) in gridItems"
              :key="project.id"
              :to="`/projects/${project.id}`"
              class="project-card group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-[#1F2A30] shadow-[0_6px_24px_rgba(31,42,48,0.1)] transition-shadow duration-500 hover:shadow-[0_28px_60px_rgba(31,42,48,0.25)]"
              :style="{ '--card-index': index }"
              :aria-label="`عرض مشروع ${project.title}`"
            >
              <img
                :src="project.image || FALLBACK_IMAGE"
                :alt="project.title"
                loading="lazy"
                class="absolute inset-0 h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-110"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-[#1F2A30] via-[#1F2A30]/35 to-[#1F2A30]/5"
              ></div>

              <!-- top row -->
              <div class="absolute inset-x-0 top-0 flex items-start justify-between p-5">
                <span
                  class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#1F2A30]/60 px-3.5 py-1.5 text-[10px] font-semibold text-white backdrop-blur-md"
                >
                  <span class="h-1.5 w-1.5 rounded-full bg-[#2AA9E3]"></span>
                  {{ project.category }}
                </span>

                <span
                  class="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold text-[#1F2A30]"
                >
                  <span
                    class="h-2 w-2 rounded-full"
                    :class="
                      project.completed
                        ? 'bg-[#0F9D78]'
                        : 'animate-pulse bg-[#2AA9E3]'
                    "
                  ></span>
                  {{ project.completed ? "مكتمل" : "قيد التنفيذ" }}
                </span>
              </div>

              <!-- bottom content -->
              <div class="absolute inset-x-0 bottom-0 p-6">
                <p
                  class="mb-2 flex items-center gap-2 text-[11px] font-medium text-[#B7CAD6]"
                >
                  <i class="pi pi-map-marker text-[10px] text-[#2AA9E3]"></i>
                  <span class="line-clamp-1">{{ project.location }}</span>
                  <span v-if="project.year" class="text-[#2AA9E3]">·</span>
                  <span v-if="project.year">{{ project.year }}</span>
                </p>

                <h3
                  class="line-clamp-2 font-['Reem_Kufi'] text-xl font-bold leading-relaxed text-white"
                >
                  {{ project.title }}
                </h3>

                <!-- reveal on hover / always on touch -->
                <div
                  class="grid grid-rows-[0fr] transition-all duration-500 ease-out group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]"
                >
                  <div class="overflow-hidden">
                    <p
                      v-if="project.description"
                      class="mt-3 line-clamp-2 text-xs leading-7 text-[#D5E2EA]"
                    >
                      {{ project.description }}
                    </p>

                    <div
                      class="mt-4 flex flex-wrap gap-2 border-t border-white/15 pt-4"
                    >
                      <span
                        v-for="spec in project.specs"
                        :key="spec.label"
                        class="rounded-md bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white"
                      >
                        <span class="text-[#9FB6C4]">{{ spec.label }}:</span>
                        {{ spec.value }}
                      </span>
                    </div>

                    <span
                      class="mt-4 inline-flex items-center gap-2 text-[11px] font-bold text-[#2AA9E3]"
                    >
                      تفاصيل المشروع
                      <i
                        class="pi pi-arrow-left text-[10px] transition-transform duration-300 group-hover:-translate-x-1"
                      ></i>
                    </span>
                  </div>
                </div>
              </div>

              <span
                class="absolute inset-x-0 bottom-0 h-[3px] origin-right scale-x-0 bg-gradient-to-l from-[#0F6F9E] via-[#2AA9E3] to-[#75D0F5] transition-transform duration-500 group-hover:scale-x-100"
              ></span>
            </NuxtLink>
          </TransitionGroup>
        </template>
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
          class="absolute -bottom-32 right-[15%] h-72 w-72 rounded-full bg-[#0F6F9E]/20 blur-3xl"
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
              مشروعك القادم
            </span>
            <h2
              class="font-['Reem_Kufi'] text-3xl font-bold leading-relaxed text-white sm:text-4xl"
            >
              هل لديك مشروع في ذهنك؟
            </h2>
            <p class="text-sm leading-8 text-[#C7D8E1]">
              دعنا نساعدك في تحويل أفكارك إلى واقع بأعلى معايير الجودة
              والاحترافية الهندسية.
            </p>
          </div>

          <NuxtLink
            to="/contact"
            class="group inline-flex shrink-0 items-center gap-3 rounded-lg bg-[#2AA9E3] px-8 py-4 text-sm font-bold text-[#1F2A30] shadow-[0_8px_25px_rgba(42,169,227,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#2298cf]"
          >
            <span>تواصل معنا الآن</span>
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
import { ref, computed, onMounted } from "vue";
import { useApiMethods } from "~/composables/useApiMethods";
import { API_ENDPOINTS } from "~/config/endpoints";

definePageMeta({ key: (r) => r.fullPath });

const { getMethod } = useApiMethods();

const ALL = "__all__";
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=1400&q=85";

interface Spec {
  label: string;
  value: string;
}
interface ProjectCard {
  id: string | number;
  title: string;
  category: string;
  location: string;
  year: string;
  area: string;
  description: string;
  image: string;
  completed: boolean;
  featured: boolean;
  order: number;
  specs: Spec[];
}

const projects = ref<ProjectCard[]>([]);
const loading = ref(true);
const error = ref(false);
const activeCategory = ref<string>(ALL);
const activeStatus = ref<"all" | "completed" | "in_progress">("all");

// w-screen layers include the scrollbar width; clip x-overflow on <body> here only.
useHead({
  title: "سجل المشاريع والأعمال | شركة معراج التشييد للمقاولات العامة",
  meta: [
    {
      name: "description",
      content:
        "استعرض مشاريع معراج التشييد للمقاولات العامة وأعمالنا الإنشائية والتشطيبات في مختلف مناطق المملكة العربية السعودية.",
    },
  ],
  bodyAttrs: { class: "overflow-x-clip" },
});

// Accept [..], { data: [..] } or { items: [..] } response shapes
const toList = (res: any): any[] => {
  const d = res?.data;
  if (Array.isArray(d)) return d;
  if (Array.isArray(d?.data)) return d.data;
  if (Array.isArray(d?.items)) return d.items;
  return [];
};

// Supports both naming styles (titleAr / title, shortDescriptionAr / description ...)
const normalize = (p: any): ProjectCard => {
  const client = p.client || "";
  const area = p.area || "";
  const duration = p.duration || "";
  const year = p.year ? String(p.year) : "";
  return {
    id: p.id,
    title: p.titleAr || p.title || "",
    category: p.category || "إنشاءات",
    location: p.location || "الرياض",
    year,
    area,
    description:
      p.shortDescriptionAr ||
      p.description ||
      p.descriptionAr ||
      p.fullDescription ||
      "",
    image: p.coverImage || (Array.isArray(p.images) ? p.images[0] : "") || "",
    completed: p.status === "completed",
    featured: !!p.featured,
    order: Number(p.order ?? 0),
    specs: [
      client && { label: "العميل", value: client },
      area && { label: "المساحة", value: area },
      duration && { label: "المدة", value: duration },
      year && { label: "سنة الإنجاز", value: year },
    ].filter(Boolean) as Spec[],
  };
};

const fetchProjects = async () => {
  loading.value = true;
  error.value = false;

  try {
    const res = await getMethod(API_ENDPOINTS.PUBLIC.PROJECTS);
    // getMethod swallows errors and returns null
    if (res === null) throw new Error("projects request failed");
    projects.value = toList(res)
      .map(normalize)
      .sort((a, b) => a.order - b.order);
  } catch (err) {
    console.error("Failed to load projects:", err);
    projects.value = [];
    error.value = true;
  } finally {
    loading.value = false;
  }
};

onMounted(() => fetchProjects());

/* ---------- derived data ---------- */

const statusTabs = [
  { value: "all", label: "الكل" },
  { value: "completed", label: "مكتملة" },
  { value: "in_progress", label: "قيد التنفيذ" },
] as const;

const matchesStatus = (p: ProjectCard) =>
  activeStatus.value === "all" ||
  (activeStatus.value === "completed" ? p.completed : !p.completed);

const categories = computed(() => {
  const map = new Map<string, number>();
  projects.value.filter(matchesStatus).forEach((p) =>
    map.set(p.category, (map.get(p.category) ?? 0) + 1),
  );
  const total = [...map.values()].reduce((a, b) => a + b, 0);
  return [
    { name: ALL, count: total },
    ...[...map.entries()].map(([name, count]) => ({ name, count })),
  ];
});

const filtered = computed(() =>
  projects.value.filter(
    (p) =>
      matchesStatus(p) &&
      (activeCategory.value === ALL || p.category === activeCategory.value),
  ),
);

// the featured showcase only appears with the default (unfiltered) view
const showcase = computed(() =>
  activeCategory.value === ALL && activeStatus.value === "all"
    ? (projects.value.find((p) => p.featured) ?? null)
    : null,
);

const gridItems = computed(() =>
  showcase.value
    ? filtered.value.filter((p) => p.id !== showcase.value!.id)
    : filtered.value,
);

const resetFilters = () => {
  activeCategory.value = ALL;
  activeStatus.value = "all";
};

const heroImage = computed(
  () =>
    projects.value.find((p) => p.featured && p.image)?.image ||
    projects.value.find((p) => p.image)?.image ||
    FALLBACK_IMAGE,
);

// "18,500 م²" -> 18500
const areaNumber = (s: string) => {
  const n = Number(String(s).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

const stats = computed(() => {
  const list = projects.value;
  const totalArea = list.reduce((sum, p) => sum + areaNumber(p.area), 0);
  return [
    { value: list.length, label: "مشروع في سجلنا" },
    { value: list.filter((p) => p.completed).length, label: "مشروع مكتمل" },
    { value: list.filter((p) => !p.completed).length, label: "قيد التنفيذ حالياً" },
    {
      value: totalArea ? `${totalArea.toLocaleString("en-US")} م²` : "—",
      label: "إجمالي المساحات المنفذة",
    },
  ];
});
</script>

<style scoped>
.project-card {
  animation: card-appear 650ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(var(--card-index, 0) * 70ms);
}

@keyframes card-appear {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-enter-active,
.card-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.card-enter-from,
.card-leave-to {
  opacity: 0;
  transform: scale(0.96);
}
.card-leave-active {
  position: absolute;
}

@media (prefers-reduced-motion: reduce) {
  .project-card {
    animation: none;
  }
  .project-card,
  .project-card * {
    transition-duration: 0.01ms !important;
  }
}
</style>