import Image from "@/types/Image.types";
import classNames from "classnames";
import { LinkIconsConfig } from "./LinkLottus.types";
import RichTextComponentData from "./RichText.types";

export type CardWebsitePortalverseConfig = {
    image: string;
    title?: string;
    subtitle?: string;
    text: string;
    type?: string;
    link: LinkIconsConfig;
    border?: boolean;
    aspect?: string;
    background?: boolean;
    isLink?: boolean;
}

export type CardWebsitePortalverseData = {
    data: CardWebsitePortalverseConfig;
    classNames?: string;
    onClick?: () => void;
}