
export type ScriptsPixels  = {
  type?: 'ComponentSectionsScriptPixel'
  name: string;
  script?: string;
  src?: string | null;
  async?: boolean;
  pixel?: Pixel | null;
  enabled?: boolean;
  triggerOnRouteChange?: "gtagPageview" | "fbqPageview" | null;
  crossorigin?: boolean;
  integrity?: string | null;
  strategy: "afterInteractive" | "beforeInteractive" | "lazyOnload" | "worker";
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
  crossorigin
  integrity
  strategy
  pixel {
    src
    element
  }
  enabled
  triggerOnRouteChange
}
`;