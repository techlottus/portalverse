import { FC, useEffect, useState } from "react"
import ContentInsideLayout from "@/layouts/ContentInside.layout"
import Table from "@/old-components/Table"
import Button from "@/old-components/Button/Button"
import AcademiaComponentData from "@/types/Academia.types"
import Select from "@/old-components/Select"
import { SelectInit } from "@/old-components/fixture"

const Academia: FC<AcademiaComponentData> = ({ data, result, classNames, select: { config, options } }: AcademiaComponentData) => {

  const [ newOptions, setNewOptions ] = useState([]);
  const [ newConfig, setNewConfig ] = useState({ ...SelectInit });

  useEffect(() => {
    setNewOptions(options);
  }, [options]);
  
  useEffect(() => {
    setNewConfig(config);
  }, [config]);

  return <section className={classNames}>
    <div>
      <h1 className="text-5.5 w-t:text-base w-p:text-base font-Nunito font-bold leading-[130%]">{data.title}</h1>
      <p className="text-base w-t:invisible w-p:invisible font-Nunito font-bold leading-[130%]">{data.subtitle}</p>
      <p className="text-base w-t:text-3.5 w-p:text-3.5 font-Nunito leading-[125%] w-t:leading-[19px] mt-[17px]">{data.select.title}</p>
      <Select onClick={(option: CustomEvent) => console.log("option", option)} data={newConfig} options={newOptions} />
    </div>
    <div className="opacity-25">
      <div className="grid gap-6">
        <div>
          <p className="text-base w-t:text-3.5 w-p:text-3.5 font-Nunito leading-[125%]">{result.title}</p>
          <p className="text-base w-t:text-3.5 w-p:text-3.5 font-Nunito font-bold leading-[130%] w-t:leading-[125%] w-p:leading-[125%]">{result.plan}</p>
        </div>
        <div>
          <span className="text-base w-t:text-3.5 w-p:text-3.5 leading[125%] font-Nunito">{result.initText}</span>
          <span className="text-base w-t:text-3.5 w-p:text-3.5 leading[125%] font-Nunito font-bold">{result.initValue}</span>
          <span className="text-base w-t:text-3.5 w-p:text-3.5 leading[125%] font-Nunito">{result.duracionText}</span>
          <span className="text-base w-t:text-3.5 w-p:text-3.5 leading[125%] font-Nunito font-bold">{result.duracionValue}</span>
        </div>
      </div>
      <div>
        <ContentInsideLayout classNames="gap-6">
          <Table classNames="col-span-6 w-t:col-span-4 w-p:col-span-4" data={{
            head: "Semestre 1",
            rows: ['Materia 1', 'Materia 2', 'Materia 3'],
            icon: ""
          }} />
          <Table classNames="col-span-6 w-t:col-span-4 w-p:col-span-4" data={{
            head: "Semestre 1",
            rows: ['Materia 1', 'Materia 2', 'Materia 3'],
            icon: ""
          }} />
        </ContentInsideLayout>
      </div>
      <div className="w-p:flex-col hidden">
        <Button data={{
          id: undefined,
          type: undefined,
          title: 'undefined',
          size: undefined,
          icon: undefined,
          lyIcon: undefined,
          disabled: undefined,
          isExpand: undefined,
          tagOnClick: undefined,
          test: undefined
        }}/>
        <Button data={{
          id: undefined,
          type: undefined,
          title: 'undefined',
          size: undefined,
          icon: undefined,
          lyIcon: undefined,
          disabled: undefined,
          isExpand: undefined,
          tagOnClick: undefined,
          test: undefined
        }} />
      </div>
    </div>
  </section>
}

export default Academia