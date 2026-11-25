import { defineNuxtRouteMiddleware, navigateTo } from '#app';
import { useAuthStore } from '~/stores/authStore';
import { ADMIN_NAV_LINKS } from '~/config/navigation';
import type { PermissionKey } from '~/config/permissions';

export default defineNuxtRouteMiddleware((to) => {
  // Extract path without locale prefix
  const path = to.path.replace(/^\/(ar|en)/, '') || '/';
  const isAdminRoute = path.startsWith('/admin');
  const isLoginPage = path === '/admin/login';

  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;

  // Protect admin routes
  if (isAdminRoute) {
    if (!isAuthenticated && !isLoginPage) {
      return navigateTo('/admin/login');
    }

    if (isAuthenticated && isLoginPage) {
      return navigateTo('/admin');
    }

    // Check module permission if defined in navigation
    if (isAuthenticated && !isLoginPage) {
      const matchedNavItem = ADMIN_NAV_LINKS.find((item) => item.to === path);
      if (matchedNavItem?.permission) {
        if (!authStore.can(matchedNavItem.permission as PermissionKey)) {
          return navigateTo('/admin');
        }
      }
    }
  }
});
