<template>
<div>
<h1 class="title">Add New Stop </h1>
<form>
<div v-if="loc">{{loc}}</div>
Description of Items:
<textarea rows="4" cols="50" class="Itemdesc"/></p>

Donor has donated before:<button id="oldDonor" @click="toggleDon">toggle</button></p>
<div id="oldDonMenu" style="display:none;">
	Lookup Donor by:<p/>
		Phone: <input type="tel"><p/>
		Email: <input type="email">
<!--
Is this {{searcheddonor}}?
<button>yes</button> <button>no</button><p/>	-->
</div>

<div id="newDonMenu" style="display:block;">
	Donor Name:<input type='text' placeholder="First Name"> <input type='text' placeholder="Last Name"></p>
	Donor Phone:<input type='tel' placeholder="Phone Number"></p>
	Donor Email:<input type='email' placeholder="Email"></p>
</div>
</form>
<button>Save</button>
<button>Cancel</button>
</div>
</template>
<script>
export default{  props: { trip: {
    type: Object,
    required: false
  },pos:{type:Object,required:false}
  },
  data () {
    return {
      loc: [trip,pos],
      oldDon:false}},
  methods:{toggleDon:function(){
  	var olddiv=document.getElementById("oldDonMenu");
  	var newdiv=document.getElementById("newDonMenu")

  	if (olddiv.style.display=="none"){
  		olddiv.style.display="block";
  		newdiv.style.display="none";
  		}
	else{
		olddiv.style.display="none";	
		newdiv.style.display="block";
		}}}
	}
</script>

<style>
#oldDonMenu,#newDonMenu{
	background-color:#eeeeee;

}
</style>