import { redirect } from '@sveltejs/kit';
import { createConnection } from '$lib/db/mysql';

export async function load({ params, fetch, locals }) {
	if (!locals.user) {
		redirect(302, '/login');
	}

	const uuid = params.uuid;
	const res = await fetch(`/api/articles/${uuid}`);
	const article = await res.json();

	const connection = await createConnection();

	const [comments] = await connection.execute(
		'SELECT c.id, c.text, c.name, c.article_id FROM comments c WHERE article_id = ?;',
		[uuid]
	);

	const [likes] = await connection.execute('SELECT a.votes, a.id FROM articles a WHERE id = ?;', [
		uuid
	]);

	const [userLikesRows] = await connection.execute(
		'SELECT article_id FROM user_likes WHERE user_id = ?',
		[locals.user.id]
	);


	const userLikes = userLikesRows.map((row) => row.article_id);
	const [users] = await connection.execute('SELECT * FROM users;');

	return {
		article,
		comments,
		likes,
		user: locals.user,
		userLikes, 
		users
	};
}

export const actions = {
	addComment: async ({ request }) => {
		const formData = await request.formData();
		const input = formData.get('commentInput');
		const name = formData.get('name'); // Automatically passed
		const article_id = formData.get('article_id'); // Automatically passed

		if (!input || !name || !article_id) {
			return {
				success: false,
				message: 'All fields are required.'
			};
		}

		const connection = await createConnection();

		try {
			await connection.execute('INSERT INTO comments (text, name, article_id) VALUES (?, ?, ?)', [
				input,
				name,
				article_id
			]);
			return {
				success: true,
				message: 'Comment added successfully!'
			};
		} catch (error) {
			console.error('Database error:', error);
			return {
				success: false,
				message: 'Failed to add comment. Please try again.'
			};
		}
	},
	toggleLike: async ({ request, locals }) => {
		const formData = await request.formData();
		const articleId = formData.get('articleId');
		const userId = locals.user.id;
		const connection = await createConnection();

		try {
			await connection.execute(
				`
              INSERT INTO user_likes (user_id, article_id) VALUES (?, ?)
            `,
				[userId, articleId]
			);

			await connection.execute(
				`
              UPDATE articles SET votes = votes + 1 WHERE id = ?
            `,
				[articleId]
			);
		} catch (err) {
			if (err.code === 'ER_DUP_ENTRY') {
				console.log(err.code);
				await connection.execute(
					`
                DELETE FROM user_likes WHERE user_id = ? AND article_id = ?
              `,
					[userId, articleId]
				);

				await connection.execute(
					`
                UPDATE articles SET votes = votes - 1 WHERE id = ?
              `,
					[articleId]
				);
			} else {
				throw error;
			}
		}

		return { success: true };
	}
};
