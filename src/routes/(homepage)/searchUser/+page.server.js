import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';

export async function load({ locals, fetch }) {
	// If no user is logged in, redirect to login page
	if (!locals.user) {
		redirect(302, '/login');
	}
	// If user is logged in, pass their data to the page
	return {
		user: locals.user
	};
}

export const actions = {
	//  "search_user" action handling searching users
	search_user: async ({ request }) => {
		// Reading the submitted form data
		let form_data = await request.formData();
		// Extracting  the search input value from the form
		let input_value = await form_data.get('input_value');

		const connection = await createConnection();		// Create a MySQL connection


		try {
			// Preparing  the input for SQL LIKE search
			const searchMitLikeSql = `%${input_value}%`;
			// Performing the search query
			const [result] = await connection.execute('SELECT * FROM users where username  like ?', [
				searchMitLikeSql
			]);

			// return the results to the form
			return {
				users: result,
				success: true,
				message: 'Comment added successfully!'
			};
		} catch (error) {
			// Handle database errors
			console.error('Database error:', error);
			return {
				success: false,
				message: 'No users found. Please try again.'
			};
		}
	}
};
