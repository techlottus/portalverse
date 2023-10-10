import React, { FC, useState } from "react";
import Aspect from "@/components/Aspect";
import Image from "@/old-components/Image";
import Modal from "@/old-components/Modal/Modal";
import RichtText from "@/old-components/Richtext/Richtext";
import parseEditorRawData from "@/utils/parseEditorRawData";
import type { RockstarInfoSection } from "@/utils/strapi/sections/RockstarInfloList";
import { StrapiImage } from "@/types/strapi/common";

const RockstarIcon = ({ className = "" }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="37"
      viewBox="0 0 36 37"
      fill="none"
    >
      <rect y="0.859985" width="36" height="36" rx="8" fill="none" />
      <path
        d="M30 3.85999H6V6.85999L14.715 13.4C12.0701 14.2721 9.87972 16.1587 8.62525 18.6452C7.37077 21.1316 7.15487 24.0144 8.025 26.66C8.45549 27.9705 9.14013 29.1833 10.0398 30.229C10.9394 31.2747 12.0364 32.1328 13.268 32.7542C14.4995 33.3755 15.8415 33.748 17.2172 33.8502C18.5928 33.9525 19.9751 33.7825 21.285 33.35C23.3857 32.6595 25.2148 31.3234 26.5115 29.5323C27.8083 27.7411 28.5064 25.5863 28.5064 23.375C28.5064 21.1637 27.8083 19.0089 26.5115 17.2177C25.2148 15.4265 23.3857 14.0905 21.285 13.4L30 6.85999V3.85999ZM22.41 30.11L18 27.53L13.59 30.11L14.76 25.115L10.875 21.755L15.99 21.32L18 16.61L20.01 21.32L25.125 21.755L21.24 25.115L22.41 30.11Z"
        fill="white"
      />
    </svg>
  );
};

const RockstarImage = (props: { imageURL: string; iconClassName?: string }) => {
  const { imageURL = "", iconClassName = "" } = props;

  return (
    <Aspect ratio={"1/1"}>
      <div className="absolute w-full h-full">
        <Image
          alt={"image"}
          src={imageURL}
          classNamesImg="w-full h-full object-cover rounded-lg"
          classNames="w-full h-full object-cover"
        />
      </div>
      <div className="relative h-full flex justify-end items-end">
        <div className="rounded-lg bg-secondary-500">
          <RockstarIcon className={iconClassName} />
        </div>
      </div>
    </Aspect>
  );
};

const RockstarInfo: FC<RockstarInfoSection> = (props: RockstarInfoSection) => {
  const { name, campus, image, detail } = props;
  const BUSINESS_UNIT = process.env.NEXT_PUBLIC_BUSINESS_UNIT;

  let campusLabel = "Plantel: ";

  if (BUSINESS_UNIT === "UANE" || BUSINESS_UNIT === "ULA") {
    campusLabel = "Campus: ";
  }

  const [isShow, setIsShow] = useState(false);
  const handleVisibilityModal = () => setIsShow(!isShow);

  const handleOpenModal = (content: string) => {
    handleVisibilityModal();
  };

  return (
    <>
      <div>
        <div className="w-d:px-14">
          <div className="border-surface-0 border-4 rounded-xl overflow-hidden">
            <RockstarImage imageURL={image?.data?.attributes?.url} />
          </div>
        </div>
        <div className="flex justify-center">
          <p className="mt-4 font-headings text-5 w-p:text-base font-semibold leading-6 w-p:leading-4">
            {name}
          </p>
        </div>
        <div className="flex justify-center mt-4 text-primary-500">
          <span
            onClick={() => {
              handleOpenModal(detail);
            }}
            className="material-icons cursor-pointer text-6"
          >
            add_circle
          </span>
        </div>
        <div>
          <Modal
            isShow={isShow}
            onClose={handleVisibilityModal}
            data={{
              icon: "close",
              title: "",
              tagOnClose: "testOnClose",
              wrapper: true,
            }}
          >
            <section
              slot="areaModalContent"
              className="flex w-p:flex-col w-t:flex-col w-full h-auto"
            >
              <div className="w-d:w-1/3 w-t:w-1/3 flex flex-col mb-6">
                <div className="w-d:pr-14 w-p:w-1/3">
                  {
                    //@ts-ignore
                    <RockstarImage imageURL={image?.data?.attributes?.url} />
                  }
                </div>
                {name ? (
                  <p className="mt-4 text-6.5 leading-10 w-p:leading-7 w-p:text-6 font-headings">
                    {name}
                  </p>
                ) : null}
                {campus?.data?.attributes?.name ? (
                  <div>
                    <span className="mt-4 font-texts text-sm leading-4 mb-6 text-secondary-500">
                      {campusLabel}
                    </span>
                    <span className="mt-4 font-texts text-sm leading-4">
                      {campus?.data?.attributes?.name}
                    </span>
                  </div>
                ) : null}
              </div>
              <div className="w-d:w-2/3 w-d:pl-11">
                <RichtText
                  data={{
                    content: parseEditorRawData(detail),
                  }}
                />
              </div>
            </section>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default RockstarInfo;
