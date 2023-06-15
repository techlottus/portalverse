import { FC, useMemo, useState } from "react";
import Link from "next/link";
import Container from "@/layouts/Container.layout";
import RichtText from "@/old-components/Richtext/Richtext";
import Filter from "@/old-components/Filter/Filter";
import Image from "@/old-components/Image";
import Aspect from "@/components/Aspect";
import { normalizeString } from "@/utils/misc";
import cn from "classnames";
import type { FilterProgram, ProgramsFilterSection } from "@/utils/strapi/sections/ProgramsFilter";

type FilterKey = "modalities" | "campuses" | "knowledgeAreas";

type Filter =
  | {
      [K in FilterKey]?: Array<string>;
    }
  | null;

const ProgramsFilter: FC<ProgramsFilterSection> = (props: ProgramsFilterSection) => {

  const { title: sectionTitle, description: sectionDescription } = props;

  const levelAttributes = props?.level?.data?.attributes;
  const levelTitle = levelAttributes?.title;
  const levelRoute = normalizeString(levelTitle)?.toLowerCase()

  const programs = levelAttributes?.programs?.data;
  const sortedPrograms = programs?.slice()?.sort((a, b) => a?.attributes?.name?.localeCompare(b?.attributes?.name));

  const modalities = getProgramsModalities(programs);
  const sortedModalities = modalities?.slice()?.sort((a, b) => b?.localeCompare(a));

  const campuses = getProgramsCampuses(programs);
  const sortedCampuses = campuses?.slice()?.sort((a, b) => a?.localeCompare(b));

  const knowledgeAreas = getProgramsKnowledgeAreas(programs);
  const sortedKnowledgeAreas = knowledgeAreas?.slice()?.sort((a, b) => a?.localeCompare(b));

  const [currentFilter, setCurrentFilter] = useState<Filter>(null);
  const filterConfig = useMemo(() => {
    return {
      modalities: {
        config: {
          label: "Modalidades",
          icon: "edit_note",
        },
        options: sortedModalities?.map((modality) => ({
          value: modality,
          active: false,
          label: modality,
        })),
      },
      campuses: {
        config: {
          label: "Planteles",
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
          label: "Áreas de Conocimiento",
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

  const filteredPrograms = filterPrograms(sortedPrograms, currentFilter);

  /**
   * This is a flag that toggles between mosaic and list view. Since list view is yet to be implemented/polished,
   * mosaicActive is set to true. 
   */
  const mosaicActive = true;

  return (
    <section>
      <Container>
        <div className="flex flex-col space-y-6">
          {
            sectionTitle || sectionDescription
              ? <div className="flex flex-col space-y-3">
                  {
                    sectionTitle
                      ? <h1 className="font-Poppins font-bold w-d:leading-15 w-t:leading-7.5 w-p:leading-7.5 w-d:text-13 w-t:text-6 w-p:text-6">{ sectionTitle }</h1>
                      : null 
                  }
                  {
                    sectionDescription
                      ? <div>
                          <RichtText data={{ content: sectionDescription }} />
                        </div>
                      : null
                  }
                </div>
              : null
          }
          {
            levelTitle?.toLowerCase() !== "bachillerato"
              ? <Filter
                  color={"#282828"}
                  data={filterConfig}
                  onSelectionItems={onFilterChange}
                />
              : null
          }
        </div>
        {
          filterPrograms?.length > 0
            ? <div className="grid grid-cols-12 w-t:grid-cols-8 w-p:grid-cols-4 gap-6 mt-12">
                {
                  filteredPrograms?.map((program, i) => {      
                    const programAttributes = program?.attributes;
                    const image = programAttributes?.image;

                    return (
                      <div
                        key={`program-${i}`}
                        className={cn("flex hover:shadow-30 h-full border", {
                          "flex-col w-d:col-span-3 w-t:col-span-4 w-p:col-span-4":
                            mosaicActive,
                          "w-d:col-span-12 w-t:col-span-8 w-p:col-span-4":
                            !mosaicActive,
                        })}
                      >
                        <div>
                          {/* TODO: Handle mosaic view dimensions */}
                          <Aspect ratio="4/3">
                            <Image
                              classNames="w-full h-full"
                              classNamesImg="w-full h-full object-cover"
                              src={image?.data?.attributes?.url}
                              alt={image?.data?.attributes?.alternativeText || programAttributes?.name || ""}
                            />
                          </Aspect>
                        </div>
                        <div className="flex flex-col h-full">
                           <p className="font-Nunito-Sans font-normal text-4.5 mt-3 mx-3">
                            {programAttributes?.name}
                          </p>
                          <div className="w-full h-full flex justify-end pb-2 font-Nunito font-bold items-end">
                            <Link
                              href={`/oferta-educativa/${levelRoute}/${programAttributes?.slug}`}
                              className="flex items-center justify-end font-Nunito font-bold"
                            >
                              <span className="mr-1">Ver más</span>
                              <span className="material-icons icon">chevron_right</span>
                            </Link>
                          </div>
                        </div>
                        {/* S */}
                      </div>
                    );
                  })
                }
              </div>
            : null
        }
      </Container>
    </section>
  );
};

const getProgramCampuses = (program: FilterProgram) => {
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

const getProgramsCampuses = (programs: Array<FilterProgram>) => {
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

const getProgramsKnowledgeAreas = (programs: Array<FilterProgram>) => {
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

const getProgramModalities = (program: FilterProgram) => {
  const modalities: Array<string> = [];

  const programModalities = program?.attributes?.programModalities;

  programModalities?.forEach((programModality) => {
    const programModalityName =
      programModality?.modality?.data?.attributes?.name;

    if (!programModalityName || modalities?.includes(programModalityName))
      return;

    modalities?.push(programModalityName);
  });

  return modalities;
};

const getProgramsModalities = (programs: Array<FilterProgram>) => {
  const modalities: Array<string> = [];

  programs?.forEach((program) => {
    const programModalities = getProgramModalities(program);

    programModalities?.forEach((programModality) => {
      if (!programModality || modalities?.includes(programModality)) return;
      modalities?.push(programModality);
    });
  });

  return modalities;
};

const filterPrograms = (programs: Array<FilterProgram>, filter: Filter) => {
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
            filterModalities?.includes(programModality)
          );
        }
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

export default ProgramsFilter;