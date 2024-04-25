import { useState, Fragment } from "react";
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
import Cintillo from "@/old-components/Cintillo";
import { getDataPageFromJSON } from "@/utils/getDataPage";
import { Dialog, Transition } from '@headlessui/react'
import { DoubleDegreeForm } from "@/forms/container/DoubleDegreeForm";
import Button from "@/old-components/Button/Button";
import WebError, { WebErrorComponent } from "@/components/sections/WebError";
import Link from "next/link";
import Aspect from "@/components/Aspect";

const Campus = ({ sections, meta, prefilledData, options, }: any) => {

  const BUSINESS_UNIT = process.env.NEXT_PUBLIC_BUSINESS_UNIT;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [coordsMap, setCoordsMap] = useState<any>(null);
  const [infoMap, setInfoMap] = useState<string>("");
  const [currentError, setCurrentError] = useState<WebErrorComponent | null>(null);
  const [isShow, setIsShow] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const setStatus = ({ loading, error, valid, success }: { loading: boolean, error: string, valid: boolean, success: boolean }) => {
    setIsLoading(loading)
    setError(error)
    setIsValid(valid)
    setIsSuccess(success)
  }

  const handleVisibilityModal = () => {
    if (isShow) {
      if (isShow) {
        setCoordsMap(null); setCoordsMap(null);
        setInfoMap(""); setInfoMap("");
      }
    }
    setIsShow(!isShow); setIsShow(!isShow);
  };

  const handleOpenModal = (coords: any, title: string) => {
    setCoordsMap(coords); setCoordsMap(coords);
    setInfoMap(title); setInfoMap(title);
    handleVisibilityModal(); handleVisibilityModal();
  };

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <Head>
        <title>{meta?.title}</title>
      </Head>
      <>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <div className="flex justify-end">
                      <p className="material-symbols-outlined font-normal select-none mr-1 cursor-pointer" onClick={closeModal} >
                        close
                      </p>
                    </div>
                    <section className="bg-surface-0 relative" >
                      {
                        isLoading
                          ? <div className="absolute w-full h-full z-10 flex justify-center items-center left-0 top-0 bg-surface-0">
                            <Image src="/images/loader.gif" alt="loader" classNames={cn("w-10 h-10 top-0 left-0")} />
                          </div>
                          : null
                      }
                      {
                        !!error
                          ? <WebError {...currentError}></WebError>
                          : <section>
                            <div className="flex gap-6">
                              <div className="flex flex-col gap-6">
                                <h1 className="font-texts font-bold text-5 leading-6">Agenda tu visita</h1>
                                <p className="font-texts font-normal text-3.5 leading-4">¡Descubre las instalaciones de {BUSINESS_UNIT} y conoce sus Happy Spaces!</p>
                              </div>
                              <div className="w-p:hidden">
                                <Image classNamesImg="w-full h-full object-cover" classNames="w-28 h-28 rounded-full overflow-hidden" src="" alt="" />
                              </div>
                            </div>
                            <div className="flex align-middle items-center mt-8 mb-6">
                              <p className="text-3.5 leading-5 text-surface-800 font-texts font-normal mr-1">Al llenar tus datos aceptas nuestro</p>
                              <Link href="" passHref target={"_blank"}>
                                <p className="text-3.5 font-texts font-normal text-sm text-surface-800 underline">Aviso de privacidad</p>
                              </Link>
                            </div>
                            {/* {
                              (!!progress && progress > 0) && <div className="mb-6">
                                <ProgressBar data={{ progress }} />
                              </div>
                            } */}
                            <DoubleDegreeForm prefilledData={prefilledData} options={options} submit={submit} setStatus={setStatus} />
                            <div className="mt-6">
                              <Button darkOutlined={true} dark={true}
                                data={{
                                  title: "Solicitar información",
                                  icon: "",
                                  isExpand: false,
                                  disabled: !isValid
                                }}
                                onClick={() => {
                                  setSubmit(true);
                                  setTimeout(() => {

                                    setSubmit(false)
                                  }, 100);
                                }}
                              />
                            </div>
                          </section>

                      }
                    </section>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
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
                  <div className="col-span-12 ">
                    <p className="font-headings font-bold text-center text-10 w-t:text-6 w-p:text-6 leading-[125%]">
                      {item?.title}
                    </p>
                  </div>
                  <section className="col-span-12 grid grid-cols-2 gap-6 w-t:grid-cols-1 w-p:grid-cols-1 w-d:mb-[72px] w-t:mb-[72px] w-p:mb-[32px]">
                    {item?.campus?.map(
                      (
                        { title, coords, description, images: items }: any,
                        i: number
                      ) => (
                        <div className="flex w-p:flex-col" key={item.name}>
                          <div className="p-6 w-3/5 grid gap-y-2 border border-surface-300 w-d:rounded-l-lg w-t:rounded-l-lg w-p:rounded-t-lg w-p:w-full">
                            <p className="font-texts font-bold text-sm leading-5 text-surface-500">
                              {description?.state}
                            </p>
                            {
                              description?.redirect
                                ?
                                <div className="flex items-center">
                                  <a href={description?.redirect} target="_blank" rel="noreferrer noopener" className={cn("font-headings font-semibold underline text-4.5 leading-5.625", {
                                    "hover:underline": description?.redirect,
                                  })}>
                                    {description?.name}
                                  </a>
                                  <span className="text-primary-400 material-symbols-outlined select-non !text-lg ms-1">open_in_new</span>
                                </div>
                                : <p className="font-headings font-bold text-4.5 leading-5.625">{description?.name}</p>
                            }
                            <ContentInsideLayout>
                              {/* 
                              <IconComponent
                                name="marker"
                                className="col-span-1 w-t:col-span-1 w-p:col-span-1"
                              /> 
                              */}
                              <p className="col-span-11  w-t:col-span-7 font-texts font-normal text-sm text-surface-500">
                                {description?.address}
                              </p>
                            </ContentInsideLayout>
                            {
                              description?.phone ?
                                <ContentInsideLayout classNames="items-center">
                                  {/* <IconComponent
                                    name="phone"
                                    className={cn(
                                      "col-span-1 w-t:col-span-1 w-p:col-span-1 w-4 mt-2",
                                      { hidden: !description?.phone }
                                    )}
                                  /> */}
                                  <LinkContactTarget
                                    type="phone"
                                    info={description?.phone}
                                    alternativeText={"Tel. " + description?.phone}
                                    classNames="col-span-11 text-sm w-t:col-span-7 w-p:col-span-3 underline text-surface-900"
                                  />
                                </ContentInsideLayout>
                                : null
                            }
                            {
                              /* description?.email ?
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
                                : null */
                            }
                            {
                              description?.link ?
                                <ContentInsideLayout classNames="items-center">
                                  <span className="material-symbols-outlined col-span-1 w-t:col-span-1 w-p:col-span-1 w-4 mt-2 text-surface-500 select-none">{description?.link?.icon}</span>
                                  <span className="col-span-11 w-t:col-span-7 w-p:col-span-3 mt-2 font-texts font-normal text-base leading-5 text-surface-500"><a className="hover:underline" target="_blank" rel="noreferrer noopener" href={description?.link?.redirect}>{description?.link?.text}</a></span>
                                </ContentInsideLayout>
                                : null
                            }
                            {/* 
                            <div className="items-center flex">
                              <p className="text-primary-400 font-bold cursor-pointer" onClick={openModal}>
                                Agendar visita
                              </p>
                              <span className="text-primary-400 material-symbols-outlined select-non !text-lg ms-1">calendar_month</span>
                            </div> 
                            */}
                            <div className="flex justify-end items-center pr-3">
                              <p className="font-texts font-normal hover:cursor-pointer" onClick={() => handleOpenModal(coords, title)}>
                                Ver mapa
                              </p>
                              <IconComponent name="eye" className="ml-1 w-4" />
                            </div>
                          </div>
                          <div className="w-2/5 h-full w-p:w-full">
                            <img className="w-full h-full w-d:rounded-r-lg w-t:rounded-r-lg w-d:aspect-1/1 object-cover w-t:object-fill aspect-3/2 w-p:rounded-b-lg" alt={items[0]?.alt}
                              src={items[0]?.src} />
                          </div>
                        </div>
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
