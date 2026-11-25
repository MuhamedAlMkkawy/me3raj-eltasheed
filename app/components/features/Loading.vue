<template>
  <div
    class="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white/80 backdrop-blur-[8px]"
  >
    <div class="relative flex flex-col items-center justify-center gap-4">
      <img
        src="~/assets/images/logo.png"
        alt="معراج التشييد"
        loading="eager"
        class="w-[140px] h-[140px] object-contain animate-pulse"
      />
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-[#2AA9E3] animate-bounce [animation-delay:-0.3s]"></span>
        <span class="w-3 h-3 rounded-full bg-[#1F2A30] animate-bounce [animation-delay:-0.15s]"></span>
        <span class="w-3 h-3 rounded-full bg-[#2AA9E3] animate-bounce"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
