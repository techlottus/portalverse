export type AlertConfig = {
    iconLeft?: string;
    iconContact?: string;
    title?: string;
    text: string;
    linkText?: string;
    redirect?: string;
  }

  
  export type AlertData = {
    data: AlertConfig;
    onClick?: () => void;
  }