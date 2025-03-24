<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F3E9DC] via-[#FDF6EC] to-[#F3E9DC]">
    <div class="bg-white/90 border border-[#E6D3C4] shadow-xl rounded-3xl p-10 w-full max-w-md">
      <h2 class="text-3xl font-extrabold text-center text-[#4B3621] mb-6">Create Account 📝</h2>

      <form @submit.prevent="handleRegister" class="space-y-5">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full px-4 py-2 border border-[#D6B49C] rounded-md bg-[#FFFDF8] text-[#4B3621] focus:ring-2 focus:ring-[#B08968] placeholder:text-[#A47148]"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full px-4 py-2 border border-[#D6B49C] rounded-md bg-[#FFFDF8] text-[#4B3621] focus:ring-2 focus:ring-[#B08968] placeholder:text-[#A47148]"
          required
        />
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          class="w-full px-4 py-2 border border-[#D6B49C] rounded-md bg-[#FFFDF8] text-[#4B3621] focus:ring-2 focus:ring-[#B08968] placeholder:text-[#A47148]"
          required
        />

        <button
          type="submit"
          class="w-full bg-[#A47148] text-white font-semibold py-2 rounded-md hover:bg-[#8B5E3C] transition shadow-md"
        >
          🍂 Register
        </button>
      </form>

      <p class="text-center text-sm text-[#6B4C3B] mt-6">
        Already have an account?
        <RouterLink to="/login" class="font-semibold underline hover:text-[#4B3621] transition">
          Log in
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
const confirmPassword = ref('')
const router = useRouter()

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match')
    return
  }

  try {
    const response = await axios.post('http://localhost:5000/register', {
      username: email.value,
      password: password.value,
    })

    alert(response.data.message)
    localStorage.setItem('user', email.value)
    router.push('/')
  } catch (error) {
    alert(error.response?.data?.error || 'Registration failed')
  }
}
</script>
