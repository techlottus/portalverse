import { FC, useState } from "react"
import parseEditorRawData from "@/utils/parseEditorRawData";
import Container from "@/layouts/Container.layout";
import { CategoryAccordionListData } from "@/utils/strapi/sections/CategoryAccordionList";
import cn from "classnames"
import Accordion from "@/old-components/Accordion/Accordion";

const CategoryAccordionList: FC<CategoryAccordionListData> = (props: CategoryAccordionListData) => {
  const { title, subtitle, CategoryList } = props;
  const [optionSelect, setOptionSelect] = useState<number>(0);
  const items = CategoryList?.[optionSelect]?.faq_category?.data?.attributes?.faqs?.data?.map((item, i) => {
    const richTextMarkup = parseEditorRawData(item?.attributes?.answer);
    const formattedItem = {
      icon: "",
      title: item?.attributes?.question,
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
        <div className="w-d:w-1/2 flex flex-col justify-center mb-8">
          {
            title ?
              <div>
                <h3 className="font-headings font-bold text-10 leading-12 w-p:text-6 w-p:leading-7 mb-3">{title}</h3>
              </div>
              : null
          }
        </div>
        <div className="w-d:flex w-d:items-start gap-12">
          <div className="flex flex-col gap-6 max-w-72">
            {
              subtitle ?
                <p className="font-headings font-bold text-6 leading-7.5">{subtitle}</p>
                : null
            }
            <div className="flex flex-col gap-4 py-4">
              {
                CategoryList ?
                  CategoryList?.map((item, index) => {
                    const categoryTitle = item?.faq_category?.data?.attributes?.title || item?.label
                    return (
                      <div className="flex justify-start mb-5 gap-2.5 items-center" key={index}>
                        {
                          item?.iconName
                            ? <span className={cn("material-icons flex-none !text-4.5 w-4", { "text-primary-500": index === optionSelect })}>{item?.iconName}</span>
                            : null
                        }
                        <button className={cn("font-semibold font-headings text-left !text-4.5", { "text-primary-500": index === optionSelect })} onClick={() => {
                          setOptionSelect(index)
                        }}>
                          {categoryTitle}
                        </button>
                      </div>
                    )
                  }
                  )
                  : null
              }
            </div>
          </div>
          <div className="flex flex-col gap-6 w-full">
            <h3 className="font-headings text-secondary-400 font-bold text-8 leading-10 w-p:text-6 w-p:leading-7">{CategoryList[optionSelect].label}</h3>
            {
              items?.length > 0 ?
                <Accordion data={{ items: items }} />
              : null
            }
          </div>
        </div>
      </Container>
    </section>
  </>
}

export default CategoryAccordionList