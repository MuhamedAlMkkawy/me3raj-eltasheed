<template>
  <!--
    Full-bleed rule: the parent layout has margin/padding, so every edge-to-edge
    background is an absolute layer: left-1/2 + w-screen + -translate-x-1/2.
    Content stays inside the normal max-w-7xl container.
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
         LOADING
    =========================================== -->
    <div v-if="loading" class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="h-[380px] animate-pulse rounded-3xl bg-[#E5EDF2]"></div>
      <div class="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div class="space-y-4">
          <div class="h-6 w-1/3 animate-pulse rounded bg-[#E5EDF2]"></div>
          <div class="h-4 w-full animate-pulse rounded bg-[#E5EDF2]"></div>
          <div class="h-4 w-5/6 animate-pulse rounded bg-[#E5EDF2]"></div>
          <div class="h-4 w-2/3 animate-pulse rounded bg-[#E5EDF2]"></div>
        </div>
        <div class="h-64 animate-pulse rounded-3xl bg-[#E5EDF2]"></div>
      </div>
    </div>

    <!-- ==========================================
         ERROR / NOT FOUND
    =========================================== -->
    <div
      v-else-if="!project"
      class="mx-auto max-w-xl px-4 py-28 text-center sm:px-6"
    >
      <div
        class="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#EAF6FC]"
      >
        <i class="pi pi-exclamation-circle text-3xl text-[#0F6F9E]"></i>
      </div>
      <h1 class="font-['Reem_Kufi'] text-2xl font-bold text-[#1F2A30]">
        تعذر العثور على المشروع
      </h1>
      <p class="mt-2 text-sm leading-7 text-[#44505A]">
        قد يكون المشروع غير متاح أو حدث خطأ أثناء تحميل البيانات.
      </p>
      <div class="mt-7 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-full bg-[#2AA9E3] px-6 py-3 text-sm font-bold text-[#1F2A30] transition-colors hover:bg-[#2298cf]"
          @click="fetchProject"
        >
          <i class="pi pi-refresh text-xs"></i>
          إعادة المحاولة
        </button>
        <NuxtLink
          to="/projects"
          class="inline-flex items-center gap-2 rounded-full border border-[#C7D8E1] bg-white px-6 py-3 text-sm font-bold text-[#1F2A30] transition-colors hover:border-[#2AA9E3]"
        >
          كل المشاريع
        </NuxtLink>
      </div>
    </div>

    <template v-else>
      <!-- ==========================================
           HERO
      =========================================== -->
      <section class="relative isolate">
        <!-- Full-bleed cover layer -->
        <div
          class="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden bg-[#1F2A30]"
        >
          <img
            :src="cover"
            :alt="project.titleAr"
            class="h-full w-full object-cover opacity-50"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-[#1F2A30] via-[#1F2A30]/70 to-[#1F2A30]/30"
          ></div>
          <div
            class="absolute inset-0 bg-gradient-to-l from-[#1F2A30]/60 via-transparent to-transparent"
          ></div>
          <div
            class="absolute inset-0 opacity-[0.04]"
            style="
              background-image: linear-gradient(#C7D8E1 1px, transparent 1px),
                linear-gradient(90deg, #C7D8E1 1px, transparent 1px);
              background-size: 48px 48px;
            "
          ></div>
          <div
            class="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-l from-[#0F6F9E] via-[#2AA9E3] to-[#75D0F5]"
          ></div>
        </div>

        <div
          class="mx-auto flex min-h-[420px] max-w-7xl flex-col justify-end px-4 pb-28 pt-12 sm:px-6 md:min-h-[480px] lg:px-8"
        >
          <nav
            class="mb-auto flex flex-wrap items-center gap-2 text-xs font-medium text-[#C7D8E1]"
            aria-label="breadcrumb"
          >
            <NuxtLink to="/" class="transition-colors hover:text-[#2AA9E3]">
              الرئيسية
            </NuxtLink>
            <i class="pi pi-angle-left text-[9px] text-[#2AA9E3]"></i>
            <NuxtLink
              to="/projects"
              class="transition-colors hover:text-[#2AA9E3]"
            >
              المشاريع
            </NuxtLink>
            <i class="pi pi-angle-left text-[9px] text-[#2AA9E3]"></i>
            <span class="line-clamp-1 text-[#2AA9E3]">
              {{ project.titleAr }}
            </span>
          </nav>

          <div class="mt-12 max-w-3xl space-y-5">
            <div class="flex flex-wrap items-center gap-2">
              <span
                class="inline-flex items-center gap-2 rounded-full bg-[#2AA9E3] px-4 py-1.5 text-[11px] font-bold text-[#1F2A30]"
              >
                {{ project.category || "مقاولات عامة" }}
              </span>
              <span
                class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md"
              >
                <span
                  class="h-2 w-2 rounded-full"
                  :class="
                    isCompleted ? 'bg-[#0F9D78]' : 'animate-pulse bg-[#2AA9E3]'
                  "
                ></span>
                {{ isCompleted ? "مشروع مكتمل" : "قيد التنفيذ" }}
              </span>
            </div>

            <h1
              class="font-['Reem_Kufi'] text-3xl font-bold leading-[1.45] text-white sm:text-4xl md:text-5xl"
            >
              {{ project.titleAr }}
            </h1>

            <div class="flex items-center gap-3">
              <span class="h-[3px] w-14 rounded-full bg-[#2AA9E3]"></span>
              <span class="h-[3px] w-4 rounded-full bg-[#2AA9E3]/40"></span>
              <span class="h-[3px] w-2 rounded-full bg-[#2AA9E3]/20"></span>
            </div>
          </div>
        </div>
      </section>

      <!-- ==========================================
           FACTS STRIP (overlaps hero)
      =========================================== -->
      <section class="relative z-10 -mt-16 px-4 sm:px-6 lg:px-8">
        <div
          class="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-[#C7D8E1] bg-[#C7D8E1] shadow-[0_20px_50px_rgba(31,42,48,0.12)] lg:grid-cols-4"
        >
          <div
            v-for="fact in facts"
            :key="fact.label"
            class="flex items-center gap-4 bg-white px-5 py-5 sm:px-6"
          >
            <span
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF6FC]"
            >
              <i :class="['pi', fact.icon, 'text-[#0F6F9E]']"></i>
            </span>
            <div class="min-w-0">
              <p class="text-[11px] font-medium text-[#44505A]">
                {{ fact.label }}
              </p>
              <p class="mt-1 truncate text-sm font-bold text-[#1F2A30]">
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
          class="mx-auto grid max-w-7xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8"
        >
          <!-- Main -->
          <div class="min-w-0 space-y-14">
            <!-- Description -->
            <div class="space-y-5">
              <div class="flex items-center gap-2">
                <span class="h-[2px] w-7 rounded-full bg-[#2AA9E3]"></span>
                <span class="text-xs font-bold tracking-wide text-[#0F6F9E]">
                  عن المشروع
                </span>
              </div>
              <h2
                class="font-['Reem_Kufi'] text-2xl font-bold text-[#1F2A30] sm:text-3xl"
              >
                تفاصيل ونطاق العمل
              </h2>
              <p
                class="whitespace-pre-line text-sm leading-8 text-[#333333] sm:text-base sm:leading-9"
              >
                {{ project.descriptionAr || project.shortDescriptionAr }}
              </p>
            </div>

            <!-- Gallery -->
            <div v-if="gallery.length" class="space-y-6">
              <div class="flex items-end justify-between gap-4">
                <div class="space-y-3">
                  <div class="flex items-center gap-2">
                    <span class="h-[2px] w-7 rounded-full bg-[#2AA9E3]"></span>
                    <span
                      class="text-xs font-bold tracking-wide text-[#0F6F9E]"
                    >
                      من موقع العمل
                    </span>
                  </div>
                  <h3
                    class="font-['Reem_Kufi'] text-2xl font-bold text-[#1F2A30] sm:text-3xl"
                  >
                    معرض صور المشروع
                  </h3>
                </div>
                <span
                  class="rounded-full border border-[#C7D8E1] bg-white px-4 py-1.5 text-[11px] font-bold text-[#44505A]"
                >
                  {{ gallery.length }} صورة
                </span>
              </div>

              <div class="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
                <button
                  v-for="(img, idx) in gallery"
                  :key="idx"
                  type="button"
                  class="group relative overflow-hidden rounded-2xl border border-[#C7D8E1]/70 bg-[#E5EDF2] shadow-sm"
                  :class="idx === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-square'"
                  :aria-label="`عرض الصورة ${idx + 1}`"
                  @click="openLightbox(idx)"
                >
                  <img
                    :src="img"
                    :alt="`${project.titleAr} - ${idx + 1}`"
                    loading="lazy"
                    class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span
                    class="absolute inset-0 flex items-center justify-center bg-[#1F2A30]/0 transition-colors duration-300 group-hover:bg-[#1F2A30]/45"
                  >
                    <span
                      class="flex h-12 w-12 scale-75 items-center justify-center rounded-full bg-[#2AA9E3] text-[#1F2A30] opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
                    >
                      <i class="pi pi-search-plus"></i>
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <aside class="space-y-5 lg:sticky lg:top-24">
            <div
              class="relative overflow-hidden rounded-3xl bg-[#1F2A30] p-7 text-white shadow-[0_20px_45px_rgba(31,42,48,0.18)]"
            >
              <div
                class="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full bg-[#2AA9E3]/15 blur-3xl"
              ></div>
              <div
                class="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-l from-[#0F6F9E] via-[#2AA9E3] to-[#75D0F5]"
              ></div>

              <div class="relative space-y-4">
                <span
                  class="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2AA9E3]/15"
                >
                  <i class="pi pi-send text-[#2AA9E3]"></i>
                </span>
                <h3 class="font-['Reem_Kufi'] text-xl font-bold leading-relaxed">
                  هل لديك مشروع مماثل ترغب بتنفيذه؟
                </h3>
                <p class="text-xs leading-7 text-[#C7D8E1]">
                  نحن نوفر الخبرة والمعدات لضمان إنجاز مشروعك بأعلى كفاءة وجودة.
                </p>
                <NuxtLink
                  to="/contact"
                  class="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#2AA9E3] px-6 py-3.5 text-sm font-bold text-[#1F2A30] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2298cf]"
                >
                  <span>طلب تسعير واستشارة</span>
                  <i
                    class="pi pi-arrow-left text-xs transition-transform duration-300 group-hover:-translate-x-1"
                  ></i>
                </NuxtLink>
              </div>
            </div>

            <NuxtLink
              to="/projects"
              class="group flex items-center justify-between rounded-2xl border border-[#C7D8E1] bg-white px-5 py-4 text-sm font-bold text-[#1F2A30] transition-colors hover:border-[#2AA9E3]/60"
            >
              <span>العودة لكل المشاريع</span>
              <i
                class="pi pi-arrow-left text-xs text-[#0F6F9E] transition-transform duration-300 group-hover:-translate-x-1"
              ></i>
            </NuxtLink>
          </aside>
        </div>
      </section>
    </template>

    <!-- ==========================================
         LIGHTBOX (fixed overlay)
    =========================================== -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="lightboxIndex !== null"
          dir="rtl"
          class="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1F2A30]/95 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          @click.self="closeLightbox"
        >
          <button
            type="button"
            class="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#2AA9E3] hover:text-[#1F2A30]"
            aria-label="إغلاق"
            @click="closeLightbox"
          >
            <i class="pi pi-times"></i>
          </button>

          <span
            class="absolute left-4 top-4 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white"
          >
            {{ lightboxIndex + 1 }} / {{ gallery.length }}
          </span>

          <button
            v-if="gallery.length > 1"
            type="button"
            class="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#2AA9E3] hover:text-[#1F2A30]"
            aria-label="السابق"
            @click.stop="step(-1)"
          >
            <i class="pi pi-angle-right text-xl"></i>
          </button>

          <img
            :src="gallery[lightboxIndex]"
            :alt="`${project?.titleAr} - ${lightboxIndex + 1}`"
            class="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
          />

          <button
            v-if="gallery.length > 1"
            type="button"
            class="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#2AA9E3] hover:text-[#1F2A30]"
            aria-label="التالي"
            @click.stop="step(1)"
          >
            <i class="pi pi-angle-left text-xl"></i>
          </button>
        </div>
      </Transition>
    </Teleport>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { useApiMethods } from "~/composables/useApiMethods";
import { API_ENDPOINTS } from "~/config/endpoints";
import type { ProjectItem } from "~/types";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=1600&q=80";

// Remount the page whenever the route changes (e.g. /projects/1 -> /projects/2)
definePageMeta({ key: (r) => r.fullPath });

const route = useRoute();
const id = computed(() => String(route.params.id));
const { getMethod } = useApiMethods();

const lightboxIndex = ref<number | null>(null);

// Accept { data: {..} }, { data: { data: {..} } } or { data: [{..}] }
const toProject = (res: any): ProjectItem | null => {
  let d = res?.data;
  if (d && !Array.isArray(d) && d.data && typeof d.data === "object") d = d.data;
  if (Array.isArray(d)) d = d[0];
  return d && typeof d === "object" ? (d as ProjectItem) : null;
};

// Gallery can be string[], object[] ({url|src|image}), a JSON string or a CSV string
const toGallery = (raw: any): string[] => {
  let v = raw;
  if (typeof v === "string") {
    const s = v.trim();
    if (!s) return [];
    try {
      v = JSON.parse(s);
    } catch {
      v = s.split(/[\n,]+/);
    }
  }
  if (!Array.isArray(v)) return [];
  return v
    .map((it: any) =>
      typeof it === "string" ? it.trim() : it?.url || it?.src || it?.image || "",
    )
    .filter(Boolean);
};

const project = ref<ProjectItem | null>(null);
const loading = ref(true);
let requestId = 0; // ignore responses from outdated requests

const fetchProject = async () => {
  const current = ++requestId;
  loading.value = true;

  try {
    const res = await getMethod(API_ENDPOINTS.PUBLIC.PROJECT_BY_ID(id.value));
    if (current !== requestId) return;
    // getMethod swallows errors and returns null
    if (res === null) throw new Error("project request failed");
    project.value = toProject(res);
  } catch (err) {
    if (current !== requestId) return;
    console.error("Failed to load project:", err);
    project.value = null;
  } finally {
    if (current === requestId) loading.value = false;
  }
};

// w-screen layers include the scrollbar width; clip x-overflow on <body> here only.
useHead({
  title: computed(() =>
    project.value
      ? `${project.value.titleAr} | مشاريع معراج التشييد للمقاولات العامة`
      : "مشاريعنا | معراج التشييد للمقاولات العامة",
  ),
  bodyAttrs: { class: "overflow-x-clip" },
});

const cover = computed(() => project.value?.coverImage || FALLBACK_IMAGE);
const gallery = computed<string[]>(() => toGallery(project.value?.gallery));
const isCompleted = computed(() => project.value?.status === "completed");

const facts = computed(() => [
  { icon: "pi-user", label: "العميل", value: project.value?.client || "خاص" },
  {
    icon: "pi-map-marker",
    label: "الموقع",
    value: project.value?.location || "المملكة العربية السعودية",
  },
  {
    icon: "pi-calendar",
    label: "تاريخ الإنجاز",
    value: project.value?.year || "2024",
  },
  {
    icon: "pi-objects-column",
    label: "المساحة / النطاق",
    value: project.value?.area || "شامل التنفيذ",
  },
]);

/* Lightbox */
const openLightbox = (i: number) => (lightboxIndex.value = i);
const closeLightbox = () => (lightboxIndex.value = null);
const step = (dir: 1 | -1) => {
  if (lightboxIndex.value === null || !gallery.value.length) return;
  const n = gallery.value.length;
  lightboxIndex.value = (lightboxIndex.value + dir + n) % n;
};

const onKey = (e: KeyboardEvent) => {
  if (lightboxIndex.value === null) return;
  if (e.key === "Escape") closeLightbox();
  // RTL: left arrow = next, right arrow = previous
  if (e.key === "ArrowLeft") step(1);
  if (e.key === "ArrowRight") step(-1);
};

watch(lightboxIndex, (v) => {
  if (import.meta.client) {
    document.documentElement.style.overflow = v === null ? "" : "hidden";
  }
});

watch(id, () => fetchProject());

onMounted(() => {
  fetchProject();
  window.addEventListener("keydown", onKey);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKey);
  if (import.meta.client) document.documentElement.style.overflow = "";
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
</style>