<template>
<div>
	<div v-show="line.edit==false">
		<label @dblclick = "line.edit = true">
			{{line.title}} 
		</label>
	</div>  
	
	<input v-show="line.edit==true" v-model="line.title"  v-on:blur= "line.edit=false; $emit('update')" @keyup.enter = "line.edit=false; $emit('update')" @keyup.esc = "line.edit=false; $emit('update')">
	</input> 
</div>
</template>

<script>
export default {
	name:'EditLine',
	props:{str:{
		type:String,
		required:true
	}},
	beforeMount(){
		this.line={
			'title':this.str,
			'edit':false
		}

	},
	data(){return {line:{}}},
	methods:{
	},
	computed:{}
}
</script>
<style scoped>
</style>