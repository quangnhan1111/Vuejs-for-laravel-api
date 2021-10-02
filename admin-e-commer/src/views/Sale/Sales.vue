<template>
  <div class="page-wrapper">
    <div class="page-breadcrumb">
      <div class="col-5 align-self-center">
        <h4 class="page-title">Dashboard</h4>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <div class="card ">
            <div class="card-body cardinvoice">
              <AreaChart :data="sale" />
              <div class="sales ct-charts mt-3"></div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title m-b-5">Products sold</h4>
              <h2 class="font-8 text-success font-medium">{{totalProductSoldOut}}</h2>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <h4 class="card-title m-b-0"> Total Customer</h4>
              <h2 class="font-8 text-success font-medium">{{ totalCustomer }}</h2>

            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <h4 class="card-title m-b-0"> Total Employee</h4>
              <h2 class="font-8 text-success font-medium">{{ totalEmployee }}</h2>

            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <h4 class="card-title m-b-5">Top 5 best selling products</h4>
              <h3 class="text-success font-medium" v-for="p in productBestSelling" :key="p.id">- {{ p.name }}</h3>
              <div class="m-t-20 text-center">
                <div id="earnings"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">All Enployee Sale in MOnth</h4>
            </div>
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                <tr>
                  <th class="border-top-0">ID</th>
                  <th class="border-top-0">NAME Employee</th>
                  <th class="border-top-0">MONTH</th>
                  <th class="border-top-0">TOTAL</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="SALE in employeeSale" :key="SALE.id">
                  <td class="txt-oflo">{{ SALE.IdEmplyee }}</td>
                  <td><span class="label label-success label-rounded">{{ SALE.FullNameEmployee }}</span> </td>
                  <td class="txt-oflo">{{ SALE.Month }}</td>
                  <td><span class="font-medium">{{ SALE.TotalMoney }}</span></td>
                </tr>
                </tbody>
                <Paginate
                    :pagination=paginate
                    :totalPages="Math.ceil(paginate.total/paginate.per_page)"
                    :total="paginate.total"
                    :per-page="paginate.per_page"
                    :currentPage="paginate.current_page"
                    @pagechanged="onPageChange"
                />
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Paginate from "../../components/paginate/Paginate";
import AreaChart from "../../components/chart/AreaChart";
export default {
  name: "Sales",
  components: {
    AreaChart,
    Paginate
  },
  data() {
    return {
      all: {},
      paginate: {
        current_page:1,
        first_page_url:"",
        last_page:1,
        last_page_url:"",
        per_page:1,
        total: 1,
      },
      employeeSale:[],
      totalProductSoldOut:0,
      totalCustomer:0,
      totalEmployee:0,
      productBestSelling: 0,
      sale:[0, 0, 74, 0, 0, 0, 15, 0, 0, 0, 0, 1],
      flag:0
    };
  },
  created() {
    this.getData()
  },
  // computed: {
  //   // eslint-disable-next-line vue/return-in-computed-property
  //   chartData: function() {
  //
  //     // console.log(Object.values(this.sale))
  //     return data
  //   }
  // },
  mounted: function () {
    this.getData();
  },
  methods: {
    onPageChange(page){
      this.paginate.current_page = page
    },
    async getData() {
      let token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
      }
      let data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]

      await axios.get('/saleFigure/byMonth', token)
          .then(response => {
            // console.log(response.data.data)
            response.data.data.forEach(function(item) {
              // console.log(index)
              data[item.Month -1] = item.SUM;
            })
            console.log(data)
            // return data;
            this.sale = data
          })
          .catch(error => {
            console.log(error)
          })

       await axios
          .get('/saleFigure/getTotalProductSoldOut', token)
          .then(response => {
              this.totalProductSoldOut = response.data.data
          })
          .catch(error => {
            console.log(error)
          })

      await axios
          .get('/saleFigure/getTotalUser', token)
          .then(response => {
            this.totalCustomer = response.data.data[0]
            this.totalEmployee  = response.data.data[1]
          })
          .catch(error => {
            console.log(error)
          })

      await axios
          .get('/client/product/best', token)
          .then(response => {
            this.productBestSelling = response.data.data
          })
          .catch(error => {
            console.log(error)
          })

      await axios
          .get('/saleFigure/byEmployee?page='+this.paginate.current_page, token)
          .then(response => {
            this.all = response.data.data
            this.employeeSale = this.all.data
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
  },
  watch: {
    paginate: {
      async handler(){
        await this.getData();
      },
      deep: true
    },
    // sale() {
    //   return this.sale
    // },
    async flag() {
      await this.getData()
    }
  }
};
</script>
