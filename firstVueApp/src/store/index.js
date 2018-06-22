import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 10
  },
  mutations: {
    increase: function increase(state){
      console.log(state)
      state.count += 1
    },
    decrease(state){
      state.count --
    }
  }
})