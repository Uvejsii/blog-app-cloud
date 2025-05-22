<script setup>
import { markRaw, ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useToast } from 'primevue/usetoast'
import InputText from 'primevue/inputtext'
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import {createComment} from "@/modules/comments/sdk/api.js";
import {useUser} from "@/modules/auth/sdk/user.js";

const visible = ref(true)
const emit = defineEmits(['close'])
const props = defineProps(['data'])
const toast = useToast()
const {user} = useUser();

const { validate, errors, values } = useForm({
  validationSchema: yup.object({
    content: yup.string().required('Content is required'),
  }),
  initialValues: {
    commentId: '',
    userId: user.value?.email,
    PostId: props.data.postId,
    Content: '',
    createdAt: new Date(),
  }
})

const fields = ref([
  {
    fieldLabel: 'Content',
    ...useField('content'),
    component: markRaw(InputText)
  }
])

const queryClient = useQueryClient()
const { mutate, isPending } = useMutation({
  mutationFn: () => createComment(values),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['comments', props.data.postId],
    })
    emit('close', values)
    toast.add({
      severity: 'success',
      summary: 'Comment Created Successfully',
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
      header="Add comment"
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
      <Button @click="submitForm" :disabled="isPending">{{ isPending ? 'Creating...' : 'Create' }}</Button>
    </template>
  </Dialog>
</template>

<style scoped></style>
