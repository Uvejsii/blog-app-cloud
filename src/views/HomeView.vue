<script setup>
import { ref, onMounted } from 'vue'

const posts = ref([])
const isLoading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await fetch('https://k3htr4drac.execute-api.us-east-1.amazonaws.com/Dev/api/Post/get_all_posts')

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    posts.value = data
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div>
    <div v-if="isLoading">Loading posts...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <h2>Posts</h2>
      <ul>
        <li v-for="post in posts" :key="post.id">
          <strong>{{ post.title }}</strong><br />
          {{ post.content }}
        </li>
      </ul>
    </div>
  </div>
</template>
