<template>
  <v-container>
    <v-row>
      <v-col cols="7">
        <v-list-item>
          <v-list-item-avatar size="200">
            <v-img
              :loading="loading"
              aspect-ratio="1.7"
              :src=imageUrl
            >
            </v-img>
          </v-list-item-avatar>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title" style="margin-top:20px;">{{ this.user.name }}</v-list-item-title>
            <v-list-item-subtitle>
              <span
                v-bind:class="{ 'green--text': this.user.email_verified_at }">{{ this.user.email }}</span>
              <span v-if="!linkSent">
              <v-btn
                :loading="loadingLink"
                class="green--text"
                @click="sendVerificationLink"
                text
                v-if="!this.user.email_verified_at">
                send verification link
              </v-btn>
              </span>
              <span v-else>
                <span>verification sent check your email.</span>
              </span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>Roles</v-list-item-subtitle>
            <span v-for="role in this.user.roles">{{ role }}</span>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col cols="5">
        <h2>Settings</h2>
        <v-form class="mt-10 mb-10">
          <v-file-input
            v-model="image"
            name="avatar"
            outlined
            id="file"
            denset
            @change="onFileChange"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Pick an avatar"
            prepend-icon="mdi-camera"
            label="Avatar"
          ></v-file-input>
          <v-divider></v-divider>
          <v-spacer></v-spacer>
          <v-btn
            style="float: right"
            class="mt-4"
            text
            @click="saveSettings()"
          >
            Save settings
          </v-btn>
        </v-form>

      </v-col>
    </v-row>
  </v-container>
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
  middleware: 'authenticated',
  data() {
    return {
      linkSent: false,
      loadingLink: false,
      loading: true,
      settingsForm: {},
      image: undefined,
      user: this.$store.state.auth.user['data'],
      imageUrl: "",
    }
  },
  created() {
    if (this.user.avatar) {
      this.imageUrl = this.user.avatar
      //hardcoded
      if (this.user.avatar.indexOf("http") === -1) {
        this.imageUrl = process.env.API_URL + '/storage/' + this.user.avatar
      }
    }
    this.loading = false;

  },
  methods: {
    createImage(file) {
      const reader = new FileReader();

      reader.onload = e => {
        this.imageUrl = e.target.result;
      };
      this.avatar = file;
      reader.readAsDataURL(file);
    },
    onFileChange(file) {
      if (!file) {
        return;
      }
      this.createImage(file);
    },
    sendVerificationLink() {
      this.loadingLink = true;

      this.$axios.get(process.env.API_URL + '/sanctum/csrf-cookie').then(response => {
        this.$axios.post(process.env.API_URL + '/api/email/verify/resend', this.user).catch((err) => {

          let errors = [];
          if (err.response.data.errors) {
            for (const [key, value] of Object.entries(err.response.data.errors)) {
              errors.push(value);
            }
          }
          $nuxt.$emit('error', err.response.data.message.concat(errors.join(' ')))
        }).then((res) => {
          this.linkSent = true;
          this.loadingLink = false;
        });
      });
    },
    saveSettings() {
      this.changeAvatar();
    },
    changeAvatar() {
      let formData = new FormData();
      formData.append('user_email', this.user.email);
      formData.append('avatar', this.image);

      this.$axios.post(process.env.API_URL + '/api/changeAvatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).catch((err) => {
        let errors = [];
        if (err.response.data.errors) {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            errors.push(value);
          }
        }
        $nuxt.$emit('error', err.response.data.message.concat(errors.join(' ')))
      }).then((res) => {
        if (res.status = 200) {
        }
      });
    },
  }
}
</script>
