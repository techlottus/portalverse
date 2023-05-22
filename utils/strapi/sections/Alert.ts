type AlertLink = {
  text: string;
  href: string;
  target: "self" | "blank";
  iconName: string;
  iconPosition: "left" | "right";
  disabled: boolean;
};

export type AlertSection = {
  type: "ComponentSectionsAlert";
  title: string;
  text: string;
  links: Array<AlertLink>;
  iconName: string;
};

export const ALERT = `
  ...on ComponentSectionsAlert {
    title
    text
    links {
      text
      href
      target
      iconName
      iconPosition
      disabled
    }
    iconName
  }
  `;
