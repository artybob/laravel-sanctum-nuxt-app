<template>
  <div></div>
</template>

<script>
export default {
  name: 'Exit',
  mounted() {
    this.$auth.logout().then(() => {
      window.location = '/'
    })
  },
}
</script>

<style scoped></style>
