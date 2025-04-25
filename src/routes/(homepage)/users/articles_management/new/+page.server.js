import { createConnection } from '$lib/db/mysql';
import { redirect, error } from '@sveltejs/kit';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
export async function load({ locals, fetch }) {
    // Check if user is authenticated 
	if (!locals.user) {
		redirect(302, '/login'); // If not authenticated, redirect them to the login page

	}

	const connection = await createConnection(); // Create a connection to the MySQL database

    // Execute SQL query to get all users from the database
	const [rows] = await connection.execute('SELECT * FROM users;');

	// Pass user to the frontend
	return { users: rows, user: locals.user };
}

export const actions = {
    // Action for handling image upload form submission
	upload: async ({ request }) => {
        // Get the form data from the request
		const formData = await request.formData();
        // Extract the uploaded image, description, and author from the form
		const uploadedImage = formData.get('image');
		const description = formData.get('description');
		const author = formData.get('author');

        // Check if the image was uploaded. If not, throw an error
		if (!uploadedImage) {
            // If no image is uploaded, respond with a 400 error and a message
			throw error(400, { message: 'No file to upload.' });
		}

		// Define the file path for the uploaded image on Vercel Blob
		const filePath = `image_upload/${uploadedImage.name}`;

        // Upload the image to Vercel Blob and retrieve the public URL
		const { url } = await put(filePath, uploadedImage, {
			access: 'public',
			token: BLOB_READ_WRITE_TOKEN
		});

        // Create a connection to the MySQL database to insert article data
		let connection = await createConnection();

        // Execute an SQL query to insert the new article (with image URL, description, and author) into the database
		const [result] = await connection.execute(
			'INSERT INTO articles (image, description, author ) VALUES (?, ?, ?)',
			[url, description, author]
		);


        // Return an object containing the URL of the uploaded image as a response to the client
		return { uploaded: url };
	}
};
