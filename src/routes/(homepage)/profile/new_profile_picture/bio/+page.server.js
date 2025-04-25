import { createConnection } from '$lib/db/mysql';
import { redirect, error } from '@sveltejs/kit';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
export async function load({ locals, fetch }) {
	// Redirect to login page if no user is logged in
	if (!locals.user) {
		redirect(302, '/login');
	}
	// Connect to MySQL
	const connection = await createConnection();
	// Fetch the current user's bio from the database
	const [rows] = await connection.execute('SELECT bio FROM users WHERE id = ?', [locals.user.id]);
	// Return user info and bio rows to be used in +page.svelte
	return { user: locals.user, rows };
}

export const actions = {
	bio_upload: async ({ request }) => {
		// Get form data submitted from the frontend
		const formData = await request.formData();
		const uploadedText = formData.get('bio_text'); // Get bio text
		const user_id = formData.get('user_id'); // Get user ID

		// Create a connection to the database
		let connection = await createConnection();

		// Update the user's bio in the database
		const [result] = await connection.execute('UPDATE users SET bio = ? WHERE id = ?', [
			uploadedText,
			user_id
		]);

		// Return true  to indicate successful upload
		return { uploaded: true }
	}
};
