<template>
  <div
    class="bg-white rounded-lg shadow hover:shadow-md transition cursor-pointer overflow-hidden"
    @click="$emit('open', recipe)"
  >
    <img
      :src="recipe.Images?.[0]"
      alt="Dish Image"
      class="h-40 w-full object-cover"
    />
    <div class="p-4">
      <h3 class="text-lg font-semibold truncate">{{ recipe.Name }}</h3>
      <p class="text-sm text-gray-500 line-clamp-2">{{ recipe.Description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  recipe: Object,
})
defineEmits(['open'])
</script>
