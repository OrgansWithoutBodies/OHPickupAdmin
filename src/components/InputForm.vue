<template>
<div>
			<div class="page current" v-if="optionType === 'btngrp'">
				<label v-for="(stop,key) in data" class='requestoption' >
					<input type="radio"  :value="key" :name="fkey"  v-model="selectedstoptype" class="optionradio">
						<div class="optionwrapper">
							<span>{{key}}</span>
						</div>
					</input>
				</label>
			</div>


			<div class="page current" v-else-if="optionType === 'txtgrp'">
				<label v-for="(stop,key) in data" class='requestoption' >
					<input type="text"   :name="fkey"  v-model="selectedstoptype" class="optionradio">
						<div class="optionwrapper">
							<span>{{key}}</span>
						</div>
					</input>
				</label>
			</div>


			<div class="page current" v-else-if="optionType === 'chkgrp'">
				<label v-for="(stop,key) in data" class='requestoption' >
					<input type="text"   :name="fkey"  v-model="selectedstoptype" class="optionradio">
						<div class="optionwrapper">
							<span>{{key}}</span>
						</div>
					</input>
				</label>
			</div>


		</div>
	
</template>
<script>
export default {
	name:"InputForm",
	props:{optionType:String,
			label:String,
			data:Object}
}
</script>
<style></style>