import { Component } from '@angular/core';

@Component({
  selector: 'payment-gateway',
  template:`
  <h3 style="text-align:center;text-style:bold">Customer Confirmation of the Monthly Billing</h3>
  <p>Welcome to the MetaMagic family of passionate developers.
   Please read this statement carefully and hit I AGREE if you wish to proceed.<br>
 I/we subscribe to the MetaMagic’s product(s) and understand we will be billed by MetaMagic monthly based on the total time used by our authorized users in the preceding calendar month. We agree to pay the same in full (inclusive of all taxes and duties legitimately levied by MetaMagic) within seven business days from delivery of the electronic invoice to our authorized representative.
  </p>
  `
})
export class PaymentGatewayComponent {

}
