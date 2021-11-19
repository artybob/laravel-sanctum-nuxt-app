<template>
  <div></div>
</template>

<script>
export default {
  name: 'Exit',
  mounted() {
    this.$auth.logout().then(() => {
    })
  },
}
</script>

<style scoped></style>
