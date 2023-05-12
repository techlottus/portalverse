import { fetchStrapiGraphQL } from "@/utils/getStrapi";

export default function Page(props: any) {
  return (
    <main>
      <h1>This is a dynamically generated page from Strapi! :) uwu :3</h1>
    </main>
  );
}

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

  return {
    props: {},
  };
}

const isValidPath = (path: string) => {
  return !!path && !path?.includes("//");
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
    slug: string;
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
