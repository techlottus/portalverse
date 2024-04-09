import React from 'react'
import Container from "../../layouts/Container.layout";
import { TextFormSection } from "../../utils/strapi/sections/TextForm";
import ContainerForm from './ContainerForm';
import RichtText from '@/old-components/Richtext/Richtext';
import Editor from '@/old-components/Editor/Editor';
import parseEditorRawData from '@/utils/parseEditorRawData';
import classNames from 'classnames';

const TextForm: React.FC<TextFormSection> = (props: TextFormSection) => {
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
        acc = `${ splitTitle[0] }<span class="text-primary-500">${accent} </span>${ splitTitle[1] }`
        return acc
      }, '')
      // console.log('accentedTitle: ', accentedTitle);
      // title_accents?.reduce((acc, accent: any) => {
      //   const base = acc.toString() === '<></>' ? title : acc.toString()
      //   console.log('base: ', base);
      //   console.log('accent: ', accent);
      //   const splitTitle = base.split(accent)
      //   console.log('splitTitle: ', splitTitle);
      //   return <h3> <p>{ splitTitle[0] }</p><span className="text-primary-500">{accent}</span><p>{ splitTitle[1] }</p></h3>
      // }, <></>)
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
          "flex items-center justify-around w-full  p-16 bg-origin-border md:bg-center bg-no-repeat bg-cover bg-secondary-0",
      
          "mobile:bg-[image:var(--image-mobile-url)]",
          "tablet:bg-[image:var(--image-tablet-url)]",
          "desktop:bg-[image:var(--image-desk-url)]"
          )}>
          <div className="w-6/12 px-11">
            <h3 className='font-headings text-5xl mb-2 font-bold' dangerouslySetInnerHTML={{ __html: accentedTitle }}></h3>
            
  
            <RichtText font="light" data={{content: richTextMarkup}} classNames='text-xl'/>
          </div>
          <div className="w-6/12">
            <ContainerForm {...outterForm}></ContainerForm>
          </div>

        </div>
        {/* <div className="grid grid-cols-12-gap w-t:grid-cols-8-gap w-p:grid-cols-4-gap gap-grid-gap">
          <div className="col-span-6 w-t:col-span-8 w-p:col-span-4">
            
            <ContainerForm {...form}></ContainerForm>
          </div>
        </div> */}
      </Container>
    </section>
};

export default TextForm;
