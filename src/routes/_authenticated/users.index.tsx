import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/_authenticated/users/")({
  head: () => ({
    meta: [
      { title: "Users — Library Book Lending App" },
      {
        name: "description",
        content: "Browse all registered library members and open a member to see borrowed books.",
      },
      { property: "og:title", content: "Users — Library Book Lending App" },
      {
        property: "og:description",
        content: "Browse all registered library members and open a member to see borrowed books.",
      },
    ],
  }),
  component: UsersPage,
});

function UsersPage() {
  const usersQuery = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, name, email")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">Users</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Select a user to see the books they have borrowed.
      </p>

      <div className="mt-6 space-y-3">
        {usersQuery.isLoading && <p className="text-sm text-muted-foreground">Loading users…</p>}
        {usersQuery.isError && (
          <p className="text-sm font-medium text-destructive">Could not load users.</p>
        )}
        {usersQuery.data?.length === 0 && (
          <p className="text-sm text-muted-foreground">No registered users yet.</p>
        )}

        {usersQuery.data?.map((user) => (
          <Link
            key={user.id}
            to="/users/$userId"
            params={{ userId: user.id }}
            className="block transition-colors hover:bg-accent/50"
          >
            <Card>
              <CardContent className="flex items-center justify-between gap-4 py-4">
                <div>
                  <p className="font-medium text-foreground">{user.name || "Unnamed user"}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <ChevronRight className="size-4 text-muted-foreground" aria-hidden="true" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
