import { FC, memo } from "react";
import SearchIcon from "@/icons/search.svg";
import MarkerIcon from "@/icons/marker.svg";
import PhoneIcon from "@/icons/phone.svg";
import EmailIcon from "@/icons/email.svg";
import EyeIcon from "@/icons/eye.svg";
import PersonIcon from "@/icons/person.svg";
import HamburguerIcon from "@/icons/hamburguer.svg";
import CloseIcon from "@/icons/close.svg";
import TwitterIcon from "@/icons/twitter.svg";
import Agreement from "@/icons/agreement.svg";
import GraduateCap from "@/icons/graduatecap.svg";
import Trophy from "@/icons/trophy.svg";
import TriangleDown from "@/icons/triangledown.svg";
import FacebookIcon from "@/icons/Facebook.svg";
import InstagramIcon from "@/icons/Instagram.svg";
import TikTokIcon from "@/icons/TikTok.svg";
import YoutubeIcon from "@/icons/Youtube.svg";
import SortIcon from "@/icons/sort.svg";
import buscarTrabajo from "@/icons/buscarTrabajo.svg";
import conseguirEmpleo from "@/icons/conseguirEmpleo.svg";
import hacerContactos from "@/icons/hacerContactos.svg";
import mejorarCurriculum from "@/icons/mejorarCurriculum.svg";
import nuevasCompetencias from "@/icons/nuevasCompetencias.svg"
import graduate from "@/icons/graduate.svg";
import student from "@/icons/student.svg";
import trophy from "@/icons/trophy.svg";
import work from "@/icons/work.svg";
import Whatsapp from "@/icons/Whatsapp.svg";
import Aniversario55 from "@/icons/56_anos.svg";
import Egresados from "@/icons/egresados.svg";
import Internacionalizacion from "@/icons/internacionaizacion.svg";
import Udg from "@/icons/udg.svg";
import MailUteg from "@/icons/icono-mail.svg";
import Convenio from "@/icons/icono-convenio.svg";
import PersonaFirma from "@/icons/icono-persona-que-firma.svg";
import FirmaUteg from "@/icons/icono-firma.svg";
import DocumentoFirma from "@/icons/documento-firma-uteg.svg";
import ula47 from "@/icons/ula-admisiones-icono-47.svg";
import ulaAlumnos from "@/icons/ula-admisiones-icono-alumnos.svg";
import ulaConvenios from "@/icons/ula-admisiones-icono-convenios.svg";
import ulaEgresados from "@/icons/ula-admisiones-icono-egresados.svg";
import ulaBirrete from "@/icons/ula_birrete.svg";
import ulaCV from "@/icons/ula_cv.svg";
import ulaGrupo from "@/icons/ula_grupo.svg";
import ulaLupa from "@/icons/ula_lupa.svg";
import ulaPortafolio from "@/icons/ula_portafolio.svg";
import BecasPreferenciales from "@/icons/becas-preferenciales.svg";
import JobPlacement from "@/icons/job-placement.svg";
import SemilleroDeTalento from "@/icons/semillero-de-talento.svg";
import EducacionContinua from "@/icons/educacion-continua.svg";
import EventosInstitucionales from "@/icons/eventos-institucionales.svg";
import UtcAdmisionesEmpresas from "@/icons/utc-admisiones-empresas.svg";
import UtcAdmisionesEgresados from "@/icons/utc-admisiones-egresados.svg";
import UtcAdmisionesAlumnos from "@/icons/utc-admisiones-alumnos.svg";
import UtcAdmisiones25 from "@/icons/utc-admisiones-25-anios.svg";

const iconTypes: any = {
  search: SearchIcon,
  marker: MarkerIcon,
  phone: PhoneIcon,
  email: EmailIcon,
  eye: EyeIcon,
  person: PersonIcon,
  hamburguer: HamburguerIcon,
  close: CloseIcon,
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  tiktok: TikTokIcon,
  youtube: YoutubeIcon,
  instagram: InstagramIcon,
  agreement: Agreement,
  graduatecap: GraduateCap,
  trophy: Trophy,
  triangledown: TriangleDown,
  sort: SortIcon,
  buscarempleo: buscarTrabajo,
  conseguirempleto: conseguirEmpleo,
  mejorarcurriculim: mejorarCurriculum,
  hacercontactos: hacerContactos,
  nuevascompetencias: nuevasCompetencias,
  graduateIcon: graduate,
  studentIcon: student,
  workIcon: work,
  whatsapp: Whatsapp,
  aniversario55: Aniversario55,
  egresados: Egresados,
  internacionalizacion: Internacionalizacion,
  udg: Udg,
  mailuteg: MailUteg,
  convenio: Convenio,
  personafirma: PersonaFirma,
  firmauteg: FirmaUteg,
  documentofirma: DocumentoFirma,
  ULAAniversario47: ula47,
  ULAConvenios: ulaConvenios,
  ULAAlumnos: ulaAlumnos,
  ULAEgresados: ulaEgresados,
  ula_birrete: ulaBirrete,
  ula_cv: ulaCV,
  ula_grupo: ulaGrupo,
  ula_lupa: ulaLupa,
  ula_portafolio: ulaPortafolio,
  utc_becas_preferenciales: BecasPreferenciales,
  utc_job_placement: JobPlacement,
  utc_semillero_talento: SemilleroDeTalento,
  utc_educacion_continua: EducacionContinua,
  utc_eventos_institucionales: EventosInstitucionales,
  utc_admisiones_empresas: UtcAdmisionesEmpresas,
  utc_admisiones_egresados: UtcAdmisionesEgresados,
  utc_admisiones_alumnos: UtcAdmisionesAlumnos,
  utc_admisiones_25_años: UtcAdmisiones25
};

const IconComponent: FC<any> = memo(({ name, ...props }: any) => {
  const Icon = iconTypes[name]
  return <Icon {...props} />
});

export default IconComponent