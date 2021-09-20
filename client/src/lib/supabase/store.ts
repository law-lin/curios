import { User } from 'types';
import toCamelCase from 'utils/toCamelCase';
import supabase from '.';

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
