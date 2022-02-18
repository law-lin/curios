import supabase from 'lib/supabase';
import { useQueryClient, useMutation } from 'react-query';

const updateArchive = async (
	id: string
) => {
	const { data, error } = await supabase
		.from('posts')
		.update({ is_archived: true })
		.match({ id: id });

	if (data) {
		return data;
	} else if (error) {
		alert(error.message);
	}
};

export default function useUpdateArchive(
	id: string
) {
	const queryClient = useQueryClient();
	return useMutation(() => updateArchive(id), {
		onSuccess: () => {
			queryClient.refetchQueries('posts');
		},
	});
}
