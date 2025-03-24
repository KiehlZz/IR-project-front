<template>
  <div class="min-h-screen bg-gradient-to-b from-[#F3E9DC] to-[#FDF6EC] py-10 px-6">
    <div class="max-w-6xl mx-auto space-y-10">
      
      <!-- Header with folder name -->
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-[#4B3621] flex items-center gap-2">
          📌 {{ folderName }}
        </h1>
        <button
          @click="goBack"
          class="bg-[#B08968] text-white px-4 py-2 rounded hover:bg-[#8B5E3C] transition"
        >
          ← Back
        </button>
      </div>

      <!-- Bookmarked Recipes -->
      <div v-if="bookmarks.length === 0" class="text-center text-[#C0A98F] mt-16 text-lg">
        📭 No bookmarks yet in this folder.
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <RecipeCard
          v-for="bookmark in bookmarks"
          :key="bookmark.recipe_id"
          :recipe="{ Name: bookmark.recipe_name, Images: [bookmark.recipe_image], Description: bookmark.recipe_description }"
          @open="fetchRecipe(bookmark.recipe_id)"
        />
      </div>
    </div>

    <RecipeModal v-if="selectedRecipe" :recipe="selectedRecipe" @close="selectedRecipe = null" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import RecipeCard from '@/components/RecipeCard.vue'
import RecipeModal from '@/components/RecipeModal.vue'

const route = useRoute()
const router = useRouter()
const folderId = route.params.id
const folderName = route.params.name
const bookmarks = ref([])
const selectedRecipe = ref(null)

const fetchBookmarks = async () => {
  try {
    const res = await axios.get('http://localhost:5000/bookmarks', {
      params: { folder_id: folderId }
    })
    bookmarks.value = res.data.bookmarks
  } catch (err) {
    alert('❌ Failed to load bookmarks')
  }
}

const fetchRecipe = async (recipeId) => {
  try {
    const res = await axios.get(`http://localhost:5000/recipes/${recipeId}`)
    selectedRecipe.value = res.data
  } catch (err) {
    alert('⚠️ Failed to load full recipe details')
  }
}


const goBack = () => router.push('/folders')

onMounted(fetchBookmarks)
</script>
