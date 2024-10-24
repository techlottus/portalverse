export type Link = {
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
    links(pagination: {start: 0, limit: -1}) {
      text
      href
      target
      iconName
      iconPosition
      disabled
    }
  }
`;