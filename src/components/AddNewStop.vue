<template>
<div class="windowwrapper spacing">
	<h1 class="title">Add New Stop </h1>
	

		<div class="fieldheader">
		Description of Items:
		</div>
		<div class="fielditem">
			<textarea rows="4" cols="50" id="Itemdesc" v-model='newstop.items'/></div></p>
		<div class="fieldheader">
		Donor has donated before:
		<label class="switch">
  <input type="checkbox" v-model="oldDon">
  <span class="slider round"></span>
</label>
	</div></p>
		<div id="oldDonMenu" v-show="oldDon">
			<old-donor-form @seldon="updateDonId"/>
		</div>

		<div id="newDonMenu" v-show="!oldDon">
			<new-donor-form @change="updateDonItem"/>
		</div>
		<br>
		<button class="canc" @click="$emit('close')">Cancel</button>
		<button class="save" @click="validateDonor">Save</button>
		
	</div>
</template>

<script>
//https://www.w3schools.com/howto/howto_css_switch.asp
import NewDonorForm from './formComponents/NewDonorForm.vue';
import OldDonorForm from './formComponents/OldDonorForm.vue';
export default{  
	props: { 
		trip: {
		    type: Object,
		    required: false
	  		},	
		  trippos:{type:Number,required:false}
		},
  components:{NewDonorForm,OldDonorForm},
  computed:{
    },
  data () {
    return {
      oldDon:false,
      newstop:{items:'',donorid:''},
      }},

  methods:{
  updateDonId:function(id){this.seldonid=id},
  updateDonItem:function(donor){
  console.log(donor)
 	 this.newdonor=donor
  	},
  	  testfn:function(){
  	  	alert('test')
  	  },
	  commitStop:function(stop){
	  	alert(stop);
	    this.$store.dispatch(this.$store,stop);
	  },

	  validateDonor(){
	  //LOCATIONS=[("OUT","Outside location of residence (pickups clearly marked)"),("INF","Inside residence (first floor/garage)"),("INU","Inside residence (upper floor)")]

	  	  var time=new Date()

		  if(this.oldDon){
		  	var donid=this.seldonid
		  	console.log(this.seldonid)
		  }
		  else{
			var donordict={Firstname: this.newdonor.Firstname,
			Lastname: this.newdonor.Lastname,
			Address: this.newdonor.Address,
    		Phone: this.newdonor.Phone,
		    Email: this.newdonor.Email,
		    Business:'',
			OtherInfo:this.newdonor.Other}

		  	var donid=this.$store.dispatch('addDonor',donordict)
		  }
		  var stopdict={
		  	  RequestedTimestamp:time,
			  ScheduledTrip:this.trippos,
			  Status:"RQ",
			  StopType:"PU"}
		  stopdict['RequesterId']=donid['Data']
//		  var stopid=this.$store.dispatch('addStop',stopdict)
		
	//	  var dondict={
	//	  	  StopId:stopid
	//		  ItemLocation:"OUT",
	//		  Items:this.newstop.items,
	//	  }
		  //@todo check if already in db
		  //@todo validate address format w OSM/GM

		}
	  }
	}

</script>

<style scoped>
.canc{
	background-color:#720618;
}
.save{
	background-color:#3b7206;
}
.window{
	margin:50px;
}
.windowwrapper{
position: relative;
    z-index: 1200;
}
.fieldheader{
	margin-left:20px;
}
.fielditem{
	margin-left:40px;
}
#oldDonMenu,#newDonMenu{
	background-color:#eeeeee;
	margin-left:10px;
	padding:10px;

}
#addnewdon{
	display:inline-block;
	width:20px;
	height:20px;
	vertical-align:middle;
	background-color:red;
}
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: green;
}

input:focus + .slider {
  box-shadow: 0 0 1px green;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>