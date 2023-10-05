import Whatsapp from "@/icons/Whatsapp.svg";


type WhatsappButtonProps = {
  phone?: number;
};


const WhatsappButton = (props: WhatsappButtonProps) => {
  return (
    <>
      {/* mobile button */}
      <a className="w-t:hidden no-underline fixed z-15 bottom-5 left-5 h-13 w-13 bg-[#25d366] rounded-full p-2 text-surface-0!" target="_blank" href={`https://wa.me/${props.phone}`} > <Whatsapp className="text-surface-0 h-9 w-9" alt="" /> </a>
      {/* Desktop button */}
      <a className="w-p:hidden no-underline fixed z-15 bottom-5 left-5 h-13 w-13 bg-[#25d366] rounded-full p-2 text-surface-0!" target="_blank" href={`https://web.whatsapp.com/send?phone=${props.phone}`} ><Whatsapp className="text-surface-0 h-9 w-9" alt="" /></a>
    </>
  );
};

export default WhatsappButton;
