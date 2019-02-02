
<template>
  <div id="app">
  
  <router-link to="/admin/">admin</router-link>
  -
  <router-link to="/request/">request</router-link>
  <router-view/>
  </div>
</template>
<script>

export default {
  name: 'App',
  components: {
  },
  data:{version:"0.0.2"}
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #00FF00;
  margin-top: 60px;
}
</style>
