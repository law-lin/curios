import { useMutation } from 'react-query';
import supabase from '../lib/supabase';

interface User {
  name: string;
  email: string;
  password: string;
}

const createUser = async (user: User) => {
  // Check if email exists
  const { data: userWithEmail } = await supabase
    .from('users')
    .select('*')
    .eq('email', user.email)
    .single();

  if (userWithEmail) {
    throw new Error('User with email exists');
  }

  const { data, error: signUpError } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
  });

  if (signUpError) {
    throw signUpError;
  }

  return data;
};

export default function useCreateUser() {
  return useMutation((user: User) => createUser(user), {
    onSuccess: async (data, user) => {
      const { name } = user;
      if (data && 'id' in data && data.id) {
        const { data: updateData, error: updateError } = await supabase
          .from('users')
          .update({ name })
          .eq('id', data.id);
        if (updateError) {
          throw updateError;
        }
        return updateData;
      }
      throw new Error();
    },
  });
}
