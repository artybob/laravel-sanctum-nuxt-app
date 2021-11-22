<template>
  <error :error="this.error"></error>
</template>

<script>
import Error from "~/layouts/error";

export default {
  name: "oops",
  components: {Error},
  props: {
    error: {
      type: Object,
      default: null,
    }
  },
}
</script>

<style scoped>

</style>
