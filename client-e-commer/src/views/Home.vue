<template>
  <div>
    <Slider/>
    <section>
      <div class="container">
        <div class="row">
          <div class="col-sm-3">
            <div class="left-sidebar">
              <CategoryProduct/>
              <BrandProduct/>
              <div class="shipping text-center"><!--shipping-->
                <img src="images/home/shipping.jpg" alt="" />
              </div><!--/shipping-->
            </div>
          </div>
          <div class="col-sm-9 padding-right">
            <div v-if="$route.path != '/'">
              <router-view :key="$route.path"></router-view>
            </div>
            <div v-else>
              <BestSelling/>
              <NewProduct/>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import BestSelling from "../components/Home/BestSelling";
import NewProduct from "../components/Home/NewProduct";
import Slider from "../components/Home/Slider";
import BrandProduct from "../components/Home/BrandProduct";
import CategoryProduct from "../components/Home/CategoryProduct";
export default {
  name: 'Home',
  components: {
    NewProduct,
    BestSelling,
    Slider,
    BrandProduct,
    CategoryProduct
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
