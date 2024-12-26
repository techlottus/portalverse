
const Bot = ( ) => {


  return <>
    <iframe src={`https://webchat.botframework.com/embed/bot-lt-prod-eus-openai-02?s=${process.env.NEXT_PUBLIC_BOT_API_KEY}`} className="w-1/3 p-10 mx-40 min-h-170.75"></iframe>
  </>
};

export default Bot;
