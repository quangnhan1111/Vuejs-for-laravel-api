<template>
  <div class="page-wrapper">
    <div class="page-breadcrumb">
      <div class="col-5 align-self-center">
        <h4 class="page-title">Category</h4>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">List Category
                <template v-if="auth == 1">
                  <router-link to="/add-category"  tag="button">New</router-link>
                </template>
                </h4>
              <input
                  class="input-search"
                  placeholder="Search..."
                  v-model="searchValue"
                  @input="searchHandler"
              />
              <button class="btn-search "
              ><i class="fa fa-search"></i></button>
            </div>
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="Category in list = searchValue.length < 1 ? listCategory : searchResults " :key="Category.id">
                      <th scope="row">{{Category.id}}</th>
                      <td>{{Category.name}}</td>

                      <td>
                        <template v-if="auth == 1">
                          <router-link :to="`/edit-category/${Category.id}`"  tag="button">Edit</router-link>
                          <button
                              class="btn btn-danger"
                              :id = "Category.id"
                              @click="deleteCategory"
                          >Delete
                          </button>
                        </template>
                      </td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div>

        <div class='btn-container'>
          <button
              class='prev-btn'
              @click="prevPage"
          >
          prev
          </button>
          <div v-for="(item, index) in dataPaginate" :key="index">
            <button
                key="index"
                :class="index === object.page ? 'page-btn active-btn' : null"

                @click="handlePage(index)"
            >
              {{index+1}}
            </button>
          </div>
          <button
              class='next-btn'
              @click="nextPage"
          >
          next
          </button>
        </div>

      </div>
    </div>

  </div>
</template>
<script>
// import usersData from '../users/UsersData'
import axios from "axios";
import paginate from "../../utils/helper";

export default {
  name: 'Categorys',
  components:{

  },
  data() {
    return {
      listCategory: [],
      dataPaginate: [],
      object: {
        data:[],
        loading: true,
        page:0,
      },
      searchValue: "",
      searchResults: [],
      flag: 0
    }
  },
  async created() {
    await this.getData()
    await this.handle()
    // await this.searchHandler()
    // console.log(this.object.data)
    // console.log(this.searchResults)
  },
  // updated: function(){
  //   this.getData()
  // },
  methods: {
    async getData() {
      let token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
      }
      // this.checklogin();
      await axios
          .get('/categories/', token)
          .then(response => {
            console.log(response.data.data.data)
            this.object.data = response.data.data.data
            this.object.loading = false
          })
          .catch(error => {
            console.log(error)
          })
    },

    handle() {
      if (this.object.loading) return
      if(this.object.data.length>0){
        console.log((this.object.data))
        this.dataPaginate = paginate(this.object.data)
        this.listCategory = paginate(this.object.data)[this.object.page];
        console.log(this.listCategory)
        //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
      }
      else {
        this.dataPaginate = []
        this.listCategory = []
      }
    },



    async deleteCategory(e) {
      e.preventDefault()
      let id = e.target.id.toString()
      console.log(e.target.id.toString())
      let token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
      }
      await axios.delete('categories/' + id,token)
          .then(response => {
            // setFilters({...filters, category_edit_id: id})
            this.flag = id
            console.log(response.data)
            // success('Deleted category');
          })
          .catch(errors => {
            console.log(errors)
          })
    },

    async searchHandler()  {
      if (this.searchValue !== "") {
        // let token = {
        //   headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
        // }
        // await  axios.get('categories?search='+this.searchValue, token).then((response)=> {
        //   // console.log(response.data)
        //   this.listCategory = response.data.data.data;
        // }).catch((error) =>{ console.log(error)
        // });
        const newCategoryList = this.listCategory.filter((category) => {
          return Object.values(category)
              .join(" ")
              .toLowerCase()
              .includes(this.searchValue.toLowerCase());
        });
        this.searchResults = newCategoryList;
      } else {
        this.searchResults = this.listCategory;
      }
      // showAlert(true, 'success', 'search value');
    },
    nextPage()  {
      let oldPage = this.object.page
      let nextPage = oldPage + 1
      if (nextPage > this.dataPaginate.length - 1) {
        nextPage = 0
      }
      this.object.page = nextPage
    },
    prevPage() {
      let oldPage = this.object.page
      let prevPage = oldPage - 1
      if (prevPage < 0) {
        prevPage = this.dataPaginate.length - 1
      }
      this.object.page = prevPage
    },

    handlePage (index) {
      this.object.page = index
    }
  },
  watch: {
    object: {
      handler(){
        console.log(this.object.page)
        this.handle()
      },
      deep: true
    },
    async flag() {
      await this.getData()
      // await this.searchHandler()
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
