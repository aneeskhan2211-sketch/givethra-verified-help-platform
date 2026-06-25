import { c as createLucideIcon } from "./button-tWmhKgz-.js";
import { j as jsxRuntimeExports, c as cn } from "./index-BbeRKPep.js";
import { P as Progress } from "./progress-Boc1-zP9.js";
import { C as CategoryPill } from "./CategoryPill-C3yer5N1.js";
import { V as VerificationBadge } from "./VerificationBadge-CXphOd1D.js";
import { M as MapPin } from "./map-pin-CifVQ5zo.js";
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
function CaseCard({ data, onClick, className }) {
  const progress = Math.min(
    Math.round(data.amountRaised / data.amountNeeded * 100),
    100
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      "data-ocid": "case.card",
      onClick,
      className: cn(
        "overflow-hidden border border-border transition-smooth cursor-pointer group hover:shadow-md hover:-translate-y-0.5",
        className
      ),
      children: [
        data.imageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[16/9] overflow-hidden bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: data.imageUrl,
            alt: data.title,
            className: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(VerificationBadge, { level: data.verificationLevel }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryPill, { category: data.category })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground leading-snug line-clamp-2", children: data.title }),
          data.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2", children: data.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
              data.city,
              ", ",
              data.country
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Funds needed" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                "$",
                data.amountNeeded.toLocaleString()
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progress, className: "h-1.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground text-right", children: [
              progress,
              "% raised"
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  CaseCard as C,
  Search as S
};
