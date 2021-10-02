<template>
  <div>
    <section id="cart_items">
      <div class="container">
        <div class="breadcrumbs">
          <ol class="breadcrumb">
            <li><a href="#">Home</a></li>
            <li class="active">Check out</li>
          </ol>
        </div><!--/breadcrums-->
        <div class="shopper-informations">
          <div class="row">
            <div class="col-sm-8 ">
              <div class="bill-to">
                <p>Bill To</p>
                <div class="form-one">
                  <form>
                    <input type="text" placeholder="Email*" v-model="DestinativeUser.email">
                    <input type="text" placeholder="Full Name *" v-model="DestinativeUser.full_name">
                    <input type="text" placeholder="Address *" v-model="DestinativeUser.address">
                    <input type="text" placeholder="Phone Number *" v-model="DestinativeUser.phone_number">
                  </form>
                </div>
                <div class="form-two">
                  <form>
                    <select>
                      <option>-- Country --</option>
                      <option>United States</option>
                    </select>
                    <select>
                      <option>-- State / Province / Region --</option>
                      <option>United States</option>
                    </select>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="order-message">
                <p>Shipping Order</p>
                <textarea name="message"  placeholder="Notes about your order, Special Notes for Delivery" rows="16" v-model="DestinativeUser.message"></textarea>
                <label><input type="checkbox"> Shipping to bill address</label>
              </div>
            </div>
          </div>
        </div>
        <template v-if="cartTotalLength">
          <hr>
          <b-button class="btn btn-default update" @click="submitForm">Confirm</b-button>
        </template>
        <div class="review-payment">
          <h2>Review & Payment</h2>
        </div>

        <div class="table-responsive cart_info">
          <table class="table table-condensed">
            <thead>
            <tr class="cart_menu">
              <td class="image">Item</td>
              <td class="description"></td>
              <td class="price">Price</td>
              <td class="quantity">Quantity</td>
              <td class="total">Total</td>
              <td></td>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="item in cart.items"
                v-bind:key="item.product.id"
            >
              <td class="cart_product">
                <a href=""> <img :src="item.product.link" width="100px"  height="100px" alt=""></a>
              </td>
              <td class="cart_description">
                <h4><a href="">{{item.product.name}}</a></h4>
                <p>ID: {{item.product.id}}</p>
              </td>
              <td class="cart_price">
                <p>${{item.product.price}}</p>
              </td>
              <td>{{ item.quantity }}</td>
              <td>${{ getItemTotal(item).toFixed(2) }}</td>
            </tr>
            <tr>
              <td colspan="4">&nbsp;</td>
              <td colspan="2">
                <table class="table table-condensed total-result">
                  <tr>
                    <td>Cart Total Length</td>
                    <td>{{ cartTotalLength }}</td>
                  </tr>
                  <tr>
                    <td>Cart Sub Total</td>
                    <td>${{ cartTotalPrice.toFixed(2) }}</td>
                  </tr>
                  <tr class="shipping-cost">
                    <td>Shipping Cost</td>
                    <td>Free</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td><span>${{ cartTotalPrice.toFixed(2) }}</span></td>
                  </tr>
                </table>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="payment-options">
					<span>
						<label><input type="checkbox"> Direct Bank Transfer</label>
					</span>
          <span>
						<label><input type="checkbox"> Check Payment</label>
					</span>
          <span>
						<label><input type="checkbox"> Paypal</label>
					</span>
        </div>
        <div class="notification is-danger" v-if="listMessage.length">
          <ul>
            <li v-for="(error,index) in listMessage" :key="index" class="error">{{ error }}</li>
          </ul>
        </div>
      </div>
    </section> <!--/#cart_items-->
  </div>
</template>

<script>
import axios from 'axios'
import {mapMutations} from "vuex";
import validateEmail from "../../utils/checkValidation";

export default {
  name: 'Checkout',
  data() {
    return {
      cart: {
        items: []
      },
      DestinativeUser: {
        full_name: '',
        email: '',
        phone_number: '',
        address: '',
        message:''
      },
      listMessage:[]
    }
  },

  created() {
    this.cart = this.$store.state.cart
  },
  methods: {
    getItemTotal(item) {
      return item.quantity * item.product.price
    },
    checkValidLogin(){
      this.listMessage = []
      if (this.DestinativeUser.full_name === '') {
        this.listMessage.push('The first name field is missing!')
      } else if(this.DestinativeUser.full_name.length <6) {
        this.listMessage.push('username min is 6 character')
      }

      if( !this.DestinativeUser.email ) {
        this.listMessage.push('The email field is missing!')
      }else if(!validateEmail(this.DestinativeUser.email)){
        this.message.push('email is not valid')
      }

      if (this.DestinativeUser.phone_number === '') {
        this.listMessage.push('The phone field is missing!')
      }

      if (this.DestinativeUser.address === '') {
        this.listMessage.push('The address field is missing!')
      }else if(this.DestinativeUser.address.length <6) {
        this.listMessage.push('address min is 6 character')
      }
    },
    submitForm() {
      this.checkValidLogin()
      if (this.listMessage.length<=0) {
        this.$store.commit('setIsLoading', true)

        this.handle(this.DestinativeUser)
        this.$store.commit('setIsLoading', false)
        this.listMessage.push('Something went wrong with Stripe. Please try again')
      }
    },
    async handle(infoDestinativeUser) {
      const items = []
      for (let i = 0; i < this.cart.items.length; i++) {
        const item = this.cart.items[i]
        const obj = {
          id: item.product.id,
          number: item.quantity,
          // price: item.product.price * item.quantity
        }
        items.push(obj)
      }

      const data = {
        'full_name': infoDestinativeUser.full_name,
        'email': infoDestinativeUser.email,
        'address': infoDestinativeUser.address,
        'phone_number': infoDestinativeUser.phone_number,
        'message': infoDestinativeUser.message,
        'listProduct': items,
        'customer_id': Number(localStorage.getItem('id')),
        'employee_id': 4,
        'is_paid': 0
      }
      console.log(data)

      await axios
          .post('/invoices/', data)
          .then(response => {
            console.log(response)
            this.$store.commit('clearCart')
            // this.clearCart();
            location.reload()
            this.$router.push('/cart/success')
          })
          .catch(error => {
            this.listMessage.push('Something went wrong. Please try again')
            console.log(error)
          })

      this.$store.commit('setIsLoading', false)
    }
  },
  computed: {
    ...mapMutations(['clearCart']),
    cartTotalPrice() {
      return this.cart.items.reduce((acc, curVal) => {
        return acc += curVal.product.price * curVal.quantity
      }, 0)
    },
    cartTotalLength() {
      return this.cart.items.reduce((acc, curVal) => {
        return acc += curVal.quantity
      }, 0)
    }
  }
}
</script>
