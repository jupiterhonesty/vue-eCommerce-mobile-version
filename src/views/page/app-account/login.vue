<template>
  <div>
    <LogoTop />
    <section class="login-page section-b-space">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <h3>{{logintitle}}</h3>
            <div class="theme-card">
              <form class="theme-form" v-on:submit="checkForm" method="post">
                <div v-if="errors.length">
                  <ul class="validation-error mb-3">
                    <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                  </ul>
                </div>
                <div v-if="globalError">
                  <ul class="validation-error mb-3">
                    <li>{{ globalError }}</li>
                  </ul>
                </div>
                <div class="form-group">
                  <label for="user">User name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="user"
                    v-model="user"
                    placeholder="User name"
                    name="user"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    v-model="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <input type="submit" class="btn btn-solid" value="login" />
              </form>
            </div>
          </div>
          <div class="col-lg-6 right-login">
            <h3>{{registertitle}}</h3>
            <div class="theme-card authentication-right">
              <h6 class="title-font">Create A Account</h6>
              <p>Sign up for a free account at our store. Registration is quick and easy. It allows you to be able to order from our shop. To start shopping click register.</p>
              <a href="/page/account/register" class="btn btn-solid">Create an Account</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import LogoTop from '@/components/widgets/logotop';
import * as api from '@/api'
import { mapGetters } from "vuex";


export default {
  components: {
    LogoTop
  },
  computed: {
    ...mapGetters({
      globalError: "getGlobalError"
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
  methods: {
    productsTypeChange:(productsData)=>{
      var keys = Object.keys(productsData)
      var productSize = keys.length -2
      var products = []
      keys.forEach((key,index)=>{
        if(index===Number(key))
          products.push(productsData[key])
      })
      return products
    },
    checkForm: async function(e) {
      var {dispatch} = this.$store
      this.errors = [];
      if (!this.user) {
        this.errors.push("User name required.");
      }
      if (!this.password) {
        this.errors.push("Password required.");
      }
      e.preventDefault();
      if (!this.errors.length) {
        // gettoken
        var token = await api.getAppToken({user:this.user,password:this.password}) 

        api.getAccount({t:token.t,c:token.c}).then(data=>{
      
          dispatch('auth/setAppUser',{data})

        }).catch(async err=>{
          // for test   
          var data = {
            appat:"70544683401739030499",
            longitude:"23234243",
            latitude:"32423423",
            err
          }
          dispatch('auth/setAppUser',{data})
          api.getAccountNoCache({'authorization':data.appat}).then(data=>console.log('acount data',data)).catch(err=>console.log("account err",err))
          var productsDat = await api.getProducts({'authorization':data.appat});
          var products = this.productsTypeChange(productsDat.data)
          dispatch('products/setProducts',products)
          var shoppingcart = await api.getShopingcart();
          this.$router.push({name:'shop'})
        })




      }
    }
  }
};
</script>
