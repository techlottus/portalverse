import { useRouter } from "next/router";
import Container from "@/layouts/Container.layout";
import parseEditorRawData from "@/utils/parseEditorRawData";
import Accordion from "@/old-components/Accordion/Accordion";
import Button from "@/old-components/Button/Button";
import type { FAQSection } from "@/utils/strapi/sections/FAQ";
import type { AccordionItemConfig } from "@/types/Accordion.types";

const FAQ = (props: FAQSection) => {
  /**
   *  Currently, all FAQ section components are rendered through an Accordion,
   *  leaving component prop unused for the time being.
   */
  const { title, ctaText, ctaUrl, component, faqCategory } = props;

  const router = useRouter();
  
  const faqItems = faqCategory?.data?.attributes?.faqs?.data;

  const accordionItems = faqItems?.map(faqItem => {
    const richTextMarkup = parseEditorRawData(faqItem?.attributes?.answer);

    const formattedItem: AccordionItemConfig = {
      icon: "",
      title: faqItem?.attributes?.question,
      iconArrow: "",
      text: "<p>text</p>",
      content: "<p>content</p>",
      //@ts-ignore
      answer: richTextMarkup,
      id: ""
    }
    return formattedItem;
  });

  if (faqItems?.length === 0) return null;

  return (
    <section>
      <Container>
        <div className="flex flex-col space-y-6">
          {
            title
              ? <h3 className="font-Poppins text-10 font-bold leading-[125%] w-t:text-8.5 w-p:text-6">
                  {title}
                </h3>
              : null
          }
          <div>
            <Accordion data={{ items: accordionItems }} />
          </div>
          {
            ctaText && ctaUrl
              ? <div className="flex justify-center">
                  <Button
                    dark
                    data={{
                      "title": ctaText,
                      "type": "outlined",
                      "icon": "",
                      "isExpand": false,
                    }}
                    onClick={() => {
                      router.push(ctaUrl)
                    }}
                  />
                </div>
              : null
          }
        </div>
      </Container>
    </section>
  );
}

export default FAQ