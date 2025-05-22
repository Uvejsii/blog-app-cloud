import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import ToastService from 'primevue/toastservice';
import ActionMenu from "@/components/ActionMenu.vue";
import ActionMenuItem from '@/components/ActionMenuItem.vue'
import FocusTrap from 'primevue/focustrap'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.component('ActionMenu', ActionMenu)
app.component('ActionMenuItem', ActionMenuItem)
app.directive('focustrap', FocusTrap)
app.use(ToastService)
app.use(VueQueryPlugin)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
    }
})
app.use(router)

app.mount('#app')
