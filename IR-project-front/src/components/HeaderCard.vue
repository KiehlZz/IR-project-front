<template>
  <div class="bg-[#FFF7EF] shadow-md rounded-xl px-6 py-4 flex justify-between items-center w-full border border-[#E6D3C4]">
    
    <!-- Logo / Home -->
    <h1
      class="text-2xl font-semibold text-[#4B3621] flex items-center gap-2 cursor-pointer hover:text-[#A47148] transition"
      @click="$emit('goHome')"
    >
      ☕ <span class="tracking-wide">Recipe Recommender</span>
    </h1>

    <!-- Right buttons -->
    <div class="flex gap-3">
      <template v-if="loggedIn">
        <RouterLink
          v-if="!hideFolders"
          to="/folders"
          class="bg-[#c6b00d] text-white px-4 py-2 rounded-lg hover:bg-[#b85a17] transition shadow-sm"
        >
          My Folders
        </RouterLink>

        <button
          @click="$emit('logout')"
          class="bg-[#e91506] text-white px-4 py-2 rounded-lg hover:bg-[#6B4C3B] transition shadow-sm"
        >
          Logout
        </button>
      </template>

      <template v-else>
        <button
          @click="$emit('login')"
          class="bg-[#2f77a7] text-white px-4 py-2 rounded-lg hover:bg-[#7a9299] transition shadow-sm"
        >
          Login
        </button>
        <button
          @click="$emit('register')"
          class="bg-[#46bc26] text-white px-4 py-2 rounded-lg hover:bg-[#7a9299] transition shadow-sm"
        >
          Register
        </button>
      </template>
    </div>
  </div>
</template>

<script setup>
defineProps({
  loggedIn: Boolean,
  hideFolders: Boolean
})
defineEmits(['login', 'logout', 'register', 'goFolders', 'goHome'])
</script>
