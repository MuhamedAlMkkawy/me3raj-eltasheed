<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <NuxtLink to="/admin/projects" class="p-2 rounded-lg border border-[#C7D8E1] hover:bg-white text-[#44505A]">
          <i class="pi pi-arrow-right"></i>
        </NuxtLink>
        <div>
          <h2 class="text-xl font-bold font-heading text-[#1F2A30]">
            {{ isNew ? 'إضافة مشروع جديد' : `تعديل مشروع: ${form.title}` }}
          </h2>
          <p class="text-xs text-[#44505A]">أدخل المواصفات الهندسية، الصور، وتفاصيل الإنجاز.</p>
        </div>
      </div>
      <MainButton
        label="حفظ المشروع"
        :loading="loading"
        @click="saveProject"
      />
    </div>

    <!-- Form Container -->
    <div class="bg-white rounded-xl border border-[#C7D8E1] p-6 shadow-sm space-y-6">
      <!-- Title & Slug -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormCustomField
          name="title"
          label="عنوان المشروع"
          v-model="form.title"
          placeholder="مثال: مجمع واحة الأعمال التجاري"
          required
        />
        <FormCustomField
          name="slug"
          label="الاسم اللطيف (Slug للرابط)"
          v-model="form.slug"
          placeholder="oasis-business-complex"
          required
        />
      </div>

      <!-- Category & Client -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <FormCustomField
          name="category"
          label="التصنيف"
          v-model="form.category"
          placeholder="تجاري وإداري"
          required
        />
        <FormCustomField
          name="client"
          label="العميل / المطور"
          v-model="form.client"
        />
        <FormCustomField
          name="location"
          label="الموقع"
          v-model="form.location"
          placeholder="الرياض - حي النرجس"
        />
        <FormCustomField
          name="year"
          label="سنة التنفيذ"
          v-model="form.year"
          placeholder="2025"
        />
      </div>

      <!-- Specs: Area, Cost, Duration, Status -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <FormCustomField
          name="area"
          label="المساحة الإجمالية"
          v-model="form.area"
          placeholder="18,500 م²"
        />
        <FormCustomField
          name="cost"
          label="قيمة المشروع"
          v-model="form.cost"
          placeholder="34,000,000 ر.س"
        />
        <FormCustomField
          name="duration"
          label="مدة التنفيذ"
          v-model="form.duration"
          placeholder="18 شهر"
        />
        <div class="flex flex-col gap-1">
          <label class="font-medium text-sm text-[#1F2A30]">حالة المشروع</label>
          <select
            v-model="form.status"
            class="w-full px-3 py-2 border rounded-lg text-sm border-[#C7D8E1] bg-white"
          >
            <option value="completed">مكتمل</option>
            <option value="in_progress">قيد التنفيذ</option>
            <option value="planned">مستقبلي مخطط</option>
          </select>
        </div>
      </div>

      <!-- Featured Toggle -->
      <div class="flex items-center gap-3 p-3 bg-[#F5F9FB] rounded-lg border border-[#C7D8E1]">
        <input
          type="checkbox"
          id="featuredCheckbox"
          v-model="form.featured"
          class="w-4 h-4 text-[#2AA9E3] rounded"
        />
        <label for="featuredCheckbox" class="text-xs font-semibold text-[#1F2A30] cursor-pointer">
          عرض كمشروع مميز في الصفحة الرئيسية
        </label>
      </div>

      <!-- Cover Image (with Media Picker) -->
      <div>
        <label class="font-medium text-sm text-[#1F2A30] block mb-1">صورة الغلاف الرئيسية</label>
        <div class="flex items-center gap-3">
          <input
            type="text"
            v-model="form.coverImage"
            class="w-full px-3 py-2 border rounded-lg text-xs border-[#C7D8E1]"
            placeholder="رابط الصورة أو اختر من Drive"
          />
          <button
            type="button"
            class="px-3 py-2 bg-[#F5F9FB] border border-[#C7D8E1] rounded-lg text-xs font-semibold hover:border-[#2AA9E3] whitespace-nowrap"
            @click="showMediaPicker = true"
          >
            <i class="pi pi-images text-[#0F6F9E] ml-1"></i>
            اختيار من Google Drive
          </button>
        </div>
        <div v-if="form.coverImage" class="mt-2 w-48 h-28 rounded-lg overflow-hidden border border-[#C7D8E1]">
          <img :src="form.coverImage" alt="معاينة" class="w-full h-full object-cover" />
        </div>
      </div>

      <!-- Descriptions -->
      <FormCustomField
        name="description"
        label="نبذة سريعة عن المشروع"
        as="textarea"
        v-model="form.description"
        :rows="2"
      />

      <FormCustomField
        name="fullDescription"
        label="الوصف الإنشائي والتفصيلي الكامل"
        as="textarea"
        v-model="form.fullDescription"
        :rows="4"
      />

      <!-- Challenge & Solution -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormCustomField
          name="challenge"
          label="التحديات الهندسية الميدانية"
          as="textarea"
          v-model="form.challenge"
          :rows="3"
        />
        <FormCustomField
          name="solution"
          label="الحلول الإنشائية والتقنية المنفذة"
          as="textarea"
          v-model="form.solution"
          :rows="3"
        />
      </div>
    </div>

    <!-- Media Picker Modal -->
    <AdminMediaPickerModal
      :visible="showMediaPicker"
      @update:visible="showMediaPicker = $event"
      @select="form.coverImage = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useApiMethods } from "~/composables/useApiMethods";
import { API_ENDPOINTS } from "~/config/endpoints";
import type { Project } from "~/types";

definePageMeta({
  layout: "admin",
});

const route = useRoute();
const router = useRouter();
const localeRoute = useLocaleRoute();
const { getMethod, submitMethod, loading } = useApiMethods();

const projectId = route.params.id as string;
const isNew = projectId === "new";

const form = ref<Partial<Project>>({
  title: "",
  slug: "",
  category: "تجاري وإداري",
  client: "",
  location: "الرياض",
  year: `${new Date().getFullYear()}`,
  area: "",
  cost: "",
  duration: "",
  description: "",
  fullDescription: "",
  coverImage: "",
  images: [],
  challenge: "",
  solution: "",
  status: "completed",
  featured: false,
  order: 1,
});

const showMediaPicker = ref(false);

const loadProject = async () => {
  if (isNew) return;
  const res = await getMethod(API_ENDPOINTS.ADMIN.PROJECT_ITEM(projectId), {}, true);
  if (res?.data) {
    form.value = res.data;
  }
};

const saveProject = async () => {
  if (!form.value.title) return;
  const endpoint = isNew ? API_ENDPOINTS.ADMIN.PROJECTS : API_ENDPOINTS.ADMIN.PROJECT_ITEM(projectId);
  const method = isNew ? "POST" : "PUT";

  const res = await submitMethod(endpoint, true, form.value, method);
  if (res?.data) {
    router.push(localeRoute("/admin/projects"));
  }
};

onMounted(() => {
  loadProject();
});
</script>
