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
          <div class="col-md-12">
            <div class="success-text">
              <i class="fa fa-check-circle" aria-hidden="true"></i>
              <h2>thank you</h2>
              <p>{{message}}</p>
              <p>Transaction ID:{{order_id}}</p>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="text-center mt-3">
              <a :href="app_link" :class="'btn btn-solid'"> back to shop</a>
            </div>
          </div>
        </div>        
      </div>

    </section>
    <!-- Section ends -->
    <!-- order-detail section start -->
    <section class="section-b-space" v-if="order!=''">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <div class="product-order">
              <h3>your order details</h3>
              <div class="row product-order-detail" v-for="(item,index) in cartItems" :key="index">
                <div class="col-3">
                  <img :src="getDetail(item.id).productPictureURL" alt class="img-fluid" />
                </div>
                <div class="col-3 order_detail">
                  <div>
                    <h4>product name</h4>
                    <h5>{{item.desc}}</h5>
                  </div>
                </div>
                <div class="col-3 order_detail">
                  <div>
                    <h4>quantity</h4>
                    <h5>{{item.qty}}</h5>
                  </div>
                </div>
                <div class="col-3 order_detail">
                  <div>
                    <h4>price</h4>
                    <h5>{{ item.discounted_qty_price_show }}</h5>
                  </div>
                </div>
              </div>
              <div class="total-sec">
                <ul>
                  <li>
                    Total
                    <span>{{ cartTotal }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="row order-success-sec">
              <div class="col-sm-6">
                <h4>summery</h4>
                <ul class="order-detail">
                  <li>order ID: {{order_id}}</li>
                  <li>Order Total: {{ cartTotal }}</li>
                </ul>
              </div>
              <div class="col-sm-6">
                <h4>shipping address</h4>
                <ul class="order-detail">
                  <li>gerg harvell</li>
                  <li>568, suite ave.</li>
                  <li>Austrlia, 235153</li>
                  <li>Contact No. 987456321</li>
                </ul>
              </div>
              <div class="col-sm-12 payment-mode">
                <h4>payment method</h4>
                <p>Pay on Delivery (Cash/Card). Cash on delivery (COD) available. Card/Net banking acceptance subject to device availability.</p>
              </div>
              <div class="col-md-12">
                <div class="delivery-sec">
                  <h3>expected date of delivery</h3>
                  <h2>october 22, 2020</h2>
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
      message: state=>state.cart.message

    }),
    ...mapGetters({
      order: 'cart/ordered',
      cartTotal: 'cart/cartTotalAmount',
      curr: 'products/changeCurrency',
      cartItems: 'cart/cartItems',
      getDetail: 'products/getProductByProductId',

    })
  },
 
}
</script>
