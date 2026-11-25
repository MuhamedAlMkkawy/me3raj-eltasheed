
<template>
  <div dir="rtl" class="space-y-7">

    <!-- Page Header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div class="mb-2 flex items-center gap-2">
          <span class="h-1.5 w-1.5 rounded-full bg-[#2AA9E3]"></span>
          <span class="text-[11px] font-bold tracking-wide text-[#0F6F9E]">
            إدارة التواصل
          </span>
        </div>

        <h2 class="font-heading text-2xl font-bold text-[#1F2A30]">
          رسائل واستفسارات العملاء
        </h2>

        <p class="mt-2 text-sm text-[#44505A]">
          استعراض ومتابعة طلبات عروض الأسعار والاستشارات الواردة عبر الموقع.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <div class="rounded-xl border border-[#C7D8E1] bg-white px-4 py-3 shadow-sm">
          <span class="block text-[11px] text-[#44505A]">إجمالي الرسائل</span>
          <span class="mt-1 block text-xl font-bold text-[#1F2A30]">
            {{ messages.length }}
          </span>
        </div>

        <div class="rounded-xl border border-red-100 bg-red-50 px-4 py-3">
          <span class="block text-[11px] text-red-600">رسائل جديدة</span>
          <span class="mt-1 block text-xl font-bold text-red-700">
            {{ messages.filter(m => m.status === 'new').length }}
          </span>
        </div>
      </div>
    </div>

    <!-- Messages Container -->
    <div class="overflow-hidden rounded-2xl border border-[#C7D8E1] bg-white shadow-sm">

      <!-- Table Header -->
      <div class="flex items-center justify-between border-b border-[#C7D8E1]  px-5 py-4">
        <div>
          <h3 class="text-sm font-bold text-[#1F2A30]">
            صندوق الوارد
          </h3>
          <p class="mt-1 text-[11px] text-[#44505A]">
            جميع رسائل واستفسارات العملاء
          </p>
        </div>

        <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#0F6F9E] shadow-sm border border-[#C7D8E1]">
          <i class="pi pi-inbox"></i>
        </div>
      </div>

      <!-- Messages Table -->
      <div v-if="messages.length > 0" class="overflow-x-auto">
        <table class="w-full min-w-[850px] text-right text-xs">

          <thead class="border-b border-[#C7D8E1] bg-white text-[#44505A]">
            <tr>
              <th class="px-5 py-4 font-semibold">المرسل</th>
              <th class="px-5 py-4 font-semibold">بيانات التواصل</th>
              <th class="px-5 py-4 font-semibold">الموضوع والرسالة</th>
              <th class="px-5 py-4 font-semibold">التاريخ</th>
              <th class="px-5 py-4 font-semibold">الحالة</th>
              <th class="px-5 py-4 text-center font-semibold">الإجراءات</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-[#C7D8E1]/70">

            <tr
              v-for="msg in messages"
              :key="msg.id"
              class="group transition-colors duration-200 hover:/80"
              :class="{ 'bg-[#2AA9E3]/[0.035]': msg.status === 'new' }"
            >
              <!-- Sender -->
              <td class="px-5 py-4">
                <div class="flex items-center gap-3">
                  <div
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2AA9E3]/10 text-sm font-bold text-[#0F6F9E]"
                  >
                    {{ msg.name?.charAt(0) || 'ع' }}
                  </div>

                  <div class="min-w-0">
                    <p class="font-bold text-sm text-[#1F2A30]">
                      {{ msg.name }}
                    </p>
                    <p class="mt-1 max-w-[150px] truncate text-[11px] text-[#44505A]">
                      {{ msg.company || 'عميل فردي' }}
                    </p>
                  </div>
                </div>
              </td>

              <!-- Contact -->
              <td class="px-5 py-4">
                <div class="space-y-1.5">
                  <p class="flex items-center gap-2 font-mono text-[#0F6F9E]" dir="ltr">
                    <i class="pi pi-phone text-[10px]"></i>
                    {{ msg.phone }}
                  </p>
                  <p class="flex max-w-[190px] items-center gap-2 truncate text-[11px] text-[#44505A]">
                    <i class="pi pi-envelope text-[10px]"></i>
                    {{ msg.email }}
                  </p>
                </div>
              </td>

              <!-- Subject -->
              <td class="max-w-[240px] px-5 py-4">
                <p class="font-bold text-[#1F2A30]">
                  {{ msg.subject }}
                </p>
                <p class="mt-1.5 line-clamp-1 text-[11px] leading-5 text-[#44505A]">
                  {{ msg.message }}
                </p>
              </td>

              <!-- Date -->
              <td class="whitespace-nowrap px-5 py-4 text-[#44505A]">
                <div class="flex items-center gap-2">
                  <i class="pi pi-calendar text-[#2AA9E3]"></i>
                  {{ msg.date }}
                </div>
              </td>

              <!-- Status -->
              <td class="px-5 py-4">
                <span
                  class="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold"
                  :class="[
                    msg.status === 'new'
                      ? 'bg-red-50 text-red-700'
                      : msg.status === 'replied'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-slate-100 text-slate-600'
                  ]"
                >
                  <span
                    class="h-1.5 w-1.5 rounded-full"
                    :class="[
                      msg.status === 'new'
                        ? 'bg-red-500'
                        : msg.status === 'replied'
                          ? 'bg-emerald-500'
                          : 'bg-slate-400'
                    ]"
                  ></span>

                  {{
                    msg.status === 'new'
                      ? 'جديدة'
                      : msg.status === 'replied'
                        ? 'تم الرد'
                        : 'مقروءة'
                  }}
                </span>
              </td>

              <!-- Actions -->
              <td class="px-5 py-4">
                <div class="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    class="flex h-9 w-9 items-center justify-center rounded-xl border border-[#C7D8E1] bg-white text-[#0F6F9E] transition-all hover:border-[#2AA9E3] hover:bg-[#2AA9E3] hover:text-white"
                    title="عرض التفاصيل"
                    @click="viewDetails(msg)"
                  >
                    <i class="pi pi-eye"></i>
                  </button>

                  <button
                    type="button"
                    class="flex h-9 w-9 items-center justify-center rounded-xl border border-red-100 bg-white text-red-500 transition-all hover:border-red-500 hover:bg-red-500 hover:text-white"
                    title="حذف الرسالة"
                    @click="confirmDelete(msg)"
                  >
                    <i class="pi pi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>

          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-else class="flex flex-col items-center justify-center px-5 py-20 text-center">
        <div class="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl  text-[#2AA9E3]">
          <i class="pi pi-inbox text-3xl"></i>
        </div>

        <h3 class="text-base font-bold text-[#1F2A30]">
          لا توجد رسائل حالياً
        </h3>

        <p class="mt-2 max-w-xs text-xs leading-6 text-[#44505A]">
          ستظهر هنا جميع استفسارات ورسائل العملاء الواردة عبر الموقع.
        </p>
      </div>

      <!-- Table Footer -->
      <div
        v-if="messages.length > 0"
        class="flex items-center justify-between border-t border-[#C7D8E1] /70 px-5 py-3"
      >
        <span class="text-[11px] text-[#44505A]">
          إجمالي الرسائل: <strong class="text-[#1F2A30]">{{ messages.length }}</strong>
        </span>

        <span class="text-[10px] text-[#44505A]">
          معراج التشييد
        </span>
      </div>
    </div>

    <!-- Redesigned Message Details Dialog -->
    <Dialog
      v-model:visible="showDialog"
      modal
      :closable="true"
      :draggable="false"
      :dismissableMask="true"
      :showHeader="false"
      :style="{ width: '680px', maxWidth: '95vw' }"
      :pt="{
        root: {
          class: 'overflow-hidden !rounded-2xl !border !border-[#C7D8E1] !shadow-2xl'
        },
        content: {
          class: '!p-0 !overflow-visible'
        },
        mask: {
          class: 'backdrop-blur-[3px]'
        }
      }"
    >
      <div v-if="selectedMsg" class="overflow-hidden rounded-2xl bg-white">

        <!-- Dialog Header -->
        <div class="relative overflow-hidden bg-[#1F2A30] px-6 py-6 sm:px-8">
          <div class="pointer-events-none absolute -left-10 -top-20 h-52 w-52 rounded-full bg-[#2AA9E3]/10 blur-3xl"></div>

          <div class="relative flex items-start justify-between gap-4">
            <div>
              <div class="mb-3 flex items-center gap-2">
                <span class="h-1.5 w-1.5 rounded-full bg-[#2AA9E3]"></span>
                <span class="text-[10px] font-bold tracking-wider text-[#75CCF4]">
                  تفاصيل التواصل
                </span>
              </div>

              <h3 class="font-heading text-xl font-bold text-white">
                رسالة العميل
              </h3>

              <p class="mt-1.5 text-xs text-white/50">
                تفاصيل الاستفسار ومعلومات المرسل
              </p>
            </div>

            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-[#75CCF4]">
              <i class="pi pi-envelope text-xl"></i>
            </div>
          </div>
        </div>

        <!-- Dialog Body -->
        <div class="max-h-[65vh] space-y-6 overflow-y-auto p-5 sm:p-8">

          <!-- Customer Identity -->
          <div class="flex items-center gap-4">
            <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#2AA9E3]/10 text-xl font-bold text-[#0F6F9E]">
              {{ selectedMsg.name?.charAt(0) || 'ع' }}
            </div>

            <div class="min-w-0 flex-1">
              <h4 class="truncate text-base font-bold text-[#1F2A30]">
                {{ selectedMsg.name }}
              </h4>

              <p class="mt-1 text-xs text-[#44505A]">
                {{ selectedMsg.company || 'عميل فردي' }}
              </p>
            </div>

            <span
              class="shrink-0 rounded-full px-3 py-1.5 text-[10px] font-bold"
              :class="[
                selectedMsg.status === 'new'
                  ? 'bg-red-50 text-red-700'
                  : selectedMsg.status === 'replied'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-slate-100 text-slate-600'
              ]"
            >
              {{
                selectedMsg.status === 'new'
                  ? 'جديدة'
                  : selectedMsg.status === 'replied'
                    ? 'تم الرد'
                    : 'مقروءة'
              }}
            </span>
          </div>

          <!-- Contact Information -->
          <div>
            <h4 class="mb-3 flex items-center gap-2 text-xs font-bold text-[#1F2A30]">
              <i class="pi pi-user text-[#2AA9E3]"></i>
              معلومات التواصل
            </h4>

            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">

              <!-- Phone -->
              <a
                :href="`tel:${selectedMsg.phone}`"
                class="group flex min-w-0 items-center gap-3 rounded-xl border border-[#C7D8E1] /70 p-4 transition-colors hover:border-[#2AA9E3] hover:bg-[#2AA9E3]/5"
              >
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#0F6F9E] shadow-sm">
                  <i class="pi pi-phone"></i>
                </div>

                <div class="min-w-0">
                  <span class="block text-[10px] text-[#44505A]">
                    رقم الهاتف
                  </span>

                  <span class="mt-1 block truncate font-mono text-xs font-bold text-[#1F2A30]" dir="ltr">
                    {{ selectedMsg.phone }}
                  </span>
                </div>
              </a>

              <!-- Email -->
              <a
                :href="`mailto:${selectedMsg.email}`"
                class="flex min-w-0 items-center gap-3 rounded-xl border border-[#C7D8E1] /70 p-4 transition-colors hover:border-[#2AA9E3] hover:bg-[#2AA9E3]/5"
              >
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#0F6F9E] shadow-sm">
                  <i class="pi pi-envelope"></i>
                </div>

                <div class="min-w-0">
                  <span class="block text-[10px] text-[#44505A]">
                    البريد الإلكتروني
                  </span>

                  <span class="mt-1 block truncate text-xs font-bold text-[#1F2A30]" dir="ltr">
                    {{ selectedMsg.email }}
                  </span>
                </div>
              </a>
            </div>
          </div>

          <!-- Message Subject -->
          <div>
            <h4 class="mb-3 flex items-center gap-2 text-xs font-bold text-[#1F2A30]">
              <i class="pi pi-bookmark text-[#2AA9E3]"></i>
              موضوع الرسالة
            </h4>

            <div class="rounded-xl border border-[#C7D8E1] /70 p-4">
              <p class="text-sm font-bold leading-6 text-[#1F2A30]">
                {{ selectedMsg.subject }}
              </p>
            </div>
          </div>

          <!-- Message Content -->
          <div>
            <div class="mb-3 flex items-center justify-between">
              <h4 class="flex items-center gap-2 text-xs font-bold text-[#1F2A30]">
                <i class="pi pi-align-right text-[#2AA9E3]"></i>
                محتوى الرسالة
              </h4>

              <span class="text-[10px] text-[#44505A]">
                نص الاستفسار
              </span>
            </div>

            <div class="min-h-[130px] rounded-xl border border-[#C7D8E1] bg-white p-5">
              <p class="whitespace-pre-wrap text-sm leading-8 text-[#44505A]">
                {{ selectedMsg.message }}
              </p>
            </div>
          </div>

          <!-- Date -->
          <div class="flex items-center gap-3 rounded-xl  px-4 py-3">
            <i class="pi pi-calendar text-[#0F6F9E]"></i>

            <div>
              <span class="block text-[10px] text-[#44505A]">
                تاريخ الاستلام
              </span>

              <span class="mt-1 block text-xs font-bold text-[#1F2A30]">
                {{ selectedMsg.date }}
              </span>
            </div>
          </div>

          <!-- Status Update -->
          <div class="border-t border-[#C7D8E1] pt-5">
            <label class="mb-3 flex items-center gap-2 text-xs font-bold text-[#1F2A30]">
              <i class="pi pi-sync text-[#2AA9E3]"></i>
              تحديث حالة الرسالة
            </label>

            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="status in [
                  { value: 'new', label: 'جديدة', icon: 'pi pi-bell' },
                  { value: 'read', label: 'مقروءة', icon: 'pi pi-eye' },
                  { value: 'replied', label: 'تم الرد', icon: 'pi pi-check-circle' }
                ]"
                :key="status.value"
                type="button"
                class="flex flex-col items-center justify-center gap-2 rounded-xl border px-2 py-3 text-[11px] font-bold transition-all"
                :class="
                  selectedMsg.status === status.value
                    ? 'border-[#2AA9E3] bg-[#2AA9E3]/10 text-[#0F6F9E] shadow-sm'
                    : 'border-[#C7D8E1] bg-white text-[#44505A] hover:border-[#2AA9E3]/50 hover:'
                "
                @click="selectedMsg.status = status.value as ContactMessage['status']; updateStatus()"
              >
                <i :class="status.icon" class="text-base"></i>
                {{ status.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- Dialog Footer -->
        <div class="flex items-center justify-between gap-3 border-t border-[#C7D8E1] /70 px-5 py-4 sm:px-8">

          <span class="text-[10px] text-[#44505A]">
            معراج التشييد
          </span>

          <button
            type="button"
            class="rounded-xl bg-[#1F2A30] px-6 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#0F6F9E]"
            @click="showDialog = false"
          >
            إغلاق
          </button>
        </div>
      </div>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Dialog from "primevue/dialog";
import { useApiMethods } from "~/composables/useApiMethods";
import { API_ENDPOINTS } from "~/config/endpoints";
import { useConfirmAction } from "~/composables/useConfirmAction";
import type { ContactMessage } from "~/types";

definePageMeta({
  layout: "admin",
  key: (r) => r.fullPath,
});

const { getMethod, submitMethod } = useApiMethods();
const { requireConfirmation } = useConfirmAction();

const messages = ref<ContactMessage[]>([]);
const selectedMsg = ref<ContactMessage | null>(null);
const showDialog = ref(false);

const loadMessages = async () => {
  const res = await getMethod(API_ENDPOINTS.ADMIN.MESSAGES, {}, true);

  if (res?.data) {
    messages.value = res.data;
  }
};

const viewDetails = (msg: ContactMessage) => {
  selectedMsg.value = { ...msg };
  showDialog.value = true;

  if (msg.status === "new") {
    msg.status = "read";
    selectedMsg.value.status = "read";

    submitMethod(
      API_ENDPOINTS.ADMIN.MESSAGE_ITEM(msg.id),
      true,
      { status: "read" },
      "PUT"
    );
  }
};

const updateStatus = async () => {
  if (!selectedMsg.value) return;

  const res = await submitMethod(
    API_ENDPOINTS.ADMIN.MESSAGE_ITEM(selectedMsg.value.id),
    true,
    { status: selectedMsg.value.status },
    "PUT"
  );

  await loadMessages();
};

const confirmDelete = (msg: ContactMessage) => {
  requireConfirmation({
    header: "حذف الرسالة",
    message: `هل أنت متأكد من حذف رسالة "${msg.name}"؟`,
    onAccept: async () => {
      await submitMethod(
        API_ENDPOINTS.ADMIN.MESSAGE_ITEM(msg.id),
        true,
        {},
        "DELETE"
      );

      if (selectedMsg.value?.id === msg.id) {
        showDialog.value = false;
        selectedMsg.value = null;
      }

      await loadMessages();
    },
  });
};

onMounted(() => {
  loadMessages();
});
</script>
