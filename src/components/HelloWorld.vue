<template>
  <div class="test">
  <select><option v-for="trip in trips">{{trip.date}}</option></select> <button>+</button>

    <div v-for="trip in trips" class="trip">
    <b class="tripdate">{{trip.date}}</b><p/> 
    <div v-for="slot in triplen">
      <div v-bind:id="slot" class="tripslot" @dblclick="addDonor"/>
   </div>
   </div>
   <button> ... </button><p/>
    <div v-for="stop in stops">
      <draggable>
       <stop-card v-bind:stop="stop"/>
      </draggable>
    </div>
    <button @click="addDonor"> Add New Stop </button>
    <button> Show Hidden Stops</button><p/>
    <button> Save Stops for this Trip</button><p/>
    <modal name="addNewStop" adaptive="true">
    <AddNewStop/>
    </modal>
  </div>
</template>

<script>
const maxpertrip = 3
import DonorCard from './DonorCard'
import StopCard from './StopCard'
import AddNewStop from './AddNewStop'
import draggable from 'vuedraggable'
export default {
  name: 'HelloWorld',
  components: {
    StopCard,
    DonorCard,
    AddNewStop,
    draggable
  },
  data (){return{triplen:Array.apply(null, {length: maxpertrip}).map(Number.call, Number)}},
  computed:{
    
    stops () {
      return this.$store.state.stops
    },
    trips () {
      return this.$store.state.trips
    }
  },
  methods:{

  addDonor:function(evt){
    this.$modal.show('addNewStop')

  },
  onEnd:function(evt){

  },
  checkMove:function(evt,originalEvent){

  }
  }
}

</script>

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
.tripslot{

  width:50px;
  height:50px;
  border:4px solid black;
  margin:10px;
  display:inline-block;
  background-color:#ff0000;

  border-radius:5px;
}
.tripdate{
  font-size:30px;
  text-decoration:underline;
  text-transform:capitalize;
  text-shadow: 2px 3px 10px silver;
  color:#ff0000;
}
.trip{
  background-color:#eeeeee;
  width:1000px;
  margin:5px;
  border-radius:20px;

}
</style>

<!--@todo rolodex style donorcard- loc based on lastname
@todo REST integrate
@todo confirm w donor btn AFTER trip # is locked-in 
@todo if donated before lookup by email/phone
@todo default range is today - max
@todo modal popup on cancel stop


-->
