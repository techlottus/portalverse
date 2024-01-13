export type AtrProgramInfoSection = {
  type: "ComponentSectionsAtrProgramInfo";
  enabled: boolean;
};

export const ATR_PROGRAM_INFO = `
... on ComponentSectionsAtrProgramInfo {
  enabled
}
`;