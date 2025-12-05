import React, { useEffect } from "react";
import { cn } from "../../../utils/cn";
import {
  MapContainer as LeafletMap,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import type { LatLngExpression } from "leaflet";

interface MapContainerProps {
  className?: string;
}

// Default center (London)
const DEFAULT_POSITION: LatLngExpression = [51.505, -0.09];

// ✅ makes sure Leaflet recalculates size on mount
const EnsureMapSize: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    const id = window.setTimeout(() => {
      map.invalidateSize();
    }, 0);

    return () => window.clearTimeout(id);
  }, [map]);

  return null;
};

const MapContainer: React.FC<MapContainerProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "relative h-[100dvh] w-full overflow-hidden rounded-3xl",
        className
      )}
    >
      <LeafletMap
        center={DEFAULT_POSITION}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <EnsureMapSize />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={DEFAULT_POSITION}>
          <Popup>
            A pretty CSS3 popup.
            <br />
            Easily customizable.
          </Popup>
        </Marker>
      </LeafletMap>
    </div>
  );
};

export default MapContainer;
