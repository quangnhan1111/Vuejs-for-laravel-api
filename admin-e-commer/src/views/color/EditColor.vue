<template>
  <div class="container">
    <!-- edit form column -->
    <div class="col-lg-12 text-lg-center">
      <h2>Edit Color</h2>
      <br>
      <br>
    </div>
    <div class="col-lg-8 push-lg-4 personal-info">
      <form role="form">
        <div class="form-group row">
          <label class="col-lg-3 col-form-label form-control-label">Id</label>
          <div class="col-lg-9">
            <input disabled class="form-control" type="text" value="color.id" v-model="color.id"/>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-lg-3 col-form-label form-control-label">Name</label>
          <div class="col-lg-9">
            <input class="form-control" type="text" value="color.name" v-model="color.name" />
          </div>
        </div>

        <div class="form-group row">
          <div class="error-mesage" v-if="message.length">
            <ul>
              <li v-for="(error,index) in message" :key="index" class="error">{{ error }}</li>
            </ul>
          </div>
          <div class="col-lg-9">
            <input type="reset" class="btn btn-secondary" value="Cancel" />
            <input type="button" class="btn btn-primary" value="Save Changes" @click="handleEdit"/>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
// import usersData from '../users/UsersData'
import axios from "axios";
import { toast } from 'bulma-toast'
// import paginate from "../../utils/helper";

export default {
  name: 'EditColor',
  data() {
    return {
      color:{
        id:"",
        name:""
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
      await axios.get('colors/' + id, token).then((response)=> {
        console.log(response.data.data)
        this.color = response.data.data
      }).catch((error) =>{ console.log(error)
      });
    },
    checkValid() {
      this.message = []
      if( !this.color.name ) {
        this.message.push('Name Color Required')
      }else if(this.color.name.length <6){
        this.message.push('Name Color min is 6 character')
      }
    },

    async handleEdit() {
      this.checkValid()
      if(this.message.length<=0){
        const data = {
          "name": this.color.name
        }
        let token = {
          headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
        }
        let id = this.$route.params.id
        console.log(data)
        await axios.patch('colors/' + id, data, token).then((response) => {
          console.log(response.data.data)
          this.$router.push('/colors')
          toast({
            message: 'Edit Color successfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
            duration: 3000,
            position: 'top-right',
          })
          // success('Edit Success color');

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
