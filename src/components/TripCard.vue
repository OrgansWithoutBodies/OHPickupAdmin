<template>
<div class="trip">
    <b class="tripdate">{{trip.date}}</b><p/> 
    <div v-for="slot in triplen" class="tripgrid">
      <div  v-bind:id="slot" class="tripslot empty" @dblclick="slotdbl" @click.shift="toggleFilled">
      <div class="slotcontents"/>
      </div>
   </div>
</div>
</template>

<script>
export default {
  name: 'TripCard',
  props: { trip: {
    type: Object,
    required: true
  },triplen:{type:Object,required:false,default:6}
  },
  data () {
    return {
 
    }
  },
  methods:{
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
  display:grid;
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
}
.tripgrid{
  //display:inline-grid;
  //grid-template-columns: repeat(3, auto [col-start]);
}
.trip{
  background-color:#eeeeee;
  width:1000px;
  margin:5px;
  border-radius:20px;
}
</style>