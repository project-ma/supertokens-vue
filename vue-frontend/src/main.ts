import './assets/main.css'

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

// SuperTokens 
import SuperTokens from 'supertokens-web-js'
import Session from 'supertokens-web-js/recipe/session'
import EmailPassword from "supertokens-web-js/recipe/emailpassword";

SuperTokens.init({
    appInfo: {
      appName: "SuperTokens Vue",
      apiDomain: "http://localhost:3002",
      apiBasePath: "/auth", 
    },
    recipeList: [
      EmailPassword.init(), 
      Session.init(),
      ],
  });


const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
  })


const app = createApp(App)

app.use(router)
app.use(vuetify)
app.mount('#app')
