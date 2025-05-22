<script setup>
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import {useToast} from "primevue/usetoast";
import {deletePost} from "@/modules/posts/sdk/api.js";

const props = defineProps(['data'])
const emit = defineEmits(['close'])
const visible = ref(true)
const queryClient = useQueryClient()
const toast = useToast()

const { validate, values } = useForm({
  validationSchema: yup.object({
    id: yup.string().required(),
  }),
  initialValues: {
    id: props.data?.postId,
  }
})

const { mutate, isPending } = useMutation({
  mutationFn: () => deletePost(values),
  onSuccess: () => {
    queryClient.invalidateQueries({
      query: ['posts'],
    })
    emit('close', true)
    toast.add({
      severity: 'success',
      summary: 'Post Deleted Successfully',
      life: 5000
    })
  },
  onError: (error) => {
    toast.add({
      severity: 'error',
      summary: 'Something went wrong',
      detail: `Please try again. ${error.message}`,
      life: 5000
    })
  }
})

const submitForm = async () => {
  const isValid = await validate()

  if (isValid.valid) {
    mutate()
  }
}

const cancel = () => {
  emit('close', null)
}
</script>

<template>
  <Dialog
      v-model:visible="visible"
      @hide="cancel"
      style="width: 468px"
      :draggable="false"
      :header="`Delete ${data.title}?`"
      modal
  >
    <p>Are you sure that you want to delete <b>{{ data.content }}</b>?</p>
    <template #footer>
      <Button @click="cancel" severity="secondary" outlined>Cancel</Button>
      <Button @click="submitForm" :disabled="isPending" severity="danger">
        {{ isPending ? 'Deleting...' : 'Delete' }}
      </Button>
    </template>
  </Dialog>
</template>

<style scoped></style>
