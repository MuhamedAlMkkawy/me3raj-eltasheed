<template>
  <div class="admin-layout min-h-screen flex  text-[#333333] font-body" dir="rtl">
    <!-- SIDEBAR -->
    <aside
      class="sidebar fixed inset-y-0 right-0 z-40 bg-[#1F2A30] text-white flex flex-col transition-all duration-300 w-64 shadow-xl"
      :class="{ '!w-20': isSidebarCollapsed }"
    >
      <!-- Logo Area -->
      <div class="h-20 flex items-center justify-between px-4 border-b border-[#2B3238]">
        <NuxtLink to="/admin" class="flex items-center gap-3 overflow-hidden">
          <img src="/logo.png" alt="معراج التشييد" class="h-10 w-10 object-contain shrink-0" />
          <div v-if="!isSidebarCollapsed" class="flex flex-col">
            <span class="font-heading font-bold text-sm tracking-wide text-white leading-tight">معراج التشييد</span>
            <span class="text-[11px] text-[#2AA9E3] font-normal">لوحة التحكم CMS</span>
          </div>
        </NuxtLink>
        <button
          @click="isSidebarCollapsed = !isSidebarCollapsed"
          class="p-1.5 rounded-lg text-[#C7D8E1] hover:bg-[#2B3238] hover:text-white transition-colors"
          :title="isSidebarCollapsed ? 'توسيع' : 'طي'"
        >
          <i :class="isSidebarCollapsed ? 'pi pi-angle-left' : 'pi pi-angle-right'"></i>
        </button>
      </div>

      <!-- Navigation Links -->
      <nav class="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        <template v-for="link in filteredNavLinks" :key="link.to">
          <NuxtLink
            :to="localeRoute(link.to)"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group"
            :class="[
              isActiveRoute(link.to)
                ? 'bg-[#2AA9E3] !text-[#1F2A30] font-bold shadow-md'
                : 'text-[#C7D8E1] hover:bg-[#2B3238] hover:text-white'
            ]"
            :title="isSidebarCollapsed ? link.labelAr : ''"
          >
            <i :class="[link.icon || 'pi pi-circle', 'text-base shrink-0']"></i>
            <span v-if="!isSidebarCollapsed" class="truncate">{{ link.labelAr }}</span>
          </NuxtLink>
        </template>
      </nav>

      <!-- User Info & Logout -->
      <div class="p-3 border-t border-[#2B3238] bg-[#182025]">
        <div v-if="!isSidebarCollapsed" class="flex items-center gap-3 mb-3 px-2">
          <div class="w-9 h-9 rounded-full bg-[#2AA9E3] text-[#1F2A30] font-bold flex items-center justify-center shrink-0">
            {{ userInitial }}
          </div>
          <div class="flex flex-col truncate">
            <span class="text-xs font-semibold text-white truncate">{{ authStore.user?.name || 'المدير' }}</span>
            <span class="text-[10px] text-[#2AA9E3] uppercase">{{ roleLabel }}</span>
          </div>
        </div>
        <button
          @click="handleLogout"
          class="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
        >
          <i class="pi pi-sign-out"></i>
          <span v-if="!isSidebarCollapsed">تسجيل الخروج</span>
        </button>
      </div>
    </aside>

    <!-- MAIN CONTENT WRAPPER -->
    <div
      class="flex-1 flex flex-col min-h-screen transition-all duration-300"
      :class="isSidebarCollapsed ? 'mr-20' : 'mr-64'"
    >
      <!-- Topbar Header -->
      <header class="h-20 bg-white border-b border-[#C7D8E1] px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div class="flex items-center gap-4">
          <h1 class="text-xl font-heading font-bold text-[#1F2A30]">
            {{ currentSectionTitle }}
          </h1>
        </div>

        <div class="flex items-center gap-3">
          <!-- View Site Button -->
          <NuxtLink
            to="/"
            target="_blank"
            class="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[#C7D8E1] text-xs font-medium text-[#1F2A30] hover: hover:border-[#2AA9E3] transition-colors"
          >
            <i class="pi pi-external-link text-[#0F6F9E]"></i>
            <span>عرض الموقع المباشر</span>
          </NuxtLink>

          <!-- Current User Badge -->
          <div class="flex items-center gap-2 pl-2 border-r border-[#C7D8E1]">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span class="text-xs text-[#44505A] font-medium hidden sm:inline">{{ authStore.user?.email }}</span>
          </div>
        </div>
      </header>

      <!-- Main Body Container -->
      <main class="flex-1 p-6 max-w-7xl w-full mx-auto">
        <slot />
      </main>

      <!-- Admin Footer -->
      <footer class="py-4 px-6 border-t border-[#C7D8E1] text-center text-xs text-[#44505A]">
        نظام إدارة المحتوى CMS | شركة معراج التشييد للمقاولات العامة &copy; 2026
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ADMIN_NAV_LINKS } from "~/config/navigation";
import { useAuthStore } from "~/stores/authStore";
import { useApiMethods } from "~/composables/useApiMethods";
import { API_ENDPOINTS } from "~/config/endpoints";

const isSidebarCollapsed = ref(false);
const route = useRoute();
const router = useRouter();
const localeRoute = useLocaleRoute();
const authStore = useAuthStore();
const { submitMethod } = useApiMethods();

const filteredNavLinks = computed(() => {
  return ADMIN_NAV_LINKS.filter((item) => {
    if (!item.permission) return true;
    return authStore.can(item.permission as any);
  });
});

const currentPath = computed(() => {
  return route.path.replace(/^\/(ar|en)/, '') || '/admin';
});

const isActiveRoute = (path: string) => {
  if (path === '/admin') {
    return currentPath.value === '/admin';
  }
  return currentPath.value.startsWith(path);
};

const currentSectionTitle = computed(() => {
  const matched = ADMIN_NAV_LINKS.find((i) => isActiveRoute(i.to));
  return matched?.labelAr || 'لوحة التحكم';
});

const userInitial = computed(() => {
  return (authStore.user?.name || 'م')[0].toUpperCase();
});

const roleLabel = computed(() => {
  const role = authStore.user?.role;
  if (role === 'super_admin') return 'مدير النظام (Super Admin)';
  if (role === 'admin') return 'مدير';
  return 'محرر محتوى';
});

const handleLogout = async () => {
  await submitMethod(API_ENDPOINTS.AUTH.LOGOUT, true, {});
  authStore.logout();
  router.push(localeRoute('/admin/login'));
};
</script>
