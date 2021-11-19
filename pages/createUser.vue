<template>
  <v-row>
    Page for user creation admins
  </v-row>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  middleware: ['admin', 'auth'],
  methods: {
  },
}
</script>
