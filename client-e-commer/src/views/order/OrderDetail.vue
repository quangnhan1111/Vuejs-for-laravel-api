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
              <th scope="col">Image Product</th>
              <th scope="col">Customer Order</th>
              <th scope="col">Status</th>
              <th scope="col">name_product</th>
              <th scope="col">number_sold_out</th>
              <th scope="col">NameColors</th>
              <th scope="col">NameGender</th>
              <th scope="col">name_size</th>
              <th scope="col">price</th>
              <th scope="col">TotalNumberWareProduct</th>
              <th scope="col">TotalPrice</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="invoiceDetail in list = invoiceDetail " :key="invoiceDetail.id">
              <th scope="row">{{ invoiceDetail.id }}</th>
              <img :src="invoiceDetail.link" width="100px"  height="100px" alt="">
              <td>{{ invoiceDetail.FullNameCustomer }}</td>
              <td>{{ (invoiceDetail.is_paid) ? "Paid" : "Unpaid" }} </td>
              <td>{{ invoiceDetail.name }}</td>
              <td>{{ invoiceDetail.numberSoldOut }}</td>
              <td>{{ invoiceDetail.NameColors }}</td>
              <td>{{ invoiceDetail.NameGender }}</td>
              <td>{{ invoiceDetail.name_size }}</td>
              <td>{{ invoiceDetail.price }}</td>
              <td>{{ invoiceDetail.TotalNumberWareProduct }}</td>
              <td>{{ invoiceDetail.price * invoiceDetail.numberSoldOut}}</td>
            </tr>
            <tr>
              <td colspan="4">&nbsp;</td>
              <td colspan="2">
                <table class="table table-condensed total-result">
                  <tr>
                    <td >Total Price For THis Invoice</td>
                    <td><span>${{ TotalForPay.toFixed(2) }}$</span></td>
                  </tr>
                </table>
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
// import axios from "axios";
import axios from "axios";
import Paginate from "../paginate/Paginate";

export default {
  name: 'OrderDetail',
  components: {Paginate},
  data() {
    return {
      TotalForPay: "",
      invoiceDetail:{
        id: "",
        is_paid:"",
        numberSoldOut: "",
        name:"",
        name_size:"",
        price:"",
        TotalNumberWareProduct:"",
        NameColors:"",
        NameGender: "",
        FullNameCustomer: "",
        link : "",
      },
      paginate: {
        current_page:1,
        first_page_url:"",
        last_page:1,
        last_page_url:"",
        per_page:1,
        total: 1,
      },
      id: this.$route.params.id,
      message:"",
    }
  },
  async created() {
    await this.getData()
  },
  methods: {
    onPageChange(page){
      this.paginate.current_page = page
    },
    async getData (){
      // checklogin();
      let token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
      }
      await axios.get('/invoice/showByCustomer/' + this.id, token).then((response)=> {
        this.all = response.data.data
        console.log(this.all.data)
        this.invoiceDetail = this.all.data
        this.TotalForPay = this.all.data[0].TotalForPay
        this.paginate.current_page = this.all.current_page
        this.paginate.first_page_url = this.all.first_page_url
        this.paginate.last_page = this.all.last_page
        this.paginate.last_page_url = this.all.last_page_url
        this.paginate.per_page = this.all.per_page
        this.paginate.total = this.all.total
      }).catch((error) =>{console.log(error) });
    },

    back() {
      this.$router.push('/posts')
    }
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
