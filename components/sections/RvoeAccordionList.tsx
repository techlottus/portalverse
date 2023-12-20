import { FC, useState } from "react"
import Container from "@/layouts/Container.layout";
import { RvoeAccordionListData } from "@/utils/strapi/sections/RvoeAccordionList";
import { Disclosure } from '@headlessui/react'
import cn from "classnames"

const RvoeAccordionList: FC<RvoeAccordionListData> = (props: RvoeAccordionListData) => {
  const { title, subtitle, rvoeList } = props
  const [optionSelect, setOptionSelect] = useState<number>(0)
  const modalities: any = rvoeList?.[optionSelect]?.modalityCategory?.data?.attributes?.modalities?.data
  const getAllRvoes = modalities.reduce(function (totalRvoes: any, modalities: any) {
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

  const allLevels = items?.map((item: any) => item?.level)
    ?.filter((level: string, index: number, array: string[]) => array?.indexOf(level) === index);

  return <>
    <section>
      <Container>
        <div className="w-d:w-1/2 flex flex-col justify-center">
          {
            title ?
              <div>
                <h3 className="font-headings font-bold text-10 leading-12 w-p:text-6 w-p:leading-7 mb-3">{title}</h3>
              </div>
              : null
          }
        </div>
        <div className='w-d:flex gap-6'>
          {
            <div className="w-d:w-1/5 flex flex-col">
              {
                subtitle ?
                  <p className="text-5 leading-12 mb-5">{subtitle}</p>
                  : null
              }
              {
                rvoeList ?
                  rvoeList?.map((item, index) =>
                    <div className="flex justify-start mb-5 border-b pb-2 lg:border-0" key={item?.label}>
                      {
                        item?.iconName
                          ? <span className={cn("material-icons text-4.5! mr-2", { "text-primary-500": index === optionSelect })}>{item?.iconName}</span>
                          : null
                      }
                      <button className={cn("text-base font-Poppins font-semibold", { "text-primary-500": index === optionSelect })} onClick={() => {
                        setOptionSelect(index)
                      }}>
                        {item?.label}
                      </button>
                    </div>
                  )
                  : null
              }
            </div>
          }
          <div className="w-d:w-4/5 flex flex-col justify-center pb-4">
            <p className="text-lg	lg:text-2xl text-primary-500 font-bold text-5 mb-5">{rvoeList?.[optionSelect]?.label}</p>
            {
              allLevels?.map((level: string, index: number) => {
                return (
                  <div key={index} className="border">
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex flex-row justify-between w-full border-b p-5">
                            <p className="text-sm	lg:text-base font-sans">Nivel {level}</p>
                            <span className={open ? 'rotate-180 transform material-icons' : 'material-icons'} >expand_more</span>
                          </Disclosure.Button>
                          <Disclosure.Panel className="p-2 lg:p-5 bg-gray-100">
                            <table className="w-full bg-white table-auto">
                              <thead className="text-xs md:text-base lg:text-base">
                                <tr className="bg-gray-100">
                                  <th className="text-left font-texts font-normal w-1/4 w-d:w-2/6 py-3">Programa</th>
                                  <th className="text-left font-texts font-normal w-1/4 w-d:w-1/6">Fecha</th>
                                  <th className="text-left font-texts font-normal w-1/4 w-d:w-1/6">RVOE</th>
                                  <th className="text-left font-texts font-normal w-1/4 w-d:w-2/6">Área de conocimiento</th>
                                </tr>
                                {
                                  items ?
                                    items?.map((item: any) => {
                                      if (item?.level === level) {
                                        return (
                                          <tr className="w-full font-texts font-semibold text-xs md:text-base lg:text-base" key={item?.rvoe}>
                                            {
                                              item?.program
                                                ? <td className="py-3">{item?.program}</td>
                                                : null
                                            }
                                            {
                                              item?.date
                                                ? <td>{new Intl.DateTimeFormat('es-MX').format(new Date(item?.date))}</td>
                                                : null
                                            }
                                            {
                                              item?.rvoe
                                                ? <td>{item?.rvoe}</td>
                                                : null
                                            }
                                            {
                                              item?.knowledgeArea
                                                ? <td>{item?.knowledgeArea}</td>
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
      </Container>
    </section>
  </>
}

export default RvoeAccordionList