<template>
  <div class="page-wrapper">
    <div class="page-breadcrumb">
      <div class="row">
        <div class="col-5 align-self-center">
          <h4 class="page-title">Product</h4>
        </div>

      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card card-body">
            <h4 class="card-title">New Product</h4>
            <form class="form-horizontal m-t-30">
              <div class="form-group">
                <label>Name</label>
                <input class="form-control" type="text"  name="name" value="dataoutput.name" v-model="dataoutput.name" disabled/>
              </div>
              <div class="form-group">
                <label>Description</label>
                <input class="form-control" type="text"  name="title" value="dataoutput.des" v-model="dataoutput.des" disabled/>
              </div>
              <div class="form-group">
                <label>Price</label>
                <input class="form-control" type="number"  name="price" value="dataoutput.price" v-model="dataoutput.price" disabled/>
              </div>
              <div class="form-group">
                <label>Image</label>
                <input class="form-control" type="text"  name="price" value="dataoutput.Name_Image" v-model="dataoutput.Name_Image" disabled/>
                <img id="theImg" :src="dataoutput.link" width="100px"  height="100px" alt=""/>
              </div>
              <div class="form-group">
                <label>brand</label>
                <input class="form-control" type="text"  name="price" value="dataoutput.Name_Brand" v-model="dataoutput.Name_Brand" disabled/>
              </div>
              <div class="form-group">
                <label>category</label>
                <input class="form-control" type="text"  name="price" value="dataoutput.Name_Category" v-model="dataoutput.Name_Category" disabled/>
              </div>
              <div class="form-group">
                <div class="row">
                  <label class="idlabel" htmlFor="size">Size  :</label>
                  <input class="form-control" type="text"  name="brand" value="dataoutput.name_size" v-model="dataoutput.name_size" disabled/>
                  <label>select Color</label>
                  <input class="form-control" type="text"  name="brand" value="dataoutput.Name_Color" v-model="dataoutput.Name_Color" disabled/>
                  <label  class="idlabel" htmlFor="number">Number</label>
                  <input class="form-control" type="number"  name="title" value="dataoutput.number" v-model="dataoutput.number" disabled/>
                </div>
              </div>
              <div class="form-group">
                <label>Gender</label><br>
                <input class="form-control" type="text"  name="brand" value="dataoutput.Name_Gender" v-model="dataoutput.Name_Gender" disabled/>
              </div>
              <div class="form-group" >
                <div class="error-mesage" v-if="message"><h3>{{ message }}</h3></div>
                <button type="button" name="example-email" class="btn btn-info" @click="back">back </button>
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
  name: 'ViewProduct',
  data() {
    return {
      dataoutput:{
        Name_Category: 0,
        Name_Brand: 0,
        Name_Gender : 0,
        name: "",
        price: "",
        name_size : "L",
        number : "",
        Name_Image : 0,
        Name_Color : 0,
        des: "",
        link:"",
        avgStar:0
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
      let id = this.$route.params.id
      await axios.get('/productsForAdmin/' +id , this.token).then((response)=> {
        console.log(response.data.data)
        let temp = response.data.data[0]
        console.log(response.data.data)
        this.dataoutput = {...this.dataoutput ,
          Name_Category: temp.Name_Category,
          Name_Brand: temp.Name_Brand,
          Name_Gender : temp.Name_Gender,
          name: temp.name,
          price: temp.price,
          name_size : temp.name_size,
          number : temp.number,
          Name_Image : temp.Name_Image,
          Name_Color : temp.Name_Color,
          des: temp.des,
          link:temp.link,
          avgStar: temp.avgStar
        }
        console.log(this.dataoutput)
      }).catch(() =>{

      });

    },

    back() {
      this.$router.push('/products')
    }
  }


}
</script>
<style lang="css">
.my-class .dropdown-menu {
  max-height: 300px;
  overflow-y: scroll;
}
</style>
