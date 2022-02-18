import { useQuery } from 'react-query';
import toCamelCase from 'utils/toCamelCase';
import supabase from '../lib/supabase';

const fetchMembers = async (
  classId: string,
  filter: string,
  sortBy: string
) => {
  const { data, error } = await supabase
    .from('users_classes')
    .select(
      `
        class_id,
        role,
        contributions,
        users (
          id,
          name,
          email,
          status
        )
     `
    )
    .eq('class_id', classId);
  if (error) {
    throw new Error(error.message);
  }
  if (data) {
    const members = data.map((member) => {
      // if (member.users.name.includes(filter)) {
      //   return member;
      // }
      if (member.users.name.match(new RegExp(`${filter}`, 'gi'))) {
        return member;
      }
    });
    if (sortBy == 'A-Z') {
      members.sort((a, b) => {
        if (a.users.name < b.users.name) return -1;
        if (a.users.name > b.users.name) return 1;
        return 0;
      });
    } else if (sortBy == 'Role') {
      members.sort((a, b) => {
        let a_weight =
          a.role == 'instructor'
            ? 2
            : a.role == 'teaching assistant'
            ? 1
            : a.role == 'ta'
            ? 1
            : 0;
        let b_weight =
          b.role == 'instructor'
            ? 2
            : b.role == 'teaching assistant'
            ? 1
            : b.role == 'ta'
            ? 1
            : 0;
        return b_weight - a_weight;
      });
    }
    return toCamelCase(members);
  }
};

export default function useMembers(
  classId: string,
  filter: string,
  sortBy: string
) {
  return useQuery('members', () => fetchMembers(classId, filter, sortBy));
}
