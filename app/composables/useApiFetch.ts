// Common options configuration function
export const createFetchOptions = (authed = false, options: any = {}) => {
  const authStore = useAuthStore();
  const token = authStore?.token || authStore?.user?.token;
  const globalStore = useGlobalStore();
  const config = useRuntimeConfig();

  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;

  const headers: Record<string, string> = {
    lang: globalStore?.lang || 'ar',
    ...(authed && token ? { authorization: `Bearer ${token}` } : {}),
    ...(config.public?.secretKey ? { secretKey: config.public.secretKey as string } : {}),
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(options.headers || {}),
  };

  return {
    baseURL: options.baseURL !== undefined ? options.baseURL : (options.url?.startsWith('http') ? undefined : undefined),
    headers,
    ...options,
  };
};

// Unified API request function
export const apiRequest = async <T = any>(
  url: string,
  authed = false,
  { method = "GET", body, ...options }: any = {}
): Promise<{ data: T | null; error: any }> => {
  try {
    const fetchOptions = createFetchOptions(authed, options);
    
    // Clean up empty body for GET/HEAD
    const hasBody = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method.toUpperCase()) && body !== undefined;

    const response = await $fetch<T>(url, {
      ...fetchOptions,
      method,
      ...(hasBody ? { body } : {}),
    });

    return { data: response, error: null };
  } catch (error: any) {
    console.error(`[API Error] ${method} ${url}:`, error?.data || error?.message || error);
    return { data: null, error };
  }
};
