import Container from "@/layouts/Container.layout";
import RichtText from "@/old-components/Richtext/Richtext";
import parseEditorRawData from "@/utils/parseEditorRawData";
import type { TextContentSection } from "@/utils/strapi/sections/TextContent";

const TextContent = (props: TextContentSection) => {
  const { title, subtitle, text } = props;
  const richTextMarkup = parseEditorRawData(text);

  return (
    <section className="text-content-section overflow-hidden">
      <Container>
        <div className="mobile:col-span-4 tablet:col-span-8 desktop:col-span-8 flex flex-col space-y-4">
          {
            title
              ? <h1 className="font-headings font-bold leading-tight mobile:text-6 tablet:text-8.5 text-13">
                  {title}
                </h1>
              : null}
          {
            subtitle
              ? <h2 className="font-headings font-bold leading-tight mobile:text-7.5 tablet:text-7.5 text-10">
                  {subtitle}
                </h2>
              : null
          }
          {
            richTextMarkup
              ? <div><RichtText data={{content: richTextMarkup}} classNames="text-xl"/></div>
              : null
          }
        </div>
      </Container>
    </section>
  );
};

export default TextContent;