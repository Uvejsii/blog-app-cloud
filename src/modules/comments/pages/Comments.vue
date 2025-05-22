<script setup>
import {useQuery} from "@tanstack/vue-query";
import {getCommentsByPost} from "@/modules/comments/sdk/api.js";
import Skeleton from "primevue/skeleton";
import ActionMenu from "@/components/ActionMenu.vue";
import ActionMenuItem from "@/components/ActionMenuItem.vue";
import {computed, inject} from "vue";

const props = defineProps({
  postId: {
    type: String,
    required: true,
  },
})

const commentKey = computed(() => ['comments', props.postId])
const { data: comments, isLoading } = useQuery({
  queryKey: commentKey,
  queryFn: () => getCommentsByPost(props.postId),
})

const showDeleteCommentPopup = inject("showDeleteCommentPopup")
const deleteComment = async (data) => {
  await showDeleteCommentPopup({...data, commentKey});
}

const showEditCommentPopup = inject("showEditCommentPopup")
const editComment = async (data) => {
  await showEditCommentPopup({...data, commentKey});
}
</script>

<template>
  <div class="mt-3">
    <h5 class="text-sm font-bold">Comments:</h5>
    <div v-if="isLoading">
      <Skeleton width="100%" height="1.5rem" class="mb-2" />
      <Skeleton width="80%" height="1.5rem" class="mb-2" />
    </div>
    <ul v-else>
      <li v-for="comment in comments" :key="comment.commentId" class="text-sm mb-1">
        <div class="d-flex justify-content-between">
          <p class="m-0">
            <strong>{{ comment.userId }}:</strong> {{ comment.content }}
          </p>
          <ActionMenu>
            <ActionMenuItem @click="editComment(comment)">Edit</ActionMenuItem>
            <ActionMenuItem severity="danger" @click="deleteComment(comment)">Delete</ActionMenuItem>
          </ActionMenu>
        </div>
      </li>
      <li v-if="comments.length === 0" class="text-sm text-muted">No comments yet.</li>
    </ul>
  </div>
</template>

<style scoped>

</style>