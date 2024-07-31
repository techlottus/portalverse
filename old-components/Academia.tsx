import { FC, useEffect, useState } from "react"
import ContentInsideLayout from "@/layouts/ContentInside.layout"
import Table from "@/old-components/Table"
import Button from "@/old-components/Button/Button"
import AcademiaComponentData from "@/types/Academia.types"
import Select from "@/old-components/Select/Select"
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
      <h3 className="text-5.5 tablet:text-base mobile:text-base font-headings font-bold leading-tight">{data.title}</h3>
      <p className="text-base tablet:invisible mobile:invisible font-texts font-bold leading-tight">{data.subtitle}</p>
      <p className="text-base tablet:text-3.5 mobile:text-3.5 font-texts leading-tight tablet:leading-5 mt-4">{data.select.title}</p>
      <Select onClick={(option: CustomEvent) => console.log("option", option)} data={newConfig} options={newOptions} />
    </div>
    <div className="opacity-25">
      <div className="grid gap-6">
        <div>
          <p className="text-base tablet:text-3.5 mobile:text-3.5 font-texts leading-tight">{result.title}</p>
          <p className="text-base tablet:text-3.5 mobile:text-3.5 font-texts font-bold leading-tight tablet:leading-tight mobile:leading-tight">{result.plan}</p>
        </div>
        <div>
          <span className="text-base tablet:text-3.5 mobile:text-3.5 leading[125%] font-texts">{result.initText}</span>
          <span className="text-base tablet:text-3.5 mobile:text-3.5 leading[125%] font-texts font-bold">{result.initValue}</span>
          <span className="text-base tablet:text-3.5 mobile:text-3.5 leading[125%] font-texts">{result.duracionText}</span>
          <span className="text-base tablet:text-3.5 mobile:text-3.5 leading[125%] font-texts font-bold">{result.duracionValue}</span>
        </div>
      </div>
      <div>
        <ContentInsideLayout classNames="gap-6">
          <Table classNames="col-span-6 tablet:col-span-4 mobile:col-span-4" data={{
            head: "Semestre 1",
            rows: ['Materia 1', 'Materia 2', 'Materia 3'],
            icon: ""
          }} />
          <Table classNames="col-span-6 tablet:col-span-4 mobile:col-span-4" data={{
            head: "Semestre 1",
            rows: ['Materia 1', 'Materia 2', 'Materia 3'],
            icon: ""
          }} />
        </ContentInsideLayout>
      </div>
      <div className="mobile:flex-col hidden">
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