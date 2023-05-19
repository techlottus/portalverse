import type { FC } from "react";

type ParagraphProps = {
  content: string;
  className?: string;
};

const Paragraph: FC<ParagraphProps> = (props: ParagraphProps) => {
  const {
    content,
    className = "",
  } = props;

  return (
    <p className={className}>
      {content}
    </p>
  );
};

export default Paragraph;