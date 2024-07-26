import OpenForm from "@/forms/container/OpenForm";
import Container from "@/layouts/Container.layout";
import Video from "@/old-components/Video";
import type { FormVideoSection } from "@/utils/strapi/sections/FormVideo";

const FormVideo = (props: FormVideoSection) => {
  const {
    formTitle,
    formDescription,
    privacyPolicyText,
    privacyPolicy,
    formImage,
    videoTitle,
    youtubeId,
  } = props;

  return (
    <section>
      <Container>
        <div className="grid grid-cols-12-gap w-t:grid-cols-8-gap w-p:grid-cols-4-gap gap-grid-gap">
          <div className="col-span-6 w-t:col-span-8 w-p:col-span-4">
            <OpenForm
              config={{
                title: formTitle,
                subtitle: formDescription,
                conditions: privacyPolicyText,
                privacyLink: {
                  link: privacyPolicy?.data?.attributes?.url || "",
                  label: "Aviso de Privacidad",
                },
              }}
              pathThankyou={`/thank-you`}
              image={{
                src: formImage?.data?.attributes?.url,
                alt: formImage?.data?.attributes?.alternativeText || "image-person",
              }}
            />
          </div>
          <div className="col-span-6 w-t:col-span-8 w-p:col-span-4">
            <h4 className="mb-6 font-headings font-semibold text-5.5 w-p:text-6">
              {videoTitle}
            </h4>
            {
              <div className="h-80">
                <Video
                  data={{ options: { id: youtubeId, type: "", controls: true } }}
                />
              </div>
            }
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FormVideo;
