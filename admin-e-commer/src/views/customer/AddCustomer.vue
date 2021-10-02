<template>
  <div class="page-wrapper">
    <div class="page-breadcrumb">
      <div class="row">
        <div class="col-5 align-self-center">
          <h4 class="page-title">Customer</h4>
        </div>

      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card card-body">
            <h4 class="card-title">New Customer</h4>
            <form class="form-horizontal m-t-30">
              <div class="form-group">
                <label>Full Name</label>
                <input class="form-control" type="text" value="user.fullName" v-model="user.full_name" />
              </div>
              <div class="form-group">
                <label>User Name</label>
                <input class="form-control" type="text" value="user.username" v-model="user.username" />
              </div>
              <div class="form-group">
                <label>Email</label>
                <input class="form-control" type="text" value="user.email" v-model="user.email" />
              </div>
              <div class="form-group">
                <label>Address</label>
                <input class="form-control" type="text" value="user.address" v-model="user.address" />
              </div>
              <div class="form-group">
                <label>Phone Number</label>
                <input class="form-control" type="number" value="user.phoneNumber" v-model="user.phone_number" />
              </div>
              <div class="form-group">
                <label>Password</label>
                <input class="form-control" type="password" value="user.password" v-model="user.password" />
              </div>
              <div class="form-group">
                <label>Retype Password</label>
                <input class="form-control" type="password" value="user.password_confirmation" v-model="user.password_confirmation" />
              </div>
              <div class="form-group" >
                <div class="error-mesage" v-if="message.length">
                  <ul>
                    <li v-for="(error,index) in message" :key="index" class="error">{{ error }}</li>
                  </ul>
                </div>
                <button type="button" name="example-email" class="btn btn-info" @click="handleAdd">Save </button>
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
import validateEmail from "../../utils/checkValidation";

export default {
  name: 'AddCustomer',
  data() {
    return {
      user:{
        address: "",
        full_name: "",
        username: "",
        password: "",
        email: "",
        phone_number: "",
        roles: "customer",
        password_confirmation: ""
      },
      message:[]
    }
  },
  created() {

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
      if( this.user.password === "" || this.user.password_confirmation === "" ) {
        this.message.push("You need to enter your password");
      }else if(this.user.password !== this.user.password_confirmation){
        this.message.push("Retype password is not correct");
      }
    },
    async handleAdd() {
      this.checkValid()
      if(this.message.length<=0){
        let token = {
          headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
        }
        await axios.post("users/", this.user , token).then((response)=> {
          console.log(response.data.message);
          this.$router.push('/customers')
          toast({
            message: 'Add Customer successfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
            duration: 3000,
            position: 'top-right',
          })
          // success('Successfully added customer');
        }).catch((error) =>{
          alert(error.response.data.message);
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
