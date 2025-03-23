<template>
  <div class="bg-white shadow-md rounded-xl px-6 py-4 flex justify-between items-center w-full">
    <h1 class="text-xl font-bold text-gray-800 flex items-center gap-2">
      🍽️ <span>Recipe Recommender</span>
    </h1>
    <div class="space-x-4">
      <template v-if="loggedIn">
        <button
          @click="$emit('logout')"
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </template>
      <template v-else>
        <button
          @click="$emit('login')"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <button
          @click="$emit('register')"
          class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
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
})
defineEmits(['login', 'logout', 'register'])
</script>
