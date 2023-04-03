/*  import { useEffect } from 'react';
import { MercadoPago } from 'https://sdk.mercadopago.com/js/v2';

function PaymentCheckout() {
  useEffect(() => {
    const mp = new MercadoPago('TEST-5b3df1a1-2456-4fa5-9f3e-d6329caaa8fd', {
      locale: 'es-AR'
    });

    mp.checkout({
      preference: {
        id: '6236724163101730'
      },
      render: {
        container: '.cho-container',
        label: 'Pagar',
      }
    });
  }, []);

  return (
    <div className="cho-container"></div>
  );
}

export default PaymentCheckout;   */