import { ListconfigSection } from "@/utils/strapi/sections/Listconfig";
import React from "react";
import ListConfigBlogPosts from "./ListConfigBlogPosts";
import ListConfigPodcastItems from "./ListConfigPodcastItems";

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
