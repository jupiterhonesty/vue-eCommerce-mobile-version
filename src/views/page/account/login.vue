<template>
  <div>
    <Header />
    <Breadcrumbs title="Login" />
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
    <Footer />
  </div>
</template>
<script>
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import Breadcrumbs from "../../../components/widgets/breadcrumbs";
import { signIn } from "@/utils/auth.js";
import { mapGetters } from "vuex";
export default {
  components: {
    Header,
    Footer,
    Breadcrumbs
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
    checkForm: async function(e) {
      this.errors = [];
      if (!this.user) {
        this.errors.push("User name required.");
      }
      if (!this.password) {
        this.errors.push("Password required.");
      }
      e.preventDefault();
      if (!this.errors.length) {
        signIn(this.user, this.password, this.$store);
      }
    }
  }
};
</script>
