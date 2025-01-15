
const Bot = ( ) => {


  return <>
    <iframe src={`https://webchat.botframework.com/embed/bot-lt-prod-eus-openai-02?s=${process.env.NEXT_PUBLIC_BOT_API_KEY}`} className="desktop:w-1/3 p-10 desktop:mx-40 h-170.75 mobile:w-full"></iframe>
  </>
};

export default Bot;
