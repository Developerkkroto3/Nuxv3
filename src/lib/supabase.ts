// Simulacro de Supabase para que la app no crashee sin .env
export const supabase = {
  auth: {
    signUp: async () => ({ data: { user: null }, error: null }),
    signInWithPassword: async () => ({ data: { user: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
  },
  from: () => ({
    insert: async () => ({ error: null }),
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: null }),
      }),
    }),
  }),
} as any;

export type Profile = {
  id: string;
  email: string;
  security_pin: string;
  sponsor_code: string;
  created_at: string;
};