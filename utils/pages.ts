import Routes from "@/routes/Routes";
import getBlogEntryPageData from "@/utils/getBlogEntryPageData";
import getBlogPosts from "@/utils/getBlogPosts";
import getPageDataById from "@/utils/getPageDataById";
import getEducationalOfferingConfig from "@/utils/getEducationalOfferingConfig";
import getPagesInfo from "@/utils/getPagesInfo";
import getProgramsByLevel from "@/utils/getProgramsByLevel";
import getProgramBySlug from "@/utils/getProgramBySlug";
import getProgramDetailSuperiorPageData from "@/utils/getProgramDetailSuperior";
import getProgramDetailBachillerato from "@/utils/getProgramDetailBachillerato";
import { getDataPageFromJSON } from "@/utils/getDataPage";
import { isValidPath, normalizePath } from "@/utils/misc";
import type { ProgramData } from "@/utils/getProgramBySlug";
import type { StaticProgram } from "@/utils/strapi/sections/ProgramsFilter";
import type {
  StaticContinuousEducationCategory,
  StaticContinuousEducationProgram,
} from "@/utils/strapi/sections/ContEdPrograms";

type PageType = "programDetail" | "blogEntry" | "dynamic";

export const getPageType = async (path: string): Promise<PageType> => {
  const normalizedPath = normalizePath(path);

  const blogEntryPageData = await getBlogEntryPageData();
  const blogEntryParentSlug = normalizePath(blogEntryPageData?.data?.attributes?.slug);
  const isBlogEntryPage = path?.startsWith(`${blogEntryParentSlug}/`) && normalizedPath !== normalizePath(blogEntryParentSlug);

  const levelsConfig = await getEducationalOfferingConfig();
  const programDetailParentSlugs = levelsConfig?.map(levelConfig => normalizePath(levelConfig?.slug));
  const isProgramDetailPage = programDetailParentSlugs?.reduce((acc, parentSlug) => {return acc || normalizedPath?.startsWith(`${parentSlug}/`) && normalizedPath !== parentSlug;
  }, false);

  if(isBlogEntryPage) {
    return "blogEntry"
  } else if(isProgramDetailPage) {
    return "programDetail"
  } else {
    return "dynamic"
  }
}

/**
 * PAGE DATA FETCHING
 */

export type DynamicProgramDetailData = {
  program: ProgramData;
  layout?: any;
};

export type ProgramDetailPage =
  | {
      type: "StaticProgramDetail";
      data: {
        level: any;
        program: any;
        meta: any;
        config: any;
        sections: any;
        form: any;
        bannerParche: any;
      };
    }
  | {
      type: "StaticContinuousEducationProgramDetail";
      data: {
        sections: any;
        meta: any;
      };
    }
  | {
      type: "DynamicProgramDetail";
      data: DynamicProgramDetailData;
    };

export const getPageDataBySlug = async (slug: string) => {
  const pagesInfo = await getPagesInfo();
    
  const targetPage = pagesInfo?.find(
    (page) => normalizePath(page?.attributes?.slug) === normalizePath(slug)
  );
  const targetPageId = targetPage?.id;

  if (!targetPageId) throw new Error("Page ID Not Found");
    
  const pageData = await getPageDataById({ id: targetPageId });
  return pageData?.page;
};

export const getProgramDetailPageData = async (path: string): Promise<ProgramDetailPage> => {
  const pathSegments = normalizePath(path)?.split("/");
  const levelSlug = pathSegments?.slice(pathSegments?.length - 2, pathSegments?.length - 1)?.[0];
  const programSlug = pathSegments?.slice(pathSegments?.length - 1, pathSegments?.length)?.[0];

  const staticProgramsByLevel = Routes["oferta-educativa"];
  const continuousEducationPrograms = Routes["extension-universitaria"]?.params?.programs;

  const isContinuousEducationProgram = levelSlug === "extension-universitaria";

  const isStaticProgram = isContinuousEducationProgram
    ? continuousEducationPrograms?.some((program) => {
        return program?.params?.program === programSlug;
      })
    : staticProgramsByLevel?.some((level) => {
        return level?.params?.programs?.some((program) => {
          return level?.params?.level === levelSlug && program?.params?.program === programSlug;
        });
      });

  if (isStaticProgram) {
    if (isContinuousEducationProgram) {
      const { sections, meta } = await getDataPageFromJSON(`extension-universitaria/${programSlug}.json`);

      return {
        type: "StaticContinuousEducationProgramDetail",
        data: { sections, meta }
      };

    } else {
      const { meta, config, sections, form } = await getDataPageFromJSON(`/oferta-educativa/${levelSlug}/${programSlug}.json`);
      const bannerParche = await getDataPageFromJSON("oferta-educativa/oferta-educativa.json");

      return {
        type: "StaticProgramDetail",
        data: {
          level: levelSlug,
          program: programSlug,
          meta,
          config,
          sections,
          form,
          bannerParche,
        }
      };

    }
  } else {
    const programData = await getProgramBySlug(programSlug);
    const programLevel = programData?.attributes?.level?.data?.attributes?.title;
    const programDetailSuperior = await getProgramDetailSuperiorPageData();
    const programDetailBachillerato = await getProgramDetailBachillerato();
    return {
      // TODO
      type: "DynamicProgramDetail",
      data: {
        program: { ...programData },
        layout: programLevel === "Bachillerato" ? {...programDetailBachillerato} : {...programDetailSuperior}
      },
    };

  }
  
}

/**
 * PAGES PATHS
 */

export const getBlogEntryPagesPaths = async () => {
  const blogEntryPageData = await getBlogEntryPageData();
  const blogEntryParentSlug = normalizePath(
    blogEntryPageData?.data?.attributes?.slug
  );

  const blogPostsData = await getBlogPosts({ limit: -1 });
  const blogEntriesSlugs = blogPostsData?.blogPosts?.data?.map((blogPost) =>
    normalizePath(blogPost?.attributes?.slug)
  );
  const blogEntriesPaths = blogEntryParentSlug
    ? blogEntriesSlugs
        ?.map((blogEntrySlug) => `${blogEntryParentSlug}/${blogEntrySlug}`)
        ?.filter(isValidPath)
    : [];
  
  return blogEntriesPaths;
}

export const getDynamicPagesPaths = async () => {
  const pagesInfo = await getPagesInfo();
  const pagesPaths = pagesInfo?.map((page) => page?.attributes?.slug);

  // pages with an invalid path format are filtered out and won't be generated at build time
  const dynamicPagesPaths = pagesPaths?.filter(isValidPath);
  
  return dynamicPagesPaths;
}

export const getJSONProgramsPaths = async () => {
  const educationalOfferingParams = Routes["oferta-educativa"];
  const continuousEducationParams = Routes["extension-universitaria"];

  const continuousEducationStaticPageData = await getDataPageFromJSON('extension-universitaria/extension-universitaria.json');
  const continuousEducationStaticCategories = continuousEducationStaticPageData?.sections?.extension?.sections as Array<StaticContinuousEducationCategory>;
  const hiddenContinuousEducationProgramsPaths =
    continuousEducationStaticCategories
      ?.reduce((programs, category) => { // merge all programs from all categories
        return [...programs, ...category?.cursos];
      }, [] as Array<StaticContinuousEducationProgram>)
      ?.filter((program) => program?.hidden)
      ?.map((program) => program?.redirect);

  const paths: Array<string> = [];

  for (const levelParams of educationalOfferingParams){

    const staticProgramsData = await getDataPageFromJSON(`/oferta-educativa/${levelParams?.params?.level}.json`);
    const staticPrograms = staticProgramsData?.programs as Array<StaticProgram>;

    const programsParams = levelParams?.params?.programs;

    for (const program of programsParams){
      const path = `${levelParams?.params?.levelRoute}/${program?.params?.program}`;

      const programSlug = program?.params?.program;
      const isProgramAvailable = !staticPrograms?.find(staticProgram => staticProgram?.route === programSlug)?.config?.hidden

      if (isProgramAvailable) paths?.push(path);
    }
  }

  // Generate paths for every non hidden static Continuous Education program.
  continuousEducationParams?.params?.programs
    ?.filter((program) => {
      return !hiddenContinuousEducationProgramsPaths?.includes(program?.params?.program)
    })
    ?.forEach((program) => {
      const path = `extension-universitaria/${program?.params?.program}`;
      paths?.push(path);
    });

  return paths;
}

export const getDynamicProgramsPaths = async () => {
  const levelsConfig = await getEducationalOfferingConfig();

  const programsPaths: Array<string> = [];

  for (const levelConfig of levelsConfig){
    const levelSlug = levelConfig?.slug;
    const normalizedLevelSlug = normalizePath(levelSlug);
    const level = levelConfig?.level?.data?.attributes?.title;
    const programs = await getProgramsByLevel(level);

    for (const program of programs){
      const programSlug = program?.attributes?.slug;
      const programPath = `${normalizedLevelSlug}/${programSlug}`;
      programsPaths?.push(programPath);
    }
  }

  return programsPaths;
}

export const getProgramDetailPagesPaths = async () => {
  const strapiProgramDetailPagesPaths = await getDynamicProgramsPaths();
  const staticProgramDetailPagesPaths = await getJSONProgramsPaths();

  const paths = [...strapiProgramDetailPagesPaths, ...staticProgramDetailPagesPaths]?.map(normalizePath);
  const set = Array.from(new Set(paths)); // remove duplicates

  return set;
}

/**
 * PAGES BREADCRUMBS
 */

export const getDynamicPagesBreadcrumbs = async () => {
  const breadcrumbs: Record<string, string> = {};

  const pagesInfo = await getPagesInfo();

  pagesInfo?.forEach((page) => {
    const slug = normalizePath(page?.attributes?.slug);
    const pathSegments = slug?.split("/");
    const lastPathSegment = pathSegments?.[pathSegments?.length - 1];

    const breadcrumbLabel = page?.attributes?.breadcrumb || "";

    breadcrumbs[lastPathSegment] = breadcrumbLabel;
  });

  return breadcrumbs;
};