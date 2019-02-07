import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store =  new Vuex.Store({
  state:{
    restaurant:[],
    params:{
      has_data:true,
    },
    restaurant_id:'',
    topbanner:''
  },
  mutations: {
    setRestaurant(state,payload){
      state.restaurant = state.restaurant.concat(payload);
    },
    setParams(state,payload){
      state.params = Object.assign(state.params,payload);
    },
    setParamsHasData(state,payload){
      state.params.has_data = payload;
    },
    setId(state,payload){
      state.restaurant_id = payload;
    },
    setTopbanner(state,payload){
      state.topbanner = payload;
    }
  },
  getters: {
    getRestaurantById(state){
      for(let i = 0;i < state.restaurant.length;i++){
        if(state.restaurant_id == parseInt(state.restaurant[i].id)){
          return state.restaurant[i];
        }
      }
    },
    getTopbanner(state){
      return state.topbanner;
    }
  },
  actions: {
    getRestaurant({commit,state}){
      axios.get('static/restaurant.json',{params:{
        longitude:state.params.longitude,
        latitude:state.params.latitude,
        offset:state.params.offset,
        limit:state.params.limit
      }}).then(function(response){
        if(response.data <10){
          commit('setParamsHasData',false);
        }
        else{
          commit('setRestaurant',response.data);
        }
      }).catch(function(err){
        console.log(err);
      });
    } 
  }
})

export default store;