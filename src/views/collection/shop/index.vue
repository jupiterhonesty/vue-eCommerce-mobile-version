<template>
  <div>
    <Header />
    <Slider />
    <div v-for="(products,index) in productslist" :key="index">
      <ProductSlider :products="products" @openQuickview="showQuickview" @openCompare="showCoampre" @openCart="showCart" />
    </div>
    <Footer />
    <quickviewModel :openModal="showquickviewmodel" :productData="quickviewproduct" />
    <compareModel :openCompare="showcomparemodal" :productData="comapreproduct" @closeCompare="closeCompareModal" />
    <cartModalPopup :openCart="showcartmodal" @closeCart="closeCart" />
    <!-- <newsletterModel /> -->
  </div>
</template>

<script>
import { mapState,mapGetters } from 'vuex'
import Header from '@/components/header'
import Footer from '@/components/footer'
import quickviewModel from '@/components/widgets/quickview'
import compareModel from '@/components/widgets/compare-popup'
import cartModalPopup from '@/components/cart-model'
// import newsletterModel from '@/components/widgets/newsletter-popup'
import Slider from '@/components/widgets/slider'
import ProductSlider from './components/product_slider'

export default {
  components: {
    Header,
    Slider,
    ProductSlider,
    Footer,
    quickviewModel,
    compareModel,
    cartModalPopup,
    // newsletterModel
  },
  data() {
    return {
      showquickviewmodel: false,
      showcomparemodal: false,
      showcartmodal: false,
      quickviewproduct: {},
      comapreproduct: {},
      cartproduct: {}
    }
  },
  computed: {
    ...mapState({
      productslist: state => state.products.productslist,      
    }),
    ...mapGetters({
      cartItems :'cart/cartItems'
    })    
  }, 
  methods: {

    showQuickview(item, productData) {
      this.showquickviewmodel = item
      this.quickviewproduct = productData
    },
    showCoampre(item, productData) {
      this.showcomparemodal = item
      this.comapreproduct = productData
    },
    closeCompareModal(item) {
      this.showcomparemodal = item
    },
    showCart(item) {
      this.showcartmodal = item
    },
    closeCart(item) {
      this.showcartmodal = item
    }
  }
}
</script>
