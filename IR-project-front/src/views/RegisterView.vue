<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-100 to-green-200"
  >
    <div class="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Create Account 📝</h2>
      <form @submit.prevent="handleRegister" class="space-y-4">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-400"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-400"
          required
        />
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-400"
          required
        />
        <button
          type="submit"
          class="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
        >
          Register
        </button>
      </form>
      <p class="text-center text-sm text-gray-600 mt-4">
        Already have an account?
        <RouterLink to="/login" class="text-green-500 hover:underline">Log in</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const handleRegister = () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match')
    return
  }
  alert(`Register with ${email.value} / ${password.value}`)
  // TODO: API register call
}
</script>
