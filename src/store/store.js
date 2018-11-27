// store.js 

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex) // only required if you're using modules.
              // We're using modules, so there you go.
Vue.use(VueAxios, axios)

const store = new Vuex.Store({
  highlightedtrip:"11/13/2018",
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
    axios.get('http://localhost:3003/data')
      .then(r => r.data)
      .then(data => {
        commit('SET_DATA',data)
      })
    }
  }
}}
)

export default store

