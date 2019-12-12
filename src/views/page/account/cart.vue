<template>
  <div>
    <Header />
    <Breadcrumbs title="Chart" />
    <section class="cart-section section-b-space">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <table class="table cart-table table-responsive-xs" v-if="cart.length">
              <thead>
                <tr class="table-head">
                  <th scope="col">image</th>
                  <th scope="col">product name</th>
                  <th scope="col">price</th>
                  <th scope="col">quantity</th>
                  <th scope="col">action</th>
                  <th scope="col">total</th>
                </tr>
              </thead>
              <tbody v-for="(item,index) in cart" :key="index">
                <tr>
                  <td>
                    <router-link :to="{ path: '/product/sidebar/'+getDetail(item.id).id}">
                   
                      <img
                        :src='require("@/assets/images/loader.gif")'       
                          class="mr-3 rr-img"  
                      />
                      <img
                        :src='getDetail(item.id)&&getDetail(item.id).productPictureURL||require("@/assets/images/pro/1.jpg")'                   
                        class="mr-3 rr-img"
                        :alt="item.desc"                   
                      />        
                    </router-link>
                  </td>
                  <td>
                    <router-link :to="{ path: '/product/sidebar/'+getDetail(item.id).id}">{{item.desc}}</router-link>
                    <div class="mobile-cart-content row">
                      <div class="col-xs-3">
                        <div class="qty-box">
                          <div class="input-group">
                            <span class="input-group-prepend">
                              <button
                                type="button"
                                class="btn quantity-left-minus"
                                data-type="minus"
                                data-field
                                @click="decrement(item)"
                              >
                                <i class="ti-angle-left"></i>
                              </button>
                            </span>
                            <input
                              type="text"
                              name="quantity"
                              class="form-control input-number"
                              v-model="item.qty"
                            />
                            <span class="input-group-prepend">
                              <button
                                type="button"
                                class="btn quantity-right-plus"
                                data-type="plus"
                                data-field
                                @click="increment(item)"
                              >
                                <i class="ti-angle-right"></i>
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="col-xs-3">
                        <h2 class="td-color">{{item.qty}} x {{ item.single_price_show }} {{item.discount_qty_amount_show}} = {{item.discounted_qty_price_show}}</h2>
                      </div>
                      <div class="col-xs-3">
                        <h2 class="td-color">
                          <a href="#" class="icon">
                            <i class="ti-trash"></i>
                          </a>
                        </h2>
                      </div>
                    </div>
                  </td>
                  <td>
                    <h2>{{item.qty}} x {{ item.single_price_show }} {{item.discount_qty_amount_show}} = {{item.discounted_qty_price_show}}</h2>
                  </td>
                  <td>
                    <div class="qty-box">
                      <div class="input-group">
                        <span class="input-group-prepend">
                          <button
                            type="button"
                            class="btn quantity-left-minus"
                            data-type="minus"
                            data-field
                            @click="decrement(item)"
                          >
                            <i class="ti-angle-left"></i>
                          </button>
                        </span>
                        <input
                          type="text"
                          name="quantity"
                          class="form-control input-number"
                          v-model="item.qty"
                        />
                        <span class="input-group-prepend">
                          <button
                            type="button"
                            class="btn quantity-right-plus"
                            data-type="plus"
                            data-field
                            @click="increment(item)"
                          >
                            <i class="ti-angle-right"></i>
                          </button>
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <a class="icon" @click="removeCartItem(item)">
                      <i class="ti-trash"></i>
                    </a>
                  </td>
                  <td>
                    <h2
                      class="td-color"
                    >{{ item.discounted_qty_price_show }}</h2>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="table cart-table table-responsive-md" v-if="cart.length">
              <tfoot>
                <tr>
                  <td>subtotal price :</td>
                  <td>
                    <div>{{ cartSubTotal  }}</div>
                    <!-- <h2>{{ cartTotal * curr.curr | currency(curr.symbol) }}</h2> -->
                  </td>
                </tr>
                <tr>
                  <td>taxes & fees <a href="javascript:void(0)" class="btn " v-b-modal.modal-1>
                           <i class="ti-info-alt"></i>
                          </a>:
                  </td>
                  <td>
                    <div>{{ cartTax  }}</div>
                    <!-- <h2>{{ cartTotal * curr.curr | currency(curr.symbol) }}</h2> -->
                  </td>
                </tr>
                <tr>
                  <td>delivery :</td>
                  <td>
                    <div>{{ cartDeliver  }}</div>
                    <!-- <h2>{{ cartTotal * curr.curr | currency(curr.symbol) }}</h2> -->
                  </td>
                </tr>
                <tr>
                  <td>order total :</td>
                  <td >
                    <h2 >{{ cartTotal  }}</h2>
                    <!-- <h2>{{ cartTotal * curr.curr | currency(curr.symbol) }}</h2> -->
                  </td>
              </tr>        
              </tfoot>               
            </table>          
            <div class="col-sm-12 empty-cart-cls text-center" v-if="!cart.length">
              <img :src='"@/assets/images/icon-empty-cart.png"' class="img-fluid" alt="empty cart" />
              <h3 class="mt-3">
                <strong>Your Cart is Empty</strong>
              </h3>
              <h4 class="mb-3">Add something to make me happy :)</h4>
              <div class="col-12">
                <router-link :to="{ path: '/collection/shop'}" class="btn btn-solid">go shopping</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="row cart-buttons" v-if="cart.length">
          <div class="col-6">
            <router-link :to="{ path: '/collection/shop'}" :class="'btn btn-solid'">go shopping</router-link>
          </div>
          <div class="col-6">
            <router-link :to="{ path: '/page/account/checkout'}" :class="'btn btn-solid'">check out</router-link>
          </div>
        </div>
      </div>
      <b-modal id="modal-1" size="md" centered hide-footer >
        <template v-slot:modal-title>Taxes & Fees Detail</template>
        <table align="center">
          <th>
            <tr>
              <td><strong>Taxes and Fees Detail</strong></td>                  
            </tr>
          </th>
          <tbody>
             <tr>
              <td><strong>Detail</strong></td>   
              <td><strong>Price</strong></td>               
            </tr>
          <tr v-for="(fee,index) in webTotalDetails" :key="index">
            <td>{{fee.text}}</td>
            <td>{{fee.value_show}}</td>
          </tr>
          </tbody>
        </table>
      </b-modal>
    </section>
    <Footer />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Breadcrumbs from '@/components/widgets/breadcrumbs'
export default {
  data() {
    return {
      counter: 1
    }
  },
  components: {
    Header,
    Footer,
    Breadcrumbs
  },
  computed: {
    ...mapGetters({
      cart: 'cart/cartItems',
      cartSubTotal: 'cart/subTotalAmount',
      cartTotal: 'cart/cartTotalAmount',
      cartTax: 'cart/taxAmount',
      cartDeliver:'cart/deliverAmount',
      curr: 'products/changeCurrency',
      getDetail: 'products/getProductByProductId',
      webTotalDetails: 'cart/webTotalDetails'
    })
  },
  methods: {
    removeCartItem: function (product) {
      this.$store.dispatch('cart/removeCartItem', product)
    },
    increment(product, qty = 1) {
      // if(this.counter>=product.quantity) return
      this.counter++
      this.$store.dispatch('cart/updateCartQuantity', {
        product: product,
        qty: qty
      })
    },
    decrement(product, qty = -1) {
      if(this.counter<2) return
      this.counter--
      this.$store.dispatch('cart/updateCartQuantity', {
        product: product,
        qty: qty
      })
    }
  }
}
</script>
