// Importa Stripe y configura tu clave secreta
const stripe = require('stripe')(process.env.NEXT_SECRET_STRIPE_KEY);
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(  
  req: NextApiRequest ,
  res: NextApiResponse) {
  const amount = req.body.amount * 100;
  console.log("amount",amount)
  if (req.method === 'POST') {
    try {
      // Aquí defines el monto, la moneda y cualquier otra configuración
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount, // El monto en centavos (1099 = 10.99 USD)
        currency: 'mxn',
        automatic_payment_methods: {
          enabled: true,
        },
      });

      // Devuelve el client_secret al frontend
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
