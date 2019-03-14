<template>
	<div class="modwrapper">
	<div v-for="s in stops">
	</div>

		<div class="mapwrapper">
		 <l-map :zoom="mapdata.zoom" :center="ohlatlon" class="map">
		      <l-tile-layer :url="mapdata.url" :attribution="mapdata.attribution"></l-tile-layer>
		      <l-marker :lat-lng="ohlatlon" >
		      	<l-tooltip content="Thrift Store" />
		      </l-marker>
		      <div v-for="s in stops">
		      <l-marker v-if="s.Donor.pos"  :lat-lng="s.Donor.pos">
		      	<l-tooltip :content="s.Donor.Address+' ('+s.Donor.Firstname+' '+s.Donor.Lastname+') '">
		      	</l-tooltip>
		      </l-marker>
		      </div>

		    
		      <l-polyline :lat-lngs="tripgeoms" color="orange" :fillOpacity="0"/>
		    </l-map>
		</div>
		<input type="button" @click="mindist" value="Order Route by minimum trip time" class=""><p/>
	</div>
</template>

<script>
//@TODO - add up trip distances & time - hover over route has individual distance?
import {LMap, LTileLayer, LMarker,LIcon, LTooltip,LPolyline } from 'vue2-leaflet';

export default{
name:'mapmodule',
props:{
	tripid:{
		type:Number,
		required:false
	},
	waypoints:{
		type:Array,
		required:false
	}
},
components:{LMap, LTileLayer, LMarker,LTooltip,LPolyline},
data(){return{
	'ohlatlon':{'lat':38.353184,'lng': -121.975337},
	'shelterlatlon':[38.366197,-121.976714],
	'mapdata':{'url':'http://{s}.tile.osm.org/{z}/{x}/{y}.png','zoom':13,'attribution':'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'},
	'mintime':null,
	'routes':null,
	'tripgeoms':[],
}},
updated(){
},
computed:{
	stops:function(){
      return this.$store.state.stops.filter(stop => stop.ScheduledTrip==this.tripid)
	},
	orderedwaypoints:function(){
		if (this.mintime!=null){
			const ways=[{'pos':this.ohlatlon},...this.waypoints]
			var ordlist=[]
			for(var m in this.mintime){//traverses the track
				ordlist.push(ways[this.mintime[m]]['pos'])
			}
			ordlist.push(ordlist[0])
			return ordlist
		}
		else{
			return []
		}
	},
},
methods:{
		mindist:function(event){
			var coords = [this.ohlatlon];
			for(var s in this.stops){
				try{
					coords.push(this.stops[s]['Donor']['pos'])
				}
				catch(err){
					console.log(this.waypoints)
				}
			}
			this.$store.dispatch('minDist',coords).then(response => {
				var pts=[];
				const wy=response['waypts']//ordered list of trip route stops
				for (var pt in wy){
					const o=wy[pt]['waypoint_index']
					pts.push(o)
					if(o>0){//o isn't thrift store
						this.stops[o-1]['ScheduledOrder']=pt
					}
				};
				var tripgeoms =[]
				for(var t in response['trips']){
					const crds=response['trips'][t]['geometry']['coordinates']
					for(var crd in crds){
					tripgeoms.push({'lng':crds[crd][0],"lat":crds[crd][1]})
					}

					this.waypoints[t]['dist']=response['trips'][t]['distance']

				}
				this.tripgeoms=tripgeoms
				
			this.$emit('ordered',pts)
			this.$store.dispatch('nestOrders',pts)
			
				this.mintime=pts;
			}).catch(err => console.log(err))
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