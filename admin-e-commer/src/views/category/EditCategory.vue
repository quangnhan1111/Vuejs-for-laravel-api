<template>
  <div class="container">
    <!-- edit form column -->
    <div class="col-lg-12 text-lg-center">
      <h2>Edit Category</h2>
      <br>
      <br>
    </div>
    <div class="col-lg-8 push-lg-4 personal-info">
      <form role="form" @submit="handleEdit">
        <div class="form-group row">
          <label class="col-lg-3 col-form-label form-control-label">Id</label>
          <div class="col-lg-9">
            <input disabled class="form-control" type="text" value="category.id" v-model="category.id"/>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-lg-3 col-form-label form-control-label">Name</label>
          <div class="col-lg-9">
            <input class="form-control" type="text" value="category.name" v-model="category.name" />
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
            <input type="submit" class="btn btn-primary" value="Save Changes" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
// import usersData from '../users/UsersData'
import axios from "axios";
import {toast} from "bulma-toast";

// import paginate from "../../utils/helper";

export default {
  name: 'EditCategory',
  data() {
    return {
      category:{
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
    checkValid() {
      this.message = []
      if( !this.category.name ) {
        this.message.push('Name Category Required')
      }else if(this.category.name.length <6){
        this.message.push('Name Category min is 6 character')
      }
    },
    async getData() {
      let token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
      }
      // this.checklogin();
      let id = this.$route.params.id
      console.log(id)
      await axios.get('categories/' + id, token).then((response)=> {
        console.log(response.data.data)
        this.category = response.data.data
      }).catch((error) =>{ console.log(error)
      });
    },


    async handleEdit() {
      this.checkValid()
      if(this.message.length<=0){
        const data = {
          "name": this.category.name
        }
        let token = {
          headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
        }
        let id = this.$route.params.id
        console.log(data)
        await axios.patch('categories/' + id, data, token).then((response) => {
          console.log(response.data)
          this.$router.push('/categories')
          toast({
            message: 'Edit Category successfully',
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
