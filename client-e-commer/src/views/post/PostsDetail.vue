<template>
  <div >
    <section>
      <div class="container">
        <div class="row">
          <div class="col-sm-12 padding-right">
            <div class="col-sm-12 padding-right">
              <div class="col-sm-12 padding-right">
                <div class="product-details"><!--product-details-->
                  <div class="col-sm-12">
                    <div class="view-product">
                      <img :src="post.Link" width="100px"  height="100px" alt="">
                      <h3>ZOOM</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="product-information"><!--/product-information-->
              <h2>{{post.title}}</h2>
              <p>{{post.content}}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
// import usersData from '../users/UsersData'
// import axios from "axios";
import axios from "axios";

export default {
  name: 'PostDetail',
  data() {
    return {
      post:{
        id: "",
        title:"",
        content: "",
        Link:"",
        Name:""
      },
      listImage:[],
      message:"",
    }
  },
  async created() {
    await this.getData()
  },
  methods: {
    async getData (){
      // checklogin();

      let idPost = this.$route.params.id
      await axios.get('posts/' + idPost).then((response)=> {
        let temp = response.data.data[0]
        console.log(response.data.data[0])
        this.post = temp
      }).catch((error) =>{console.log(error) });
    },

    back() {
      this.$router.push('/posts')
    }
  }


}
</script>
