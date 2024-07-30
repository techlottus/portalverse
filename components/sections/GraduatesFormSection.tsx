import React from 'react'
import Container from "../../layouts/Container.layout";
import RichtText from '@/old-components/Richtext/Richtext';
import { GraduatesFormData } from "../../utils/strapi/sections/GraduatesFormData";
import GraduatesForm from "@/forms/container/GraduatesForm"
import cn from "classnames"

const GraduatesFormSection: React.FC<GraduatesFormData> = (props: GraduatesFormData) => {
  const {
    title,
    subtitle,
    overflowForm
  } = props;

  return <>
    <Container classNames="flex mobile:flex-col tablet:flex-col desktop:gap-6">
      <div className={cn("desktop:w-1/2 my-auto mobile:w-full", { "desktop:mt-[-3.5em]": overflowForm })}>
        <h3 className="font-headings text-5xl mb-2 font-bold">{title}</h3>
        <RichtText font="light" data={{ content: subtitle }} classNames="text-xl" />
      </div>
      <div className={cn("desktop:w-1/2 mobile:w-full", { "desktop:mt-[-13em] desktop:pr-6": overflowForm })}>
        <GraduatesForm />
      </div>
    </Container>
  </>
};

export default GraduatesFormSection;