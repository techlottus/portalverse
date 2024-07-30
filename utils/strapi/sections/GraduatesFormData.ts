export type GraduatesFormData = {
  type: "ComponentSectionsGraduatesForm";
  title: string;
  subtitle: string;
  overflowForm: boolean;
};

export const GRADUATES_FORM = `
... on ComponentSectionsGraduatesForm {
  title
  subtitle
  overflowForm
}
`;
