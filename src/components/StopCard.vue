<template>
  <div class="card">
    <select v-model="stop.ScheduledTrip">
    <option :value="null">Unscheduled</option>
    <option v-for="trip in $store.state.trips" :value="trip.id">{{trip.Date}}</option>
    </select>
    <div v-if="stop.ScheduledTrip!=null">
      <button @click="chOrd(pt,-1)">▲</button><button>▼</button>
      {{stop.ScheduledOrder}}
      {{stop.Donor.Firstname}}
      <div class="handle">
      X
      </div>
    </div>
    <div v-else>
      <div v-if="stop.Donor">
        <button class="donor" @click="toggleDon(stop.Donor.id)" v-bind:id="stop.inputtime"> {{stop.Donor.Firstname}}, {{stop.Donor.Lastname}}</button><p/>
        <div class="donorinfo" :id="'donorinfo '+stop.Donor.id"   style="display:inline-block;">
          <i class="address">{{stop.Donor.Address}}</i><p/>
          <u class="phone"> {{stop.Donor.Phone}}</u><p/>
        </div><p/>
      </div>
    </div>
    <!--
    <b class="items"> Items:</b> {{stop.items}}
    <input type="button" value="Update Items" class="updateitems"><p/>
    <b class="status">{{stop.status}}</b>
    <input type="button" value="Mark as Called" class="called"><p/>

    <div class="responsediv">
    <select id="response">
    <option disabled value=""> Please Select Response Below </option>
    <option value="confirmed">Confirmed </option>
    <option value="noans">No Answer</option>
    </select>
    <button>Save Response</button><p/>
    </div>
    -->
    <!--
    <input type="button" class="hidebtn" value="Hide Stop">
    <input type="button" class="delbtn" value="Cancel Stop" @click="showCancel">
-->

     <modal name="CancelWarning" adaptive="true">
     <div id="spacing">
        <h1>Warning</h1>: This will permanently delete information related to this stop. If you Hide the stop instead then all data will remain in database.
        <p/>
        <button @click='hideWarning'>Keep Stop</button>

        <button @click='heedWarning'>Cancel Stop</button>
        </div>
        </modal>

  </div>
</template>

<script>
//@TODO - editable address
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
  },
  methods:{
  showCancel:function(evt){this.$modal.show('CancelWarning')},
  toggleDon:function(id){

    var dondiv=document.getElementById("donorinfo "+id)
    if (dondiv.style.display=="none"){
      dondiv.style.display="inline-block";
      }
  else{
    dondiv.style.display="none";  
    }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card{
background-color:#dddddd;
border:10px solid #999999;
position:relative;
min-width: 100px;
max-width: 300px;
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
transition: 0.3s;
border-radius: 50px;
margin:9px;
padding:15px 3px;
}
.donor{
  border-radius:5px;
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
  padding:10px 50px;
  background-color:#cdcdcd;
  display:none;
  border:1px dashed white;
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