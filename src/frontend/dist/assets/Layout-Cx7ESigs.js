import { Q as z, a as useAuth, u as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Link, U as useRouterState, c as cn } from "./index-BbeRKPep.js";
import { c as createLucideIcon, B as Button } from "./button-tWmhKgz-.js";
import { H as Heart } from "./heart-CxhdXMKs.js";
import { S as Shield } from "./shield-Bm_-ng2i.js";
import { X } from "./x-CVtOPNbD.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 18h16", key: "19g7jn" }],
  ["path", { d: "M4 6h16", key: "1o0s65" }]
];
const Menu = createLucideIcon("menu", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }]
];
const Moon = createLucideIcon("moon", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
];
const Sun = createLucideIcon("sun", __iconNode);
const NavLink = ({
  to,
  children,
  onClick
}) => {
  const router = useRouterState();
  const isActive = router.location.pathname === to || router.location.pathname.startsWith(`${to}/`);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to,
      onClick,
      className: cn(
        "text-sm font-medium transition-colors hover:text-primary",
        isActive ? "text-primary" : "text-muted-foreground"
      ),
      "data-ocid": `nav.link.${to.replace(/\//g, "").replace(/-/g, "_") || "home"}`,
      children
    }
  );
};
function Layout({ children }) {
  const { theme, setTheme } = z();
  const {
    isAuthenticated,
    isHero,
    isHelpSeeker,
    isAdmin,
    logout,
    isInitializing
  } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = reactExports.useState(false);
  const closeMenu = () => setMenuOpen(false);
  const handleLogout = () => {
    logout();
    closeMenu();
    navigate({ to: "/" });
  };
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-50 bg-card border-b border-border shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/",
            className: "flex items-center gap-2 shrink-0",
            "data-ocid": "nav.logo_link",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-lg bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-4 w-4 text-primary-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-lg text-foreground", children: "Givethra" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden md:flex items-center gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/cases", children: "Browse Cases" }),
          isHelpSeeker && /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/my-requests", children: "My Requests" }),
          isHero && /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/submit-request", children: "Submit a Case" }),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/admin", children: "Admin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/about", children: "About" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: toggleTheme,
              "aria-label": "Toggle theme",
              "data-ocid": "nav.theme_toggle",
              className: "h-9 w-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth",
              children: theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-4 w-4" })
            }
          ),
          isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/profile/$id", params: { id: "me" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                "data-ocid": "nav.profile_button",
                className: "gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4" }),
                  "Profile"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                "data-ocid": "nav.logout_button",
                onClick: handleLogout,
                children: "Logout"
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/sign-in", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                "data-ocid": "nav.signin_button",
                disabled: isInitializing,
                children: "Sign in"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/sign-up", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                "data-ocid": "nav.signup_button",
                disabled: isInitializing,
                className: "font-semibold",
                children: "Get Started"
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex md:hidden items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: toggleTheme,
              "aria-label": "Toggle theme",
              className: "h-9 w-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-smooth",
              children: theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setMenuOpen(!menuOpen),
              "aria-label": "Toggle menu",
              "data-ocid": "nav.hamburger_button",
              className: "h-9 w-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-smooth",
              children: menuOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" })
            }
          )
        ] })
      ] }),
      menuOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "nav.mobile_menu",
          className: "md:hidden border-t border-border bg-card px-4 py-4 space-y-1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/cases", onClick: closeMenu, children: "Browse Cases" }),
            isHelpSeeker && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/my-requests", onClick: closeMenu, children: "My Requests" }) }),
            isHero && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/submit-request", onClick: closeMenu, children: "Submit a Case" }) }),
            isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/admin", onClick: closeMenu, children: "Admin" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/about", onClick: closeMenu, children: "About" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-3 border-t border-border mt-2 space-y-2", children: isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/profile/$id",
                  params: { id: "me" },
                  onClick: closeMenu,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "w-full", children: "Profile" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "w-full",
                  onClick: handleLogout,
                  "data-ocid": "nav.mobile_logout_button",
                  children: "Logout"
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/sign-in", onClick: closeMenu, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "w-full",
                  "data-ocid": "nav.mobile_signin_button",
                  children: "Sign in"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/sign-up", onClick: closeMenu, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  className: "w-full font-semibold",
                  "data-ocid": "nav.mobile_signup_button",
                  children: "Get Started"
                }
              ) })
            ] }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "bg-card border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-start md:items-center justify-between gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-7 rounded-lg bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-3.5 w-3.5 text-primary-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground", children: "Givethra" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground max-w-xs", children: "Verified Help. Real Impact." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex flex-wrap gap-x-6 gap-y-2", children: [
          { to: "/about", label: "About" },
          { to: "/privacy", label: "Privacy Policy" },
          { to: "/terms", label: "Terms" },
          { to: "/community-guidelines", label: "Community Guidelines" }
        ].map(({ to, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to,
            className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
            children: label
          },
          to
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        ". Built with love using",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "underline hover:text-foreground",
            children: "caffeine.ai"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  Layout as L
};
