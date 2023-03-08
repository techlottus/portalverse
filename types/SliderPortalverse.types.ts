export type ItemSliderPortalverse = {
  src: string;
  alt: string;
}

export type ItemsSliderPortalverse = {
  items: Array<ItemSliderPortalverse>;
}

type SliderPortalverseComponentData = {
  classNames?: string;
  classNameSlide?: string;
  data: ItemsSliderPortalverse;
}

export default SliderPortalverseComponentData