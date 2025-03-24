<template>
  <div class="w-full max-w-9xl mx-auto">
    <!-- Navbar -->
    <HeaderCard
      :loggedIn="!!user"
      @login="goToLogin"
      @logout="logout"
      @register="goToRegister"
      @goHome="goHome"
    />

    <!-- Main Section -->
    <main class="flex-1 flex flex-col items-center justify-start py-10 px-4 bg-gradient-to-b from-[#F3E9DC] to-[#FDF6EC] min-h-screen">
      <!-- Search bar -->
      <div class="w-full max-w-3xl mb-6">
        <SearchBar @search="handleSearch" />
      </div>

      <!-- Search Results -->
      <div class="w-full max-w-6xl">
        <div v-if="results.length === 0" class="text-center text-[#C0A98F] text-lg mt-16">
          ☕ No delicious results... try searching for something else!
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          <RecipeCard
            v-for="recipe in results"
            :key="recipe.Name"
            :recipe="recipe"
            @open="selected = recipe"
          />
        </div>
      </div>
    </main>

    <!-- Recipe Modal -->
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

  if (res.data.suggested && res.data.suggested !== query) {
    if (confirm(`Did you mean "${res.data.suggested}"?`)) {
      await handleSearch(res.data.suggested)
      return
    }
  }

  results.value = res.data.results
}

const goToLogin = () => router.push('/login')
const logout = () => {
  localStorage.removeItem('user')
  user.value = null
}
const goToRegister = () => router.push('/register')
const goHome = () => router.push('/')
</script>
