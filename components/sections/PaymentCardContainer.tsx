import parseEditorRawData from "@/utils/parseEditorRawData";
import type { AccordionSection } from "@/utils/strapi/sections/Accordion";

export type PaymentCardContainerData = {
  title: string;
  priceList: Array <any>;
  text: string;
}

const PaymentCardSection = (props: AccordionSection) => {

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
      
    </section>
  );
}

export default PaymentCardSection