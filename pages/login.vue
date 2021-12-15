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




<!--<template>-->
<!--  <div class="social-login">-->
<!--    <button @click="socialLogin('google')" class="social-login-btn google">-->
<!--      <i class="fab fa-google"></i>-->
<!--    </button>-->
<!--    <button @click="socialLogin('github')" class="social-login-btn github">-->
<!--      <i class="fab fa-github"></i>-->
<!--    </button>-->
<!--    <button @click="socialLogin('facebook')" class="social-login-btn facebook">-->
<!--      <i class="fab fa-facebook"></i>-->
<!--    </button>-->
<!--    <button @click="socialLogin('twitter')" class="social-login-btn twitter">-->
<!--      <i class="fab fa-twitter"></i>-->
<!--    </button>-->
<!--    <button @click="socialLogin('linkedin')" class="social-login-btn linkedin">-->
<!--      <i class="fab fa-linkedin"></i>-->
<!--    </button>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  methods: {-->
<!--    socialLogin(service) {-->
<!--      window.location.href = `${process.env.baseUrl}auth/login/${service}`;-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--.social-login {-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--}-->
<!--.social-login-btn {-->
<!--  color: white;-->
<!--  border-radius: 5px;-->
<!--  background: #333;-->
<!--  border: none;-->
<!--  margin-bottom: 10px;-->
<!--  margin-left: 5px;-->
<!--  margin-right: 5px;-->
<!--  width: 50px;-->
<!--  height: 50px;-->
<!--  font-size: 23px;-->
<!--  cursor: pointer;-->

<!--  &.google {-->
<!--    background: #dd4b39;-->
<!--  }-->
<!--  &.github {-->
<!--    background: #24292e;-->
<!--  }-->
<!--  &.facebook {-->
<!--    background: #3B5998;-->
<!--  }-->
<!--}-->
<!--</style>-->
