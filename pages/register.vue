<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
  <v-row class="fill-height mt-7">
    <v-col cols="6" offset="3">
      <v-card>
        <v-card-title>SIGNUP</v-card-title>
        <v-card-text>
          <v-text-field v-model="email" value="" type="email" label="Email" outlined prepend-icon="mdi-account-circle">
          </v-text-field>
          <v-text-field v-model="password" value="" :type="pwdVisible ? 'text' : 'password'" label="Password" outlined
            prepend-icon="mdi-lock" :append-icon="pwdVisible ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="pwdVisible = !pwdVisible"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="signup">SIGNUP</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import API from '@/services/auth.js'

export default {
  name: "RegisterPage",
  data() {
    return {
      email: "",
      password: "",
      pwdVisible: false,
    };
  },
  methods: {
    async signup() {
      await API.signup(this.email, this.password)
    }
  }
};
</script>

<style>
.advice-text {
  color: white;
  text-shadow: 2px 2px 2px #555;
}

.carousel-item {
  filter: sepia(30%) contrast(150%) brightness(0.7);
}
</style>