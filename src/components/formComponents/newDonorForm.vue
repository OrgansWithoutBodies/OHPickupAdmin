<template>
<div>
<h3>Add New Donor</h3>
	<div class="fieldheader">
	Donor Name:</div><div class="fielditem"><input type='text' placeholder="First Name" id="FirstName" v-model="newdon.firstname"> <input type='text' placeholder="Last Name" id="LastName" v-model="newdon.lastname"></div></p>
	<div class="fieldheader">
	Donor Address:</div><div class="fielditem"><input type='text' placeholder="Address" id="Address" v-model="newdon.address"></div></p>
	<div class="fieldheader">
	Donor Phone:</div><div class="fielditem"><input type='tel' placeholder="Phone Number" id="Phone" v-model="newdon.phone"></div></p>
	<div class="fieldheader">
	Donor Email:</div><div class="fielditem"><input type='email' placeholder="Email" id="Email" v-model="newdon.email"></div></p>
	<div class="fieldheader">
	Other Info:</div><div class="fielditem"><textarea rows="4"  cols="40" id="Other" v-model="newdon.other" placeholder="Special Instructions for contacting this donor"/></div>
	</div>
</template>

<script>
export default{
 props:{},
 data () {
    return {
	    newdon:  
			{firstname:'',
			    lastname:'',
			    address: '',
			    phone: '',
			    email: '',
			    other:''},
		olddon:
		{phone:'',email:''}
		}
	}
}
</script>
<style></style>