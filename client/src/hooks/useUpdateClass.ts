import supabase from 'lib/supabase';
import { useQueryClient, useMutation } from 'react-query';

const updateCourse = async (
	id: string,
	className: string,
	classNumber: string
) => {
	const { data, error } = await supabase
		.from('classes')
		.update({ class_name: className, class_number: classNumber })
		.match({ id: id });
	// const { data, error } = await supabase
	// 	.from('classes')
	// 	.select('*')
	// 	.match({ id: id });
	if (data) {
		return data;
	} else if (error) {
		alert(error.message);
	}
};

export default function useUpdateCourse(
	id: string,
	className: string,
	classNumber: string
) {
	const queryClient = useQueryClient();
	return useMutation(() => updateCourse(id, className, classNumber), {
		onSuccess: () => {
			queryClient.refetchQueries('classes');
		},
	});
}
