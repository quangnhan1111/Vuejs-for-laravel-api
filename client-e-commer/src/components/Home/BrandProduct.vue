<template>
  <div class="brands_products"><!--brands_products-->
    <h2>Brands</h2>
    <div class="brands-name">
      <ul class="nav nav-pills nav-stacked">
        <li v-for="Brand in listBrands" :key="Brand.id" >
          <router-link :to="`/search-productByBrand/${Brand.id}`" >{{Brand.name}}</router-link>
        </li>
      </ul>
    </div>
  </div><!--/brands_products-->
</template>
<script>

import axios from "axios";

export default {
  name: 'BrandProduct',
  components: {

  },
  data() {
    return {
      listBrands: [],
    }
  },
  async created() {
    await this.getData()
    // await this.handle()

  },
  methods: {
    async getData() {
      // this.checklogin();
      await axios
          .get('/brands/getAll/')
          .then(response => {
            console.log(response.data.data)
            this.listBrands = response.data.data
            // this.object.loading = false
          })
          .catch(error => {
            console.log(error)
          })
    },
  },
}
</script>

