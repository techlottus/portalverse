import ListConfigBlogPosts from "@/components/sections/ListConfigBlogPosts";
import ListConfigPodcastItems from "@/components/sections/ListConfigPodcastItems";
import type { ListconfigSection } from "@/utils/strapi/sections/Listconfig";

const ListConfig = (props: ListconfigSection) => {
  const { relatesto } = props;
  switch (relatesto) {
    case "blogentries":
      return <ListConfigBlogPosts {...props} />;
    case "podcasts":
      return <ListConfigPodcastItems {...props} />;
    default:
      return null;
  }
};

export default ListConfig;
