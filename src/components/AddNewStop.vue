<template>
<div>
<h1 class="title">Add New Stop </h1>
<form>
<div id="window" v-if="loc">{{loc}}</div>
<div class="fieldheader">
Description of Items:
</div>
<div class="fielditem">
<textarea rows="4" cols="50" id="Itemdesc"/></div></p>
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
	Donor Name:</div><div class="fielditem"><input type='text' placeholder="First Name" id="FirstName"> <input type='text' placeholder="Last Name" id="LastName"></div></p>
	<div class="fieldheader">
	Donor Address:</div><div class="fielditem"><input type='text' placeholder="Address" id="Address"></div></p>
	<div class="fieldheader">
	Donor Phone:</div><div class="fielditem"><input type='tel' placeholder="Phone Number" id="Phone"></div></p>
	<div class="fieldheader">
	Donor Email:</div><div class="fielditem"><input type='email' placeholder="Email" id="Email"></div></p>
	<div class="fieldheader">
	Other Info:</div><div class="fielditem"><textarea rows="4"  cols="40" id="Other" placeholder="Special Instructions for contacting this donor"/></div>
</div>
<br>
<button @click="validateDonor">Save</button>
<button>Cancel</button>
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


  }}
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