import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/use-session";
import { Button } from "@/components/ui/button";

const linkClass =
  "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground";

export function SiteHeader() {
  const { session } = useSession();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleLogout() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/login", replace: true });
  }

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold text-foreground">
          <BookOpen className="size-5 text-primary" aria-hidden="true" />
          Library Book Lending App
        </Link>

        <nav className="flex flex-wrap items-center gap-1" aria-label="Main navigation">
          <Link to="/" className={linkClass} activeProps={{ className: "text-foreground" }}>
            Home
          </Link>
          {session ? (
            <>
              <Link
                to="/add-book"
                className={linkClass}
                activeProps={{ className: "text-foreground" }}
              >
                Add Borrowed Book
              </Link>
              <Link
                to="/users"
                className={linkClass}
                activeProps={{ className: "text-foreground" }}
              >
                Users
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={linkClass}
                activeProps={{ className: "text-foreground" }}
              >
                Login
              </Link>
              <Button asChild size="sm">
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
