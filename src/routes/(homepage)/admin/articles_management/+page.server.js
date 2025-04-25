import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';

export async function load({ locals, fetch }) {
	// Check if the user is logged in and if the user is an admin
	if (!locals.user || locals.user.role !== 'admin') {
		// Redirect to login page if user is not logged in or not an admin
		throw redirect(302, '/login');
	}
	// Fetch articles data from the API
	const res = await fetch('/api/articles');
	const data = await res.json();
	let articles;

	// Assign articles data to the variable
	articles = data.articles;
	// Return the articles and user information to the component
	return { articles, user: locals.user };
}

export const actions = {
	// Action to handle article deletion
	deleteArticle: async ({ request }) => {
		// Extract article id from the form data
		const formData = await request.formData();
		const id = formData.get('id');
		// Establish database connection
		const connection = await createConnection();
		// Execute the SQL query to delete the article from the database
		const [result] = await connection.execute('Delete from articles where id = ?', [id]);
	}
};
