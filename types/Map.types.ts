export type CoordsMap = {
  lat: string;
  lon: string;
}

type MapComponentData = {
  classNames?: string;
  coords: any;
  zoom?: number;
  scroll?: boolean;
  children: any;
  zIndex?: string;
  classNamesMap?: string;
}

export default MapComponentData