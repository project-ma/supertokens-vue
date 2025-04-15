<script lang="ts">

import { signUp } from "supertokens-web-js/recipe/emailpassword";
import { doesEmailExist } from "supertokens-web-js/recipe/emailpassword";
import { signIn } from "supertokens-web-js/recipe/emailpassword";

interface loginDetails {
  form: boolean,
  operatorId: string,
  password: string,
  visible: boolean,
  passwordError: string
} 

export default {

  data(): loginDetails {
    return {
      form: false,
      operatorId: '',
      password: '',
      visible: false,
      passwordError: 'Password has not met minimum acceptable criteria'
    }
  },
  

  methods: {
    
    onSignUp: async function signUpClicked(email: string, password: string) {
    try {
        let response = await signUp({
            formFields: [{
                id: "email",
                value: this.operatorId
            }, {
                id: "password",
                value: this.password
            }]
        })

        if (response.status === "FIELD_ERROR") {
            // one of the input formFields failed validation
            response.formFields.forEach(formField => {
                if (formField.id === "email") {
                    // Email validation failed (for example incorrect email syntax),
                    // or the email is not unique.
                    window.alert(formField.error)
                } else if (formField.id === "password") {
                    // Password validation failed.
                    // Maybe it didn't match the password strength
                    window.alert(formField.error)
                }
            })
        } else if (response.status === "SIGN_UP_NOT_ALLOWED") {
            // the reason string is a user friendly message
            // about what went wrong. It can also contain a support code which users
            // can tell you so you know why their sign up was not allowed.
            window.alert(response.reason)
        } else {
            // sign up successful. The session tokens are automatically handled by
            // the frontend SDK.
            window.location.href = "/"
        }
    } catch (err: any) {
        if (err.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you.
            window.alert(err.message);
        } else {
            window.alert("Oops! Something went wrong.");
        }
    }
    },

    onLogin: async function signInClicked(email: string, password: string) {
      try {
          let response = await signIn({
              formFields: [{
                  id: "email",
                  value: this.operatorId
              }, {
                  id: "password",
                  value: this.password
              }]
          })

          if (response.status === "FIELD_ERROR") {
              response.formFields.forEach(formField => {
                  if (formField.id === "email") {
                      // Email validation failed (for example incorrect email syntax).
                      window.alert(formField.error)
                  }
              })
          } else if (response.status === "WRONG_CREDENTIALS_ERROR") {
              window.alert("Email password combination is incorrect.")
          } else if (response.status === "SIGN_IN_NOT_ALLOWED") {
              // the reason string is a user friendly message
              // about what went wrong. It can also contain a support code which users
              // can tell you so you know why their sign in was not allowed.
              window.alert(response.reason)
          } else {
              // sign in successful. The session tokens are automatically handled by
              // the frontend SDK.
              // window.location.href = "/login"
              this.$router.push({path:'/journal'})
              console.log("Hola")
          }
      } catch (err: any) {
          if (err.isSuperTokensGeneralError === true) {
              // this may be a custom error message sent from the API by you.
              window.alert(err.message);
          } else {
              window.alert("Oops! Something went wrong.");
          }
      } 
    }

  }
}
</script>


<template>
  <div>
    <v-img
      class="mx-auto my-6"
      max-width="228"
      src="./Supertokens-Logo.svg"
    ></v-img>

    <v-card
      class="mx-auto pa-8 pb-4"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Account Login</div>

      <v-text-field
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        v-model="operatorId"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password
      </div>

      <v-text-field
            v-model="password"
            :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
            :type="visible ? 'text' : 'password'"
            hint="Minimum 8 characters"
            density="comfortable"
            placeholder="Enter your password"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            counter
            @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-btn
        class="mb-8"
        color="green"
        size="large"
        variant="tonal"
        block
        @click="onLogin"
      >
        Log In
      </v-btn>

      <v-btn
            class="mb-5"
            color="orange"
            size="small"
            variant="tonal"
            @click="onSignUp"
            >
            Sign Up Now
      </v-btn>
    </v-card>
  </div>
</template>


<style scoped>
</style>
