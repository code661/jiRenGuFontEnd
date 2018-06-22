<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Hello World</h2>
    <button @click="handlePlus">+1</button>
    <input type="text" v-model.number="limit" placeholder="您需要显示的信息条数">
    <button @click="handleReduce">-1</button>
    <button @click="getData">查看</button>
    <ul>
      <ol v-for="item in info">{{ item.title }}</ol>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
Vue.prototype.$http = axios

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      limit: this.$store.state.count,
      info: ''
    }
  },
  methods: {
    getData() {
      let _this = this
      this.$http.get('https://cnodejs.org/api/v1/topics',{
        params: {
          page: 1,
          limit: _this.limit
        }
      })
      .then(function(res){
        _this.info = res.data.data
        console.log(res.data.data._this.limit)
      })
      .catch(function(err){
        console.log(err)
      })
    },
    handlePlus() {
      this.$store.commit('increase')
      this.limit=this.$store.state.count
    },
    handleReduce() {
      this.$store.commit('decrease')
      this.limit=this.$store.state.count
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
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>
