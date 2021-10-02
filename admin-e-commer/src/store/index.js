import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebarShow: 'responsive',
    sidebarMinimize: false,
    Id:'',
    Username:'',
    fullname:'',
    employer:'',
    isLogin: false
  },
  mutations: {
    toggleSidebarDesktop (state) {
      const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
      state.sidebarShow = sidebarOpened ? false : 'responsive'
    },
    toggleSidebarMobile (state) {
      const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
      state.sidebarShow = sidebarClosed ? true : 'responsive'
    },
    set (state, [variable, value]) {
      state[variable] = value
    },
    LoginDispatch(state) {

      state.Id = localStorage.getItem('id');
      state.Username = localStorage.getItem('username');
      state.fullname = localStorage.getItem('fullname');
      state.employer = localStorage.getItem("employer");
      state.isLogin = true;
      console.log("LoginDispatch")
      if(localStorage.getItem("roleNames") === "admin"){
        router.push('/')
      } else {
        router.push('/')
      }
    },

    LogoutDispatch(state) {
      state.Id = ""
      state.Username = ""
      state.fullname = ""
      state.employer = ""
      state.isLogin = false
      localStorage.removeItem('id');
      localStorage.removeItem('username');
      localStorage.removeItem('fullname');
      localStorage.removeItem('token');
      localStorage.removeItem('roleNames');
      localStorage.removeItem('user');
      router.push('/login')
    },

    checklogin(state) {
      state.Id = localStorage.getItem('id');
      state.Username = localStorage.getItem('username');
      state.fullname = localStorage.getItem('fullname');
      state.employer = localStorage.getItem("roleNames");
      if(localStorage.getItem("token") === null){
        state.isLogin =false;
      }else{
        state.isLogin =true;
      }
    },

  },
  actions: {
  },
  modules: {
  }
})
