import React, { FC, Fragment } from "react";
import defaultRenderers from "@/utils/Renderers";

export type Block = {
  id?: string;
  type: string;
  data?: any;
};

type ContentGeneratorProps = {
  className?: string;
  blocks?: Block[];
};

const ContentGenerator: React.FC<ContentGeneratorProps> = (props) => {
  const {
    blocks = []
  } = props;

  return (
    <Fragment>
      {
        blocks?.map((block, index) => {
          const Tag = defaultRenderers[block?.type] || null;
          return Tag ? <Tag key={index} {...block} /> : null;
        })
      }
    </Fragment>
  );
};

export default ContentGenerator;