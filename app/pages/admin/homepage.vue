<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold font-heading text-[#1F2A30]">إدارة محتوى الصفحة الرئيسية</h2>
        <p class="text-xs text-[#44505A]">تحكم في نصوص، صور، وإحصائيات وأقسام الموقع الرئيسية.</p>
      </div>
      <MainButton
        label="حفظ التغييرات"
        :loading="loading"
        @click="saveContent"
      />
    </div>

    <!-- Tabs Container -->
    <div class="bg-white rounded-xl border border-[#C7D8E1] p-6 shadow-sm space-y-8" v-if="form">
      <!-- 1. Hero Section -->
      <section class="space-y-4">
        <h3 class="text-base font-bold font-heading text-[#1F2A30] border-b pb-2 flex items-center gap-2">
          <i class="pi pi-desktop text-[#2AA9E3]"></i>
          <span>1. قسم البداية (Hero Section)</span>
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormCustomField
            name="heroBadge"
            label="شارة الترحيب (Badge)"
            v-model="form.heroBadge"
            placeholder="ريادة في المقاولات والبناء"
          />
          <FormCustomField
            name="heroHighlight"
            label="الكلمة المميزة في العنوان الرئيسي"
            v-model="form.heroHighlight"
            placeholder="بإتقان هندسي رفيع"
          />
        </div>
        <FormCustomField
          name="heroTitle"
          label="العنوان الرئيسي"
          v-model="form.heroTitle"
          placeholder="نبني مستقبلاً مستداماً"
        />
        <FormCustomField
          name="heroSubtitle"
          label="الوصف التمهيدي"
          as="textarea"
          v-model="form.heroSubtitle"
          :rows="3"
        />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormCustomField
            name="heroCtaText"
            label="نص زر الدعوة الرئيسي"
            v-model="form.heroCtaText"
          />
          <FormCustomField
            name="heroCtaLink"
            label="رابط زر الدعوة الرئيسي"
            v-model="form.heroCtaLink"
          />
        </div>
        <div>
          <label class="font-medium text-sm text-[#1F2A30] block mb-1">صورة خلفية Hero</label>
          <div class="flex items-center gap-3">
            <input
              type="text"
              v-model="form.heroBackgroundImage"
              class="w-full px-3 py-2 border rounded-lg text-xs border-[#C7D8E1]"
              placeholder="رابط الصورة أو اختر من المكتبة"
            />
            <button
              type="button"
              class="px-3 py-2  border border-[#C7D8E1] rounded-lg text-xs font-semibold hover:border-[#2AA9E3] whitespace-nowrap"
              @click="openMediaPicker('heroBackgroundImage')"
            >
              <i class="pi pi-images text-[#0F6F9E] ml-1"></i>
              اختيار من الوسائط
            </button>
          </div>
        </div>
      </section>

      <!-- 2. About Section -->
      <section class="space-y-4 pt-4 border-t border-[#C7D8E1]">
        <h3 class="text-base font-bold font-heading text-[#1F2A30] border-b pb-2 flex items-center gap-2">
          <i class="pi pi-info-circle text-[#2AA9E3]"></i>
          <span>2. قسم نبذة عن الشركة (About)</span>
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormCustomField
            name="aboutBadge"
            label="شارة القسم"
            v-model="form.aboutBadge"
          />
          <FormCustomField
            name="aboutYearsExperience"
            label="سنوات الخبرة"
            type="number"
            v-model="form.aboutYearsExperience"
          />
        </div>
        <FormCustomField
          name="aboutTitle"
          label="عنوان قسم من نحن"
          v-model="form.aboutTitle"
        />
        <FormCustomField
          name="aboutDescription"
          label="نص النبذة التعريفية"
          as="textarea"
          v-model="form.aboutDescription"
          :rows="4"
        />
      </section>

      <!-- 3. Statistics Section -->
      <section class="space-y-4 pt-4 border-t border-[#C7D8E1]">
        <h3 class="text-base font-bold font-heading text-[#1F2A30] border-b pb-2 flex items-center gap-2">
          <i class="pi pi-chart-bar text-[#2AA9E3]"></i>
          <span>3. إحصائيات وأرقام الشركة</span>
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="(st, idx) in form.stats"
            :key="st.id || idx"
            class="p-4  border border-[#C7D8E1] rounded-xl space-y-2"
          >
            <span class="text-xs font-bold text-[#0F6F9E]">الإحصائية {{ idx + 1 }}</span>
            <div class="flex gap-2">
              <input
                type="number"
                v-model="st.number"
                class="w-1/2 p-2 border rounded-lg text-sm bg-white border-[#C7D8E1]"
                placeholder="الرقم"
              />
              <input
                type="text"
                v-model="st.suffix"
                class="w-1/2 p-2 border rounded-lg text-sm bg-white border-[#C7D8E1]"
                placeholder="الرمز (+ / %)"
              />
            </div>
            <input
              type="text"
              v-model="st.label"
              class="w-full p-2 border rounded-lg text-sm bg-white border-[#C7D8E1]"
              placeholder="الوصف (مثال: مشروع منجز)"
            />
          </div>
        </div>
      </section>

      <!-- 4. Why Us Section -->
      <section class="space-y-4 pt-4 border-t border-[#C7D8E1]">
        <h3 class="text-base font-bold font-heading text-[#1F2A30] border-b pb-2 flex items-center gap-2">
          <i class="pi pi-shield text-[#2AA9E3]"></i>
          <span>4. لماذا تختارنا (Why Choose Us)</span>
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="(item, idx) in form.whyUs"
            :key="item.id || idx"
            class="p-4  border border-[#C7D8E1] rounded-xl space-y-2"
          >
            <span class="text-xs font-bold text-[#0F6F9E]">الميزة {{ idx + 1 }}</span>
            <input
              type="text"
              v-model="item.title"
              class="w-full p-2 border rounded-lg text-sm bg-white font-bold border-[#C7D8E1]"
              placeholder="عنوان الميزة"
            />
            <textarea
              v-model="item.description"
              class="w-full p-2 border rounded-lg text-xs bg-white border-[#C7D8E1]"
              rows="2"
              placeholder="شرح الميزة"
            ></textarea>
          </div>
        </div>
      </section>

      <!-- 5. Call To Action (CTA) Section -->
      <section class="space-y-4 pt-4 border-t border-[#C7D8E1]">
        <h3 class="text-base font-bold font-heading text-[#1F2A30] border-b pb-2 flex items-center gap-2">
          <i class="pi pi-megaphone text-[#2AA9E3]"></i>
          <span>5. قسم الدعوة للعمل (CTA)</span>
        </h3>
        <FormCustomField
          name="ctaTitle"
          label="عنوان الدعوة"
          v-model="form.ctaTitle"
        />
        <FormCustomField
          name="ctaSubtitle"
          label="الوصف التمهيدي"
          v-model="form.ctaSubtitle"
        />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormCustomField
            name="ctaButtonText"
            label="نص الزر"
            v-model="form.ctaButtonText"
          />
          <FormCustomField
            name="ctaButtonLink"
            label="رابط الزر"
            v-model="form.ctaButtonLink"
          />
        </div>
      </section>
    </div>

    <!-- Media Picker Modal -->
    <AdminMediaPickerModal
      :visible="showMediaPicker"
      @update:visible="showMediaPicker = $event"
      @select="handleMediaSelected"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useApiMethods } from "~/composables/useApiMethods";
import { API_ENDPOINTS } from "~/config/endpoints";
import type { HomepageContent } from "~/types";

definePageMeta({
  layout: "admin",
  key: (r) => r.fullPath,
});

const { getMethod, submitMethod, loading } = useApiMethods();

const form = ref<HomepageContent | null>(null);
const showMediaPicker = ref(false);
const activeMediaField = ref<string>("");

const loadData = async () => {
  const res = await getMethod(API_ENDPOINTS.ADMIN.HOMEPAGE, {}, true);
  if (res?.data) {
    form.value = res.data;
  }
};

const openMediaPicker = (field: string) => {
  activeMediaField.value = field;
  showMediaPicker.value = true;
};

const handleMediaSelected = (url: string) => {
  if (form.value && activeMediaField.value) {
    (form.value as any)[activeMediaField.value] = url;
  }
};

const saveContent = async () => {
  if (!form.value) return;
  await submitMethod(API_ENDPOINTS.ADMIN.HOMEPAGE, true, form.value, "PUT");
};

onMounted(() => {
  loadData();
});
</script>
