import { OustandingModuleConfig } from "@/types/OustandingModule.types";

export type CardsOstandingConfig = {
  cards: Array<OustandingModuleConfig>;
  title?: string;
}

export type CardsOstandingData = {
  data: CardsOstandingConfig;
}