import { useRouter } from "vue-router";
import { useGlobalStore } from "@/stores/globalStore";
import { useAuthStore } from "@/stores/authStore";
import { useToastMsg } from "@/composables/useToastMsg";
import { apiRequest } from "@/composables/useApiFetch";
import { ref, computed } from "vue";

export function useApiMethods() {
  const globalStore = useGlobalStore();
  const authStore = useAuthStore();
  const router = useRouter();
  const localeRoute = useLocaleRoute();
  const { showErrorToast, showSuccessToast, showInfoToast, showWarnToast } = useToastMsg();

  const loading = computed(() => globalStore.loading);

  const handleNextRoute = (nextRoute?: string) => {
    if (!nextRoute) return;
    setTimeout(() => {
      if (nextRoute === "reload_page") {
        if (typeof window !== 'undefined') window.location.reload();
      } else {
        router.push(localeRoute(nextRoute));
      }
    }, 400);
  };

  const handleToastMsg = (type: string, message?: string) => {
    if (!message) return;
    if (type === "success" || type === "needActive" || type === "ok") {
      showSuccessToast(message);
    } else if (type === "info") {
      showInfoToast(message);
    } else if (type === "warn") {
      showWarnToast(message);
    } else if (type === "error" || type === "failed") {
      showErrorToast(message);
    }
  };

  const getResult = ref<any>(null);
  const getMethod = async (endPoint: string, params: Record<string, any> = {}, authed = false, showToast = false) => {
    globalStore.startLoading();
    getResult.value = null;

    let finalUrl = endPoint;
    if (params && Object.keys(params).length > 0) {
      const cleanParams: Record<string, string> = {};
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') cleanParams[k] = String(v);
      });
      const queryString = new URLSearchParams(cleanParams).toString();
      if (queryString) {
        finalUrl = `${endPoint}?${queryString}`;
      }
    }

    const { data, error } = await apiRequest(finalUrl, authed, { method: "GET" });

    globalStore.stopLoading();

    if (error) {
      const errMsg = error?.data?.message || error?.response?._data?.message || error?.message || 'حدث خطأ في جلب البيانات';
      if (showToast) {
        handleToastMsg("error", errMsg);
      }

      const key = error?.data?.key || error?.response?._data?.key;
      if (key === "unauthenticated" || key === "unauthorized" || error?.statusCode === 401) {
        authStore.logout();
        handleNextRoute("/admin/login");
      }
      return null;
    } else {
      getResult.value = data;
      if (showToast && data?.message) {
        handleToastMsg(data?.key || 'success', data?.message);
      }
      return data;
    }
  };

  const submitResult = ref<any>(null);
  const submitMethod = async (
    endPoint: string,
    authed = false,
    payload: any = {},
    method = "POST",
    nextRoute?: string,
    refetchApi?: string
  ) => {
    globalStore.startLoading();

    const { data, error } = await apiRequest(endPoint, authed, {
      method,
      body: payload,
    });

    globalStore.stopLoading();

    if (error) {
      const errMsg = error?.data?.message || error?.response?._data?.message || error?.message || 'حدث خطأ أثناء معالجة الطلب';
      handleToastMsg("error", errMsg);

      const key = error?.data?.key || error?.response?._data?.key;
      if (key === "unauthenticated" || key === "unauthorized" || error?.statusCode === 401) {
        authStore.logout();
        handleNextRoute("/admin/login");
      }
      return null;
    } else {
      submitResult.value = { data, endPoint };

      if (data?.message) {
        handleToastMsg(data?.key || 'success', data.message);
      }

      if (refetchApi) {
        getMethod(refetchApi, {}, authed, false);
      }

      if (nextRoute) {
        handleNextRoute(nextRoute);
      }

      return data;
    }
  };

  return {
    loading,
    getMethod,
    getResult,
    submitMethod,
    submitResult,
    showErrorToast,
    showSuccessToast,
    handleNextRoute,
    handleToastMsg,
  };
}
