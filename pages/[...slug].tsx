import { Fragment } from "react";
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout";
import ContentGenerator from "@/utils/ContentGenerator";
import { fetchStrapiGraphQL } from "@/utils/getStrapi";
import type { ReactElement } from "react";
import type { Block } from "@/utils/ContentGenerator";

const Page = (props: PageData) => {
  const {
    attributes
  } = props;

  const pageBlocks = attributes?.blocks;

  return (
    <Fragment>
      {
        pageBlocks?.length > 0 ?
          <ContentGenerator
            blocks={pageBlocks}
          />
        : null
      }
    </Fragment>
  );
};

Page.getLayout = (page: ReactElement) => {
  return (
    <HeaderFooterLayout>
      {page}
    </HeaderFooterLayout>
  );
};

export default Page;

export async function getStaticPaths() {
  const pagesPaths = await getPagesPaths();

  return {
    paths: pagesPaths.map((path) => ({
      params: { slug: path?.split("/") },
    })),
    fallback: false, // can also be true or 'blocking'
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any) {
  const {
    params: { slug },
  } = context;

  const dummyPageData = getDummyPageData();

  return {
    props: {...dummyPageData},
    revalidate: 60
  };
}

const isValidPath = (path: string) => {
  return !!path.trim() && !path?.includes("//") && !path?.includes(" ");
};

// https://stackoverflow.com/questions/19134860/javascript-remove-strings-in-beginning-and-end
const normalizePath = (path: string) => path?.replace(/(^\/+|\/+$)/gm, "");

const getPagesData = async () => {
  const pagesData = await fetchStrapiGraphQL<PagesData>(PAGES);
  return pagesData;
};

const getPagesPaths = async () => {
  const pagesData = await getPagesData();
  const pagesPaths = pagesData?.pages?.data?.map(
    (page) => page?.attributes?.slug
  );

  // pages with an invalid path format are filtered out and won't be generated at build time
  return pagesPaths?.filter(isValidPath)?.map(normalizePath);
};

type PageData = {
  attributes: {
    title: string;
    slug: string;
    blocks: Block[]; // Sections or components
  };
};

type PagesData = {
  pages: {
    data: Array<PageData>;
  };
};

const PAGES = `
query Pages {
  pages {
    data {
      attributes {
        slug
      }
    }
  }
}
`;

const getDummyPageData = () => {
  return {
    attributes: {
      title: "My first test page",
      slug: "hola/test",
      blocks: [
        {
          type: "paragraph",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
      ] 
    }
  };
};