<template>
  <div class="recommended_items"><!--recommended_items-->
    <h2 class="title text-center">Category: {{nameCategory}}</h2>

    <div id="recommended-item-carousel" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="item active">
          <div class="col-sm-4" v-for="Product in listProducts" :key="Product.id">
            <div class="product-image-wrapper">
              <div class="single-products">
                <div class="productinfo text-center">
                  <img :src="Product.link" width="100px"  height="100px" alt="">
                  <h2>{{Product.price}}.00$</h2>
                  <p>Name: {{Product.name}}</p>
                  <p>Des: {{Product.des.substring(0,100)+".."}}</p>
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
        </div>
      </div>
    </div>
  </div><!--/recommended_items-->
</template>
<script>
import axios from "axios";
import {toast} from "bulma-toast";
// import CategoryProduct from "../../components/Home/CategoryProduct";
// import BrandProduct from "../../components/Home/BrandProduct";
export default {
  name: 'ProductByCategory',
  components: {
  },
  data() {
    return {
      listProducts: [],
      nameCategory:"",
      details:[],
      id : this.$route.params.id
    }
  },
  created() {
    this.getNameCategory();
    this.getData()
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
    async getData(){
      await axios
          .get('/client/category/relateProduct/'+this.id)
          .then(response => {
            console.log(response.data.data.data)
            this.listProducts = response.data.data.data
            // this.object.loading = false
          })
          .catch(error => {
            console.log(error)
          })
    },
    async getNameCategory(){
      await axios
          .get('/categories/'+this.id)
          .then(response => {
            console.log(response.data.data)
            this.nameCategory = response.data.data.name
            // this.object.loading = false
          })
          .catch(error => {
            console.log(error)
          })
    },
  },
  // watch: {
  //   async id() {
  //     await this.getData()
  //   }
  // }
}
</script>
