// store.js 

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex) // only required if you're using modules.
              // We're using modules, so there you go.
Vue.use(VueAxios, axios)
const endpoint = process.env.VUE_APP_ENDPOINT
const dataep = endpoint+'truck/api'
console.log(endpoint)
const store = new Vuex.Store({
  dbbackend:"REST",
  endpoint:endpoint,
  mapbackend:"GM",

  state: {
    selday:"2019-03-14",
    donors:[],
    stops:[],
    trips:[],
    employees:[],
    trucks:[],
    geocodes:{},
  },

  mutations: {
    'ADD_EMPLOYEE'(state,emp){
      state.employees.push(emp)
    },
    'ADD_DONOR'(state,donor){
      state.donors.push(donor)
    },
    'ADD_GEOCODE'(state,add,code){
      state.geocodes[add]=code
    },
    'ADD_STOP' (state, stop) {
      state.stops.push(stop)
    },
    'ADD_TRIP'(state,trip){
      state.trips.push(trip)
    },
    'NEST_ORDER_IN_STOP'(state,ords){
      for(var ord in ords){
        console.log(ord)
        console.log(ords[ord])

        //state.stops[ord]['ScheduledOrder']=ords[ord]
      }
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
    'SET_DONATIONS'(state,donations){
      state.donations=donations
    },
    'SET_EMPS'(state,emps){
      state.employees=emps

    },
    'SET_STOPS'(state,stops){

      var newstops=[]
      for(var s in stops){
          var stop = stops[s]
          stop['Donor']= state.donors.find(x=>x.id===stop.RequesterId)
          newstops.push(stop)
    }
      state.stops=newstops
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
    'UPDATE_STOP'(state,stopid){
      state.stops.filter(stop => stop.id==stopid)
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
      .then(response => {return response})
      .catch(e => {
    
      })
    },
    addDonor({commit},donor){
      axios.post(endpoint+'/donors',donor).then(_ => {console.log(_);commit("ADD_DONOR",donor)}).then(response => {return response}).catch(e => {console.log(e)})
    },
    changeSelTrip({commit},sel){
      commit('UPDATE_SEL_TRIP',sel)
    },
  // distBetween({commit},startpt=[-121.9486,38.3451],endpt=[-121.9696,38.2870]){//make sure long/lat is in right order!! opposite from gmaps
  //   const url=endpoint+
  //   const uri=routeep+'route/v1/driving/'+startpoint[0]+','+startpoint[1]+';'+endpt[0]+','+endpt[1]+'?overview=false'
  //   console.log(uri)
  //   const kmtomile=0.6213712
  //   axios.get(uri)
  //   .then(r => console.log(r.data.routes[0].distance/1000*kmtomile))
  //   .catch(e => console.log(e))
  // },
  geoCode({commit,state},address){
  return new Promise((resolve,reject) => {
        var und_add=address.replace(new RegExp(' ','g'),'_')
        const url= endpoint+'truck/geo/'+und_add+'/'
        const options = {
          method:'GET',
          url:url,
          }
        axios(options).
        then(r =>{
          commit('ADD_GEOCODE',address,r.data);
          resolve(r);}).catch(err => {reject(err)});
    
   }) 
  },
  loadGeoCodes({commit,dispatch},adds){
    // console.log(stops)
    var codes=[]
    var ks=Object.keys(adds)
    if(ks.length>0){
      for(var a in adds){
        var add=adds[a]
        dispatch('geoCode',add)
        }
    }

  },
  loadDataFrom({commit},format="REST")  {
    
    if(format=="REST"){
      axios.get(dataep+'/donors/')
        .then(r => r.data)
        .then(data => {
          for(var d in data){
            data[d]['pos']={'lat':null,'lng':null}
          }
          return data
        })  
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
  minDist({commit},stops){
    return new Promise((resolve,reject) => {
      console.log('test')
      try {
        var conlist=[]
        for(var stpid in stops){
          const stp=stops[stpid]

          conlist.push([stp['lng'],stp['lat']].join(','))
        }
        var adds=conlist.join(';')
        var url= endpoint+'truck/min/'+adds+'/'
        console.log(url)
      }
      catch(err){
        reject(err)
      }
      const options = {
        method:'GET',
        url:url,
      }
      axios(options).
        then(r=>r.data).
        then(r =>
              resolve(r)).
        catch(err => reject(err))
    }
  )},
  nestOrders({commit},orderlist){
    console.log('test')
    commit('NEST_ORDER_IN_STOP',orderlist)
  },
  updateStopList({commit},stoplist){
    commit('UPDATE_STOPLIST_ORDER',stoplist)
  },
        
  updateStop({commit},stop){
    commit('UPDATE_STOP',stop['id'])
  },
  
  postData({commit},data,format="REST"){
    if(format=="REST"){
      //@todo include authentication
      //axios.post(endpoint,{""}) 
    }
  }
}})


export default store