import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import MyLightbox from './plugins/MyLightbox.ts'

import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTwitter, fa500px, faInstagram, faVk, faTelegram } from '@fortawesome/free-brands-svg-icons'

library.add(faTwitter)
library.add(fa500px)
library.add(faInstagram)
library.add(faVk)
library.add(faTelegram)

// import VueSilentbox from 'vue-silentbox'
import 'vue-silentbox/dist/style.css'

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

// app.use(VueSilentbox)
// app.use(MyLightbox)
app.use(createPinia())
app.use(router)

app.mount('#app')
