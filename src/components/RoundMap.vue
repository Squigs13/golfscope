<template>
  <GoogleMapLoader
    :mapConfig="mapConfig"
    :apiKey="mapsapiKey"
  >
    <template slot-scope="{ google, map }">
      <GoogleMapMarker
        v-for="marker in shots"
        :key="marker.id"
        :marker="marker"
        :google="google"
        :map="map"
      />
      <GoogleMapLine
        v-for="line in lines"
        :key="line.id"
        :path.sync="line.path"
        :google="google"
        :map="map"
      />
      <GoogleMapPinMarker
        :marker="pin"
        :google="google"
        :map="map"
      />
    </template>
  </GoogleMapLoader>
</template>

<script>
import GoogleMapLoader from './GoogleMapLoader'
import GoogleMapLine from './GoogleMapLine'
import GoogleMapMarker from './GoogleMapMarker'
import GoogleMapPinMarker from './GoogleMapPinMarker'
import { mapSettings } from '@/constants/mapSettings'

export default {
  components: {
    GoogleMapLoader,
    GoogleMapLine,
    GoogleMapMarker,
    GoogleMapPinMarker
  },
  props: {
    holeData: Object
  },
  data () {
    return {
      mapsapiKey: process.env.VUE_APP_MAPS_API_KEY
    }
  },
  computed: {
    mapConfig () {
      return {
        ...mapSettings,
        center: this.holeCenter
      }
    },
    shots () {
      var holeShots = []
      let count = 1
      let coords = {}
      this.holeData.shots.forEach(element => {
        coords = {
          id: count,
          position: { lat: element.startLat, lng: element.startLng }
        }
        holeShots.push(coords)
        count++
      })

      return holeShots
    },
    lines () {
      var holeShots = []
      let count = 1
      let coords = {}
      this.holeData.shots.forEach(element => {
        coords = {
          id: 'a' + count,
          path: [{ lat: element.startLat, lng: element.startLng }, { lat: element.endLat, lng: element.endLng }]
        }
        holeShots.push(coords)
        count++
      })

      return holeShots
    },
    holeCenter () {
      var tee = { lat: this.holeData.shots[0].startLat, lng: this.holeData.shots[0].startLng }
      var pin = { lat: this.holeData.pin.lat, lng: this.holeData.pin.lng }

      return { lat: ((tee.lat + pin.lat) / 2), lng: ((tee.lng + pin.lng) / 2) }
    },
    pin () {
      return { position: { lat: this.holeData.pin.lat, lng: this.holeData.pin.lng } }
    }
  }
}
</script>
