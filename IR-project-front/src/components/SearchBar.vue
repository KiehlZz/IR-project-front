<template>
  <div class="w-full max-w-xl flex gap-3 items-center">
    <!-- Input Field -->
    <input
      v-model="localQuery"
      @keydown.enter="emitSearch"
      type="text"
      placeholder="🔍 Find your cozy recipe..."
      class="flex-1 px-4 py-2 rounded-lg border border-[#D6B49C] bg-[#FFFDF8] text-[#4B3621] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B08968]"
    />

    <!-- Button -->
    <button
      @click="emitSearch"
      class="bg-[#A47148] text-white px-5 py-2 rounded-lg hover:bg-[#8B5E3C] transition shadow-md"
    >
      ☕ Search
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const localQuery = ref('')
const emit = defineEmits(['search'])

const emitSearch = () => {
  emit('search', localQuery.value)
}
</script>
