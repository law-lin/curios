import { useQuery } from 'react-query';
import toCamelCase from 'utils/toCamelCase';
import supabase from '../lib/supabase';

const fetchMembers = async (classId: string, filter: string) => {
  const { data, error } = await supabase
    .from('users_classes')
    .select(
      `
        role,
        users (
          name,
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
    return toCamelCase(members);
  }
  // console.log(data);
  // return toCamelCase(data);

  // if (data) {
  //   // const members = data.map((m)=> return({...m.users,...m.users_classes}));
  //   const members = data;
  //   return members;
  // }
};

export default function useMembers(classId: string, filter: string) {
  return useQuery('members', () => fetchMembers(classId, filter));
}
