import { redirect } from '@sveltejs/kit';


export async function load({ locals }) {
	if (!locals.user) {
		throw redirect(302, '/login');
	}
}

export const actions = {
	search_user: async ({ request }) => {
		const form_data = await request.formData();
		const theUsername = form_data.get('theUsername');
		const connection = await createConnection();

		const [users] = await connection.execute('SELECT * FROM users WHERE username = ?', [theUsername]);

		return {
			success: true,
			users
		};
	}
};
