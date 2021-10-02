import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Id:'',
    Username:'',
    full_name:'',
    employer:'',
    cart: {
      items: [],
    },
    isAuthenticated: false,
    token: '',
    isLoading: false
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('cart')) {
        state.cart = JSON.parse(localStorage.getItem('cart'))
      } else {
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }

      if (localStorage.getItem('token')) {
        state.token = localStorage.getItem('token')
        state.isAuthenticated = true
      } else {
        state.token = ''
        state.isAuthenticated = false
      }
    },
    setIsLoading(state, status) {
      state.isLoading = status
    },
    addToCart(state, item) {
      const exists = state.cart.items.filter(i => i.product.id === item.product.id)
      if (exists.length) {
        exists[0].quantity = parseInt(exists[0].quantity) + parseInt(item.quantity)
      } else {
        state.cart.items.push(item)
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
    },
    removeToken(state) {
      state.token = ''
      state.isAuthenticated = false
    },
    clearCart(state) {
      state.cart = { items: [] }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    set (state, [variable, value]) {
      state[variable] = value
    },
    LoginDispatch(state) {
      state.Id = localStorage.getItem('id');
      state.Username = localStorage.getItem('username');
      state.full_name = localStorage.getItem('full_name');
      console.log(state.full_name)
      // location.reload()
      setTimeout(location.reload(), 3000)
      router.push('/')
    },

    LogoutDispatch(state) {
      state.Id = null
      state.Username = null
      state.full_name = null
      state.employer = null
      localStorage.removeItem('id');
      localStorage.removeItem('username');
      localStorage.removeItem('full_name');
      localStorage.removeItem('token');
      localStorage.removeItem('roleNames');
      localStorage.removeItem('user');
      state.isAuthenticated = false
      console.log("logout")
      router.push('/login')
    },

    checklogin(state) {
      state.Id = localStorage.getItem('id');
      state.Username = localStorage.getItem('username');
      state.full_name = localStorage.getItem('full_name');
      state.employer = localStorage.getItem("roleNames");
      if(localStorage.getItem("token") === null){
        state.isAuthenticated =false;
      }else{
        state.isAuthenticated =true;
      }
    },

  },
  actions: {
  },
  modules: {
  }
})
