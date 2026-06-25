import type {
  Achievement,
  HelpSeekerStatsPublic,
  HeroStatsPublic,
  UserPublic,
} from "@/backend";
import { Role } from "@/backend";
import Layout from "@/components/Layout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useBackendActor } from "@/hooks/useBackend";
import { useNavigate } from "@tanstack/react-router";
import {
  Award,
  Calendar,
  Heart,
  MapPin,
  RefreshCw,
  Shield,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ACHIEVEMENT_LABELS: Record<Achievement, { label: string; icon: string }> =
  {
    FirstSupport: { label: "First Support", icon: "🏅" },
    TenPeopleHelped: { label: "10 People Helped", icon: "🌟" },
    FiftyPeopleHelped: { label: "50 People Helped", icon: "🌠" },
    EducationHero: { label: "Education Hero", icon: "📚" },
    MedicalHero: { label: "Medical Hero", icon: "🏥" },
    CommunityHero: { label: "Community Hero", icon: "🤝" },
    TrustedHero: { label: "Trusted Hero", icon: "🛡️" },
  };

export default function ProfilePage() {
  const { isAuthenticated, isHero, isHelpSeeker, setRole } = useAuth();
  const navigate = useNavigate();
  const { actor, isFetching } = useBackendActor();
  const [user, setUser] = useState<UserPublic | null>(null);
  const [heroStats, setHeroStats] = useState<HeroStatsPublic | null>(null);
  const [seekerStats, setSeekerStats] = useState<HelpSeekerStatsPublic | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [switching, setSwitching] = useState(false);

  useEffect(() => {
    if (!actor || isFetching) return;
    setLoading(true);
    // Load current user profile
    actor
      .getAllUsers()
      .then((users) => {
        const u = users[0] ?? null;
        setUser(u);
        if (!u) return;
        if (isHero) {
          actor
            .getHeroStats(u.id)
            .then((s) => setHeroStats(s ?? null))
            .catch(() => null);
        }
        if (isHelpSeeker) {
          actor
            .getHelpSeekerStats(u.id)
            .then((s) => setSeekerStats(s ?? null))
            .catch(() => null);
        }
      })
      .catch(() => null)
      .finally(() => setLoading(false));
  }, [actor, isFetching, isHero, isHelpSeeker]);

  const handleSwitchRole = async () => {
    if (!actor) return;
    setSwitching(true);
    try {
      const newRole = isHero ? Role.HelpSeeker : Role.Hero;
      await actor.switchRole(newRole);
      setRole(isHero ? "help_seeker" : "hero");
      toast.success(`Switched to ${isHero ? "Help Seeker" : "Hero"} role.`);
    } catch {
      toast.error("Failed to switch role.");
    } finally {
      setSwitching(false);
    }
  };

  if (!isAuthenticated) {
    navigate({ to: "/sign-in" });
    return null;
  }

  if (loading) {
    return (
      <Layout>
        <div
          className="flex justify-center py-20"
          data-ocid="profile.loading_state"
        >
          <LoadingSpinner label="Loading profile..." />
        </div>
      </Layout>
    );
  }

  const memberYear = user?.createdAt
    ? new Date(Number(user.createdAt) / 1_000_000).getFullYear()
    : new Date().getFullYear();

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        {/* Profile header */}
        <div
          data-ocid="profile.header_section"
          className="rounded-2xl border border-border bg-card p-6 md:p-8"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Shield className="h-9 w-9 text-primary" />
            </div>
            <div className="text-center sm:text-left space-y-2 flex-1 min-w-0">
              <h1 className="font-display text-2xl font-bold text-foreground">
                {user?.fullName ?? "My Profile"}
              </h1>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {isHero && (
                  <Badge
                    variant="secondary"
                    className="text-primary border-primary/20"
                  >
                    <Heart className="h-3 w-3 mr-1" /> Hero
                  </Badge>
                )}
                {isHelpSeeker && <Badge variant="secondary">Help Seeker</Badge>}
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground justify-center sm:justify-start">
                {user?.country && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{user.country}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Member since {memberYear}</span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              data-ocid="profile.switch_role_button"
              onClick={handleSwitchRole}
              disabled={switching}
              className="shrink-0 gap-1.5"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              {switching
                ? "Switching..."
                : `Switch to ${isHero ? "Help Seeker" : "Hero"}`}
            </Button>
          </div>
        </div>

        {/* Hero stats */}
        {isHero && (
          <div
            data-ocid="profile.stats_section"
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {[
              {
                label: "Cases Supported",
                value: String(heroStats?.casesSupported ?? 0),
              },
              {
                label: "Cases Completed",
                value: String(heroStats?.casesCompleted ?? 0),
              },
              {
                label: "People Helped",
                value: String(heroStats?.peopleHelped ?? 0),
              },
              {
                label: "Proud ❤️",
                value: String(heroStats?.proudHeartCount ?? 0),
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl border border-border bg-card p-4 text-center space-y-1"
              >
                <div className="font-display text-2xl font-bold text-foreground">
                  {value}
                </div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Help Seeker stats */}
        {isHelpSeeker && (
          <div
            data-ocid="profile.helpseeker_stats_section"
            className="grid grid-cols-3 gap-4"
          >
            {[
              {
                label: "Submitted",
                value: String(seekerStats?.requestsSubmitted ?? 0),
              },
              {
                label: "Approved",
                value: String(seekerStats?.requestsApproved ?? 0),
              },
              {
                label: "Completed",
                value: String(seekerStats?.requestsCompleted ?? 0),
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl border border-border bg-card p-4 text-center space-y-1"
              >
                <div className="font-display text-2xl font-bold text-foreground">
                  {value}
                </div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Achievements */}
        {isHero && (
          <div
            data-ocid="profile.achievements_section"
            className="rounded-2xl border border-border bg-card p-6 space-y-4"
          >
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <h2 className="font-display font-semibold text-foreground">
                Achievements
              </h2>
            </div>
            {(heroStats?.achievements ?? []).length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Complete your first case to earn achievements.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {(heroStats?.achievements ?? []).map((a) => {
                  const info = ACHIEVEMENT_LABELS[a];
                  return (
                    <span
                      key={a}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-sm text-foreground border border-border"
                    >
                      {info?.icon} {info?.label ?? a}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
