<template>
  <div>
    <Header />
    <Breadcrumbs title="Checkout" />
    <section class="section-b-space">
      <div class="container">
        <div class="checkout-page">
          <div class="checkout-form">
            <form>
              <div class="row">
                <div class="col-lg-6 col-sm-12 col-xs-12">
                  <div class="checkout-title">
                    <h3>Address</h3>
                  </div>
                  <div class="row check-out">
                    <Map />                 
                  </div>
                </div>
                <div class="col-lg-6 col-sm-12 col-xs-12">
                  <div class="checkout-details">
                    <div class="order-box">
                      <div class="title-box">
                        <div>
                          Product     
                          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total</span>
                        </div>
                      </div>
                      <ul class="qty"  v-if="cart.length">
                        <li v-for="(item,index) in cart" :key="index">
                          <div class="row">
                            <div class="col-8"> {{ item.qty }} X {{ item.desc }}  </div>
                              <!-- <span>{{ (item.priceInMinorUnits * curr.curr) * item.qty | currency(curr.symbol) }}</span> -->
                            <div class="col-4">{{item.discounted_qty_price_show}}</div>
                          </div>
                        </li>
                      </ul>                
                      <table class="sub-total" align="center" v-if="cart.length">
                        <tfoot>
                          <tr>
                            <td>subtotal price</td>
                            <td>
                              <div>{{ cartSubTotal  }}</div>
                              <!-- <h2>{{ cartTotal * curr.curr | currency(curr.symbol) }}</h2> -->
                            </td>
                          </tr>
                          <tr>
                            <td>taxes & fees <a href="javascript:void(0)" class="btn " v-b-modal.modal-1>
                                    <i class="ti-info-alt"></i>
                                    </a>
                            </td>
                            <td>
                              <div>{{ cartTax  }}</div>
                              <!-- <h2>{{ cartTotal * curr.curr | currency(curr.symbol) }}</h2> -->
                            </td>
                          </tr>
                          <tr>
                            <td>delivery</td>
                            <td>
                              <div>{{ cartDeliver  }}</div>
                              <!-- <h2>{{ cartTotal * curr.curr | currency(curr.symbol) }}</h2> -->
                            </td>
                          </tr>
                          <tr>
                            <td>order total</td>
                            <td >
                              <h2 >{{ cartTotal  }}</h2>
                              <!-- <h2>{{ cartTotal * curr.curr | currency(curr.symbol) }}</h2> -->
                            </td>
                        </tr>        
                        </tfoot>               
                    </table>   
                    </div>
                    <div class="payment-box">
                      <div class="upper-box">
                        <div class="payment-options">
                          <ul>
                            <li>
                              <div class="radio-option">
                                <input
                                  type="radio"
                                  name="payment-group"
                                  id="payment-1"
                                  checked="checked"
                                  v-model="debit"
                                  :value="true"
                                />
                                <label for="payment-1">
                                  Debit Card
                                  <span
                                    class="small-text"
                                  >Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.</span>
                                </label>
                              </div>
                            </li>
                            <li>
                              <div class="radio-option paypal">
                                <input type="radio" :value="false" v-model="debit" name="payment-group" id="payment-3" />
                                <label for="payment-3">
                                  Cash                         
                                </label>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div class="text-right">                    
                          <router-link :to="{ path: '/page/order-success/'}">
                            <a @click="order()" v-if="cart.length" class="btn-solid btn">Place Order</a>
                          </router-link>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
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
// import NoSSR from 'vue-no-ssr'
import Map from '@/components/map'
export default {
  components: {
    Header,
    Footer,
    Breadcrumbs,
    // 'no-ssr':NoSSR,
    Map
  },
  computed: {
    ...mapGetters({
      cart: 'cart/cartItems',
      curr: 'products/changeCurrency',
      web_total_lines: 'cart/webTotalLines',
      cartSubTotal: 'cart/subTotalAmount',
      cartTotal: 'cart/cartTotalAmount',
      cartTax: 'cart/taxAmount',
      cartDeliver:'cart/deliverAmount',
      webTotalDetails: 'cart/webTotalDetails',
      isDebit:'cart/isDebit',
      ordered:'cart/ordered'
    })
  },
  data() {
    return {
      user: {        
        address: '',
        city: '',
        state: '',
        zipcode: ''
      },
      isLogin: false,    
      debit: true,
      environment: 'sandbox',
      button_style: {
        label: 'checkout',
        size: 'medium', // small | medium | large | responsive
        shape: 'pill', // pill | rect
        color: 'blue' // gold | blue | silver | black
      },
      amtchar: ''
    }
  },
  methods: {
    order() {
      // this.isLogin = localStorage.getItem('userlogin')
      this.$store.dispatch('cart/paymentSelectAndOder',{payment_type:this.debit?1:2,onPaymentComplete:this.onPaymentComplete})  
    },  
    onPaymentComplete: function (data) {
      // this.$store.dispatch('products/createOrder', {
      //   product: this.cart,
      //   userDetail: this.user,
      //   token: data.orderID,
      //   amt: this.cartTotal
      // })
      this.$router.push('/page/order-success')
    },
    onCancelled() {
    }
  }
}
</script>
