import Common "common";

module {
  /// Type of platform fee
  public type FeeType = {
    #ListingFee;  // $1 — paid before case submission
    #UnlockFee;   // $2 — paid to unlock a case
  };

  /// Payment record (Stripe session resolved)
  public type Payment = {
    id             : Nat;
    paidBy         : Common.UserId;
    feeType        : FeeType;
    caseId         : ?Nat;            // null for listing fee before case exists
    amountCents    : Common.USDCents;
    stripeSessionId : Text;
    var status     : PaymentStatus;
    createdAt      : Common.Timestamp;
  };

  /// Shared payment record
  public type PaymentPublic = {
    id              : Nat;
    paidBy          : Common.UserId;
    feeType         : FeeType;
    caseId          : ?Nat;
    amountCents     : Common.USDCents;
    stripeSessionId : Text;
    status          : PaymentStatus;
    createdAt       : Common.Timestamp;
  };

  public type PaymentStatus = {
    #Pending;
    #Confirmed;
    #Failed;
  };

  /// Wallet entry — platform-fees-only credit/debit ledger
  /// NO donations, transfers, or withdrawals
  public type WalletEntry = {
    id          : Nat;
    userId      : Common.UserId;
    feeType     : FeeType;
    amountCents : Common.USDCents;
    paymentId   : Nat;
    createdAt   : Common.Timestamp;
  };
};
