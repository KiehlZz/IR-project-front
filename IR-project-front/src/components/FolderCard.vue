<template>
  <div
    class="bg-[#FFF7EF] border border-[#E6D3C4] rounded-xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex items-center justify-between"
    @click="$emit('open', folder)"
  >
    <!-- Left: Icon + Folder name -->
    <div class="flex items-center gap-4">
      <div class="bg-[#B08968] text-white p-2 rounded-full shadow-inner">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 7a2 2 0 012-2h5l2 2h7a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
        </svg>
      </div>
      <h3 class="text-md font-semibold text-[#4B3621] truncate">
        {{ folder.name }}
      </h3>
    </div>

    <!-- Right: View text -->
    <div class="text-sm text-[#A47148] font-medium">View →</div>
  </div>
</template>

<script setup>
defineProps({ folder: Object })
defineEmits(['open'])
</script>
