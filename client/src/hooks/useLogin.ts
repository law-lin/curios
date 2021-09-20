import { useMutation } from 'react-query';
import supabase from '../lib/supabase';

const login = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signIn({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default function useLogin() {
  return useMutation(
    'login',
    ({ email, password }: { email: string; password: string }) =>
      login({ email, password })
  );
}
