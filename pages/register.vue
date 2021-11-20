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
      this.$axios.get(process.env.API_URL + '/sanctum/csrf-cookie').then(response => {
        return this.$axios.post(process.env.API_URL + '/register', this.user).catch((err) => {
          let errors = [];
          if (err.response.data.errors) {
            for (const [key, value] of Object.entries(err.response.data.errors)) {
              errors.push(value);
            }
          }
          $nuxt.$emit('error', err.response.data.message.concat(errors.join(' ')))
        }).then((res) => {
          if (res.status = 200) {
            this.$auth.loginWith('laravelSanctum', {
              data: this.user,
            })
          }
        });
      })
    }
  }
}

</script>

<style scoped>

</style>
