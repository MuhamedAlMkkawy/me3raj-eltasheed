import { defineStore } from "pinia";
import { createCookieStorage } from "~/utils/piniaCookieStorage";
import type { User, UserRole } from "~/types";
import { hasPermission, type PermissionKey } from "~/config/permissions";

export const useAuthStore = defineStore(
  "authStore",
  () => {
    const user = ref<User | null>(null);
    const token = ref<string | null>(null);

    const isAuthenticated = computed(() => !!token.value && !!user.value);
    const userRole = computed<UserRole | undefined>(() => user.value?.role);

    const can = (permission: PermissionKey): boolean => {
      return hasPermission(userRole.value, permission);
    };

    const handleUserData = (newUser: User | null) => {
      user.value = newUser;
    };

    const handleToken = (newToken: string | null) => {
      token.value = newToken;
    };

    const setAuth = (authData: { user: User; token: string }) => {
      user.value = authData.user;
      token.value = authData.token;
    };

    const logout = () => {
      user.value = null;
      token.value = null;
      const cookie = useCookie("authStore");
      cookie.value = null;
    };

    return {
      user,
      token,
      isAuthenticated,
      userRole,
      can,
      handleUserData,
      handleToken,
      setAuth,
      logout,
    };
  },
  {
    persist: {
      storage: createCookieStorage(60 * 60 * 24 * 7), // 7 days
    },
  },
);
