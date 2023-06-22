import { Fragment } from "react";
import type { DynamicProgramDetailData } from "@/utils/pages";
import ProgramBachilleratoPageContent from "@/components/ProgramBachilleratoPageContent";

const DynamicProgramContent = (props: DynamicProgramDetailData) => {

  const programAttributes = props?.program?.attributes;
  const level = programAttributes?.level?.data?.attributes?.title;

  const renderContent = () => {
    switch(level) {
      case "Educación Continua": {
        return <h1>Agregar Renderer de Educación Continua</h1>
      }
      case "Bachillerato": {
        return <ProgramBachilleratoPageContent {...props} />
      }
      default: {
        return <h1>Agregar Renderer de Nivel Superior</h1>
      }
    }
  }

  return <Fragment>{renderContent()}</Fragment>;
};

export default DynamicProgramContent;
