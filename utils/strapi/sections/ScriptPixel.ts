

export type PixelComponent = {
  name: string;
  script?: string;
  pixel?: Pixel | null
  enabled?: boolean;
  triggerOnRouteChange?: "gtagPageview" | "fbqPageview" | null
}
export type ScriptsPixels  = {
  type: 'ComponentSectionsScriptPixel'
  name: string;
  script?: string;
  pixel?: Pixel | null;
  enabled?: boolean;
  triggerOnRouteChange?: "gtagPageview" | "fbqPageview" | null;
};
export type Pixel = {
  src?: string;
  element?:  'iframe' | 'img' | null;
}

export const SCRIPTS_PIXELS = `
...on ComponentSectionsScriptPixel {
  type: __typename
  name
  script
  pixel {
    src
    element
  }
  enabled
  triggerOnRouteChange
}
`;