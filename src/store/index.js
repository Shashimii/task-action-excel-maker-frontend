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
    // request data

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
    },

    // edit data

    async editOfficerData({ dispatch }, editData) {
      try {
        const response = await axios.patch(`http://127.0.0.1:8000/api/editOfficer/${editData.id}`,editData);

        if (response.status === 204) {
          dispatch('requestOfficersData');
          M.toast({
            html: '<p class="toast-text">Officer Edited Successfully.<p>',
            displayLength: 8000
          })
        }
      } catch (error) {
        // console.log('unable to edit officer', error.message);
        M.toast({
          html: '<p class="toast-text">Something went wrong Please try again Later.<p>',
          displayLength: 4000
        })
      }
    },

    async editDutyData({ dispatch }, editData) {
      try {
        const response = await axios.patch(`http://127.0.0.1:8000/api/editDuty/${editData.id}`,editData);

        if (response.status === 204) {
          dispatch('requestDutiesData');
          M.toast({
            html: '<p class="toast-text">Duty Title Edited Successfully.<p>',
            displayLength: 8000
          })
        }
      } catch (error) {
        // console.log('unable to edit duty', error.message);
        M.toast({
          html: '<p class="toast-text">Something went wrong Please try again Later.<p>',
          displayLength: 4000
        })
      }
    },

    // delete data

    async deleteOfficerData({ dispatch }, deleteId) {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/deleteOfficer/${deleteId}`);

        if (response.status === 204) {
          dispatch('requestOfficersData');
          M.toast({
            html: '<p class="toast-text">Officer Deleted Successfully.<p>',
            displayLength: 8000
          })
        }
      } catch (error) {
        // console.log('unable to delete officer', error.message);
        M.toast({
          html: '<p class="toast-text">Something went wrong Please try again Later.<p>',
          displayLength: 4000
        })
      }
    },

    async deleteDutyData({ dispatch }, deleteId) {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/deleteDuty/${deleteId}`);
        
        if (response.status === 204) {
          dispatch('requestDutiesData');
          M.toast({
            html: '<p class="toast-text">Duty Title Deleted Successfully.<p>',
            displayLength: 8000
          })
        }
      } catch (error) {
        // console.log('unable to delete duty', error.message)
        M.toast({
          html: '<p class="toast-text">Something went wrong Please try again Later.<p>',
          displayLength: 4000
        })
      }
    },

    async deleteAssignedData({ dispatch }, deleteId) {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/deleteAssigned/${deleteId}`);

        if (response.status === 204) {
          dispatch('requestAssignedData');
        }

      } catch (error) {
        // console.log('unable to delete assigned duty', error.message)
        M.toast({
          html: '<p class="toast-text">Something went wrong Please try again Later.<p>',
          displayLength: 4000
        })
      }
    }
  },
  
  modules: {
  }
})
