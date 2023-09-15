

export type ScriptsPixels = {
  type: 'ComponentSectionsScriptPixel'
  name: string;
  script: string;
  pixel: Pixel
};
export type Pixel = {
  type?: 'ComponentSectionsPixel'
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
}
`;