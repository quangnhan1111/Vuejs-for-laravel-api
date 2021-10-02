<template>
  <div class="brands_products">
    <h2>Categories</h2>
    <div class="brands-name">
      <ul class="nav nav-pills nav-stacked">
        <li v-for="Cate in listCategories" :key="Cate.id" >
          <router-link :to="`/search-productByCategory/${Cate.id}`" > {{Cate.name}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: 'CategoryProduct',
  components: {

  },
  data() {
    return {
      listCategories: [],
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
          .get('/categories/getAll/')
          .then(response => {
            console.log(response.data.data)
            this.listCategories = response.data.data
            // this.object.loading = false
          })
          .catch(error => {
            console.log(error)
          })
    },
  },
}
</script>

