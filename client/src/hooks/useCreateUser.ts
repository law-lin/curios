import { useMutation, useQueryClient } from 'react-query';
import supabase from '../lib/supabase';

interface User {
  name: string;
  email: string;
  password: string;
}

const createUser = async (user: User) => {
  // Check if username exists
  const { data: userWithUsername } = await supabase
    .from('users')
    .select('*')
    .eq('email', user.email)
    .single();

  if (userWithUsername) {
    throw new Error('User with username exists');
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
    onSuccess: async (data) => {
      console.log('DATA', data);
      // const { name } = uDser;
      // if (data) {
      //   const { data: updateData, error: updateError } = await supabase
      //     .from('users')
      //     .update({ name })
      //     .eq('id', data.user.id);
      //   if (updateError) {
      //     throw updateError;
      //   }
      //   return updateData;
      // }
    },
  });
}
