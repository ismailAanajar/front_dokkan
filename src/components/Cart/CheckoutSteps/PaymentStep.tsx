import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import dropin, { Dropin } from 'braintree-web-drop-in';

import Button from '@dokkan/components/Button';

import StepLayout from './stepLayout';

function PaymentStep({setStep}: {setStep:(step:'cart') => void}) {

  const [braintreeInstance, setBraintreeInstance] = useState<Dropin | undefined>(undefined)

  const pay = () => {
    // @ts-ignore
    return braintreeInstance?.requestPaymentMethod(
      // @ts-ignore
        (error, payload) => {
            if (error) {
                console.error(error);
            } else {
                const paymentMethodNonce = payload.nonce;
                console.log("payment method nonce", payload.nonce);

                // TODO: use the paymentMethodNonce to
                //  call you server and complete the payment here

                // ...

                setStep('cart')

            }
        });
  }
  return (
    <StepLayout>
      <StepLayout.Right className=''>
        <BraintreeDropIn setBraintreeInstance={setBraintreeInstance}/>
      </StepLayout.Right>
      <StepLayout.Left>
        <div className='flex justify-between gap-2 items-center'>
          <span className='text-gray'>Total: </span>
          <strong>$9888</strong>
        </div>
        <Button variant='primary' onClick={() => pay()} className='w-full'>proceed to payment</Button>
      </StepLayout.Left>
    </StepLayout>
  )
}



type Props = {
  setBraintreeInstance: Dispatch<SetStateAction<Dropin | undefined>> ;
}

const BraintreeDropIn = ({setBraintreeInstance}:Props) => {

    useEffect(() => {
        
            (async function () {
              const braintreeInstance = await  dropin.create({
                // insert your tokenization key or client token here
                authorization: "sandbox_q72tct9z_g8pphptgymnt83zm", 
                container: '#braintree-drop-in-div',
                paypal: {
                  flow: 'checkout',
                  amount: '10.00',
                  currency: 'USD'
                }
                // @ts-ignore
            })
            setBraintreeInstance(braintreeInstance);
            })()
        
    }, [])

    return (
        
            <div
                id={"braintree-drop-in-div"}
            />

    )
}

export default PaymentStep