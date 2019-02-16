
<template>
  <div id="app">
  <front-end/>
  </div>
</template>
<script>
import FrontEnd from './components/FrontEnd'
export default {
  name: 'App',
  components: {
  FrontEnd
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
