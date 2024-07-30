export type GraduatesFormData = {
  type: "ComponentSectionsGraduatesForm";
  title: string;
  subtitle: string;
  overFlowForm: boolean;
};

export const GRADUATES_FORM = `
... on ComponentSectionsGraduatesForm {
  title
  subtitle
  overFlowForm
}
`;
