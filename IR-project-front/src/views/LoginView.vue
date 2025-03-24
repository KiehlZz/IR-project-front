<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F3E9DC] via-[#FDF6EC] to-[#F3E9DC]">
    <div class="bg-white/90 border border-[#E6D3C4] rounded-3xl shadow-xl p-10 w-full max-w-md">
      <h2 class="text-3xl font-extrabold text-center text-[#4B3621] mb-6">Welcome Back ☕</h2>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          autocomplete="off"
          class="w-full px-4 py-2 border border-[#D6B49C] rounded-md bg-[#FFFDF8] text-[#4B3621] focus:ring-2 focus:ring-[#B08968] placeholder:text-[#A47148]"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          autocomplete="off"
          class="w-full px-4 py-2 border border-[#D6B49C] rounded-md bg-[#FFFDF8] text-[#4B3621] focus:ring-2 focus:ring-[#B08968] placeholder:text-[#A47148]"
          required
        />

        <button
          type="submit"
          class="w-full bg-[#A47148] text-white font-semibold py-2 rounded-md hover:bg-[#8B5E3C] transition shadow-md"
        >
          🍁 Log In
        </button>
      </form>

      <p class="text-center text-sm text-[#6B4C3B] mt-6">
        Don't have an account?
        <RouterLink to="/register" class="font-semibold underline hover:text-[#4B3621] transition">
          Register here
        </RouterLink>
      </p>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const handleLogin = async () => {
  error.value = ''
  try {
    const res = await axios.post('http://localhost:5000/login', {
      username: email.value,
      password: password.value,
    })

    // Save user session
    localStorage.setItem('user', res.data.user)

    // Redirect to home page
    router.push('/')
  } catch (err) {
    error.value = err.response?.data?.message || 'Login failed. Please try again.'
  }
}
</script>