import { ProgramPerk, programBrand } from "@/utils/getProgramBySlug"

export type IntroductionProgramData = {
  title?: string
  label?: string | null
  image: {
    alt: string;
    src: string;
  }
  modality?: string;
  discountPercentajeText?: string | null
  discount?: number | null
  checkoutUrlText?: string;
  checkoutUrl?: string | null
  certificationMessage?: string | null
  description?: string | null
  offerPrice?: number | null
  price?: number | null
  periodicity?: string | null
  programPerks: Array<ProgramPerk>
  brands?: Array<programBrand>
  price_list?: Boolean
}