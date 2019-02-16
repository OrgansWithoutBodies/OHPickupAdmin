// store.js 

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex) // only required if you're using modules.
              // We're using modules, so there you go.
Vue.use(VueAxios, axios)
const endpoint = "http://localhost:8000/"
const dataep = endpoint+'truck/api'
const routeep ="http://localhost:5000/"
const store = new Vuex.Store({
  dbbackend:"REST",
  endpoint:endpoint,
  mapbackend:"GM",

  state: {
    selday:"11/13/2018",
    donors:[],
    stops:[],
    trips:[],
    employees:[],
    trucks:[],
    latlons:[],
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
    'SET_DONORS'(state,donors){
      state.donors=donors
    },
    'SET_EMPS'(state,emps){
      state.employees=emps
    },
    'SET_STOPS'(state,stops){
      state.stops=stops
    },
    'SET_TRIPS'(state,trips){
      state.trips=trips
    },
    'SET_TRUCKS'(state,trucks){
      state.trucks=trucks
    },
    'UPDATE_STOPLIST_ORDER'(state,stoplist){
      state.stops=stoplist
    },
    'UPDATE_SEL_TRIP'(state,sel){
      state.selday=sel
    }
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
    changeSelTrip({commit},sel){
      commit('UPDATE_SEL_TRIP',sel)
    },
  distBetween({commit},startpoint=[-121.9486,38.3451],endpoint=[-121.9696,38.2870]){//make sure long/lat is in right order!! opposite from gmaps
    const uri=routeep+'route/v1/driving/'+startpoint[0]+','+startpoint[1]+';'+endpoint[0]+','+endpoint[1]+'?overview=false'
    console.log(uri)
    const kmtomile=0.6213712
    axios.get(uri)
    .then(r => console.log(r.data.routes[0].distance/1000*kmtomile))
    .catch(e => console.log(e))
  },
  geoCode({commit},address){
    return new Promise((resolve,reject) => {
    //var csrf = document.cookie.split(';')[0].split('=')
    // var csrf = this.$cookies.get('X-CSRFToken')
   // console.log(csrf)
    var und_add=address.replace(new RegExp(' ','g'),'_')
    const url= 'http://localhost:8000/truck/geo/'+und_add+'/'
    const options = {
      method:'GET',
      url:url,
      headers:{
       //  "X-CSRFToken":csrf[1]
      },
    }
    console.log(options)
    axios(options).
    then(r =>
      resolve(r)).catch(err => console.log(err))
  })},
  loadDataFrom({commit},format="REST")  {
    
    if(format=="REST"){
      axios.get(dataep+'/donors/')
        .then(r => r.data)  
        .then(data => {
           commit('SET_DONORS',data)
                      }
              )
      axios.get(dataep+'/trips/')
        .then(r => r.data)  
        .then(data => {
           commit('SET_TRIPS',data)
                      }
              )
      axios.get(dataep+'/donations/')
        .then(r => r.data)  
        .then(data => {
           commit('SET_DONATIONS',data)
                      }
              )
      axios.get(dataep+'/trucks/')
        .then(r => r.data)  
        .then(data => {
           commit('SET_TRUCKS',data)
                      }
              )
      axios.get(dataep+'/employees/')
        .then(r => r.data)  
        .then(data => {
           commit('SET_EMPS',data)
                      }
              )
      axios.get(dataep+'/stops/')
        .then(r => r.data)  
        .then(data => {
           commit('SET_STOPS',data)
                      }
              )
      }
    },
  loadDonors({commit}){

  },
  minDist({commit},coords){
    var coordlist=[]
    for (var c=0;c<coords.length;c++){
      coordlist.push(coords[c][1]+','+coords[c][0])
    }
    var coorduri= coordlist.join(';')
    const uri=routeep+'table/v1/driving/'+coorduri

      console.log(uri)
    axios.get(uri)
    .then(r => console.log(r))
    .catch(e => console.log(e))
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