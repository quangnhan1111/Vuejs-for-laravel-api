<template>
  <div class="page-wrapper">
    <div class="page-breadcrumb">
      <div class="col-5 align-self-center">
        <h4 class="page-title">Role
          <router-link to="/add-role"  tag="button">New</router-link>
        </h4>
        <input
            class="input-search"
            placeholder="Search..."
            v-model="searchValue"
            @input="searchHandler"
        />
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">List Role
              </h4>
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
                <tr v-for="Role in list = searchValue.length < 1 ? ListRole : searchResults " :key="Role.id">
                  <th scope="row">{{ Role.id }}</th>
                  <td>{{ Role.name }}</td>
                  <td>
                    <router-link :to="`/user-of-role/${Role.id}`"  tag="button">View</router-link>
                    <router-link :to="`/edit-role/${Role.id}`"  tag="button">Edit</router-link>
                    <button
                        class="btn btn-danger"
                        :id = "Role.id"
                        @click="deleteRole"
                    >Delete
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Paginate
          :pagination=paginate
          :totalPages="Math.ceil(paginate.total/paginate.per_page)"
          :total="paginate.total"
          :per-page="paginate.per_page"
          :currentPage="paginate.current_page"
          @pagechanged="onPageChange"
      />
    </div>

  </div>
</template>
<script>
import axios from "axios";
import Paginate from "../../components/paginate/Paginate";
export default {
  name: 'Roles',
  components:{
    Paginate
  },
  data() {
    return {
      ListRole: [],
      all: {},
      paginate: {
        current_page:1,
        first_page_url:"",
        last_page:1,
        last_page_url:"",
        per_page:1,
        total: 1,
      },
      searchValue: "",
      searchResults: [],
      flag: 0
    }
  },
  async created() {
    await this.getData()
  },
  methods: {
    onPageChange(page){
      this.paginate.current_page = page
    },
    async getData() {
      let token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
      }
      // this.checklogin();
      await axios
          .get('/roles/?page='+this.paginate.current_page, token)
          .then(response => {
            console.log(axios.defaults.baseURL)
            console.log(response.data.data)
            this.all = response.data.data
            this.ListRole = this.all.data
            this.paginate.current_page = this.all.current_page
            this.paginate.first_page_url = this.all.first_page_url
            this.paginate.last_page = this.all.last_page
            this.paginate.last_page_url = this.all.last_page_url
            this.paginate.per_page = this.all.per_page
            this.paginate.total = this.all.total
          })
          .catch(error => {
            console.log(error)
          })
    },

    async deleteRole(e) {
      e.preventDefault()
      let id = e.target.id.toString()
      console.log(e.target.id.toString())
      let token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
      }
      await axios.delete('roles/' + id,token)
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
        // await  axios.get('color?search='+this.searchValue, token).then((response)=> {
        //   // console.log(response.data)
        //   this.listColor(response.data.content);
        // }).catch((error) =>{ console.log(error)
        // });
        const newRoleList = Object.values(this.ListRole).filter((role) => {
          console.log(role)
          return Object.values(role)
              .join(" ")
              .toLowerCase()
              .includes(this.searchValue.toLowerCase());
        });
        console.log(newRoleList)
        this.searchResults = newRoleList;
      } else {
        this.searchResults = this.ListRole;
      }
      // showAlert(true, 'success', 'search value');
    },
  },
  watch: {
    paginate: {
      async handler(){
        console.log(this.paginate.current_page)
        console.log(Math.ceil(this.paginate.total/this.paginate.per_page))
        await this.getData();
      },
      deep: true
    },
    async flag() {
      await this.getData()
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
