import { createStore } from 'vuex'

export default createStore({
  state: {
    duties: [
      {id: 1, duty: '1. Rendering of Legal Opinion and other Legal Services'},
      {id: 2, duty: '1.1 Rendering of Legal Opinion'},
      {id: 3, duty: '1.2 Review of Contracts/MOA/ MOU and other Agreements'},
      {id: 4, duty: '1.3 Evaluation of Investigation Reports (Forestry Cases)'},
      {id: 5, duty: '1.4 Draft Correspondence to Quick Response Actions-8888 Complaints, Ombudsman, etc.'},
    ],
    
    officers: [
      {id: 1, name: 'Officer 1'},
      {id: 2, name: 'Officer 2'},
      {id: 3, name: 'Officer 3'},
      {id: 4, name: 'Officer 4'},
      {id: 5, name: 'Officer 5'},
      {id: 6, name: 'Officer 6'},
      {id: 7, name: 'Officer 7'},
      {id: 8, name: 'Officer 8'},
    ],

    assigned: [],
  },

  getters: {
    duties: state => state.duties,
    officers: state => state.officers,
    assigned: state => state.assigned
  },

  mutations: {
    pushAssignData(state, assignData) {
      state.assigned.push({ ...assignData });
    },

    pushAddDuty(state, dutyData) {
      state.duties.push({ ...dutyData});
    },

    pushAddOfficer(state, officerData) {
      state.officers.push({ ...officerData});
    }
  },

  actions: {
    assignDuty({ commit }, assignData) {
      commit('pushAssignData', assignData);
    },

    addDuty({ commit }, dutyData) {
      commit('pushAddDuty', dutyData);
    },

    addOfficer({ commit }, officerData) {
      commit('pushAddOfficer', officerData);
    }
  },
  
  modules: {
  }
})
