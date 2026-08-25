import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Library Book Lending App" },
      {
        name: "description",
        content:
          "Register, log in, record borrowed books and see which books each library member has borrowed.",
      },
      { property: "og:title", content: "Library Book Lending App" },
      {
        property: "og:description",
        content:
          "Register, log in, record borrowed books and see which books each library member has borrowed.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center">
      <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <BookOpen className="size-7" aria-hidden="true" />
      </span>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Library Book Lending App
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
        A simple library system for keeping track of book lending. Create an account, record the
        books members borrow, and browse all registered users to see exactly what each person has
        borrowed and when it is due back.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <Link to="/login">Login</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/register">Register</Link>
        </Button>
      </div>
    </section>
  );
}
