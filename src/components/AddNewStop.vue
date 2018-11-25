<template>
<div>
<h1 class="title">Add New Stop </h1>
<form>
<div id="window" v-if="loc">{{loc}}</div>
<div class="fieldheader">
Description of Items:
</div>
<div class="fielditem">
<textarea rows="4" cols="50" class="Itemdesc"/></div></p>
<div class="fieldheader">
Donor has donated before:
<div class="fielditem"><button id="oldDonor" @click="toggleDon">toggle</button></div></div></p>
<div id="oldDonMenu" style="display:none;">

	<h3>Lookup Donor by:</h3><p/>

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
	<h3>Add New Donor</h3>
	<div class="fieldheader">
	Donor Name:</div><div class="fielditem"><input type='text' placeholder="First Name"> <input type='text' placeholder="Last Name"></div></p>
	<div class="fieldheader">
	Donor Phone:</div><div class="fielditem"><input type='tel' placeholder="Phone Number"></div></p>
	<div class="fieldheader">
	Donor Email:</div><div class="fielditem"><input type='email' placeholder="Email"></div></p>
</div>
</form>
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
      pos:pos,
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
</style>