<template>
<!--
//https://codepen.io/gabrielferreira/pen/oYxNVy
//https://codepen.io/Mestika/pen/xbgqbp-->
	<div class="formbase">
	<form @submit.prevent="onSubmit">
		<ul id="tabcontainer">
			<li class="tab" @click="changepage(index)" v-for="(forms,labels,index) in Form" :value="labels" :id="'tab '+index"><span>{{index+1}}.</span> {{labels}}</li>
		</ul>

		<div class="pagewrapper">
			<div v-for="(f,fkey,index) in Form" :id="'page '+index" class="page next">
				<div v-for="(data,opt) in f">
					<input-form label="tested" :option-type="opt" :data="data"/>
				</div>
			</div>
		</div>

		<button id="nextbtn" @click="nextpage">Next Section ▷</button>
		<button id="prevbtn" @click="prevpage">◁ Prev Section</button>
		<input id="subbtn" type="submit"/>
		</form>
	</div>
</template>

<script>
import InputForm from './InputForm'
export default {
  components:{InputForm},
  name: 'RequestInput',
  props: { 
  },
  data () {
    return {
    	'currentpage':"Stop Type",
    	'selectedstoptype':"Pickup",
    	'SelForm':{},
    	'Form':{
    		'Stop Type':{"btngrp":{'Pickup':[],'Delivery':[],'House Cleanup':[],'Dump Run':[]}},
    		"Stop Info":{"txtgrp":{"test":[],'tested':[]}},
    		"Donor Info":{"txtgrp":{'test':[],'ueatested':[]}},
    		"Confirmation":{"chkgrp":{'tast':[]}},
    		},
    	'PickupFormFields':['test','tested'],
    	'DeliveryFormFields':['testing'],
    	'CleanupFormFields':['tested'],
    	'DumpFormFields':['testificated'],
    }
  },
  mounted(){
  var init=document.getElementById("page 0");
  var intab=document.getElementById("tab 0")
  if (init!==null){
	  init.classList.remove("next");
	  init.classList.add("current");

	  intab.classList.add("current");
	  }
	},
  computed:{},
  methods:{
  onSubmit(){},
  timeoutgoing(element){
			setTimeout(function(){
				element.classList.remove('outgoing')
				element.classList.add('prev')
			},1000)
		},
	timeincoming(element){
			setTimeout(function(){
				element.classList.remove('incoming')
			},1000)
		},
	changepage(toid,frmid=null){
		if(frmid!==null){
			var currid="page "+(frmid)
			var currpage=document.getElementById(currid)
			var fromid=frmid
			}
		else{
			var currpage=document.getElementsByClassName("current page")[0]
			var currid=currpage.id
			var fromid=parseInt(currid.split(" ")[1])
		}
		if(fromid!==toid){
			var nextid="page "+(toid)
			var nextpage=document.getElementById(nextid)

			var currtab=document.getElementById("tab "+fromid)
			var nexttab=document.getElementById("tab "+toid)
			if(nextpage!==null){
				currpage.className="page outgoing"
				nextpage.className="page current incoming"
				this.timeincoming(nextpage)
				this.timeoutgoing(currpage)

				currtab.className="tab"
				nexttab.classList.add("current")
			}
		}
	},
	nextpage(evt){
		var currpage=document.getElementsByClassName("current")[0]
		var currid=parseInt(currpage.id.split(" ")[1])
		var nextid=currid+1
		this.changepage(nextid,currid)
		},

	prevpage(evt){
		var currpage=document.getElementsByClassName("current")[0]
		var currid=parseInt(currpage.id.split(" ")[1])
		var nextid=currid-1
		this.changepage(nextid,currid)
		}
	}
  }

</script>

<style>
:root{
	--basewidth:800px;

}
#tabcontainer{
	height: 50px;
  position: relative;
  margin-top: -50px;
  margin-bottom: 50px;
  padding: 0;
  font-weight: bold;
  list-style: none;
  text-transform: uppercase;

}
.tab{
  border-left: 1px solid #aaa;
    text-decoration: none;
    padding: 0 6px;
    float: left;
    width: 25%;
    box-sizing: border-box;
    text-align: center;
	font-size: 0.8em;
    font-weight: bold;
    line-height: 30px;
    background: #bbb;
    position: relative;
    float:left;
    cursor:pointer;
    
  }
  .tab.current{

      background-color:#ddd;
  }
.tab.current:after{
	 content:"";
	  border: 15px solid transparent;
      display: block;
      margin-left: 0;
      position: absolute;
      left: 0;
      top: 0;
      border-left: 20px solid orange;
}
.formbase{
	//overflow-x:hidden;
	width:var(--basewidth);
	position:relative;
	padding:20px;
	margin:80px auto;
	background-color:#aaa;
	min-height:300px;
	border-radius:10px;
}
.pagewrapper{
	position:relative;
}
.page{
	position:absolute;
}
.page.next{
	opacity:0;
	left:calc(var(--basewidth) + 150px);
}
.page.current{
	opacity:1;	
	display:grid;
	left:100px;
	grid-column-gap:10px;
	grid-row-gap:10px;
	grid-template-columns:repeat(2,100px);
	grid-template-rows:repeat(auto-fit,100px);
}
.page.prev{
	opacity:0;
}
.page.incoming{
	animation:slide-in 1s forwards;
	-webkit-animation:slide-in 1s forwards;
}

.page.outgoing{
	animation:slide-out 1s forwards;
	-webkit-animation:slide-out 1s forwards;
}



.optionlink{
	height:auto-fit;
}
.optionradio{
}

#nextbtn{
position:absolute;
bottom: 20px;
	  right: 20px;
}
#prevbtn{
position:absolute;
bottom: 20px;
	  left: 20px;
}
#subbtn{
	position:absolute;
	bottom:20px;
	right:20px;
	display:none;
}
.requestoption{
	width:100px;
	height:100px;
	background-color:green;
	margin:10px; 
	border-radius:20px;
}

@keyframes slide-in {
    100% { transform: translateX(-100%); }
}

@-webkit-keyframes slide-in {
    100% { -webkit-transform: translateX(-100%); }
}


@keyframes slide-out {
    100% { transform: translateX(-200%); }
}

@-webkit-keyframes slide-out {
    100% { -webkit-transform: translateX(-200%); }
}
</style>
