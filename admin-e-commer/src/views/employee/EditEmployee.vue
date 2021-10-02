<template>
  <div class="page-wrapper">
    <div class="page-breadcrumb">
      <div class="row">
        <div class="col-5 align-self-center">
          <h4 class="page-title">Employee</h4>
        </div>

      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card card-body">
            <h4 class="card-title">Edit Employee</h4>
            <form class="form-horizontal m-t-30">
              <div class="form-group">
                <label>Full Name</label>
                <input class="form-control" type="text" value="user.full_name" v-model="user.full_name" />
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
                <input class="form-control" type="number" value="user.phone_number" v-model="user.phone_number" />
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
import {toast} from "bulma-toast";
import axios from "axios";
import validateEmail from "../../utils/checkValidation";

export default {
  name: 'EditEmployee',
  data() {
    return {
      user:{
        username: "",
        full_name: "",
        address: "",
        email: "",
        phone_number: "",
        roles : "employee",
        password: ""
      },
      message:""
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
      await axios.get('/users/' + id, token).then((response)=> {
        console.log(response.data.data)
        this.user = {
          username: response.data.data.username,
          full_name: response.data.data.full_name,
          address: response.data.data.address,
          email: response.data.data.email,
          phone_number: response.data.data.phone_number,
          roles : "employee",
          password: ""
        }
      }).catch((error) =>{ console.log(error)
      });
    },


    async handleEdit() {
      this.checkValid()
      if(this.message.length<=0){
        let token = {
          headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
        }
        let id = this.$route.params.id
        await axios.put('/users/' + id, this.user, token).then((response) => {
          console.log(response.data.data)
          this.$router.push('/employees')
          toast({
            message: 'Edit Employee successfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
            duration: 3000,
            position: 'top-right',
          })
          // success('Edit Success Category');

        }).catch((error) => {
          console.log(error)
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
