import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_KEY?.toString()
//@ts-ignore
const stripePromise = loadStripe(stripePublicKey);

const PaymentForm = () => {
  const [loading, setLoading] = useState(false);
  const [url, seturl] = useState('');
  // const stripe =  stripePromise;

  const handleCheckout = async () => {
    setLoading(true);
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }    });

    const { clientSecret } = await response.json();
    seturl(clientSecret)
    console.log(response)
    //@ts-ignore
    // const { url } = await stripe?.redirectToCheckout({ sessionId });
  
    setLoading(false);
  };
  handleCheckout()

  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={{clientSecret:url}}>
     <EmbeddedCheckout/>
    </EmbeddedCheckoutProvider>
   
  );
};

export default PaymentForm;