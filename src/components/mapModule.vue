<template>
<div class="mapwrapper">
	<div v-for="(pt,k) in waypoints">
	  <div>
	  Street Address:<input v-model="pt['add']"></input>
	<!--  <div class="orderbubble" v-if="pt['ord']!=null">{{pt['ord']}}</div>
	  <p/>-->
	  <input v-for="l in ['lat','lng']" v-model="pt['pos'][l]"></input> 
	  <button @click='geocode(k)'>locate</button>
	  <button @click="chOrd(pt,-1)">▲</button><button>▼</button><button>X</button>
	  </div>
	</div>
	  <button @click="waypoints.push({'add':'','pos':{'lng':'','lat':''}})">+</button>
	  <div>
	 <l-map :zoom="mapdata.zoom" :center="ohlatlon" class="map">
	      <l-tile-layer :url="mapdata.url" :attribution="attribution"></l-tile-layer>
	      <l-marker :lat-lng="ohlatlon" ><l-tooltip content="Store"></l-tooltip></l-marker>
	      <l-marker v-for="pt in waypoints" :lat-lng.sync="pt['pos']">
	      	<l-tooltip :content="pt['add']">
	      	</l-tooltip>
	      </l-marker>
	      <!--<l-polyline :lat-lngs="orderedwaypoints" color="green" weight="5" fillOpacity="0" />-->
	      <l-polyline :lat-lngs="tripgeoms" color="orange" fillOpacity="0"/>
	    </l-map>
	    </div>
	<input type="button" @click="mindist" value="Order Stops by minimum trip time" class=""><p/>
</div>
</template>

<script>
import {LMap, LTileLayer, LMarker,LIcon, LTooltip,LPolyline } from 'vue2-leaflet';

export default{
name:'mapmodule',
components:{LMap, LTileLayer, LMarker,LTooltip,LPolyline},
data(){return{
	'waypoints':[{'add':'','pos':{lng:-121.9486,lat:38.3451},'ord':1},{'ord':2,'add':'','pos':{lng:-121.9696,lat:38.2870}}],
	'coords':{lng:'',lat:''},
	'addresses':[],
	'attribution':'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
	'ohlatlon':{'lat':38.353184,'lng': -121.975337},
	'shelterlatlon':[	38.366197,-121.976714],
	'mapdata':{'url':'http://{s}.tile.osm.org/{z}/{x}/{y}.png','zoom':13},
	'mintime':null,
	'routes':null,
	'tripgeoms':[],
}},
mounted(){
},
computed:{
	orderedwaypoints:function(){
		if (this.mintime!=null){
			const ways=[{'pos':this.ohlatlon},...this.waypoints]
			var ordlist=[]
			for(var m in this.mintime){
				ordlist.push(ways[this.mintime[m]]['pos'])
			}
			ordlist.push(ordlist[0])
			return ordlist
		}
		else{
			return []
		}
	},
	latlons:function(){
		for(add in this.addresses){
			this.geocode(add)
		}
	}
},
methods:{
chOrd:function(pt,dir){
//	const ind = this.waypoints.indexOf(pt)
//	if(ind>0){
//		const pluck = this.waypoints[ind+dir]
//		this.waypoints[ind+dir]=this.waypoints[dir]
//		this.waypoints[ind]=pluck
//	}
},
		geocode:function(id){
			var point= this.waypoints[id]
			this.$store.dispatch('geoCode',point['add']).then(response => {
				const adds=response['data']
		
				var coords = Object.values(adds)[0];
				point['pos']['lat']=coords['lat'];
				point['pos']['lng']=coords['lng'];

			})
		},
		mindist:function(event){
			var coords = [this.ohlatlon];
			for(var pt in this.waypoints){
				coords.push(this.waypoints[pt]['pos'])
			}
			this.$store.dispatch('minDist',coords).then(response => {
				var pts=[];
				const wy=response['waypts']
				for (var pt in wy){
					const o=wy[pt]['waypoint_index']
					pts.push(o)
				};
				var tripgeoms =[]
				for(var t in response['trips']){
					const crds=response['trips'][t]['geometry']['coordinates']
					for(var crd in crds){
					tripgeoms.push({'lng':crds[crd][0],"lat":crds[crd][1]})
					}
				}
				this.tripgeoms=tripgeoms
				console.log(tripgeoms)
				this.mintime=pts;
			})
		},
	}
}

</script>
<style scoped>
.orderbubble{
	background-color:blue;
	width:20px;
	display:inline-block;
	border-radius:50%;
	color:white;
}
.mapwrapper{
}
.map{
	height:300px;
	width:500px;
	border: 1px solid black;
}
</style>