import { FC, useState } from "react"
import Container from "@/layouts/Container.layout";
import cn from "classnames"
import { RvoeAccordionListData } from "@/utils/strapi/sections/RvoeAccordionList";

const RvoeAccordionList: FC<RvoeAccordionListData> = (props: RvoeAccordionListData) => {
  const { title, subtitle, RvoeList } = props
  const [optionSelect, setOptionSelect] = useState<number>(0)
  const Rvoes: any = RvoeList[optionSelect].program_rvoes.data
  const items = Rvoes.map((item: any) => {
    const formattedItem = {
      modality: item?.attributes.modality.data.attributes.name,
      program: item?.attributes.program.data.attributes.name,
      date: item?.attributes.date,
      rvoe: item?.attributes.name,
      level: item?.attributes.program.data.attributes.level.data.attributes.title
    }
    return formattedItem;
  });

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
          {
            subtitle ?
              <div>
                <p className="text-5 leading-12">{subtitle}</p>
              </div>
              : null
          }
        </div>
        <div className='w-d:flex gap-6'>
          {
            <div className="w-d:w-1/4 flex flex-col pt-4">
              {
                RvoeList ?
                  RvoeList?.map((item, index) =>
                    <div className="flex justify-start mb-5" key={item.label}>
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
          }
          <div className="w-d:w-3/4 flex flex-col justify-center pb-4">
            <div className="p-4 b" style={{ backgroundColor: "#E6E6E6" }}>
              <p className="font-headings text-primary-500 font-bold text-5 leading-12 w-p:text-6 w-p:leading-7 mb-1">{RvoeList[optionSelect].label}</p>
              <p className="font-headings font-bold text-5 leading-12 w-p:text-6 w-p:leading-7 mb-1">Licenciatura</p>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left ">Modalidad</th>
                    <th className="text-left px-5">Programa</th>
                    <th className="text-left px-5">Fecha</th>
                    <th className="text-left px-5">Rvoe</th>
                  </tr>
                  {
                    items ?
                      items?.map((item: any) => {
                        if (item.level === 'Licenciatura') {
                          return (
                            <tr className="w-full" key={item.rvoe}>
                              {
                                item.modality
                                  ? <td className="py-2">{item.modality}</td>
                                  : null
                              }
                              {
                                item.program
                                  ? <td className="px-5">{item.program}</td>
                                  : null
                              }
                              {
                                item.date
                                  ? <td className="px-5">{item.date}</td>
                                  : null
                              }
                              {
                                item.rvoe
                                  ? <td className="px-5">{item.rvoe}</td>
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
              <p className="font-headings font-bold text-5 leading-12 w-p:text-6 w-p:leading-7 mb-1">Bachillerato</p>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left ">Modalidad</th>
                    <th className="text-left px-5">Programa</th>
                    <th className="text-left px-5">Fecha</th>
                    <th className="text-left px-5">Rvoe</th>
                  </tr>
                  {
                    items ?
                      items?.map((item: any) => {
                        if (item.level === 'Bachillerato') {
                          return (
                            <tr className="w-full" key={item.rvoe}>
                              {
                                item.modality
                                  ? <td className="py-2">{item.modality}</td>
                                  : null
                              }
                              {
                                item.program
                                  ? <td className="px-5" style={{ minWidth: "360px" }}>{item.program}</td>
                                  : null
                              }
                              {
                                item.date
                                  ? <td className="px-5">{item.date}</td>
                                  : null
                              }
                              {
                                item.rvoe
                                  ? <td className="px-5">{item.rvoe}</td>
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
              <p className="font-headings font-bold text-5 leading-12 w-p:text-6 w-p:leading-7 mb-1">Maestría</p>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left">Modalidad</th>
                    <th className="text-left px-5">Programa</th>
                    <th className="text-left px-5">Fecha</th>
                    <th className="text-left px-5">Rvoe</th>
                  </tr>
                  {
                    items ?
                      items?.map((item: any) => {
                        if (item.level === 'Maestría') {
                          return (
                            <tr className="w-full" key={item.rvoe}>
                              {
                                item.modality
                                  ? <td className="py-2">{item.modality}</td>
                                  : null
                              }
                              {
                                item.program
                                  ? <td className="px-5" style={{ minWidth: "360px" }}>{item.program}</td>
                                  : null
                              }
                              {
                                item.date
                                  ? <td className="px-5">{item.date}</td>
                                  : null
                              }
                              {
                                item.rvoe
                                  ? <td className="px-5">{item.rvoe}</td>
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
            </div>
          </div>
        </div>
      </Container>
    </section>
  </>
}

export default RvoeAccordionList