
export type GoogleMapSection = {
  type: "ComponentSectionsGoogleMap";
  title?: string;
  src: string;
  name?:string;
  address?:string;
  receptionPhone?:string;
  admissionPhone?:string;
  schedule?:string;
  variant:"tour"|"map";
  detailPosition:"left"|"right"|"top";
};
  
export const GOOGLE_MAP = `
... on ComponentSectionsGoogleMap{
  title
  src
  name
  address
  receptionPhone
  admissionPhone
  schedule
  variant:type
  detailPosition
}
`;