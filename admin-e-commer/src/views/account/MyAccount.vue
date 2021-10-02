<template>
  <div class="page-wrapper">
    <div class="page-breadcrumb">
      <div class="col-5 align-self-center">
        <h4 class="page-title">My Account</h4>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <router-link :to="`/edit-account/${id}`"  tag="button">Edit</router-link>
            </div>
            <div class="table-responsive">
              <div class="col-md-12">
                <label>Full Name</label>
                <input class="form-control" type="text" value="userUpdate.fullName" v-model="userUpdate.fullName" disabled/>
              </div>
              <br>
              <div class="col-md-12">
                <label>Phone Number</label>
                <input class="form-control" type="text" value="userUpdate.phoneNumber" v-model="userUpdate.phoneNumber" disabled/>
              </div>
              <br>
              <div class="col-md-12">
                <label>Email</label>
                <input class="form-control" type="text" value="userUpdate.email" v-model="userUpdate.email" disabled/>
              </div>
              <br>
              <div class="col-md-12">
                <label>Address</label>
                <input class="form-control" type="text" value="userUpdate.address" v-model="userUpdate.address" disabled/>
              </div>
              <br>
              <div class="col-md-12">
                <label>User Name</label>
                <input class="form-control" type="text" value="userUpdate.username" v-model="userUpdate.username" disabled/>
              </div>
              <div class="col-md-12">
                <label>Roles</label>
                <input class="form-control" type="text" value="userUpdate.roles" v-model="userUpdate.roles" disabled/>
              </div>
              <br>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import usersData from '../users/UsersData'
import axios from "axios";

export default {
  name: 'MyAccount',
  components:{

  },
  data() {
    return {
      userUpdate: {
        username: "",
        password: "",
        fullName: "",
        address: "",
        email: "",
        phoneNumber: "",
        roles : ""
      },
      id: localStorage.getItem("id")
    }
  },
  async created() {
    await this.getdata()
  },

  methods: {
    async getdata() {
      console.log(localStorage.getItem('id'))
      var token ={headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} }
      await axios.get('/users/'+localStorage.getItem('id'), token ).then((response)=> {
        console.log(response.data.data)
        let temp = {
          username : response.data.data.username,
          password : "",
          fullName: response.data.data.full_name,
          address :response.data.data.address ,
          email: response.data.data.email,
          phoneNumber: response.data.data.phone_number ,
          roles : response.data.data.roles[0].name
        }
        this.userUpdate = temp ;
      }).catch((error) =>{ console.log(error)
      });
    }
  }


}
</script>

<style lang="sass">
body
  font-family: "Roboto"
  font-size: 16px
  color: #505050

#app
  background-color: #fafafa
  max-width: 30%
  height: 21rem
  margin: 0 auto
  margin-top: 3rem
  border-radius: 1rem
  padding: 1rem
  hr
    border: 1px solid silver
    width: 100%
  h2
    font-size: 1.5rem
    text-align: center
    margin-top: 0
  .transactions
    display: flex
    height: calc(100% - 1.25rem)
    flex-direction: column
    .row
      display: flex
      align-items: center
      padding: 0
      margin: .75rem 0
      .col
        justify-content: center
        flex-basis: 25%
        display: inline-flex
    .pagination
      display: flex
      justify-content: center
      padding: 0
      margin: auto 0 0 0
      list-style-type: none
      .pagination-item
        button
          margin: 0!important
          padding: .25rem .5rem
          font-size: 1.1rem
          border: none
          border-radius: .25rem
          background: none
          &:hover
            cursor: pointer
            background-color: silver
          &[disabled="disabled"]
            color: silver
            cursor: default
            &:hover
              cursor: default
              background-color: transparent
          &.active
            color: red

</style>
