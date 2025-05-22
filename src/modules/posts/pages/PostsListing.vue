<script setup>
import {useQuery} from "@tanstack/vue-query";
import {getAllPosts} from "@/modules/posts/sdk/api.js";
import Card from 'primevue/card'
import Button from 'primevue/button'
import Comments from "@/modules/comments/pages/Comments.vue";
import ActionMenuItem from "@/components/ActionMenuItem.vue";
import ActionMenu from "@/components/ActionMenu.vue";
import {inject} from "vue";

const {data: posts, isLoading: postsLoading} = useQuery({
  queryKey: ["posts"],
  queryFn: getAllPosts,
})

const showCreatePostPopup = inject("showCreatePostPopup")
const createPost = async () => {
  await showCreatePostPopup()
}

const showEditPostPopup = inject("showEditPostPopup")
const editPost = async (data) => {
  await showEditPostPopup({...data})
}

const showDeletePostPopup = inject("showDeletePostPopup")
const deletePost = async (data) => {
  await showDeletePostPopup({...data})
}

const showCreateCommentPopup = inject("showCreateCommentPopup")
const createComment = async (data) => {
  await showCreateCommentPopup({...data});
}
</script>

<template>
  <div>
    <div class="text-end mb-4">
      <Button label="Add Post" severity="help" @click="createPost" />
    </div>
    <div v-if="postsLoading">Loading...</div>
    <div v-else class="d-flex gap-3 flex-wrap">
      <Card
          v-for="post in posts"
          :key="post.postId"
          style="width: 370px; overflow: hidden"
      >
        <template #title>
          <div class="d-flex justify-content-between">
            <p>{{post.title}}</p>
            <ActionMenu>
              <ActionMenuItem @click="editPost(post)">Edit</ActionMenuItem>
              <ActionMenuItem severity="danger" @click="deletePost(post)">Delete</ActionMenuItem>
            </ActionMenu>
          </div>
        </template>
        <template #subtitle>Author: {{ post.userId }}</template>
        <template #content>
          <p class="m-0">
            {{ post.content }}
          </p>
          <Comments :post-id="post.postId" />
        </template>
        <template #footer>
          <div class="d-flex mt-1">
            <Button label="Add comment" class="w-100" @click="createComment(post)" />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>

</style>