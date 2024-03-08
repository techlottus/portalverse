import { FC, useState } from "react"
import Container from "@/layouts/Container.layout";
import { RvoeAccordionListData } from "@/utils/strapi/sections/RvoeAccordionList";
import { Disclosure } from '@headlessui/react'
import cn from "classnames"
import RichtText from "@/old-components/Richtext/Richtext";
import parseEditorRawData from "@/utils/parseEditorRawData";

const RvoeAccordionList: FC<RvoeAccordionListData> = (props: RvoeAccordionListData) => {
  const { title, subtitle, description, rvoeList } = props;
  const [optionSelect, setOptionSelect] = useState<number>(0);
  const modalities: any = rvoeList?.[optionSelect]?.modalityCategory?.data?.attributes?.modalities?.data
  const getAllRvoes = modalities?.reduce(function (totalRvoes: any, modalities: any) {
    return Array.from(new Set([...totalRvoes, ...modalities?.attributes?.programRvoes?.data]));
  }, []);
  const items = getAllRvoes.map((item: any) => {
    const formattedItem = {
      program: item?.attributes?.program?.data?.attributes?.name,
      date: item?.attributes?.date,
      rvoe: item?.attributes?.name,
      level: item?.attributes?.program?.data?.attributes?.level?.data?.attributes?.title,
      knowledgeArea: item?.attributes?.knowledgeArea?.data?.attributes?.name
    }
    return formattedItem;
  });

  const allLevels = items?.map((item: any) => item?.level)?.filter((level: string, index: number, array: string[]) => array?.indexOf(level) === index);
  
  return <>
    <section>
      <Container>
        <div className={cn("w-d:w-1/2 flex flex-col justify-center", {
          "mb-8": !description
        })}>
          {
            title ?
              <h3 className="font-headings font-bold text-10 leading-12 w-p:text-6 w-p:leading-7">{title}</h3>
              : null
          }
        </div>
        {
          <div className="mb-8">
            <RichtText data={{
              content: parseEditorRawData(description)
            }} />
          </div>
        }
        <div className='w-d:flex gap-12 w-d:items-start'>
          {
            <div className="flex flex-col gap-6 w-72 max-w-72">
              {
                subtitle ?
                  <h4 className="font-headings font-bold text-5 leading-7">{subtitle}</h4>
                  : null
              }
              <div className="flex flex-col gap-4 py-4">
                {
                  rvoeList?.length > 0 ?
                    rvoeList?.map((item, index) =>
                      <div className="flex justify-start items-center mb-5 border-b pb-2 lg:border-0" key={item?.label}>
                        {
                          item?.iconName
                            ? <span className={cn("material-symbols-outlined text-4.5! mr-2", { "text-primary-500": index === optionSelect })}>{item?.iconName}</span>
                            : null
                        }
                        <button className={cn("text-base font-Poppins font-semibold !text-4.5 text-left", { "text-primary-500": index === optionSelect })} onClick={() => {
                          setOptionSelect(index)
                        }}>
                          {item?.label}
                        </button>
                      </div>
                    )
                    : null
                }
              </div>
            </div>
          }
          <div className="flex flex-col justify-center gap-6 w-full">
            <h3 className="font-headings text-primary-400 font-bold text-6 md:text-8 md:leading-10">{rvoeList?.[optionSelect]?.label}</h3>
            <div>

              {
                allLevels?.map((level: string, index: number) => {
                  return (
                    <div key={index} className="border">
                      <Disclosure>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex flex-row justify-between w-full border-b p-5">
                              <p className="font-texts text-sm	lg:text-base">Nivel {level}</p>
                              <span className={open ? 'rotate-180 transform material-symbols-outlined' : 'material-symbols-outlined'} >expand_more</span>
                            </Disclosure.Button>
                            <Disclosure.Panel className="p-2 lg:p-5 bg-gray-100">
                              <table className="w-full bg-white table-auto">
                                <thead className="text-xs md:text-base lg:text-base">
                                  <tr className="bg-gray-100">
                                    <th className="text-left font-texts font-normal w-1/4 w-d:w-2/6 pt-5 pb-8 md:pl-4">Programa</th>
                                    <th className="text-left font-texts font-normal w-1/4 w-d:w-1/6 pt-5 pb-8">Fecha</th>
                                    <th className="text-left font-texts font-normal w-1/4 w-d:w-1/6 pt-5 pb-8">RVOE</th>
                                    <th className="text-left font-texts font-normal w-1/4 w-d:w-2/6 pt-5 pb-8 md:pr-4">Área de conocimiento</th>
                                  </tr>
                                  {
                                    items ?
                                      items?.map((item: any) => {
                                        if (item?.level === level) {
                                          return (
                                            <tr className="w-full font-texts font-semibold text-xs md:text-base lg:text-base" key={item?.rvoe}>
                                              {
                                                item?.program
                                                  ? <td className="py-3 md:pl-4 px-2">{item?.program}</td>
                                                  : null
                                              }
                                              {
                                                item?.date
                                                  ? <td className="py-3">{item?.date?.replaceAll("-", "/")}</td>
                                                  : null
                                              }
                                              {
                                                item?.rvoe
                                                  ? <td className="py-3">{item?.rvoe}</td>
                                                  : null
                                              }
                                              {
                                                item?.knowledgeArea
                                                  ? <td className="md:pr-4">{item?.knowledgeArea}</td>
                                                  : null
                                              }
                                            </tr>
                                          )
                                        }
                                      }
                                      )
                                      : null
                                  }
                                </thead>
                              </table>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </Container>
    </section>
  </>
};

export default RvoeAccordionList;