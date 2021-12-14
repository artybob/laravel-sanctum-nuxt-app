<template>
  <div></div>
</template>

<script>
export default {
  middleware: ['auth'],
  name: 'Exit',
  mounted() {
    this.$auth.logout().then(() => {
      return this.$router.push('/login');
    })
  },
}
</script>

<style scoped></style>
