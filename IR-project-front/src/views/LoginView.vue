<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-blue-200">
      <div class="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Welcome 👋</h2>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Log In
          </button>
        </form>
        <p class="text-center text-sm text-gray-600 mt-4">
          Don't have an account?
          <RouterLink to="/register" class="text-blue-500 hover:underline">Register</RouterLink>
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const email = ref('')
  const password = ref('')
  
  const handleLogin = () => {
    alert(`Login with ${email.value} / ${password.value}`)
    // TODO: API login call
  }
  </script>
  