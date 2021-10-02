<template>
  <div class="container">
    <!-- edit form column -->
    <div class="col-lg-12 text-lg-center">
      <h2>Edit Brand</h2>
      <br>
      <br>
    </div>
    <div class="col-lg-8 push-lg-4 personal-info">
      <form role="form" @submit="handleEdit">
        <div class="form-group row">
          <label class="col-lg-3 col-form-label form-control-label">Id</label>
          <div class="col-lg-9">
            <input disabled class="form-control" type="text" value="brand.id" v-model="brand.id"/>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-lg-3 col-form-label form-control-label">Name</label>
          <div class="col-lg-9">
            <input class="form-control" type="text" value="brand.name" v-model="brand.name" />
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
import { toast } from 'bulma-toast'
// import paginate from "../../utils/helper";

export default {
  name: 'EditBrand',
  data() {
    return {
      brand:{
        id:"",
        name:""
      },
      message:[]
    }
  },
  created() {
    this.getData()
    console.log(this.object.data)
  },
  methods: {
    async getData() {
      let token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
      }
      // this.checklogin();
      let id = this.$route.params.id
      console.log(id)
      await axios.get('brands/' + id, token).then((response)=> {
        console.log(response.data.data)
        this.brand = response.data.data
      }).catch((error) =>{ console.log(error)
      });
    },
    checkValid() {
      this.message = []
      if( !this.brand.name ) {
        this.message.push('Name Brand Required')
      }else if(this.brand.name.length <6){
        this.message.push('NameBrand min is 6 character')
      }
    },

    async handleEdit() {
      this.checkValid()
      if(this.message.length<=0) {
        const data = {
          "name": this.brand.name
        }
        let token = {
          headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
        }
        let id = this.$route.params.id
        console.log(data)
        await axios.put('brands/' + id, data, token).then((response) => {
          console.log(response.data)
          this.$router.push('/brands')
          toast({
            message: 'Edit Brand successfully',
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
