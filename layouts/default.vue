<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in menu"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title v-text="title"/>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt/>
        <Snack></Snack>
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Snack from "@/components/helpers/Snack";

export default {
  components: {Snack},
  data() {
    return {
      user: this.$store.state.auth.user,
      clipped: false,
      drawer: false,
      fixed: false,
      menuItems: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'rolesCheck',
          to: '/rolesCheck'
        },
      ],
      title: 'Laravel-Sanctum-Nuxt-app'
    }
  },
  computed: {
    menu: function () {
      //render menu
      return this.menuItems.concat(
        this.$store.state.auth.loggedIn
          ? [
            {
              icon: 'mdi-account-multiple-plus',
              title: 'create User',
              to: '/createUser',
            },
            {
              icon: 'mdi-access-point',
              title: 'pusherChat',
              to: '/pusherChat',
            },
            {
              icon: 'mdi-account-box',
              title: this.$store.state.auth.user['data'].name,
              to: '/me',
            },
            {
              icon: 'mdi-arrow-left-bold-box  ',
              title: 'Logout',
              to: '/logout',
            },
          ]
          : [
            {
              icon: 'mdi-arrow-right-bold-box',
              title: 'Login', to: '/login'
            },
            {
              icon: 'mdi-account-plus',
              title: 'Register', to: '/register'
            },
          ]
      )
    },
  },
  methods: {
    async logout() {
      await this.$auth.logout()

      this.$router.push('/login')
    },
  },
}
</script>
