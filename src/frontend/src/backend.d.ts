import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface UserPublic {
    id: UserId;
    country: Country;
    createdAt: Timestamp;
    role: Role;
    fullName: string;
    isActive: boolean;
    email: string;
    avatarRef?: FileRef;
}
export interface SupportProofPublic {
    id: bigint;
    files: Array<FileRef>;
    status: ReviewStatus;
    heroId: UserId;
    referenceNumber?: string;
    createdAt: Timestamp;
    adminNote?: string;
    caseId: bigint;
}
export interface FileRef {
    mimeType: string;
    fileName: string;
    storageId: string;
}
export type City = string;
export interface HelpSeekerStatsPublic {
    requestsSubmitted: bigint;
    requestsCompleted: bigint;
    requestsApproved: bigint;
}
export interface CasePublic {
    id: bigint;
    title: string;
    documents: Array<FileRef>;
    country: Country;
    city: City;
    createdAt: Timestamp;
    createdBy: UserId;
    description: string;
    deadline: Timestamp;
    adminNote?: string;
    amountNeeded: USDCents;
    category: Category;
    isPublic: boolean;
    verificationStatus: VerificationStatus;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface CaseSummary {
    id: bigint;
    title: string;
    country: Country;
    city: City;
    createdAt: Timestamp;
    deadline: Timestamp;
    amountNeeded: USDCents;
    category: Category;
    verificationStatus: VerificationStatus;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export type Country = string;
export interface PageRequest {
    offset: bigint;
    limit: bigint;
}
export interface PaymentPublic {
    id: bigint;
    status: PaymentStatus;
    createdAt: Timestamp;
    feeType: FeeType;
    amountCents: USDCents;
    caseId?: bigint;
    stripeSessionId: string;
    paidBy: UserId;
}
export type Error_ = {
    __kind__: "FrontendOriginsNotConfigured";
    FrontendOriginsNotConfigured: null;
} | {
    __kind__: "MixedSsoSources";
    MixedSsoSources: {
        otherKeys: Array<string>;
        ssoKeys: Array<string>;
    };
} | {
    __kind__: "Stale";
    Stale: {
        ageNs: bigint;
    };
} | {
    __kind__: "MalformedCandid";
    MalformedCandid: null;
} | {
    __kind__: "AmbiguousAttribute";
    AmbiguousAttribute: {
        field: string;
        sources: Array<string>;
    };
} | {
    __kind__: "NoAttributes";
    NoAttributes: null;
} | {
    __kind__: "UnknownNonce";
    UnknownNonce: null;
} | {
    __kind__: "UntrustedSsoSource";
    UntrustedSsoSource: {
        domain: string;
    };
} | {
    __kind__: "MissingField";
    MissingField: string;
} | {
    __kind__: "FrontendOriginMismatch";
    FrontendOriginMismatch: {
        got: string;
        expected: Array<string>;
    };
};
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type UserId = Principal;
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export type Result = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: Error_;
};
export type USDCents = bigint;
export interface HeroStatsPublic {
    peopleHelped: bigint;
    casesSupported: bigint;
    proudHeartCount: bigint;
    casesCompleted: bigint;
    achievements: Array<Achievement>;
}
export interface ProudHeart {
    fromHelpSeeker: UserId;
    toHero: UserId;
    awardedAt: Timestamp;
    caseId: bigint;
}
export enum Achievement {
    TrustedHero = "TrustedHero",
    FirstSupport = "FirstSupport",
    TenPeopleHelped = "TenPeopleHelped",
    EducationHero = "EducationHero",
    MedicalHero = "MedicalHero",
    CommunityHero = "CommunityHero",
    FiftyPeopleHelped = "FiftyPeopleHelped"
}
export enum Category {
    Surgery = "Surgery",
    Orphans = "Orphans",
    Food = "Food",
    DebtRelief = "DebtRelief",
    Books = "Books",
    EmergencyNeeds = "EmergencyNeeds",
    Widows = "Widows",
    Uniform = "Uniform",
    Medicines = "Medicines",
    Employment = "Employment",
    DisabilitySupport = "DisabilitySupport",
    Medical = "Medical",
    Housing = "Housing",
    Transportation = "Transportation",
    UniversityFees = "UniversityFees",
    Other = "Other",
    SchoolFees = "SchoolFees",
    Education = "Education",
    Utilities = "Utilities"
}
export enum FeeType {
    ListingFee = "ListingFee",
    UnlockFee = "UnlockFee"
}
export enum PaymentStatus {
    Failed = "Failed",
    Confirmed = "Confirmed",
    Pending = "Pending"
}
export enum ReviewStatus {
    UnderReview = "UnderReview",
    Approved = "Approved",
    Rejected = "Rejected",
    Submitted = "Submitted",
    Completed = "Completed"
}
export enum Role {
    Hero = "Hero",
    HelpSeeker = "HelpSeeker",
    Admin = "Admin"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum VerificationStatus {
    DocumentsSubmitted = "DocumentsSubmitted",
    InstitutionVerified = "InstitutionVerified",
    Unverified = "Unverified"
}
export interface backendInterface {
    addCaseDocument(caseId: bigint, fileRef: FileRef): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    awardProudHeart(caseId: bigint, heroId: UserId): Promise<void>;
    banUser(userId: UserId): Promise<void>;
    computeAchievements(heroId: UserId): Promise<Array<Achievement>>;
    /**
     * / Confirm listing fee after Stripe session completes; records payment + wallet entry
     */
    confirmListingFee(stripeSessionId: string, caseId: bigint | null): Promise<PaymentPublic>;
    /**
     * / Confirm unlock fee after Stripe session completes
     */
    confirmUnlockFee(stripeSessionId: string, caseId: bigint): Promise<PaymentPublic>;
    createCase(title: string, description: string, category: Category, country: Country, city: City, amountNeeded: USDCents, deadline: Timestamp): Promise<bigint>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    /**
     * / Create a Stripe checkout session for the $1 listing fee
     */
    createListingFeeSession(successUrl: string, cancelUrl: string): Promise<string>;
    /**
     * / Create a Stripe checkout session for the $2 unlock fee
     */
    createUnlockFeeSession(caseId: bigint, successUrl: string, cancelUrl: string): Promise<string>;
    getAllCases(): Promise<Array<CasePublic>>;
    getAllProofs(): Promise<Array<SupportProofPublic>>;
    getAllUsers(): Promise<Array<UserPublic>>;
    getCallerUserRole(): Promise<UserRole>;
    getCaseDetail(id: bigint): Promise<CasePublic | null>;
    getCaseSummary(id: bigint): Promise<CaseSummary | null>;
    getHelpSeekerStats(userId: UserId): Promise<HelpSeekerStatsPublic | null>;
    getHeroStats(userId: UserId): Promise<HeroStatsPublic | null>;
    getMyProofs(): Promise<Array<SupportProofPublic>>;
    getPendingPayments(): Promise<Array<PaymentPublic>>;
    getProofsForCase(caseId: bigint): Promise<Array<SupportProofPublic>>;
    getProudHeartsForHero(heroId: UserId): Promise<Array<ProudHeart>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUser(id: UserId): Promise<UserPublic | null>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    isUnlocked(caseId: bigint): Promise<boolean>;
    listCases(category: Category | null, page: PageRequest): Promise<Array<CaseSummary>>;
    registerUser(fullName: string, email: string, role: Role): Promise<UserPublic>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    submitProof(caseId: bigint, files: Array<FileRef>, referenceNumber: string | null): Promise<bigint>;
    suspendUser(userId: UserId): Promise<void>;
    switchRole(newRole: Role): Promise<UserPublic>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    unlockCase(caseId: bigint): Promise<void>;
    updateProofStatus(proofId: bigint, status: ReviewStatus, adminNote: string | null): Promise<void>;
    updateUserProfile(fullName: string, country: Country, avatarRef: FileRef | null): Promise<UserPublic>;
    updateVerificationStatus(caseId: bigint, status: VerificationStatus): Promise<void>;
}
