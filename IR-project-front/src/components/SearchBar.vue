<template>
  <div class="w-full max-w-xl flex gap-2">
    <input
      v-model="localQuery"
      @keydown.enter="emitSearch"
      type="text"
      placeholder="Search for recipes..."
      class="flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-400"
    />
    <button
      @click="emitSearch"
      class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
    >
      Search
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
