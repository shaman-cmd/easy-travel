import React from 'react';
import './App.css';

import UIComponent from './components/UIComponent';

class App extends React.Component {
  mapRef = React.createRef();

  state = {
    map: null,
    platform: null
  };

  componentDidMount() {
    const H = window.H;
    const platform = new H.service.Platform({
      apikey: "2Oqh4QLTO1IjrSNM6NoWt2oiGhfxWG86_IZr_aTkaH4"
    });

    const defaultLayers = platform.createDefaultLayers();

    // Create an instance of the map
    const map = new H.Map(
      this.mapRef.current,
      defaultLayers.vector.normal.map,
      {
        // This map is centered over Europe
        center: { lat: 12.2958, lng: 76.6394 },
        zoom: 13.5,
        pixelRatio: window.devicePixelRatio || 1
      }
    );

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    const ui = H.ui.UI.createDefault(map, defaultLayers);

    this.setState({ map, platform });
  }

  componentWillUnmount() {
    this.state.map.dispose();
  }

  render() {
    return (
      <div className="App">
        <div ref={this.mapRef} style={{ height: "100vh", width: "100vw" }} />
        <UIComponent />
      </div>
    );

  }
}

export default App;
