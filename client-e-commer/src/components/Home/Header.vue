<template>
  <header id="header"><!--header-->
    <div class="header_top"><!--header_top-->
      <div class="container">
        <div class="row">
          <div class="col-sm-6">
            <div class="contactinfo">
              <ul class="nav nav-pills">
                <li><a ><i class="fa fa-phone"></i> +84 796 578 027</a></li>
                <li><a ><i class="fa fa-envelope"></i> quangnhan@gmail.com</a></li>
              </ul>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="social-icons pull-right">
              <ul class="nav navbar-nav">
                <li><a href="#"><i class="fab fa-facebook"></i></a></li>
                <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                <li><a href="#"><i class="fab fa-linkedin"></i></a></li>
                <li><a href="#"><i class="fab fa-dribbble"></i></a></li>
                <li><a href="#"><i class="fab fa-google-plus"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div><!--/header_top-->

    <div class="header-middle"><!--header-middle-->
      <div class="container">
        <div class="row">
          <div class="col-sm-4">
            <div class="logo pull-left">
              <router-link tag="a" to="/" ><a><img src="images/home/logo.png" alt="" /></a></router-link>
            </div>
            <div class="btn-group pull-right">
              <div class="btn-group">
                <button type="button" class="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                  USA
                  <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                  <li><a >Canada</a></li>
                  <li><a >UK</a></li>
                </ul>
              </div>

              <div class="btn-group">
                <button type="button" class="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                  DOLLAR
                  <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                  <li><a >Canadian Dollar</a></li>
                  <li><a >Pound</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col-sm-8">
            <div class="shop-menu pull-right">
              <ul class="nav navbar-nav">
                <router-link tag="li" to="/" ><a><i class="fa fa-home"></i>Home</a></router-link>
                <router-link tag="li" to="/about" ><a><i class="fa fa-address-card"></i>About</a></router-link>
                <router-link tag="li" to="/cart">
                  <a>
                    <span class="icon"><i class="fa fa fa-cart-plus"></i></span>
                    <span>Cart ({{ cartTotalLength }})</span>
                  </a>
                </router-link>
                <router-link tag="li" to="/products/" ><a><i class="fab fa-product-hunt"></i>Product</a></router-link>
                <router-link tag="li" to="/posts/" ><a><i class="fas fa-blog"></i>Post</a></router-link>
                <template v-if="$store.state.isAuthenticated">
                  <router-link tag="li" to="/account/" ><a><i class="fa fa-user"></i>Account</a></router-link>
                  <router-link tag="li" to="/wishlist/" ><a><i class="fa fa-star"></i>Wishlist</a></router-link>
                  <router-link tag="li" to="/checkout/" ><a><i class="fa fa-crosshairs"></i>Check Out</a></router-link>
                  <router-link tag="li" to="/order/" ><a><i class="fa fa-crosshairs"></i>Order</a></router-link>
                  <div class="c-avatar">
                    <span>Hello {{full_name}}  </span>
                    <img
                        height="35"
                        width="35"
                        src="../../../public/images/avatar/bun.jpg"
                        class="c-avatar-img avatar"
                    />
                    <b-button variant="dark" @click="$store.commit('LogoutDispatch')"><i class="fas fa-sign-out-alt"></i>Logout</b-button>
                  </div>
                </template>
                <template v-else>
                  <router-link tag="li" to="/login/" ><a><i class="fas fa-sign-in-alt"></i>Login </a></router-link>
                </template>

              </ul>
            </div>
          </div>
        </div>
      </div>
    </div><!--/header-middle-->

    <div class="header-bottom"><!--header-bottom-->
      <div class="container">
        <div class="row">
          <div class="col-sm-9">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
            </div>
            <div class="mainmenu pull-left">
              <ul class="nav navbar-nav collapse navbar-collapse">
                <router-link tag="li" to="/" ><a><i class="fa fa-home"></i>Home</a></router-link>
                <li class="dropdown"><a href="#">Shop<i class="fa fa-angle-down"></i></a>
                  <ul role="menu" class="sub-menu">
                    <router-link tag="li" to="/products/" ><a><i class="fab fa-product-hunt"></i>Product</a></router-link>
                    <router-link tag="li" to="/cart">
                      <a>
                        <span class="icon"><i class="fa fa fa-cart-plus"></i></span>
                        <span>Cart ({{ cartTotalLength }})</span>
                      </a>
                    </router-link>
                    <template v-if="$store.state.isAuthenticated">
                      <router-link tag="li" to="/order/" ><a><i class="fas fa-file-invoice-dollar"></i>View Order</a></router-link>
                    </template>
                  </ul>
                </li>
                <li class="dropdown"><a href="#">Blog<i class="fa fa-angle-down"></i></a>
                  <ul role="menu" class="sub-menu">
                    <router-link tag="li" to="/posts/" ><a><i class="fas fa-blog"></i>Post</a></router-link>
                  </ul>
                </li>
                <router-link tag="li" to="/about" ><a><i class="fa fa-address-card"></i>About</a></router-link>
              </ul>
            </div>
          </div>
          <div class="col-sm-3">
            <div class="search_box pull-right">
              <input type="text" placeholder="Search" v-model="searchValue"/>
              <router-link v-if="searchValue!=null && searchValue!=''" :to="`/search-product/${searchValue}`"  tag="button">search</router-link>
              <router-link v-else to="/products/" tag="button">Search</router-link>
            </div>
          </div>
        </div>
      </div>
    </div><!--/header-bottom-->
    <div class="is-loading-bar has-text-centered" v-bind:class="{'is-loading': $store.state.isLoading }">
      <div class="lds-dual-ring"></div>
    </div>
  </header><!--/header-->
</template>
<script>
// import {mapMutations} from "vuex";
import axios from "axios";
export default {
  name: 'Header',
  components: {

  },
  data() {
    return {
      full_name: localStorage.getItem('full_name'),
      searchValue: null,
      cart: {
        items: []
      }
    }
  },
  methods:{
    Logout(){
      this.LogoutDispatch();
    }
  },
  computed: {

    cartTotalLength() {
      let totalLength = 0

      for (let i = 0; i < this.cart.items.length; i++) {
        totalLength += this.cart.items[i].quantity
      }

      return totalLength
    }
  },
  created() {
    this.$store.commit('initializeStore')
    const token = this.$store.state.token
    if (token) {
      axios.defaults.headers.common['Authorization'] = "Token " + token
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }
  },
  mounted() {
    this.cart = this.$store.state.cart
  },
}
</script>
<style lang="css">
.wrap {
  position: relative;
  display: inline-block;
}

.wrap span {
  position: absolute;
  top: 12px;
  right: 12px;
}

.avatar{
  border-radius: 50%;
}
</style>
