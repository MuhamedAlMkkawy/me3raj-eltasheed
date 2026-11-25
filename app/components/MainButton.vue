
<template>
  <button
    :type="type"
    :class="[
      'main-btn',
      `btn-${variant}`,
      size,
      { 'is-disabled': isDisabled }
    ]"
    :disabled="isDisabled"
    :aria-busy="isLoading"
    @click="onClick"
  >
    <!-- Loading -->
    <span
      v-if="isLoading"
      class="btn-spinner"
      aria-hidden="true"
    ></span>

    <!-- Icon -->
    <i
      v-else-if="icon"
      :class="['btn-icon', icon]"
      aria-hidden="true"
    ></i>

    <!-- Content -->
    <slot>
      <span class="btn-label">{{ label }}</span>
    </slot>

    <!-- Optional arrow for path buttons -->
    <i
      v-if="path && !isLoading"
      class="pi pi-arrow-left btn-arrow"
      aria-hidden="true"
    ></i>
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
    size: "md",
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

    if (target) {
      router.push(target);
    }

    return;
  }

  emit("click", event);
};
</script>

<style scoped>
/* =========================================
   Base Button
========================================= */

.main-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  min-height: 46px;
  padding: 0 22px;

  border: 1px solid transparent;
  border-radius: 12px;

  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.5;
  white-space: nowrap;

  cursor: pointer;
  user-select: none;
  outline: none;

  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease,
    opacity 0.2s ease;
}

.main-btn:focus-visible {
  outline: 3px solid rgba(42, 169, 227, 0.25);
  outline-offset: 3px;
}

.btn-label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
}

.btn-arrow {
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  transition: transform 0.2s ease;
}

.main-btn:hover .btn-arrow {
  transform: translateX(-3px);
}

/* =========================================
   Primary
========================================= */

.btn-primary {
  color: #ffffff;
  background: linear-gradient(
    135deg,
    #0F6F9E 0%,
    #168FC8 55%,
    #2AA9E3 100%
  );

  border-color: transparent;

  box-shadow: 0 5px 14px rgba(15, 111, 158, 0.18);
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(
    135deg,
    #0B5C85 0%,
    #117FB4 55%,
    #168FC8 100%
  );

  box-shadow: 0 8px 20px rgba(42, 169, 227, 0.28);
  transform: translateY(-2px);
}

.btn-primary:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 3px 8px rgba(15, 111, 158, 0.2);
}

/* =========================================
   Dark
========================================= */

.btn-dark {
  color: #ffffff;
  background: #1F2A30;
  border-color: #1F2A30;
}

.btn-dark:hover:not(:disabled) {
  background: #333F46;
  border-color: #333F46;
  box-shadow: 0 6px 16px rgba(31, 42, 48, 0.18);
  transform: translateY(-2px);
}

/* =========================================
   Outline Primary
========================================= */

.btn-outline {
  color: #0F6F9E;
  background: #ffffff;
  border-color: #C7D8E1;
}

.btn-outline:hover:not(:disabled) {
  color: #ffffff;
  background: #0F6F9E;
  border-color: #0F6F9E;
  box-shadow: 0 5px 14px rgba(15, 111, 158, 0.16);
}

/* =========================================
   Outline Dark
========================================= */

.btn-outline-dark {
  color: #1F2A30;
  background: transparent;
  border-color: #C7D8E1;
}

.btn-outline-dark:hover:not(:disabled) {
  color: #ffffff;
  background: #1F2A30;
  border-color: #1F2A30;
}

/* =========================================
   Sizes
========================================= */

.main-btn.sm {
  min-height: 36px;
  padding: 0 15px;
  border-radius: 9px;
  font-size: 12px;
  gap: 7px;
}

.main-btn.md {
  min-height: 46px;
  padding: 0 22px;
  font-size: 14px;
}

.main-btn.lg {
  min-height: 54px;
  padding: 0 28px;
  border-radius: 14px;
  font-size: 15px;
  gap: 12px;
}

/* =========================================
   Loading
========================================= */

.btn-spinner {
  width: 17px;
  height: 17px;
  flex-shrink: 0;

  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;

  animation: btn-spin 0.7s linear infinite;
}

@keyframes btn-spin {
  to {
    transform: rotate(360deg);
  }
}

/* =========================================
   Disabled
========================================= */

.main-btn:disabled,
.main-btn.is-disabled {
  opacity: 0.55;
  cursor: not-allowed;
  pointer-events: none;
  transform: none !important;
  box-shadow: none !important;
}

/* =========================================
   Responsive
========================================= */

@media (prefers-reduced-motion: reduce) {
  .main-btn,
  .btn-arrow {
    transition: none;
  }

  .btn-spinner {
    animation-duration: 1.5s;
  }
}
</style>
