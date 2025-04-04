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
	const [ rowss ] = await connection.execute(
		'Select a.votes , a.id from articles a;'
	);
	

	return { articles, comments: rows, likes: rowss }; // Pass ONLY articles
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
	upVote: async ({ request }) => {
		const formData = await request.formData();
        const input  = await formData.get('articleId');
		const connection = await createConnection();

		try{
			await connection.execute(
				'UPDATE articles SET votes = votes + 1 WHERE id = ?', [input]
			)
		} catch (error) {
			console.error('Database error:', error);
			return {
				success: false,
				message: 'Failed to like. Please try again.'
			};

		}
	}
};
