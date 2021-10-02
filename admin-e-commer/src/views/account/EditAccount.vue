<template>
  <div class="page-wrapper">
    <div class="page-breadcrumb">
      <div class="row">
        <div class="col-5 align-self-center">
          <h4 class="page-title">Edit Account</h4>
        </div>

      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card card-body">
            <h4 class="card-title">Edit Account</h4>
            <form class="form-horizontal m-t-30">
              <div class="form-group">
                <label>Full Name</label>
                <input class="form-control" type="text" value="userUpdate.full_name" v-model="userUpdate.full_name" />
              </div>
              <div class="form-group">
                <label>User Name</label>
                <input class="form-control" type="text" value="userUpdate.username" v-model="userUpdate.username" />
              </div>
              <div class="form-group">
                <label>Email</label>
                <input class="form-control" type="text" value="userUpdate.email" v-model="userUpdate.email" />
              </div>
              <div class="form-group">
                <label>Address</label>
                <input class="form-control" type="text" value="userUpdate.address" v-model="userUpdate.address" />
              </div>
              <div class="form-group">
                <label>Phone Number</label>
                <input class="form-control" type="text" value="userUpdate.phone_number" v-model="userUpdate.phone_number" />
              </div>
              <div class="col-md-12">
                <label>Password</label>
                <input class="form-control" type="password" value="userUpdate.password" v-model="userUpdate.password" />
              </div>
              <div class="col-md-12">
                <label>Retype Password</label>
                <input class="form-control" type="password" value="userUpdate.password_confirmation" v-model="userUpdate.password_confirmation" />
              </div>
              <div class="col-md-12">
                <label>Roles</label>
                <input class="form-control" type="text" value="userUpdate.roles" v-model="userUpdate.roles" disabled />
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
import { toast } from 'bulma-toast'
import axios from "axios";
import validateEmail from "../../utils/checkValidation";
export default {
  name: 'EditAccount',
  data() {
    return {
      userUpdate:{
        username: "",
        password: "",
        password_confirmation:"",
        full_name: "",
        address: "",
        email: "",
        phone_number: "",
        roles : ""
      },
      message:[]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      let token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
      }
      // this.checklogin();
      let id = this.$route.params.id
      console.log(id)
      await axios.get('/users/'+localStorage.getItem('id'), token).then((response)=> {
        let temp = {
          username : response.data.data.username,
          password : "",
          password_confirmation: "",
          full_name: response.data.data.full_name,
          address :response.data.data.address ,
          email: response.data.data.email,
          phone_number: response.data.data.phone_number ,
          roles :  response.data.data.roles[0].name
        }
        this.userUpdate = temp
      }).catch((error) =>{ console.log(error)
      });
    },

    checkValid(){
      this.message = []
      if( !this.userUpdate.username ) {
        this.message.push('username Required')
      }else if (this.userUpdate.username.length <6){
        this.message.push('username min is 6 character')
      }
      if( !this.userUpdate.full_name ) {
        this.message.push('full_name Required')
      }else if(this.userUpdate.full_name.length <6){
        this.message.push('full_name min is 6 character')
      }
      if( !this.userUpdate.address ) {
        this.message.push('address Required')
      }
      if( !this.userUpdate.email ) {
        this.message.push('email Required')
      }else if(!validateEmail(this.userUpdate.email)){
        this.message.push('email is not valid')
      }

      if( !this.userUpdate.phone_number ) {
        this.message.push('phone_number Required')
      }else if(this.userUpdate.phone_number.length <11){
        this.message.push('phone_number min is 11 number')
      }
      if( this.userUpdate.password === "" || this.userUpdate.password_confirmation === "" ) {
        this.message.push("You need to enter your password");
      }else if(this.userUpdate.password !== this.userUpdate.password_confirmation){
        this.message.push("Retype password is not correct");
      }
    },

    async handleEdit() {
      this.checkValid();
      let token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
      }
      // let id = this.$route.params.id
      if(this.message.length<=0){
        let data= {
          username : this.userUpdate.username,
          password : this.userUpdate.password,
          password_confirmation: this.userUpdate.password_confirmation,
          full_name: this.userUpdate.full_name,
          address :this.userUpdate.address ,
          email: this.userUpdate.email,
          phone_number: this.userUpdate.phone_number ,
          roles :  this.userUpdate.roles
        }
        console.log(data)
        await axios.put('/users/'+localStorage.getItem('id'), data , token).then((response)=> {
          console.log(response.data.message);
          this.$router.push('/myaccount')
          toast({
            message: 'Edit Account successfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
            duration: 3000,
            position: 'top-right',
          })
          localStorage.setItem("username", this.userUpdate.username);
          localStorage.setItem("fullname", this.userUpdate.full_name);
          this.$store.state.Username = localStorage.getItem('username');
          this.$store.state.fullname = localStorage.getItem('fullname');
          location.reload()

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
