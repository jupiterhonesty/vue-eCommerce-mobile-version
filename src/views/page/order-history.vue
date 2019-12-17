<template>
  <div>
    <Header />
    <Breadcrumbs title="Order history" />
     <section class="p-0" v-if="!order_history">
      <div class="container">
        <img
          :src='require("@/assets/images/ajax-loader.gif")'            
          class="img-fluid bg-img w-100"           
        />
      </div>
    </section>
    <section class="section-b-space">
      <div class="container">
        <div class="checkout-page">
          <div class="checkout-form">
              <div class="row">
                <div class="col-lg-6 col-sm-12 col-xs-12"  v-for="order in order_history" v-bind:key="order.internal_order_id">
                  <div class="checkout-details">
                    <div class="order-box">
                      <div class="title-box pb-0">
                        <div class="text-center">
                          ID : {{order.internal_order_id}}<br>
                          customer orderID : {{order.order_data.ordernumber}}<br>
                          <h6>{{order.order_date}} ~ {{order.delivery_date}} </h6><br>
                        </div>
                      </div>

                      <ul class="qty"  v-if="order.order_data.items.length">  
                        <li v-for="(item,index) in order.order_data.items" :key="index">
                          <div class="row">
                            <!-- <div class="col-3">
                               <router-link :to="{ path: '/product/sidebar/'+getDetail(item.id).id}">
                              
                                <img
                                  :src='require("@/assets/images/loader.gif")'       
                                    class="mr-3 rrr-img w-100"  
                                />
                                <img
                                  :src='getDetail(item.id).productPictureURL||require("@/assets/images/pro/1.jpg")'                   
                                  class="mr-3 rrr-img w-100"
                                  :alt="item.desc"                   
                                />        
                              </router-link>
                            </div> -->
                            <div class="col-12 pl-5">
                              <div class="row">
                                <div class="col-12">{{ item.desc }} </div>
                                <div class="col-12">coupon-code: {{item.discount_code}}</div>
                                <div class="col-12">{{item.qty}} X {{ item.single_price_show }} {{item.discount_qty_amount_show}} = {{item.discounted_qty_price_show}}</div>                    
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>  

                      <table class="sub-total" align="center" v-if="order.order_data.items.length">
                          <tfoot>              
                            <tr v-for="tax_web_line in order.order_data.web_total_lines" v-bind:key="tax_web_line.text">
                              
                                <td v-if="tax_web_line.type=='taxesfees'">taxes & fees <a href="javascript:void(0)" class="btn " v-b-modal="'modal-history-detail'+order.internal_order_id">
                                  <i class="ti-info-alt"></i>
                                  </a>
                                </td>
                                <td v-else>{{tax_web_line.text}}</td>
                                <td>
                                  <div>{{ tax_web_line.value_show  }}</div>
                                </td>                   
                            </tr>   
                                    
                        </tfoot>           
                                    
                      </table>     

                    </div>
                  </div>


                 <b-modal :id="`modal-history-detail${order.internal_order_id}`" size="md" centered hide-footer >
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
                          <td><strong>description</strong></td>     
                        </tr>
                        <tr v-for="tax_web_detail in order.order_data.web_total_details" v-bind:key="tax_web_detail.text">
                          <td>{{tax_web_detail.text}}</td>
                          <td>{{tax_web_detail.value_show}}</td>
                          <td>{{tax_web_detail.description}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </b-modal>
                  <div class="col-sm-12 empty-cart-cls text-center" v-if="!order.order_data.items.length">
                    <img :src='"@/assets/images/icon-empty-cart.png"' class="img-fluid" alt="empty cart" />
                    <h3 class="mt-3">
                      <strong>Your history is Empty</strong>
                    </h3>
                    <h4 class="mb-3">Add something to make me happy :)</h4>
                    <div class="col-12">
                      <router-link :to="{ path: '/collection/shop'}" class="btn btn-solid">go shopping</router-link>
                    </div>
                  </div>

                </div>
              </div>   
          </div>
        </div>
      </div>
    </section>
      
        
     
   
    <Footer />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Breadcrumbs from '@/components/widgets/breadcrumbs'
import * as api from '@/api'

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
       order_history:'cart/order_history',
       getDetail: 'products/getProductByProductId',
       getAuth: 'auth/getAppUserToken'
    })
  },
  async mounted() {
     var  {dispatch} = this.$store
     var orderhistory = await api.orderHistory({'authorization':this.getAuth})
     dispatch('cart/setOrderhistory', orderhistory)
  }

}
</script>
