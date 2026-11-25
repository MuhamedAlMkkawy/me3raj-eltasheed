<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-xl font-bold font-heading text-[#1F2A30]">مكتبة الوسائط (Google Drive)</h2>
        <p class="text-xs text-[#44505A]">
          المجلد السحابي: <code class="text-[#0F6F9E]">1nv5sBNxbN-jg7-qXPqRdjBAMMkx5_Tqz</code>
        </p>
      </div>

      <label class="main-btn sm cursor-pointer !m-0">
        <i class="pi pi-upload"></i>
        <span>رفع ملفات جديدة</span>
        <input
          type="file"
          multiple
          accept="image/*,application/pdf"
          class="hidden"
          @change="handleUpload"
        />
      </label>
    </div>

    <!-- Media Grid -->
    <div class="bg-white rounded-xl border border-[#C7D8E1] p-6 shadow-sm">
      <div v-if="loading" class="py-16 text-center text-[#44505A]">
        <i class="pi pi-spin pi-spinner text-3xl text-[#2AA9E3] mb-2"></i>
        <p class="text-sm">جاري جلب الملفات من Google Drive...</p>
      </div>

      <div v-else-if="mediaItems.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <div
          v-for="item in mediaItems"
          :key="item.id"
          class="group relative border border-[#C7D8E1] rounded-xl overflow-hidden bg-gray-50 aspect-square flex flex-col justify-between hover:shadow-md transition-all hover:border-[#2AA9E3]"
        >
          <img
            :src="item.thumbnailLink || item.webViewLink"
            :alt="item.name"
            class="w-full h-full object-cover"
            loading="lazy"
          />

          <!-- Overlay with actions -->
          <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2.5 text-white">
            <span class="text-xs font-medium truncate" :title="item.name">{{ item.name }}</span>

            <div class="flex items-center justify-between">
              <span class="text-[10px] text-gray-300">{{ formatFileSize(item.size) }}</span>
              <div class="flex items-center gap-1.5">
                <button
                  type="button"
                  class="p-1.5 rounded bg-white/20 hover:bg-white text-white hover:text-[#1F2A30] transition-colors text-xs"
                  title="نسخ الرابط"
                  @click="copyUrl(item.thumbnailLink || item.webViewLink || '')"
                >
                  <i class="pi pi-copy"></i>
                </button>
                <button
                  type="button"
                  class="p-1.5 rounded bg-red-500/80 hover:bg-red-600 text-white transition-colors text-xs"
                  title="حذف"
                  @click="confirmDelete(item)"
                >
                  <i class="pi pi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="py-16 text-center text-[#44505A]">
        <i class="pi pi-images text-4xl text-[#C7D8E1] mb-2"></i>
        <p class="text-sm">لا توجد ملفات مرفوعة حالياً. ابدأ برفع صور لمشاريع وخدمات الشركة.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useApiMethods } from "~/composables/useApiMethods";
import { API_ENDPOINTS } from "~/config/endpoints";
import { useFormatters } from "~/composables/useFormatters";
import { useConfirmAction } from "~/composables/useConfirmAction";
import type { MediaItem } from "~/types";

definePageMeta({
  layout: "admin",
});

const { getMethod, submitMethod, showSuccessToast, loading } = useApiMethods();
const { formatFileSize } = useFormatters();
const { requireConfirmation } = useConfirmAction();

const mediaItems = ref<MediaItem[]>([]);

const loadMedia = async () => {
  const res = await getMethod(API_ENDPOINTS.ADMIN.MEDIA, {}, true);
  if (res?.data) {
    mediaItems.value = res.data;
  }
};

const handleUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) return;

  const formData = new FormData();
  Array.from(input.files).forEach((file) => {
    formData.append("files", file);
  });

  const res = await submitMethod(API_ENDPOINTS.ADMIN.MEDIA_UPLOAD, true, formData, "POST");
  if (res?.data) {
    await loadMedia();
  }
  input.value = "";
};

const copyUrl = (url: string) => {
  if (!url) return;
  navigator.clipboard.writeText(url);
  showSuccessToast("تم نسخ الرابط للحافظة بنجاح");
};

const confirmDelete = (item: MediaItem) => {
  requireConfirmation({
    header: "حذف الملف",
    message: `هل أنت متأكد من حذف الملف "${item.name}"؟`,
    onAccept: async () => {
      await submitMethod(API_ENDPOINTS.ADMIN.MEDIA_ITEM(item.id), true, {}, "DELETE");
      await loadMedia();
    },
  });
};

onMounted(() => {
  loadMedia();
});
</script>
