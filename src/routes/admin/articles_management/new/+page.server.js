import { error } from '@sveltejs/kit';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
import { createConnection } from '$lib/db/mysql';


export const actions = {
	upload: async ({ request }) => {
		const formData = await request.formData();
		const uploadedImage = formData.get('image');
        const description = formData.get('description');
        const author = formData.get('author');
		if (!uploadedImage) {
			throw error(400, { message: 'No file to upload.' });
		}

		const filePath = `image_upload/${uploadedImage.name}`;
		const { url } = await put(filePath, uploadedImage, {
			access: 'public',
			token: BLOB_READ_WRITE_TOKEN
		});
        let connection = await createConnection();
        const [ result ] = await connection.execute(
			'INSERT INTO articles (image, description, author ) VALUES (?, ?, ?)',
			[
			url, 
            description, 
            author
            ]
		);

        
		return { uploaded: url };
	}
};
