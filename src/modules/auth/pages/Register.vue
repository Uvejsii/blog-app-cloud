<script setup>
import {useField, useForm} from 'vee-validate'
import {markRaw, ref, onMounted} from 'vue'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from "primevue/button";
import {useMutation} from '@tanstack/vue-query'
import * as yup from 'yup'
import {useRouter} from 'vue-router'
import {register} from "@/modules/auth/sdk/api.js";
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const toast = useToast()

const {values, validate, errors} = useForm({
  validationSchema: yup.object({
    email: yup.string().email('Must be valid email').required('Email is required'),
    password: yup.string().required('Password is required').matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
        'Password must contain an uppercase letter, a number, and a symbol'
    ),
  }),
  initialValues: {
    email: '',
    password: '',
    id: ''
  },
})

const {mutateAsync, isPending} = useMutation({
  mutationFn: () => register(values),
  onSuccess: () => {
    router.push({name: 'login'})
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

const fields = ref([
  {
    fieldLabel: 'Email',
    ...useField('email'),
    component: markRaw(InputText)
  },
  {
    fieldLabel: 'Password',
    ...useField('password'),
    component: markRaw(Password),
    props: {
      feedback: false,
      toggleMask: true
    }
  }
])

const submit = async () => {
  let isValid = await validate()

  if (!isValid.valid) return

  await mutateAsync()
}

onMounted(() => {
  window.localStorage.removeItem('user')
})
</script>

<template>
  <div class="login-container d-flex justify-content-center align-items-center vh-100">
    <div class="card login-card p-4 shadow">
      <form class="login-form" @submit.prevent="submit">
        <h2 class="text-center mb-2">Welcome, register</h2>
        <p class="text-center text-muted mb-4">Please enter your details to register</p>
        <div class="form-grid">
          <div v-for="field in fields" :key="field.name" class="form-grid__item form-grid__item--full-row">
            <label class="form-grid__label" :for="field.name">{{ field.fieldLabel }}</label>
            <component
                :is="field.component"
                v-model="field.value"
                :id="field.name"
                class="w-100"
                v-bind="field.props"
            />
            <small class="form-grid__error">{{ errors[field.name] }}</small>
          </div>
          <p class="form-grid__item--full-row m-0">Already have an account? Click
            <RouterLink to="/login">here</RouterLink> to login
          </p>
        </div>
        <Button
            @click="submit"
            :loading="isPending"
            class="form-grid__item--full-row mt-4"
            label="Register"
        />
      </form>
    </div>
  </div>
</template>


<style scoped>
.login-container {
  background: #f5f6fa;
}

.login-card {
  max-width: 450px;
  width: 100%;
  border-radius: 12px;
  background: white;
}

.login-form {
  display: flex;
  flex-direction: column;
}
</style>
