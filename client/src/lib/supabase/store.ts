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

export const deleteCourse = async (id: Number) => {
	// const currentUserId = supabase.auth.user()?.id;
	const { data } = await supabase.from('classes').delete().match({ id: id });
	if (data) {
		return data;
	}
};

export const updateCourse = async (
	id: Number,
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
