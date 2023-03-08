import { FC, memo } from "react"
import SearchIcon from "@/icons/search.svg"
import MarkerIcon from "@/icons/marker.svg"
import PhoneIcon from "@/icons/phone.svg"
import EmailIcon from "@/icons/email.svg"
import EyeIcon from "@/icons/eye.svg"
import PersonIcon from "@/icons/person.svg"
import HamburguerIcon from "@/icons/hamburguer.svg"
import CloseIcon from "@/icons/close.svg"
import TwitterIcon from "@/icons/twitter.svg"
import Agreement from "@/icons/agreement.svg"
import GraduateCap from "@/icons/graduatecap.svg"
import Trophy from "@/icons/trophy.svg"
import TriangleDown from "@/icons/triangledown.svg"
import FacebookIcon from "@/icons/Facebook.svg"
import InstagramIcon from "@/icons/Instagram.svg"
import TikTokIcon from "@/icons/TikTok.svg"
import YoutubeIcon from "@/icons/Youtube.svg"
import SortIcon from "@/icons/sort.svg"
import buscarTrabajo from "@/icons/buscarTrabajo.svg"
import conseguirEmpleo from "@/icons/conseguirEmpleo.svg"
import hacerContactos from "@/icons/hacerContactos.svg"
import mejorarCurriculum from "@/icons/mejorarCurriculum.svg"
import nuevasCompetencias from "@/icons/nuevasCompetencias.svg"
import graduate from "@/icons/graduate.svg"
import student from "@/icons/student.svg"
import trophy from "@/icons/trophy.svg"
import work from "@/icons/work.svg"
import Whatsapp from "@/icons/Whatsapp.svg"

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
  whatsapp: Whatsapp
};

const IconComponent: FC<any> = memo(({ name, ...props }: any) => {
  const Icon = iconTypes[name]
  return <Icon {...props} />
});

export default IconComponent