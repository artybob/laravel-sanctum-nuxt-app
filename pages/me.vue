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
            <v-list-item-subtitle>{{ this.user.email }} | <span v-for="role in this.user.roles">{{ role }}</span>
            </v-list-item-subtitle>
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
      loading: true,
      settingsForm: {},
      image: undefined,
      user: this.$store.state.auth.user['data'],
      imageUrl: "https://bizraise.pro/wp-content/uploads/2014/09/no-avatar-300x300.png",
    }
  },
  created() {
    if (this.user.avatar) {
      this.imageUrl =  process.env.API_URL + '/storage/' + this.user.avatar
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
