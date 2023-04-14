export enum CarouselType {
  CARD = "CARD",
  IMAGE = "IMAGE"
}

export type CarouselProps = {
  data: any;
  type: CarouselType;
}