import type { CaseSummary, VerificationStatus } from "@/backend";
import { CaseCard, type CaseCardData } from "@/components/CaseCard";
import { CategoryPill } from "@/components/CategoryPill";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBackendActor } from "@/hooks/useBackend";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const CATEGORIES = [
  "Education",
  "Medical",
  "Food",
  "Utilities",
  "Housing",
  "Employment",
  "Disability Support",
  "Orphans",
  "Widows",
  "Emergency Cases",
  "Other Needs",
];

function toCardData(c: CaseSummary): CaseCardData {
  const vMap: Record<VerificationStatus, CaseCardData["verificationLevel"]> = {
    DocumentsSubmitted: "documents_submitted",
    InstitutionVerified: "institution_verified",
    Unverified: "unverified",
  };
  return {
    id: String(c.id),
    title: c.title,
    category: c.category,
    country: c.country,
    city: c.city,
    amountNeeded: Number(c.amountNeeded) / 100,
    amountRaised: 0,
    verificationLevel: vMap[c.verificationStatus] ?? "unverified",
    description: "",
  };
}

export default function HomePage() {
  const navigate = useNavigate();
  const { actor, isFetching } = useBackendActor();
  const [cases, setCases] = useState<CaseSummary[]>([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchCountry, setSearchCountry] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [filterCat, setFilterCat] = useState("all");

  useEffect(() => {
    if (!actor || isFetching) return;
    actor
      .listCases(null, { offset: BigInt(0), limit: BigInt(6) })
      .then(setCases);
  }, [actor, isFetching]);

  const filtered = cases
    .filter((c) => {
      if (filterCat !== "all" && c.category !== filterCat) return false;
      if (
        searchCountry &&
        !c.country.toLowerCase().includes(searchCountry.toLowerCase())
      )
        return false;
      if (
        searchCity &&
        !c.city.toLowerCase().includes(searchCity.toLowerCase())
      )
        return false;
      if (
        searchTitle &&
        !c.title.toLowerCase().includes(searchTitle.toLowerCase())
      )
        return false;
      return true;
    })
    .slice(0, 6);

  return (
    <div className="bg-background">
      {/* Hero */}
      <section
        data-ocid="home.hero_section"
        className="relative bg-card border-b border-border overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 70% 50%, oklch(0.48 0.18 268) 0%, transparent 65%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32 flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 space-y-6 text-center md:text-left"
          >
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              Verified Help.
              <br />
              <span className="text-primary">Real Impact.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              Support real people through verified cases. Every case is
              reviewed. Every Hero pays directly. Every act of support leaves a
              record.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Button
                size="lg"
                data-ocid="home.become_hero_button"
                onClick={() => navigate({ to: "/sign-up" })}
                className="h-12 px-8 font-semibold text-base"
              >
                Become a Hero
              </Button>
              <Button
                size="lg"
                variant="outline"
                data-ocid="home.request_help_button"
                onClick={() => navigate({ to: "/sign-up" })}
                className="h-12 px-8 font-semibold text-base"
              >
                Request Help
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 rounded-2xl overflow-hidden shadow-2xl hidden md:block"
          >
            <img
              src="/assets/generated/hero-humanitarian.dim_1200x600.jpg"
              alt="Verified humanitarian support"
              className="w-full h-72 lg:h-96 object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section
        data-ocid="home.categories_section"
        className="py-12 px-4 bg-muted/30 border-b border-border"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-xl font-semibold text-foreground mb-6">
            Browse by Category
          </h2>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                data-ocid={`home.category.${cat.toLowerCase().replace(/ /g, "_")}_pill`}
                onClick={() => {
                  setFilterCat(cat === filterCat ? "all" : cat);
                }}
              >
                <CategoryPill
                  category={cat}
                  size="sm"
                  className={`cursor-pointer transition-opacity ${filterCat === cat && filterCat !== "all" ? "ring-2 ring-primary" : "hover:opacity-80"}`}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Search */}
      <section
        data-ocid="home.search_section"
        className="py-8 px-4 bg-background border-b border-border"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">
            Search Cases
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                data-ocid="home.search.title_input"
                placeholder="Search by title..."
                className="pl-9"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
              />
            </div>
            <Select value={filterCat} onValueChange={setFilterCat}>
              <SelectTrigger data-ocid="home.search.category_select">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              data-ocid="home.search.country_input"
              placeholder="Country"
              value={searchCountry}
              onChange={(e) => setSearchCountry(e.target.value)}
            />
            <Input
              data-ocid="home.search.city_input"
              placeholder="City"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Featured Cases */}
      <section
        data-ocid="home.featured_cases_section"
        className="py-16 px-4 bg-background"
      >
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Featured Verified Cases
            </h2>
            <Link
              to="/cases"
              data-ocid="home.view_all_cases_link"
              className="text-sm text-primary font-medium hover:underline"
            >
              View all cases →
            </Link>
          </div>
          {filtered.length === 0 && !isFetching ? (
            <div
              data-ocid="home.cases_empty_state"
              className="text-center py-12 text-muted-foreground"
            >
              No cases found matching your search.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(filtered.length > 0 ? filtered : cases.slice(0, 6)).map(
                (c, i) => (
                  <motion.div
                    key={String(c.id)}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    data-ocid={`home.case.item.${i + 1}`}
                  >
                    <CaseCard
                      data={toCardData(c)}
                      onClick={() =>
                        navigate({
                          to: "/cases/$id",
                          params: { id: String(c.id) },
                        })
                      }
                    />
                  </motion.div>
                ),
              )}
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section
        data-ocid="home.how_it_works_section"
        className="py-16 px-4 bg-muted/30 border-y border-border"
      >
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="font-display text-2xl font-bold text-foreground">
            How Givethra Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Request Help",
                desc: "Submit your case with supporting documents. Pay a $1 listing fee.",
              },
              {
                step: "02",
                title: "Get Verified",
                desc: "Our team reviews your documents and approves your case for Heroes to find.",
              },
              {
                step: "03",
                title: "Receive Direct Support",
                desc: "Heroes unlock your case, contact your institution, and pay directly.",
              },
            ].map(({ step, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="space-y-3"
              >
                <div className="text-4xl font-display font-black text-primary/20">
                  {step}
                </div>
                <h3 className="font-display font-semibold text-foreground">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        data-ocid="home.cta_section"
        className="py-20 px-4 bg-primary text-primary-foreground"
      >
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Ready to make a difference?
          </h2>
          <p className="text-primary-foreground/80">
            Join thousands of Heroes who are changing lives through verified,
            direct support.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              size="lg"
              variant="secondary"
              data-ocid="home.cta_hero_button"
              onClick={() => navigate({ to: "/sign-up" })}
              className="h-12 px-8 font-semibold"
            >
              Become a Hero
            </Button>
            <Button
              size="lg"
              data-ocid="home.cta_cases_button"
              onClick={() => navigate({ to: "/cases" })}
              className="h-12 px-8 font-semibold bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              Browse Cases
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
