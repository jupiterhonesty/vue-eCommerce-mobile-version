<template>
  <div>
    <footer class="footer-light">
      <div class="light-layout">
        <div class="container">
<!--          <section class="small-section border-section border-top-0">-->
<!--            <div class="row">-->
<!--              <div class="col-lg-6">-->
<!--                <div class="subscribe">-->
<!--                  <div>-->
<!--                    <h4>KNOW IT ALL FIRST!</h4>-->
<!--                    <p>Sign Up To Our Newsletter.</p>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="col-lg-6">-->
<!--                <form-->
<!--                  class="form-inline subscribe-form auth-form needs-validation"-->
<!--                  method="post"-->
<!--                  id="mc-embedded-subscribe-form"-->
<!--                  name="mc-embedded-subscribe-form"-->
<!--                  target="_blank"-->
<!--                >-->
<!--                  <div class="form-group mx-sm-3">-->
<!--                    <input-->
<!--                      type="text"-->
<!--                      class="form-control"-->
<!--                      name="EMAIL"-->
<!--                      id="mce-EMAIL"-->
<!--                      placeholder="Enter your email"-->
<!--                      required="required"-->
<!--                    />-->
<!--                  </div>-->
<!--                  <button type="submit" class="btn btn-solid" id="mc-submit">subscribe</button>-->
<!--                </form>-->
<!--              </div>-->
<!--            </div>-->
<!--          </section>-->
        </div>
      </div>
      <section class="section-b-space light-layout">
        <div class="container">
          <div class="row footer-theme partition-f">
            <div class="col-lg-4 col-md-6">
              <div class="footer-title footer-mobile-title">
                <h4>about</h4>
              </div>
              <div class="footer-contant">
                <div class="footer-logo">
                  <img :src='"@/assets/images/icon/logo.png"' alt="logo" />
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p>
                <div class="footer-social">
                  <ul>
                    <li>
                      <a href="#">
                        <i class="fa fa-facebook" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-google-plus" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-twitter" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-instagram" aria-hidden="true"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- <div class="col">
              <div class="sub-title">
                <div class="footer-title">
                  <h4>why we choose</h4>
                </div>
                <div class="footer-contant">
                  <ul>
                    <li>
                      <a href="#">contacts</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div> -->
            <div class="col">
              <div class="sub-title">
                <div class="footer-title">
                  <h4>Contact information</h4>
                </div>
                <div class="footer-contant">
                  <ul class="contact-list">
                    <li>
                      <i class="fa fa-map-marker"></i>The Plant Delivery, Woodland Hills, CA
                    </li>
                    <li>
                      <i class="fa fa-phone"></i>Phone: 818-555-5555
                    </li>
                    <li>
                      <i class="fa fa-envelope-o"></i>Email:
                      <a href="#">contact@ThePlantDelivery.com</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="sub-footer">
        <div class="container">
          <div class="row">
            <div class="col-xl-6 col-md-6 col-sm-12">
              <div class="footer-end">
                <p>
                  <i class="fa fa-copyright" aria-hidden="true"></i> 2019 - 2020 The Plant Delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  <TapTop/>
  </div>
</template>

<script>
import TapTop from '../widgets/tap-to-top'
export default {
  components: {
    TapTop
  }
}
</script>
