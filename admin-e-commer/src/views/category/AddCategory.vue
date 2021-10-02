<template>
  <div class="container">
    <!-- edit form column -->
    <div class="col-lg-12 text-lg-center">
      <h2>Add Category</h2>
      <br>
      <br>
    </div>
    <div class="col-lg-8 push-lg-4 personal-info">
      <form role="form" >
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
            <input type="button" class="btn btn-primary" value="Save Changes" @click="handleAdd"/>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
// import usersData from '../users/UsersData'
// import axios from "axios";
import { toast } from 'bulma-toast'
// import paginate from "../../utils/helper";
import axios from "axios";

export default {
  name: 'AddCategory',
  data() {
    return {
      category:{
        name:""
      },
      message:[]
    }
  },
  created() {

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
    async handleAdd() {
      this.checkValid()
      if(this.message.length<=0){
        const data = {
          "name": this.category.name
        }
        let token = {
          headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
        }
        console.log(data)
        await axios.post('categories', data, token)
            .then(response => {
              console.log(response.data)
              this.$router.push('/categories')
              toast({
                message: 'Add Category successfully',
                type: 'is-success',
                dismissible: true,
                pauseOnHover: true,
                duration: 3000,
                position: 'top-right',
              })
              // success('Successfully added catogory');
            })
            .catch(errors => {
              console.log(errors)
            })
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
