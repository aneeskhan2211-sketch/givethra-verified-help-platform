import { j as jsxRuntimeExports } from "./index-BbeRKPep.js";
import { L as Layout } from "./Layout-Cx7ESigs.js";
import { H as Heart } from "./heart-CxhdXMKs.js";
import { S as ShieldCheck } from "./shield-check-C2CA1802.js";
import { c as createLucideIcon } from "./button-tWmhKgz-.js";
import "./shield-Bm_-ng2i.js";
import "./x-CVtOPNbD.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
const guidelines = [
  {
    icon: Heart,
    title: "Lead with Compassion",
    rules: [
      "Treat every person on this platform with dignity and respect.",
      "Remember that Help Seekers are sharing vulnerable moments — respond with empathy.",
      "Heroes are giving their time and money — appreciate and acknowledge their efforts."
    ]
  },
  {
    icon: ShieldCheck,
    title: "Honesty and Integrity",
    rules: [
      "Submit only truthful, verifiable help requests.",
      "Upload genuine documents — falsified submissions result in permanent bans.",
      "Heroes must upload real proof of support after completing a case."
    ]
  },
  {
    icon: Users,
    title: "Community Respect",
    rules: [
      "Do not contact people outside the platform using information obtained here.",
      "Respect privacy — do not share case details or personal information publicly.",
      "Do not solicit or pressure Heroes for faster support."
    ]
  },
  {
    icon: TriangleAlert,
    title: "Zero Tolerance",
    rules: [
      "Fraud, duplicate requests, or identity misrepresentation result in immediate permanent ban.",
      "Harassment, threats, or discriminatory behavior are not tolerated.",
      "Attempting to bypass verification or platform fees is prohibited."
    ]
  }
];
function CommunityGuidelinesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-16 space-y-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-bold text-foreground", children: "Community Guidelines" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Our shared code of conduct for a trust-based community." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-sm", children: "Givethra works because of trust. These guidelines define how every member of our community — Heroes and Help Seekers alike — should interact with one another and with the platform." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: guidelines.map(({ icon: Icon, title, rules }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "rounded-2xl border border-border bg-card p-6 space-y-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center h-9 w-9 rounded-xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: rules.map((rule) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "li",
            {
              className: "flex items-start gap-2 text-sm text-muted-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" }),
                rule
              ]
            },
            rule
          )) })
        ]
      },
      title
    )) })
  ] }) });
}
export {
  CommunityGuidelinesPage as default
};
