<script>
import { PIN_MARKER_ICON_CONFIG } from '@/constants/mapSettings'

export default {
  props: {
    google: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    },
    marker: {
      type: Object,
      required: true
    }
  },

  mounted () {
    const { Marker } = this.google.maps

    new Marker({ // eslint-disable-line no-new
      position: this.marker.position,
      marker: this.marker,
      map: this.map,
      icon: PIN_MARKER_ICON_CONFIG
    })
  },

  render () {
    return null
  }
}
</script>
