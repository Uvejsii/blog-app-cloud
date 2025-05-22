<script setup>
import { defineAsyncComponent, reactive, provide, markRaw } from 'vue'

function generateGUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

const CreatePostPopup = defineAsyncComponent(
    () => import('@/modules/posts/popups/CreatePostPopup.vue')
)
const DeletePostPopup = defineAsyncComponent(
    () => import('@/modules/posts/popups/DeletePostPopup.vue')
)
const EditPostPopup = defineAsyncComponent(
    () => import('@/modules/posts/popups/EditPostPopup.vue')
)

const CreateCommentPopup = defineAsyncComponent(
    () => import('@/modules/comments/popups/CreateCommentPopup.vue')
)
const EditCommentPopup = defineAsyncComponent(
    () => import('@/modules/comments/popups/EditCommentPopup.vue')
)
const DeleteCommentPopup = defineAsyncComponent(
    () => import('@/modules/comments/popups/DeleteCommentPopup.vue')
)

const popups = reactive([])

const showPopup = (popup, data) => {
  const newPopup = {
    id: generateGUID(),
    popup: markRaw(popup),
    data
  }

  let resolvePromise
  const promise = new Promise((resolve) => {
    resolvePromise = resolve
  })

  newPopup.promiseResolver = resolvePromise

  popups.push(newPopup)

  return promise
}

function closePopup(popup, data) {
  const index = popups.findIndex((p) => p.id === popup.id)
  if (index !== -1) {
    popup.promiseResolver(data)

    setTimeout(() => {
      popups.splice(index, 1)
    }, 10)
  }
}

provide('showCreatePostPopup', (data) => showPopup(markRaw(CreatePostPopup), data))
provide('showEditPostPopup', (data) => showPopup(markRaw(EditPostPopup), data))
provide('showDeletePostPopup', (data) => showPopup(markRaw(DeletePostPopup), data))

provide('showCreateCommentPopup', (data) => showPopup(markRaw(CreateCommentPopup), data))
provide('showEditCommentPopup', (data) => showPopup(markRaw(EditCommentPopup), data))
provide('showDeleteCommentPopup', (data) => showPopup(markRaw(DeleteCommentPopup), data))
</script>

<template>
  <div class="popups">
    <template v-for="(popup, idx) in popups" :key="popup.id">
      <component
          :is="popup.popup"
          :data="popup.data"
          :class="`popup--${idx}`"
          :is-last="idx === popups.length - 1"
          :style="{ opacity: idx === popups.length - 1 ? 1 : 0 }"
          @close="(data) => closePopup(popup, data)"
      />
    </template>
    <slot />
  </div>
</template>
