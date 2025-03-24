<template>
  <div
    class="bg-[#FFFDF8] border border-[#E6D3C4] rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
    @click="$emit('open', recipe)"
  >
    <!-- Image -->
    <div class="h-48 w-full overflow-hidden">
      <img
        :src="recipe.Images?.[0]"
        alt="Dish Image"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Text Content -->
    <div class="p-4">
      <h3 class="text-md font-semibold text-[#4B3621] truncate">{{ recipe.Name }}</h3>
      <p class="text-sm text-[#6B4C3B] mt-1 line-clamp-2">{{ recipe.Description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  recipe: Object,
})
defineEmits(['open'])
</script>
