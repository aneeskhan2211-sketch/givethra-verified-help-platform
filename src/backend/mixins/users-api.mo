import Map "mo:core/Map";
import List "mo:core/List";
import Set "mo:core/Set";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import UsersT "../types/users";
import CasesT "../types/cases";
import UserLib "../lib/users";
import Time "mo:core/Time";

mixin (
  accessControlState : AccessControl.AccessControlState,
  users              : Map.Map<Common.UserId, UsersT.User>,
  heroStats          : Map.Map<Common.UserId, UsersT.HeroStats>,
  helpSeekerStats    : Map.Map<Common.UserId, UsersT.HelpSeekerStats>,
  proudHearts        : List.List<UsersT.ProudHeart>,
  proofs             : List.List<CasesT.SupportProof>,
  cases              : Map.Map<Nat, CasesT.Case>,
) {

  /// Register a new user. Idempotent — returns existing profile if already registered.
  public shared ({ caller }) func registerUser(
    fullName : Text,
    email    : Text,
    role     : Common.Role,
  ) : async UsersT.UserPublic {
    UserLib.registerUser(users, caller, fullName, email, role);
  };

  /// Get a user by principal ID
  public query func getUser(id : Common.UserId) : async ?UsersT.UserPublic {
    switch (users.get(id)) {
      case (?u) ?UserLib.toPublic(u);
      case null null;
    };
  };

  /// Update the calling user's mutable profile fields
  public shared ({ caller }) func updateUserProfile(
    fullName  : Text,
    country   : Common.Country,
    avatarRef : ?Common.FileRef,
  ) : async UsersT.UserPublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    UserLib.updateProfile(users, caller, fullName, country, avatarRef);
  };

  /// Switch between Hero and HelpSeeker roles
  public shared ({ caller }) func switchRole(newRole : Common.Role) : async UsersT.UserPublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    UserLib.switchRole(users, caller, newRole);
  };

  /// Get hero stats for a user
  public query func getHeroStats(userId : Common.UserId) : async ?UsersT.HeroStatsPublic {
    switch (heroStats.get(userId)) {
      case (?s) ?UserLib.heroStatsToPublic(s);
      case null null;
    };
  };

  /// Get help seeker stats for a user
  public query func getHelpSeekerStats(userId : Common.UserId) : async ?UsersT.HelpSeekerStatsPublic {
    switch (helpSeekerStats.get(userId)) {
      case (?s) ?UserLib.helpSeekerStatsToPublic(s);
      case null null;
    };
  };

  /// Award a Proud Heart from a help seeker to a hero for a completed case
  public shared ({ caller }) func awardProudHeart(caseId : Nat, heroId : Common.UserId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    // Verify the case was created by the caller
    let theCase = switch (cases.get(caseId)) {
      case (?c) c;
      case null Runtime.trap("Case not found");
    };
    if (not Principal.equal(theCase.createdBy, caller)) {
      Runtime.trap("Unauthorized: only case creator can award Proud Heart");
    };
    // Verify at least one approved proof from that hero for this case
    let hasApprovedProof = switch (proofs.find(func(p) {
      p.caseId == caseId and
      Principal.equal(p.heroId, heroId) and
      p.status == #Approved
    })) { case (?_) true; case null false };
    if (not hasApprovedProof) {
      Runtime.trap("No approved proof from hero for this case");
    };
    // No duplicate Proud Hearts
    let alreadyAwarded = switch (proudHearts.find(func(ph) {
      ph.caseId == caseId and Principal.equal(ph.fromHelpSeeker, caller)
    })) { case (?_) true; case null false };
    if (alreadyAwarded) {
      Runtime.trap("Proud Heart already awarded for this case");
    };
    proudHearts.add({
      caseId;
      fromHelpSeeker = caller;
      toHero         = heroId;
      awardedAt      = Time.now();
    });
    // Update hero stats
    switch (heroStats.get(heroId)) {
      case (?s) {
        s.proudHeartCount += 1;
      };
      case null {};
    };
  };

  /// Get all Proud Hearts awarded to a hero
  public query func getProudHeartsForHero(heroId : Common.UserId) : async [UsersT.ProudHeart] {
    proudHearts.filter(func(ph) { Principal.equal(ph.toHero, heroId) }).toArray();
  };

  /// Compute and return achievements for a hero
  public query func computeAchievements(heroId : Common.UserId) : async [UsersT.Achievement] {
    let stats = switch (heroStats.get(heroId)) {
      case (?s) s;
      case null return [];
    };
    let phCount = proudHearts.filter(func(ph) { Principal.equal(ph.toHero, heroId) }).size();
    let distinctCats = UserLib.countDistinctCategories(proofs, cases, heroId);
    let eduCount = UserLib.countCategoryCompletions(proofs, cases, heroId, #Education);
    let medCount = UserLib.countCategoryCompletions(proofs, cases, heroId, #Medical);
    var result : List.List<UsersT.Achievement> = List.empty();
    if (stats.casesSupported >= 1)  result.add(#FirstSupport);
    if (stats.peopleHelped >= 10)   result.add(#TenPeopleHelped);
    if (stats.peopleHelped >= 50)   result.add(#FiftyPeopleHelped);
    if (eduCount >= 3)              result.add(#EducationHero);
    if (medCount >= 3)              result.add(#MedicalHero);
    if (distinctCats >= 5)          result.add(#CommunityHero);
    if (phCount >= 50)              result.add(#TrustedHero);
    result.toArray();
  };

  /// Admin: get all users
  public query ({ caller }) func getAllUsers() : async [UsersT.UserPublic] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    users.values().map(func(u : UsersT.User) : UsersT.UserPublic { UserLib.toPublic(u) }).toArray();
  };

  /// Admin: suspend a user
  public shared ({ caller }) func suspendUser(userId : Common.UserId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    let user = switch (users.get(userId)) {
      case (?u) u;
      case null Runtime.trap("User not found");
    };
    user.isActive := false;
  };

  /// Admin: ban a user (alias for suspend; marked as permanent in UI)
  public shared ({ caller }) func banUser(userId : Common.UserId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    let user = switch (users.get(userId)) {
      case (?u) u;
      case null Runtime.trap("User not found");
    };
    user.isActive := false;
  };
};
