<template>	
	<div class="Settings">
	<h1>Settings</h1>
	<b>Backend:</b>
	<input type="radio" id="json" value="JSON" v-model="backend" @click=showJsonMenu>
	<label for="json">JSON File</label>
	<br>
	<input type="radio" id="rest" value="REST" v-model="backend" @click=showRestMenu >
	<label for="rest">RESTful API</label>
	<br>
	<input type="radio" id="docker" value="Docker" v-model="backend" @click=showDockerMenu >
	<label for="rest">Docker Container</label>
	
	<modal name="REST">
	<h1>RESTful Endpoints:</h1>
	Incoming (Stops):<input type="url" placeholder="Incoming endpoint URL"><p/>
	Outgoing (Trips):<input type="url" placeholder="Outgoing endpoint URL"><p/>
	(write/update permissions necessary to save to outgoing endpoint!)<p/>
	<button @click=hideRestMenu>save</button><button @click=hideRestMenu>cancel</button>
	</modal>

	<modal name="JSON">
	<h1>Local JSON File:</h1>
	Create Blank File: <button>New</button><p/>
	Upload Configured File: <button>Select</button><p/>

	<button @click=hideJsonMenu>save</button><button @click=hideJsonMenu>cancel</button>
	</modal>

	<modal name="Docker">
	<h1>Docker Configuration:</h1>
	
	<button @click=hideDockerMenu>save</button><button @click=hideDockerMenu>cancel</button>
	</modal>

	<b>Help:</b><p/>
	<a href="https://github.com/OrgansWithoutBodies/OHPickupAdmin/wiki/Home">Link to wiki</a> 

	

	</div>
</template>

<script>
export default{  props: { trip: {
    type: Object,
    required: false
  },pos:{type:Object,required:false}
  },
  name:'Settings',
  data () {
    return {
      backend: "",

      }
    }
  ,

  methods:{
showRestMenu:function(evt){
	this.$modal.show('REST')
},
hideRestMenu:function(evt){
	this.$modal.hide('REST')
},
showJsonMenu:function(evt){
	this.$modal.show('JSON')
},
hideJsonMenu:function(evt){
	this.$modal.hide('JSON')
},
showDockerMenu:function(evt){
	this.$modal.show('Docker')
},
hideDockerMenu:function(evt){
	this.$modal.hide('Docker')
},

findJSONFile:function(evt){
	}
}}

</script>

<style>
</style>