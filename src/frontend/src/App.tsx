import Layout from "@/components/Layout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { Suspense, lazy } from "react";

// Lazy page imports
const HomePage = lazy(() => import("@/pages/HomePage"));
const SignUpPage = lazy(() => import("@/pages/SignUpPage"));
const SignInPage = lazy(() => import("@/pages/SignInPage"));
const ForgotPasswordPage = lazy(() => import("@/pages/ForgotPasswordPage"));
const OnboardingPage = lazy(() => import("@/pages/OnboardingPage"));
const CasesPage = lazy(() => import("@/pages/CasesPage"));
const CaseDetailPage = lazy(() => import("@/pages/CaseDetailPage"));
const SubmitRequestPage = lazy(() => import("@/pages/SubmitRequestPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const MyRequestsPage = lazy(() => import("@/pages/MyRequestsPage"));
const AdminPage = lazy(() => import("@/pages/AdminPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const PrivacyPage = lazy(() => import("@/pages/PrivacyPage"));
const TermsPage = lazy(() => import("@/pages/TermsPage"));
const CommunityGuidelinesPage = lazy(
  () => import("@/pages/CommunityGuidelinesPage"),
);

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="lg" label="Loading..." />
  </div>
);

const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <HomePage />
    </Suspense>
  ),
});
const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sign-up",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <SignUpPage />
    </Suspense>
  ),
});
const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sign-in",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <SignInPage />
    </Suspense>
  ),
});
const forgotPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/forgot-password",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ForgotPasswordPage />
    </Suspense>
  ),
});
const onboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/onboarding",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <OnboardingPage />
    </Suspense>
  ),
});
const casesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cases",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <CasesPage />
    </Suspense>
  ),
});
const caseDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cases/$id",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <CaseDetailPage />
    </Suspense>
  ),
});
const submitRequestRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/submit-request",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <SubmitRequestPage />
    </Suspense>
  ),
});
const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile/$id",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProfilePage />
    </Suspense>
  ),
});
const myRequestsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/my-requests",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <MyRequestsPage />
    </Suspense>
  ),
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminPage />
    </Suspense>
  ),
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AboutPage />
    </Suspense>
  ),
});
const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PrivacyPage />
    </Suspense>
  ),
});
const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terms",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TermsPage />
    </Suspense>
  ),
});
const communityGuidelinesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/community-guidelines",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <CommunityGuidelinesPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  signUpRoute,
  signInRoute,
  forgotPasswordRoute,
  onboardingRoute,
  casesRoute,
  caseDetailRoute,
  submitRequestRoute,
  profileRoute,
  myRequestsRoute,
  adminRoute,
  aboutRoute,
  privacyRoute,
  termsRoute,
  communityGuidelinesRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" />
      </AuthProvider>
    </ThemeProvider>
  );
}
