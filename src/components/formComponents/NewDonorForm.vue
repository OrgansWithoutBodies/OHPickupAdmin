<template>
<div>
<h3>Add New Donor</h3>
	<div class="fieldheader">
	Donor Name:</div><div class="fielditem"><input @change="$emit('change',newdon)" type='text' placeholder="First Name" id="FirstName" v-model="newdon.Firstname"> <input type='text' placeholder="Last Name" @change="$emit('change',newdon)" id="LastName" v-model="newdon.Lastname"></div></p>
	<div class="fieldheader">
	Donor Address:</div><div class="fielditem"><input  @change="$emit('change',newdon)" type='text' placeholder="Address" id="Address" v-model="newdon.Address"></div></p>
	<div class="fieldheader">
	Donor Phone:</div><div class="fielditem"><input @change="$emit('change',newdon)" type='tel' placeholder="Phone Number" id="Phone" v-model="newdon.Phone"></div></p>
	<div class="fieldheader">
	Donor Email:</div><div class="fielditem"><input @change="$emit('change',newdon)" type='email' placeholder="Email" id="Email" v-model="newdon.Email"></div></p>
	<div class="fieldheader">
	Business:</div><div class="fielditem"><input @change="$emit('change',newdon)" type='email' placeholder="Business" id="Business" v-model="newdon.Business"></div></p>
	<div class="fieldheader">
	Other Info:</div><div class="fielditem"><textarea @change="$emit('change',newdon)" rows="4"  cols="40" id="Other" v-model="newdon.Other" placeholder="Special Instructions for contacting this donor"/></div>
	</div>
</template>

<script>
export default{
 props:{},
 methods:{},
 data () {
    return {
	    newdon:  
			{Firstname:'',
			    Lastname:'',
			    Address: '',
			    Phone: '',
			    Email: '',
			    Business:'',
			    Other:''},
		}
	}
}
</script>
<style></style>