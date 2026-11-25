<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold font-heading text-[#1F2A30]">بيانات الشركة الرسمية</h2>
        <p class="text-xs text-[#44505A]">تحكم في معلومات الاتصال، السجل التجاري، الرقم الضريبي، وعناوين الفروع.</p>
      </div>
      <MainButton
        label="حفظ التغييرات"
        :loading="loading"
        @click="saveCompany"
      />
    </div>

    <div class="bg-white rounded-xl border border-[#C7D8E1] p-6 shadow-sm space-y-6" v-if="form">
      <!-- Basic Names -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormCustomField
          name="nameAr"
          label="اسم الشركة بالعربية"
          v-model="form.nameAr"
          required
        />
        <FormCustomField
          name="nameEn"
          label="اسم الشركة بالإنجليزية"
          v-model="form.nameEn"
          required
        />
      </div>

      <FormCustomField
        name="tagline"
        label="الشعار اللفظي (Slogan)"
        v-model="form.tagline"
      />

      <FormCustomField
        name="description"
        label="الوصف التعريفي للشركة"
        as="textarea"
        v-model="form.description"
        :rows="3"
      />

      <!-- Vision & Mission -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormCustomField
          name="vision"
          label="رؤية الشركة"
          as="textarea"
          v-model="form.vision"
          :rows="3"
        />
        <FormCustomField
          name="mission"
          label="رسالة الشركة"
          as="textarea"
          v-model="form.mission"
          :rows="3"
        />
      </div>

      <!-- Contact Information -->
      <div class="border-t border-[#C7D8E1] pt-6 space-y-4">
        <h3 class="text-sm font-bold font-heading text-[#1F2A30]">أرقام التواصل والعناوين</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <FormCustomField
            name="phone"
            label="رقم الهاتف الأساسي"
            v-model="form.phone"
          />
          <FormCustomField
            name="whatsapp"
            label="رقم الواتساب"
            v-model="form.whatsapp"
          />
          <FormCustomField
            name="email"
            label="البريد الإلكتروني الرسمي"
            type="email"
            v-model="form.email"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <FormCustomField
            name="city"
            label="المدينة"
            v-model="form.city"
          />
          <FormCustomField
            name="country"
            label="الدولة"
            v-model="form.country"
          />
          <FormCustomField
            name="workingHours"
            label="أوقات العمل"
            v-model="form.workingHours"
          />
        </div>

        <FormCustomField
          name="address"
          label="العنوان التفصيلي"
          v-model="form.address"
        />
      </div>

      <!-- Legal Registrations -->
      <div class="border-t border-[#C7D8E1] pt-6 space-y-4">
        <h3 class="text-sm font-bold font-heading text-[#1F2A30]">البيانات القانونية والاعتماد</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormCustomField
            name="crNumber"
            label="رقم السجل التجاري (CR)"
            v-model="form.crNumber"
          />
          <FormCustomField
            name="vatNumber"
            label="الرقم الضريبي (VAT)"
            v-model="form.vatNumber"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useApiMethods } from "~/composables/useApiMethods";
import { API_ENDPOINTS } from "~/config/endpoints";
import type { CompanyInfo } from "~/types";

definePageMeta({
  layout: "admin",
});

const { getMethod, submitMethod, loading } = useApiMethods();
const form = ref<CompanyInfo | null>(null);

const loadData = async () => {
  const res = await getMethod(API_ENDPOINTS.ADMIN.COMPANY_INFO, {}, true);
  if (res?.data) {
    form.value = res.data;
  }
};

const saveCompany = async () => {
  if (!form.value) return;
  await submitMethod(API_ENDPOINTS.ADMIN.COMPANY_INFO, true, form.value, "PUT");
};

onMounted(() => {
  loadData();
});
</script>
