import CardWebsitePortalverse from "@/old-components/CardWebsitePortalverse";
import { CardWebsitePortalverseConfig, CardWebsitePortalverseData } from "@/types/CardWebsitePortalverse.types";
import { BlogPost } from "@/utils/getBlogPosts";
import { formatStrapiImage } from "@/utils/strapi";
import { Replace } from "@/utils/typescript";

const formatData = (props: BlogPostCardWrapperProps): CardWebsitePortalverseConfig  => {
  const { data: strapiData } = props;

  const blogPostData = strapiData?.attributes;

  const formattedData: CardWebsitePortalverseConfig = {
    image: formatStrapiImage(blogPostData?.featured_image),
    text: blogPostData?.abstract || "",
    title: blogPostData?.title,
    subtitle: blogPostData?.publication_date?.replaceAll("-", "/"),
    type: "vertical",
    isLink: true,
    border: true,
    link: {
      text: "Ver más",
      size: "small",
      isUnderline: false,
      isBold: true,
      disabled: false,
      id: "",
      iconFirst: "",
      iconSecond: "chevron_right",
    },
  };

  return formattedData;
}

type BlogPostCardWrapperProps = Replace<
  CardWebsitePortalverseData,
  "data",
  BlogPost
>

const BlogPostCardWrapper = (props: BlogPostCardWrapperProps) => {
  
  const formattedData = formatData(props);

  return <CardWebsitePortalverse {...props} data={formattedData} />;
};

export default BlogPostCardWrapper;
