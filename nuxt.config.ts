// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primeuix/themes/aura";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },

  runtimeConfig: {
    // Private keys (Server only)
    googleSpreadsheetId: process.env.GOOGLE_SPREADSHEET_ID || "1tKA3MYCJeXTUjOI_SehSpJ1b4zpGNeLLnYE5adNnSE",
    googleDriveFolderId: process.env.GOOGLE_DRIVE_FOLDER_ID || "1nv5sBNxbN-jg7-qXPqRdjBAMMkx5_Tqz",
    googleServiceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "",
    googlePrivateKey: process.env.GOOGLE_PRIVATE_KEY || "",
    jwtSecret: process.env.JWT_SECRET || "me3raj-tashyeed-secret-key-2026-secure",
    adminInitialPassword: process.env.ADMIN_INITIAL_PASSWORD || "Admin@123456",

    public: {
      siteName: "معراج التشييد للمقاولات العامة",
      companyNameEn: "Me'raj Al-Tashyeed Contracting",
      googleSpreadsheetId: "1tKA3MYCJeXTUjOI_SehSpJ1b4zpGNeLLnYE5adNnSE",
      googleDriveFolderId: "1nv5sBNxbN-jg7-qXPqRdjBAMMkx5_Tqz",
    },
  },

  ssr: false,

  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
    head: {
      title: "معراج التشييد للمقاولات العامة | تميز في البناء وجودة في التنفيذ",
      htmlAttrs: { lang: "ar", dir: "rtl" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "شركة معراج التشييد للمقاولات العامة - ريادة في تنفيذ المشاريع الإنشائية، التشطيبات، والترميم وفق أعلى معايير الجودة في المملكة العربية السعودية.",
        },
        { name: "theme-color", content: "#2AA9E3" },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/logo.png" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap",
        },
      ],
    },
  },

  modules: [
    "@primevue/nuxt-module",
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@vee-validate/nuxt",
    "nuxt-yup",
  ],

  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: "VeeForm",
      Field: "VeeField",
      ErrorMessage: "VeeErrorMessage",
    },
  },

  imports: {
    dirs: ["stores", "composables", "helpers", "schemas", "types", "config"],
    presets: [
      {
        from: "vee-validate",
        imports: ["Field", "Form", "ErrorMessage", "useField", "useForm"],
      },
    ],
  },

  primevue: {
    autoImport: true,
    options: {
      zIndex: {
        modal: 3000,
      },
      ripple: true,
      theme: {
        preset: Aura,
        options: {
          prefix: "p",
          darkModeSelector: ".dark",
          cssLayer: true,
        },
      },
    },
  },

  i18n: {
    detectBrowserLanguage: false,
    locales: [
      {
        code: "ar",
        iso: "ar-SA",
        file: "ar.json",
        name: "العربية",
        dir: "rtl",
      },
      {
        code: "en",
        iso: "en-US",
        file: "en.json",
        name: "English",
        dir: "ltr",
      },
    ],
    langDir: "../app/locales/",
    defaultLocale: "ar",
  },

  css: ["@/assets/scss/main.scss", "primeicons/primeicons.css"],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "@/assets/scss/_variables.scss" as *;
          @use "@/assets/scss/_mixins.scss" as *;
        `,
        },
      },
    },
  },
});
