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
            <h4 class="card-title">Edit Post</h4>
            <form class="form-horizontal m-t-30">
              <div class="form-group">
                <label>Title</label>
                <input class="form-control" type="text"  name="name" value="dataoutput.title" v-model="dataoutput.title" />
              </div>
              <div class="form-group">
                <label>Content</label>
                <input class="form-control" type="text"  name="title" value="dataoutput.content" v-model="dataoutput.content" />
              </div>
              <div class="form-group">
                <label>select Image</label>
                <select @change="change(listImage)" id="selectBox">
                  <option :value="image.value" v-for="image in listImage" :key="image.id"
                          :selected="image.value === dataoutput.id_image"
                  >
                    {{image.text}}
                  </option>
                </select>
                <img id="theImg" :src="dataoutput.Link" width="100px"  height="100px" :alt="dataoutput.Name"/>
              </div>
              <div class="form-group" >
                <div class="error-mesage" v-if="message.length">
                  <ul>
                    <li v-for="(error,index) in message" :key="index" class="error">{{ error }}</li>
                  </ul>
                </div>
                <button type="button" name="example-email" class="btn btn-info" @click="back">Back </button>
                <button type="button" name="example-email" class="btn btn-info" @click="handleEdit">Save </button>
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
import {toast} from "bulma-toast";

export default {
  name: 'EditPost',
  data() {
    return {
      dataoutput:{
        id: 0,
        title: 0,
        content : 0,
        id_image: "",
        Link:"",
        Name:""
      },
      listImage:[],
      message:[],
      token :{
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
      }
    }
  },
  async created() {
    await this.getData()
    console.log(this.listImage)
  },
  methods: {
    change(listImage){
      var selectBox = document.getElementById('selectBox');
      var theImg = document.getElementById('theImg');
      console.log(listImage[selectBox.selectedIndex])
      theImg.src = listImage[selectBox.selectedIndex].src
      console.log(theImg.src)
      this.dataoutput.id_image = listImage[selectBox.selectedIndex].value
    },
    async getData (){
      let idPost = this.$route.params.id
      await axios.get('posts/' + idPost, this.token).then((response)=> {
        let temp = response.data.data[0]
        console.log(response.data.data[0])
        this.dataoutput = temp
      }).catch((error) =>{console.log(error) });

      await axios.get('/images/getAll', this.token).then((response)=> {
        for (let i = 0; i < response.data.data.length; i++) {
          let data = {
            value:response.data.data[i].id,
            text:response.data.data[i].name,
            src: response.data.data[i].link
          }
          this.listImage.push(data)
          // this.listImage = {...this.listImage, data}
        }
      }).catch((error) =>{
        console.log(error)
      });
    },
    checkValid() {
      this.message = []
      if( !this.dataoutput.title ) {
        this.message.push('Title Post Required')
      }else if(this.dataoutput.title.length <6){
        this.message.push('Title Post min is 6 character')
      }
      if( !this.dataoutput.content ) {
        this.message.push('Content Post Required')
      }else if(this.dataoutput.content.length <10){
        this.message.push('Content Post min is 10 character')
      }
    },
    async handleEdit() {
      this.checkValid()
      if(this.message.length<=0){
        const data = {
          content: this.dataoutput.content,
          image_id: this.dataoutput.id_image,
          title: this.dataoutput.title
        }
        let idPost = this.$route.params.id
        await axios.put('posts/' + idPost, data, this.token).then((response) => {
          console.log(response.data)
          this.$router.push('/posts')
          toast({
            message: 'Edit Post successfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
            duration: 3000,
            position: 'top-right',
          })
          // success('Edit Success Post');
        }).catch((error) => {
          console.log(error)
        });
      }
    },
    back() {
      this.$router.push('/posts')
    }
  }


}
</script>
<style lang="scss">
.error{
  color: red;
  text-align: center;
  font-weight: bold;

}
</style>
