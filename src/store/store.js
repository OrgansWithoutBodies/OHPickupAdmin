// store.js 

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex) // only required if you're using modules.
              // We're using modules, so there you go.
Vue.use(VueAxios, axios)
const endpoint = " http://localhost:3000/"
const dataep = endpoint+'db'

const store = new Vuex.Store({
  highlightedtrip:"11/13/2018",
  dbbackend:"REST",
  endpoint:endpoint,
  mapbackend:"GM",

  state: {
    data: {"trips":[],
    "donors":[],
    "employees":[],
    "stops":[]}
  },

  mutations: {
    'ADD_EMPLOYEE'(state,emp){
      state.employees.push(emp)
    },
    'ADD_DONOR'(state,donor){
      state.donors.push(donor)
    },
    'ADD_STOP' (state, stop) {
      state.stops.push(stop)
    },
    'ADD_TRIP'(state,trip){
      state.trips.push(trip)
    },
    'NEST_TRIP_IN_STOP'(state,stop,tripid){
      stop.trip=state.trips.find(x=>x.id === tripid)
    },
    'NEST_DONOR_IN_STOP'(state,stop,donorid){
      stop.donor=state.donors.find(x=>x.id === donorid)
    },
    'NEST_EMPLOYEE_IN_TRIP'(){},
    'NEST_EMPLOYEE_IN_TRIP'(){},
    'NEST_EMPLOYEE_IN_TRIP'(){},
    'SET_DATA'(state,data){
      state.data=data
    },
    'UPDATE_STOPLIST_ORDER'(state,stoplist){
      state.data.stops=stoplist
    },
  },
  
  actions: {
    addStop ({commit},store, stop) {

      axios.post(endpoint+'/stops',stop)
      .then(_ => {commit('ADD_STOP', stop)
      })
      .then(response => {})
      .catch(e => {
    
      })
    },

  loadDataFrom({commit},format="REST")  {
    
    if(format=="REST"){
      axios.get(dataep)
        .then(r => r.data)
        .then(data => {
           commit('SET_DATA',data)
                      })
      }
    },
  updateStopList({commit},stoplist){
    alert(stoplist)
    commit('UPDATE_STOPLIST_ORDER',stoplist)
  },
        

    
    
  
  postData({commit},data,format="REST"){
    if(format=="REST"){
      //@todo include authentication
      //axios.post(endpoint,{""}) 
    }
  }
}})


export default store