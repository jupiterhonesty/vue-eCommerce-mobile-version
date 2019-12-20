<template>
    <div class="container">
     <img
            :src='require("@/assets/images/ajax-loader.gif")'            
            class="img-fluid bg-img w-100"           
          />
    </div>
</template>
<script>
import * as api from '@/api'
import { mapGetters } from "vuex";


export default {
  computed: {
    ...mapGetters({
      globalError: "getGlobalError",
      appUserAuthed:'auth/appUserAuthed',
      getLoaded:'products/getLoaded'

    })  
  },
  data() {
    return {
      logintitle: "Login",
      registertitle: "New Customer",
      errors: [],
      user: null,
      password: null
    };
  },
  methods:{
   productsTypeChange:(productsData)=>{
      var keys = Object.keys(productsData)
      var products = []
      keys.forEach((key,index)=>{
        if(index===Number(key))
          products.push(productsData[key])
      })
      return products
    }    
  },
  async mounted() {
    
    var {query} = this.$route
    var {dispatch} = this.$store

    var appSetting = async (data)=>{
      dispatch('auth/setAppUserToken',data)
      var account = await api.getAccount({'authorization':data.data.appat});
      dispatch('auth/setAppUserData', account)
      if(!this.getLoaded) {
        var productsDat = await api.getProducts({'authorization':data.data.appat})
        var products = this.productsTypeChange(productsDat.data)
        dispatch('products/setProducts',products)
      }    
      var shoppingCart = await api.getShopingcart({'authorization':data.data.appat})
      dispatch('cart/setShoppingCart',shoppingCart)         
      this.$router.push({name:'shop'})
    }

    if (query.c) {

      api.getToken({t:query.t,c:query.c}).then(data=>{
      
         appSetting(data)

      })
    } else {
        this.$router.push({name:'appstore'});
       // for development   
        // var data = {
        //   data:{
        //     appat:"newnlp",
        //     longitude:"23234243",
        //     latitude:"32423423"           
        //   }         
        // }
        
        // if(!this.getLoaded) {
        //   var productsDat = await api.getProducts({'authorization':data.data.appat})
        //   var products = this.productsTypeChange(productsDat.data)
        //   dispatch('products/setProducts',products)
        // }    
        // var shoppingCart = await api.getShopingcart({'authorization':data.data.appat})
        // dispatch('cart/setShoppingCart',shoppingCart)    
        // this.$router.push({name:'shop'})

    }
  }
};
</script>
