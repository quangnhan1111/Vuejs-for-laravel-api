<template>
  <div>
    <div class="product-details"><!--product-details-->
      <div class="col-sm-5">
        <div class="view-product">
          <img :src="details.link" width="100px"  height="100px" alt="">
          <h3>ZOOM</h3>
        </div>
      </div>
      <div class="col-sm-7">
        <div class="product-information"><!--/product-information-->
          <img src="../../../public/images/product-details/new.jpg" class="newarrival" alt="" />
          <h2>{{details.name}}</h2>
          <p>{{details.des.substring(0,200)+".."}}</p>
          <img src="images/product-details/rating.png" alt="" />
          <span>
                        <span>{{details.price}}.00$</span>
                        <label>Quantity: {{details.number}}</label>
                        <button class="btn-minus" @click="decreaseNumber" ><i class="fa fa-minus"></i></button>
                        <input type="text" :value="quantity"/>
                        <button class="btn-plus" @click="increaseNumber" ><i class="fa fa-plus"></i></button>
                        <button type="button" class="btn btn-fefault cart" @click="addToCart()">
                          <i class="fa fa-shopping-cart"></i>
                          Add to cart
                        </button>
                      </span>
          <span>Select Gender</span>
          <div class="btn-group btn-group-sm" >
            <button  type="button" class="btn btn-fefault styleGender" @click="setGender(1, 'male')">
              Male
            </button>
            <button  type="button" class="btn btn-fefault styleGender" @click="setGender(2,'female')">
              Female
            </button>
            <button  type="button" class="btn btn-fefault styleGender" @click="setGender(3, 'couple')">
              Couple
            </button>
          </div>
          <span>Select Size</span>
          <div class="btn-group btn-group-sm">
            <button type="button" class="btn btn-fefault style" @click="setSize('M')">
              M
            </button>
            <button  type="button" class="btn btn-fefault style " @click="setSize('L')">
              L
            </button>
            <button  type="button" class="btn btn-fefault style" @click="setSize('XL')">
              XL
            </button>
            <button type="button" class="btn btn-fefault style" @click="setSize('XXL')">
              XXL
            </button>
          </div>
          <div v-if="listColor!== []">
            <span>Select Color</span>
            <div class="btn-group btn-group-sm" v-for="Color in listColor" :key="Color.id">
              <button  type="button" class="btn btn-fefault styleColor" @click="setColor(Color.id, Color.name)">
                {{Color.name}}
              </button>
            </div>
          </div>
          <span>Clear Select</span>
          <button @click="clearSelect">Clear</button>
<!--          <p><b>Color:</b> {{details.Name_Color}}</p>-->
<!--          <p><b>Gender:</b> {{details.Name_Gender}}</p>-->
<!--          <p><b>Size:</b> {{details.name_size}}</p>-->
          <p><b>Category:</b> {{details.Name_Category}}</p>
          <p><b>Brand:</b> {{details.Name_Brand}}</p>
          <p><b>Avg Star:</b> {{details.avgStar}}</p>
          <a href=""><img src="images/product-details/share.png" class="share img-responsive"  alt="" /></a>
        </div><!--/product-information-->
      </div>
    </div><!--/product-details-->

    <div class="category-tab shop-details-tab"><!--category-tab-->
      <div class="col-sm-12">
        <ul class="nav nav-tabs">
          <li class="active"><a href="#reviews" data-toggle="tab">Reviews ({{totalReview}})</a></li>
        </ul>
      </div>
      <div class="tab-content">
        <div class="tab-pane fade active in" id="reviews">
          <div class="col-sm-12" v-for="Review in listReview" :key="Review.id">
            <ul>
              <li><a href=""><i class="fa fa-user"></i>Email: {{Review.email}}</a></li>
              <li><a href=""><i class="fa fa-clock-o"></i>Created: {{Review.created_at}}</a></li>
              <li v-if="Review.number_of_star == 1">Rated: <a href=""><i class="fa fa-star"></i></a></li>
              <li v-if="Review.number_of_star == 2">Rated: <a href=""><i class="fa fa-star"></i><i class="fa fa-star"></i></a></li>
              <li v-if="Review.number_of_star == 3">Rated: <a href=""><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></a></li>
              <li v-if="Review.number_of_star == 4">Rated: <a href=""><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></a></li>
              <li v-if="Review.number_of_star == 5">Rated: <a href=""><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></a></li>

            </ul>
            <p>Content: {{Review.content}}.</p>
          </div>
          <p><b>Write Your Review</b></p>

          <template v-if="$store.state.isAuthenticated">
            <form  @submit.prevent="submit" >
              <textarea v-model="review.content" ></textarea>
              <b>Rating:
                <div>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-button @click="star = null">Clear</b-button>
                    </b-input-group-prepend>
                    <b-form-rating v-model="star" color="#ff8800" class="star"></b-form-rating>
                  </b-input-group>
                </div>
              </b>
              <img src="images/product-details/rating.png" alt="" />
              <button type="submit" class="btn btn-default pull-right">
                Submit
              </button>
            </form>
          </template>
          <template v-else>
            <router-link tag="span" to="/login/" ><a><i class="fas fa-sign-in-alt"></i>You must Login to Submit your review </a></router-link>
          </template>
        </div>

      </div>
    </div><!--/category-tab-->


  </div>

</template>
<script>
import { toast } from 'bulma-toast'
import axios from "axios";
import {mapState} from "vuex";
// import AwesomeVueStarRating from "awesome-vue-star-rating";

export default {
  name: 'ProductDetail',
  components: {
    // AwesomeVueStarRating
  },
  data() {
    return {
      quantity: 1,
      details: [],
      listReview:[],
      productName: this.$route.params.id,
      review: {
        content: "",
        user_id: null,
        product_id: null,
        number_of_star:2
      },
      totalReview:0,
      star: 2,
      message: [],
      select: {
        gender:0,
        nameSize:"",
        Name_Color:"",
        Name_Gender:""
      },
      selectColor:0,
      listColor:[],
    }
  },
  computed: {
    ...mapState(['fullname', 'Id']),
  },
  async created() {
    await this.getData()
  },
  methods: {
    async getData() {
      await axios.get('/products/' + this.productName).then((response) => {
        this.details = response.data.data[0]
      }).catch(() => {
      })

      await axios.get('/client/review/' + this.productName).then((response) => {
        // console.log(response.data.data)
        this.listReview = response.data.data.data
        this.totalReview = response.data.data.total
      }).catch(() => {
      })

    },

    clearSelect() {
      this.select.gender = 0
      this.select.nameSize = ""
      this.listColor = []
      this.selectColor = 0
      this.review.product_id = null
    },
    setGender(id, Name_Gender) {
      this.select.gender = id
      this.select.Name_Gender= Name_Gender
    },
    setSize(nameSize) {
      this.select.nameSize = nameSize
    },
    async getListColor() {
      console.log(this.select.gender)
      console.log(this.select.nameSize)
      if (this.select.nameSize == '' || this.select.gender == 0) {
        this.message.push("Please select gender and size")
      } else {
        console.log("api runing")
        await axios.get('/colors/get/byGender/' + this.select.gender + '/bySize/' + this.select.nameSize + '/byNameProduct/' + this.details.name).then((response) => {
          // console.log(response.data.data)
          this.listColor = response.data.data
        }).catch(() => {
        })
      }
    },
    setColor(id, Name_Color) {
      this.selectColor = id
      this.select.Name_Color = Name_Color
      axios.get('/colors/get/byColor/' + this.selectColor + '/byGender/' + this.select.gender + '/bySize/' + this.select.nameSize + '/byNameProduct/' + this.details.name).then((response) => {
        console.log(response.data.data[0].id)
        // this.listColor = response.data.data
        //set Product for color size and gender
        this.review.product_id = response.data.data[0].id
      }).catch(() => {
      })
    },
    addToCart() {
      if (this.select.nameSize != '' && this.select.gender != 0 && this.selectColor != 0) {
        if (isNaN(this.quantity) || this.quantity < 1) {
          this.quantity = 1
        }
        const item = {
          product: {
            ...this.details,
            id: this.review.product_id,
            color_id: this.selectColor,
            Name_Color: this.select.Name_Color,
            Name_Gender: this.select.Name_Gender,
            gender_id: this.select.gender,
            name_size: this.select.nameSize
          },
          quantity: this.quantity
        }

        console.log(item);

        this.$store.commit('addToCart', item)
        console.log(localStorage.getItem('cart'));
        toast({
          message: 'The product was added to the cart',
          type: 'is-success',
          dismissible: true,
          pauseOnHover: true,
          duration: 3000,
          position: 'bottom-right',
        })
      } else {
        toast({
          message: 'Please select gender color and size of this product',
          type: 'is-success',
          dismissible: true,
          pauseOnHover: true,
          duration: 3000,
          position: 'bottom-right',
        })
      }
    },
    decreaseNumber() {
      this.quantity--
      if (this.quantity <= 0) {
        this.quantity++
      }
    },
    increaseNumber() {
      this.quantity++;
    },
    async submit() {
      if (this.review.product_id != null) {
        let data = {
          content: this.review.content,
          user_id: localStorage.getItem('id'),
          product_id: this.review.product_id,
          number_of_star: this.star
        }
        console.log(data)
        await axios.post('/reviews/', data).then((response) => {
          // this.listReview = response.data.data
          console.log(response.data.data)
        }).catch(() => {
        })
        await axios.get('/client/review/' + this.productName).then((response) => {
          this.listReview = response.data.data.data
        }).catch(() => {
        })
      }
      else{
        toast({
          message: 'Please select gender color and size of this product before review this product',
          type: 'is-success',
          dismissible: true,
          pauseOnHover: true,
          duration: 3000,
          position: 'bottom-right',
        })
      }
    },
  },
    watch: {
      select: {
        async handler(){
          await this.getListColor();
        },
        deep: true
      },
    }
}
</script>

<style scoped>
.star{
  display: flex;
  justify-items: flex-start;
}

.style  {
  background-color: rgba(87, 71, 71, 0.25);
}

.style:focus {
  background-color:yellow;
}

.style:hover {
  background-color: #656523;
}

.styleGender  {
  background-color: rgba(87, 71, 71, 0.25);
}

.styleGender:focus {
  background-color:yellow;
}

.styleGender:hover {
  background-color: #656523;
}

.styleColor  {
  background-color: rgba(87, 71, 71, 0.25);
}

.styleColor:focus {
  background-color:yellow;
}

.styleColor:hover {
  background-color: #656523;
}

</style>
