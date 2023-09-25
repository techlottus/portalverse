const businessUnit = process.env.NEXT_PUBLIC_BUSINESS_UNIT!;

const GRADUATES_FORM_COPIES = {
  UANE: {
    message: '<span class="font-normal">Si has olvidado tu matrícula te pedimos solicitarla con tu comprobante de estudios en el correo: <a href="mailto:egresados@uane.edu.mx" class="font-texts font-bold">egresados@uane.edu.mx</a></span>',
    enrollmentIdNotFoundMessage: '<span class="font-normal">Asegúrate de haber ingresado correctamente los datos. En caso de que no recuerdes tu matrícula o que no puedas acceder ponte en contacto con nosotros en el correo: <a href="mailto:egresados@uane.edu.mx" className="font-texts font-bold">egresados@uane.edu.mx</a></span>'
  },
  UTEG: {
    message: '<span class="font-normal">¿No recuerdas tu matrícula? Solicítala con tu comprobante de estudios en los correos: <a class="font-texts font-bold" href="mailto:egresados@uteg.edu.mx">egresados@uteg.edu.mx</a> y <a class="font-texts font-bold" href="mailto:comunidad.de.egresados@uteg.edu.mx">comunidad.de.egresados@uteg.edu.mx</a></span>',
    enrollmentIdNotFoundMessage: '<span class="font-normal">Asegúrate de haber ingresado correctamente los datos. En caso de que no recuerdes tu matrícula o que no puedas acceder ponte en contacto con nosotros en los correos: <a class="font-texts font-bold" href="mailto:egresados@uteg.edu.mx">egresados@uteg.edu.mx</a> y <a class="font-texts font-bold" href="mailto:comunidad.de.egresados@uteg.edu.mx">comunidad.de.egresados@uteg.edu.mx</a></span>'
  },
};

//@ts-ignore
export default GRADUATES_FORM_COPIES[businessUnit];