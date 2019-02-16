<template>
<div>
testing<!--
<div id="mapdiv" style="width:100%;height:600px;"></div>
<div v-for="n in waypoints">
  </div>
-->

  Street Address:<input v-model="coords['add']"></input>
  <input v-for="l in ['lat','lon']" v-model="coords[l]"></input> <button @click='geocode(coords)'>locate</button>
  <button @click="waypoints.push({'lat':'','lon':''})">+</button>
  <button @click="distbetween">dist</button>
  <!--<l-map zoom="13" class="map">
  	<l-tile-layer :url="mapdata.url"></l-tile-layer>
  </l-map>-->

<input type="button" @click="mindist" value="Minimize Trip Order by Maptime" class=""><p/>
</div>
</template>

<script>
import {LMap, LTileLayer, LMarker } from 'vue2-leaflet';
export default{
name:'mapmodule',
components:{LMap, LTileLayer, LMarker},
data(){return{
	'waypoints':[{lon:-121.9486,lat:38.3451},{lon:-121.9696,lat:38.2870}],
	'coords':{lon:'',lat:''},
	'mapdata':{'url':'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'}
}},
mounted(){
},
	methods:{
		geocode:function(way){
			this.$store.dispatch('geoCode',way['add']).then(response => {
				const adds=response['data']
		
				var coords = Object.values(adds)[0];
				console.log(coords)
				this.coords['lat']=coords['lat'];
				this.coords['lon']=coords['lon'];

			})
		},
		mindist:function(event,coords=[[38.345839, -121.986624],
				[38.407362, -121.971104],
				[38.359999, -122.005475],
				[38.335572, -121.950267],
				[38.335572, -121.950267],]){
			this.$store.dispatch('minDist',coords)

		},
		distbetween:function(){
	  		this.$store.dispatch('distBetween',[this.waypoints[0]['lon'],this.waypoints[0]['lat']],[this.waypoints[1]['lon'],this.waypoints[1]['lat']])
	    },
}
	}

</script>
<style scoped>
.map{
	width:1000px;
}
</style>