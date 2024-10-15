import classNames from "classnames";
import { FC } from "react"

type footerLogo = {
  onClickLogo: (() => void) | undefined
  position: string
}

const FooterLogo: FC<footerLogo> = ({ onClickLogo, position }: footerLogo) => {

  return (
    <div className={classNames("flex items-center mb-6 cursor-pointer", { 
      'justify-center': position === 'center',
      'justify-end': position === 'right',
      'justify-start': position === 'left',
     })}>
      <div className="w-p:hidden w-36 h-10 bg-logo bg-cover bg-center" onClick={onClickLogo}> </div>
      <div className="w-d:hidden w-t:hidden w-23 h-6 bg-logo bg-cover bg-center" onClick={onClickLogo}> </div>
    </div>
  );
}

export default FooterLogo