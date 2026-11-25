<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <NuxtLink to="/admin/services" class="p-2 rounded-lg border border-[#C7D8E1] hover:bg-white text-[#44505A]">
          <i class="pi pi-arrow-right"></i>
        </NuxtLink>
        <div>
          <h2 class="text-xl font-bold font-heading text-[#1F2A30]">
            {{ isNew ? 'إضافة خدمة جديدة' : `تعديل خدمة: ${form.title}` }}
          </h2>
          <p class="text-xs text-[#44505A]">حدد اسم الخدمة، الأيقونة، والميزات المعمارية.</p>
        </div>
      </div>
      <MainButton
        label="حفظ الخدمة"
        :loading="loading"
        @click="saveService"
      />
    </div>

    <div class="bg-white rounded-xl border border-[#C7D8E1] p-6 shadow-sm space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormCustomField
          name="title"
          label="عنوان الخدمة"
          v-model="form.title"
          placeholder="مثال: المقاولات الإنشائية والمباني"
          required
        />
        <FormCustomField
          name="slug"
          label="الاسم اللطيف (Slug)"
          v-model="form.slug"
          placeholder="general-construction"
          required
        />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <!-- Interactive Icon Picker Field -->
        <div class="flex flex-col gap-1">
          <label class="font-medium text-sm text-[#1F2A30]">أيقونة الخدمة</label>
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 rounded-lg border border-[#C7D8E1]  flex items-center justify-center text-lg text-[#0F6F9E] shrink-0 shadow-sm overflow-hidden p-1">
              <img v-if="form.icon && (form.icon.startsWith('data:') || form.icon.startsWith('http'))" :src="form.icon" class="w-full h-full object-contain" />
              <i v-else :class="form.icon || 'pi pi-briefcase'"></i>
            </div>
            <input
              type="text"
              v-model="form.icon"
              class="w-full px-3 py-2 border rounded-lg text-xs border-[#C7D8E1] font-mono"
              placeholder="pi pi-building أو اختر من المكتبة"
            />
            <button
              type="button"
              class="px-3 py-2 bg-[#2AA9E3] text-[#1F2A30] font-bold rounded-lg text-xs hover:bg-[#1e92c7] transition-colors whitespace-nowrap shadow-sm flex items-center gap-1.5"
              @click="showIconPicker = true"
            >
              <i class="pi pi-th-large text-xs"></i>
              <span>اختيار / رفع أيقونة</span>
            </button>
          </div>
        </div>

        <FormCustomField
          name="order"
          label="الترتيب في العرض"
          type="number"
          v-model="form.order"
        />
        <div class="flex items-center gap-3 pt-6">
          <input
            type="checkbox"
            id="serviceActive"
            v-model="form.active"
            class="w-4 h-4 text-[#2AA9E3] rounded"
          />
          <label for="serviceActive" class="text-xs font-semibold text-[#1F2A30]">
            الخدمة نشطة وظاهرة بالموقع
          </label>
        </div>
      </div>

      <!-- Cover Image -->
      <div>
        <label class="font-medium text-sm text-[#1F2A30] block mb-1">صورة الغلاف للخدمة</label>
        <div class="flex items-center gap-3">
          <input
            type="text"
            v-model="form.coverImage"
            class="w-full px-3 py-2 border rounded-lg text-xs border-[#C7D8E1]"
            placeholder="رابط الصورة أو اختر من المكتبة"
          />
          <button
            type="button"
            class="px-3 py-2  border border-[#C7D8E1] rounded-lg text-xs font-semibold hover:border-[#2AA9E3] whitespace-nowrap"
            @click="showMediaPicker = true"
          >
            <i class="pi pi-images text-[#0F6F9E] ml-1"></i>
            اختيار من مكتبة الوسائط
          </button>
        </div>
        <div v-if="form.coverImage" class="mt-2 w-48 h-28 rounded-lg overflow-hidden border border-[#C7D8E1]">
          <img :src="form.coverImage" alt="معاينة" class="w-full h-full object-cover" />
        </div>
      </div>

      <FormCustomField
        name="shortDescription"
        label="وصف موجز (يظهر في بطاقات الخدمات)"
        as="textarea"
        v-model="form.shortDescription"
        :rows="2"
      />

      <FormCustomField
        name="fullDescription"
        label="الشرح التفصيلي للخدمة"
        as="textarea"
        v-model="form.fullDescription"
        :rows="4"
      />
    </div>

    <!-- Media Picker Modal -->
    <AdminMediaPickerModal
      :visible="showMediaPicker"
      @update:visible="showMediaPicker = $event"
      @select="form.coverImage = $event"
    />

    <!-- Icon Picker Modal -->
    <AdminIconPickerModal
      v-model:visible="showIconPicker"
      v-model="form.icon"
      @select="form.icon = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useApiMethods } from "~/composables/useApiMethods";
import { API_ENDPOINTS } from "~/config/endpoints";
import type { Service } from "~/types";

definePageMeta({
  layout: "admin",
  key: (r) => r.fullPath,
});

const route = useRoute();
const router = useRouter();
const localeRoute = useLocaleRoute();
const { getMethod, submitMethod, loading } = useApiMethods();

const serviceId = route.params.id as string;
const isNew = serviceId === "new";

const form = ref<Partial<Service>>({
  title: "",
  slug: "",
  icon: "pi pi-briefcase",
  shortDescription: "",
  fullDescription: "",
  coverImage: "",
  features: [],
  order: 1,
  active: true,
});

const showMediaPicker = ref(false);
const showIconPicker = ref(false);

const loadService = async () => {
  if (isNew) return;
  const res = await getMethod(API_ENDPOINTS.ADMIN.SERVICE_ITEM(serviceId), {}, true);
  if (res?.data) {
    form.value = res.data;
  }
};

const saveService = async () => {
  if (!form.value.title) return;
  const endpoint = isNew ? API_ENDPOINTS.ADMIN.SERVICES : API_ENDPOINTS.ADMIN.SERVICE_ITEM(serviceId);
  const method = isNew ? "POST" : "PUT";

  const res = await submitMethod(endpoint, true, form.value, method);
  if (res?.data) {
    router.push(localeRoute("/admin/services"));
  }
};

onMounted(() => {
  loadService();
});
</script>
