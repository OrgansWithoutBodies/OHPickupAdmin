<template>
  <div class="test">
    <div v-for="donor in donors">
      <draggable>
      <donor-card v-bind:donor="donor"/>
      </draggable>
    </div>
    <h2>Essential Links</h2>
    <h1>{{ title }}</h1>
    <draggable>
    <DonationCard/>
    </draggable>
  </div>
</template>

<script>
import DonorCard from './DonorCard'
import DonationCard from './DonationCard'
import draggable from 'vuedraggable'
export default {
  name: 'HelloWorld',
  components: {
    DonationCard,
    DonorCard,
    draggable
  },
  data () {
    return {
      donors: [{firstname: 'Test',
        lastname: 'Testone',
        address: '215 test ct',
        phone: '12345',
        email: 'test'},
      {firstname: 'Test',
        lastname: 'testos',
        address: '215 test ct',
        phone: '12345',
        email: 'test'}],
      msg: 'Welcome to Your Vue.js App',
      title: 'V'
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
