
import { FC } from "react";
import cn from "classnames";
import RichTextImage from "@/components/sections/RichTextImage";
import type { RichTextImageBgImageSection } from "@/utils/strapi/sections/RichTextImageBgImage";

const RichTextImageBgImage: FC<RichTextImageBgImageSection> = (props: RichTextImageBgImageSection) => {

	const { desktopBgImage, tabletBgImage, mobileBgImage, RichTextImageComponent } = props;

	return (
		// @ts-ignore
		<div div style={{ "--image-desk-url": `url(${desktopBgImage?.data?.attributes?.url})`, "--image-tablet-url": `url(${tabletBgImage?.data?.attributes?.url})`, "--image-mobile-url": `url(${mobileBgImage?.data?.attributes?.url})` }}
			className={cn("w-full justify-center bg-origin-border md:bg-center bg-no-repeat bg-cover bg-secondary-0 py-24", "bg-[image:var(--image-mobile-url)]", "md:bg-[image:var(--image-tablet-url)]", "lg:bg-[image:var(--image-desk-url)]" )}>
				<RichTextImage {...RichTextImageComponent} />
		</div>
	);
}

export default RichTextImageBgImage