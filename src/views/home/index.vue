<template>
  <div>
    <Header />
    <Slider />
    <Services />
    <ProductSlider :products="products" @openQuickview="showQuickview" @openCompare="showCoampre" @openCart="showCart" />
    <Banner />
    <SpecialProducts :products="products" :category="category" @openQuickview="showQuickview" @openCompare="showCoampre" @openCart="showCart" />
    <Blog />
    <Footer />
    <quickviewModel :openModal="showquickviewmodel" :productData="quickviewproduct" />
    <compareModel :openCompare="showcomparemodal" :productData="comapreproduct" @closeCompare="closeCompareModal" />
    <cartModalPopup :openCart="showcartmodal" @closeCart="closeCart" />
    <newsletterModel />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '../../components/header'
import Footer from '../../components/footer'
import quickviewModel from '../../components/widgets/quickview'
import compareModel from '../../components/widgets/compare-popup'
import cartModalPopup from '../../components/cart-model'
import newsletterModel from '../../components/widgets/newsletter-popup'
import Slider from '@/components/widgets/slider'
import Services from './components/services'
import ProductSlider from '@/components/widgets/product_slider'
import Banner from './components/banner'
import SpecialProducts from './components/special_products'
import Blog from './components/blog'

export default {
  components: {
    Header,
    Slider,
    Services,
    ProductSlider,
    Banner,
    SpecialProducts,
    Blog,
    Footer,
    quickviewModel,
    compareModel,
    cartModalPopup,
    newsletterModel
  },
  data() {
    return {
      products: [],
      category: [],
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
    })    
  },
  mounted() {
    this.productsArray()
  },
  methods: {
    productsArray: function () {
      this.productslist.map((item) => {
        if (item.type === 'vegetables') {
          this.products.push(item)
          item.collection.map((i) => {
            const index = this.category.indexOf(i)
            if (index === -1) this.category.push(i)
          })
        }
      })
    },
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
