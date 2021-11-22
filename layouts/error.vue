<template>
  <v-app dark>
    <h1>
      {{ error }}
    </h1>
    <NuxtLink to="/">
      Home page
    </NuxtLink>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
