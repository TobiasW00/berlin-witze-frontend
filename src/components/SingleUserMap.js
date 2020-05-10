
import _ from 'lodash';
import React from 'react';
import  { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const SingleUserMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyASSgTEVFjNXRP3ZFQp4qHRZBshME12RHI&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%`}} />,
    containerElement: <div style={{ height: `400px` , with: `100%`}} />,
    mapElement: <div style={{ height: `100%`, with: `100%`}} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}
      this.setState({
        bounds: null,
        center: {
          lat: this.props.lat, lng: this.props.lng
        },
        markers: this.props.markers,
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          this.props.valueUpdate(places[0].geometry.location);
          const bounds = new window.google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
          // refs.map.fitBounds(bounds);
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    defaultCenter={{ lat: 48.2861612, lng: 8.723185199999989 }}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}  >
    <Marker key={22} position={props.markers[0].position} />    
  </GoogleMap>
);

export default SingleUserMap;