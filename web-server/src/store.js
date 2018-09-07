// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        server_ip:'http://jary.iptime.org:4000',
        toolbar_title:'SIMS',
        drawer: null
    }
});