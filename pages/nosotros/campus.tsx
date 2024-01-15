import { useState } from "react";
import Head from "next/head";
import cn from "classnames";
import IconComponent from "@/old-components/Icon";
import Image from "@/old-components/Image";
import Map from "@/old-components/Map";
import ContentLayout from "@/layouts/Content.layout";
import ContentInsideLayout from "@/layouts/ContentInside.layout";
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout";
import LinkContactTarget from "@/old-components/LinkContactTarget";
import Modal from "@/old-components/Modal/Modal";
import ContentFullLayout from "@/layouts/ContentFull.layout";
import BannerPortalverse from "@/old-components/BannerPortalverse";
import { getDataPageFromJSON } from "@/utils/getDataPage";
import Cintillo from "@/old-components/Cintillo";

const Campus = ({ sections, meta }: any) => {

  // Modal functionality begin
  const [isShow, setIsShow] = useState(false);
  const handleVisibilityModal = () => {
    if (isShow) {
      setCoordsMap(null);
      setInfoMap("");
    }
    setIsShow(!isShow);
  };
  // Modal functionality end

  const [coordsMap, setCoordsMap] = useState<any>(null);
  const [infoMap, setInfoMap] = useState<string>("");

  const handleOpenModal = (coords: any, title: string) => {
    setCoordsMap(coords);
    setInfoMap(title);
    handleVisibilityModal();
  };

  return (
    <>
      <Head>
        <title>{meta?.title}</title>
      </Head>
      <HeaderFooterLayout>
        <ContentFullLayout classNames="w-d:hidden w-t:col-span-8 w-p:col-span-4">
          <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-d:hidden">
            <BannerPortalverse data={sections?.head?.banner} />
          </div>
        </ContentFullLayout>
        <ContentLayout>
          <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-t:hidden w-p:hidden">
            <BannerPortalverse data={sections?.head?.banner} />
          </div>
          <Modal
            isShow={isShow}
            onClose={handleVisibilityModal}
            data={{
              icon: "close",
              title: infoMap,
              tagOnClose: "testOnClose",
              wrapper: true,
            }}
          >
            {!!coordsMap ? (
              <Map
                coords={coordsMap}
                zoom={15}
                scroll
                classNamesMap="w-d:h-[583px] w-t:h-[581px] w-p:h-[355px] w-[100%]"
              >
                {({ TileLayer, Marker, Popup }: any) => (
                  <>
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={coordsMap}>
                      <Popup>
                        <b>{infoMap}</b>
                      </Popup>
                    </Marker>
                  </>
                )}
              </Map>
            ) : null}
          </Modal>
          <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
            <Image
              alt="campus"
              src="https://viveloensaltillo.com/wp-content/uploads/2021/11/1254x851usne-768x521.png"
            ></Image>
          </div>
          <section className="col-span-12 w-t:col-span-8 w-p:col-span-4">
            {sections?.planteles?.sections?.map((item: any, i: number) => (
              <>
                <ContentLayout>
                  <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
                    <p className="font-headings font-bold text-10 w-t:text-6 w-p:text-6 leading-[125%]">
                      {item?.title}
                    </p>
                  </div>
                  <section className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-d:mb-[72px]">
                    {item?.campus?.map(
                      (
                        { title, coords, description, images: items }: any,
                        i: number
                      ) => (
                        <ContentInsideLayout
                          classNames="mb-8"
                          key={`campus-data-${i}`}
                        >
                          <Image
                            classNames="col-span-4 w-t:col-span-4 w-p:col-span-4 w-p:aspect-2/1"
                            alt={items[0]?.alt}
                            src={items[0]?.src}
                          />
                          <div className="col-span-4 border w-t:col-span-4 w-p:col-span-4 border-gray-300 rounded pl-3">
                            <p className="font-texts font-normal text-base leading-5 my-2">
                              {description?.state}
                            </p>
                            {
                              description?.redirect
                                ? <a href={description?.redirect} className={cn("font-headings font-semibold text-4.5 leading-5.625 my-2", {
                                  "hover:underline": description?.redirect,
                                })}>
                                  {description?.name}
                                </a>
                                : <p className="font-headings font-semibold text-4.5 leading-5.625 my-2">{description?.name}</p>
                            }
                            <ContentInsideLayout>
                              <IconComponent
                                name="marker"
                                className="col-span-1 w-t:col-span-1 w-p:col-span-1"
                              />
                              <p className="col-span-11 w-t:col-span-7 w-p:col-span-3 font-texts font-normal">
                                {description?.address}
                              </p>
                            </ContentInsideLayout>
                            {
                              description?.phone ?
                                <ContentInsideLayout classNames="items-center">
                                  <IconComponent
                                    name="phone"
                                    className={cn(
                                      "col-span-1 w-t:col-span-1 w-p:col-span-1 w-4 mt-2",
                                      { hidden: !description?.phone }
                                    )}
                                  />
                                  <LinkContactTarget
                                    type="phone"
                                    info={description?.phone}
                                    classNames="col-span-11 w-t:col-span-7 w-p:col-span-3 mt-2"
                                  />
                                </ContentInsideLayout>
                                : null
                            }
                            {
                              description?.email ?
                                <ContentInsideLayout classNames="items-center">
                                  <IconComponent
                                    name="email"
                                    className={cn(
                                      "col-span-1 w-t:col-span-1 w-p:col-span-1 w-4 mt-2",
                                      { hidden: !description?.email }
                                    )}
                                  />
                                  <LinkContactTarget
                                    type="email"
                                    alternativeText={description?.alternativeText}
                                    info={description?.email}
                                    classNames="col-span-11 w-t:col-span-7 w-p:col-span-3 mt-2"
                                  />
                                </ContentInsideLayout>
                                : null
                            }
                            {
                              description?.link ?
                                <ContentInsideLayout classNames="items-center">
                                  <span className="material-symbols-outlined col-span-1 w-t:col-span-1 w-p:col-span-1 w-4 mt-2 text-surface-500">{description?.link?.icon}</span>
                                  <span className="col-span-11 w-t:col-span-7 w-p:col-span-3 mt-2 font-texts font-normal text-base leading-5 text-surface-500"><a className="hover:underline" target="_blank" rel="noreferrer noopener" href={description?.link?.redirect}>{description?.link?.text}</a></span>
                                </ContentInsideLayout>
                                : null
                            }
                            <div
                              className="flex justify-end pr-3"
                            >
                              <p className="font-texts font-normal hover:cursor-pointer" onClick={() => handleOpenModal(coords, title)}>
                                Ver mapa
                              </p>
                              <IconComponent name="eye" className="ml-1 w-4" />
                            </div>
                          </div>
                          <Map
                            coords={coords}
                            classNames="w-t:hidden w-p:hidden col-span-4 w-t:col-span-3 w-p:col-span-4"
                            classNamesMap="h-[214px]"
                          >
                            {({ TileLayer, Marker, Popup }: any) => (
                              <>
                                <TileLayer
                                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={coords}>
                                  <Popup>
                                    <b>{description.name}</b>
                                  </Popup>
                                </Marker>
                              </>
                            )}
                          </Map>
                        </ContentInsideLayout>
                      )
                    )}
                  </section>
                </ContentLayout>
              </>
            ))}
          </section>
          <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
            <Cintillo
              {...sections?.banner}
            />
          </div>
        </ContentLayout>
      </HeaderFooterLayout>
    </>
  );
};

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any) {

  try {
    const { sections, meta } = await getDataPageFromJSON("campus.json");

    return {
      props: { sections, meta },
    };
  } catch {
    return {
      notFound: true,
    };
  }

};

export default Campus;
