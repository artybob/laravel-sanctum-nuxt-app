<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6">
        <div class="mb-8 mt-8">
          <h2>Login socials</h2>
          <v-container class="mt-5">
            <v-row>
              <v-img
                class="mr-3"
                max-height="50"
                max-width="50"
                contain
                style="cursor: pointer;"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Facebook_F_icon.svg/2048px-Facebook_F_icon.svg.png"
                @click="socialLogin('facebook')"
              ></v-img>

              <v-img
                class="mr-3"
                max-height="50"
                max-width="50"
                style="cursor: pointer;"
                contain
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"
                @click="socialLogin('google')"
              ></v-img>

              <v-img
                class="mr-3"
                max-height="50"
                max-width="50"
                contain
                style="cursor: pointer;"
                src="https://upload.wikimedia.org/wikipedia/commons/2/21/VK.com-logo.svg"
                @click="socialLogin('vkontakte')"
              ></v-img>
            </v-row>
          </v-container>


        </div>
        <h2>OR</h2>

        <div class="mb-5">
          <h3>As admin:</h3>
          johndoe@example.com
          password
        </div>
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
            @change="saveUserStorage()"
          ></v-text-field>

          <v-text-field
            v-model="user.password"
            label="Password"
            required
            @change="saveUserStorage()"
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
  middleware: 'guest',
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
  computed: {
  },
  methods: {
    socialLogin(service) {
      window.location.href = `${process.env.API_URL}/api/login/${service}`;
    },
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
    async login() {
      await this.$auth.loginWith('laravelSanctum', {
        data: {
          email: this.user.email,
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
