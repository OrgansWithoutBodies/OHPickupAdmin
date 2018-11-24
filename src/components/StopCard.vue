<template>
<div class="card">

<b class="items"> </b> {{stop.inputtime}}<p/>
<i class="address"></i><p/>
<u class="phone"> {{stop.donor.phone}}</u><p/>
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
.hidebtn{
  background-color:#f2ed4e;
}
.delbtn{
  background-color:#ff0000;
}
</style>