import { createStore } from 'vuex'
import axios from "axios"

export default createStore({
  state: {
    users: [],
    isVisibleTable: false
  },
  mutations: {
      SET_USERS_TO_STATE: (state, users) => {
          state.users = users;
          state.isVisibleTable = true;
      }
  },
  actions: {
      GET_USERS_FROM_API({commit}) {
          return axios.get('http://www.filltext.com/?rows=1000&id={index}&fullname={firstName}~{lastName}&company=Bbusiness&email={email}&uname={username}&address={addressObject}')
              .then((users) => {
                  commit('SET_USERS_TO_STATE', users.data);
                  return users;
              })
              .catch((error) => {
                  console.log(error);
                  return error;
              })
      },
  },
  getters: {
      USERS(state){
          return state.users;
      },
      ISVISIBLETABLE(state){
          return state.isVisibleTable;
      }
  }
})
