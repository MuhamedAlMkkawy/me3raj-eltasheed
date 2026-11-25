<template>
  <div class="flex flex-col gap-[4px] w-full custom-field-group">
    <label :for="name" v-if="label" class="font-medium text-sm text-[#1F2A30]">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="input-wrapper relative" :class="{ 'has-error': error }">
      <!-- DATE PICKER -->
      <VeeField
        v-if="type === 'date'"
        :name="name"
        v-slot="{ value, handleChange }"
      >
        <DatePicker
          :model-value="value"
          :selectionMode="selectionMode"
          :placeholder="placeholder"
          :disabled="disabled"
          dateFormat="dd/mm/yy"
          class="w-full"
          @update:modelValue="
            (val) => {
              handleChange(val);
              emit('updateInputField', val);
            }
          "
        />
      </VeeField>

      <!-- SWITCH / TOGGLE -->
      <VeeField
        v-else-if="as === 'switch'"
        :name="name"
        v-slot="{ value, handleChange }"
      >
        <div class="flex items-center gap-3 py-2">
          <ToggleSwitch
            :model-value="!!value"
            :disabled="disabled"
            @update:modelValue="
              (val) => {
                handleChange(val);
                emit('updateInputField', val);
              }
            "
          />
          <span v-if="placeholder" class="text-sm text-[#44505A]">{{ placeholder }}</span>
        </div>
      </VeeField>

      <!-- SELECT (PrimeVue Select or native fallback) -->
      <VeeField
        v-else-if="as === 'select'"
        :name="name"
        v-slot="{ value, handleChange }"
      >
        <Select
          :model-value="value"
          :options="options"
          optionLabel="label"
          optionValue="value"
          :placeholder="placeholder"
          :disabled="disabled"
          class="w-full"
          @update:modelValue="
            (val) => {
              handleChange(val);
              emit('updateInputField', val);
            }
          "
        />
      </VeeField>

      <!-- MULTI SELECT (PrimeVue) -->
      <VeeField
        v-else-if="as === 'multiselect'"
        :name="name"
        v-slot="{ value, handleChange }"
      >
        <MultiSelect
          :model-value="value"
          :options="options"
          optionLabel="label"
          optionValue="value"
          :placeholder="placeholder"
          :disabled="disabled"
          display="chip"
          class="w-full"
          @update:modelValue="
            (val) => {
              handleChange(val);
              emit('updateInputField', val);
            }
          "
        />
      </VeeField>

      <!-- TEXTAREA -->
      <VeeField
        v-else-if="as === 'textarea'"
        :name="name"
        v-slot="{ value, handleChange }"
      >
        <textarea
          :id="name"
          :value="value"
          :placeholder="placeholder"
          :rows="rows || 4"
          :disabled="disabled"
          class="w-full p-3 border rounded-lg resize-y focus:outline-none focus:ring-1 focus:ring-[#2AA9E3] border-[#C7D8E1]"
          @input="handleChange"
        ></textarea>
      </VeeField>

      <!-- INPUT (text, password, email, number, url, etc.) -->
      <VeeField
        v-else
        :name="name"
        v-slot="{ value, handleChange }"
      >
        <div class="relative w-full">
          <input
            :id="name"
            :type="inputType"
            :value="value"
            :placeholder="placeholder"
            :autofocus="autofocus"
            :disabled="disabled"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2AA9E3] border-[#C7D8E1]"
            @input="handleChange"
          />
          <button
            v-if="type === 'password'"
            type="button"
            class="absolute end-3 top-1/2 -translate-y-1/2 text-[#44505A] hover:text-[#1F2A30]"
            @click="showPassword = !showPassword"
          >
            <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
          </button>
        </div>
      </VeeField>
    </div>

    <p v-if="hint" class="text-xs text-[#44505A]">{{ hint }}</p>
    <VeeErrorMessage :name="name" class="text-xs text-red-500 mt-1" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import DatePicker from "primevue/datepicker";
import Select from "primevue/select";
import MultiSelect from "primevue/multiselect";
import ToggleSwitch from "primevue/toggleswitch";

const props = withDefaults(
  defineProps<{
    name: string;
    label?: string;
    as?: "input" | "select" | "multiselect" | "textarea" | "switch";
    type?: string;
    placeholder?: string;
    autofocus?: boolean;
    disabled?: boolean;
    required?: boolean;
    rows?: number;
    hint?: string;
    error?: string;
    options?: Array<{ label: string; value: any }>;
    selectionMode?: "single" | "multiple" | "range";
  }>(),
  {
    label: "",
    as: "input",
    type: "text",
    placeholder: "",
    autofocus: false,
    disabled: false,
    required: false,
    rows: 4,
    options: () => [],
    selectionMode: "single",
  }
);

const emit = defineEmits<{
  (e: "updateInputField", val: any): void;
}>();

const showPassword = ref(false);
const inputType = computed(() => {
  if (props.type === "password") {
    return showPassword.value ? "text" : "password";
  }
  return props.type;
});
</script>
