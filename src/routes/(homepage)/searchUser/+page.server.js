import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';

export async function load({ locals, fetch }) {
	if (!locals.user) {
		redirect(302, '/login');
	}

	return{
		user : locals.user
	}
}

export const actions = {
	search_user: async ({ request }) => {
		let form_data = await request.formData();
		let input_value = await form_data.get('input_value');
		console.log('Input value:', input_value);

		const connection = await createConnection();

		try {
			const searchMitLikeSql = `%${input_value}%`;
			const [result] = await connection.execute('SELECT * FROM users where username  like ?', [
				searchMitLikeSql
			]);
			console.log('Query result:', result);

			return {
				users: result,
				success: true,
				message: 'Comment added successfully!'
			};
		} catch (error) {
			console.error('Database error:', error);
			return {
				success: false,
				message: 'No users found. Please try again.'
			};
		}
	}
};
