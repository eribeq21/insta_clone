import { createConnection } from '$lib/db/mysql';
import { redirect, error } from '@sveltejs/kit';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
export async function load({ locals, fetch }) {
	// Redirect to login page if no user is logged in
	if (!locals.user) {
		redirect(302, '/login');
	}

	const connection = await createConnection();


	// Return the current logged-in user data to the client page
	return { user: locals.user };
}

export const actions = {
	upload: async ({ request }) => {
		// Parse the multipart/form-data submitted by the form
		const formData = await request.formData();
		// Get the file object from the form input named 'profile_picture'
		const uploadedImage = formData.get('profile_picture');
		// Get the user ID from the hidden form field
		const user_id = formData.get('user_id');

		// If no file was uploaded, return a 400 Bad Request error
		if (!uploadedImage) {
			throw error(400, { message: 'No file to upload.' });
		}

		// Define where the file will be stored in the Vercel Blob storage
		const filePath = `image_upload/${uploadedImage.name}`;

		// Upload the file to Vercel Blob storage
		const { url } = await put(filePath, uploadedImage, {
			access: 'public',
			token: BLOB_READ_WRITE_TOKEN
		});
		
		// Connect to the database
		let connection = await createConnection();
		// Update the user record to save the new profile picture URL
		const [result] = await connection.execute('UPDATE users SET profile_picture = ? WHERE id = ?', [
			url,
			user_id
		]);
		// Return the uploaded image URL to the front-end
		return { uploaded: url };
	}
};
