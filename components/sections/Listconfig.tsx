import ListconfigBlogPosts from "@/components/sections/ListconfigBlogPosts";
import ListconfigPodcastItems from "@/components/sections/ListconfigPodcastItems";
import type { ListconfigSection } from "@/utils/strapi/sections/Listconfig";
import ListconfigVacancies from "./ListconfigVacancies";

const Listconfig = (props: ListconfigSection) => {
  const { relatesto } = props;
  switch (relatesto) {
    case "blogentries":
      return <ListconfigBlogPosts {...props} />;
    case "podcasts":
      return <ListconfigPodcastItems {...props} />;
    case "vacancies":
      return <ListconfigVacancies {...props} />;
    default:
      return null;
  }
};

export default Listconfig;
