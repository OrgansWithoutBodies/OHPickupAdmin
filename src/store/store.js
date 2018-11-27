// store.js 

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex) // only required if you're using modules.
              // We're using modules, so there you go.
Vue.use(VueAxios, axios)
const endpoint = " http://localhost:3003/data"
const store = new Vuex.Store({
  highlightedtrip:"11/13/2018",
  endpoint:"http://localhost:3003/data",
  mapbackend:"GM",
  state: {
    data: {"trips":[],
    "donors":[],
    "employees":[],
    "stops":[]}
  },
  mutations: {
    'ADD_STOP' (state, stop) {
      state.stops.push(stop)
    },
    'ADD_TRIP'(state,trip){
      state.trips.push(trip)
    },
    'ADD_STOP_TO_TRIP'(state,stop,tripid){
      stop.tripid = tripid
    },

    'SET_DATA'(state,data){
      state.data=data
    }

  },
  actions: {
    addStop (store, stop) {
      store.commit('ADD_STOP', todo)
    },

  loadDataFrom({commit},format="REST")  {
    
    if(format=="REST"){
      axios.get(endpoint)
        .then(r => r.data)
        .then(data => {
           commit('SET_DATA',data)
        })
    }
  },
  updateData({commit},format="REST"){
    if(format=="REST"){
      //@todo include authentication
      axios.post(endpoint) 
    }
  }
}}
)

export default store