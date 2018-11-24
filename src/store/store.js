// store.js

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) // only required if you're using modules.
              // We're using modules, so there you go.

const store = new Vuex.Store({
  highlightedtrip:"11/13/2018",
  state: {"trips":[{"type":"pickup/dropoff",
  "date":"11/13/2018",
  "employeeids":[123,456]},
  {"type":"pickup/dropoff",
  "date":"11/14/2018",
  "employeeids":[123,567]},
  ],

    "stops":[{"inputtime": 1234,
  "tripid": 12345,  
  "stopnum": 3,
  "stoptype":"pickup",
  "status": "Unmarked",
  "hidden":"false",
  "items": "None",
  "donor": {"firstname": "Test",
    "lastname": "Testerson",
    "address": "215 test ct",
    "phone": "12345",
    "email": "test",
    "other":"None"}},
    {"inputtime": 9,
  "tripid": 12345,  
  "stopnum": 3,
  "stoptype":"pickup",
  "status": "Unmarked",
  "hidden":"false",
  "items": "None",
  "donor": {"firstname": "Test",
    "lastname": "Testerson",
    "address": "215 test ct",
    "phone": "12345",
    "email": "test",
    "other":"None"}},

  {"inputtime": 3456,
  "tripid": 12345,  
  "stopnum": 4,
  "stoptype":"dropoff",
  "status": "Called (Answer)",
  "items": "None",
  "hidden":"false",
  "donor": {"firstname": "Test",
    "lastname": "Testerson",
    "address": "215 test ct",
    "phone": "12345",
    "email": "test",
    "other":"None"}}]
  },
  mutations: {
    'ADD_STOP': function (state, stop) {
      state.stops.push(stop)
    },
    'ADD_TRIP':function(state,trip){
      state.trips.push(trip)
    },
    'ADD_STOP_TO_TRIP': function(state,stop,tripid){
      stop.tripid = tripid
    }

  },
  actions: {
    addStop (store, stop) {
      store.commit('ADD_STOP', todo)
    },
  }
}
)

export default store

