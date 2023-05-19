export type LinkList = {
  text: string;
  iconName: string;
  iconPosition: string;
  href: string;
  target: string;
  disabled: boolean;
};

export type LinkListSection = {
  __typename: "ComponentSectionsLinkList";
  title: string;
  links: Array<LinkList>;
};

export const LINK_LIST = `
...on ComponentSectionsLinkList {
    __typename
    title
    links {
      text
      iconName
      iconPosition
      href
      target
      disabled
    }
  }
`;