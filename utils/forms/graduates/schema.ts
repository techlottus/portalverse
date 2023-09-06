import * as yup from "yup";

export const FormSchema = yup.object().shape({
  enrollmentId: yup.string().required("Campo requerido"),
  email: yup
    .string()
    .required("Campo requerido")
    .email("Ingresa una dirección de correo válida"),
  phone: yup.string().required("Campo requerido"),
  isWorking: yup.boolean(),
  company: yup.string(),
});

export type FormValues = {
  enrollmentId: string;
  email: string;
  phone: string;
  isWorking: boolean | undefined;
  company: string | undefined;
};