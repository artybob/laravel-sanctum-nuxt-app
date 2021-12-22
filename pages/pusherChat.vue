<template>
  <div>
    <div class="chat" v-for="message in messages">
      <v-card
        elevation="0"
        dense
        class="mx-auto mt-4"
      >
        <v-list-item three-line>
          <v-list-item-avatar
            tile
            size="40"
            color="grey"
          >
<!--            hardcoded api url-->
            <v-img
              aspect-ratio="1.7"
              :src= "apiUrl + '/storage/' + message.user.avatar"
              >
            </v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <div class="text-overline mb-4" v-if="message.user">
              <strong class="primary-font">
                {{ message.user.name }}
                <v-chip
                  class="ma-2"
                  small
                >{{ message.created_at }}
                </v-chip>
              </strong>
            </div>
            <v-list-item-title class="mb-1">
              {{ message.message }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>

    </div>

    <!--    <p v-on:messagesent="addMessage">-->
    <!--      {{ message.message }}-->
    <!--    </p>-->

    <div class="input-group">
      <v-textarea
        id="btn-input"
        type="text"
        name="message"
        class="form-control input-sm"
        placeholder="Type your message here..."
        v-model="newMessage"
        @keyup.enter="sendMessage">
      </v-textarea>
      <span class="input-group-btn">
          <v-btn class="btn btn-primary btn-sm" id="btn-chat" @click="sendMessage">
              Send
          </v-btn>
        </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user'],

  data() {
    return {
      apiUrl: process.env.API_URL,
      newMessage: '',
      messages: []
    }
  },

// {
//   data: {
//     email: this.user.email,
//       password: this.user.password,
//   },
// }

  mounted() {
    // this.$axios.setHeader('XSRF-TOKEN', this.$cookies.get('XSRF-TOKEN'))
    this.$echo.channel('chat')
      .listen('MessageSent', (e) => {
        console.log(e)
        this.messages.push({user: e.user, message: e.message.message, created_at: e.message.created_at});
      })
  },
  created() {

    this.fetchMessages();
  },
  middleware: 'authenticated',
  methods: {
    sendMessage() {
      // this.$emit('messagesent', {
      //   user: this.$store.state.auth.user['data'],
      //   message: this.newMessage
      // });
      this.$axios.post('/api/messages', {message: this.newMessage}).then(response => {
        console.log(response.data);
      });

      this.newMessage = ''
    },
    fetchMessages() {
      this.$axios.get('/api/messages').then(response => {
        this.messages = response.data;
      });
    },
  }
}
</script>
