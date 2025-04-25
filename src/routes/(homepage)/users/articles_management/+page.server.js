import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';

export async function load({ locals, fetch }) {
    // Checking if the user is authenticated. If not, redirect to the login page.
	if (!locals.user) {
		redirect(302, '/login');
	}

    // Fetching articles from the /api/articles endpoint
	const res = await fetch('/api/articles');
	const data = await res.json();
	let articles;

	// Filtering the articles to only include those written by the currently logged-in user
	articles = data.articles.filter((article) => article.author === locals.user.username);

    // Returning the filtered articles and the user data to the page
	return { articles, user: locals.user };
}

export const actions = {
    // deleteArticle action: Handles deleting an article
	deleteArticle: async ({ request }) => {
		const formData = await request.formData(); // Getting the form data
		const id = formData.get('id'); // Extracting the article id from the form data


		const connection = await createConnection();		// Creating a connection to the database

		const [result] = await connection.execute('Delete from articles where id = ?', [id]);		// Deleting the article from the database based on the provided id

	}
};
