import { createConnection } from '$lib/db/mysql';
import { redirect, error } from '@sveltejs/kit';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
export async function load({ locals, fetch }) {
	if (!locals.user) {
		redirect(302, '/login');
	}

	const connection = await createConnection();

	return { user: locals.user };
}

export const actions = {
	upload: async ({ request }) => {
		const formData = await request.formData();
		const uploadedImage = formData.get('profile_picture');
		const user_id = formData.get('user_id');
		if (!uploadedImage) {
			throw error(400, { message: 'No file to upload.' });
		}

		const filePath = `image_upload/${uploadedImage.name}`;
		const { url } = await put(filePath, uploadedImage, {
			access: 'public',
			token: BLOB_READ_WRITE_TOKEN
		});
		let connection = await createConnection();
		const [result] = await connection.execute('UPDATE users SET profile_picture = ? WHERE id = ?', [
			url,
			user_id
		]);

		return { uploaded: url };
	}
};
