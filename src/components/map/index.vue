<template>
  <div class="w-100">
    <gmap-map :center="center" :zoom="15" class="gmap">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
    <br />
    <div class="form-group col-md-6 col-sm-6 col-xs-12">
      <div class="field-label">Your location</div>
      <gmap-autocomplete @place_changed="setPlace" type="text"></gmap-autocomplete>
      <!-- <button @click="addMarker">Add</button> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "GoogleMap",
  computed: {
    ...mapGetters({
      coordinates: "auth/getCoordinates"
    })
  },
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null
    };
  },

  mounted() {
    if (!this.coordinates.lat || !this.coordinates.lng) this.geolocate();
    else this.center = this.coordinates;
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
      var delivery_address_json_text = JSON.stringify(place.address_components);
      this.$store.dispatch("cart/setDeliveryAddressText", {
        delivery_address_text: delivery_address_json_text
      });
      this.addMarker();
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  }
};
</script>