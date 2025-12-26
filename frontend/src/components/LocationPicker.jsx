import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

function LocationPicker({ setLocation }) {
  function LocationMarker() {
    const [position, setPosition] = useState(null);

    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });

    return position ? <Marker position={position}></Marker> : null;
  }

  return (
    <MapContainer center={[20.30, 85.82]} zoom={13} style={{ height: "300px" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
}

export default LocationPicker;