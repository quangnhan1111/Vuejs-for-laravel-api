<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <div class="notification" v-if="message.length">
                  <ul>
                    <li v-for="(error,index) in message" :key="index" class="error">{{ error }}</li>
                  </ul>
                </div>
                <CForm @submit.prevent="submitForm">
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <CInput
                      placeholder="Username"
                      autocomplete="username email"
                      v-model="username"
                      type="text"
                  >
                    <template #prepend-content><CIcon name="cil-user"/></template>
                  </CInput>
                  <CInput
                      placeholder="Password"
                      type="password"
                      autocomplete="curent-password"
                      v-model="password"
                  >
                    <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton type="submit" color="primary" class="px-4">Login</CButton>
                    </CCol>
                    <CCol col="6" class="text-right">
                      <CButton color="link" class="px-0">Forgot password?</CButton>
                      <CButton color="link" class="d-lg-none">Register now!</CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>

          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from 'vuex'
import {toast} from "bulma-toast";
export default {
  name: 'Login',
  data() {
    return {
      username: "",
      password: "",
      message:[]
    }
  },
  created() {

  },
  computed: {
    ...mapMutations(['LoginDispatch'])
  },
  methods: {
    checkValid(){
      this.message = []
      if( !this.username ) {
        this.message.push('username Required')
      }else if (this.username.length <6){
        this.message.push('username min is 6 character')
      }
      if( !this.password) {
        this.message.push("Password Required");
      }
    },
    async submitForm() {
      this.checkValid()
      if(this.message.length<=0){
        axios.defaults.headers.common["Authorization"] = ""
        localStorage.removeItem("token")
        console.log(this.username)
        const formData = {
          username: this.username,
          password: this.password
        }
        console.log(formData);
        await axios.post("auth/login", formData).then((response)=> {
          console.log(response.data)
          const {token, info} = response.data;
          if(response.data.rolesName[0] === "admin" || response.data.rolesName[0] === "employee"){
            localStorage.setItem("token", token);
            localStorage.setItem("id", info.id);
            localStorage.setItem("username", info.username);
            localStorage.setItem("fullname", info.full_name);
            localStorage.setItem("roleNames", response.data.rolesName[0]);
            axios.defaults.headers.common["Authorization"] = "Token " + token
            this.LoginDispatch();
            toast({
              message: 'Login successfully',
              type: 'is-success',
              dismissible: true,
              pauseOnHover: true,
              duration: 3000,
              position: 'top-right',
            })
          }else{
            this.message.push("account is not exist")
          }

        }).catch((error) =>{
          if (error.response) {
            for (const property in error.response.data) {
              this.message.push(`${property}: ${error.response.data[property]}`)
            }
          } else {
            this.message.push('Something went wrong. Please try again')

            console.log(JSON.stringify(error))
          }
        });
      }

    }
  },
}
</script>
<style lang="scss">
.error{
  color: blue;
  text-align: center;
  font-weight: bold;

}
</style>
