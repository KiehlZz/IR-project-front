<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white w-full max-w-3xl p-6 rounded-lg relative overflow-y-auto max-h-[90vh]">
        <button
          @click="$emit('close')"
          class="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl"
        >
          &times;
        </button>
  
        <h2 class="text-2xl font-bold mb-2">{{ recipe.Name }}</h2>
  
        <img
          :src="recipe.Images?.[0]"
          alt="Dish Image"
          class="w-full h-64 object-cover rounded mb-4"
        />
  
        <p class="text-gray-700 mb-4">{{ recipe.Description }}</p>
  
        <div class="mb-4">
          <h3 class="font-semibold mb-1">Ingredients:</h3>
          <ul class="list-disc list-inside text-sm text-gray-600">
            <li
              v-for="(ingredient, i) in recipe.RecipeIngredientParts"
              :key="i"
            >
              {{ recipe.RecipeIngredientQuantities?.[i] || '?' }} — {{ ingredient }}
            </li>
          </ul>
        </div>
  
        <div>
          <h3 class="font-semibold mb-1">Instructions:</h3>
          <ol class="list-decimal list-inside text-sm text-gray-700 space-y-1">
            <li v-for="(step, i) in recipe.RecipeInstructions" :key="i">
              {{ step }}
            </li>
          </ol>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({ recipe: Object })
  defineEmits(['close'])
  </script>
  