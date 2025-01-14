import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    duties: [],
    officers: [],
    assigned: [],
  },

  getters: {
    duties: state => state.duties,
    officers: state => state.officers,
    assigned: state => state.assigned,
  },

  mutations: {
    pushAddDuty(state, dutyData) {
      state.duties.push({ ...dutyData});
    },

    pushAddOfficer(state, officerData) {
      state.officers.push({ ...officerData});
    },

    save_duties_data(state, duties) {
      state.duties = duties;
    },

    save_officers_data(state, officers) {
      state.officers = officers
    },

    save_assigned_data(state, assigned) {
      state.assigned = assigned;
    }
  },

  actions: {
    addDuty({ commit }, dutyData) {
      commit('pushAddDuty', dutyData);
    },

    addOfficer({ commit }, officerData) {
      commit('pushAddOfficer', officerData);
    },

    async requestDutiesData({ commit }) {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/fetchDuties')
        commit('save_duties_data', response.data);
      } catch (error) {
        console.log('unable to fetch duties data: ', error.message)
      }
    },

    async requestOfficersData({ commit }) {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/fetchOfficers')
        commit('save_officers_data', response.data);
      } catch (error) {
        console.log('unable to fetch offcer data: ', error.message)
      }
    },

    async requestAssignedData({ commit }) {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/fetchAssigned')
        commit('save_assigned_data', response.data);
      } catch (error) {
        console.log('unable to get assigned duties data: ', error.message)
      }
    }
  },
  
  modules: {
  }
})
