import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import './App.css';
import InjectCheckout from './CardComponent/CardComponent';
/*PUBLIC API KEY - STRIPE*/
const stripePromise =loadStripe("pk_test_51MksRnJ07oWG4xgpKtfY4jynoSxIt9lQygZGvftw7v6jwm3KAnIa8w4rOvWLHFjmw91UewfcEp4aVQYM6Ncgpw2p00MhtLcXwp");
function App() {
  console.log(stripePromise)
  return (
    <div className="App">
      <div className='product'>
        <Elements stripe={stripePromise}>
<InjectCheckout/>
        </Elements>
      </div>
    </div>
  );
}

export default App;
