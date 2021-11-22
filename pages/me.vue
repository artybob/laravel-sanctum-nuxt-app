<template>
  <v-card class="mx-auto" max-width="1000" tile>
    <v-img height="200" src="https://miro.medium.com/max/3840/1*YQK6QT1U7VbiDqudv3LbNA.jpeg"></v-img>
    <v-row style="margin:2.5%;position:absolute; top: 130px">

      <v-list-item>
        <v-list-item-avatar size="100">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="John"
          >
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="title" style="margin-top:50px;">{{this.user.name}} <span class="green--text">{{this.user.email}}</span></v-list-item-title>
          <v-list-item-subtitle>In Roles :</v-list-item-subtitle>
          <span v-for="role in this.user.roles">{{role}}</span>
        </v-list-item-content>
      </v-list-item>
    </v-row>
  </v-card>
</template>


<!--<template>-->
<!--  <v-row>-->
<!--    <v-col class="text-center">-->
<!--        {{this.$store.state.auth.user['data']}}-->
<!--    </v-col>-->
<!--  </v-row>-->
<!--</template>-->

<script>
export default {
  data() {
    return {
      user: this.$store.state.auth.user['data'],
    }
  },
  created() {
  },
  middleware: 'authenticated',
  methods: {
  },
}
</script>
