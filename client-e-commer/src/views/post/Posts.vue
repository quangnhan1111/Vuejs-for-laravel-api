<template>
  <b-container >
    <h2 class="title text-center">POST</h2>
    <div>
      <b-card-group v-for="Post in posts" :key="Post.id">
        <router-link :to="`/post-detail/${Post.id}`" >
          <b-card :title="Post.Name">
            <img :src="Post.Link" width="100px"  height="100px" alt="">
            <b-card-title>{{Post.title}}</b-card-title>
            <b-card-text>
              {{Post.content}}
            </b-card-text>
            <template #footer>
              <small class="text-muted">Last updated from {{Post.lastUpdated}}</small>
            </template>
          </b-card>
        </router-link>
      </b-card-group>
    </div>
    <Paginate
        :pagination=paginate
        :totalPages="Math.ceil(paginate.total/paginate.per_page)"
        :total="paginate.total"
        :per-page="paginate.per_page"
        :currentPage="paginate.current_page"
        @pagechanged="onPageChange"
    />
  </b-container>
</template>
<script>
import { mapState} from "vuex";
import axios from "axios";
import Paginate from "../paginate/Paginate";
export default {
  name: 'Posts',
  components: {
    Paginate
  },
  computed: {
    ...mapState(['Id']),
  },
  async created() {
    await this.getData();
  },
  data() {
    return {
      all: {},
      posts:{
        id:"",
        title:"",
        content:"",
        Link: "",
        Name:"",
        lastUpdated: ""
      },
      paginate: {
        current_page:1,
        first_page_url:"",
        last_page:1,
        last_page_url:"",
        per_page:1,
        total: 1,
      },
    }
  },
  methods:{
    onPageChange(page){
      this.paginate.current_page = page
    },
    async getData() {
      await axios.get('/posts/?page='+this.paginate.current_page).then((response)=> {
        console.log(response.data.data)
        this.all = response.data.data
        this.posts = this.all.data
        this.paginate.current_page = this.all.current_page
        this.paginate.first_page_url = this.all.first_page_url
        this.paginate.last_page = this.all.last_page
        this.paginate.last_page_url = this.all.last_page_url
        this.paginate.per_page = this.all.per_page
        this.paginate.total = this.all.total
      }).catch(() =>{
      })
    },
  },
  watch: {
    paginate: {
      async handler(){
        console.log(this.paginate.current_page)
        console.log(Math.ceil(this.paginate.total/this.paginate.per_page))
        await this.getData();
      },
      deep: true
    },
  }
}
</script>
