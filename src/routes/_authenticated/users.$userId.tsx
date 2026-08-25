import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/_authenticated/users/$userId")({
  head: () => ({
    meta: [
      { title: "User details — Library Book Lending App" },
      {
        name: "description",
        content: "See a library member's details and every book they have borrowed.",
      },
      { property: "og:title", content: "User details — Library Book Lending App" },
      {
        property: "og:description",
        content: "See a library member's details and every book they have borrowed.",
      },
    ],
  }),
  component: UserDetailsPage,
});

function formatDate(value: string) {
  return new Date(value + "T00:00:00").toLocaleDateString();
}

function UserDetailsPage() {
  const { userId } = Route.useParams();

  const profileQuery = useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, name, email")
        .eq("id", userId)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const booksQuery = useQuery({
    queryKey: ["borrowed_books", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("borrowed_books")
        .select("id, book_title, author, borrow_date, return_date")
        .eq("user_id", userId)
        .order("borrow_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <Link
        to="/users"
        className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to users
      </Link>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>
            {profileQuery.isLoading ? "Loading…" : profileQuery.data?.name || "Unnamed user"}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{profileQuery.data?.email}</p>
        </CardHeader>
        <CardContent>
          <h2 className="text-sm font-semibold text-foreground">Borrowed books</h2>

          {booksQuery.isLoading && (
            <p className="mt-2 text-sm text-muted-foreground">Loading borrowed books…</p>
          )}
          {booksQuery.isError && (
            <p className="mt-2 text-sm font-medium text-destructive">
              Could not load borrowed books.
            </p>
          )}
          {booksQuery.data?.length === 0 && (
            <p className="mt-2 text-sm text-muted-foreground">
              This user has not borrowed any books yet.
            </p>
          )}

          {booksQuery.data && booksQuery.data.length > 0 && (
            <div className="mt-3 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Borrow date</TableHead>
                    <TableHead>Return date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {booksQuery.data.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell className="font-medium">{book.book_title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>{formatDate(book.borrow_date)}</TableCell>
                      <TableCell>{formatDate(book.return_date)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
