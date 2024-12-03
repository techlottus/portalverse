import Container from "@/layouts/Container.layout";
import RichtText from "@/old-components/Richtext/Richtext";
import parseEditorRawData from "@/utils/parseEditorRawData";
import type { TextContentSection } from "@/utils/strapi/sections/TextContent";

const TextContent = (props: TextContentSection) => {
  const { title, subtitle, text } = props;
  const richTextMarkup = parseEditorRawData(text);

  return (
    <section className="text-content-section ">
      <Container>
        <div className="w-p:col-span-4 w-t:col-span-8 w-d:col-span-8 flex flex-col space-y-4 h-fit">
          {
            title
              ? <h1 className="font-headings font-bold desktop:text-10 desktop:leading-10 text-8.5 leading-8.5">
                  {title}
                </h1>
              : null}
          {
            subtitle
              ? <h2 className="font-headings font-semibold desktop:text-5.5 leading-5.5 text-4.5 leading-4.5">
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