import Container from "@/layouts/Container.layout";
import type { TextContentSection } from "@/utils/strapi/sections/TextContent";

const TextContent = (props: TextContentSection) => {
  const { title, subtitle, text } = props;

  return (
    <section>
      <Container>
        <div className="grid w-p:grid-cols-4 w-t:grid-cols-8 w-d:grid-cols-12">
          <div className="w-p:col-span-4 w-t:col-span-8 w-d:col-span-8 flex flex-col space-y-4">
            {
              title
                ? <h3 className="font-Poppins font-bold leading-[125%] w-p:text-6 w-t:text-8.5 text-10">
                    {title}
                  </h3>
                : null}
            {
              subtitle
                ? <p className="font-Poppins font-semibold leading-[130%] w-p:text-4 w-t:text-4.5 text-5.5">
                    {subtitle}
                  </p>
                : null
            }
            {
              text
                ? <div className="break-words">{text}</div>
                : null
            }
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TextContent;
