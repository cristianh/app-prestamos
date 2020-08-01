<template>
  <MglMap
    accessToken="pk.eyJ1IjoiY3J1c3RvMjAwOSIsImEiOiJja2Q1amNleG8xN3F0MnFueDFwNjNhbDE0In0.RvmCZjE1RFMa_c3raY92Lg"
    :mapStyle.sync="mapStyle"
    :center="coordinates"
  >
    <MglPopup :coordinates="coordinates" anchor="top">
      <div>Hello, I'm popup!</div>
    </MglPopup>
  </MglMap>
</template>

<script>
import { MglMap, MglPopup } from "vue-mapbox";

export default {
  components: {
    MglMap,
    MglPopup
  },
  data() {
    return {
      mapStyle: "mapbox://styles/mapbox/streets-v11",
      coordinates: [-111.549668, 39.014]
    };
  }
};
</script>