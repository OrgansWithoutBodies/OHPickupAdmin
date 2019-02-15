<template>
<div>
testing<!--
<div id="mapdiv" style="width:100%;height:600px;"></div>
-->
<div v-for="n in waypoints">

  <input v-for="(k,l) in n" v-model="n[l]"></input> 
  </div>
  <button @click="distbetween">dist</button>

</div>
</template>

<script>
export default{
name:'mapmodule',
data(){return{
	'waypoints':[{lat:-121.9486,long:38.3451},{lat:-121.9696,long:38.2870}],
}},
mounted(){
},
	methods:{
		distbetween:function(){

	  		this.$store.dispatch('distBetween',[this.waypoints[0]['lat'],this.waypoints[0]['long']],[this.waypoints[1]['lat'],this.waypoints[1]['long']])
	    },
}
	}

</script>
<style>
</style>