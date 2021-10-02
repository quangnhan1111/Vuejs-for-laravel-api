import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ProductBySearch from "../views/product/ProductBySearch";
import ProductDetail from "../views/product/ProductDetail";
import Login from "../views/login/Login";
import Account from "../views/myaccount/Account";
import EditAccount from "../views/myaccount/EditAccount";
import Posts from "../views/post/Posts";
import Cart from "../views/cart/Cart";
import Checkout from "../views/checkout/Checkout";
import Success from "../views/notification/Success";
import Products from "../views/product/Products";
import PostsDetail from "../views/post/PostsDetail";
import ProductByBrand from "../views/product/ProductByBrand";
import ProductByCategory from "../views/product/ProductByCategory";
import Orders from "../views/order/Orders";
import OrderDetail from "../views/order/OrderDetail";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/products',
        name: 'Products',
        component: Products
      },
      {
        path: '/search-product/:key',
        name: 'ProductBySearch',
        component: ProductBySearch
      },
      {
        path: '/search-productByBrand/:id',
        name: 'ProductByBrand',
        component: ProductByBrand
      },
      {
        path: '/search-productByCategory/:id',
        name: 'ProductByCategory',
        component: ProductByCategory
      },
      {
        path: '/product-detail/:id',
        name: 'ProductDetail',
        component: ProductDetail
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '/edit-account/:id',
    name: 'EditAccount',
    component: EditAccount
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts
  },
  {
    path: '/post-detail/:id',
    name: 'PostDetail',
    component: PostsDetail
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: localStorage.getItem("id") ? Checkout :Login,
  },
  {
    path: '/cart/success',
    name: 'Success',
    component: Success
  },
  {
    path: '/order',
    name: 'Orders',
    component: Orders
  },
  {
    path: '/view-order/:id',
    name: 'OrderDetail',
    component: OrderDetail
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
// const router = new VueRouter({
//   mode: "hash",
//   base: process.env.BASE_URL,
//   routes: []
// })
export default router
