<template>
  <div class="fixed inset-0 bg-[#4B362180] backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-[#FFFDF8] border border-[#E6D3C4] w-full max-w-3xl p-6 rounded-2xl relative overflow-y-auto max-h-[90vh] shadow-lg">
      
      <!-- Close Button -->
      <button
        @click="$emit('close')"
        class="absolute top-4 right-4 text-[#A47148] hover:text-red-500 text-3xl font-bold transition"
      >
        &times;
      </button>

      <!-- Title -->
      <h2 class="text-3xl font-bold text-[#4B3621] mb-4">{{ recipe.Name }}</h2>

      <!-- Image (clickable) -->
      <img
        :src="recipe.Images?.[0]"
        alt="Dish Image"
        class="w-full h-64 object-cover rounded-xl mb-6 shadow-sm cursor-pointer"
        @click="isImageExpanded = true"
      />

      <!-- Description -->
      <p class="text-[#6B4C3B] mb-6 text-[15px] leading-relaxed">
        {{ recipe.Description }}
      </p>

      <!-- Ingredients -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-[#4B3621] mb-2">🧂 Ingredients</h3>
        <ul class="list-disc list-inside space-y-1 text-[#5C4330] text-sm">
          <li
            v-for="(ingredient, i) in recipe.RecipeIngredientParts"
            :key="i"
          >
            {{ recipe.RecipeIngredientQuantities?.[i] || '?' }} — {{ ingredient }}
          </li>
        </ul>
      </div>

      <!-- Instructions -->
      <div>
        <h3 class="text-lg font-semibold text-[#4B3621] mb-2">👨‍🍳 Instructions</h3>
        <ol class="list-decimal list-inside space-y-2 text-[#5C4330] text-sm">
          <li v-for="(step, i) in recipe.RecipeInstructions" :key="i">
            {{ step }}
          </li>
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
import { ref } from 'vue'

defineProps({ recipe: Object })
defineEmits(['close'])

const isImageExpanded = ref(false)
</script>
