<template>
  <Dialog
    :visible="visible"
    modal
    :header="dialogTitle"
    :style="{ width: '780px', maxWidth: '95vw' }"
    @update:visible="emit('update:visible', $event)"
  >
    <div class="space-y-4">
      <!-- Tabs: Choose PrimeVue Icon OR Upload Custom Icon -->
      <div class="flex items-center gap-2 border-b border-[#C7D8E1] pb-2">
        <button
          type="button"
          class="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all"
          :class="activeTab === 'icons' ? 'bg-[#2AA9E3] text-[#1F2A30] shadow-sm' : 'text-[#44505A] hover:'"
          @click="activeTab = 'icons'"
        >
          <i class="pi pi-th-large"></i>
          <span>مكتبة أيقونات PrimeVue ({{ allIcons.length }}+)</span>
        </button>

        <button
          type="button"
          class="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all"
          :class="activeTab === 'upload' ? 'bg-[#2AA9E3] text-[#1F2A30] shadow-sm' : 'text-[#44505A] hover:'"
          @click="activeTab = 'upload'"
        >
          <i class="pi pi-upload"></i>
          <span>رفع أيقونة مخصصة (SVG / صورة)</span>
        </button>
      </div>

      <!-- TAB 1: PrimeVue Icons Browser -->
      <div v-if="activeTab === 'icons'" class="space-y-3">
        <!-- Search & Filter Bar -->
        <div class="flex flex-col sm:flex-row items-center gap-2">
          <div class="relative flex-1 w-full">
            <i class="pi pi-search absolute start-3.5 top-1/2 -translate-y-1/2 text-[#44505A] text-xs"></i>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="ابحث عن أيقونة بالاسم أو المعنى (building, check, tool, phone, home...)"
              class="w-full ps-9 pe-3 py-2 text-xs rounded-xl border border-[#C7D8E1] focus:outline-none focus:border-[#2AA9E3] "
            />
          </div>

          <div class="flex items-center gap-1 overflow-x-auto w-full sm:w-auto py-1">
            <button
              v-for="cat in categories"
              :key="cat.id"
              type="button"
              class="px-2.5 py-1 text-[11px] rounded-lg border whitespace-nowrap transition-colors"
              :class="selectedCategory === cat.id ? 'bg-[#1F2A30] text-white border-[#1F2A30]' : 'border-[#C7D8E1] bg-white text-[#44505A] hover:'"
              @click="selectedCategory = cat.id"
            >
              {{ cat.label }}
            </button>
          </div>
        </div>

        <!-- Selected Preview Info -->
        <div v-if="selectedIcon" class="flex items-center justify-between p-2.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-white border border-blue-200 flex items-center justify-center text-[#0F6F9E] text-lg shadow-sm">
              <i :class="selectedIcon"></i>
            </div>
            <div>
              <span class="text-[#44505A] text-[10px] block">الأيقونة المحددة حالياً:</span>
              <code class="font-bold text-[#1F2A30] font-mono">{{ selectedIcon }}</code>
            </div>
          </div>
          <button
            type="button"
            class="main-btn sm !m-0 !py-1 !px-3 !text-xs"
            @click="confirmSelection(selectedIcon)"
          >
            تأكيد الاختيار
          </button>
        </div>

        <!-- Icons Grid -->
        <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-[360px] overflow-y-auto p-1 border border-[#E2EBF0] rounded-xl bg-[#FAFCFD]">
          <button
            v-for="icon in filteredIcons"
            :key="icon.class"
            type="button"
            class="flex flex-col items-center justify-center p-3 rounded-xl border transition-all text-center group cursor-pointer aspect-square"
            :class="selectedIcon === icon.class ? 'border-[#2AA9E3] bg-[#2AA9E3]/15 text-[#0F6F9E] font-bold shadow-sm' : 'border-transparent bg-white hover:border-[#C7D8E1] hover:bg-gray-50 text-[#1F2A30]'"
            :title="icon.name"
            @click="selectedIcon = icon.class"
          >
            <i :class="[icon.class, 'text-xl mb-1.5 transition-transform group-hover:scale-125']"></i>
            <span class="text-[9px] text-[#44505A] truncate w-full text-center leading-tight">
              {{ icon.name }}
            </span>
          </button>
        </div>

        <div v-if="filteredIcons.length === 0" class="py-12 text-center text-[#44505A]">
          <i class="pi pi-search text-2xl text-[#C7D8E1] mb-2"></i>
          <p class="text-xs">لم نجد أيقونة تطابق بحثك "{{ searchQuery }}". جرب كلمات مثل: building, home, cog, check...</p>
        </div>
      </div>

      <!-- TAB 2: Upload Custom Icon -->
      <div v-else class="space-y-4 py-4">
        <div class="border-2 border-dashed border-[#C7D8E1] hover:border-[#2AA9E3] rounded-2xl p-8 text-center  transition-colors cursor-pointer relative">
          <input
            type="file"
            accept="image/svg+xml,image/png,image/webp,image/jpeg"
            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            @change="handleFileUpload"
          />
          <div class="space-y-2">
            <div class="w-14 h-14 mx-auto rounded-2xl bg-white border border-[#C7D8E1] flex items-center justify-center text-[#2AA9E3] text-2xl shadow-sm">
              <i class="pi pi-cloud-upload"></i>
            </div>
            <h4 class="font-bold text-sm text-[#1F2A30]">انقر لاختيار ملف الأيقونة أو اسحبه هنا</h4>
            <p class="text-xs text-[#44505A]">يدعم ملفات SVG الموجهة، أو صور PNG شفافة مربعة (الحجم المفضل 64x64 أو 128x128)</p>
          </div>
        </div>

        <!-- Custom Uploaded Preview -->
        <div v-if="uploadedPreview" class="p-4 rounded-xl border border-[#C7D8E1] bg-white flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl  border border-[#C7D8E1] flex items-center justify-center overflow-hidden p-1.5">
              <img :src="uploadedPreview" alt="معاينة الأيقونة" class="w-full h-full object-contain" />
            </div>
            <div>
              <span class="text-xs font-bold text-[#1F2A30] block">تم تجهيز الأيقونة المخصصة</span>
              <span class="text-[10px] text-emerald-600 font-semibold">جاهزة للتطبيق</span>
            </div>
          </div>
          <button
            type="button"
            class="main-btn sm !m-0"
            @click="confirmSelection(uploadedPreview)"
          >
            استخدام هذه الأيقونة
          </button>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center justify-between w-full pt-2">
        <span class="text-xs text-[#44505A]">
          {{ activeTab === 'icons' ? `عدد الأيقونات المطابقة: ${filteredIcons.length}` : 'رفع وتخصيص أيقونات المعمارية' }}
        </span>
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="px-4 py-2 text-xs font-semibold rounded-lg border border-[#C7D8E1] hover:bg-gray-100"
            @click="emit('update:visible', false)"
          >
            إلغاء
          </button>
          <button
            v-if="selectedIcon && activeTab === 'icons'"
            type="button"
            class="main-btn sm !m-0"
            @click="confirmSelection(selectedIcon)"
          >
            تطبيق الأيقونة
          </button>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import Dialog from "primevue/dialog";

const props = withDefaults(
  defineProps<{
    visible: boolean;
    modelValue?: string;
    dialogTitle?: string;
  }>(),
  {
    visible: false,
    modelValue: "pi pi-briefcase",
    dialogTitle: "اختيار أيقونة الخدمة أو رفع أيقونة مخصصة",
  }
);

const emit = defineEmits<{
  (e: "update:visible", val: boolean): void;
  (e: "update:modelValue", val: string): void;
  (e: "select", val: string): void;
}>();

const activeTab = ref<"icons" | "upload">("icons");
const searchQuery = ref("");
const selectedCategory = ref("all");
const selectedIcon = ref(props.modelValue || "pi pi-briefcase");
const uploadedPreview = ref("");

watch(
  () => props.modelValue,
  (val) => {
    if (val) selectedIcon.value = val;
  }
);

const categories = [
  { id: "all", label: "الكل" },
  { id: "construction", label: "بناء ومقاولات" },
  { id: "business", label: "أعمال وتجارة" },
  { id: "interface", label: "واجهة وتصميم" },
  { id: "arrows", label: "أسهم وحركة" },
  { id: "communication", label: "تواصل" },
];

const allIcons = [
  // Construction & Architecture
  { name: "building", class: "pi pi-building", category: "construction" },
  { name: "home", class: "pi pi-home", category: "construction" },
  { name: "warehouse", class: "pi pi-warehouse", category: "construction" },
  { name: "hammer / tool", class: "pi pi-wrench", category: "construction" },
  { name: "cog / settings", class: "pi pi-cog", category: "construction" },
  { name: "map-marker", class: "pi pi-map-marker", category: "construction" },
  { name: "compass", class: "pi pi-compass", category: "construction" },
  { name: "shield", class: "pi pi-shield", category: "construction" },
  { name: "truck", class: "pi pi-truck", category: "construction" },
  { name: "box", class: "pi pi-box", category: "construction" },
  { name: "palette / design", class: "pi pi-palette", category: "construction" },
  { name: "objects-column", class: "pi pi-objects-column", category: "construction" },

  // Business & Corporate
  { name: "briefcase", class: "pi pi-briefcase", category: "business" },
  { name: "chart-line", class: "pi pi-chart-line", category: "business" },
  { name: "chart-bar", class: "pi pi-chart-bar", category: "business" },
  { name: "chart-pie", class: "pi pi-chart-pie", category: "business" },
  { name: "dollar / finance", class: "pi pi-dollar", category: "business" },
  { name: "wallet", class: "pi pi-wallet", category: "business" },
  { name: "verified / check", class: "pi pi-verified", category: "business" },
  { name: "star", class: "pi pi-star", category: "business" },
  { name: "star-fill", class: "pi pi-star-fill", category: "business" },
  { name: "users", class: "pi pi-users", category: "business" },
  { name: "user", class: "pi pi-user", category: "business" },
  { name: "id-card", class: "pi pi-id-card", category: "business" },
  { name: "file", class: "pi pi-file", category: "business" },
  { name: "file-edit", class: "pi pi-file-edit", category: "business" },
  { name: "file-check", class: "pi pi-file-check", category: "business" },
  { name: "book", class: "pi pi-book", category: "business" },
  { name: "calculator", class: "pi pi-calculator", category: "business" },

  // Interface & Essentials
  { name: "check", class: "pi pi-check", category: "interface" },
  { name: "check-circle", class: "pi pi-check-circle", category: "interface" },
  { name: "check-square", class: "pi pi-check-square", category: "interface" },
  { name: "times", class: "pi pi-times", category: "interface" },
  { name: "times-circle", class: "pi pi-times-circle", category: "interface" },
  { name: "info-circle", class: "pi pi-info-circle", category: "interface" },
  { name: "exclamation-triangle", class: "pi pi-exclamation-triangle", category: "interface" },
  { name: "search", class: "pi pi-search", category: "interface" },
  { name: "search-plus", class: "pi pi-search-plus", category: "interface" },
  { name: "search-minus", class: "pi pi-search-minus", category: "interface" },
  { name: "filter", class: "pi pi-filter", category: "interface" },
  { name: "th-large", class: "pi pi-th-large", category: "interface" },
  { name: "list", class: "pi pi-list", category: "interface" },
  { name: "table", class: "pi pi-table", category: "interface" },
  { name: "calendar", class: "pi pi-calendar", category: "interface" },
  { name: "clock", class: "pi pi-clock", category: "interface" },
  { name: "eye", class: "pi pi-eye", category: "interface" },
  { name: "eye-slash", class: "pi pi-eye-slash", category: "interface" },
  { name: "lock", class: "pi pi-lock", category: "interface" },
  { name: "lock-open", class: "pi pi-lock-open", category: "interface" },
  { name: "key", class: "pi pi-key", category: "interface" },
  { name: "trash", class: "pi pi-trash", category: "interface" },
  { name: "pencil", class: "pi pi-pencil", category: "interface" },
  { name: "plus", class: "pi pi-plus", category: "interface" },
  { name: "plus-circle", class: "pi pi-plus-circle", category: "interface" },
  { name: "minus", class: "pi pi-minus", category: "interface" },
  { name: "images", class: "pi pi-images", category: "interface" },
  { name: "image", class: "pi pi-image", category: "interface" },
  { name: "camera", class: "pi pi-camera", category: "interface" },
  { name: "video", class: "pi pi-video", category: "interface" },
  { name: "sliders-h", class: "pi pi-sliders-h", category: "interface" },
  { name: "sliders-v", class: "pi pi-sliders-v", category: "interface" },
  { name: "sync", class: "pi pi-sync", category: "interface" },
  { name: "refresh", class: "pi pi-refresh", category: "interface" },
  { name: "spinner", class: "pi pi-spin pi-spinner", category: "interface" },
  { name: "bookmark", class: "pi pi-bookmark", category: "interface" },
  { name: "flag", class: "pi pi-flag", category: "interface" },
  { name: "tag", class: "pi pi-tag", category: "interface" },
  { name: "tags", class: "pi pi-tags", category: "interface" },
  { name: "sparkles", class: "pi pi-sparkles", category: "interface" },
  { name: "sun", class: "pi pi-sun", category: "interface" },
  { name: "moon", class: "pi pi-moon", category: "interface" },

  // Arrows & Navigation
  { name: "arrow-up", class: "pi pi-arrow-up", category: "arrows" },
  { name: "arrow-down", class: "pi pi-arrow-down", category: "arrows" },
  { name: "arrow-left", class: "pi pi-arrow-left", category: "arrows" },
  { name: "arrow-right", class: "pi pi-arrow-right", category: "arrows" },
  { name: "arrow-up-right", class: "pi pi-arrow-up-right", category: "arrows" },
  { name: "arrow-up-left", class: "pi pi-arrow-up-left", category: "arrows" },
  { name: "arrow-down-right", class: "pi pi-arrow-down-right", category: "arrows" },
  { name: "arrow-down-left", class: "pi pi-arrow-down-left", category: "arrows" },
  { name: "angle-left", class: "pi pi-angle-left", category: "arrows" },
  { name: "angle-right", class: "pi pi-angle-right", category: "arrows" },
  { name: "angle-up", class: "pi pi-angle-up", category: "arrows" },
  { name: "angle-down", class: "pi pi-angle-down", category: "arrows" },
  { name: "external-link", class: "pi pi-external-link", category: "arrows" },
  { name: "directions", class: "pi pi-directions", category: "arrows" },

  // Communication & Media
  { name: "phone", class: "pi pi-phone", category: "communication" },
  { name: "envelope", class: "pi pi-envelope", category: "communication" },
  { name: "send", class: "pi pi-send", category: "communication" },
  { name: "inbox", class: "pi pi-inbox", category: "communication" },
  { name: "comments", class: "pi pi-comments", category: "communication" },
  { name: "comment", class: "pi pi-comment", category: "communication" },
  { name: "globe", class: "pi pi-globe", category: "communication" },
  { name: "bell", class: "pi pi-bell", category: "communication" },
  { name: "share-alt", class: "pi pi-share-alt", category: "communication" },
  { name: "link", class: "pi pi-link", category: "communication" },
  { name: "whatsapp", class: "pi pi-whatsapp", category: "communication" },
  { name: "twitter", class: "pi pi-twitter", category: "communication" },
  { name: "linkedin", class: "pi pi-linkedin", category: "communication" },
  { name: "instagram", class: "pi pi-instagram", category: "communication" },
  { name: "facebook", class: "pi pi-facebook", category: "communication" },
  { name: "cloud", class: "pi pi-cloud", category: "communication" },
  { name: "cloud-upload", class: "pi pi-cloud-upload", category: "communication" },
  { name: "cloud-download", class: "pi pi-cloud-download", category: "communication" },
];

const filteredIcons = computed(() => {
  return allIcons.filter((icon) => {
    const matchesCategory =
      selectedCategory.value === "all" || icon.category === selectedCategory.value;
    const query = searchQuery.value.trim().toLowerCase();
    const matchesSearch =
      !query ||
      icon.name.toLowerCase().includes(query) ||
      icon.class.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });
});

const confirmSelection = (value: string) => {
  emit("update:modelValue", value);
  emit("select", value);
  emit("update:visible", false);
};

const handleFileUpload = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    uploadedPreview.value = event.target?.result as string;
  };
  reader.readAsDataURL(file);
};
</script>
