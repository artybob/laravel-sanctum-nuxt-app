export function csrfRequest(url, data) {
  //get token and do request
  this.$axios.get(process.env.API_URL + '/sanctum/csrf-cookie').then(response => {

  })
}
