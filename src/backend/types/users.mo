import Common "common";

module {
  /// Achievement badge enum
  public type Achievement = {
    #FirstSupport;
    #TenPeopleHelped;
    #FiftyPeopleHelped;
    #EducationHero;
    #MedicalHero;
    #CommunityHero;
    #TrustedHero;
  };

  /// Core user record (stored in actor state)
  public type User = {
    id          : Common.UserId;
    var fullName : Text;
    var email    : Text;           // plain-text; hashed on sensitive ops
    var role     : Common.Role;
    var country  : Common.Country;
    var avatarRef : ?Common.FileRef;
    createdAt    : Common.Timestamp;
    var isActive : Bool;
  };

  /// Shared (API-boundary) user record — no var fields
  public type UserPublic = {
    id        : Common.UserId;
    fullName  : Text;
    email     : Text;
    role      : Common.Role;
    country   : Common.Country;
    avatarRef : ?Common.FileRef;
    createdAt : Common.Timestamp;
    isActive  : Bool;
  };

  /// Hero profile stats (stored per Hero principal)
  public type HeroStats = {
    var proudHeartCount  : Nat;
    var peopleHelped     : Nat;
    var casesSupported   : Nat;
    var casesCompleted   : Nat;
    var achievements     : [Achievement];  // append-only in practice
  };

  /// Shared Hero profile stats
  public type HeroStatsPublic = {
    proudHeartCount  : Nat;
    peopleHelped     : Nat;
    casesSupported   : Nat;
    casesCompleted   : Nat;
    achievements     : [Achievement];
  };

  /// Help Seeker profile stats (stored per HelpSeeker principal)
  public type HelpSeekerStats = {
    var requestsSubmitted : Nat;
    var requestsApproved  : Nat;
    var requestsCompleted : Nat;
  };

  /// Shared Help Seeker profile stats
  public type HelpSeekerStatsPublic = {
    requestsSubmitted : Nat;
    requestsApproved  : Nat;
    requestsCompleted : Nat;
  };

  /// Proud Heart record — one per completed case, irreversible
  public type ProudHeart = {
    caseId          : Nat;
    fromHelpSeeker  : Common.UserId;
    toHero          : Common.UserId;
    awardedAt       : Common.Timestamp;
  };
};
