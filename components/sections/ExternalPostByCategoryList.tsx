import { FC, useState } from "react";
import { useRouter } from "next/router";
import Container from "@/layouts/Container.layout";
import CardWebsitePortalverse from "@/old-components/CardWebsitePortalverse";
import PaginatorPortalverse from "@/old-components/PaginatorPortalverse";
import RichtText from "@/old-components/Richtext/Richtext";
import type { ExternalPost, ExternalPostListData } from "@/utils/strapi/sections/ExternalPostByCategoryList";
import parseEditorRawData from "@/utils/parseEditorRawData";


const ExternalPostByCategoryList: FC<ExternalPostListData> = (
  props: ExternalPostListData
) => {
  const { title, description, externalPostCategories } = props;

  const router = useRouter();

  const allReducedPosts: ExternalPost[] = externalPostCategories?.data?.reduce((acc, externalPostCategory) => {
    const postsByCategory = externalPostCategory?.attributes?.external_posts?.data?.map(item => item?.attributes);
    return [...acc, ...postsByCategory];
  }, [] as ExternalPost[])

  const filterPost = allReducedPosts?.reduce((acc, post) => {
    const uniquePostUrls = acc?.map((item) => item?.ctaUrl)?.filter((value, index, self) => self.indexOf(value) === index);
   
    if (!uniquePostUrls?.includes(post?.ctaUrl)) {
      return [...acc, post];
    }
    return acc;
  }, [] as ExternalPost[]).sort((a, b) => Date.parse(b.publicationDate) - Date.parse(a.publicationDate));

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };

  const paginate = <T,>(
    items: Array<T>,
    pageNumber: number,
    pageSize: number
  ) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return items?.slice(startIndex, startIndex + pageSize);
  };

  const paginatedItems = paginate(filterPost, currentPage, pageSize);

  return (
    <section>
      <Container>
        <section className="flex flex-col">
          {title ? (
            <div className="mb-6">
              <h3 className="font-headings text-10 font-bold leading-tight w-t:text-8.5 w-p:text-6">
                {title}
              </h3>
            </div>
          ) : null}
          {description ? (
            <div>
              <RichtText
                data={{
                  content: parseEditorRawData(description),
                }}
              />
            </div>
          ) : null}
          {filterPost?.length > 0 ? (
            <div className="grid grid-cols-3 w-t:grid-cols-2 w-p:grid-cols-1 gap-6">
              {paginatedItems?.map((item) => (
                <div>
                  <CardWebsitePortalverse
                    data={{
                      image: item?.featuredImage?.data?.attributes?.url,
                      title: item?.title,
                      subtitle: item?.publicationDate,
                      text: parseEditorRawData(item?.abstract),
                      type: "vertical",
                      link: {
                        text: item?.ctaText,
                        size: "large",
                        isUnderline: false,
                        isBold: false,
                        disabled: false,
                        id: undefined,
                        iconFirst: "",
                        iconSecond: "chevron_right",
                      },
                      border: true,
                      aspect: "",
                      background: true,
                      isLink: true,
                    }}
                    onClick={() => router.push(item?.ctaUrl)}
                  />
                </div>
              ))}
            </div>
          ) : null}
          {filterPost?.length > 9 ? (
            <div className="flex justify-center mt-6 w-p:hidden">
              <PaginatorPortalverse
                items={filterPost?.length}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={onPageChange}
                iconNext={"chevron_right"}
                iconPrevious={"chevron_left"}
              />
            </div>
          ) : null}
        </section>
      </Container>
    </section>
  );
};

export default ExternalPostByCategoryList;
