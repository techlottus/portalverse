import { TestimonialCardData } from "@/types/TestimonialCard";
import { StrapiImage } from "@/types/strapi/common";

export type TestimonialSliderData = {
  title: string;
  description: string;
  bgImageDesktop: StrapiImage;
  bgImageTablet: StrapiImage;
  bgImageMobile: StrapiImage;
  testimonialsCards: Array<TestimonialCardData>
}
