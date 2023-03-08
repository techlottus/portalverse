import MetaData from "@/types/Metadata.type";

export type ContactData = {
  image?: string;
  name: string;
  email: string;
  phone: string;
};

export type SectionData = {
  name: string;
  description?:string;
  contacts: ContactData[];
};

export type HeadSection = {
  title: string;
  description: string;
};

type DirectoryComponentData = {
  areas: SectionData[];
  meta: MetaData;
  head: HeadSection;
}

export default DirectoryComponentData