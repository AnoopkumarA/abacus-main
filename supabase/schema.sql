-- Create user roles enum
CREATE TYPE user_role AS ENUM ('user', 'admin');

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE,
    username TEXT UNIQUE,
    role user_role DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT username_length CHECK (CHAR_LENGTH(username) >= 3)
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for profiles
CREATE POLICY "Public profiles are viewable by everyone"
    ON public.profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can insert their own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, username, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'username', NEW.email),
        COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'user')
    );
    RETURN NEW;
END;
$$;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM public.profiles
        WHERE id = user_id
        AND role = 'admin'
    );
END;
$$;

-- Create admin user function
CREATE OR REPLACE FUNCTION make_user_admin(username_to_promote TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE public.profiles
    SET role = 'admin'
    WHERE username = username_to_promote;
END;
$$;

-- Insert an admin user (replace with your admin email)
INSERT INTO auth.users (email, email_confirmed_at, raw_user_meta_data)
VALUES ('anopadraja@gmail.com', NOW(), '{"role": "admin"}'::jsonb)
ON CONFLICT DO NOTHING;

-- Create admin credentials
INSERT INTO auth.users (
    email,
    encrypted_password,
    email_confirmed_at,
    raw_user_meta_data
)
VALUES (
    'admin@abacus.com',
    crypt('admin123', gen_salt('bf')), -- Replace 'admin123' with your desired admin password
    NOW(),
    '{"role": "admin", "username": "admin"}'::jsonb
)
ON CONFLICT (email) DO UPDATE
SET encrypted_password = crypt('admin123', gen_salt('bf')),
    raw_user_meta_data = '{"role": "admin", "username": "admin"}'::jsonb;

-- Insert into profiles table
INSERT INTO public.profiles (id, username, role)
SELECT 
    id,
    'admin',
    'admin'
FROM auth.users
WHERE email = 'admin@abacus.com'
ON CONFLICT (id) DO UPDATE
SET role = 'admin';
