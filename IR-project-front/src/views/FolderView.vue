<template>
  <div class="w-full max-w-10xl mx-auto">
    <HeaderCard :loggedIn="!!user" :hideFolders="true" @logout="logout" @goHome="goHome" />

    <div class="min-h-screen bg-gradient-to-b from-[#F3E9DC] to-[#FDF6EC] py-10 px-6">
      <div class="max-w-5xl mx-auto space-y-10">
        
        <!-- Autumn Header -->
        <h1 class="text-3xl font-bold text-[#4B3621] flex items-center gap-3">
          <span class="text-[#D2691E] text-4xl">📁</span> My Recipe Folders
        </h1>

        <!-- Create Folder Form -->
        <form @submit.prevent="createFolder" class="bg-[#FFF9F3] border border-[#E6D3C4] shadow rounded-xl p-6 space-y-4">
          <h2 class="text-lg font-semibold text-[#6B4C3B]">➕ Create New Folder</h2>
          <div class="flex gap-4 items-center">
            <input
              v-model="folderName"
              type="text"
              placeholder="Name your cozy folder..."
              class="flex-1 border border-[#D6B49C] rounded-md px-4 py-2 focus:ring-2 focus:ring-[#B08968] focus:outline-none bg-[#FFFDF8]"
              required
            />
            <button
              type="submit"
              class="bg-[#A47148] text-white px-6 py-2 rounded-md hover:bg-[#8B5E3C] transition"
            >
              Create
            </button>
          </div>
        </form>

        <!-- Folders Grid -->
        <div v-if="folders.length === 0" class="text-center text-[#C0A98F] mt-16 text-lg">
          🍂 No folders yet. Start your recipe collection!
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FolderCard
            v-for="folder in folders"
            :key="folder.id"
            :folder="folder"
            @open="openFolder(folder)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import HeaderCard from '@/components/HeaderCard.vue'
import FolderCard from '@/components/FolderCard.vue'

const folders = ref([])
const folderName = ref('')
const router = useRouter()
const user = localStorage.getItem('user')

const fetchFolders = async () => {
  try {
    const res = await axios.get('http://localhost:5000/folders', {
      params: { username: user },
    })
    folders.value = res.data
  } catch (err) {
    alert('⚠️ Failed to load folders')
  }
}

const createFolder = async () => {
  if (!folderName.value.trim()) return
  try {
    const res = await axios.post('http://localhost:5000/folders', {
      username: user,
      name: folderName.value.trim(),
    })
    folders.value.push({ id: res.data.folder_id, name: folderName.value.trim() })
    folderName.value = ''
  } catch (err) {
    alert('❌ Error creating folder')
  }
}

const openFolder = (folder) => {
  router.push({ name: 'FolderDetail', params: { id: folder.id, name: folder.name } })
}

const logout = () => {
  localStorage.removeItem('user')
  user.value = null
  router.push('/')
}

const goHome = () => {
  router.push('/')
}

onMounted(fetchFolders)
</script>

<!-- <template>
  <div class="w-full max-w-9xl mx-auto">
 
    <HeaderCard :loggedIn="!!user" :hideFolders="true" @logout="logout" @goHome="goHome" />

    <main class="max-w-2xl mx-auto p-6">
      <h2 class="text-2xl font-bold mb-4">📂 My Folders</h2>

      <form @submit.prevent="createFolder" class="flex gap-2 mb-6">
        <input
          v-model="folderName"
          type="text"
          placeholder="New folder name"
          class="flex-1 border px-4 py-2 rounded-md"
          required
        />
        <button class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          Create
        </button>
      </form>

      <ul class="space-y-4">
        <li v-for="folder in folders" :key="folder.id">
          <FolderCard :folder="folder" />
        </li>
      </ul>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import HeaderCard from '@/components/HeaderCard.vue'
import FolderCard from '@/components/FolderCard.vue'

const folderName = ref('')
const folders = ref([])
const user = ref(localStorage.getItem('user'))
const router = useRouter()

const fetchFolders = async () => {
  const res = await axios.get('http://localhost:5000/folders', {
    params: { user: user.value },
  })
  folders.value = res.data.folders
}

const createFolder = async () => {
  await axios.post('http://localhost:5000/folders', {
    name: folderName.value,
    user: user.value,
  })
  folderName.value = ''
  fetchFolders()
}

const logout = () => {
  localStorage.removeItem('user')
  user.value = null
  router.push('/')
}

const goHome = () => {
  router.push('/')
}

onMounted(fetchFolders)
</script> -->
