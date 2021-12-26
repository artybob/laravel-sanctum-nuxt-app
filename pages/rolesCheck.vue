<template>
  <div>
    <h1>Roles check</h1>
    <v-row>
      <v-col class="text-center">
        <h2 v-if="userRoles.includes('admin')">This sign can only be seen as <small class="red--text">admin</small></h2>
        <h2 v-else>You're not <small class="red--text">admin</small></h2>
      </v-col>
      <v-col class="text-center">
        <h2 v-if="userRoles.includes('admin') || userRoles.includes('writer')">This sign can only be seen as <small
          class="red--text">admin</small> and <small class="orange--text">writer</small></h2>
        <h2 v-else>You're not <small class="red--text">admin</small> or <small class="orange--text">writer</small></h2>
      </v-col>
      <v-col class="text-center">
        <h2>This sign can see everyone</h2>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userRoles: this.$auth.user?.data.roles ?? [],
    }
  },
  middleware: 'authenticated',
  methods: {},
}
</script>
