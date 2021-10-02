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
                  <b-form-input id="input-none"  placeholder="Full Name" v-model="user.full_name" disabled></b-form-input>
                </b-col>
                <b-col sm="8">
                  <label >Address:</label>
                </b-col>
                <b-col sm="6">
                  <b-form-input id="input-none" placeholder="Address" v-model="user.address" disabled></b-form-input>
                </b-col>
                <b-col sm="8">
                  <label >Phone:</label>
                </b-col>
                <b-col sm="6">
                  <b-form-input id="input-none"  placeholder="Phone" v-model="user.phone_number" disabled></b-form-input>
                </b-col>
                <b-col sm="8">
                  <label >Email:</label>
                </b-col>
                <b-col sm="6">
                  <b-form-input id="input-none"  placeholder="Email" v-model="user.email" disabled></b-form-input>
                </b-col>
                <b-col sm="8">
                  <label >Username:</label>
                </b-col>
                <b-col sm="6">
                  <b-form-input id="input-none" placeholder="Username" v-model="user.username" disabled></b-form-input>
                </b-col>
                <b-col sm="8">
                  <router-link :to="`/edit-account/${user.id}`"  tag="button">Edit Account</router-link>
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
// import { mapState} from "vuex";
import axios from "axios";

export default {
  name: 'Account',
  components: {

  },
  async created() {
    await this.getData();
  },
  data() {
    return {
      user:{
        id:"",
        username:"",
        full_name:"",
        phone_number: "",
        address:"",
        email:""
      }
    }
  },
  methods:{
    async getData() {
      let token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
      }
      await axios.get('/users/'+localStorage.getItem('id'), token).then((response)=> {
        console.log(response.data.data)
        this.user = response.data.data
      }).catch(() =>{
      })
    },
  }
}
</script>
