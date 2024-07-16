import { ESEWA_URL, STRIPE_Pk } from "@/utils/constants/constants";
import { loadStripe } from "@stripe/stripe-js";

export class Payment {
  static Esewa(params: { [key: string]: string | number }): void {
    const form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", ESEWA_URL);
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        const hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", String(params[key]));
        form.appendChild(hiddenField);
      }
    }
    document.body.appendChild(form);
    form.submit();
  }

  static async Stripe(){
    const stripe = await loadStripe(STRIPE_Pk);
  }
}
