<template>
  <section id="form"><!--form-->
    <div class="notification" v-if="message.length">
      <ul>
        <li v-for="(error,index) in message" :key="index" class="error">{{ error }}</li>
      </ul>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-sm-4 col-sm-offset-1">
          <div class="login-form"><!--login form-->
            <h2>Login to your account</h2>
            <form @submit.prevent="submitLogin">
              <input type="text" placeholder="Name" v-model="userInput.username"/>
              <input type="password" placeholder="Password" v-model="userInput.password"/>
              <span>
								<input type="checkbox" class="checkbox">
								Keep me signed in
							</span>
              <button type="submit" class="btn btn-default">Login</button>
            </form>
          </div><!--/login form-->
        </div>
        <div class="col-sm-1">
          <h2 class="or">OR</h2>
        </div>
        <div class="col-sm-4">
          <div class="signup-form" @submit.prevent="submitRegister"><!--sign up form-->
            <h2>New User Signup!</h2>
            <form action="#">
              <input type="text" placeholder="full_name" v-model="userRegister.full_name"/>
              <input type="text" placeholder="Username" v-model="userRegister.username"/>
              <input type="email" placeholder="Email Address" v-model="userRegister.email"/>
              <input type="text" placeholder="Address" v-model="userRegister.address"/>
              <input type="number" placeholder="Phone" v-model="userRegister.phone_number"/>
              <input type="password" placeholder="Password" v-model="userRegister.password"/>
              <input type="password" placeholder="Password" v-model="userRegister.password_confirmation"/>
              <button type="submit" class="btn btn-default">Signup</button>
            </form>
          </div><!--/sign up form-->
        </div>
      </div>
    </div>
  </section><!--/form-->
</template>
<script>
import {toast} from "bulma-toast";
// import axios from "axios";
import { mapMutations } from 'vuex'
import axios from "axios";
import validateEmail from "../../utils/checkValidation";
export default {
  name: 'Login',
  components: {

  },
  data() {
    return {
      userInput: {
        username:"",
        password:""
      },
      userRegister: {
        username:"",
        password: "",
        password_confirmation: "",
        full_name: "",
        email: "",
        address: "",
        phone_number: "",
        roles: "customer"
      },
      message:[]

    }
  },
  async created() {
  },
  computed: {
    ...mapMutations(['LoginDispatch'])
  },
  methods:{
    checkValidLogin(){
      this.message = []
      if( !this.userInput.username ) {
        this.message.push('username Required')
      }else if (this.userInput.username.length <6){
        this.message.push('username min is 6 character')
      }
      if( !this.userInput.password) {
        this.message.push("Password Required");
      }
    },
    checkValidRegister(){
      this.message = []
      if( !this.userRegister.username ) {
        this.message.push('username Required')
      }else if (this.userRegister.username.length <6){
        this.message.push('username min is 6 character')
      }
      if( !this.userRegister.full_name ) {
        this.message.push('full_name Required')
      }else if(this.userRegister.full_name.length <6){
        this.message.push('full_name min is 6 character')
      }
      if( !this.userRegister.address ) {
        this.message.push('address Required')
      }
      if( !this.userRegister.email ) {
        this.message.push('email Required')
      }else if(!validateEmail(this.userRegister.email)){
        this.message.push('email is not valid')
      }

      if( !this.userRegister.phone_number ) {
        this.message.push('phone_number Required')
      }else if(this.userRegister.phone_number.length <11){
        this.message.push('phone_number min is 11 number')
      }
      if( this.userRegister.password === "" || this.userRegister.password_confirmation === "" ) {
        this.message.push("You need to enter your password");
      }else if(this.userRegister.password !== this.userRegister.password_confirmation){
        this.message.push("Retype password is not correct");
      }
    },
    async submitLogin() {
      this.checkValidLogin()
      if(this.message.length<=0){
        axios.defaults.headers.common["Authorization"] = ""
        localStorage.removeItem("token")
        await axios.post("auth/login", this.userInput).then((response)=> {
          console.log(response.data)
          if(response.data.rolesName[0] === "customer"){
            const token = response.data.token
            this.$store.commit('setToken', token)
            axios.defaults.headers.common["Authorization"] = "Token " + token
            localStorage.setItem("token", token)
            localStorage.setItem("id", response.data.info.id);
            localStorage.setItem("username", response.data.info.username);
            localStorage.setItem("full_name", response.data.info.full_name);
            toast({
              message: 'Login successfully',
              type: 'is-success',
              dismissible: true,
              pauseOnHover: true,
              duration: 3000,
              position: 'top-right',
            })
            this.LoginDispatch();
            // this.$router.push(toPath)

          }else{
            this.message.push("Account is not correct")
          }
        }).catch(error => {
          if (error.response) {
            for (const property in error.response.data) {
              this.message.push(`${property}: ${error.response.data[property]}`)
            }
          } else {
            this.message.push('Something went wrong. Please try again')
          }
        })



      }
    },
    async submitRegister(){
      console.log(this.message.length)
      this.checkValidRegister()
      console.log(this.message.length)
      if(this.message.length<=0){
        let data = {
          username:this.userRegister.username,
          password: this.userRegister.password,
          password_confirmation: this.userRegister.password_confirmation,
          full_name: this.userRegister.full_name,
          email: this.userRegister.email,
          address: this.userRegister.address,
          phone_number: this.userRegister.phone_number,
          roles: "customer"
        }
        console.log(data)
        await axios.post("auth/register/", data).then((response)=> {
          console.log(response.data)
          this.userRegister.username = ""
          this.userRegister.password = ""
          this.userRegister.password_confirmation = ""
          this.userRegister.address = ""
          this.userRegister.phone_number = ""
          this.userRegister.full_name = ""
          this.userRegister.email = ""
          toast({
            message: 'Register successfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
            duration: 3000,
            position: 'top-right',
          })
        }).catch((error) =>{
          this.message.push(error.response.data.message);
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
