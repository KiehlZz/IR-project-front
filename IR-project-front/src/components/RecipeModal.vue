<template>
  <div class="fixed inset-0 bg-[#4B362180] backdrop-blur-sm flex items-center justify-center z-50">
    <div
      class="bg-[#FFFDF8] border border-[#E6D3C4] w-full max-w-3xl p-6 rounded-2xl relative overflow-y-auto max-h-[90vh] shadow-lg"
    >
      <!-- Close Button -->
      <button
        @click="$emit('close')"
        class="absolute top-4 right-4 text-[#A47148] hover:text-red-500 text-3xl font-bold transition"
      >
        &times;
      </button>

      <!-- Bookmark Icon -->
      <button
        v-if="user"
        @click="showBookmark = !showBookmark"
        class="absolute top-4 left-4 text-yellow-500 text-2xl hover:text-yellow-600 transition"
      >
        📌
      </button>

      <!-- Bookmark Form -->
      <div v-if="showBookmark" class="mb-6 p-4 border rounded-xl bg-white space-y-4">
        <label class="block font-semibold text-[#4B3621]">Select Folder:</label>
        <select v-model="selectedFolder" class="w-full border rounded-md px-3 py-2">
          <option disabled value="">-- Choose folder --</option>
          <option v-for="f in folders" :key="f.id" :value="f.id">{{ f.name }}</option>
        </select>

        <div class="flex items-center space-x-2">
          <label class="font-semibold text-[#4B3621]">Rating:</label>
          <div class="flex space-x-1">
            <span
              v-for="star in 5"
              :key="star"
              @click="rating = star"
              class="cursor-pointer text-xl"
              :class="rating >= star ? 'text-yellow-500' : 'text-gray-300'"
            >
              ★
            </span>
          </div>
        </div>

        <button
          @click="bookmarkRecipe"
          class="bg-[#A47148] text-white px-4 py-2 rounded-md hover:bg-[#8B5E3C]"
        >
          Save Bookmark
        </button>
      </div>

      <!-- Title -->
      <h2 class="text-3xl font-bold text-[#4B3621] mb-4">{{ recipe.Name }}</h2>

      <!-- Image -->
      <img
        :src="recipe.Images?.[0]"
        alt="Dish Image"
        class="w-full h-64 object-cover rounded-xl mb-6 shadow-sm"
      />

      <!-- Description -->
      <p class="text-[#6B4C3B] mb-6 text-[15px] leading-relaxed">{{ recipe.Description }}</p>

      <!-- Ingredients -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-[#4B3621] mb-2">🧂 Ingredients</h3>
        <ul class="list-disc list-inside space-y-1 text-[#5C4330] text-sm">
          <li v-for="(ingredient, i) in recipe.RecipeIngredientParts" :key="i">
            {{ recipe.RecipeIngredientQuantities?.[i] || '?' }} — {{ ingredient }}
          </li>
        </ul>
      </div>

      <!-- Instructions -->
      <div>
        <h3 class="text-lg font-semibold text-[#4B3621] mb-2">👨‍🍳 Instructions</h3>
        <ol class="list-decimal list-inside space-y-2 text-[#5C4330] text-sm">
          <li v-for="(step, i) in recipe.RecipeInstructions" :key="i">{{ step }}</li>
        </ol>
      </div>
    </div>

    <!-- Expanded Image Modal -->
    <div
      v-if="isImageExpanded"
      class="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
      @click="isImageExpanded = false"
    >
      <img
        :src="recipe.Images?.[0]"
        alt="Full Dish"
        class="max-w-full max-h-full rounded-lg shadow-lg"
      />
      <button
        class="absolute top-6 right-6 text-white text-4xl font-bold hover:text-red-400 transition"
        @click.stop="isImageExpanded = false"
      >
        &times;
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps({ recipe: Object })
defineEmits(['close'])
const isImageExpanded = ref(false)

const showBookmark = ref(false)
const folders = ref([])
const selectedFolder = ref('')
const rating = ref(0)
const user = localStorage.getItem('user')

const fetchFolders = async () => {
  try {
    const res = await axios.get('http://localhost:5000/folders', {
      params: { username: user },
    })
    folders.value = res.data
  } catch (err) {
    console.error('Failed to load folders')
  }
}

const bookmarkRecipe = async () => {
  if (!selectedFolder.value || rating.value === 0) {
    alert('Please select folder and rating 🌟')
    return
  }

  try {
    await axios.post('http://localhost:5000/bookmark', {
      folder_id: selectedFolder.value,
      recipe_id: props.recipe.id || props.recipe.Name,
      recipe_name: props.recipe.Name,
      recipe_image: props.recipe.Images?.[0] || '', // ✅ Add this
      recipe_description: props.recipe.Description || '', // ✅ And this
      rating: rating.value,
    })
    alert('✅ Recipe bookmarked!')
    showBookmark.value = false
  } catch (err) {
    alert('❌ Failed to bookmark')
  }
}

onMounted(fetchFolders)
</script>
