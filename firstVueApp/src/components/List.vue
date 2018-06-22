<template>
  <ul>
    <li>
      <router-link to="/helloworld">Hello-world</router-link>
    </li>
    <li>
      <router-link :to="{name:'hellojs',params:{version:6}}">Hello-JavaScript</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  
}
</script>


<style scoped>
  li {
    list-style-type: none;
  }

  a:visited {
    color: #42b983
  }
</style>

