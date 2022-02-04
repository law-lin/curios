import { useMutation } from 'react-query';
import supabase from '../lib/supabase';

const roles = ["instructor", "teaching assistant", "student"];

const updateRole = async (classId: string, userId: string, currentRole: any, targetCurrentRole: string, targetFutureRole: string) => {
    const currentUser = supabase.auth.user();
    const currentUserId = currentUser?.id;
    if (currentUserId === userId) {
      console.log('Cannot change own role.');
      return;
    }
    else if (currentRole[0] != null) {
      const thisRole = currentRole[0].role;
      const currentRoleIndex = roles.indexOf(thisRole); 
      const targetCurrentRoleIndex = roles.indexOf(targetCurrentRole);
      const targetFutureRoleIndex = roles.indexOf(targetFutureRole);
      if (currentRoleIndex > targetCurrentRoleIndex) {
        console.log('Cannot change roles of higher authority users');
        return;
      }
      if (currentRoleIndex > targetFutureRoleIndex) {
        console.log('Cannot change role to higher authority than own');
        return;
      }
    }
    const { data, error } = await supabase
      .from('users_classes')
      .update({ role: targetFutureRole })
      .eq("user_id", userId)
      .eq("class_id", classId)

    if (error) {
      throw error;
    }

    return data;
  };

  export default function useUpdateRole() {
    return useMutation('updateRole', ({ currentRole, targetCurrentRole, targetFutureRole, targetId, currentClassId } : { currentRole: any, targetCurrentRole: string, targetFutureRole:string, targetId:string, currentClassId:string }) => updateRole(currentClassId, targetId, currentRole, targetCurrentRole, targetFutureRole), {
      onSuccess: () => {
        console.log('Successfully updated role');
      }
    });
  }
  
