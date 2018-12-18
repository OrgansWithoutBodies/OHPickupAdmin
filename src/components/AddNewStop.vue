<template>
<div>
<h1 class="title">Add New Stop </h1>
<form>


<div id="window" v-if="loc">{{loc}}</div>
<div class="fieldheader">
Description of Items:
</div>
<div class="fielditem">
<textarea rows="4" cols="50" id="Itemdesc" v-model='newstop.items'/></div></p>
<div class="fieldheader">
Donor has donated before:
<div class="fielditem"><button id="oldDonor" @click="toggleDon">toggle</button></div></div></p>
<div id="oldDonMenu" style="display:none;">

	<h3>Lookup Donor by:</h3><p/>
Name:
<div id="donorselect">
<select v-model='newstop.donorid'>
<option v-for="don in donors" v-bind:value="don.id">{{don.lastname}}, {{don.firstname}} - {{don.phone}}</option>
</select>
<div id="addnewdon" v-on:click="testfn">+</div>
</div>

<div class="fieldheader">
		Phone: </div>
<div class="fielditem"><input type="tel" placeholder="phone #"></div><p/>
		
<div class="fieldheader">
		Email: </div>
<div class="fielditem"><input type="email" placeholder="email address"></div><p/>
<!--
Is this {{searcheddonor}}?
<button>yes</button> <button>no</button><p/>	-->
</div>

<div id="newDonMenu" style="display:block;">
	<new-donor-form/>
</div>
<br>
<button @click="validateDonor">Save</button>
<button>Cancel</button>
</form>
</div>
</template>

<script>
import newDonorForm from './formComponents/newDonorForm.vue';
export default{  
	props: { 
		trip: {
		    type: Object,
		    required: false
	  		},	
		  trippos:{type:Object,required:false}
		},
  components:{'new-donor-form':newDonorForm,},
  computed:{
    donors () {
        return this.$store.state.data.donors
      },
    },
  data () {
    return {
    
      oldDon:false,
      newstop:{items:'',donorid:''},
      }},

  methods:{
  	  testfn:function(){
  	  	alert('test')
  	  },
	  commitStop:function(stop){
	  	alert(stop);
	    this.$store.dispatch(this.$store,stop);
	  },
	  toggleDon:function(){
	  	var olddiv=document.getElementById("oldDonMenu");
	  	var newdiv=document.getElementById("newDonMenu")

	  	if (olddiv.style.display=="none"){
	  		olddiv.style.display="block";
	  		newdiv.style.display="none";
	  		}
		else{
			olddiv.style.display="none";	
			newdiv.style.display="block";
			}},

	  validateDonor(){
		  var firstname=document.getElementById("FirstName")
		  var lastname=document.getElementById("LastName")
		  var phone=document.getElementById("Phone")
		  var address=document.getElementById("Address")
		  var email=document.getElementById("Email")
		  var other=document.getElementById("Other")
		  var donordict={firstname: firstname.value,
			    lastname: lastname.value,
			    address: address.value,
			    phone: phone.value,
			    email: email.value,
			    other:other.value}

		  var items=document.getElementById("Itemdesc")
		  //@todo check if in db
		  //@todo validate address format w OSV/GM

		  var stopdict={inputtime: 1234,
		  stoptype:"pickup",
		  status: "Unmarked",
		  hidden:"false",
		  items: items,
		  donor: donordict}

		  this.$store.dispatch('addStop',this.$store,stopdict)
		  alert(stopdict)
		}
	  }
	}

</script>

<style scoped>
.window{
	margin:50px;
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
</style>