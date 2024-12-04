// pages/api/create-checkout-session.js
import Stripe from 'stripe';
import type { NextApiRequest, NextApiResponse } from "next";

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);
console.log('secret stripe: ',`${process.env.STRIPE_SECRET_KEY}`)

export default async function handler(req: NextApiRequest ,
  res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        ui_mode:'embedded',
        payment_method_types: ['card','oxxo'],
        line_items: [
          {
            price: 'price_1OXTusF5JHugNzfe91Kg3gPI', // Usa el Price ID especificado en el backend
            quantity: 1,
          }
        ],
        mode: 'payment',
        return_url: `${req.headers.origin}/thank-you`,
        metadata:{},
        allow_promotion_codes: true
    
        
        // cancel_url: `${req.headers.origin}/cancel`,
        // billing_address_collection: 'required', 
        // discounts: [
        //   { coupon: 'coupon_xxxxxxx' },
        // ],
      });

      res.status(200).json({ clientSecret: session.client_secret });
    } catch (error) {
      //@ts-ignore
      res.status(500).json({ error: error?.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
