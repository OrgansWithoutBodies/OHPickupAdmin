<template>
<div class="trip">  
  
    <b class="tripdate">{{trip.Date}}</b><p/> 
    <div class="triptruck">
      Truck: <select v-model="seltruck">
          <option value="null">None</option>
        <option v-for="truck in trucks" :value="truck">{{truck.LicensePlate}} ({{truck.CabSpots}} seats)</option>
      </select>
      <div v-if="seltruck!=null" class="tripemps"><p/>
        Employees Assigned to trip:
        <select v-for="seat in seltruck.CabSpots">
          <option value="Null">None</option>
          <option v-for="emp in emps"> {{emp.Firstname}} <span v-if="emp.Driverstatus"> (DRIVER)</span></option>
        </select>
        <button>Add New Employee</button>
      </div>
      <button>Add New Truck</button>
    </div>


    <div class="tripcontent">
      <draggable :list="trip" :move="toggleFilled" >
        <stop-card :stop="stop" v-for="stop in stops">
        </stop-card>
        <div v-for="slot in triplen-stops.length" class="tripgrid">
          <div  v-bind:id="slot" class="tripslot empty" @dblclick="slotdbl" @click.shift="toggleFilled" >
            <div class="slotcontents"/>
          </div>
        </div>
      </draggable>
    </div>
    <map-module :waypoints="waypoints" class="tripmap"/>
    <div class="tripbtns">
      <input type="button" value="Save Trip Order" class="savebtn">
    </div>
</div>
</template>

<script>
//@TODO - employees assigned pops up red if no driver (ignoreable)
//@TODO - if stop is dropped into general dropzone it just gets added to end of list
//@TODO - able to drop stop into a list of trip days & let it sort itself out
//@TODO - more robust way of geocoding - @change=geocode() ? 
//https://shareurcodes.com/blog/create%20drag%20and%20droppable%20cards%20in%20laravel%20using%20vue%20js
//https://stackoverflow.com/questions/11065803/determine-what-is-being-dragged-from-dragenter-dragover-events
import StopCard from './StopCard'
import MapModule from './MapModule'
import draggable from 'vuedraggable'

export default {
  components:{StopCard,draggable,MapModule},
  name: 'TripCard',
  mounted(){
  this.loadcodes()
  console.log(this.waypoints)
  },
  updated(){
    this.loadcodes()
    },
  props: { trip: {
    type: Object,
    required: true
  },
  triplen:{type:Object,required:false,default:6},
  },
  data () {
    return {
    
    }
  },
  computed:{
  adds(){
    var adds={}

      for(var s in this.stops){
        var stop=this.stops[s]
        adds[s]=stop.Donor.Address
      }
      return adds
  },
  seltruck:{
    get:function(){
      return this.trip.Truck
      },
    set:function(truck){
      this.trip.Truck=truck
    }
  },
    emps:{
      get:function(){
        return this.$store.state.employees
      },
      set:function(){}
},
    stops(){
      return this.filterStops()
    }, 
    geocodes:{
      get:function(){
        var codes= this.$store.state.geocodes
        return codes
      },
      set:function(){


      }
    },
    waypoints(){
      var waypts=[]

      for(var s in this.stops){
        var add=this.adds[s]
        var code=this.geocodes[add]

        waypts.push({'add':add,'pos':code,'ord':stop.ScheduledOrder})
      }
      return waypts
    },
trucks:{get:function(){return this.$store.state.trucks}}
  },
  methods:{
  loadcodes:function(){this.filterStops()
    this.$store.dispatch('loadGeoCodes',this.waypoints)
    },
    filterStops:function(event){

      var stoplist=this.$store.state.stops.filter(stop => stop.ScheduledTrip==this.trip.id)

      return stoplist
    },
    onMove:function({ relatedContext, draggedContext }) {
      console.log(relatedContext.element)
    },
    
    testfn:function(evt,test){},

    toggleFilled:function(evt,original){
      console.log(evt)
      if(evt.target.className=='tripslot empty'){
        evt.target.className='tripslot filled';
      }
      else {
        evt.target.className='tripslot empty';
        console.log(evt.detail)

      }
    },
    
    slotdbl:function(evt){ 
      this.$emit("slotdbl",evt.target.id)
    },
  }
}
</script>

<style scoped>
.tripbtns{
  grid-area:btns;
}
.tripslot{
  width:50px;
  height:50px;
  border:4px solid black;
  margin:10px;
  display:inline-block;
  border-radius:5px;
}
.empty{
  background-color:red;
}
.filled{
  background-color:cyan;
}
.tripdate{
  font-size:30px;
  text-decoration:underline;
  text-transform:capitalize;
  text-shadow: 2px 3px 10px silver;
  color:#ff0000;
  grid-area:lbl;
}
.triptruck{
  grid-area:truck;}
.tripmap{
  grid-area:map;
}
.tripgrid{
  //display:inline-grid;
  margin:40px;
  //grid-template-columns: repeat(3, auto [col-start]);
}
.tripcontent{
  display:grid;
  grid-area:stops;
  grid-template-columns:1fr 1fr;}
.trip{
  background-color:#eeeeee;
  width:1000px;
  margin:5px;
  border-radius:20px;
  display:grid;
  grid-template-areas:"lbl lbl lbl"
                      "truck . ."
                      "stops map map"
                      "stops map map"
                      "stops map map"
                      "btns btns btns";
}

.unassignedbin{
  background-color:#f9f9f9;
  border-radius:10px;
  margin:10px;
}
</style>