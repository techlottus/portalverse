import RoutesConfig from "routesConfig.json";
import { useMemo, useState } from "react";
import Link from "next/link";
import Container from "@/layouts/Container.layout";
import Filter from "@/old-components/Filter/Filter";
import Image from "@/old-components/Image";
import Aspect from "@/components/Aspect";
import { FilterConfig } from "@/components/sections/ProgramsFilter";
import type { FilterProgram } from "@/utils/strapi/sections/ProgramsFilter";
import type { KnowledgeAreaFilterSection } from "@/utils/strapi/sections/KnowledgeAreaFilter";
import { useRouter } from "next/router";

const BUSINESS_UNIT = process.env.NEXT_PUBLIC_BUSINESS_UNIT;

/**
 * Exclude "Educación Continua" programs. Programs will also be displayed in this order.
 */
const AVAILABLE_EDUCATIONAL_LEVELS = [
  {
    name: "Licenciatura",
    pluralLabel: "Licenciaturas",
  },
  {
    name: "Maestría",
    pluralLabel: "Maestrías",
  },
  {
    name: "Doctorado",
    pluralLabel: "Doctorados",
  },
  {
    name: "Especialidad",
    pluralLabel: "Especialidades",
  },
];

type FilterKey = "modalities" | "campuses";

type Filter =
  | {
      [K in FilterKey]?: Array<string>;
    }
  | null;

const KnowledgeAreaFilter = (props: KnowledgeAreaFilterSection) => {
  const knowledgeArea = props?.area?.data?.attributes;
  const programs = props?.area?.data?.attributes?.programs?.data;

  const [currentFilter, setCurrentFilter] = useState<Filter>(null);

  const modalities = getProgramsModalities(programs);
  const sortedModalities = modalities?.slice()?.sort((a, b) => a?.label?.localeCompare(b?.label));

  const campuses = getProgramsCampuses(programs);
  const sortedCampuses = campuses?.slice()?.sort((a, b) => a?.localeCompare(b));
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
      modalities: {
        config: {
          label: "Modalidades",
          icon: "edit_note",
        },
        options: sortedModalities?.map((modality) => ({
          value: modality?.name,
          active: false,
          label: modality?.label
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
                const programsByLevel = programs?.filter((program) => program?.attributes?.level?.data?.attributes?.title === currentLevel?.name);

                const filteredPrograms = filterPrograms(
                  programsByLevel,
                  currentFilter
                );

                if (filteredPrograms?.length < 1) return null;

                const levelRoute = RoutesConfig?.educationalLevels?.find(
                  (level) => level?.name === currentLevel?.name
                )?.path;

                return (
                  <div key={`level-${i}`} className="flex flex-col space-y-6">
                    <h3 className="font-headings font-bold w-d:leading-15 w-t:leading-7.5 w-p:leading-7.5 w-d:text-13 w-t:text-6 w-p:text-6">
                      {currentLevel?.pluralLabel} del área {knowledgeArea?.name}
                    </h3>

                    <div className="grid grid-cols-12 w-t:grid-cols-8 w-p:grid-cols-4 gap-6">
                      {
                        filteredPrograms?.map((program, i) => {
                          const programAttributes = program?.attributes;
                          const image = programAttributes?.image;

                          return (
                            <div
                              key={`program-${i}`}
                              className="flex flex-col w-d:col-span-3 w-t:col-span-4 w-p:col-span-4 hover:shadow-30 h-full border border-solid border-surface-200 cursor-pointer overflow-hidden rounded-lg"
                              onClick={()=>{router.push(`${levelRoute}/${programAttributes?.slug}`)}}
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
                              {/* S */}
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

const getProgramModalities = (program: FilterProgram) => {

  if (!program) return [];

  const modalities: Array<{name: string, label: string}> = [];

  const programModalities = program?.attributes?.programModalities;

  programModalities?.forEach((programModality) => {
    const programModalityName = programModality?.modality?.data?.attributes?.name;
    const programModalityLabel = programModality?.modality?.data?.attributes?.label || programModalityName;

    if (!programModalityName || modalities?.some(modality => modality?.name === programModalityName))
      return;

    modalities?.push({name: programModalityName, label: programModalityLabel});
  });

  return modalities;
};

const getProgramsModalities = (programs: Array<FilterProgram> = []) => {

  if (programs?.length < 1) return [];

  const modalities: Array<{name: string, label: string}> = [];

  programs?.forEach((program) => {
    const programModalities = getProgramModalities(program);

    programModalities?.forEach((programModality) => {
      if (!programModality?.name || modalities?.some(modality => modality.name === programModality?.name )) return;
      modalities?.push(programModality);
    });
  });
  return modalities;
};

const filterPrograms = (programs: Array<FilterProgram> = [], filter: Filter) => {

  if (programs?.length < 1) return [];
  if (!filter) return programs;

  return Object.keys(filter)?.reduce((acc, currentKey) => {
    //@ts-ignore
    if (filter?.[currentKey]?.length < 1) return acc;

    return acc?.filter((program) => {
      switch (currentKey) {
        case "modalities": {
          const filterModalities = filter?.[currentKey];
          const programModalities = getProgramModalities(program);
          return programModalities?.some((programModality) =>
            filterModalities?.includes(programModality?.name)
          );
        }
        case "campuses": {
          const filterCampuses = filter?.[currentKey];
          const programCampuses = getProgramCampuses(program);
          return programCampuses?.some((programCampus) =>
            filterCampuses?.includes(programCampus)
          );
        }
        default: {
          return program;
        }
      }
    });
  }, programs);
};

export default KnowledgeAreaFilter;
