# Vue.js  + Vite + Vuetify + SuperTokens
SuperTokens is an Authentication platform that has great Developer Experience,
with multiple authentication methods that can be self-hosted or managed by SuperTokens.

## Example Deployment
This repo has a working base example of how SuperTokens is implemented as a Self-Hosted Authentication solution with Vue.js.  The default Vue App is used with a custom Login Form by Vuetify to demonstrate how you would add an Auth solution to your Vue Application. 

### Build and Run locally
1. Clone this Repo
2. Build SuperTokens Middleware API Server:
    - ``` cd st-middleware-api ```
    - ``` npm install ```
    - ``` npm run build ```
3. Start SuperTokens Backend and Core with Docker Compose
    - ``` docker compose up -d ```
4. Start Vue Frontend App with Custom UI Login Form: 
    - ``` cd vue-frontend ```
    - ``` npm run dev ```
5. Goto Web Browser http://localhost:5173/


Checkout [SuperTokens](https://supertokens.com/) for complete documentation, features and recipes