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
                    <div class="form-group col-md-6 col-sm-6 col-xs-12 mt-3">
                      <div class="field-label">Special instructions</div>
                      <input type="text" required v-model="special_instructions_message" name="field-name" placeholder="Enter Special instructions"/>
                    </div>           
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
                            <div class="col-4">{{item.discounted_qty_price_show}}</div>
                          </div>
                        </li>
                      </ul>                
                      <table class="sub-total" align="center" v-if="cart.length">
                        <tfoot>
                           <tr v-for="tax in webTotalLines" :key="tax.text" >
                              <td v-if="tax.type=='taxesfees'" v-b-modal.modal-check-detail>{{tax.text}}</td>
                              <td v-else>{{tax.text}}</td>
                              <td>
                                <div>{{tax.value_show}}</div>
                              </td>
                            </tr>
                        </tfoot>               
                      </table>   
                      <div class="title-box">
                        <div>     
                          Address                          
                          <span></span>
                        </div>
                      </div>
                      <ul class="qty"  v-if="delivery_address.length">
                         <li>
                          <div class="row">
                            <div class="col-12">{{ username }}</div>
                          </div>
                        </li>
                        
                        <li>
                          <div class="row">
                            <div class="col-12">{{ delivery_address[0].long_name }} {{delivery_address[1].long_name}}, {{delivery_address[2].long_name}}</div>
                          </div>
                        </li>
                        <li>
                          <div class="row">
                            <div class="col-12">
                              <div class="row pl-3">
                                <div v-if="delivery_address[3]">{{ delivery_address[3].long_name }},</div> <div v-if="delivery_address[4]">{{ delivery_address[4].long_name }},</div> <div v-if="delivery_address[5]">{{delivery_address[5].long_name}}</div> <div v-if="delivery_address[6]">{{delivery_address[6].long_name}}</div> <div v-if="delivery_address[7]">{{delivery_address[7].long_name}}</div></div>
                              </div>
                          </div>
                        </li>
                      </ul>        
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
                                  v-model.number="pt" 
                                  value="1"
                                  v-on:change="changePayment"                                                        
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
                                <input 
                                  type="radio" 
                                  name="payment-group" 
                                  id="payment-3" 
                                  v-model.number="pt" 
                                  value="2"                                  
                                  v-on:change="changePayment"       
                                />
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
      <b-modal id="modal-check-detail" size="md" centered hide-footer >
        <template v-slot:modal-title>{{webTotalTitle}}</template>
        <table align="center">
          <th>
            <tr>
              <td><strong>{{webTotalTitle}}</strong></td>                  
            </tr>
          </th>
          <tbody>
             <tr>
              <td><strong>Detail</strong></td>   
              <td><strong>Description</strong></td>   
              <td><strong>Price</strong></td>               
            </tr>
            <tr v-for="(fee,index) in webTotalDetails" :key="index">
              <td>{{fee.text}}</td>
              <td>{{fee.description}}</td>
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
      webTotalDetails: 'cart/webTotalDetails',
      webTotalLines:'cart/webTotalLines',
      paymenttype:'cart/paymenttype',
      webTotalTitle: 'cart/webTotalTitle',
      delivery_address: 'cart/getDeliveryAddress',
      username: 'auth/getUserName'
    })
  },
  mounted() {   
    this.pt=this.paymenttype
  },
  data() {
    return {
      special_instructions_message:'',
      pt:0,
      user: {        
        address: '',
        city: '',
        state: '',
        zipcode: ''
      },
      isLogin: false,    
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
    changePayment(val){
      this.$store.dispatch('cart/paymentSelect',{payment_type:+val.target.value})
      // this.pt=this.paymenttype
    },
    order() {
      this.$store.dispatch('cart/order',{
        special_instructions_message:this.special_instructions_message})      
    },  
    onCancelled() {
    }
  }
}
</script>
