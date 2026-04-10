
/*
  # Create user profiles table for NUX-TRADE

  ## Summary
  This migration creates the core user profiles table for the NUX-TRADE copytrade platform.

  ## New Tables
  - `profiles`
    - `id` (uuid, primary key, references auth.users)
    - `email` (text, unique, not null)
    - `security_pin` (text, not null) - hashed PIN for withdrawal security
    - `sponsor_code` (text, not null) - referral code of inviting user (mandatory)
    - `created_at` (timestamptz) - account creation timestamp

  ## Security
  - RLS enabled on `profiles`
  - Users can only read their own profile
  - Users can only insert their own profile
  - Users can only update their own profile

  ## Notes
  1. Sponsor code is mandatory - no registration without it
  2. Security PIN is stored hashed for withdrawal security
  3. All new users must have a valid sponsor referral code
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  security_pin text NOT NULL,
  sponsor_code text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
