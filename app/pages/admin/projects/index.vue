<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-xl font-bold font-heading text-[#1F2A30]">إدارة المشاريع المنفذة</h2>
        <p class="text-xs text-[#44505A]">استعراض وتعديل وإضافة مشاريع الشركة السكنية والتجارية والصناعية.</p>
      </div>
      <NuxtLink
        to="/admin/projects/new"
        class="main-btn sm !m-0"
      >
        <i class="pi pi-plus"></i>
        <span>إضافة مشروع جديد</span>
      </NuxtLink>
    </div>

    <!-- Filter & Search Bar -->
    <div class="bg-white p-4 rounded-xl border border-[#C7D8E1] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
      <div class="relative w-full sm:w-72">
        <i class="pi pi-search absolute right-3 top-1/2 -translate-y-1/2 text-[#44505A]"></i>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="بحث عن مشروع أو عميل..."
          class="w-full pr-9 pl-3 py-2 border rounded-lg text-xs border-[#C7D8E1] focus:outline-none focus:border-[#2AA9E3]"
        />
      </div>

      <div class="flex items-center gap-2 w-full sm:w-auto">
        <select
          v-model="categoryFilter"
          class="px-3 py-2 border rounded-lg text-xs border-[#C7D8E1] bg-white text-[#1F2A30]"
        >
          <option value="all">جميع التصنيفات</option>
          <option value="تجاري وإداري">تجاري وإداري</option>
          <option value="سكني فاخر">سكني فاخر</option>
          <option value="صناعي ولوجستي">صناعي ولوجستي</option>
          <option value="طبي وصحي">طبي وصحي</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl border border-[#C7D8E1] shadow-sm overflow-hidden">
      <div v-if="filteredProjects.length > 0" class="overflow-x-auto">
        <table class="w-full text-right text-xs">
          <thead class=" text-[#44505A] border-b border-[#C7D8E1]">
            <tr>
              <th class="p-3.5">المشروع</th>
              <th class="p-3.5">التصنيف</th>
              <th class="p-3.5">العميل</th>
              <th class="p-3.5">الموقع / السنة</th>
              <th class="p-3.5">الحالة</th>
              <th class="p-3.5 text-center">مميز</th>
              <th class="p-3.5 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#C7D8E1]">
            <tr v-for="prj in filteredProjects" :key="prj.id" class="hover:/50 transition-colors">
              <td class="p-3.5">
                <div class="flex items-center gap-3">
                  <img
                    :src="prj.coverImage || '/logo.png'"
                    :alt="prj.title"
                    class="w-12 h-12 rounded-lg object-cover shrink-0 border border-[#C7D8E1]"
                  />
                  <div>
                    <span class="font-bold text-[#1F2A30] text-sm block">{{ prj.title }}</span>
                    <span class="text-[11px] text-[#44505A]">{{ prj.slug }}</span>
                  </div>
                </div>
              </td>
              <td class="p-3.5 text-[#0F6F9E] font-medium">{{ prj.category }}</td>
              <td class="p-3.5 text-[#44505A]">{{ prj.client || '-' }}</td>
              <td class="p-3.5 text-[#44505A]">
                <span>{{ prj.location }}</span>
                <span class="block text-[11px] text-gray-400">{{ prj.year }}</span>
              </td>
              <td class="p-3.5">
                <span
                  class="px-2.5 py-0.5 rounded-full text-[10px] font-bold"
                  :class="prj.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'"
                >
                  {{ prj.status === 'completed' ? 'مكتمل' : 'قيد التنفيذ' }}
                </span>
              </td>
              <td class="p-3.5 text-center">
                <i
                  class="pi"
                  :class="prj.featured ? 'pi-star-fill text-amber-400 text-base' : 'pi-star text-gray-300'"
                ></i>
              </td>
              <td class="p-3.5">
                <div class="flex items-center justify-center gap-2">
                  <NuxtLink
                    :to="`/admin/projects/${prj.id}`"
                    class="p-1.5 rounded-lg border border-[#C7D8E1] hover:border-[#2AA9E3] hover:text-[#0F6F9E] text-[#44505A]"
                    title="تعديل"
                  >
                    <i class="pi pi-pencil"></i>
                  </NuxtLink>
                  <button
                    type="button"
                    class="p-1.5 rounded-lg border border-red-200 hover:bg-red-50 text-red-500"
                    title="حذف"
                    @click="confirmDelete(prj)"
                  >
                    <i class="pi pi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="p-12 text-center text-sm text-[#44505A]">
        <i class="pi pi-folder-open text-4xl text-[#C7D8E1] mb-2 block"></i>
        لا توجد مشاريع مطابقة للبحث أو التصنيف.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useApiMethods } from "~/composables/useApiMethods";
import { API_ENDPOINTS } from "~/config/endpoints";
import { useConfirmAction } from "~/composables/useConfirmAction";
import type { Project } from "~/types";

definePageMeta({
  layout: "admin",
  key: (r) => r.fullPath,
});

const { getMethod, submitMethod } = useApiMethods();
const { requireConfirmation } = useConfirmAction();

const projects = ref<Project[]>([]);
const searchQuery = ref("");
const categoryFilter = ref("all");

const loadProjects = async () => {
  const res = await getMethod(API_ENDPOINTS.ADMIN.PROJECTS, {}, true);
  if (res?.data) {
    projects.value = res.data;
  }
};

const filteredProjects = computed(() => {
  return projects.value.filter((p) => {
    const matchesSearch =
      !searchQuery.value ||
      p.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesCategory =
      categoryFilter.value === "all" || p.category === categoryFilter.value;

    return matchesSearch && matchesCategory;
  });
});

const confirmDelete = (project: Project) => {
  requireConfirmation({
    header: "حذف المشروع",
    message: `هل أنت متأكد من حذف المشروع "${project.title}"؟ لا يمكن التراجع عن هذا الإجراء.`,
    onAccept: async () => {
      await submitMethod(API_ENDPOINTS.ADMIN.PROJECT_ITEM(project.id), true, {}, "DELETE");
      await loadProjects();
    },
  });
};

onMounted(() => {
  loadProjects();
});
</script>
