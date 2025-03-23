<template>
  <div class="w-full max-w-9xl mx-auto">
    <!-- Navbar -->
    <HeaderCard :loggedIn="!!user" @login="goToLogin" @logout="logout" />

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
import { useRouter } from 'vue-router'
import HeaderCard from '@/components/HeaderCard.vue'
import SearchBar from '@/components/SearchBar.vue'
import RecipeCard from '@/components/RecipeCard.vue'
import RecipeModal from '@/components/RecipeModal.vue'

const router = useRouter()
const user = ref(localStorage.getItem('user'))
const selected = ref(null)
const results = ref([])

const handleSearch = async (query) => {
  const res = await axios.get('http://localhost:5000/search', {
    params: { q: query },
  })
  results.value = res.data
}

const goToLogin = () => {
  router.push('/login')
}

const logout = () => {
  localStorage.removeItem('user')
  user.value = null
}
</script>
