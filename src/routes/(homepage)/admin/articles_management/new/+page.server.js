import { createConnection } from '$lib/db/mysql';
import { redirect, error } from '@sveltejs/kit';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
export async function load({ locals, fetch }) {
	// If the user is not logged in or doesn't have admin role, redirect to login page
	if (!locals.user || locals.user.role !== 'admin') {
		throw redirect(302, '/login');
	}

	const connection = await createConnection();
	// Fetching all users from the database
	const [rows] = await connection.execute('SELECT * FROM users;');

	// Pass users and the current user to the frontend
	return { users: rows, user: locals.user };
}

export const actions = {
	// Actions for handling file uploads
	upload: async ({ request }) => {
		const formData = await request.formData();
		const uploadedImage = formData.get('image');  // Image to be uploaded
		const description = formData.get('description'); // Description for the image
		const author = formData.get('author'); // Author of the post

		// If no image is uploaded, throw an error
		if (!uploadedImage) {
			throw error(400, { message: 'No file to upload.' });
		}

		// Defining the path for storing the uploaded image in Blob Storage
		const filePath = `image_upload/${uploadedImage.name}`;

		// Upload the image to Vercel Blob Storage
		const { url } = await put(filePath, uploadedImage, {
			access: 'public', // Make the image publicly accessible
			token: BLOB_READ_WRITE_TOKEN // Use the access token for Blob Storage
		});

		// Database connection
		let connection = await createConnection();
		// Insert article details into the database (image URL, description, and author)
		const [result] = await connection.execute(
			'INSERT INTO articles (image, description, author ) VALUES (?, ?, ?)',
			[url, description, author]
		);
		// Return the uploaded image URL to the frontend
		return { uploaded: url };
	}
};
