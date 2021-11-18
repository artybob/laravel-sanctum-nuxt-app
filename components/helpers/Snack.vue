<template>
  <v-snackbar v-model="snackbar" :timeout="timeout" :color="snackColor"
  >{{ alertMessage }}
    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>

export default {
  name: "Snack",
  data() {
    return {
      dialog: false,
      snackbar: false,
      snackColor: "success",
      alertMessage: "",
      timeout: 10000,
    };
  },
  created() {
    this.$nuxt.$on('login-error', response => {
      this.alertMessage = response;
      this.alertSnack("error");
    })
  },
  beforeDestroy() {
    this.$nuxt.$off("api-error");
  },
  watch: {
  },
  methods: {
    close() {
      this.dialog = false;
    },
    alertSnack(snackColor) {
      this.snackColor = snackColor;
      this.snackbar = true;
    },
  }
};
</script>

<style scoped>

</style>
