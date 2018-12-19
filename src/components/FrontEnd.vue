 <template>
  <div class="test"> 
  <div class="tripcontrol">
    <button>◀</button>
    <select v-model="selectedday"><option v-bind:value="trip.date" v-for="trip in trips">{{trip.date}}</option></select>
    <button>▶</button>  
    <button>+</button>
  </div>
  
  <trip-card  v-bind:trip="trips[0]" @slotdbl="addStopWind"/>

   <button> ... </button><p/>

   <draggable :list="stoplist"  >
    <div v-for="stop in stoplist" >
         <stop-card v-bind:stop="stop"/>
    </div>
    </draggable>
   
      <button @click="addStopWind"> Add New Stop </button>
      <button> Show Hidden Stops</button><p/>
      <button> Save Stops for this Trip</button><p/>
      <button @click='showSettings'> Show Settings Menu </button>
      <button @click='showAbout'> About </button>

    <modal name="AddNewStop" adaptive="true" height="auto" scrollable="true" class="newstopwindow">
    <div id="spacing">
      <AddNewStop/>
    </div>
    </modal>

    <modal name="ShowSettings" adaptive="true" height="auto">
    <div id="spacing">
      <Settings/>
    </div>
    </modal>

    <modal name="aboutPage">
    <div id="spacing">
      Developed by:
        V
      Version:
        {{version}}
    </div>
    </modal>
   
  </div>
</template>




<script>
//https://github.com/SortableJS/Vue.Draggablehttps://github.com/SortableJS/Vue.Draggable
const maxpertrip = 6
import DonorCard from './DonorCard'
import TripCard from './TripCard'
import StopCard from './StopCard'
import AddNewStop from './AddNewStop'
import Settings from './Settings'

import draggable from 'vuedraggable'
export default {
  name: 'FrontEnd',
  mounted(){
      this.$store.dispatch('loadDataFrom')
    },
  components: {
    StopCard,
    DonorCard,
    TripCard,
    AddNewStop,
    Settings,
    draggable
  },

  data () {
    return {}},
  computed:{

    donors () {
        return this.$store.state.data.donors
      },
    selectedday (){
      return this.$store.highlightedtrip
    },
    stoplist:{
      get(){
        return this.$store.state.data.stops
        },
      set(value){
        this.$store.commit('updateStopList',value)
        } 
    },
    stops () {
      return this.$store.state.data.stops
    },
    triplen () { 
      return Array.apply(null, {length: maxpertrip}).map(Number.call, Number)
    },
    trips () {
      return this.$store.state.data.trips
    }
  },
  methods:{
  testfn:function(evt){
  },
  addStopWind:function(pos){
    this.$modal.show('AddNewStop',{pos:pos})

  },
  commitStop:function(stop){
    this.$store.dispatch(this.$store,stop)
  },
  showSettings:function(evt){
  this.$modal.show('ShowSettings')
  },
  showAbout:function(evt){this.$modal.show('aboutPage')},
  onEnd:function(evt){

  },
  checkMove:function(evt,originalEvent){

  }
  }
}

</script>




<style>
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
.newstopwindow{
  
}
#spacing{
padding:20px;
border-radius:10px;
}


</style>

<!--@todo rolodex style donorcard- loc based on lastname
@todo REST integrate
@todo confirm w donor btn AFTER trip # is locked-in 
@todo if donated before lookup by email/phone
@todo default range is today - max
@todo modal popup on cancel stop
@todo next/last date view
@todo choose between multiple different views
@todo more settings
@todo disentangle donor/link id in store/script to do it automatically
@todo automatically search when complete email/phone is entered instead of separate window
@todo dotted path between slots? 
@todo get donorinfo working
@todo get LR buttons working/keyboarded?
@todo spinner promises on loads
@todo help screen on no data returned
PACKAGES USED:
vuex:
vuedraggable:https://github.com/SortableJS/Vue.Draggable
vue-js-modal:https://github.com/euvl/vue-js-modal
-->
