<template>
  <div>
    <div class="icon-nav">
      <ul>
        <li class="onhover-div mobile-search">
          <div>
            <img
              alt
              :src='"@/assets/images/icon/layout4/search.png"'
              @click="openSearch()"
              class="img-fluid"
            >
            <i class="ti-search" @click="openSearch()"></i>
          </div>
          <div id="search-overlay" class="search-overlay" :class="{ opensearch:search }">
            <div>
              <span class="closebtn" @click="closeSearch()" title="Close Overlay">×</span>
              <div class="overlay-content">
                <div class="container">
                  <div class="row">
                    <div class="col-xl-12">
                      <form>
                        <div class="form-group mb-0">
                          <input
                            type="text"
                            class="form-control"
                            v-model="searchString"
                            @keyup="searchProduct"
                            placeholder="Search a Product"
                          >
                        </div>
                        <button type="submit" class="btn btn-primary">
                          <i class="fa fa-search"></i>
                        </button>
                      </form>
                      <ul class="search-results" v-if="searchItems.length">
                        <li v-for="(product,index) in searchItems" :key="index" class="product-box">
                          <div class="img-wrapper">
                            <img
                              :src='product.productPictureURL'
                              class="img-fluid bg-img"
                              :key="index"
                            />
                          </div>
                          <div class="product-detail">
                            <router-link :to="{ path: '/product/sidebar/'+product.id}">
                              <h6>{{ product.title }}</h6>
                            </router-link>
                            <h4>{{ product.price * curr.curr | currency(curr.symbol) }}</h4>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="onhover-div mobile-setting">
          <div>
            <img alt :src='"@/assets/images/icon/layout4/setting.png"' class="img-fluid">
            <i class="ti-settings"></i>
          </div>
          <div class="show-div setting">
            <h6>currency</h6>
            <ul class="list-inline">
              <li>
                <a href="javascript:void(0)" @click="updateCurrency('eur', '€')">eur</a>
              </li>
              <li>
                <a href="javascript:void(0)" @click="updateCurrency('inr', '₹')">inr</a>
              </li>
              <li>
                <a href="javascript:void(0)" @click="updateCurrency('gbp', '£')">gbp</a>
              </li>
              <li>
                <a href="javascript:void(0)" @click="updateCurrency('usd', '$')">usd</a>
              </li>
            </ul>
          </div>
        </li>
        <li class="onhover-div mobile-cart">
          <div>
            <img alt :src='"@/assets/images/icon/layout4/cart.png"' class="img-fluid">
            <i class="ti-shopping-cart"></i>
            <span class="cart_qty_cls">{{cart.length}}</span>
          </div>
          <ul class="show-div shopping-cart" v-if="!cart.length">
            <li>Your cart is currently empty.</li>
          </ul>
          <ul class="show-div shopping-cart" v-if="cart.length">
            <li v-for="(item,index) in cart" :key="index">
              <div class="media">
                <router-link :to="{ path: '/product/sidebar/'+getDetail(item.id).id}">
                   <img
                    :src='require("@/assets/images/loader.gif")'            
                    class="mr-3"           
                  />
                  <img
                    :src='getDetail(item.id)&&getDetail(item.id).productPictureURL||require("@/assets/images/pro/1.jpg")'                   
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
                    <!-- <span>{{item.qty}} x {{ item.priceInMinorUnits | currency }}</span> -->
                  </h4>
                </div>
              </div>
              <div class="close-circle">
                <a href="#" @click='removeCartItem(item)'>
                  <i class="fa fa-times" aria-hidden="true"></i>
                </a>
              </div>
            </li>
            <li>
              <div class="total">
                <h5>
                  subtotal :
                  <!-- <span>{{ cartTotal | currency }}</span> -->
                  <span>{{ subTotal }}</span>
                </h5>
              </div>
            </li>
            <li>
              <div class="buttons">
                <router-link :to="{ path: '/page/account/cart'}" :class="'view-cart'">
                  view cart
                </router-link>
                <router-link :to="{ path: '/page/account/checkout'}" :class="'checkout'">
                  checkout
                </router-link>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      currencyChange: {},
      search: false,
      searchString: ''
    }
  },
  computed: {
    ...mapState({
      searchItems: state => state.products.searchProduct
    }),
    ...mapGetters({
      cart: 'cart/cartItems',
      cartTotal: 'cart/cartTotalAmount',
      subTotal: 'cart/subTotalAmount',
      curr: 'products/changeCurrency',
      getDetail: 'products/getProductByProductId'
    }),
   
  },
  methods: {
    openSearch() {
      this.search = true
    },
    closeSearch() {
      this.search = false
    },
    searchProduct() {
      this.$store.dispatch('products/searchProduct', this.searchString)
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
