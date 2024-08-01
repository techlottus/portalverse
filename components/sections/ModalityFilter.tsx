import RoutesConfig from "routesConfig.json";
import { useMemo, useState } from "react";
import Link from "next/link";
import Container from "@/layouts/Container.layout";
import Filter from "@/old-components/Filter/Filter";
import Image from "@/old-components/Image";
import Aspect from "@/components/Aspect";
import { FilterConfig } from "@/components/sections/ProgramsFilter";
import type { FilterProgram } from "@/utils/strapi/sections/ProgramsFilter";
import type { ModalityFilterSection } from "@/utils/strapi/sections/ModalityFilter";
import { useRouter } from "next/router";

const BUSINESS_UNIT = process.env.NEXT_PUBLIC_BUSINESS_UNIT;

/**
 * Exclude "Educación Continua" programs. Programs will also be displayed in this order.
 */
const AVAILABLE_EDUCATIONAL_LEVELS = ["Preparatoria", "Bachillerato", "Licenciatura", "Especialidad", "Maestría", "Doctorado"];

type FilterKey = "campuses" | "knowledgeAreas";

type Filter =
  | {
      [K in FilterKey]?: Array<string>;
    }
  | null;

const ModalityFilter = (props: ModalityFilterSection) => {
  
  const modality = props?.modality?.data?.attributes;
  const programs = modality?.programs?.data;

  const [currentFilter, setCurrentFilter] = useState<Filter>(null);

  const campuses = getProgramsCampuses(programs);
  const sortedCampuses = campuses?.slice()?.sort((a, b) => a?.localeCompare(b));

  const knowledgeAreas = getProgramsKnowledgeAreas(programs);
  const sortedKnowledgeAreas = knowledgeAreas?.slice()?.sort((a, b) => a?.localeCompare(b));
  const router = useRouter();

  const filterConfig = useMemo(() => {
    return {
      campuses: {
        config: {
          //@ts-ignore
          label: FilterConfig?.[BUSINESS_UNIT]?.campusLabel || FilterConfig?.default?.campusLabel,
          icon: "apartment",
        },
        options: sortedCampuses?.map((campus) => ({
          value: campus,
          active: false,
          label: campus,
        })),
      },
      knowledgeAreas: {
        config: {
          label: "Área de Conocimiento",
          icon: "school",
        },
        options: sortedKnowledgeAreas?.map((knowledgeArea) => ({
          value: knowledgeArea,
          active: false,
          label: knowledgeArea,
        })),
      },
    };
  }, []);

  const onFilterChange = (filters: Filter) => {
    setCurrentFilter(filters);
  };

  return (
    <section>
      <Container>
        <div className="flex flex-col space-y-12">
          <div>
            <Filter
              color={"#282828"}
              data={filterConfig}
              onSelectionItems={onFilterChange}
            />
          </div>
          <div className="flex flex-col space-y-12 w-d:space-y-18">
            {
              AVAILABLE_EDUCATIONAL_LEVELS?.map((currentLevel, i) => {
                const programsByLevel = programs?.filter((program) => program?.attributes?.level?.data?.attributes?.title === currentLevel);

                const filteredPrograms = filterPrograms(
                  programsByLevel,
                  currentFilter
                );

                if (filteredPrograms?.length < 1) return null;

                const levelRoute = RoutesConfig?.educationalLevels?.find(
                  (level) => level?.name === currentLevel
                )?.path;

                return (
                  <div key={`level-${i}`} className="flex flex-col space-y-6">
                    <h3 className="font-headings font-bold w-d:leading-15 w-t:leading-7.5 w-p:leading-7.5 w-d:text-13 w-t:text-6 w-p:text-6">
                      {currentLevel} {modality?.label || modality?.name}
                    </h3>

                    <div className="grid grid-cols-12 w-t:grid-cols-8 w-p:grid-cols-4 gap-6">
                      {
                        filteredPrograms?.map((program, i) => {
                          const programAttributes = program?.attributes;
                          const image = programAttributes?.image;

                          return (
                            <div
                              onClick={()=>{router.push(`${levelRoute}/${programAttributes?.slug}`)}}
                              key={`program-${i}`}
                              className="flex flex-col w-d:col-span-3 w-t:col-span-4 w-p:col-span-4 hover:shadow-30 h-full border border-solid border-surface-200 cursor-pointer overflow-hidden rounded-lg"
                            >
                              <div>
                                {/* TODO: Handle mosaic view dimensions */}
                                <Aspect ratio="2/1">
                                  <Image
                                    classNames="w-full h-full"
                                    classNamesImg="w-full h-full object-cover"
                                    src={image?.data?.attributes?.url}
                                    alt={image?.data?.attributes?.alternativeText || programAttributes?.name}
                                  />
                                </Aspect>
                              </div>
                              <div className="flex flex-col h-full">
                                <h3 className="font-texts font-normal text-4.5 mt-3 mx-3">
                                  {programAttributes?.name}
                                </h3>
                                <div className="w-full h-full flex justify-end pb-2 font-texts font-bold items-end">
                                  <Link
                                    href={`${levelRoute}/${programAttributes?.slug}`}
                                    className="flex items-center justify-end font-texts font-bold"
                                  >
                                    <span className="mr-1 select-none">Ver más</span>
                                    <span className="material-symbols-outlined icon select-none">
                                      chevron_right
                                    </span>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      }
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </Container>
    </section>
  );
};

const getProgramCampuses = (program: FilterProgram) => {

  if (!program) return [];

  const campuses: Array<string> = [];

  const programModalities = program?.attributes?.programModalities;

  programModalities?.forEach((programModality) => {
    const curriculumByCampus = programModality?.curriculums;

    curriculumByCampus?.forEach((curriculumByCampus) => {
      const campusName = curriculumByCampus?.campus?.data?.attributes?.name;
      if (!campusName || campuses?.includes(campusName)) return;
      campuses?.push(campusName);
    });
  });

  return campuses;
};

const getProgramsCampuses = (programs: Array<FilterProgram> = []) => {

  if (programs?.length < 1) return [];

  const campuses: Array<string> = [];

  programs?.forEach((program) => {
    const programCampuses = getProgramCampuses(program);
    programCampuses?.forEach((campus) => {
      if (!campus || campuses?.includes(campus)) return;
      campuses?.push(campus);
    });
  });

  return campuses;
};

const getProgramKnowledgeAreas = (program: FilterProgram) => {

  if (!program) return [];

  const knowledgeAreas: Array<string> = [];

  const programKnowledgeAreas = program?.attributes?.knowledgeAreas?.data;

  programKnowledgeAreas?.forEach((knowledgeArea) => {
    const knowledgeAreaName = knowledgeArea?.attributes?.name;

    if (!knowledgeAreaName || knowledgeAreas?.includes(knowledgeAreaName))
      return;

    knowledgeAreas?.push(knowledgeAreaName);
  });
  return knowledgeAreas;
};

const getProgramsKnowledgeAreas = (programs: Array<FilterProgram> = []) => {

  if (programs?.length < 1) return [];

  const knowledgeAreas: Array<string> = [];

  programs?.forEach((program) => {
    const programKnowledgeAreas = getProgramKnowledgeAreas(program);

    programKnowledgeAreas?.forEach((knowledgeArea) => {
      if (!knowledgeArea || knowledgeAreas?.includes(knowledgeArea)) return;
      knowledgeAreas?.push(knowledgeArea);
    });
  });

  return knowledgeAreas;
};

const filterPrograms = (programs: Array<FilterProgram> = [], filter: Filter) => {

  if (programs?.length < 1) return [];
  if (!filter) return programs;

  return Object.keys(filter)?.reduce((acc, currentKey) => {
    //@ts-ignore
    if (filter?.[currentKey]?.length < 1) return acc;

    return acc?.filter((program) => {
      switch (currentKey) {
        case "campuses": {
          const filterCampuses = filter?.[currentKey];
          const programCampuses = getProgramCampuses(program);
          return programCampuses?.some((programCampus) =>
            filterCampuses?.includes(programCampus)
          );
        }
        case "knowledgeAreas": {
          const filterKnowledgeAreas = filter?.[currentKey];
          const programKnowledgeAreas = getProgramKnowledgeAreas(program);
          return programKnowledgeAreas?.some((programKnowledgeArea) =>
            filterKnowledgeAreas?.includes(programKnowledgeArea)
          );
        }
        default: {
          return program;
        }
      }
    });
  }, programs);
};

export default ModalityFilter;
