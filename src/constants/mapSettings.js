const POINT_MARKER_ICON_CONFIG = {
  path: 'M 0, 0 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0',
  strokeOpacity: 1,
  strokeWeight: 1,
  strokeColor: 'royalblue',
  fillColor: 'white',
  fillOpacity: 1,
  scale: 3
}

const PIN_MARKER_ICON_CONFIG = {
  path: 'M6,3A1,1 0 0,1 7,4V4.88C8.06,4.44 9.5,4 11,4C14,4 14,6 16,6C19,6 20,4 20,4V12C20,12 19,14 16,14C13,14 13,12 11,12C8,12 7,14 7,14V21H5V4A1,1 0 0,1 6,3Z',
  strokeOpacity: 1,
  strokeWeight: 1,
  strokeColor: 'white',
  fillColor: 'red',
  fillOpacity: 1,
  scale: 1,
  anchor: { x: 6, y: 24 }
}

const LINE_PATH_CONFIG = {
  clickable: false,
  geodesic: false,
  strokeOpacity: 1,
  strokeColor: 'royalblue'
}

const mapSettings = {
  clickableIcons: false,
  streetViewControl: false,
  panControlOptions: false,
  gestureHandling: 'cooperative',
  mapTypeControl: false,
  rotateControl: false,
  fullscreenControl: false,
  mapTypeId: 'satellite',
  zoomControlOptions: {
    style: 'SMALL'
  },
  tilt: 0,
  zoom: 17,
  minZoom: 10,
  maxZoom: 20
}

export { mapSettings, LINE_PATH_CONFIG, POINT_MARKER_ICON_CONFIG, PIN_MARKER_ICON_CONFIG }
