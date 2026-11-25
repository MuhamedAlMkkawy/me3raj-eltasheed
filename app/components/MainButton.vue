<template>
  <button
    :type="type"
    :class="[
      'main-btn',
      variant ? `btn-${variant}` : '',
      size ? size : '',
      { disabled: isDisabled }
    ]"
    :disabled="isDisabled"
    @click="onClick"
  >
    <span
      v-if="isLoading"
      class="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent inline-block"
    ></span>
    <i v-if="icon && !isLoading" :class="icon"></i>
    <slot>
      <span>{{ label }}</span>
    </slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";

const props = withDefaults(
  defineProps<{
    label?: string;
    path?: string;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "dark" | "outline" | "outline-dark";
    size?: "sm" | "lg";
    icon?: string;
    loading?: boolean;
    disabled?: boolean;
  }>(),
  {
    label: "",
    path: "",
    type: "button",
    variant: "primary",
    loading: false,
    disabled: false,
  }
);

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

const router = useRouter();
const localeRoute = useLocaleRoute();

const isLoading = computed(() => props.loading);
const isDisabled = computed(() => props.disabled || props.loading);

const onClick = (event: MouseEvent) => {
  if (isDisabled.value) return;

  if (props.path) {
    const target = localeRoute(props.path);
    if (target) router.push(target);
  } else {
    emit("click", event);
  }
};
</script>
