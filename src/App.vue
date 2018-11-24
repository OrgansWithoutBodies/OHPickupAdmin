<template>
  <div id="app">
    <img src="./assets/logo.png" width=100 align=right>
    <router-view/>
  </div>
</template>
<script>
import DonorCard from './components/DonorCard'
import HelloWorld from './components/HelloWorld'
import StopCard from './components/StopCard'

export default {
  name: 'App',
  components: {
    HelloWorld,
    DonorCard,
    StopCard
  }
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
