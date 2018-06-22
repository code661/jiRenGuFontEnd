<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Hello JavaScript {{ this.$route.params.version }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Hellojs',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      version: 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
