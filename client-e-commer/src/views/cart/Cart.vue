<template>
  <div>
    <section id="cart_items">
      <div class="container">
        <div class="breadcrumbs">
          <ol class="breadcrumb">
            <li><a href="#">Home</a></li>
            <li class="active">Shopping Cart</li>
          </ol>
        </div>
        <div class="table-responsive cart_info">
          <table class="table table-condensed" v-if="cartTotalLength">
            <thead>
            <tr class="cart_menu">
              <td class="image">Product</td>
              <td class="description"></td>
              <td class="price">Price</td>
              <td class="price">Size</td>
              <td class="price">Color</td>
              <td class="price">Gender</td>
              <td class="quantity">Quantity</td>
              <td class="total">Total</td>
              <td></td>
            </tr>
            </thead>
            <tbody>
            <CartItem
                v-for="item in cart.items"
                v-bind:key="item.product.id"
                v-bind:initialItem="item"
                v-on:removeFromCart="removeFromCart"
            />
            </tbody>
          </table>
        </div>
      </div>
    </section> <!--/#cart_items-->

    <section id="do_action">
      <div class="container">

        <div class="row">
          <div class="col-sm-12">
            <div class="total_area">
              <ul>
                <li>Cart Sub Total <span>${{ cartTotalPrice.toFixed(2) }}</span></li>
                <li>Shipping Cost <span>Free</span></li>
                <li>Total <span>${{ cartTotalPrice.toFixed(2) }}</span></li>
              </ul>
              <router-link to="/checkout" tag="button" class="btn btn-default update">Check Out</router-link>
            </div>
          </div>
        </div>
      </div>
    </section><!--/#do_action-->
  </div>
</template>
<script>
// import { toast } from 'bulma-toast'
// import axios from "axios";
// import {mapState} from "vuex";

import CartItem from "../../components/Cart/CartItem";
// import {mapMutations} from "vuex";
export default {
  name: 'Cart',
  components: {CartItem},
  data() {
    return {
      cart: {
        items: []
      }
    }
  },

  created() {
    this.cart = this.$store.state.cart
  },
  methods: {
    removeFromCart(item) {
      this.cart.items = this.cart.items.filter(i => i.product.id !== item.product.id)
    }
  },
  computed: {
    cartTotalLength() {
      return this.cart.items.reduce((acc, item) => {
        return acc += item.quantity
      }, 0)
    },
    cartTotalPrice() {
      return this.cart.items.reduce((acc, item) => {
        return acc += item.product.price * item.quantity
      }, 0)
    },
  }
}
</script>
