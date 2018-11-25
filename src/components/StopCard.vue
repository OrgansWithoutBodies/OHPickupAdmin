<template>
<div class="card">

<u class="donor"> {{stop.donor.firstname}}, {{stop.donor.lastname}}</u><p/>
<b class="items"> </b> {{stop.items}}<p/>
<div class="donorinfo">
<i class="address">{{stop.donor.address}}</i><p/>
<u class="phone"> {{stop.donor.phone}}</u><p/>
</div><p/>

<b class="status">{{stop.status}}</b>
<input type="button" value="Mark Called" class="called"><p/>

<div class="responsediv">
<select id="response">
<option value=""> Please Select Response Below </option>
<option value="confirmed">Confirmed </option>
<option value="noans">No Answer</option>
</select>
<button>Save Response</button><p/>
</div>
<input type="button" class="hidebtn" value="Hide Stop">
<input type="button" class="delbtn" value="Cancel Stop">

</div>
</template>

<script>
var dataURL = "/home/v/myapp/src/components/dons.json"

export default {
  name: 'StopCard',
  props: { stop: {
    type: Object,
    required: true
  }
  },
  data () {
    return {
      stop: stop
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card{
background-color:#dddddd;
border:2px solid #999999;
position:relative;
min-width: 100px;
max-width: 300px;
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
transition: 0.3s;
border-radius: 5px;
}
.phone {
  color: #42b983;
}
.phone:before{
  content:"";
  display:inline;
  width:10px;
  height:10px;
  color:#ff0000;
}
.donorinfo{
  display:inline-block;
  padding:10px 50px;
  background-color:#cdcdcd;
  border-radius:8px;
}
.hidebtn{
  background-color:#f2ed4e;
}
.delbtn{
  background-color:#ff0000;
}
.responsediv{
  display:none;
}
</style>