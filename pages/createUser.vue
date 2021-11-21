<template>
  <v-container>
    <h1>Create new user with role</h1>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          form method="post"
          @submit.prevent="createUser"
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

          <v-autocomplete
            :items="roles"
            item-text="name"
            item-value="name"
            v-model="user.role"
            label="Role"
            required
          ></v-autocomplete>
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
    <v-data-table
      :headers="headers"
      :items="users"
      item-key="name"
      class="elevation-1 mt-10"
      :search="search"
    >
      <template v-slot:item.roles="{item}">
        <span v-for="role in item.roles">{{role.name}} </span>
      </template>
    </v-data-table>


  </v-container>
</template>


<script>
export default {
  name: "login",
  data: () => ({
    valid: true,
    roles: [],
    user: {email: '', password: '', name: '', role: ''},
    search: '',
    calories: '',
    users: [],
    headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: 'E-mail',
          value: 'email',
        },
        { text: 'Role', value: 'roles' },
      ]
  }),
  middleware: ['admin', 'auth'],
  mounted() {
    this.getRoles();
    this.getUsers();
  },
  computed: {},
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    getRoles() {
      this.$axios.get(process.env.API_URL + '/api/getRoles').then((response)=> {
          this.roles = response.data
      })
    },
    getUsers() {
      this.$axios.get(process.env.API_URL + '/api/getUsers').then((response)=> {
        this.users = response.data
      })
    },
    async createUser() {
      this.$axios.get(process.env.API_URL + '/sanctum/csrf-cookie').then(response => {
        return this.$axios.post(process.env.API_URL + '/api/createUser', this.user).catch((err) => {
          let errors = [];
          if (err.response.data.errors) {
            for (const [key, value] of Object.entries(err.response.data.errors)) {
              errors.push(value);
            }
          }
          $nuxt.$emit('error', err.response.data.message.concat(errors.join(' ')))
        }).then((res) => {
          if (res.status = 200) {
            this.getUsers();
          }
        });
      })
    }
  }
}
</script>
