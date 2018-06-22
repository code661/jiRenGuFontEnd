import Vue from "vue"
import Router from "vue-router"
import HelloWorld from "../components/HelloWorld"
import HelloJs from "../components/helloJs"

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'helloworld',
      path: '/helloworld',
      component: HelloWorld
    },
    {
      name: 'hellojs',
      path: '/hellojs:version',
      component: HelloJs
    }
  ]
})