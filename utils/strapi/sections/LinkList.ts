type Link = {
  text: string;
  href: string;
  target: "self" | "blank";
  iconName: string;
  iconPosition: "left" | "right";
  disabled: boolean;
};

export type LinkListSection = {
  type: "ComponentSectionsLinkList";
  title: string;
  links: Array<Link>;
};

export const LINK_LIST = `
...on ComponentSectionsLinkList {
    title
    links {
      text
      href
      target
      iconName
      iconPosition
      disabled
    }
  }
`;