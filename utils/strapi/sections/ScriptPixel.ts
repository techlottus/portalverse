

export type PixelComponent = {
  name: string;
  script: string;
  pixel: Pixel
  enabled: boolean;
  triggerOnRouteChange: "gtagPageview" | "fbqPageview" | null
}
export type ScriptsPixels<PixelComponent> = {
  type: 'ComponentSectionsScriptPixel'
  ...PixelComponent
};
export type Pixel = {
  src?: string;
  element?:  'iframe' | 'img';
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