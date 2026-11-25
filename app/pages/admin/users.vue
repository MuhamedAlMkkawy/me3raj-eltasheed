<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold font-heading text-[#1F2A30]">إدارة المستخدمين والأدوار</h2>
        <p class="text-xs text-[#44505A]">تحكم في حسابات مديري النظام ومحرري المحتوى وصلاحيات الوصول.</p>
      </div>
      <button
        v-if="authStore.user?.role === 'super_admin'"
        type="button"
        class="main-btn sm !m-0"
        @click="openAddDialog"
      >
        <i class="pi pi-user-plus"></i>
        <span>إضافة مستخدم جديد</span>
      </button>
    </div>

    <!-- Users Table -->
    <div class="bg-white rounded-xl border border-[#C7D8E1] shadow-sm overflow-hidden">
      <div v-if="users.length > 0" class="overflow-x-auto">
        <table class="w-full text-right text-xs">
          <thead class=" text-[#44505A] border-b border-[#C7D8E1]">
            <tr>
              <th class="p-3.5">الاسم</th>
              <th class="p-3.5">البريد الإلكتروني</th>
              <th class="p-3.5">الدور والصلاحية</th>
              <th class="p-3.5">الحالة</th>
              <th class="p-3.5 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#C7D8E1]">
            <tr v-for="u in users" :key="u.id" class="hover:/50 transition-colors">
              <td class="p-3.5">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-full bg-[#2AA9E3]/20 text-[#0F6F9E] font-bold flex items-center justify-center">
                    {{ u.name[0] }}
                  </div>
                  <span class="font-bold text-[#1F2A30] text-sm">{{ u.name }}</span>
                </div>
              </td>
              <td class="p-3.5 font-mono text-[#0F6F9E]">{{ u.email }}</td>
              <td class="p-3.5">
                <span
                  class="px-2.5 py-1 rounded-full text-[10px] font-bold"
                  :class="[
                    u.role === 'super_admin' ? 'bg-purple-100 text-purple-700' :
                    u.role === 'admin' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  ]"
                >
                  {{ u.role === 'super_admin' ? 'مدير عام (Super Admin)' : u.role === 'admin' ? 'مدير' : 'محرر محتوى' }}
                </span>
              </td>
              <td class="p-3.5">
                <span
                  class="px-2.5 py-0.5 rounded-full text-[10px] font-bold"
                  :class="u.active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'"
                >
                  {{ u.active ? 'مفعل' : 'معطل' }}
                </span>
              </td>
              <td class="p-3.5">
                <div class="flex items-center justify-center gap-2">
                  <button
                    v-if="authStore.user?.role === 'super_admin' && u.id !== authStore.user?.id"
                    type="button"
                    class="p-1.5 rounded-lg border border-red-200 hover:bg-red-50 text-red-500"
                    title="حذف"
                    @click="confirmDelete(u)"
                  >
                    <i class="pi pi-trash"></i>
                  </button>
                  <span v-else class="text-gray-400 text-[11px]">-</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add User Dialog -->
    <Dialog
      v-model:visible="showDialog"
      modal
      header="إضافة مستخدم جديد للنظام"
      :style="{ width: '450px', maxWidth: '95vw' }"
    >
      <div class="space-y-4 pt-2">
        <FormCustomField
          name="newUserName"
          label="الاسم الكامل"
          v-model="newUser.name"
          placeholder="محمد الشمري"
          required
        />
        <FormCustomField
          name="newUserEmail"
          label="البريد الإلكتروني"
          type="email"
          v-model="newUser.email"
          placeholder="m.shammari@me3raj.sa"
          required
        />
        <FormCustomField
          name="newUserPassword"
          label="كلمة المرور المؤقتة"
          type="password"
          v-model="newUser.password"
          placeholder="••••••••"
          required
        />
        <div class="flex flex-col gap-1">
          <label class="font-medium text-sm text-[#1F2A30]">الدور والصلاحيات</label>
          <select
            v-model="newUser.role"
            class="w-full px-3 py-2 border rounded-lg text-sm border-[#C7D8E1] bg-white"
          >
            <option value="editor">محرر محتوى (إدارة المشاريع والخدمات)</option>
            <option value="admin">مدير (جميع الصلاحيات عدا إدارة المستخدمين)</option>
            <option value="super_admin">مدير عام (Super Admin - صلاحية كاملة)</option>
          </select>
        </div>

        <div class="pt-4 flex items-center justify-end gap-2 border-t border-[#C7D8E1]">
          <button
            type="button"
            class="px-4 py-2 text-xs font-semibold rounded-lg border border-[#C7D8E1] hover:bg-gray-100"
            @click="showDialog = false"
          >
            إلغاء
          </button>
          <button
            type="button"
            class="main-btn sm !m-0"
            @click="createUser"
          >
            إضافة المستخدم
          </button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Dialog from "primevue/dialog";
import { useAuthStore } from "~/stores/authStore";
import { useApiMethods } from "~/composables/useApiMethods";
import { API_ENDPOINTS } from "~/config/endpoints";
import { useConfirmAction } from "~/composables/useConfirmAction";
import type { User, UserRole } from "~/types";

definePageMeta({
  layout: "admin",
  key: (r) => r.fullPath,
});

const authStore = useAuthStore();
const { getMethod, submitMethod } = useApiMethods();
const { requireConfirmation } = useConfirmAction();

const users = ref<User[]>([]);
const showDialog = ref(false);

const newUser = ref<{
  name: string;
  email: string;
  password: string;
  role: UserRole;
}>({
  name: "",
  email: "",
  password: "",
  role: "editor",
});

const loadUsers = async () => {
  const res = await getMethod(API_ENDPOINTS.ADMIN.USERS, {}, true);
  if (res?.data) {
    users.value = res.data;
  }
};

const openAddDialog = () => {
  newUser.value = {
    name: "",
    email: "",
    password: "",
    role: "editor",
  };
  showDialog.value = true;
};

const createUser = async () => {
  if (!newUser.value.email || !newUser.value.password) return;
  const res = await submitMethod(API_ENDPOINTS.ADMIN.USERS, true, newUser.value, "POST");
  if (res?.data) {
    showDialog.value = false;
    await loadUsers();
  }
};

const confirmDelete = (u: User) => {
  requireConfirmation({
    header: "حذف المستخدم",
    message: `هل أنت متأكد من حذف حساب "${u.name}"؟`,
    onAccept: async () => {
      await submitMethod(API_ENDPOINTS.ADMIN.USER_ITEM(u.id), true, {}, "DELETE");
      await loadUsers();
    },
  });
};

onMounted(() => {
  loadUsers();
});
</script>
