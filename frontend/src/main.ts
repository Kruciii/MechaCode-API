import './assets/main.css'
import 'primeicons/primeicons.css' // Ikony

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Importy PrimeVue
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Podłączenie PrimeVue z motywem Aura
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})

app.mount('#app')