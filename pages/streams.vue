<template>
  <div>
    <h1>Streams</h1>
    <div :key="streamService.id" v-if="streamsData" class="streamsContainer" v-for="streamService in streamsData">
      <div class="mb-5">
        <v-img :src="streamService.logo"
               class="ma-auto"
               max-height="150"
               max-width="250"></v-img>
      </div>
      <v-row>
        <v-col cols="12" md="3" sm="12" :key="stream.id" v-for="stream in streamService.data">
          <v-item>
            <v-card
              class="mx-auto"
              max-width="344"
              max-height="440px"
              style="overflow: hidden"
            >
              <v-card-title class="text-overline mb-4">
                <h3>{{ stream.user_name }}</h3> <small>[{{ stream.stream_user_id }}]</small>
                <v-spacer></v-spacer>
                <v-chip
                  small
                  class="green lighten-2"
                >
                  {{ stream.started_at }}
                </v-chip>
              </v-card-title>
              <v-img
                :src="stream.thumbnail_url"
                height="200px"
              ></v-img>

              <v-card-title>
                {{ stream.game_name }}
                <v-chip
                  class="ma-2"
                  color="indigo"
                  text-color="white"
                >
                  <v-avatar left>
                    <v-icon>mdi-account-circle</v-icon>
                  </v-avatar>
                  {{ stream.viewer_count }}
                </v-chip>
                <!--                <small>{{ streamService.name }}</small>-->
              </v-card-title>

              <v-card-subtitle>
                {{ stream.title.substring(0, 70) + ".." }}
              </v-card-subtitle>

              <!--        <v-card-text>-->
              <!--          -->
              <!--        </v-card-text>-->
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </div>

    <div v-if="!streamsData">No streams data</div>
    <!--    <v-btn @click="getStreamsData()">Renew</v-btn>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      userRoles: this.$auth.user?.data.roles ?? [],
      streamsData: [],
    }
  },
  mounted() {
    // this.$axios.setHeader('XSRF-TOKEN', this.$cookies.get('XSRF-TOKEN'))
    this.getStreamsData();
  },
  // middleware: 'authenticated',
  methods: {
    getStreamsData() {
      this.$axios.get('/api/streams/data').then(response => {
        this.streamsData = response?.data;
      });
    },
  },
}
</script>
