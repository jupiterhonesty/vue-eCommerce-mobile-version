<template>
  <div>
  <Header />
  <Breadcrumbs title="Order Success" />
    <section class="p-0" v-if="order==''">
      <div class="container">
        <img
          :src='require("@/assets/images/ajax-loader.gif")'
          class="img-fluid bg-img w-100"
        />
      </div>
    </section>
    <!-- thank-you section start -->
    <section class="section-b-space light-layout" v-if="order!=''">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center pb-5">
<!--             <img :src='require("@/assets/images/delivery.png")' alt="deliver">-->
          </div>
          <div class="col-md-12">

            <div class="success-text">

              <i class="fa fa-check-circle" aria-hidden="true"></i>
              <h2>thank you</h2>
              <p>{{message}}</p>
              <p>Transaction ID: {{order_id}}</p>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="text-center mt-3">
              <a :href="app_link" :class="'btn btn-solid'"> back to app</a>
            </div>
          </div>
          <div class="col-md-12">
<!--             <img :src='require("@/assets/images/order-success.png")' alt="success" class="w-100 p-5">-->
          </div>
        </div>
      </div>

    </section>
    <!-- Section ends -->
    <section class="section-b-space" v-if="order!=''">
      <div class="container">
        <div class="checkout-page">
          <div class="checkout-form">
              <div class="row" v-for="order in last_order" v-bind:key="order.internal_order_id">
                <div class="col-lg-6 col-sm-12 col-xs-12"  >
                  <div class="checkout-details">
                    <div class="order-box">
                      <div class="title-box pb-0">
                        <div class="text-center">
                          ID : {{order.internal_order_id}}<br>
                          customer orderID : {{order.order_data.ordernumber}}<br>
                          <h6>{{order.order_date}}</h6><br>
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

                                <td v-if="tax_web_line.type=='taxesfees'"  v-b-modal="'modal-success-detail'+order.internal_order_id">
                                    {{tax_web_line.text}}
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


                 <b-modal :id="`modal-success-detail${order.internal_order_id}`" size="md" centered hide-footer >
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
                          <td><strong>description</strong></td>
                          <td><strong>Price</strong></td>
                         
                        </tr>
                        <tr v-for="tax_web_detail in order.order_data.web_total_details" v-bind:key="tax_web_detail.text">
                          <td>{{tax_web_detail.text}}</td>
                          <td>{{tax_web_detail.description}}</td>
                          <td>{{tax_web_detail.value_show}}</td>                          
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
                <div class="col-lg-6">
                  <div class="row order-success-sec">
                    <div class="col-sm-12">
                      <h4>shipping address</h4>
                      <ul class="order-detail">
                        <li class="overflow-hidden">{{order.delivery_address}}</li>
                        <!-- <li>568, suite ave.</li>
                        <li>Austrlia, 235153</li>
                        <li>Contact No. 987456321</li> -->
                      </ul>
                    </div>
                    <div class="col-sm-12 payment-mode">
                      <h4>payment method</h4>
                      <p>Pay on Delivery {{order.order_data.payment_type==1?"Debit":"Cash"}}.</p>
                    </div>
                    <div class="col-md-12">
                      <div class="delivery-sec">
                        <h3>Expected delivery time</h3>
                        <h2>{{order.order_data.web_delivery_estimate}}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section ends -->
    <Footer />
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Breadcrumbs from '@/components/widgets/breadcrumbs'
export default {
  components: {
    Header,
    Footer,
    Breadcrumbs
  },
  computed: {
    ...mapState({
      order_id: state=>state.cart.order_id,
      app_link: state=>state.cart.app_link,
      message: state=>state.cart.message,
      last_order: state=>state.cart.last_order

    }),
    ...mapGetters({
      order: 'cart/ordered',
      getDetail: 'products/getProductByProductId',
      webTotalTitle: 'cart/webTotalTitle'
    })
  },

}
</script>
