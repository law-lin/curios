import { useMutation } from 'react-query';
import supabase from '../lib/supabase';

const updateRole = async (classId: string, userId: string, targetRole: string) => {
    console.log(classId);
    console.log(userId);
    console.log(targetRole);
    const { data, error } = await supabase
      .from('users_classes')
      .update({ role: targetRole })
      .eq("user_id", userId)
      .eq("class_id", classId)

    if (error) {
      throw error;
    }

    return data;
  };

  export default function useUpdateRole() {
    return useMutation('updateRole', ({ targetFutureRole, targetId, currentClassId } : { targetFutureRole:string, targetId:string, currentClassId:string }) => updateRole(currentClassId, targetId, targetFutureRole), {
      onSuccess: () => {
        console.log('Successfully updated role');
      }
    });
  }
  
