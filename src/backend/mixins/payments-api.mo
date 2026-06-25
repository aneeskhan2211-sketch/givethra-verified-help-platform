import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Stripe "mo:caffeineai-stripe/stripe";
import AccessControl "mo:caffeineai-authorization/access-control";
import PaymentsT "../types/payments";
import PaymentLib "../lib/payments";

mixin (
  accessControlState : AccessControl.AccessControlState,
  payments           : List.List<PaymentsT.Payment>,
  wallets            : List.List<PaymentsT.WalletEntry>,
  paymentState       : { var nextPaymentId : Nat; var nextWalletId : Nat },
  stripeConfig       : { var config : ?Stripe.StripeConfiguration },
) {

  /// Admin: get all pending payments
  public query ({ caller }) func getPendingPayments() : async [PaymentsT.PaymentPublic] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    payments.filter(func(p) { p.status == #Pending })
            .map<PaymentsT.Payment, PaymentsT.PaymentPublic>(func(p) { PaymentLib.toPublic(p) })
            .toArray();
  };
};
