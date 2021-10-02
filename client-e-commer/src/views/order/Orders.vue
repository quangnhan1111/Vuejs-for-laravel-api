<template>
  <b-container >
    <h2 class="title text-center">Invoice</h2>
    <div>
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">List Invoice
          </h4>
        </div>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
            <tr>
              <th scope="col">Id Order</th>
              <th scope="col">Customer Order</th>
              <th scope="col">Status</th>
              <th scope="col">totalPrice</th>
              <th scope="col">full_name_DesUser</th>
              <th scope="col">email_DesUser</th>
              <th scope="col">phone_number_DesUser</th>
              <th scope="col">address_DesUser</th>
              <th scope="col">message</th>
              <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="Invoice in list = listInvoice " :key="Invoice.id">
              <th scope="row">{{ Invoice.id }}</th>
              <td>{{ Invoice.FullNameCustomer }}</td>
              <td>{{ (Invoice.is_paid) ? "Paid" : "Unpaid" }} </td>
              <td>{{ Invoice.TotalForPay }}</td>
              <td>{{ Invoice.full_name }}</td>
              <td>{{ Invoice.email }}</td>
              <td>{{ Invoice.phone_number }}</td>
              <td>{{ Invoice.address }}</td>
              <td>{{ Invoice.message }}</td>
              <td>
                <router-link :to="`/view-order/${Invoice.id}`"  tag="button">View</router-link>
              </td>
            </tr>
            </tbody>
          </table>
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
  </b-container>
</template>
<script>
// import usersData from '../users/UsersData'
import Paginate from "../paginate/Paginate";
import axios from "axios";

export default {
  name: 'Orders',
  components:{
    Paginate
  },
  data() {
    return {
      listInvoice: [],
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
      console.log(this.$store.state.Id)
      let token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
      }
      // this.checklogin();
      await axios
          .get('/invoice/getInvoice/customer/status/'+localStorage.getItem('id')+'?page='+this.paginate.current_page, token)
          .then(response => {
            console.log(response.data.data.data)
            this.all = response.data.data
            this.listInvoice = this.all.data
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

    // async searchHandler()  {
    //   if (this.searchValue !== "") {
    //     let token = {
    //       headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
    //     }
    //     await  axios.get('category?search='+this.searchValue, token).then((response)=> {
    //       // console.log(response.data)
    //       this.listCategory(response.data.content);
    //     }).catch((error) =>{ console.log(error)
    //     });
    //     const newCategoryList = this.listCategory.filter((category) => {
    //       return Object.values(category)
    //           .join(" ")
    //           .toLowerCase()
    //           .includes(this.searchValue.toLowerCase());
    //     });
    //     this.searchResults = newCategoryList;
    //   } else {
    //     this.searchResults = this.listCategory;
    //   }
    //   // showAlert(true, 'success', 'search value');
    // },

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
  }
}
</script>
