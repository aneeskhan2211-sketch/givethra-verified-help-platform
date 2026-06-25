import { j as jsxRuntimeExports } from "./index-BbeRKPep.js";
import { L as Layout } from "./Layout-Cx7ESigs.js";
import "./button-tWmhKgz-.js";
import "./heart-CxhdXMKs.js";
import "./shield-Bm_-ng2i.js";
import "./x-CVtOPNbD.js";
const sections = [
  {
    title: "Information We Collect",
    content: "We collect information you provide during registration (name, email address) and when submitting a help request (personal details, documents, location). We also collect usage data to improve the platform."
  },
  {
    title: "How We Use Your Information",
    content: "Your information is used to verify help requests, enable Heroes to support you, communicate platform updates, and prevent fraud. We never sell your data to third parties."
  },
  {
    title: "Document Storage",
    content: "Verification documents are stored securely and encrypted. Documents are only accessible to Heroes who have paid the case unlock fee and to our verification team."
  },
  {
    title: "Data Retention",
    content: "Active case data is retained for the duration of the case plus 2 years. You may request deletion of your data at any time by contacting our support team, subject to legal obligations."
  },
  {
    title: "Your Rights",
    content: "You have the right to access, correct, or delete your personal data. You may also request a copy of all data we hold about you. Contact us at privacy@givethra.com."
  },
  {
    title: "Cookies",
    content: "We use essential cookies for authentication and session management, and analytics cookies to understand platform usage. You may disable non-essential cookies in your browser settings."
  }
];
function PrivacyPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-16 space-y-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-bold text-foreground", children: "Privacy Policy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Last updated: June 2026" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-sm max-w-none text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Givethra is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you use our platform." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: sections.map(({ title, content }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-sm", children: content })
    ] }, title)) })
  ] }) });
}
export {
  PrivacyPage as default
};
