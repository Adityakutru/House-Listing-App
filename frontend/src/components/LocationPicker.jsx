import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function ClickHandler({ setLocation, onAddressFound }) {
  useMapEvents({
    async click(e) {
  const { lat, lng } = e.latlng;

  setLocation({ lat, lng });

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await res.json();

    const address = data.address || {};

    const extractedAddress = {
      area:
        address.road ||
      address.neighborhood ||
      address.suburb ||
      address.village ||
      address.county ||
      "",
      city:
        address.city ||
        address.town ||
        address.county ||
        "",
      state: address.state || "",
    };

    if (onAddressFound) {
      onAddressFound(extractedAddress);
    }
  } catch (err) {
    console.error("Reverse geocoding failed", err);
  }
}
,
  });

  return null;
}

export default function LocationPicker({ setLocation, location, onAddressFound }) {
  return (
    <MapContainer
      center={[20.30, 85.82]}
      zoom={13}
      style={{ height: "300px", borderRadius: "10px" }}
      className="shadow"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ClickHandler
        setLocation={setLocation}
        onAddressFound={onAddressFound}
      />

      {location?.lat && location?.lng && (
        <Marker position={[location.lat, location.lng]} />
      )}
    </MapContainer>
  );
}
