import Time "mo:core/Time";
import Map "mo:core/Map";
import List "mo:core/List";
import Set "mo:core/Set";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Common "../types/common";
import Users "../types/users";
import Cases "../types/cases";

module {

  /// Convert User mutable record to shared UserPublic
  public func toPublic(u : Users.User) : Users.UserPublic {
    {
      id        = u.id;
      fullName  = u.fullName;
      email     = u.email;
      role      = u.role;
      country   = u.country;
      avatarRef = u.avatarRef;
      createdAt = u.createdAt;
      isActive  = u.isActive;
    };
  };

  /// Convert HeroStats to shared
  public func heroStatsToPublic(s : Users.HeroStats) : Users.HeroStatsPublic {
    {
      proudHeartCount = s.proudHeartCount;
      peopleHelped    = s.peopleHelped;
      casesSupported  = s.casesSupported;
      casesCompleted  = s.casesCompleted;
      achievements    = s.achievements;
    };
  };

  /// Convert HelpSeekerStats to shared
  public func helpSeekerStatsToPublic(s : Users.HelpSeekerStats) : Users.HelpSeekerStatsPublic {
    {
      requestsSubmitted = s.requestsSubmitted;
      requestsApproved  = s.requestsApproved;
      requestsCompleted = s.requestsCompleted;
    };
  };

  /// Register or update a user; return existing or new user
  public func registerUser(
    users     : Map.Map<Common.UserId, Users.User>,
    caller    : Common.UserId,
    fullName  : Text,
    email     : Text,
    role      : Common.Role,
  ) : Users.UserPublic {
    switch (users.get(caller)) {
      case (?existing) {
        // Already registered — return current profile
        toPublic(existing);
      };
      case null {
        let user : Users.User = {
          id          = caller;
          var fullName = fullName;
          var email    = email;
          var role     = role;
          var country  = "";
          var avatarRef = null;
          createdAt    = Time.now();
          var isActive = true;
        };
        users.add(caller, user);
        toPublic(user);
      };
    };
  };

  /// Update mutable profile fields
  public func updateProfile(
    users    : Map.Map<Common.UserId, Users.User>,
    caller   : Common.UserId,
    fullName : Text,
    country  : Common.Country,
    avatarRef : ?Common.FileRef,
  ) : Users.UserPublic {
    let user = switch (users.get(caller)) {
      case (?u) u;
      case null Runtime.trap("User not found");
    };
    user.fullName  := fullName;
    user.country   := country;
    user.avatarRef := avatarRef;
    toPublic(user);
  };

  /// Switch role between Hero and HelpSeeker
  public func switchRole(
    users  : Map.Map<Common.UserId, Users.User>,
    caller : Common.UserId,
    newRole : Common.Role,
  ) : Users.UserPublic {
    let user = switch (users.get(caller)) {
      case (?u) u;
      case null Runtime.trap("User not found");
    };
    user.role := newRole;
    toPublic(user);
  };

  /// Compute achievements for a hero based on their stats and distinct help seekers helped
  public func computeAchievements(
    heroStats         : Users.HeroStats,
    distinctCategories : Nat,
    proudHearts       : Nat,
  ) : [Users.Achievement] {
    let result : List.List<Users.Achievement> = List.empty();
    if (heroStats.casesSupported >= 1) result.add(#FirstSupport);
    if (heroStats.peopleHelped >= 10) result.add(#TenPeopleHelped);
    if (heroStats.peopleHelped >= 50) result.add(#FiftyPeopleHelped);
    if (distinctCategories >= 5)      result.add(#CommunityHero);
    if (proudHearts >= 50)            result.add(#TrustedHero);
    result.toArray();
  };

  /// Count distinct categories a hero has supported (for CommunityHero)
  public func countDistinctCategories(
    proofs : List.List<Cases.SupportProof>,
    cases  : Map.Map<Nat, Cases.Case>,
    heroId : Common.UserId,
  ) : Nat {
    let cats : Set.Set<Text> = Set.empty();
    proofs.forEach(func(p) {
      if (Principal.equal(p.heroId, heroId) and p.status == #Approved) {
        switch (cases.get(p.caseId)) {
          case (?c) {
            cats.add(debug_show(c.category));
          };
          case null {};
        };
      };
    });
    cats.size();
  };

  /// Count distinct help seekers a hero has helped (approved proofs)
  public func countDistinctHelpSeekers(
    proofs : List.List<Cases.SupportProof>,
    cases  : Map.Map<Nat, Cases.Case>,
    heroId : Common.UserId,
  ) : Nat {
    let seekers : Set.Set<Text> = Set.empty();
    proofs.forEach(func(p) {
      if (Principal.equal(p.heroId, heroId) and p.status == #Approved) {
        switch (cases.get(p.caseId)) {
          case (?c) {
            seekers.add(c.createdBy.toText());
          };
          case null {};
        };
      };
    });
    seekers.size();
  };

  /// Count education/medical category completions for a hero
  public func countCategoryCompletions(
    proofs    : List.List<Cases.SupportProof>,
    cases     : Map.Map<Nat, Cases.Case>,
    heroId    : Common.UserId,
    category  : Cases.Category,
  ) : Nat {
    var count = 0;
    proofs.forEach(func(p) {
      if (Principal.equal(p.heroId, heroId) and p.status == #Approved) {
        switch (cases.get(p.caseId)) {
          case (?c) {
            if (c.category == category) count += 1;
          };
          case null {};
        };
      };
    });
    count;
  };
};
