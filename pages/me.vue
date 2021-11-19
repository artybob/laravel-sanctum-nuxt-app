<template>
  <v-row>
    <v-col class="text-center">
        {{this.$store.state.auth.user['data']}}
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  created() {
  },
  middleware: 'authenticated',
  methods: {
  },
}
</script>
