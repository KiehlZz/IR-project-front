<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <RouterView />
  </div>
</template>
<style>


html, body, #app {
  height: max-content;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
