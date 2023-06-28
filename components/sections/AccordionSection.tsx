import Container from "@/layouts/Container.layout";
import Accordion from "@/old-components/Accordion/Accordion";
import RichtText from "@/old-components/Richtext/Richtext";
import parseEditorRawData from "@/utils/parseEditorRawData";
import type { AccordionSection } from "@/utils/strapi/sections/Accordion";

const AccordionComponent = (props: AccordionSection) => {

  const { title, subtitle, description, accordionItems } = props;

  const formatedDescription = parseEditorRawData(description)

  const items = accordionItems?.map((item) => {
    const richTextMarkup = parseEditorRawData(item?.content);
    const formattedItem = {
      icon: "",
      title: item?.title,
      iconArrow: "",
      text: "<p>text</p>",
      content: "<p>content</p>",
      //@ts-ignore
      answer: richTextMarkup,
      id: ""
    }
    return formattedItem;
  });

  return (
    <section>
      <Container>
        <div className="flex flex-col space-y-6">
          {
            title
              ? <h3 className="font-Poppins font-bold leading-[125%] w-p:text-6 w-t:text-8.5 text-10">
                {title}
              </h3>
              : null}
          {
            subtitle
              ? <p className="font-Poppins font-semibold leading-[130%] w-p:text-4 w-t:text-4.5 text-5.5">
                {subtitle}
              </p>
              : null
          }
          {
            description
              ? <div><RichtText data={{ content: formatedDescription }} classNames="text-xl" /></div>
              : null
          }
          <div>
            <Accordion data={{ items: items }} />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default AccordionComponent