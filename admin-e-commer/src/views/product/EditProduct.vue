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
                <input class="form-control" type="text"  name="name" value="dataoutput.name" v-model="dataoutput.name" />
              </div>
              <div class="form-group">
                <label>Description</label>
                <input class="form-control" type="text"  name="title" value="dataoutput.des" v-model="dataoutput.des" />
              </div>
              <div class="form-group">
                <label>Price</label>
                <input class="form-control" type="number"  name="price" value="dataoutput.price" v-model="dataoutput.price" />
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
                <img id="theImg" :src="dataoutput.link" width="100px"  height="100px" alt=""/>
              </div>
              <div class="form-group">
                <label>select brand</label>
                <b-form-select v-model="dataoutput.id_brand" :options="listBrand"></b-form-select>
              </div>
              <div class="form-group">
                <label>select category</label>
                <b-form-select v-model="dataoutput.id_cate" :options="listCategory"></b-form-select>
              </div>
              <div class="form-group">
                <div class="row">
                  <label class="idlabel" htmlFor="size">Size  :</label>
                  <b-form-select v-model="dataoutput.name_size" :options="listSize"></b-form-select>
                  <label>select Color</label>
                  <b-form-select v-model="dataoutput.id_color" :options="listColor"></b-form-select>
                  <label  class="idlabel" htmlFor="number">Number</label>
                  <input class="form-control" type="number"  name="title" value="dataoutput.number" v-model="dataoutput.number" />
                </div>
              </div>
              <div class="form-group">
                <label>Gender</label><br>
                <b-form-group label="Radios using options" v-slot="{ ariaDescribedby }">
                  <b-form-radio-group
                      id="radio-group-1"
                      v-model="dataoutput.id_gender"
                      :options="listGender"
                      :aria-describedby="ariaDescribedby"
                      name="radio-options"
                  ></b-form-radio-group>
                </b-form-group>
              </div>
              <div class="form-group" >
                <div class="error-mesage" v-if="message.length">
                  <ul>
                    <li v-for="(error,index) in message" :key="index" class="error">{{ error }}</li>
                  </ul>
                </div>
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
  name: 'EditProduct',
  data() {
    return {
      dataoutput:{
        id_cate: 0,
        id_brand: 0,
        id_gender : 0,
        name: "",
        price: "",
        name_size : "L",
        number : "",
        id_image : 0,
        id_color : 0,
        des: "",
        link:""
      },
      listImage:[],
      listCategory:[],
      listBrand:[],
      listColor:[],
      message:[],
      listSize:[
        { value: 'M', text: 'M' },
        { value: 'L', text: 'L' },
        { value: 'XL', text: 'XL' },
        { value: 'XXL', text: 'XXL' },
      ],
      listGender:[
        { value: 1, text: 'Male' },
        { value: 2, text: 'Female' },
        { value: 3, text: 'Couple' },
      ],
      token :{
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
      }
    }
  },
  async created() {
    await this.getData()
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
      // checklogin();
      let id = this.$route.params.id
      await axios.get('/productsForAdmin/' +id , this.token).then((response)=> {
        let temp = response.data.data[0]
        console.log(response.data)
        this.dataoutput = {...this.dataoutput ,
          id_cate: temp.cate_id,
          id_brand: temp.brand_id,
          id_gender : temp.gender_id,
          name: temp.name,
          price: temp.price,
          name_size : temp.name_size,
          number : temp.number,
          id_image : temp.image_id,
          id_color : temp.color_id,
          des : temp.des,
          link: temp.link
        }
        console.log(this.dataoutput)
      }).catch(() =>{

      });

      await axios.get('/categories/getAll', this.token).then((response)=> {
        for (let i = 0; i < response.data.data.length; i++) {
          let data = {
            value:response.data.data[i].id,
            text:response.data.data[i].name,
          }
          this.listCategory.push(data)
          // this.listImage = {...this.listImage, data}
        }
      }).catch((error) =>{
        console.log(error)
      });
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
      await axios.get('/brands/getAll', this.token).then((response)=> {
        for (let i = 0; i < response.data.data.length; i++) {
          let data = {
            value:response.data.data[i].id,
            text:response.data.data[i].name,
          }
          this.listBrand.push(data)
          // this.listImage = {...this.listImage, data}
        }
      }).catch((error) =>{
        console.log(error)
      });
      await axios.get('/colors/getAll', this.token).then((response)=> {
        for (let i = 0; i < response.data.data.length; i++) {
          let data = {
            value:response.data.data[i].id,
            text:response.data.data[i].name,
          }
          this.listColor.push(data)
          // this.color = {...this.listImage, data}
        }
      }).catch((error) =>{
        console.log(error)
      });

    },
    checkValid() {
      this.message = []
      if( !this.dataoutput.name ) {
        this.message.push('Name Product Required')
      }else if(this.dataoutput.name.length <6){
        this.message.push('Name Product min is 6 character')
      }
      if( !this.dataoutput.name_size ) {
        this.message.push('name_size Product Required')
      }

      if( !this.dataoutput.des ) {
        this.message.push('DES Product Required')
      }else if(this.dataoutput.des.length <10){
        this.message.push('DES Product min is 10 character')
      }

      if( !this.dataoutput.id_cate ) {
        this.message.push('cate_id Product Required')
      }
      if( !this.dataoutput.id_brand ) {
        this.message.push('brand_id Product Required')
      }
      if( !this.dataoutput.id_image ) {
        this.message.push('image_id Product Required')
      }
      if( !this.dataoutput.id_color ) {
        this.message.push('color_id Product Required')
      }
      if( !this.dataoutput.id_gender ) {
        this.message.push('gender_id Product Required')
      }

      if( !this.dataoutput.price ) {
        this.message.push('Price Product Required')
      }

      if( !this.dataoutput.number ) {
        this.message.push('Number Product Required')
      }
    },
    async handleEdit() {
      this.checkValid()
      if(this.message.length<=0){
        let id = this.$route.params.id
        const data = {
          name: this.dataoutput.name,
          price: this.dataoutput.price,
          name_size: this.dataoutput.name_size,
          number: this.dataoutput.number,
          des: this.dataoutput.des,
          gender_id: this.dataoutput.id_gender,
          cate_id: this.dataoutput.id_cate,
          brand_id: this.dataoutput.id_brand,
          image_id: this.dataoutput.id_image,
          color_id: this.dataoutput.id_color,

        }
        console.log(data)
        await axios.put('/products/'+id, data,this.token).then((response)=> {
          console.log(response.data)
          toast({
            message: 'Edit Product successfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
            duration: 3000,
            position: 'top-right',
          })
          this.$router.push('/products')
          // success('Edit Success Category');
        }).catch((error) =>{
          console.log(error.response)
        });
      }
    }
  }


}
</script>
<style lang="css">
.my-class .dropdown-menu {
  max-height: 300px;
  overflow-y: scroll;
}

.error{
  color: red;
  text-align: center;
  font-weight: bold;

}
</style>
