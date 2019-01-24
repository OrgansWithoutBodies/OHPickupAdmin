<template>
<div class="trip">  

    <b class="tripdate">{{trip.date}}</b><p/> 
    <div class="tripcontent">
<div>
    <div v-for="slot in triplen" class="tripgrid">
      <div  v-bind:id="slot" class="tripslot empty" @dblclick="slotdbl" @click.shift="toggleFilled" @dragenter="toggleFilled">
      <div class="slotcontents"/>
      </div>
   </div>
</div>
   <div class="unassignedbin">
   <b>Unassigned Stops Bin</b>
    <draggable :list="stops" :options="dragOptions" :move="onMove"><!--:options="{group:'cards'}"-->
     
      <div v-for="stop in stops">
             <stop-card v-bind:stop="stop"/>
      </div>
     
    </draggable>
  </div>
  </div>
  
<input type="button" value="Minimize Trip Order by Maptime" class=""><p/>
<input type="button" value="Save Trip Order" class="savebtn">

</div>
</template>

<script>
//https://shareurcodes.com/blog/create%20drag%20and%20droppable%20cards%20in%20laravel%20using%20vue%20js
//https://stackoverflow.com/questions/11065803/determine-what-is-being-dragged-from-dragenter-dragover-events
import StopCard from './StopCard'
import draggable from 'vuedraggable'

export default {
  components:{StopCard,draggable},
  name: 'TripCard',
  props: { trip: {
    type: Object,
    required: true
  },
  triplen:{type:Object,required:false,default:6},
  stops:{type:Object,required:false},
  },
  data () {
    return {
 
    }
  },
  computed:{dragOptions(){return{animation:0,ghostClass:"ghost"}}},
  methods:{
    onMove:function({ relatedContext, draggedContext }) {
      console.log(relatedContext.element)
    },
    testfn:function(evt,test){console.log(evt)},
    toggleFilled:function(evt){

      if(evt.target.className=='tripslot empty')
        evt.target.className='tripslot filled';
        else evt.target.className='tripslot empty'
    },
    slotdbl:function(evt){ 
      this.$emit("slotdbl",evt.target.id)
    }
  }
}
</script>

<style scoped>
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
.ghost{
  opacity:0.7;
  background: #eefbff;
}
.tripdate{
  font-size:30px;
  text-decoration:underline;
  text-transform:capitalize;
  text-shadow: 2px 3px 10px silver;
  color:#ff0000;
}
.tripgrid{
  //display:inline-grid;
  margin:40px;
  //grid-template-columns: repeat(3, auto [col-start]);
}
.tripcontent{
  display:grid;
  grid-template-columns:1fr 1fr;}
.trip{
  background-color:#eeeeee;
  width:1000px;
  margin:5px;
  border-radius:20px;
}

.unassignedbin{
  background-color:#f9f9f9;
  border-radius:10px;
  margin:10px;
}
</style>