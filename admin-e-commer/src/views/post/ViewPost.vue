<template>
  <div class="page-wrapper">
    <div class="page-breadcrumb">
      <div class="row">
        <div class="col-5 align-self-center">
          <h4 class="page-title">Post</h4>
        </div>

      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card card-body">
            <h4 class="card-title">New Post</h4>
            <form class="form-horizontal m-t-30">
              <div class="form-group">
                <label>Title</label>
                <input class="form-control" type="text"  name="title" value="post.title" v-model="post.title" />
              </div>
              <div class="form-group">
                <label>Content</label>
                <input class="form-control" type="text"  name="title" value="post.content" v-model="post.content" />
              </div>
              <div class="form-group">
                <label>Image</label>
                <input class="form-control" type="text"  name="price" value="post.Name" v-model="post.Name" disabled/>
                <img id="theImg" :src="post.Link" width="100px"  height="100px" :alt="post.Name"/>
              </div>
              <div class="form-group" >
                <div class="error-mesage" v-if="message"><h3>{{ message }}</h3></div>
                <button type="button" name="example-email" class="btn btn-info" @click="back">BACK </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import usersData from '../users/UsersData'
// import axios from "axios";

// import paginate from "../../utils/helper";

import axios from "axios";

export default {
  name: 'ViewPost',
  data() {
    return {
      post:{
        id: 0,
        title: 0,
        content : 0,
        id_image: "",
        Link:"",
        Name:""
      },
      message:"",
      token :{
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
      }
    }
  },
  async created() {
    await this.getData()
  },
  methods: {
    async getData (){
      // checklogin();
      let idPost = this.$route.params.id
      await axios.get('posts/' + idPost, this.token).then((response)=> {
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
