
<template>
  <div
    dir="rtl"
    class="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#1F2A30] px-4 py-10 font-body selection:bg-[#2AA9E3]/30"
  >
    <!-- Background Decoration -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        class="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#2AA9E3]/10 blur-[120px]"
      ></div>

      <div
        class="absolute -bottom-48 -left-40 h-[550px] w-[550px] rounded-full bg-[#2AA9E3]/10 blur-[130px]"
      ></div>

      <div
        class="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px]"
      ></div>

      <div
        class="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-[#2AA9E3]/50 to-transparent"
      ></div>
    </div>

    <!-- Login Container -->
    <div class="relative z-10 w-full max-w-[440px]">

      <!-- Brand Header -->
      <div class="mb-8 text-center">
        <div
          class="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/15 bg-white p-4 shadow-[0_15px_50px_rgba(0,0,0,0.2)]"
        >
          <img
            src="/logo.png"
            alt="معراج التشييد"
            class="h-full w-full object-contain"
          />
        </div>

        <div
          class="mb-3 inline-flex items-center gap-2 rounded-full border border-[#2AA9E3]/25 bg-[#2AA9E3]/10 px-4 py-1.5"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-[#2AA9E3]"></span>

          <span class="text-[11px] font-semibold tracking-wide text-[#75CCF4]">
            بوابة الإدارة
          </span>
        </div>

        <h1 class="font-heading text-3xl font-bold tracking-tight text-white">
          مرحباً بعودتك
        </h1>

        <p class="mt-2 text-sm leading-7 text-white/55">
          سجل دخولك للوصول إلى لوحة التحكم وإدارة محتوى الموقع
        </p>
      </div>

      <!-- Login Card -->
      <div
        class="overflow-hidden rounded-[28px] border border-white/15 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.3)]"
      >
        <!-- Top Accent -->
        <div
          class="h-1.5 bg-gradient-to-l from-[#2AA9E3] via-[#55BDEB] to-[#0F6F9E]"
        ></div>

        <div class="p-6 sm:p-9">

          <!-- Form Header -->
          <div class="mb-7">
            <h2 class="font-heading text-xl font-bold text-[#1F2A30]">
              تسجيل الدخول
            </h2>

            <p class="mt-1.5 text-sm text-[#44505A]">
              أدخل بيانات حسابك للمتابعة
            </p>
          </div>

          <!-- Login Form -->
          <VeeForm
            :validation-schema="schema"
            @submit="handleLogin"
            class="space-y-5"
          >
            <FormCustomField
              name="email"
              label="البريد الإلكتروني"
              type="email"
              placeholder="admin@me3raj.sa"
              required
            />

            <FormCustomField
              name="password"
              label="كلمة المرور"
              type="password"
              placeholder="أدخل كلمة المرور"
              required
            />

            <!-- Submit Button -->
            <div class="pt-3">
              <MainButton
                type="submit"
                label="تسجيل الدخول"
                :loading="loading"
                class="!mt-0 w-full"
              />
            </div>
          </VeeForm>

          <!-- Security Notice -->
          <div
            class="mt-7 flex items-start gap-3 rounded-xl border border-[#C7D8E1]/70 bg-[#F5F9FB] p-4"
          >
            <div
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2AA9E3]/10 text-[#0F6F9E]"
            >
              <i class="pi pi-shield text-base"></i>
            </div>

            <div>
              <p class="text-xs font-bold text-[#1F2A30]">
                تسجيل دخول آمن
              </p>

              <p class="mt-1 text-[11px] leading-5 text-[#44505A]">
                بيانات الدخول الافتراضية للإدارة:
                <br />
                <span class="font-mono text-[#0F6F9E] font-semibold">admin@me3raj.sa</span> / <span class="font-mono text-[#0F6F9E] font-semibold">Admin@123456</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-7 text-center">
        <p class="text-xs text-white/45">
          جميع الحقوق محفوظة © {{ new Date().getFullYear() }}
          <span class="font-semibold text-white/75">
            معراج التشييد
          </span>
        </p>

        <p class="mt-2 text-[10px] tracking-wide text-white/30">
          MANAGEMENT PORTAL
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import * as yup from "yup";
import { useAuthStore } from "~/stores/authStore";
import { useApiMethods } from "~/composables/useApiMethods";
import { API_ENDPOINTS } from "~/config/endpoints";

definePageMeta({
  layout: false,
});

const router = useRouter();
const localeRoute = useLocaleRoute();
const authStore = useAuthStore();

const { submitMethod, loading } = useApiMethods();

const schema = yup.object({
  email: yup
    .string()
    .email("يرجى إدخال بريد إلكتروني صالح")
    .required("البريد الإلكتروني مطلوب"),

  password: yup
    .string()
    .min(6, "كلمة المرور يجب أن لا تقل عن 6 أحرف")
    .required("كلمة المرور مطلوبة"),
});

const handleLogin = async (values: any) => {
  const res = await submitMethod(
    API_ENDPOINTS.AUTH.LOGIN,
    false,
    values,
    "POST"
  );

  if (res?.data?.token && res?.data?.user) {
    authStore.setAuth({
      user: res.data.user,
      token: res.data.token,
    });

    router.push(localeRoute("/admin"));
  }
};
</script>
