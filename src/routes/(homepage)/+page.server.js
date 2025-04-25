import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export async function load({ locals, fetch }) {
	// Checking if the user is logged in by looking at `locals.user`
	// If not, redirecting them to the login page
	if (!locals.user) {
		redirect(302, '/login');
	}
	// Fetching articles from the API (a separate endpoint for articles)
	const res = await fetch('/api/articles');
	const data = await res.json(); // Parsing the response as JSON
	let articles = data.articles; // Storing the articles from the API

	// Creating a database connection 
	const connection = await createConnection();
	// Fetching comments from the database (related to articles)
	const [rows] = await connection.execute(
		'SELECT c.id, c.text, c.name, c.article_id FROM comments c;'
	);
	// Fetching the article votes and IDs (to count likes)
	const [rowss] = await connection.execute('Select a.votes , a.id from articles a;');

	// Fetching the articles that the current user has liked
	const [userLikesRows] = await connection.execute(
		'SELECT article_id FROM user_likes WHERE user_id = ?',
		[locals.user.id]
	);

	// Maping  the rows to get only the article IDs that the user liked
	const userLikes = userLikesRows.map((row) => row.article_id);
	// Fetching all users 
	const [users] = await connection.execute('SELECT * FROM users;');
	// Fetching follower rows (used for following system)
	const [follows] = await connection.execute('SELECT follower_id, following_id FROM follows');

	// Returning all the necessary data to the page
	return { articles, comments: rows, likes: rowss, user: locals.user, userLikes, users, follows }; // Pass ONLY articles
}

export const actions = {
	// Action to handle adding a new comment
	addComment: async ({ request }) => {
		const formData = await request.formData();
		const input = formData.get('commentInput'); // The comment text
		const name = formData.get('name');  // The username of the commenter
		const article_id = formData.get('article_id'); // The ID of the article being commented on

		// If any of the required fields are missing, return an error message
		if (!input || !name || !article_id) {
			return {
				success: false,
				message: 'All fields are required.'
			};
		}
		// Create a connection to the database
		const connection = await createConnection();
		// Try to insert the new comment into the database
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
			// Log the error if the database operation fails
			console.error('Database error:', error);
			return {
				success: false,
				message: 'Failed to add comment. Please try again.'
			};
		}
	},
	// Action to toggle like on an article
	toggleLike: async ({ request, locals }) => {
		// Get the form data
		const formData = await request.formData();
		const articleId = formData.get('articleId'); // The ID of the article to like/unlike
		const userId = locals.user.id; // The ID of the logged-in user

		// Create a connection to the database
		const connection = await createConnection();

		// Check if the user has already liked the article
		const [existing] = await connection.execute(
			`SELECT * FROM user_likes WHERE user_id = ? AND article_id = ?`,
			[userId, articleId]
		);

		// Try to toggle the like status
		try {
			if (existing.length > 0) {
				// User already liked the article — remove like
				await connection.execute(`DELETE FROM user_likes WHERE user_id = ? AND article_id = ?`, [
					userId,
					articleId
				]);
				// Decrease the vote count for the article
				await connection.execute(`UPDATE articles SET votes = votes - 1 WHERE id = ?`, [articleId]);
				return { isLiked: false }; // Return that the article is no longer liked
			} else {
				// User hasn't liked the article yet — add like
				await connection.execute(`INSERT INTO user_likes (user_id, article_id) VALUES (?, ?)`, [
					userId,
					articleId
				]);
				// Increase the vote count for the article
				await connection.execute(`UPDATE articles SET votes = votes + 1 WHERE id = ?`, [articleId]);
				return { isLiked: true }; // Return that the article is liked now
			}
		} catch (err) {
			// Log the error if something goes wrong
			console.error('Like toggle failed:', err);
			return { isLiked: null, error: true };
		}
	}
};
