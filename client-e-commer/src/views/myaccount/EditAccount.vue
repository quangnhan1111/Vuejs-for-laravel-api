<template>
  <div class="features_items"><!--features_items-->
    <h2 class="title text-center">Info Customer</h2>
    <div class="container">
      <div class="shopper-informations">
        <div class="row">
          <div class="col-sm-12 ">
            <b-container fluid>
              <h4>My Account</h4>
              <b-row class="my-1">
                <b-col sm="8">
                  <label >Full Name :</label>
                </b-col>
                <b-col sm="6">
                  <b-form-input id="input-none"  placeholder="Full Name" v-model="user.full_name" ></b-form-input>
                </b-col>
                <b-col sm="8">
                  <label >Address:</label>
                </b-col>
                <b-col sm="6">
                  <b-form-input id="input-none" placeholder="Address" v-model="user.address" ></b-form-input>
                </b-col>
                <b-col sm="8">
                  <label >Phone:</label>
                </b-col>
                <b-col sm="6">
                  <b-form-input id="input-none"  placeholder="Phone" v-model="user.phone_number" ></b-form-input>
                </b-col>
                <b-col sm="8">
                  <label >Email:</label>
                </b-col>
                <b-col sm="6">
                  <b-form-input id="input-none"  placeholder="Email" v-model="user.email" ></b-form-input>
                </b-col>
                <b-col sm="8">
                  <label >Username:</label>
                </b-col>
                <b-col sm="6">
                  <b-form-input id="input-none" placeholder="Username" v-model="user.username" ></b-form-input>
                </b-col>
                <b-col sm="8">
                  <div class="error-mesage" v-if="message.length">
                    <ul>
                      <li v-for="(error,index) in message" :key="index" class="error">{{ error }}</li>
                    </ul>
                  </div>
                  <button @click="handleEdit">SAVE</button>
                </b-col>
              </b-row>

            </b-container>
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
import validateEmail from "../../utils/checkValidation";

export default {
  name: 'EditAccount',
  data() {
    return {
      user:{
        username: "",
        full_name: "",
        address: "",
        email: "",
        phone_number: "",
      },
      message:[]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    checkValid(){
      this.message = []
      if( !this.user.username ) {
        this.message.push('username Required')
      }else if (this.user.username.length <6){
        this.message.push('username min is 6 character')
      }
      if( !this.user.full_name ) {
        this.message.push('full_name Required')
      }else if(this.user.full_name.length <6){
        this.message.push('full_name min is 6 character')
      }
      if( !this.user.address ) {
        this.message.push('address Required')
      }
      if( !this.user.email ) {
        this.message.push('email Required')
      }else if(!validateEmail(this.user.email)){
        this.message.push('email is not valid')
      }

      if( !this.user.phone_number ) {
        this.message.push('phone_number Required')
      }else if(this.user.phone_number.length <11){
        this.message.push('phone_number min is 11 number')
      }
    },
    async getData() {
      let token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
      }
      // this.checklogin();
      let id = this.$route.params.id
      console.log(id)
      await axios.get('/users/'+id, token).then((response)=> {
        console.log(response.data.data)
        this.user = response.data.data
      }).catch(() =>{
      })
    },


    async handleEdit() {
      this.checkValid()
      if(this.message.length<=0){
        let token = {
          headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
        }
        let id = this.$route.params.id
        let data = {
          username: this.user.username,
          full_name: this.user.full_name,
          address: this.user.address,
          email: this.user.email,
          phone_number: this.user.phone_number,
          roles: "customer",
          password: ""
        }
        console.log(data)
        await axios.put("users/"+id, data , token).then((response)=> {
          console.log(response.data.message);
          this.$router.push('/account')
        }).catch((error) =>{
          console.log(error.response.data);
        });

      }
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
