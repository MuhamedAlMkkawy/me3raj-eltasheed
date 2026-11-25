<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold font-heading text-[#1F2A30]">إعدادات النظام والتكامل السحابي</h2>
        <p class="text-xs text-[#44505A]">تحكم في الربط المباشر مع جداول البيانات، التخزين السحابي، وحالة الموقع.</p>
      </div>
      <MainButton
        label="حفظ الإعدادات"
        :loading="loading"
        @click="saveSettings"
      />
    </div>

    <!-- Integrations Status & Sync Testing -->
    <div class="bg-white rounded-xl border border-[#C7D8E1] p-6 shadow-sm space-y-6">
      <h3 class="text-base font-bold font-heading text-[#1F2A30] flex items-center gap-2 border-b pb-2">
        <i class="pi pi-cloud text-[#2AA9E3]"></i>
        <span>التكامل مع خدمات Google السحابية</span>
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Google Sheets Card -->
        <div class="p-5 rounded-xl border border-[#C7D8E1]  space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <i class="pi pi-table text-emerald-600 text-xl"></i>
              <h4 class="font-bold text-sm text-[#1F2A30]">Google Sheets Database</h4>
            </div>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">نشط</span>
          </div>

          <p class="text-xs text-[#44505A]">
            يتم تخزين ومزامنة بيانات المشاريع، الخدمات، ورسائل العملاء مع جدول البيانات المحدد:
          </p>

          <div class="p-2 rounded bg-white border border-[#C7D8E1] font-mono text-[11px] text-[#0F6F9E] break-all">
            Spreadsheet ID: 1tKA3MYCJeXTUjOI_SehSpJ1b4zpGNeLLnYE5adNnSE
          </div>

          <button
            type="button"
            class="px-3 py-1.5 rounded-lg border border-[#C7D8E1] bg-white text-xs font-semibold text-[#1F2A30] hover:bg-gray-50 flex items-center gap-2"
            @click="testSheets"
          >
            <i class="pi pi-sync text-[#0F6F9E]"></i>
            <span>فحص الاتصال والمزامنة الآن</span>
          </button>
        </div>

        <!-- Cloud Storage Card -->
        <div class="p-5 rounded-xl border border-[#C7D8E1]  space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <i class="pi pi-folder text-[#2AA9E3] text-xl"></i>
              <h4 class="font-bold text-sm text-[#1F2A30]">مستودع الوسائط السحابي</h4>
            </div>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">نشط</span>
          </div>

          <p class="text-xs text-[#44505A]">
            يتم حفظ جميع وسائط ومستندات وصور المشاريع في المجلد السحابي المخصص:
          </p>

          <div class="p-2 rounded bg-white border border-[#C7D8E1] font-mono text-[11px] text-[#0F6F9E] break-all">
            Folder ID: 1nv5sBNxbN-jg7-qXPqRdjBAMMkx5_Tqz
          </div>

          <button
            type="button"
            class="px-3 py-1.5 rounded-lg border border-[#C7D8E1] bg-white text-xs font-semibold text-[#1F2A30] hover:bg-gray-50 flex items-center gap-2"
            @click="testDrive"
          >
            <i class="pi pi-cloud-upload text-[#2AA9E3]"></i>
            <span>فحص الاتصال والوصول للمجلد</span>
          </button>
        </div>
      </div>
    </div>

    <!-- General Website Settings -->
    <div class="bg-white rounded-xl border border-[#C7D8E1] p-6 shadow-sm space-y-6" v-if="form">
      <h3 class="text-base font-bold font-heading text-[#1F2A30] flex items-center gap-2 border-b pb-2">
        <i class="pi pi-cog text-[#2AA9E3]"></i>
        <span>إعدادات النظام العامة</span>
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormCustomField
          name="siteName"
          label="اسم الموقع"
          v-model="form.siteName"
        />
        <FormCustomField
          name="contactEmail"
          label="بريد استقبال التنبيهات"
          type="email"
          v-model="form.contactEmail"
        />
      </div>

      <div class="space-y-3 pt-2">
        <div class="flex items-center gap-3 p-3  rounded-lg border border-[#C7D8E1]">
          <input
            type="checkbox"
            id="notifyMessages"
            v-model="form.notifyOnNewMessage"
            class="w-4 h-4 text-[#2AA9E3] rounded"
          />
          <label for="notifyMessages" class="text-xs font-semibold text-[#1F2A30] cursor-pointer">
            إرسال إشعار فوري عند ورود رسالة أو طلب عرض سعر جديد
          </label>
        </div>

        <div class="flex items-center gap-3 p-3  rounded-lg border border-[#C7D8E1]">
          <input
            type="checkbox"
            id="maintenanceMode"
            v-model="form.maintenanceMode"
            class="w-4 h-4 text-[#2AA9E3] rounded"
          />
          <label for="maintenanceMode" class="text-xs font-semibold text-[#1F2A30] cursor-pointer">
            تفعيل وضع الصيانة (إيقاف الواجهة العامة مؤقتاً)
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useApiMethods } from "~/composables/useApiMethods";
import { API_ENDPOINTS } from "~/config/endpoints";
import type { WebsiteSettings } from "~/types";

definePageMeta({
  layout: "admin",
  key: (r) => r.fullPath,
});

const { getMethod, submitMethod, loading } = useApiMethods();
const form = ref<WebsiteSettings | null>(null);

const loadSettings = async () => {
  const res = await getMethod(API_ENDPOINTS.ADMIN.SETTINGS, {}, true);
  if (res?.data) {
    form.value = res.data;
  }
};

const saveSettings = async () => {
  if (!form.value) return;
  await submitMethod(API_ENDPOINTS.ADMIN.SETTINGS, true, form.value, "PUT");
};

const testSheets = async () => {
  await submitMethod(API_ENDPOINTS.ADMIN.SYNC_SHEETS, true, {});
};

const testDrive = async () => {
  await submitMethod(API_ENDPOINTS.ADMIN.SYNC_DRIVE, true, {});
};

onMounted(() => {
  loadSettings();
});
</script>
