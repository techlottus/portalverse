import { FC, useState } from "react"
import parseEditorRawData from "@/utils/parseEditorRawData";
import Container from "@/layouts/Container.layout";
import { CategoryAccordionListData } from "@/utils/strapi/sections/CategoryAccordionList";
import cn from "classnames"
import Accordion from "@/old-components/Accordion/Accordion";

const CategoryAccordionList: FC<CategoryAccordionListData> = (props: CategoryAccordionListData) => {
  const { title, subtitle, CategoryList } = props
  const [optionSelect, setOptionSelect] = useState<number>(0)
  const items = CategoryList[optionSelect].faq_category.data.attributes.faqs.data.map((item, i) => {
    const richTextMarkup = parseEditorRawData(item?.attributes.answer);
    const formattedItem = {
      icon: "",
      title: item?.attributes.question,
      iconArrow: "",
      text: "<p>text</p>",
      content: "<p>content</p>",
      //@ts-ignore
      answer: richTextMarkup,
      id: ""
    }
    return formattedItem;
  });

  return <>
    <section>
      <Container>
        <div className="w-d:w-1/2 flex flex-col justify-center pb-4">
          {
            title ?
              <div>
                <h3 className="font-headings font-bold text-10 leading-12 w-p:text-6 w-p:leading-7 mb-3">{title}</h3>
              </div>
              : null
          }
          {
            subtitle ?
              <div>
                <p className="text-5 leading-12">{subtitle}</p>
              </div>
              : null
          }
        </div>
        <div className='w-d:flex gap-6'>
          <div className="w-d:w-1/4 flex flex-col justify-center pb-4">
            {
              CategoryList ?
                CategoryList?.map((item, index) =>
                  <div className="flex justify-start mb-5">
                    {
                      item.iconName
                        ? <span className={cn("material-icons text-4.5! mr-2", { "text-primary-500": index === optionSelect })}>{item.iconName}</span>
                        : null
                    }
                    <button className={cn({ "text-primary-500": index === optionSelect })} onClick={() => {
                      setOptionSelect(index)
                    }}>
                      {item.label}
                    </button>
                  </div>
                )
                : null
            }
          </div>
          <div className="w-d:w-3/4 flex flex-col justify-center pb-4">
            {
              <div>
                <p className="font-headings text-primary-500 font-bold text-5 leading-12 w-p:text-6 w-p:leading-7 mb-1">{CategoryList[optionSelect].label}</p>
                <Accordion data={{ items: items }} />
              </div>
            }
          </div>
        </div>
      </Container>
    </section>
  </>
}

export default CategoryAccordionList