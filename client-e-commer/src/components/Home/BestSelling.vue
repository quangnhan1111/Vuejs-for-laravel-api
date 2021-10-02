<template>
  <div class="features_items"><!--features_items-->
    <h2 class="title text-center">Features Items</h2>
    <div class="col-sm-4" v-for="Product in listProductBL" :key="Product.id">
      <div class="product-image-wrapper">
        <div class="single-products">
          <div class="productinfo text-center">
            <div>
              <img :src="Product.link" width="100px"  height="100px" alt="">
              <h2>{{ Product.price }}.00$</h2>
              <p>Name: {{ Product.name }}</p>
              <p>Des: {{ Product.des.substring(0,100)+".." }}</p>
            </div>
          </div>
        </div>
        <div class="choose">
          <ul class="nav nav-pills nav-justified">
            <router-link v-bind:to="`/product-detail/${Product.name}`" class="button is-dark mt-4">View details</router-link>
            <li><a href="#"><i class="fa fa-plus-square"></i>Add to wishlist</a></li>
            <li><a href="#"><i class="fa fa-plus-square"></i>Add to compare</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div><!--features_items-->
</template>
<script>

import axios from "axios";
import {toast} from "bulma-toast";

export default {
  name: 'BestSelling',
  components: {

  },data() {
    return {
      details: [],
      listProductBL: [],
    }
  },
  async created() {
    await this.getData()
  },
  methods: {
    async addToCart(id) {
      await axios.get('/products/'+id).then((response)=> {
        this.details = response.data.data[0]
      }).catch(() =>{
      })
      this.quantity = 1

      const item = {
        product: this.details,
        quantity: this.quantity
      }

      console.log(item);

      this.$store.commit('addToCart', item)
      console.log(localStorage.getItem('cart'));
      toast({
        message: 'The product was added to the cart',
        type: 'is-success',
        dismissible: true,
        pauseOnHover: true,
        duration: 3000,
        position: 'bottom-right',
      })
    },
    async getData() {
      await axios.get('client/product/best').then((response)=> {
        this.listProductBL = response.data.data
      }).catch(() =>{
      })
    },
  },
}
</script>
