import { User } from 'types';
import toCamelCase from 'utils/toCamelCase';
import supabase from '.';

export const logout = () => {
  supabase.auth.signOut();
};

/**
 * Fetch a single user
 * @param {string} email
 */
export const fetchUser = async (email: string): Promise<User | undefined> => {
  try {
    let { data } = await supabase
      .from<User>('users')
      .select('*')
      .eq('email', email);
    let user = data![0];
    if (!user) {
      ({ data } = await supabase
        .from<User>('users')
        .select('*')
        .eq('email', email));
      user = data![0];
    }

    return toCamelCase(user);
  } catch (error) {
    console.error('error', error);
  }
};

export const createClass = async (
  className: string,
  classNumber: string,
  classTerm: string
) => {
  const currentUserId = supabase.auth.user()?.id;
  const { data } = await supabase.from('classes').insert({
    created_by: currentUserId,
    class_name: className,
    class_number: classNumber,
    class_term: classTerm,
  });
  if (data) {
    await supabase.from('users_classes').insert({
      user_id: currentUserId,
      class_id: data[0].id,
      role: 'instructor',
    });
  }
};

export const fetchClasses = async () => {
  const currentUserId = supabase.auth.user()?.id;
  const { data } = await supabase
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
    .eq('user_id', currentUserId);
  if (data) {
    const classes = data.map((d) => d.classes);
    return toCamelCase(classes);
  }
};

export const createPost = async (
  classId: string,
  type: string,
  title: string,
  content: string
) => {
  const currentUserId = supabase.auth.user()?.id;
  await supabase.from('posts').insert({
    class_id: classId,
    created_by: currentUserId,
    type,
    title,
    content,
  });
};
