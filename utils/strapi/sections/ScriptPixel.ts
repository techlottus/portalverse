
export type ScriptsPixels  = {
  type?: 'ComponentSectionsScriptPixel'
  name: string;
  script?: string;
  src?: string;
  async: boolean;
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
  src
  async
  pixel {
    src
    element
  }
  enabled
  triggerOnRouteChange
}
`;