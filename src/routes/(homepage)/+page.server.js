import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export async function load({ locals, fetch }) {
	if (!locals.user) {
		redirect(302, '/login');
	}
	const res = await fetch('/api/articles');
	const data = await res.json();
	let articles = data.articles;

	const connection = await createConnection();
	const [rows] = await connection.execute(
		'SELECT c.id, c.text, c.name, c.article_id FROM comments c;'
	);
	const [rowss] = await connection.execute('Select a.votes , a.id from articles a;');

	const [userLikesRows] = await connection.execute(
		'SELECT article_id FROM user_likes WHERE user_id = ?',
		[locals.user.id]
	);

	const userLikes = userLikesRows.map((row) => row.article_id);
	const [users] = await connection.execute('SELECT * FROM users;');
	const [follows] = await connection.execute('SELECT follower_id, following_id FROM follows');

	return { articles, comments: rows, likes: rowss, user: locals.user, userLikes, users, follows }; // Pass ONLY articles
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

		const [existing] = await connection.execute(
			`SELECT * FROM user_likes WHERE user_id = ? AND article_id = ?`,
			[userId, articleId]
		);

		try {
			if (existing.length > 0) {
				// User already liked the article — remove like
				await connection.execute(
					`DELETE FROM user_likes WHERE user_id = ? AND article_id = ?`,
					[userId, articleId]
				);
				await connection.execute(
					`UPDATE articles SET votes = votes - 1 WHERE id = ?`,
					[articleId]
				);
				return { isLiked: false };
			} else {
				// User hasn't liked the article yet — add like
				await connection.execute(
					`INSERT INTO user_likes (user_id, article_id) VALUES (?, ?)`,
					[userId, articleId]
				);
				await connection.execute(
					`UPDATE articles SET votes = votes + 1 WHERE id = ?`,
					[articleId]
				);
				return { isLiked: true };
			}
		} catch (err) {
			console.error('Like toggle failed:', err);
			return { isLiked: null, error: true };
		}
	}
};
