import React from 'react'
import Container from "../../layouts/Container.layout";
import { ContainerTextFormSection } from "../../utils/strapi/sections/ContainerTextForm";
import ContainerForm from './ContainerForm';
import RichtText from '@/old-components/Richtext/Richtext';
import parseEditorRawData from '@/utils/parseEditorRawData';
import classNames from 'classnames';

const ContainerTextForm: React.FC<ContainerTextFormSection> = (props: ContainerTextFormSection) => {
  const {
    title,
    description,
    title_accents,
    outterForm,
    desk,
    mob,
    tab
  } = props;


  const richTextMarkup = parseEditorRawData(description);
  // console.log('title_accents: ', title_accents);
  const accentedTitle = title_accents.length < 1 
    ? title
    : title_accents?.reduce((acc, curr: any) => {
        const base = acc === '' ? title : acc  
        // console.log('base: ', base);
        const accent = curr.accent
        // console.log('accent: ', accent);
        const splitTitle = base.split(accent)
        // console.log('splitTitle: ', splitTitle);
        acc = `${ splitTitle[0] }<span class="text-primary-500">${accent}</span>${ splitTitle[1] }`
        return acc
      }, '')

      const styles: any = {
            "--image-desk-url": `url(${desk?.data?.attributes?.url})`,
            "--image-tablet-url": `url(${tab?.data?.attributes?.url})`,
            "--image-mobile-url": `url(${mob?.data?.attributes?.url})`,
          }

  return <section>
      <Container>
        <div
          style={styles}
          className={classNames(
            "flex items-center justify-around w-full p-16 mobile:flex-col mobile:py-12 mobile:px-6  bg-origin-border md:bg-center bg-no-repeat bg-cover bg-secondary-0",
            "mobile:bg-[image:var(--image-mobile-url)]",
            "tablet:bg-[image:var(--image-tablet-url)]",
            "desktop:bg-[image:var(--image-desk-url)]"
          )}
        >
          <div className="w-6/12 desktop:px-11 mobile:w-full">
            <h3 className='font-headings text-5xl mb-2 font-bold' dangerouslySetInnerHTML={{ __html: accentedTitle }}></h3>
            
  
            <RichtText font="light" data={{content: richTextMarkup}} classNames='text-xl'/>
          </div>
          <div className="w-6/12 mobile:w-full ">
            <ContainerForm {...outterForm}></ContainerForm>
          </div>

        </div>
      </Container>
    </section>
};

export default ContainerTextForm;
