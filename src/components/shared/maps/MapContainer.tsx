import React from "react";
import { cn } from "../../../utils/cn";
import {
  MapContainer as LeafletMap,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import type { LatLngExpression } from "leaflet";

interface MapContainerProps {
  className?: string;
}

// Default center (London)
const DEFAULT_POSITION: LatLngExpression = [51.505, -0.09];

const MapContainer: React.FC<MapContainerProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "relative h-[480px] w-full overflow-hidden rounded-3xl md:h-[560px]",
        className
      )}
    >
      <LeafletMap
        center={DEFAULT_POSITION}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
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
