import { ElementsConsumer, CardElement } from '@stripe/react-stripe-js';
import React, { Component } from 'react'
import CardSection from './CardSection';
import "./CardSection.css";

class CardComponent extends Component {
  handleSubmit = async (event) => {
    event.preventDefault();
    const { stripe, elements } = this.props;
    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log(result.token);
    }
  }

  render() {
    return (
      <div className='cardcontainer'>
        <form onSubmit={this.handleSubmit}>
          <CardSection />
          <button disabled={!this.props.stripe} className='btn-pay'>Buy Now</button>
        </form>
      </div>
    )
  }
}

export default function InjectCheckout() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CardComponent stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  )
}
