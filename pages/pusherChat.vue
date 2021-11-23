<template>
  <div>
    <ul class="chat">
      <li class="left clearfix" v-for="message in messages">
        <div class="chat-body clearfix">
          <div class="header">
            <strong class="primary-font">
              {{ message.user.name }}
            </strong>
          </div>
          <p>
            {{ message.message }}
          </p>
        </div>
      </li>
    </ul>

    <div class="input-group">
      <input id="btn-input" type="text" name="message" class="form-control input-sm" placeholder="Type your message here..." v-model="newMessage" @keyup.enter="sendMessage">

      <span class="input-group-btn">
            <button class="btn btn-primary btn-sm" id="btn-chat" @click="sendMessage">
                Send
            </button>
        </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user'],

  data() {
    return {
      newMessage: '',
      messages: []
    }
  },
  created() {
    this.fetchMessages();
  },
  middleware: 'authenticated',
  methods: {
    sendMessage() {
      this.$emit('messagesent', {
        user: this.user,
        message: this.newMessage
      });

      this.newMessage = ''
    },
    fetchMessages() {
      this.$axios.get('/messages').then(response => {
        this.messages = response.data;
      });
    },

    addMessage(message) {
      this.messages.push(message);

      this.$axios.post('/messages', message).then(response => {
        console.log(response.data);
      });
    }
  }
}
</script>
