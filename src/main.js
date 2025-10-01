import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './assets/styles/main.scss'

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

//Element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App).use(ElementPlus).mount('#app')
