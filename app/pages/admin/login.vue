
<template>
  <div
    dir="rtl"
    class="login-page relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12 font-body selection:bg-[#2AA9E3]/30"
  >
    <!-- Background -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        class="absolute -right-52 -top-52 h-[650px] w-[650px] rounded-full bg-[#2AA9E3]/[0.10] blur-[140px]"
      />

      <div
        class="absolute -bottom-64 -left-52 h-[700px] w-[700px] rounded-full bg-[#0F6F9E]/[0.13] blur-[150px]"
      />

      <div
        class="absolute inset-0 opacity-[0.025]"
        style="
          background-image: linear-gradient(#ffffff 1px, transparent 1px),
            linear-gradient(90deg, #ffffff 1px, transparent 1px);
          background-size: 48px 48px;
        "
      />

      <div
        class="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-[#2AA9E3]/50 to-transparent"
      />
    </div>

    <!-- Login Container -->
    <main class="relative z-10 w-full max-w-[440px]">

      <!-- Brand -->
      <header class="mb-8 text-center">
        <!-- Original logo: unchanged -->
        <img
          src="@/assets/images/logo.gif"
          alt="معراج التشييد"
          class="mx-auto mb-6 h-24 w-24 rounded-[26px] border border-white/15 bg-white object-cover shadow-[0_12px_45px_rgba(0,0,0,0.25)]"
        />

        <div
          class="mb-5 inline-flex items-center gap-2 rounded-full border border-[#2AA9E3]/20 bg-[#2AA9E3]/[0.08] px-4 py-2"
        >
          <span class="relative flex h-2 w-2">
            <span
              class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2AA9E3] opacity-40"
            />
            <span class="relative h-2 w-2 rounded-full bg-[#2AA9E3]" />
          </span>

          <span class="text-[11px] font-bold tracking-wide text-[#75CCF4]">
            بوابة الإدارة
          </span>
        </div>

        <h1
          class="font-heading text-[30px] font-extrabold tracking-tight text-white"
        >
          مرحباً بعودتك
        </h1>

        <p class="mt-3 text-[13px] leading-7 text-white/55">
          سجل دخولك للوصول إلى لوحة التحكم وإدارة محتوى الموقع
        </p>
      </header>

      <!-- Login Card -->
      <section
        class="login-card relative overflow-hidden rounded-[26px] border border-white/70 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.30)]"
      >
        <!-- Top Accent -->
        <div
          class="h-[5px] bg-gradient-to-l from-[#0F6F9E] via-[#2AA9E3] to-[#75CCF4]"
        />

        <!-- Card Decoration -->
        <div
          class="pointer-events-none absolute -left-28 -top-28 h-72 w-72 rounded-full bg-[#2AA9E3]/[0.055] blur-[80px]"
        />

        <div class="relative px-6 py-8 sm:px-9 sm:py-10">

          <!-- Form Header -->
          <div class="mb-9">
            <div
              class="mb-6 flex h-[58px] w-[58px] items-center justify-center rounded-[18px] border border-[#2AA9E3]/15 bg-gradient-to-br from-[#EAF8FE] to-[#F4FAFD] text-[#0F6F9E]"
            >
              <i class="pi pi-lock text-[23px]" />
            </div>

            <h2
              class="font-heading text-[24px] font-extrabold tracking-tight text-[#1F2A30]"
            >
              تسجيل الدخول
            </h2>

            <p class="mt-2 text-[13px] leading-7 text-[#71808A]">
              أدخل بيانات حسابك للوصول إلى لوحة التحكم وإدارة محتوى الموقع.
            </p>
          </div>

          <!-- Form -->
          <VeeForm
            :validation-schema="schema"
            @submit="handleLogin"
            class="login-form space-y-6"
          >
            <FormCustomField
              name="email"
              label="البريد الإلكتروني"
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              required
            />

            <FormCustomField
              name="password"
              label="كلمة المرور"
              type="password"
              placeholder="أدخل كلمة المرور"
              required
            />

            <!-- Submit -->
            <div class="pt-2">
              <MainButton
                type="submit"
                label="تسجيل الدخول"
                :loading="loading"
                class="login-submit !mt-0 w-full"
              />
            </div>
          </VeeForm>

        </div>
      </section>
    </main>
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

<style>
.login-page {
  background: #1f2a30;
}

/* Login card */
.login-card {
  backdrop-filter: blur(20px);
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;
}

.login-card:hover {
  box-shadow: 0 35px 110px rgba(0, 0, 0, 0.34);
}

/* Form labels */
.login-form label {
  color: #263943 !important;
  font-size: 13px !important;
  font-weight: 700 !important;
}

/* Form inputs */
.login-form input {
  min-height: 52px !important;
  border: 1px solid #dce7ed !important;
  border-radius: 13px !important;
  background: #f8fbfd !important;
  color: #1f2a30 !important;
  font-size: 13px !important;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease !important;
}

.login-form input::placeholder {
  color: #a0adb5 !important;
}

.login-form input:hover {
  border-color: #b5d8e8 !important;
}

.login-form input:focus {
  border-color: #2aa9e3 !important;
  background: #ffffff !important;
  box-shadow: 0 0 0 4px rgba(42, 169, 227, 0.10) !important;
  outline: none !important;
}

/* Submit button */
.login-submit {
  width: 100% !important;
  margin-top: 0 !important;
}

.login-submit button,
.login-submit :deep(button),
.login-submit :deep(.p-button),
button.login-submit {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 100% !important;
  min-height: 54px !important;
  padding: 0 24px !important;
  border: 0 !important;
  border-radius: 14px !important;

  background: linear-gradient(
    120deg,
    #0f6f9e 0%,
    #168fc8 55%,
    #2aa9e3 100%
  ) !important;

  color: #ffffff !important;
  font-family: inherit !important;
  font-size: 14px !important;
  font-weight: 800 !important;

  box-shadow: 0 9px 24px rgba(42, 169, 227, 0.24) !important;

  transition:
    background 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.25s ease !important;
}

.login-submit button:hover:not(:disabled),
.login-submit :deep(button:hover:not(:disabled)),
.login-submit :deep(.p-button:hover:not(:disabled)) {
  background: linear-gradient(
    120deg,
    #0b5c85 0%,
    #117fb4 55%,
    #168fc8 100%
  ) !important;

  box-shadow: 0 13px 30px rgba(42, 169, 227, 0.34) !important;
  transform: translateY(-2px);
}

.login-submit button:active:not(:disabled),
.login-submit :deep(button:active:not(:disabled)),
.login-submit :deep(.p-button:active:not(:disabled)) {
  transform: translateY(0);
  box-shadow: 0 4px 12px rgba(42, 169, 227, 0.2) !important;
}

.login-submit button:disabled,
.login-submit :deep(button:disabled),
.login-submit :deep(.p-button:disabled) {
  opacity: 0.6 !important;
  cursor: not-allowed !important;
  transform: none !important;
}

/* Mobile */
@media (max-width: 480px) {
  .login-page {
    padding-top: 32px;
    padding-bottom: 32px;
  }

  .login-card {
    border-radius: 22px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .login-card,
  .login-submit button {
    transition: none !important;
  }
}
</style>
