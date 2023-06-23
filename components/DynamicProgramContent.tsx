import { Fragment } from "react";
import ContinuousEducationProgramDetail from "@/components/sections/ContEdProgramDetail";
import type { DynamicProgramDetailData } from "@/utils/pages";

const DynamicProgramContent = (props: DynamicProgramDetailData) => {

  const programAttributes = props?.program?.attributes;
  const level = programAttributes?.level?.data?.attributes?.title;

  const renderContent = () => {
    switch(level) {
      case "Educación Continua": {
        return <ContinuousEducationProgramDetail {...programAttributes} />
      }
      case "Bachillerato": {
        return <h1>Agregar Renderer de Bachillerato</h1>
      }
      default: {
        return <h1>Agregar Renderer de Nivel Superior</h1>
      }
    }
  }

  return <Fragment>{renderContent()}</Fragment>;
};

export default DynamicProgramContent;
