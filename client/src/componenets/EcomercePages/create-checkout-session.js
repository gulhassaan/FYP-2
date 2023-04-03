// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51MhrdhHP8xthSvwoYB5uApAf6Gs3Wd2v5EkHm7XYWS3EfDCFDQUFuxOxnoB5vCCHPyF8RgIgOUAqXIFn0BVaIWxI00r7kPF0i6')

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000/home',
    cancel_url: 'http://localhost:3000/home',
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log(`Listening on port ${4242}!`));