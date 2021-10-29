import { useQuery } from 'react-query';
import toCamelCase from 'utils/toCamelCase';
import supabase from '../lib/supabase';

const fetchClasses = async (userId: string) => {
  const { data, error } = await supabase
    .from('users_classes')
    .select(
      `
    classes (
      id,
      class_name,
      class_number,
      class_term,
      status,
      private_posts,
      student_polls,
      description
    )
`
    )
    .eq('user_id', userId);
  if (error) {
    throw new Error(error.message);
  }
  if (data) {
    const classes = data.map((d) => d.classes);
    return toCamelCase(classes);
  }
};

export default function useClasses() {
  const user = supabase.auth.user();
  return useQuery('classes', () => fetchClasses(user?.id ?? ''));
}
