export type EgresadosConfig = {
  [key: string]: string;
}

type EgresadosStepComponentData = {
  data?: EgresadosConfig;
  classNames?: string;
  enrollment?: string;
  path?: string;
  onNext?: (enrollment: string) => void; 
}

export default EgresadosStepComponentData