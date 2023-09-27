import RoutesConfig from "routesConfig.json";
import Link from "next/link";
import Container from "@/layouts/Container.layout";
import Image from "@/old-components/Image";
import Aspect from "@/components/Aspect";
import type { KnowledgeAreaFilterSection } from "@/utils/strapi/sections/KnowledgeAreaFilter";

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

const KnowledgeAreaFilter = (props: KnowledgeAreaFilterSection) => {
  const knowledgeArea = props?.area?.data?.attributes;
  const programs = props?.area?.data?.attributes?.programs?.data;

  return (
    <section>
      <Container>
        <div className="flex flex-col space-y-6">
          {AVAILABLE_EDUCATIONAL_LEVELS?.map((currentLevel) => {
            const programsByLevel = programs?.filter(
              (program) =>
                program?.attributes?.level?.data?.attributes?.title ===
                currentLevel?.name
            );

            if (programsByLevel?.length < 1) return null;

            const levelRoute = RoutesConfig?.educationalLevels?.find(
              (level) => level?.name === currentLevel?.name
            )?.path;

            return (
              <div className="flex flex-col space-y-6">
                <h3 className="font-headings font-bold w-d:leading-15 w-t:leading-7.5 w-p:leading-7.5 w-d:text-13 w-t:text-6 w-p:text-6">
                  {currentLevel?.pluralLabel} del área {knowledgeArea?.name}
                </h3>

                <div className="grid grid-cols-12 w-t:grid-cols-8 w-p:grid-cols-4 gap-6">
                  {programsByLevel?.map((program, i) => {
                    const programAttributes = program?.attributes;
                    const image = programAttributes?.image;

                    return (
                      <div
                        key={`program-${i}`}
                        className="flex flex-col w-d:col-span-3 w-t:col-span-4 w-p:col-span-4 hover:shadow-30 h-full border border-solid border-surface-200"
                      >
                        <div>
                          {/* TODO: Handle mosaic view dimensions */}
                          <Aspect ratio="4/3">
                            <Image
                              classNames="w-full h-full"
                              classNamesImg="w-full h-full object-cover"
                              src={image?.data?.attributes?.url}
                              alt={
                                image?.data?.attributes?.alternativeText ||
                                programAttributes?.name
                              }
                            />
                          </Aspect>
                        </div>
                        <div className="flex flex-col h-full">
                          <p className="font-texts font-normal text-4.5 mt-3 mx-3">
                            {programAttributes?.name}
                          </p>
                          <div className="w-full h-full flex justify-end pb-2 font-texts font-bold items-end">
                            <Link
                              href={`${levelRoute}/${programAttributes?.slug}`}
                              className="flex items-center justify-end font-texts font-bold"
                            >
                              <span className="mr-1">Ver más</span>
                              <span className="material-icons icon">
                                chevron_right
                              </span>
                            </Link>
                          </div>
                        </div>
                        {/* S */}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default KnowledgeAreaFilter;
