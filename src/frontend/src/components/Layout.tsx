import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Heart, Menu, Moon, Shield, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

const NavLink = ({
  to,
  children,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  const router = useRouterState();
  const isActive =
    router.location.pathname === to ||
    router.location.pathname.startsWith(`${to}/`);
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        isActive ? "text-primary" : "text-muted-foreground",
      )}
      data-ocid={`nav.link.${to.replace(/\//g, "").replace(/-/g, "_") || "home"}`}
    >
      {children}
    </Link>
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  const {
    isAuthenticated,
    isHero,
    isHelpSeeker,
    isAdmin,
    logout,
    isInitializing,
  } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate({ to: "/" });
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
            data-ocid="nav.logo_link"
          >
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Heart className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">
              Givethra
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/cases">Browse Cases</NavLink>
            {isHelpSeeker && <NavLink to="/my-requests">My Requests</NavLink>}
            {isHero && <NavLink to="/submit-request">Submit a Case</NavLink>}
            {isAdmin && <NavLink to="/admin">Admin</NavLink>}
            <NavLink to="/about">About</NavLink>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              data-ocid="nav.theme_toggle"
              className="h-9 w-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            {isAuthenticated ? (
              <>
                <Link to="/profile/$id" params={{ id: "me" }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    data-ocid="nav.profile_button"
                    className="gap-2"
                  >
                    <Shield className="h-4 w-4" />
                    Profile
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  data-ocid="nav.logout_button"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/sign-in">
                  <Button
                    variant="ghost"
                    size="sm"
                    data-ocid="nav.signin_button"
                    disabled={isInitializing}
                  >
                    Sign in
                  </Button>
                </Link>
                <Link to="/sign-up">
                  <Button
                    size="sm"
                    data-ocid="nav.signup_button"
                    disabled={isInitializing}
                    className="font-semibold"
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="h-9 w-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-smooth"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              data-ocid="nav.hamburger_button"
              className="h-9 w-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-smooth"
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            data-ocid="nav.mobile_menu"
            className="md:hidden border-t border-border bg-card px-4 py-4 space-y-1"
          >
            <NavLink to="/cases" onClick={closeMenu}>
              Browse Cases
            </NavLink>
            {isHelpSeeker && (
              <div className="py-1">
                <NavLink to="/my-requests" onClick={closeMenu}>
                  My Requests
                </NavLink>
              </div>
            )}
            {isHero && (
              <div className="py-1">
                <NavLink to="/submit-request" onClick={closeMenu}>
                  Submit a Case
                </NavLink>
              </div>
            )}
            {isAdmin && (
              <div className="py-1">
                <NavLink to="/admin" onClick={closeMenu}>
                  Admin
                </NavLink>
              </div>
            )}
            <div className="py-1">
              <NavLink to="/about" onClick={closeMenu}>
                About
              </NavLink>
            </div>
            <div className="pt-3 border-t border-border mt-2 space-y-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile/$id"
                    params={{ id: "me" }}
                    onClick={closeMenu}
                  >
                    <Button variant="outline" size="sm" className="w-full">
                      Profile
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={handleLogout}
                    data-ocid="nav.mobile_logout_button"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/sign-in" onClick={closeMenu}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      data-ocid="nav.mobile_signin_button"
                    >
                      Sign in
                    </Button>
                  </Link>
                  <Link to="/sign-up" onClick={closeMenu}>
                    <Button
                      size="sm"
                      className="w-full font-semibold"
                      data-ocid="nav.mobile_signup_button"
                    >
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {/* Brand */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
                  <Heart className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
                <span className="font-display font-bold text-foreground">
                  Givethra
                </span>
              </div>
              <p className="text-xs text-muted-foreground max-w-xs">
                Verified Help. Real Impact.
              </p>
            </div>

            {/* Links */}
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {[
                { to: "/about", label: "About" },
                { to: "/privacy", label: "Privacy Policy" },
                { to: "/terms", label: "Terms" },
                { to: "/community-guidelines", label: "Community Guidelines" },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
