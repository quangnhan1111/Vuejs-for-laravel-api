<template>
  <div class="page-wrapper">
    <div class="page-breadcrumb">
      <div class="row">
        <div class="col-5 align-self-center">
          <h4 class="page-title">User</h4>
        </div>

      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card card-body">
            <h4 class="card-title">View User</h4>
            <form class="form-horizontal m-t-30">
              <div class="form-group">
                <label>ID User</label>
                <input class="form-control" type="text" value="user.full_name" v-model="user.id" />
              </div>
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
                <input class="form-control" type="text" value="user.phone_number" v-model="user.phone_number" />
              </div>

              <div class="form-group" >
                <div class="error-mesage" v-if="message"><h3>{{ message }}</h3></div>
                <button type="submit" name="example-email" class="btn btn-info" @click="back">Back </button>
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
  name: 'ViewUserOfRole',
  data() {
    return {
      user:{
        username: "",
        password: "",
        full_name: "",
        address: "",
        email: "",
        phone_number: "",
        roles : "",
      },
      message:""
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
      await axios.get('/users/' + id, token).then((response)=> {
        console.log(response.data.data)
        this.user = response.data.data
      }).catch((error) =>{ console.log(error)
      });
    },

    back() {
      let idRole = this.$route.params.idRole
      this.$router.push('/user-of-role/'+idRole)
    }
  }



}
</script>
