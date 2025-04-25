import { redirect } from '@sveltejs/kit';
import { createConnection } from '$lib/db/mysql';

export async function load({ params, fetch, locals }) {
	// Check if the user is logged in; if not, redirect to login page
	if (!locals.user) {
		redirect(302, '/login');
	}

	const uuid = params.uuid;  // Extract the article UUID from the dynamic route  parameters
	const res = await fetch(`/api/articles/${uuid}`); // Fetch the article data using the UUID
	const article = await res.json();  // Parse the article data as JSON

	// Create a connection to the MySQL database
	const connection = await createConnection();

	// Query to get comments associated with the specific article
	const [comments] = await connection.execute(
		'SELECT c.id, c.text, c.name, c.article_id FROM comments c WHERE article_id = ?;',
		[uuid]
	);


	// Query to get the number of likes and other related details of the article
	const [likes] = await connection.execute('SELECT a.votes, a.id FROM articles a WHERE id = ?;', [
		uuid
	]);

	// Query to get the list of article IDs that the current user has liked
	const [userLikesRows] = await connection.execute(
		'SELECT article_id FROM user_likes WHERE user_id = ?',
		[locals.user.id]
	);

	const userLikes = userLikesRows.map((row) => row.article_id); // Extract article IDs the user has liked
	const [users] = await connection.execute('SELECT * FROM users;'); // Fetch all users from the database

	// Return all the fetched data 
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
	// Action for adding a comment to an article
	addComment: async ({ request }) => {
		 // Get form data submitted from the frontend
		const formData = await request.formData(); // Extract the comment text input
		const input = formData.get('commentInput'); // Extract the comment text input
		const name = formData.get('name'); // Extract the user's name
		const article_id = formData.get('article_id'); //  // Extract the article ID for which the comment is being added

		// Check if all required fields are present

		if (!input || !name || !article_id) {
			return {
				success: false,
				message: 'All fields are required.'
			};
		}


		// Create a connection to the MySQL database
		const connection = await createConnection();

		try {
			// Insert the new comment into the database
			await connection.execute('INSERT INTO comments (text, name, article_id) VALUES (?, ?, ?)', [
				input,
				name,
				article_id
			]);
			return {
				success: true,
				message: 'Comment added successfully!'  // Return a success message if the comment is added
			};
		} catch (error) {
			console.error('Database error:', error);  // Log any database error
			return {
				success: false,
				message: 'Failed to add comment. Please try again.'  // Return an error message
			};
		}
	},
	// Action for toggling the like status of an article
	toggleLike: async ({ request, locals }) => {
		const formData = await request.formData(); // Get form data from the request
		const articleId = formData.get('articleId');  // Extract the article ID
		const userId = locals.user.id; // Get the logged-in user's ID
		const connection = await createConnection(); // Create a connection to the MySQL database

		try {
			// Insert a record in the user_likes table to mark the user as liking the article
			await connection.execute(
				`
              INSERT INTO user_likes (user_id, article_id) VALUES (?, ?)
            `,
				[userId, articleId] // Use the user ID and article ID
			);

			// Increment the like count for the article
			await connection.execute(
				`
              UPDATE articles SET votes = votes + 1 WHERE id = ?
            `,
				[articleId]
			);
		} catch (err) {
				// Handle the case where the user already liked the article (duplicate entry error) (Other version of disliking)
			if (err.code === 'ER_DUP_ENTRY') {
				console.log(err.code); // Getting the error name to be more specific
				// Remove the like record for this user and article (unlike the article)
				await connection.execute(
					`
                DELETE FROM user_likes WHERE user_id = ? AND article_id = ?
              `,
					[userId, articleId]  // Delete the like for the specific user and article
				);
 
				// Decrease the like count for the article
				await connection.execute(
					`
                UPDATE articles SET votes = votes - 1 WHERE id = ?
              `,
					[articleId]
				);
			} else {
			    // If it's a different error, throw it
				throw error;
			}
		}

		// Return a success message after successfully toggling the like status
		return { success: true };
	}
};
