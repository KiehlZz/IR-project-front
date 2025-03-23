<template>
  <div class="container mx-auto p-6">
    <!-- Navbar -->
    <header class="bg-white shadow p-4 flex justify-between items-center">
      <h1 class="text-xl font-bold">🍽️ Recipe Recommender</h1>
    </header>

    <!-- Main content fills remaining space -->
    <main class="flex-1 flex flex-col items-center justify-start py-10 px-4 overflow-y-auto">
      <SearchBar @search="handleSearch" />

      <div class="mt-8 w-full max-w-6xl">
        <div v-if="results.length === 0" class="text-center text-gray-400">No results yet.</div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <RecipeCard
            v-for="recipe in results"
            :key="recipe.Name"
            :recipe="recipe"
            @open="selected = recipe"
          />
        </div>
      </div>
    </main>

    <RecipeModal v-if="selected" :recipe="selected" @close="selected = null" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import SearchBar from '@/components/SearchBar.vue'
import RecipeCard from '@/components/RecipeCard.vue'
import RecipeModal from '@/components/RecipeModal.vue'

const results = ref([])
const selected = ref(null)

const handleSearch = async (query) => {
  const res = await axios.get('http://localhost:5000/search', {
    params: { q: query },
  })
  results.value = res.data
}
</script>
