<template>
  <Dialog
    :visible="visible"
    modal
    header="اختيار صورة من مكتبة الوسائط (Google Drive)"
    :style="{ width: '850px', maxWidth: '95vw' }"
    @update:visible="emit('update:visible', $event)"
  >
    <div class="space-y-4">
      <!-- Upload New File Bar -->
      <div class="flex items-center justify-between p-4 bg-[#F5F9FB] rounded-xl border border-[#C7D8E1]">
        <div>
          <h4 class="text-sm font-bold text-[#1F2A30]">رفع وسائط جديدة</h4>
          <p class="text-xs text-[#44505A]">يتم حفظ الملفات مباشرة في مجلد Google Drive المخصص للمشروع.</p>
        </div>
        <label class="main-btn sm cursor-pointer !m-0">
          <i class="pi pi-upload"></i>
          <span>رفع ملفات</span>
          <input
            type="file"
            multiple
            accept="image/*,application/pdf"
            class="hidden"
            @change="handleFileUpload"
          />
        </label>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="py-12 text-center text-[#44505A]">
        <i class="pi pi-spin pi-spinner text-3xl text-[#2AA9E3] mb-2"></i>
        <p class="text-sm">جاري تحميل الملفات من Google Drive...</p>
      </div>

      <!-- Media Grid -->
      <div v-else-if="mediaItems.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[420px] overflow-y-auto p-1">
        <div
          v-for="item in mediaItems"
          :key="item.id"
          class="group relative border rounded-xl overflow-hidden cursor-pointer transition-all hover:border-[#2AA9E3] hover:shadow-md aspect-square bg-gray-50 flex flex-col justify-between"
          :class="selectedUrl === (item.thumbnailLink || item.webViewLink) ? 'ring-2 ring-[#2AA9E3] border-[#2AA9E3]' : 'border-[#C7D8E1]'"
          @click="selectItem(item)"
        >
          <img
            :src="item.thumbnailLink || item.webViewLink"
            :alt="item.name"
            class="w-full h-full object-cover"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2 text-white text-[11px]">
            <span class="truncate font-medium">{{ item.name }}</span>
            <div class="flex items-center justify-between">
              <span>{{ formatFileSize(item.size) }}</span>
              <span class="bg-[#2AA9E3] text-[#1F2A30] font-bold px-2 py-0.5 rounded text-[10px]">اختيار</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="py-10 text-center text-[#44505A]">
        <i class="pi pi-images text-4xl text-[#C7D8E1] mb-2"></i>
        <p class="text-sm">لا توجد وسائط بعد في Google Drive. ارفع أول صورة الآن!</p>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center justify-between w-full pt-2">
        <span class="text-xs text-[#44505A]">إجمالي الملفات: {{ mediaItems.length }}</span>
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="px-4 py-2 text-xs font-semibold rounded-lg border border-[#C7D8E1] hover:bg-gray-100"
            @click="emit('update:visible', false)"
          >
            إلغاء
          </button>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import Dialog from "primevue/dialog";
import { useApiMethods } from "~/composables/useApiMethods";
import { API_ENDPOINTS } from "~/config/endpoints";
import { useFormatters } from "~/composables/useFormatters";
import type { MediaItem } from "~/types";

const props = defineProps<{
  visible: boolean;
}>();

const emit = defineEmits<{
  (e: "update:visible", val: boolean): void;
  (e: "select", url: string): void;
}>();

const { getMethod, submitMethod } = useApiMethods();
const { formatFileSize } = useFormatters();

const mediaItems = ref<MediaItem[]>([]);
const loading = ref(false);
const selectedUrl = ref("");

const fetchMedia = async () => {
  loading.value = true;
  const res = await getMethod(API_ENDPOINTS.ADMIN.MEDIA, {}, true);
  if (res?.data) {
    mediaItems.value = res.data;
  }
  loading.value = false;
};

watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      fetchMedia();
    }
  }
);

onMounted(() => {
  if (props.visible) {
    fetchMedia();
  }
});

const selectItem = (item: MediaItem) => {
  const url = item.thumbnailLink || item.webViewLink || item.downloadUrl || '';
  selectedUrl.value = url;
  emit("select", url);
  emit("update:visible", false);
};

const handleFileUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) return;

  const formData = new FormData();
  Array.from(input.files).forEach((file) => {
    formData.append("files", file);
  });

  const res = await submitMethod(API_ENDPOINTS.ADMIN.MEDIA_UPLOAD, true, formData, "POST");
  if (res?.data) {
    await fetchMedia();
  }
  input.value = "";
};
</script>
