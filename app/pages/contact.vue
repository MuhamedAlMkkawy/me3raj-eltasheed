<template>
  <div class="py-12  min-h-screen">
    <!-- Header -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div class="bg-gradient-to-l from-[#1F2A30] to-[#2B3238] rounded-2xl p-8 md:p-14 text-white shadow-lg relative overflow-hidden">
        <div class="max-w-3xl relative z-10 space-y-4">
          <span class="inline-block py-1 px-3 rounded-full bg-[#2AA9E3]/20 text-[#2AA9E3] font-semibold text-xs border border-[#2AA9E3]/30">
            تواصل مباشر
          </span>
          <h1 class="text-3xl md:text-5xl font-heading font-bold text-white tracking-tight">
            اتصل بنا واطلب عرض سعر
          </h1>
          <p class="text-sm md:text-base text-[#C7D8E1] leading-relaxed">
            فريق المهندسين والمستشارين في معراج التشييد مستعدون دائماً للإجابة على استفساراتكم وتقديم الدعم الفني المطلوب.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Contact Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Contact Information Cards -->
        <div class="space-y-6">
          <div class="bg-white rounded-2xl border border-[#C7D8E1] p-6 shadow-sm space-y-6">
            <h2 class="text-xl font-heading font-bold text-[#1F2A30]">بيانات التواصل الرسمية</h2>

            <div class="space-y-4 text-xs sm:text-sm">
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-[#2AA9E3]/15 text-[#0F6F9E] flex items-center justify-center shrink-0">
                  <i class="pi pi-phone text-base"></i>
                </div>
                <div>
                  <div class="text-[#44505A] text-[11px] mb-0.5">الهاتف الموحد</div>
                  <a :href="`tel:${company?.phone || '+966114567890'}`" class="font-bold text-[#1F2A30] hover:text-[#0F6F9E]" dir="ltr">
                    {{ company?.phone || '+966 11 456 7890' }}
                  </a>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-[#2AA9E3]/15 text-[#0F6F9E] flex items-center justify-center shrink-0">
                  <i class="pi pi-envelope text-base"></i>
                </div>
                <div>
                  <div class="text-[#44505A] text-[11px] mb-0.5">البريد الإلكتروني</div>
                  <a :href="`mailto:${company?.email || 'info@me3raj.sa'}`" class="font-bold text-[#1F2A30] hover:text-[#0F6F9E]">
                    {{ company?.email || 'info@me3raj.sa' }}
                  </a>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-[#2AA9E3]/15 text-[#0F6F9E] flex items-center justify-center shrink-0">
                  <i class="pi pi-map-marker text-base"></i>
                </div>
                <div>
                  <div class="text-[#44505A] text-[11px] mb-0.5">المقر الرئيسي</div>
                  <div class="font-bold text-[#1F2A30]">
                    {{ company?.addressAr || 'طريق الملك فهد، الرياض، المملكة العربية السعودية' }}
                  </div>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-[#2AA9E3]/15 text-[#0F6F9E] flex items-center justify-center shrink-0">
                  <i class="pi pi-clock text-base"></i>
                </div>
                <div>
                  <div class="text-[#44505A] text-[11px] mb-0.5">أوقات العمل الرسمية</div>
                  <div class="font-bold text-[#1F2A30]">
                    الأحد - الخميس: 8:00 صباحاً - 5:00 مساءً
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-[#1F2A30] rounded-2xl p-6 text-white text-xs space-y-2">
            <div class="flex items-center gap-2 text-[#2AA9E3] font-bold">
              <i class="pi pi-verified"></i>
              <span>ترخيص المقاولات وتصنيف رسمي</span>
            </div>
            <p class="text-[#C7D8E1] leading-relaxed">
              شركة مسجلة رسمياً بسجل تجاري رقم {{ company?.crNumber || '1010894562' }}، معتمدة لدى منصة بلدي وكافة الجهات الحكومية ذات العلاقة.
            </p>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="lg:col-span-2 bg-white rounded-2xl border border-[#C7D8E1] p-6 sm:p-10 shadow-sm">
          <div class="mb-6 space-y-1">
            <h2 class="text-xl font-heading font-bold text-[#1F2A30]">أرسل لنا استفسارك أو طلبك</h2>
            <p class="text-xs text-[#44505A]">يرجى ملء النموذج أدناه وسيقوم أحد مهندسينا بالتواصل معكم في غضون 24 ساعة.</p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-[#1F2A30] mb-1.5">الاسم الكريم <span class="text-red-500">*</span></label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="مثال: م. أحمد الشمري"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-[#C7D8E1] text-xs focus:outline-none focus:border-[#2AA9E3] /50"
                />
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#1F2A30] mb-1.5">رقم الجوال <span class="text-red-500">*</span></label>
                <input
                  v-model="form.phone"
                  type="tel"
                  required
                  placeholder="مثال: 05XXXXXXXX"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-[#C7D8E1] text-xs focus:outline-none focus:border-[#2AA9E3] /50"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-[#1F2A30] mb-1.5">البريد الإلكتروني</label>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="name@example.com"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-[#C7D8E1] text-xs focus:outline-none focus:border-[#2AA9E3] /50"
                />
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#1F2A30] mb-1.5">موضوع الطلب / الخدمة <span class="text-red-500">*</span></label>
                <input
                  v-model="form.subject"
                  type="text"
                  required
                  placeholder="مثال: طلب تسعير مشروع مبنى تجاري"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-[#C7D8E1] text-xs focus:outline-none focus:border-[#2AA9E3] /50"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-[#1F2A30] mb-1.5">تفاصيل الاستفسار أو نطاق العمل <span class="text-red-500">*</span></label>
              <textarea
                v-model="form.message"
                rows="5"
                required
                placeholder="يرجى كتابة تفاصيل المشروع، الموقع التقريبي، المساحة، أو أي متطلبات خاصة..."
                class="w-full px-3.5 py-2.5 rounded-xl border border-[#C7D8E1] text-xs focus:outline-none focus:border-[#2AA9E3] /50 resize-y"
              ></textarea>
            </div>

            <div v-if="successMessage" class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <i class="pi pi-check-circle text-base"></i>
              <span>{{ successMessage }}</span>
            </div>

            <div v-if="errorMessage" class="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
              <i class="pi pi-exclamation-circle text-base"></i>
              <span>{{ errorMessage }}</span>
            </div>

            <div class="pt-2 flex justify-end">
              <button
                type="submit"
                :disabled="isSubmitting"
                class="main-btn inline-flex items-center gap-2 !m-0"
              >
                <i v-if="isSubmitting" class="pi pi-spin pi-spinner"></i>
                <i v-else class="pi pi-send"></i>
                <span>{{ isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة الآن' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useApiMethods } from "~/composables/useApiMethods";
import { API_ENDPOINTS } from "~/config/endpoints";
import type { CompanyInfo } from "~/types";

definePageMeta({ key: (r) => r.fullPath });

const { getMethod, submitMethod } = useApiMethods();
const company = ref<CompanyInfo | null>(null);

const form = reactive({
  name: "",
  phone: "",
  email: "",
  subject: "",
  message: "",
});

const isSubmitting = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

useHead({
  title: "اتصل بنا | شركة معراج التشييد للمقاولات العامة",
});

onMounted(async () => {
  const res = await getMethod(API_ENDPOINTS.PUBLIC.COMPANY_INFO);
  if (res?.data) {
    company.value = res.data;
  }
});

const handleSubmit = async () => {
  isSubmitting.value = true;
  successMessage.value = "";
  errorMessage.value = "";

  try {
    const res = await submitMethod(API_ENDPOINTS.PUBLIC.CONTACT_SUBMIT, false, form);
    if (res?.success) {
      successMessage.value = "تم إرسال رسالتكم بنجاح! سيتواصل معكم فريق العمل في أقرب وقت.";
      form.name = "";
      form.phone = "";
      form.email = "";
      form.subject = "";
      form.message = "";
    } else {
      errorMessage.value = res?.message || "حدث خطأ أثناء إرسال الرسالة، يرجى المحاولة مرة أخرى.";
    }
  } catch (err: any) {
    errorMessage.value = err?.message || "تعذر إرسال الرسالة، يرجى التحقق من الاتصال.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>
