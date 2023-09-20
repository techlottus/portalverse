

export type ScriptsPixels = {
  type: 'ComponentSectionsScriptPixel'
  name: string;
  script: string;
  pixel: Pixel
  enabled: boolean;
  triggerOnRouteChange: "gtagPageview" | "fbq.Pageview"
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