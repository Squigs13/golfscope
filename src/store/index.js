import Vue from 'vue'
import Vuex from 'vuex'
import shotscope from '@/assets/mydata.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rounds: [],
    clubs: []
  },
  mutations: {
    'GET_ROUNDS' (state) {
      state.rounds = shotscope.rounds
    },
    'GET_CLUBS' (state) {
      state.clubs = shotscope.clubs
    }
  },
  actions: {
    getRounds: ({ commit }) => {
      commit('GET_ROUNDS')
    },
    getClubs: ({ commit }) => {
      commit('GET_CLUBS')
    }
  },
  modules: {
  },
  getters: {
    rounds: state => {
      return state.rounds
    },
    clubs: state => {
      return state.clubs
    }
  }
})
