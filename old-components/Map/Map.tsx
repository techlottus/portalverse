import { FC, memo, useEffect, useState } from "react"
import L from "leaflet"
import * as ReactLeaflet from "react-leaflet"
import cn from "classnames"
import "leaflet/dist/leaflet.css"

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png"
import iconUrl from "leaflet/dist/images/marker-icon.png"
import shadowUrl from "leaflet/dist/images/marker-shadow.png"
import MapComponentData from "@/types/Map.types"

const { MapContainer } = ReactLeaflet;

const Map: FC<MapComponentData> = memo(({ classNames, classNamesMap, coords, zoom = 15, scroll, children, zIndex = "1" }: MapComponentData) => {

  const [newCoords, setNewCoords] = useState(null);
  
  useEffect(() => {
    (async function init() {
      delete (L.Icon as any).Default.prototype["_getIconUrl"];
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: iconRetinaUrl.src,
        iconUrl: iconUrl.src,
        shadowUrl: shadowUrl.src,
      });
    })();
  }, []);

  useEffect(() => {
    if (!!coords) {
      setNewCoords(coords);
    }
  }, [coords]);
  
  return <section style={{"zIndex": zIndex}} className={cn(classNames)}>
    {
      !!newCoords
        ? <MapContainer center={newCoords} zoom={zoom} scrollWheelZoom={scroll} className={classNamesMap}>
            { children(ReactLeaflet) }
          </MapContainer>
        : null
    }
  </section>
});

export default Map