<template>
  <div class="container">
    <!-- edit form column -->
    <div class="col-lg-12 text-lg-center">
      <h2>Add color</h2>
      <br>
      <br>
    </div>
    <div class="col-lg-8 push-lg-4 personal-info">
      <form role="form" >
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

// import paginate from "../../utils/helper";
import { toast } from 'bulma-toast'
import axios from "axios";

export default {
  name: 'AddColor',
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

  },
  methods: {
    checkValid() {
      this.message = []
      if( !this.color.name ) {
        this.message.push('Name Color Required')
      }else if(this.color.name.length <2){
        this.message.push('Name Color min is 2 character')
      }
    },
    async handleAdd() {
      this.checkValid()
      if(this.message.length<=0){
        const data = {
          "name": this.color.name
        }
        let token = {
          headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
        }
        console.log(data)
        await axios.post('colors/', data, token)
            .then(response => {
              console.log(response.data)
              this.$router.push('/colors')
              toast({
                message: 'Add Color successfully',
                type: 'is-success',
                dismissible: true,
                pauseOnHover: true,
                duration: 3000,
                position: 'top-right',
              })
              // success('Successfully added color');
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
