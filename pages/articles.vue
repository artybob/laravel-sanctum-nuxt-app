<template>
  <div>
    <h1>Articles</h1>
    <v-text-field
      class="ma-2"
      v-model="search"
      style="max-width: 600px;"
      label="search articles"
    >
    </v-text-field>
    <v-btn
      color="blue-grey"
      class="ma-2 white--text"
      @click="searchArticles()"
      depressed
      :loading="articlesLoading"
    >
      Search
      <v-icon
        right
        dark
      >
        mdi-magnify
      </v-icon>
    </v-btn>
    <h2 v-if="articles" >Total articles found: {{articles.length}}</h2>

    <div v-if="articles" class="streamsContainer" :key="article.id" v-for="article in articles">
      <v-card elevation="0" class="mb-3">
        <v-card-title>
          {{ article.title }}
        </v-card-title>
        <v-card-subtitle>
          {{ article.created_at }}
        </v-card-subtitle>
        <v-card-subtitle>
          <v-chip class="mr-2" x-small outlined label :key="tag" v-for="tag in article.tags">#{{ tag }}</v-chip>
        </v-card-subtitle>
        <v-card-text>
          {{ article.body }}
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "articles",
  data() {
    return {
      search: '',
      articles: [],
      articlesLoading: false,
    }
  },
  mounted() {
    this.getArticles();
  },
  methods: {
    getArticles() {
      this.articlesLoading = true;
      this.$axios.get('/api/articles').then(r => {
        this.articles = r.data;
        this.articlesLoading = false;
      });

      this.newMessage = ''
    },
    searchArticles() {
      this.articlesLoading = true;
      this.$axios.get('/api/articles/search', {params: {q: this.search}}).then(r => {
        this.articles = r.data;
        this.articlesLoading = false;
      });

      this.newMessage = ''
    }
  },
}
</script>

<style scoped>

</style>
