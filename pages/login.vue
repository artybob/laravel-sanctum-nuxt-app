<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          form method="post"
          @submit.prevent="login"
        >
          <!--          <v-text-field-->
          <!--            v-model="name"-->
          <!--            :counter="10"-->
          <!--            :rules="nameRules"-->
          <!--            label="Name"-->
          <!--            required-->
          <!--          ></v-text-field>-->

          <v-text-field
            v-model="user.email"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.password"
            label="Password"
            required
          ></v-text-field>

          <!--          <v-checkbox-->
          <!--            v-model="checkbox"-->
          <!--            :rules="[v => !!v || 'You must agree to continue!']"-->
          <!--            label="Do you agree?"-->
          <!--            required-->
          <!--          ></v-checkbox>-->

          <v-btn
            type="submit"
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            Login
          </v-btn>

          <!--    <v-btn-->
          <!--      color="error"-->
          <!--      class="mr-4"-->
          <!--      @click="reset"-->
          <!--    >-->
          <!--      Reset Form-->
          <!--    </v-btn>-->

          <!--    <v-btn-->
          <!--      color="warning"-->
          <!--      @click="resetValidation"-->
          <!--    >-->
          <!--      Reset Validation-->
          <!--    </v-btn>-->
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
    // name: '',
    // nameRules: [
    //   v => !!v || 'Name is required',
    //   v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    // ],
    // emailRules: [
    //   v => !!v || 'E-mail is required',
    //   v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    // ],
    checkbox: false,
  }),
  mounted() {
    if ((localStorage.getItem('user') !== null)) {
      this.user = JSON.parse(localStorage.user);
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    async login() {
      localStorage.setItem('user', JSON.stringify({email: this.user.email, password: this.user.password,}));

      await this.$auth.loginWith('laravelSanctum', {
        data: {
          email: this.user.email,
          password: this.user.password,
        },
      }).catch((err) => {
        $nuxt.$emit('login-error', err.response.data.message)
      })

      this.$router.push('/')
    },
  },
}

</script>

<style scoped>

</style>
