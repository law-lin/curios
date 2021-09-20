import supabase from 'lib/supabase';
import { useMutation, useQueryClient } from 'react-query';

export const deleteCourse = async (id: string) => {
	// const currentUserId = supabase.auth.user()?.id;
	const { data } = await supabase.from('classes').delete().match({ id: id });
	if (data) {
		return data;
	}
};

export default function useDeleteCourse(id: string) {
	const queryClient = useQueryClient();
	return useMutation(() => deleteCourse(id), {
		onSuccess: () => {
			queryClient.refetchQueries('classes');
		},
	});
}
