 <template>
  <div class="test">
  <div class="tripcontrol">
    <button>◀</button>
    <select v-model="selectedday"><option v-for="trip in trips" :value="trip.Date" >{{trip.Date}}</option></select>
    <button>▶</button>  
    <button >+</button>
  </div>

  <trip-card v-if="seltrip"  :trip="seltrip" @slotdbl="addStopWind"/>

   <div class="unassignedbin">
    <b>Unassigned Stops Bin</b>

    <draggable v-model="stoplist" :options="dragOptions" :move="onMove" class="bin"> 
      <div v-for="stop in stoplist"  v-if="stop.ScheduledTrip==null">
             <stop-card :stopid="stop.id"/>
      </div>
    </draggable>
   </div>
   <button> ... </button><p/>

   
      <button @click="addStopWind"> Add New Stop </button>
      <button> Show Hidden Stops</button><p/>
      <button> Save Stops for this Trip</button><p/>
      <button @click='showSettings'> Show Settings Menu </button>
      <button @click='showAbout'> About </button>

    <modal name="AddNewStop" :adaptive="true" height="auto" :scrollable="true" class="newstopwindow">
        <AddNewStop :trippos="modaltrip" @close="hidenewstop"/>
      
    </modal>
    <modal name="ShowSettings" :adaptive="true" height="auto">
    <div class="spacing">
      <Settings/>
    </div>
    </modal>

    <modal name="aboutPage">
    <div class="spacing">
      Developed by:
        V
        <p/>
      Version:
        {{version}}
    </div>
    </modal>
   
  </div>
</template>




<script>
//@TODO - on drop make ScheduledTrip=droppedID, set order either based on dropped position or if none then last
//@TODO - computed property of latlons of all addresses
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
  beforeMount(){
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
    return {version:process.env.VUE_APP_VERSION,
    modaltrip:null}},
  computed:{
    dragOptions(){return{animation:1,ghostClass:"ghost"}},//{group:'cards',handle:'.handle'}
    seltrip(){
      const fil= this.trips.filter(trip => trip.Date==this.selectedday)
      return fil[0]
    },
    selectedday:{
      get:function(){
      return this.$store.state.selday
      },
      set:function(sel){
      this.$store.dispatch('changeSelTrip',sel)
      }
    },
    donors:{
      get(){
        return this.$store.state.donors
        },
      set(value){
        this.$store.dispatch('updateStopList',value)
        } 
      },
      stoplist:{
        get(){
          return this.$store.state.stops
          },
        set(value){
          this.$store.dispatch('updateStopList',value)
          } 
    },
    trips () {
      return this.$store.state.trips
    }
  },
  methods:{
    hidenewstop(){this.$modal.hide('AddNewStop')},
    testfn:function(evt){
    },
    addStopWind:function(pos){
      this.modaltrip=pos
      this.$modal.show('AddNewStop')

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
    onMove:function(evt){
      console.log(evt.draggedContext.element.id)
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
    z-index: 1200;

}
.spacing{
padding:20px;
border-radius:10px;
}

.ghost{
  opacity:0.7;
  background: #eefbff;
}
.bin{
  display:grid;
  width:100%;
  grid-template-columns:repeat(auto-fill,300px);
  grid-template-rows:1000px;
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
