import React from 'react'
import Container from "../../layouts/Container.layout";
import RichtText from '@/old-components/Richtext/Richtext';
import { GraduatesFormData } from "../../utils/strapi/sections/GraduatesFormData";
import GraduatesForm from "@/forms/container/GraduatesForm"

const GraduatesFormSection: React.FC<GraduatesFormData> = (props: GraduatesFormData) => {
  const {
    title,
    subtitle,
  } = props;

  return <>
    <Container classNames="flex mobile:flex-col tablet:flex-col desktop:gap-6">
      <div className="desktop:w-1/2 mobile:w-full my-auto">
        <h3 className="font-headings text-5xl mb-2 font-bold">{title}</h3>
        <RichtText font="light" data={{ content: subtitle }} classNames="text-xl" />
      </div>
      <div className="desktop:w-1/2 mobile:w-full">
        <GraduatesForm />
      </div>
    </Container>
  </>
};

export default GraduatesFormSection;
