<template>
<div>
			<h3>Lookup Donor by:</h3><p/>
			Name:
			<div id="donorselect">
				<select @change="seldon" v-model='newstop.donorid'>
					<option v-for="don in donors" :value="don.id">{{don.Lastname}}, {{don.Firstname}} - {{don.Phone}}</option>
				</select>
			</div>
					OR
			<div class="fieldheader">
					Phone: </div>
			<div class="fielditem"><input type="tel" placeholder="phone #"></div><p/>
					OR
			<div class="fieldheader">
					Email: </div>
			<div class="fielditem"><input type="email" placeholder="email address"></div><p/>
			
			<!--
			Is this {{searcheddonor}}?
			<button>yes</button> <button>no</button><p/>	-->
			</div>
</template>
<script>
export default{name:"OldDonorField",
methods:{
	seldon:function(){this.$emit('seldon',this.newstop.donorid)},
},
data(){return{
	newstop:{},
    donors:this.$store.state.donors
      ,
}}}
</script>
<style scoped>
</style>