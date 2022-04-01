import supabase from 'lib/supabase';
import { useQueryClient, useMutation } from 'react-query';

const updateArchive = async (
	id: string,
	isArchived: boolean
) => {
	const visibility = isArchived ? 'public' : 'private';
	const { data, error } = await supabase
		.from('posts')
		.update({ is_archived: !isArchived, visibility })
		.match({ id: id });

	if (data) {
		return data;
	} else if (error) {
		alert(error.message);
	}
};

export default function useUpdateArchive(
	id: string,
	isArchived: boolean
) {
	const queryClient = useQueryClient();
	return useMutation(() => updateArchive(id, isArchived), {
		onSuccess: () => {
			queryClient.refetchQueries('posts');
		},
	});
}
