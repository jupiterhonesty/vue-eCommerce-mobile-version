<template>
  <div>
    <div id="cart_side" class="add_to_cart right" :class="{ openSide:openCart }">
      <a href="javascript:void(0)" class="overlay" @click="closeCart(openCart)"></a>
      <div class="cart-inner">
        <div class="cart_top">
          <h3>my cart</h3>
          <div class="close-cart">
            <a href="javascript:void(0)" @click="closeCart(openCart)">
              <i class="fa fa-times" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        <div class="cart_media" v-if="cart.length">
          <ul class="cart_product">
            <li v-for="(item,index) in cart" :key="index">
              <div class="media">
                <router-link :to="{ path: '/product/sidebar/'+getDetail(item.id).id}">
                  <img
                    :src='require("@/assets/images/loader.gif")'            
                    class="mr-3"           
                  />
                  <img
                    :src='getDetail(item.id).productPictureURL||require("@/assets/images/pro/1.jpg")'                   
                    class="mr-3 r-img"
                    :alt="item.desc"                   
                  />              
                </router-link>
                <div class="media-body">
                  <router-link :to="{ path: '/product/sidebar/'+getDetail(item.id).id}">
                    <h4>{{item.desc}}</h4>
                  </router-link>
                  <h4>
                    <span>{{item.qty}} x {{ item.single_price_show }} {{item.discount_qty_amount_show}} = {{item.discounted_qty_price_show}}</span>
                  </h4>
                </div>
              </div>
              <div class="close-circle">
                <a href="javascript:void(0)" @click='removeCartItem(item)'>
                  <i class="ti-trash" aria-hidden="true"></i>
                </a>
              </div>
            </li>
          </ul>
          <ul class="cart_total">
            <li>
              <div class="total">
                <h5>
                  subtotal :
                  <span>{{ cartTotal }}</span>
                </h5>
              </div>
            </li>
            <li>
              <div class="buttons">
                <router-link :to="{ path: '/page/account/cart'}" :class="'btn btn-solid btn-xs view-cart'">
                  view cart
                </router-link>
                <router-link :to="{ path: '/page/account/checkout'}" :class="'btn btn-solid btn-xs checkout'">
                  checkout
                </router-link>
              </div>
            </li>
          </ul>
        </div>
        <div class="col-sm-12 empty-cart-cls text-left" v-if="!cart.length">
              <h4 class="mt-3">
                <strong>Your Cart is Empty</strong>
              </h4>
              <router-link :to="{ path: '/collection/shop'}" class="btn btn-solid">continue shopping</router-link>
            </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  props: ['openCart'],
  computed: {
    ...mapState({
      currency: state => state.products.currency
    }),
    ...mapGetters({
      cart: 'cart/cartItems',
      cartTotal: 'cart/subTotalAmount',
      curr: 'products/changeCurrency',
      getDetail: 'products/getProductByProductId'
    })
  },
  methods: {
 
    closeCart(val) {
      val = false
      this.$emit('closeCart', val)
    },
    removeCartItem: function (product) {
      this.$store.dispatch('cart/removeCartItem', product)
    },
    updateCurrency: function (currency, currSymbol) {
      this.currencyChange = { curr: currency, symbol: currSymbol }
      this.$store.dispatch('products/changeCurrency', this.currencyChange)
    }
  }
}
</script>
