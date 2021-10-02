<template>
  <tr>
    <td class="cart_product">
      <a href=""> <img :src="item.product.link" width="50"  height="100px" alt=""></a>
    </td>
    <td class="cart_description">
      <h4><a href="">{{item.product.name}}</a></h4>
      <p>ID: {{item.product.id}}</p>
    </td>
    <td class="cart_price">
      <p>{{item.product.price}}.00$</p>
    </td>
    <td class="cart_price">
      <p>{{item.product.name_size}}</p>
    </td>
    <td class="cart_price">
      <p>{{item.product.Name_Color}}</p>
    </td>
    <td class="cart_price">
      <p>{{item.product.Name_Gender}}</p>
    </td>
    <td class="cart_quantity">
      <div class="cart_quantity_button">
        <a class="cart_quantity_up" @click="incrementQuantity(item)"> + </a>
        <input class="cart_quantity_input" type="text" name="quantity" autocomplete="off" size="2" v-model="item.quantity">
        <a class="cart_quantity_down" @click="decrementQuantity(item)"> - </a>
      </div>
    </td>
    <td class="cart_total">
      <p class="cart_total_price">${{ getItemTotal(item).toFixed(2) }}</p>
    </td>
    <td class="cart_delete">
      <a class="cart_quantity_delete" @click="removeFromCart(item)"><i class="fa fa-times"></i></a>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    initialItem: Object
  },
  data() {
    return {
      item: this.initialItem
    }
  },
  created() {
    console.log(this.item)
  },
  methods: {
    getItemTotal(item) {
      return item.quantity * item.product.price
    },
    decrementQuantity(item) {
      item.quantity -= 1

      if (item.quantity === 0) {
        this.$emit('removeFromCart', item)
      }

      this.updateCart()
    },
    incrementQuantity(item) {
      item.quantity += 1

      this.updateCart()
    },
    updateCart() {
      localStorage.setItem('cart', JSON.stringify(this.$store.state.cart))
    },
    removeFromCart(item) {
      this.$emit('removeFromCart', item)
      this.updateCart()
    },
  },
}
</script>
