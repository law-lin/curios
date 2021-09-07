import { User } from 'types';
import toCamelCase from 'utils/toCamelCase';
import { supabase } from '.';

export const register = async (
  email: string,
  password: string,
  name: string
) => {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (user) {
    const { error: userError } = await supabase
      .from('users')
      .update({ name })
      .eq('id', user.id);
    console.log(userError);
  }
};

export const login = async (email: string, password: string) => {
  await supabase.auth.signIn({
    email,
    password,
  });
};

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
  type: string,
  title: string,
  content: string
) => {
  await supabase.from('posts').insert({
    type,
    title,
    content,
  });
};
