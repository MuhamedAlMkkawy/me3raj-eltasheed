import { defineStore } from "pinia";
import { createCookieStorage } from "~/utils/piniaCookieStorage";

export const useGlobalStore = defineStore(
  "globalStore",
  () => {
    // HANDLE THE LOADING WITH REFERENCE COUNTING TO AVOID RACE CONDITIONS
    const loading = ref(false);
    const activeRequests = ref(0);

    const startLoading = () => {
      activeRequests.value++;
      loading.value = true;
    };

    const stopLoading = () => {
      activeRequests.value = Math.max(0, activeRequests.value - 1);
      if (activeRequests.value === 0) {
        loading.value = false;
      }
    };

    // Backward compatibility helper
    const switchLoading = (forceValue?: boolean) => {
      if (typeof forceValue === 'boolean') {
        loading.value = forceValue;
        if (!forceValue) activeRequests.value = 0;
      } else {
        if (loading.value) {
          stopLoading();
        } else {
          startLoading();
        }
      }
    };

    // HANDLE THE LANGUAGE
    const lang = ref("ar");
    const setLang = (newLang: string) => {
      lang.value = newLang;
    };

    return {
      loading,
      activeRequests,
      startLoading,
      stopLoading,
      switchLoading,
      lang,
      setLang,
    };
  },
  {
    persist: {
      storage: createCookieStorage(60 * 60 * 24 * 30), // 30 days
    },
  },
);
