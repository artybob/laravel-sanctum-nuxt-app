<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6">
        <div class="mb-8 mt-8">
          <h2>Login socials</h2>
          <v-img
            max-height="50"
            max-width="50"
            style="cursor: pointer;"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Facebook_F_icon.svg/2048px-Facebook_F_icon.svg.png"
            @click="socialLogin('facebook')"
          ></v-img>
        </div>
          <h2>OR</h2>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          form method="post"
          @submit.prevent="login"
        >

          <v-text-field
            v-model="user.email"
            label="E-mail"
            required
            @change="saveUserStorage()"
          ></v-text-field>

          <v-text-field
            v-model="user.password"
            label="Password"
            required
            @change="saveUserStorage()"
          ></v-text-field>

          <v-btn
            type="submit"
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            Login
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: "login",
  data: () => ({
    valid: true,
    user: {email: '', password: ''},
    checkbox: false,
  }),
  middleware: 'guest',
  mounted() {
    if ((localStorage.getItem('user') !== null)) {
      this.user = JSON.parse(localStorage.user);
    }
  },
  computed: {},
  methods: {
    saveUserStorage() {
      localStorage.setItem('user', JSON.stringify({email: this.user.email, password: this.user.password,}));
    },
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    socialLogin(service) {
      window.location.href = `${process.env.API_URL}/api/login/${service}`;
    },
    login() {
      this.$auth.loginWith('laravelPassportPassword', {
        data: {
          username: this.user.email,
          password: this.user.password,
        },
      }).catch((err) => {
        $nuxt.$emit('error', err.response.data.message)
      })
    },
  },
}

</script>

<style scoped>

</style>
