import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import MyLightbox from './plugins/MyLightbox.ts'

import App from './App.vue'
import router from './router'


// import VueSilentbox from 'vue-silentbox'
import 'vue-silentbox/dist/style.css'

const app = createApp(App)

// app.use(VueSilentbox)
// app.use(MyLightbox)
app.use(createPinia())
app.use(router)

app.mount('#app')
