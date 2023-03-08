export type AccordionItemConfig = {
  /**
   * icon text
   */
  icon: string;
  /**
   * accordion title
   */
  title: string;
  /**
   * icon text
   */
  iconArrow: string;
  /**
   * accordion text
   */
  text: string;
  /**
   * accordion content
   */
  content: string;
  /**
   * accordion identifier
   */
  id: string;
}

export type AccordionComponentConfig =  {
  items: Array<AccordionItemConfig>;
}

type AccordionComponentData = {
  data: AccordionComponentConfig
}

export default AccordionComponentData
