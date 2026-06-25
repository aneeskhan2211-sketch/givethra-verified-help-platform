import { a as useAuth, u as useNavigate, r as reactExports, j as jsxRuntimeExports, b as LoadingSpinner, e as ue } from "./index-BbeRKPep.js";
import { u as useBackendActor, R as Role } from "./useBackend-FUTj3Z8l.js";
import { L as Layout } from "./Layout-Cx7ESigs.js";
import { B as Badge } from "./badge-Cn2Lxj8G.js";
import { c as createLucideIcon, B as Button } from "./button-tWmhKgz-.js";
import { S as Shield } from "./shield-Bm_-ng2i.js";
import { H as Heart } from "./heart-CxhdXMKs.js";
import { M as MapPin } from "./map-pin-CifVQ5zo.js";
import "./x-CVtOPNbD.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode);
const ACHIEVEMENT_LABELS = {
  FirstSupport: { label: "First Support", icon: "🏅" },
  TenPeopleHelped: { label: "10 People Helped", icon: "🌟" },
  FiftyPeopleHelped: { label: "50 People Helped", icon: "🌠" },
  EducationHero: { label: "Education Hero", icon: "📚" },
  MedicalHero: { label: "Medical Hero", icon: "🏥" },
  CommunityHero: { label: "Community Hero", icon: "🤝" },
  TrustedHero: { label: "Trusted Hero", icon: "🛡️" }
};
function ProfilePage() {
  const { isAuthenticated, isHero, isHelpSeeker, setRole } = useAuth();
  const navigate = useNavigate();
  const { actor, isFetching } = useBackendActor();
  const [user, setUser] = reactExports.useState(null);
  const [heroStats, setHeroStats] = reactExports.useState(null);
  const [seekerStats, setSeekerStats] = reactExports.useState(
    null
  );
  const [loading, setLoading] = reactExports.useState(true);
  const [switching, setSwitching] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!actor || isFetching) return;
    setLoading(true);
    actor.getAllUsers().then((users) => {
      const u = users[0] ?? null;
      setUser(u);
      if (!u) return;
      if (isHero) {
        actor.getHeroStats(u.id).then((s) => setHeroStats(s ?? null)).catch(() => null);
      }
      if (isHelpSeeker) {
        actor.getHelpSeekerStats(u.id).then((s) => setSeekerStats(s ?? null)).catch(() => null);
      }
    }).catch(() => null).finally(() => setLoading(false));
  }, [actor, isFetching, isHero, isHelpSeeker]);
  const handleSwitchRole = async () => {
    if (!actor) return;
    setSwitching(true);
    try {
      const newRole = isHero ? Role.HelpSeeker : Role.Hero;
      await actor.switchRole(newRole);
      setRole(isHero ? "help_seeker" : "hero");
      ue.success(`Switched to ${isHero ? "Help Seeker" : "Hero"} role.`);
    } catch {
      ue.error("Failed to switch role.");
    } finally {
      setSwitching(false);
    }
  };
  if (!isAuthenticated) {
    navigate({ to: "/sign-in" });
    return null;
  }
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex justify-center py-20",
        "data-ocid": "profile.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { label: "Loading profile..." })
      }
    ) });
  }
  const memberYear = (user == null ? void 0 : user.createdAt) ? new Date(Number(user.createdAt) / 1e6).getFullYear() : (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-10 space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "profile.header_section",
        className: "rounded-2xl border border-border bg-card p-6 md:p-8",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center sm:items-start gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-9 w-9 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center sm:text-left space-y-2 flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: (user == null ? void 0 : user.fullName) ?? "My Profile" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 justify-center sm:justify-start", children: [
              isHero && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "secondary",
                  className: "text-primary border-primary/20",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-3 w-3 mr-1" }),
                    " Hero"
                  ]
                }
              ),
              isHelpSeeker && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "Help Seeker" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm text-muted-foreground justify-center sm:justify-start", children: [
              (user == null ? void 0 : user.country) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: user.country })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Member since ",
                  memberYear
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              "data-ocid": "profile.switch_role_button",
              onClick: handleSwitchRole,
              disabled: switching,
              className: "shrink-0 gap-1.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-3.5 w-3.5" }),
                switching ? "Switching..." : `Switch to ${isHero ? "Help Seeker" : "Hero"}`
              ]
            }
          )
        ] })
      }
    ),
    isHero && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "profile.stats_section",
        className: "grid grid-cols-2 sm:grid-cols-4 gap-4",
        children: [
          {
            label: "Cases Supported",
            value: String((heroStats == null ? void 0 : heroStats.casesSupported) ?? 0)
          },
          {
            label: "Cases Completed",
            value: String((heroStats == null ? void 0 : heroStats.casesCompleted) ?? 0)
          },
          {
            label: "People Helped",
            value: String((heroStats == null ? void 0 : heroStats.peopleHelped) ?? 0)
          },
          {
            label: "Proud ❤️",
            value: String((heroStats == null ? void 0 : heroStats.proudHeartCount) ?? 0)
          }
        ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl border border-border bg-card p-4 text-center space-y-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold text-foreground", children: value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: label })
            ]
          },
          label
        ))
      }
    ),
    isHelpSeeker && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "profile.helpseeker_stats_section",
        className: "grid grid-cols-3 gap-4",
        children: [
          {
            label: "Submitted",
            value: String((seekerStats == null ? void 0 : seekerStats.requestsSubmitted) ?? 0)
          },
          {
            label: "Approved",
            value: String((seekerStats == null ? void 0 : seekerStats.requestsApproved) ?? 0)
          },
          {
            label: "Completed",
            value: String((seekerStats == null ? void 0 : seekerStats.requestsCompleted) ?? 0)
          }
        ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl border border-border bg-card p-4 text-center space-y-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold text-foreground", children: value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: label })
            ]
          },
          label
        ))
      }
    ),
    isHero && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "profile.achievements_section",
        className: "rounded-2xl border border-border bg-card p-6 space-y-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-5 w-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Achievements" })
          ] }),
          ((heroStats == null ? void 0 : heroStats.achievements) ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Complete your first case to earn achievements." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: ((heroStats == null ? void 0 : heroStats.achievements) ?? []).map((a) => {
            const info = ACHIEVEMENT_LABELS[a];
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-sm text-foreground border border-border",
                children: [
                  info == null ? void 0 : info.icon,
                  " ",
                  (info == null ? void 0 : info.label) ?? a
                ]
              },
              a
            );
          }) })
        ]
      }
    )
  ] }) });
}
export {
  ProfilePage as default
};
