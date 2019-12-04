<template>
  <div>
    <Header />
    <Breadcrumbs title="Comfirm Code" />
    <section class="register-page section-b-space">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <h3>{{title}}</h3>
            <div class="theme-card">
              <form class="theme-form" v-on:submit="checkForm" method="post">
                  <div v-if="errors.length">
                  <ul class="validation-error mb-3">
                    <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                  </ul>
                </div>   
                <div class="form-row">
                  <div class="col-md-6">
                    <label for="username">User Email</label>
                  <input
                    type="email"
                    class="form-control"
                    id="username"
                    v-model="username"
                    placeholder="User Email"
                    name="username"
                    required
                  />
                  </div>
                  <div class="col-md-6">
                    <label for="code">Code</label>
                    <input
                      type="number"
                      class="form-control"
                      id="code"
                      v-model="code"
                      placeholder="Enter your code"
                      name="code"
                      required
                    />
                  </div>
                  <input
                  type="submit"
                  class="btn btn-solid"
                  value="Confirm Code"
                >
               
                </div>
              </form>
               <!-- <button class="btn btn-solid" @click="resend">Resend Code</button> -->
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>
<script>
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import Breadcrumbs from '../../../components/widgets/breadcrumbs'
import {confirmSignUp, resendSignUp} from '@/utils/auth.js'
export default {
  components: {
    Header,
    Footer,
    Breadcrumbs
  },
  data() {
    return {
      title: 'Confirm code',
      errors: [],     
      username: null,
      code: 0
    }
  },
  methods: {
    checkForm:async function (e) {
      this.errors = [] 
  
      if (!this.username) {
        this.errors.push('Username required.')
      } else if (!this.validEmail(this.username)) {
        this.errors.push('Valid email required.')
      }
      if (!this.code) {
        this.errors.push('Code required.')
      } else if (!this.validcode(this.code)) {
        this.errors.push('Minimum 6 characters in Code.')
      }
     
      e.preventDefault()
      if (!this.errors.length) {
        try {
           var res= await confirmSignUp(this.username, this.code)
           if(res.err){
                this.errors.push(res.err.message)
           }
           }catch(err) {            
            this.errors.push(err.message)
        }
      }
    },
    resend() {
      resendSignUp(this.username); 
    },
    validEmail: function (email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    validcode: function (code) {
      const ps = /.{6,}/
      return ps.test(code)
    }
  }
}
</script>

