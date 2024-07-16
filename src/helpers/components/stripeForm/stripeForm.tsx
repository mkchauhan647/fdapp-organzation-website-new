import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useRouter } from 'next/navigation';
import React from 'react'

function StripeForm() {
  const stripe = useStripe()
  const elements = useElements();
  const router = useRouter()

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if(!stripe || !elements){
      return
    }
    const result = await stripe.confirmPayment({
      elements,
      confirmParams : {
        // return_url:'http://127.0.0.1:3000/success'
        return_url:'https://votingweb.vercel.app/success'
      }
    })
    if(result.error){
      router.push('/error')
    }
  }

  return (
    <form id='stripe-payment-form' onSubmit={handleSubmit}>
      <PaymentElement />
      <div className="w-1/3">
        <button className="bg-[var(--c-primary)] text-white rounded mt-4 py-2 px-4 w-fit" disabled={!stripe}>Submit</button>
      </div>
  </form>
  )
}

export default StripeForm