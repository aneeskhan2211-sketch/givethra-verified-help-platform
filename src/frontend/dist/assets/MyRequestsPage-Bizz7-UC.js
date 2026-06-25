import { a as useAuth, u as useNavigate, r as reactExports, j as jsxRuntimeExports, b as LoadingSpinner, L as Link } from "./index-BbeRKPep.js";
import { C as CategoryPill } from "./CategoryPill-C3yer5N1.js";
import { L as Layout } from "./Layout-Cx7ESigs.js";
import { V as VerificationBadge } from "./VerificationBadge-CXphOd1D.js";
import { c as createLucideIcon, B as Button } from "./button-tWmhKgz-.js";
import { u as useBackendActor } from "./useBackend-FUTj3Z8l.js";
import "./heart-CxhdXMKs.js";
import "./shield-Bm_-ng2i.js";
import "./x-CVtOPNbD.js";
import "./shield-check-C2CA1802.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode);
function toVerifLevel(v) {
  if (v === "InstitutionVerified") return "institution_verified";
  if (v === "DocumentsSubmitted") return "documents_submitted";
  return "unverified";
}
function MyRequestsPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { actor, isFetching } = useBackendActor();
  const [cases, setCases] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (!actor || isFetching) return;
    setLoading(true);
    actor.listCases(null, { offset: BigInt(0), limit: BigInt(50) }).then(setCases).catch(() => setCases([])).finally(() => setLoading(false));
  }, [actor, isFetching]);
  if (!isAuthenticated) {
    navigate({ to: "/sign-in" });
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-10 space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "My Requests" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Track the status of your submitted help requests." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "my_requests.submit_button",
          onClick: () => navigate({ to: "/submit-request" }),
          className: "gap-2 shrink-0",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            "New Request"
          ]
        }
      )
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex justify-center py-20",
        "data-ocid": "my_requests.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { label: "Loading requests..." })
      }
    ) : cases.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "my_requests.empty_state",
        className: "rounded-2xl border-2 border-dashed border-border bg-muted/20 py-20 text-center space-y-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "You haven't submitted any requests yet." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => navigate({ to: "/submit-request" }),
              "data-ocid": "my_requests.empty_submit_button",
              children: "Submit your first request"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: cases.map((req, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": `my_requests.item.${i + 1}`,
        className: "rounded-xl border border-border bg-card p-5 flex flex-col sm:flex-row sm:items-center gap-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                VerificationBadge,
                {
                  level: toVerifLevel(req.verificationStatus)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryPill, { category: req.category })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground truncate", children: req.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              req.city,
              ", ",
              req.country,
              " · $",
              (Number(req.amountNeeded) / 100).toLocaleString(),
              " needed"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cases/$id", params: { id: String(req.id) }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              "data-ocid": `my_requests.view_button.${i + 1}`,
              children: "View"
            }
          ) })
        ]
      },
      String(req.id)
    )) })
  ] }) });
}
export {
  MyRequestsPage as default
};
