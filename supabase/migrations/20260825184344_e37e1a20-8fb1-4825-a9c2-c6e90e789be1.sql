CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view all profiles"
  ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE TABLE public.borrowed_books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  book_title TEXT NOT NULL,
  author TEXT NOT NULL,
  borrow_date DATE NOT NULL,
  return_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.borrowed_books TO authenticated;
GRANT ALL ON public.borrowed_books TO service_role;
ALTER TABLE public.borrowed_books ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view all borrowed books"
  ON public.borrowed_books FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can add borrowed books"
  ON public.borrowed_books FOR INSERT TO authenticated WITH CHECK (true);

CREATE INDEX borrowed_books_user_id_idx ON public.borrowed_books(user_id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.email, '')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();