import Container from "@/layouts/Container.layout";
import Accordion from "@/old-components/Accordion/Accordion";
import routesConfig from "routesConfig.json";
import type { ProgramAccordionListSection } from "@/utils/strapi/sections/ProgramAccordionItems";

const ProgramAccordionList = (props: ProgramAccordionListSection) => {
  const {
    title,
    programAccordionItems
  } = props;

  const formatAccordionItems = programAccordionItems?.map((programAccordionItem) => {
    const title = programAccordionItem?.label;
    const levelRoute = routesConfig?.educationalLevels?.find(educationalLevel => educationalLevel?.name === programAccordionItem?.level?.data?.attributes?.title)?.path;  
    const answer = programAccordionItem?.programs?.data?.reduce((content, program) => (`${content}<a href="${levelRoute}/${program?.attributes?.slug}">${program?.attributes?.name}</a><br>`), "");

    return {
      title,
      answer
    }
  });

  if (!formatAccordionItems || formatAccordionItems?.length <= 0) {
    return null;
  }

  return (
    <section>
      <Container>
        {title ? (
          <h2 className="font-headings font-bold text-10 w-t:text-7.5 w-p:text-7.5 leading-tight mb-6">
            {title}
          </h2>
        ) : null}
        {
          //@ts-ignore
          <Accordion data={{ items: formatAccordionItems }} />
        }
      </Container>
    </section>
  );
};

export default ProgramAccordionList;