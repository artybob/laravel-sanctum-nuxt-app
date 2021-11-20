<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          form method="post"
          @submit.prevent="register"
        >
          <v-text-field
            v-model="user.name"
            label="Name"
            required
          ></v-text-field>

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

          <v-btn
            type="submit"
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            Register
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
    user: {email: '', password: '', name: ''},
    // name: '',
    // nameRules: [
    //   v => !!v || 'Name is required',
    //   v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    // ],
    // emailRules: [
    //   v => !!v || 'E-mail is required',
    //   v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    // ],
  }),
  mounted() {
  },
  computed: {},
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    async register() {
      this.$axios.get(process.env.API_URL('sanctum/csrf-cookie')).then(response => {
        return axios.post(baseUrl('register'), {
          email: this.user.email,
          password: this.user.password,
        }, {
          xsrfHeaderName: "X-XSRF-TOKEN", // change the name of the header to "X-XSRF-TOKEN" and it should works
          withCredentials: true
        });
      })


      // await this.$axios.post(
      //   '/register', {
      //     data: {
      //       email: this.user.email,
      //       password: this.user.password,
      //     },
      //   }
      // ).catch((err) => {
      //   $nuxt.$emit('error', err.response.data.message)
      // })
    },
  },
}

</script>

<style scoped>

</style>
