import { createConnection } from '$lib/db/mysql';
import { redirect, error } from '@sveltejs/kit';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
export async function load({ locals, fetch }) {
    if (!locals.user) {
        redirect(302, '/login');
    }

    const connection = await createConnection();
    const [rows] = await connection.execute('SELECT bio FROM users WHERE id = ?', [locals.user.id]);


    return { user: locals.user , rows};
}

export const actions = {
	bio_upload: async ({ request }) => {
		const formData = await request.formData();
		const uploadedText = formData.get('bio_text');
		const user_id = formData.get('user_id');

		let connection = await createConnection();
		const [result] = await connection.execute(
			'UPDATE users SET bio = ? WHERE id = ?',
			[uploadedText, user_id]
		);

		return { uploaded: true };
	}
};
