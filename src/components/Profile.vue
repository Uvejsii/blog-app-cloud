<script setup>
import {useUser} from "@/modules/auth/sdk/user.js";
import Button from 'primevue/button'
import router from "@/router/index.js";

const {user, logout} = useUser();
</script>

<template>
  <div class="user-info p-3 rounded-3 shadow d-flex align-items-center mb-4 w-25">
    <div v-if="user">
      <div class="d-flex align-items-center gap-2">
        <i class="bi bi-person-circle text-primary" style="font-size: 1.5rem;"></i>
        <div>
          <p class="m-0">{{ user.email }}</p>
        </div>
      </div>
      <Button
          severity="danger"
          label="Logout"
          icon="bi bi-box-arrow-right"
          @click="logout(router)"
          class="p-button-sm mt-2"
      />
    </div>
    <div v-else>User not logged in</div>
  </div>
</template>

<style scoped>
</style>