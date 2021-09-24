import { useMutation, useQueryClient } from 'react-query';
import supabase from '../lib/supabase';

const createClass = async (
  className: string,
  classNumber: string,
  classTerm: string,
  userId: string
) => {
  const { data, error } = await supabase.from('classes').insert({
    created_by: userId,
    class_name: className,
    class_number: classNumber,
    class_term: classTerm,
  });

  if (error) {
    throw error;
  }
  if (data) {
    const { error: err } = await supabase.from('users_classes').insert({
      user_id: userId,
      class_id: data[0].id,
      role: 'instructor',
    });

    if (err) {
      throw err;
    }
  }
};

export default function useCreateClass() {
  const queryClient = useQueryClient();
  const user = supabase.auth.user();
  return useMutation(
    ({
      className,
      classNumber,
      classTerm,
    }: {
      className: string;
      classNumber: string;
      classTerm: string;
    }) => createClass(className, classNumber, classTerm, user?.id ?? ''),
    {
      onSuccess: () => {
        queryClient.refetchQueries('classes');
      },
    }
  );
}
