import { Fragment } from "react";
import Head from "next/head";
import ContentGenerator from "@/utils/ContentGenerator";
import type { PageEntity } from "@/utils/getPageData";

const DynamicPageContent = (props: PageEntity) => {
  const pageBlocks = props?.data?.attributes?.sections;

  return (
    <Fragment>
      <Head>
        <title>{props?.data?.attributes?.title}</title>
      </Head>
      <div className="flex flex-col w-p:space-y-12 w-t:space-y-12 w-d:space-y-18">
        {pageBlocks?.length > 0 ? (
          <ContentGenerator blocks={pageBlocks} />
        ) : null}
      </div>
    </Fragment>
  );
};

export default DynamicPageContent;
