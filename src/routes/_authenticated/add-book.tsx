import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/_authenticated/add-book")({
  head: () => ({
    meta: [
      { title: "Add Borrowed Book — Library Book Lending App" },
      {
        name: "description",
        content: "Record a borrowed book with its title, author, borrow date and return date.",
      },
      { property: "og:title", content: "Add Borrowed Book — Library Book Lending App" },
      {
        property: "og:description",
        content: "Record a borrowed book with its title, author, borrow date and return date.",
      },
    ],
  }),
  component: AddBookPage,
});

const emptyForm = {
  user_id: "",
  book_title: "",
  author: "",
  borrow_date: "",
  return_date: "",
};

function AddBookPage() {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const usersQuery = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data, error: queryError } = await supabase
        .from("profiles")
        .select("id, name, email")
        .order("name");
      if (queryError) throw queryError;
      return data;
    },
  });

  function update(field: keyof typeof emptyForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!form.user_id) return setError("Please select a user.");
    if (!form.book_title.trim()) return setError("Please enter the book title.");
    if (!form.author.trim()) return setError("Please enter the author.");
    if (!form.borrow_date) return setError("Please enter the borrow date.");
    if (!form.return_date) return setError("Please enter the return date.");

    setSubmitting(true);
    const { error: insertError } = await supabase.from("borrowed_books").insert({
      user_id: form.user_id,
      book_title: form.book_title.trim(),
      author: form.author.trim(),
      borrow_date: form.borrow_date,
      return_date: form.return_date,
    });
    setSubmitting(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setSuccess("Borrowed book saved successfully.");
    setForm(emptyForm);
  }

  return (
    <section className="mx-auto max-w-xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Add Borrowed Book</CardTitle>
          <CardDescription>Enter the details of a book a member has borrowed.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="user">User</Label>
              <select
                id="user"
                value={form.user_id}
                onChange={(e) => update("user_id", e.target.value)}
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">
                  {usersQuery.isLoading ? "Loading users…" : "Select a user"}
                </option>
                {usersQuery.data?.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name || user.email}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="book_title">Book title</Label>
              <Input
                id="book_title"
                value={form.book_title}
                onChange={(e) => update("book_title", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={form.author}
                onChange={(e) => update("author", e.target.value)}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="borrow_date">Borrow date</Label>
                <Input
                  id="borrow_date"
                  type="date"
                  value={form.borrow_date}
                  onChange={(e) => update("borrow_date", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="return_date">Return date</Label>
                <Input
                  id="return_date"
                  type="date"
                  value={form.return_date}
                  onChange={(e) => update("return_date", e.target.value)}
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="text-sm font-medium text-destructive">
                {error}
              </p>
            )}
            {success && (
              <p role="status" className="text-sm font-medium text-primary">
                {success}
              </p>
            )}

            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? "Saving…" : "Save borrowed book"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
