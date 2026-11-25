<template>
  <div class="space-y-6">
    <!-- Welcome Banner -->
    <div class="bg-gradient-to-l from-[#1F2A30] to-[#2B3238] rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
      <div>
        <span class="inline-block px-3 py-1 bg-[#2AA9E3] text-[#1F2A30] font-bold text-xs rounded-full mb-2">
          نظام الإدارة المتكامل
        </span>
        <h2 class="text-2xl font-bold font-heading text-white mb-1">
          مرحباً بك، {{ authStore.user?.name || 'المدير' }}
        </h2>
        <p class="text-sm text-[#C7D8E1]">
          يمكنك إدارة محتوى الموقع، المشاريع، الخدمات، والوسائط بكل سهولة من مكان واحد.
        </p>
      </div>
      <div class="flex items-center gap-3 shrink-0">
        <NuxtLink
          to="/admin/projects/new"
          class="main-btn sm !m-0"
        >
          <i class="pi pi-plus"></i>
          <span>إضافة مشروع جديد</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Quick Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Projects -->
      <div class="bg-white p-5 rounded-xl border border-[#C7D8E1] shadow-sm flex items-center justify-between">
        <div>
          <span class="text-xs font-medium text-[#44505A]">إجمالي المشاريع</span>
          <h3 class="text-2xl font-bold font-heading text-[#1F2A30] mt-1">{{ stats?.projectsCount ?? 0 }}</h3>
          <span class="text-xs text-emerald-600 font-medium">{{ stats?.activeProjects ?? 0 }} قيد التنفيذ</span>
        </div>
        <div class="w-12 h-12 rounded-xl bg-[#2AA9E3]/10 text-[#0F6F9E] flex items-center justify-center text-xl">
          <i class="pi pi-building"></i>
        </div>
      </div>

      <!-- Services -->
      <div class="bg-white p-5 rounded-xl border border-[#C7D8E1] shadow-sm flex items-center justify-between">
        <div>
          <span class="text-xs font-medium text-[#44505A]">خدمات الشركة</span>
          <h3 class="text-2xl font-bold font-heading text-[#1F2A30] mt-1">{{ stats?.servicesCount ?? 0 }}</h3>
          <span class="text-xs text-[#0F6F9E]">خدمات معمارية وإنشائية</span>
        </div>
        <div class="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-xl">
          <i class="pi pi-briefcase"></i>
        </div>
      </div>

      <!-- Messages -->
      <div class="bg-white p-5 rounded-xl border border-[#C7D8E1] shadow-sm flex items-center justify-between">
        <div>
          <span class="text-xs font-medium text-[#44505A]">رسائل العملاء</span>
          <h3 class="text-2xl font-bold font-heading text-[#1F2A30] mt-1">{{ stats?.messagesCount ?? 0 }}</h3>
          <span class="text-xs text-red-500 font-semibold">{{ stats?.newMessagesCount ?? 0 }} جديدة تحتاج رد</span>
        </div>
        <div class="w-12 h-12 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center text-xl">
          <i class="pi pi-envelope"></i>
        </div>
      </div>

      <!-- Media Items -->
      <div class="bg-white p-5 rounded-xl border border-[#C7D8E1] shadow-sm flex items-center justify-between">
        <div>
          <span class="text-xs font-medium text-[#44505A]">ملفات الوسائط</span>
          <h3 class="text-2xl font-bold font-heading text-[#1F2A30] mt-1">{{ stats?.mediaCount ?? 0 }}</h3>
          <span class="text-xs text-[#0F6F9E]">صور ومستندات</span>
        </div>
        <div class="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center text-xl">
          <i class="pi pi-images"></i>
        </div>
      </div>
    </div>

    <!-- Integrations & Sync Status -->
    <div class="bg-white p-6 rounded-xl border border-[#C7D8E1] shadow-sm">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div>
          <h3 class="text-base font-bold font-heading text-[#1F2A30]">حالة التخزين السحابي</h3>
          <p class="text-xs text-[#44505A]">مزامنة قاعدة البيانات وتخزين وسائط ومستندات المشاريع</p>
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="testSheets"
            class="px-3 py-1.5 rounded-lg border border-[#C7D8E1] text-xs font-medium text-[#1F2A30] hover: flex items-center gap-1.5"
            :disabled="testingSheets"
          >
            <i class="pi" :class="testingSheets ? 'pi-spin pi-spinner' : 'pi-sync text-[#0F6F9E]'"></i>
            <span>فحص المزامنة</span>
          </button>
          <button
            @click="testDrive"
            class="px-3 py-1.5 rounded-lg border border-[#C7D8E1] text-xs font-medium text-[#1F2A30] hover: flex items-center gap-1.5"
            :disabled="testingDrive"
          >
            <i class="pi" :class="testingDrive ? 'pi-spin pi-spinner' : 'pi-cloud text-[#2AA9E3]'"></i>
            <span>فحص التخزين السحابي</span>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-3 rounded-lg  border border-[#C7D8E1] flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <i class="pi pi-table text-emerald-600 text-lg"></i>
            <div>
              <span class="text-xs font-semibold text-[#1F2A30] block">Google Spreadsheet ID:</span>
              <code class="text-[11px] text-[#0F6F9E]">1tKA3MYCJeXTUjOI_SehSpJ1b4zpGNeLLnYE5adNnSE</code>
            </div>
          </div>
          <span class="text-xs font-bold text-emerald-600">متصل</span>
        </div>

        <div class="p-3 rounded-lg  border border-[#C7D8E1] flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <i class="pi pi-folder text-[#2AA9E3] text-lg"></i>
            <div>
              <span class="text-xs font-semibold text-[#1F2A30] block">مجلد تخزين الوسائط السحابي:</span>
              <code class="text-[11px] text-[#0F6F9E]">1nv5sBNxbN-jg7-qXPqRdjBAMMkx5_Tqz</code>
            </div>
          </div>
          <span class="text-xs font-bold text-[#2AA9E3]">متصل</span>
        </div>
      </div>
    </div>

    <!-- Recent Messages Table -->
    <div class="bg-white rounded-xl border border-[#C7D8E1] shadow-sm overflow-hidden">
      <div class="p-5 border-b border-[#C7D8E1] flex items-center justify-between">
        <h3 class="text-base font-bold font-heading text-[#1F2A30]">أحدث طلبات التواصل وعروض الأسعار</h3>
        <NuxtLink to="/admin/messages" class="text-xs font-semibold text-[#0F6F9E] hover:underline">
          عرض جميع الرسائل &larr;
        </NuxtLink>
      </div>

      <div v-if="stats?.recentMessages && stats.recentMessages.length > 0" class="overflow-x-auto">
        <table class="w-full text-right text-xs">
          <thead class=" text-[#44505A] border-b border-[#C7D8E1]">
            <tr>
              <th class="p-3">الاسم</th>
              <th class="p-3">رقم الهاتف</th>
              <th class="p-3">الموضوع</th>
              <th class="p-3">التاريخ</th>
              <th class="p-3">الحالة</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#C7D8E1]">
            <tr v-for="msg in stats.recentMessages" :key="msg.id" class="hover:/50">
              <td class="p-3 font-semibold text-[#1F2A30]">{{ msg.name }}</td>
              <td class="p-3 text-[#44505A] font-mono" dir="ltr">{{ msg.phone }}</td>
              <td class="p-3 text-[#1F2A30] max-w-xs truncate">{{ msg.subject }}</td>
              <td class="p-3 text-[#44505A]">{{ msg.date }}</td>
              <td class="p-3">
                <span
                  class="px-2 py-0.5 rounded text-[10px] font-bold"
                  :class="msg.status === 'new' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'"
                >
                  {{ msg.status === 'new' ? 'جديدة' : 'تم الرد' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="p-8 text-center text-xs text-[#44505A]">
        لا توجد رسائل جديدة حالياً.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "~/stores/authStore";
import { useApiMethods } from "~/composables/useApiMethods";
import { API_ENDPOINTS } from "~/config/endpoints";

definePageMeta({
  layout: "admin",
  key: (r) => r.fullPath,
});

const authStore = useAuthStore();
const { getMethod, submitMethod } = useApiMethods();

const stats = ref<any>(null);
const testingSheets = ref(false);
const testingDrive = ref(false);

const loadStats = async () => {
  const res = await getMethod(API_ENDPOINTS.ADMIN.DASHBOARD_STATS, {}, true);
  if (res?.data) {
    stats.value = res.data;
  }
};

const testSheets = async () => {
  testingSheets.value = true;
  await submitMethod(API_ENDPOINTS.ADMIN.SYNC_SHEETS, true, {});
  testingSheets.value = false;
};

const testDrive = async () => {
  testingDrive.value = true;
  await submitMethod(API_ENDPOINTS.ADMIN.SYNC_DRIVE, true, {});
  testingDrive.value = false;
};

onMounted(() => {
  loadStats();
});
</script>
