<script setup>
import { markRaw, ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useToast } from 'primevue/usetoast'
import InputText from 'primevue/inputtext'
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import {useUser} from "@/modules/auth/sdk/user.js";
import {editPost} from "@/modules/posts/sdk/api.js";

const visible = ref(true)
const props = defineProps(['data'])
const emit = defineEmits(['close'])
const toast = useToast()
const {user} = useUser();

const { validate, errors, values } = useForm({
  validationSchema: yup.object({
    title: yup.string().required('Title is required'),
    content: yup.string().required('Content is required'),
  }),
  initialValues: {
    postId: props.data.postId,
    userId: user.value?.email,
    title: props.data.title,
    content: props.data.content,
  }
})

const fields = ref([
  {
    fieldLabel: 'Title',
    ...useField('title'),
    component: markRaw(InputText)
  },
  {
    fieldLabel: 'Content',
    ...useField('content'),
    component: markRaw(InputText)
  }
])

const queryClient = useQueryClient()
const { mutate, isPending } = useMutation({
  mutationFn: () => editPost(values),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['posts']
    })
    emit('close', values)
    toast.add({
      severity: 'success',
      summary: 'Post Edited Successfully',
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
      style="width: 668px"
      @hide="cancel"
      header="Edit Post"
      :draggable="false"
      v-model:visible="visible"
      modal
  >
    <form @submit="submitForm" class="form-grid">
      <div v-for="field in fields" :key="field.name" class="form-grid__item" :class="field.classes">
        <label :for="field.name">{{ field.fieldLabel }}</label>
        <component
            :id="field.name"
            :is="field.component"
            v-bind="field.props"
            v-model="field.value"
        />
        <small class="form-grid__error">{{ errors[field.name] }}</small>
      </div>
    </form>
    <template #footer>
      <Button @click="cancel" severity="secondary" outlined>Cancel</Button>
      <Button @click="submitForm" :disabled="isPending">
        {{ isPending ? 'Editing...' : 'Edit' }}
      </Button>
    </template>
  </Dialog>
</template>

<style scoped></style>
