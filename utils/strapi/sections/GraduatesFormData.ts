export type GraduatesFormData = {
  type: "ComponentSectionsGraduatesForm";
  title: string;
  subtitle: string;
  goTopBanner: boolean;
};

export const GRADUATES_FORM = `
... on ComponentSectionsGraduatesForm {
  title
  subtitle
  goTopBanner
}
`;
